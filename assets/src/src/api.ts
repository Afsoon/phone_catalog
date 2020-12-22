let api = ""
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  api = "http://localhost:4000/api"
} else {
  api = process.env.API_URL || ""
}

export const fetchApi = (path: string, options?: RequestInit | undefined) => {
  return fetch(
    `${api}${path}`,
    Object.assign(
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
      options,
    ),
  )
}
