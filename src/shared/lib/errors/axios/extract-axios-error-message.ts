export function extractAxiosErrorMessage(data: unknown, fallback = 'Request failed'): string {
  if (!data) return fallback

  if (typeof (data as any).message === 'string') {
    return (data as any).message
  }

  if (Array.isArray((data as any).message)) {
    return (data as any).message[0] ?? fallback
  }

  return fallback
}
