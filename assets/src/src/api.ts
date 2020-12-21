let api = ""
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  api = "http://localhost:3000"
} else {
  api = process.env.API_URL || ""
}

export const fetchApi = (path: string, options?: RequestInit | undefined) => {
  return fetch(`${api}${path}`, options)
}
