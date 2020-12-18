import { useQuery, useMutation, useQueryClient } from "react-query"
import { CATALOG_CACHE_KEY, formatDetailPhoneCacheKey } from "../src/constants"
import { PhoneModel } from "../src/types"

const getPhones = async () => {
  const res = await fetch("http://localhost:3000/phones", {})
  return await res.json()
}

const getPhone = (id: number) => async () => {
  const res = await fetch(`http://localhost:3000/phones/${id}`, {})
  return await res.json()
}

const deletePhone = async (id: number) => {
  const res = await fetch(`http://localhost:3000/phones/${id}`, {
    method: "DELETE",
  })
  return await res.json()
}

const useOptimisticDelete = () => {
  const queryClient = useQueryClient()
  return {
    onMutate: async (newPhone: any) => {
      const phoneUpdateKey = formatDetailPhoneCacheKey(newPhone)
      await queryClient.cancelQueries(phoneUpdateKey)
      await queryClient.cancelQueries(CATALOG_CACHE_KEY)

      const previousPhone = queryClient.getQueryData(phoneUpdateKey)
      const previousListPhones: any = queryClient.getQueryData(
        CATALOG_CACHE_KEY,
      )

      queryClient.removeQueries(phoneUpdateKey)
      queryClient.setQueryData(
        CATALOG_CACHE_KEY,
        previousListPhones.filter((phone: any) => {
          return phone.id === newPhone.id
        }),
      )
      return { previousPhone, previousListPhones, newPhone }
    },

    onError: (_err: any, _newPhone: any, context: any) => {
      queryClient.setQueryData(
        formatDetailPhoneCacheKey(context.previousPhone),
        context.previousPhone,
      )
      queryClient.setQueryData(CATALOG_CACHE_KEY, context.previousListPhones)
    },

    onSettled: (newPhone: any) => {
      queryClient.invalidateQueries(formatDetailPhoneCacheKey(newPhone))
      queryClient.invalidateQueries(CATALOG_CACHE_KEY)
    },
  }
}

const useOptimisticAdd = () => {
  const queryClient = useQueryClient()
  return {
    onMutate: async (newPhone: any) => {
      await queryClient.cancelQueries(CATALOG_CACHE_KEY)

      const previousPhones = queryClient.getQueryData(CATALOG_CACHE_KEY)

      queryClient.setQueryData(CATALOG_CACHE_KEY, (old: any) => [
        ...old,
        newPhone,
      ])

      return { previousPhones }
    },
    onError: (_err: any, _newTodo: any, context: any) => {
      queryClient.setQueryData(CATALOG_CACHE_KEY, context.previousTodos)
    },
    onSettled: () => {
      queryClient.invalidateQueries(CATALOG_CACHE_KEY)
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
        formatDetailPhoneCacheKey(context.previousPhone),
        context.previousPhone,
      )
      queryClient.setQueryData(CATALOG_CACHE_KEY, context.previousListPhones)
    },

    onSettled: (newPhone: any) => {
      queryClient.invalidateQueries(formatDetailPhoneCacheKey(newPhone))
      queryClient.invalidateQueries(CATALOG_CACHE_KEY)
    },
  }
}

export const useListPhones = () => {
  const queryClient = useQueryClient()
  return useQuery<PhoneModel[]>(CATALOG_CACHE_KEY, getPhones, {
    onSuccess: (phones) => {
      phones.forEach((phone: PhoneModel) => {
        queryClient.setQueryData(formatDetailPhoneCacheKey(phone), phone)
      })
    },
  })
}

export const useShowOnePhone = (phone: any) => {
  return useQuery(formatDetailPhoneCacheKey(phone), getPhone(phone.id))
}

export const useAddPhone = (phone: any) => {
  const configMutation = useOptimisticAdd()
  return useMutation(() => {
    return fetch("http://localhost:300/phones", phone)
  }, configMutation)
}

export const useDeletePhone = () => {
  const configMutation = useOptimisticDelete()
  return useMutation(deletePhone, configMutation)
}

export const useUpdatePhone = (phone: any) => {
  const configMutation = useOptimisticUpdate()
  return useMutation(() => {
    return fetch("http://localhost:300/phones", phone)
  }, configMutation)
}
