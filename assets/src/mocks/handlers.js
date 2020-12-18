import { rest } from "msw"

const phone = {
  id: 0,
  name: "iPhone 7",
  manufacturer: "Apple",
  description: "lorem ipsum dolor sit amet consectetur.",
  color: "black",
  price: 769,
  imageFileName:
    "https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
  screen: "4,7 inch IPS",
  processor: "A10 Fusion",
  ram: 2,
}

export const handlers = [
  rest.get("/phones", (_req, res, ctx) => {
    return res(
      ctx.json(
        Array(10)
          .fill(undefined)
          .reduce(
            (acc, _el, idx) => [...acc, { ...phone, ...{ id: idx } }],
            [],
          ),
      ),
    )
  }),
  rest.get("/phones/:phoneId", (_req, res, ctx) => {
    return res(
      ctx.json({
        id: 0,
        name: "iPhone 7",
        manufacturer: "Apple",
        description: "lorem ipsum dolor sit amet consectetur.",
        color: "black",
        price: 769,
        imageFileName: "IPhone_7.png",
        screen: "4,7 inch IPS",
        processor: "A10 Fusion",
        ram: 2,
      }),
    )
  }),
  rest.post("/phones", (req, res, ctx) => {
    return res(
      ctx.json({
        ...req.body,
        id: Math.random(),
        imageFileName:
          "https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
      }),
    )
  }),
  rest.delete("/phones/:phoneId", (req, res, ctx) => {
    return res(ctx.json({ id: req.params.phoneId }))
  }),
  rest.put("/phones/:phoneId", (req, res, ctx) => {
    return res(ctx.json(req.body))
  }),
]
