import { useQuery, useMutation, useQueryClient } from "react-query"
import { useParams, useHistory } from "react-router-dom"
import {
  CATALOG_CACHE_KEY,
  formatDetailPhoneCacheKey,
} from "../../src/constants"
import { PhoneModel } from "../../src/types"
import {
  DeletePhoneRequest,
  EditMutateRequest,
  OptimisticUpdateContext,
  OptimisticDeleteContext,
  DetailScreenRouteParams,
} from "./types"
import { fetchApi } from "../../src/api"
import { cacheConfig } from "../../src/config"

const getPhone = (slug: string) => async () => {
  const res = await fetchApi(`/phones/${slug}`)
  const json = await res.json()
  return json.data
}

const deletePhone = async (phone: DeletePhoneRequest): Promise<PhoneModel> => {
  const res = await fetchApi(`/phones/${phone.data.id}`, {
    method: "DELETE",
  })
  const json = await res.json()
  return json.data
}

const updatePhone = async (
  updatePhoneRequest: EditMutateRequest,
): Promise<PhoneModel> => {
  const res = await fetchApi(`/phones/${updatePhoneRequest.phoneId}`, {
    method: "PUT",
    body: JSON.stringify({ phone: updatePhoneRequest.formData }),
  })
  const json = await res.json()
  return json.data
}

const useOptimisticDelete = () => {
  const queryClient = useQueryClient()
  return {
    ...cacheConfig,
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
          (old: PhoneModel[] | undefined) => {
            if (old) {
              return previousListPhones.filter((oldPhone: PhoneModel) => {
                return phone.data.id === oldPhone.id
              })
            } else {
              return []
            }
          },
        )
      }
      phone.onSucess()
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

    onSuccess: (_phone: PhoneModel, _variables: DeletePhoneRequest) => {
      queryClient.invalidateQueries(CATALOG_CACHE_KEY)
    },
  }
}

const useOptimisticUpdate = () => {
  const queryClient = useQueryClient()
  const history = useHistory()
  const { slugPhoneName } = useParams<DetailScreenRouteParams>()
  return {
    ...cacheConfig,
    onMutate: async (updatePhone: EditMutateRequest) => {
      const phoneUpdateKey = formatDetailPhoneCacheKey(slugPhoneName)
      await queryClient.cancelQueries(CATALOG_CACHE_KEY)
      await queryClient.cancelQueries(phoneUpdateKey)

      const previousPhone:
        | PhoneModel
        | null
        | undefined = queryClient.getQueryData(phoneUpdateKey)
      const previousListPhones:
        | PhoneModel[]
        | null
        | undefined = queryClient.getQueryData(CATALOG_CACHE_KEY)

      if (previousPhone) {
        queryClient.setQueryData(phoneUpdateKey, {
          ...previousPhone,
          ...updatePhone.formData,
        })
      }

      if (previousListPhones) {
        queryClient.setQueryData(
          CATALOG_CACHE_KEY,
          (old: PhoneModel[] | undefined) => {
            if (old) {
              return old.map((phone: PhoneModel) => {
                if (phone.slug === slugPhoneName) {
                  return { ...phone, ...updatePhone.formData }
                } else {
                  return phone
                }
              })
            } else {
              return []
            }
          },
        )
      }

      return { previousPhone, previousListPhones, updatePhone }
    },

    onError: (
      _err: unknown,
      _newPhone: EditMutateRequest,
      context: OptimisticUpdateContext,
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
    onSettled: (newPhone: PhoneModel | undefined) => {
      queryClient.invalidateQueries(CATALOG_CACHE_KEY)
      if (newPhone) {
        queryClient.invalidateQueries(formatDetailPhoneCacheKey(newPhone.slug))
        history.push(`/phone/${slugPhoneName}`, { phoneName: newPhone.name })
      }
    },
  }
}

export const useShowOnePhone = () => {
  const { slugPhoneName } = useParams<DetailScreenRouteParams>()
  return useQuery<PhoneModel>(
    formatDetailPhoneCacheKey(slugPhoneName),
    getPhone(slugPhoneName),
    { ...cacheConfig },
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
  return useMutation<
    PhoneModel,
    unknown,
    EditMutateRequest,
    OptimisticUpdateContext
  >(updatePhone, configMutation)
}
