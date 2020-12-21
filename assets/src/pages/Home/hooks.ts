import { useQuery, useQueryClient } from "react-query"
import {
  CATALOG_CACHE_KEY,
  formatDetailPhoneCacheKey,
} from "../../src/constants"
import { PhoneModel } from "../../src/types"
import { fetchApi } from "../../src/api"

const getPhones = async () => {
  const res = await fetchApi("/phones", {})
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
