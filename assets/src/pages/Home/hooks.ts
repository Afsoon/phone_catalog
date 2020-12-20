import { useQuery, useQueryClient } from "react-query"
import {
  CATALOG_CACHE_KEY,
  formatDetailPhoneCacheKey,
} from "../../src/constants"
import { PhoneModel } from "../../src/types"

const getPhones = async () => {
  const res = await fetch("http://localhost:3000/phones", {})
  const json = await res.json()
  return json.data
}
export const useListPhones = () => {
  const queryClient = useQueryClient()
  return useQuery<PhoneModel[]>(CATALOG_CACHE_KEY, getPhones, {
    onSuccess: (phones) => {
      phones.forEach((phone: PhoneModel) => {
        queryClient.setQueryData(formatDetailPhoneCacheKey(phone.slug), phone)
      })
    },
  })
}
