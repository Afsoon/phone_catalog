import { rest } from "msw"

const srcImg =
  "https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"

const iPhone7 = {
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

const iPhoneX = {
  id: 1,
  name: "iPhone X",
  manufacturer: "Apple",
  description: "lorem ipsum dolor sit amet consectetur.",
  color: "black",
  price: 769,
  imageFileName: srcImg,
  screen: "4,7 inch IPS",
  processor: "A10 Fusion",
  ram: 2,
}

const iPhone11 = {
  id: 2,
  name: "iPhone 11",
  manufacturer: "Apple",
  description: "lorem ipsum dolor sit amet consectetur.",
  color: "black",
  price: 769,
  imageFileName: srcImg,
  screen: "4,7 inch IPS",
  processor: "A10 Fusion",
  ram: 2,
}

const iPhone11Pro = {
  id: 3,
  name: "iPhone 11 Pro",
  manufacturer: "Apple",
  description: "lorem ipsum dolor sit amet consectetur.",
  color: "black",
  price: 769,
  imageFileName: srcImg,
  screen: "4,7 inch IPS",
  processor: "A10 Fusion",
  ram: 2,
}

const iPhone11ProMax = {
  id: 4,
  name: "iPhone 11 Pro Max",
  manufacturer: "Apple",
  description: "lorem ipsum dolor sit amet consectetur.",
  color: "black",
  price: 769,
  imageFileName: srcImg,
  screen: "4,7 inch IPS",
  processor: "A10 Fusion",
  ram: 2,
}

const iPhone12 = {
  id: 5,
  name: "iPhone 12",
  manufacturer: "Apple",
  description: "lorem ipsum dolor sit amet consectetur.",
  color: "black",
  price: 769,
  imageFileName: srcImg,
  screen: "4,7 inch IPS",
  processor: "A10 Fusion",
  ram: 2,
}

const iPhone12Pro = {
  id: 6,
  name: "iPhone 12 Pro",
  manufacturer: "Apple",
  description: "lorem ipsum dolor sit amet consectetur.",
  color: "black",
  price: 769,
  imageFileName: srcImg,
  screen: "4,7 inch IPS",
  processor: "A10 Fusion",
  ram: 2,
}

const iPhone12ProMax = {
  id: 7,
  name: "iPhone 12 Pro Max",
  manufacturer: "Apple",
  description: "lorem ipsum dolor sit amet consectetur.",
  color: "black",
  price: 769,
  imageFileName: srcImg,
  screen: "4,7 inch IPS",
  processor: "A10 Fusion",
  ram: 2,
}

const iPhoneSE2 = {
  id: 8,
  name: "iPhone SE 2",
  manufacturer: "Apple",
  description: "lorem ipsum dolor sit amet consectetur.",
  color: "black",
  price: 769,
  imageFileName: srcImg,
  screen: "4,7 inch IPS",
  processor: "A10 Fusion",
  ram: 2,
}

const phones = [
  iPhone7,
  iPhoneX,
  iPhone11,
  iPhone11Pro,
  iPhone11ProMax,
  iPhone12,
  iPhone12Pro,
  iPhone12ProMax,
  iPhoneSE2,
]

const responseStructure = (data) => ({
  data,
})

const normalizeToSlugName = (phoneName) => {
  return phoneName.replaceAll(" ", "-").toLowerCase()
}

let phonesWithSlugName = phones.map((phone) => {
  return Object.assign(phone, { slug: normalizeToSlugName(phone.name) })
})

const findById = (id) => {
  return phonesWithSlugName.find((phone) => phone.id === Number(id))
}

const slugTable = phones.reduce((acc, elem, idx) => {
  const slugName = normalizeToSlugName(elem.name)
  acc[slugName] = idx
  return acc
}, {})

export const handlers = [
  rest.get("/phones", (_req, res, ctx) => {
    return res(ctx.json(responseStructure(phonesWithSlugName)))
  }),
  rest.get("/phones/:slugPhoneName", (req, res, ctx) => {
    const id = slugTable[req.params.slugPhoneName]
    const phone = findById(id)
    return res(ctx.json(responseStructure(phone)))
  }),
  rest.post("/phones", (req, res, ctx) => {
    const id = phonesWithSlugName.length
    const body = JSON.parse(req.body)
    const slug = normalizeToSlugName(body.name)
    slugTable[slug] = id
    const phone = {
      ...body,
      id,
      imageFileName: srcImg,
      slug,
    }

    phonesWithSlugName = [...phonesWithSlugName, phone]

    return res(ctx.json(responseStructure(phone)))
  }),
  rest.delete("/phones/:phoneId", (req, res, ctx) => {
    const phone = findById(req.params.phoneId)
    phonesWithSlugName = phonesWithSlugName.filter(
      (phone) => phone.id !== Number(req.params.phoneId),
    )
    return res(ctx.json(responseStructure(phone)))
  }),
  rest.put("/phones/:phoneId", (req, res, ctx) => {
    const body = JSON.parse(req.body)
    const phone = findById(req.params.phoneId)
    const newData = { ...phone, ...body }
    phonesWithSlugName[phone.id] = newData
    return res(ctx.json(responseStructure(newData)))
  }),
]
