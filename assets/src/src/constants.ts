export const CATALOG_CACHE_KEY = "phone-catalog"
export const formatDetailPhoneCacheKey = (slug: string) => [
  CATALOG_CACHE_KEY,
  slug,
]
