import { PhoneModel } from "./types"
export const CATALOG_CACHE_KEY = "phone-catalog"
export const formatDetailPhoneCacheKey = (phone: PhoneModel) => [
  CATALOG_CACHE_KEY,
  phone.slug,
]
