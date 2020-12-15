import { rest } from "msw"

export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    const { username } = req.body

    return res(
      ctx.json({
        id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
        username,
        firstName: "John",
        lastName: "Maverick",
      }),
    )
  }),
  rest.get("/phones", (_req, res, ctx) => {
    return res(
      ctx.json([
        {
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
        },
      ]),
    )
  }),
]
