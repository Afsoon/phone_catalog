import { rest } from "msw"

const srcImg =
  "https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"

const phone = {
  id: 0,
  name: "iPhone 7",
  manufacturer: "Apple",
  description: "lorem ipsum dolor sit amet consectetur.",
  color: "black",
  price: 769,
  imageFileName: srcImg,
  screen: "4,7 inch IPS",
  processor: "A10 Fusion",
  ram: 2,
}

const responseStructure = (data) => ({
  data,
})

const arraySize = 0

export const handlers = [
  rest.get("/phones", (_req, res, ctx) => {
    const data = Array(arraySize)
      .fill(undefined)
      .reduce((acc, _el, idx) => [...acc, { ...phone, ...{ id: idx } }], [])

    return res(ctx.json(responseStructure(data)))
  }),
  rest.get("/phones/:phoneId", (_req, res, ctx) => {
    return res(ctx.json(responseStructure(phone)))
  }),
  rest.post("/phones", (req, res, ctx) => {
    const data = {
      ...req.body,
      id: Math.random() + arraySize,
      imageFileName: srcImg,
    }

    return res(ctx.json(responseStructure(data)))
  }),
  rest.delete("/phones/:phoneId", (req, res, ctx) => {
    return res(ctx.json(responseStructure({ id: req.params.phoneId })))
  }),
  rest.put("/phones/:phoneId", (req, res, ctx) => {
    return res(ctx.json({ id: req.body }))
  }),
]
