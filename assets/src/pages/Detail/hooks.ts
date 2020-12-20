import { useQuery, useMutation, useQueryClient } from "react-query"
import { useParams } from "react-router-dom"
import {
  CATALOG_CACHE_KEY,
  formatDetailPhoneCacheKey,
} from "../../src/constants"
import { PhoneModel, DeletePhoneRequest } from "../../src/types"

const getPhone = (slug: string) => async () => {
  const res = await fetch(`http://localhost:3000/phones/${slug}`, {})
  const json = await res.json()
  return json.data
}

const deletePhone = async (phone: DeletePhoneRequest): Promise<PhoneModel> => {
  const res = await fetch(`http://localhost:3000/phones/${phone.data.id}`, {
    method: "DELETE",
  })
  const json = await res.json()
  return json.data
}

interface DeleteContext {
  previousPhone: PhoneModel | undefined | null
  previousListPhones: PhoneModel[] | undefined | null
  phone: DeletePhoneRequest
}

type OptimisticDeleteContext = DeleteContext | undefined | null

const useOptimisticDelete = () => {
  const queryClient = useQueryClient()
  return {
    onMutate: async (phone: DeletePhoneRequest) => {
      const phoneUpdateKey = formatDetailPhoneCacheKey(phone.data.slug)
      await queryClient.cancelQueries(phoneUpdateKey)
      await queryClient.cancelQueries(CATALOG_CACHE_KEY)

      const previousPhone:
        | PhoneModel
        | null
        | undefined = queryClient.getQueryData(phoneUpdateKey)
      const previousListPhones:
        | PhoneModel[]
        | null
        | undefined = queryClient.getQueryData(CATALOG_CACHE_KEY)

      if (previousPhone) {
        queryClient.removeQueries(phoneUpdateKey)
      }

      if (previousListPhones) {
        queryClient.setQueryData(
          CATALOG_CACHE_KEY,
          previousListPhones.filter((oldPhone: PhoneModel) => {
            return phone.data.id === oldPhone.id
          }),
        )
      }
      return { previousPhone, previousListPhones, phone }
    },

    onError: (
      _err: unknown,
      _phone: DeletePhoneRequest,
      context: OptimisticDeleteContext,
    ) => {
      if (context?.previousPhone) {
        queryClient.setQueryData(
          formatDetailPhoneCacheKey(context.previousPhone.slug),
          context.previousPhone,
        )
      }
      if (context?.previousListPhones) {
        queryClient.setQueryData(CATALOG_CACHE_KEY, context.previousListPhones)
      }
    },

    onSettled: (
      phone: PhoneModel | undefined,
      _error: unknown,
      variables: DeletePhoneRequest,
    ) => {
      if (phone) {
        queryClient.invalidateQueries(formatDetailPhoneCacheKey(phone.slug))
      }
      queryClient.invalidateQueries(CATALOG_CACHE_KEY)
      variables.onSucess()
    },
  }
}

const useOptimisticUpdate = () => {
  const queryClient = useQueryClient()
  return {
    onMutate: async (newPhone: any) => {
      await queryClient.cancelQueries(CATALOG_CACHE_KEY)
      const phoneUpdateKey = formatDetailPhoneCacheKey(newPhone)
      await queryClient.cancelQueries(phoneUpdateKey)

      const previousPhone = queryClient.getQueryData(phoneUpdateKey)
      const previousListPhones = queryClient.getQueryData(CATALOG_CACHE_KEY)

      queryClient.setQueryData(phoneUpdateKey, newPhone)
      queryClient.setQueryData(CATALOG_CACHE_KEY, (old: any) =>
        old.map((phone: any) => {
          if (phone.id === newPhone.id) {
            return newPhone
          } else {
            return phone
          }
        }),
      )
      return { previousPhone, previousListPhones, newPhone }
    },

    onError: (_err: any, _newPhone: any, context: any) => {
      queryClient.setQueryData(
        formatDetailPhoneCacheKey(context.previousPhone.slug),
        context.previousPhone,
      )
      queryClient.setQueryData(CATALOG_CACHE_KEY, context.previousListPhones)
    },

    onSettled: (newPhone: any) => {
      queryClient.invalidateQueries(formatDetailPhoneCacheKey(newPhone.slug))
      queryClient.invalidateQueries(CATALOG_CACHE_KEY)
    },
  }
}

export const useShowOnePhone = () => {
  const { slugPhoneName } = useParams<{ slugPhoneName: string }>()
  return useQuery<PhoneModel>(
    formatDetailPhoneCacheKey(slugPhoneName),
    getPhone(slugPhoneName),
  )
}

export const useDeletePhone = () => {
  const configMutation = useOptimisticDelete()
  return useMutation<
    PhoneModel,
    unknown,
    DeletePhoneRequest,
    OptimisticDeleteContext
  >(deletePhone, configMutation)
}

export const useUpdatePhone = () => {
  const configMutation = useOptimisticUpdate()
  return useMutation(() => {
    return fetch("http://localhost:300/phones")
  }, configMutation)
}
