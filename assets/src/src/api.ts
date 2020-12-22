let api = ""
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  api = "http://localhost:4000/api"
} else {
  api = "https://phone-catalog.gigalixirapp.com/api"
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
