import { useMutation, useQueryClient } from "react-query"
import { useHistory } from "react-router-dom"
import {
  CATALOG_CACHE_KEY,
  formatDetailPhoneCacheKey,
} from "../../src/constants"
import { PhoneModel, CreatePhoneRequest } from "../../src/types"
import { fetchApi } from "../../src/api"

const createPhone = async (
  createPhoneRequest: CreatePhoneRequest,
): Promise<PhoneModel> => {
  const res = await fetchApi("/phones", {
    method: "POST",
    body: JSON.stringify(createPhoneRequest),
  })
  const json = await res.json()
  return json.data
}

const useOptimisticAdd = () => {
  const queryClient = useQueryClient()
  const history = useHistory()
  return {
    onSuccess: async (phone: PhoneModel) => {
      const phoneUpdateKey = formatDetailPhoneCacheKey(phone.slug)
      await queryClient.cancelQueries(phoneUpdateKey)
      await queryClient.cancelQueries(CATALOG_CACHE_KEY)

      const previousListPhones:
        | PhoneModel[]
        | null
        | undefined = queryClient.getQueryData(CATALOG_CACHE_KEY)

      if (previousListPhones) {
        queryClient.setQueryData(
          CATALOG_CACHE_KEY,
          (old: PhoneModel[] | undefined) => {
            if (old) {
              return [...old, phone]
            } else {
              return []
            }
          },
        )
      }

      queryClient.setQueryData(formatDetailPhoneCacheKey(phone.slug), phone)
      history.push(`/phone/${phone.slug}`, { phoneName: phone.name })
    },
    onSettled: (phone: PhoneModel | undefined) => {
      if (phone) {
        queryClient.invalidateQueries(formatDetailPhoneCacheKey(phone.slug))
      }
      queryClient.invalidateQueries(CATALOG_CACHE_KEY)
    },
  }
}

export const useAddPhone = () => {
  const configMutation = useOptimisticAdd()
  return useMutation<PhoneModel, unknown, CreatePhoneRequest, unknown>(
    createPhone,
    configMutation,
  )
}
