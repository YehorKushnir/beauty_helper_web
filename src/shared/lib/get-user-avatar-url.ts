import { API_URL } from '@/shared/lib/api/axios'

export function getUserAvatarUrl(url?: string) {
  if (!url) return ''

  if (url.startsWith('http')) {
    return url
  } else {
    return API_URL + url
  }
}
