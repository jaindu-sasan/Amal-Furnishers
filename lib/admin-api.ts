export async function parseApiResponse<T>(response: Response): Promise<T> {
  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message =
      typeof payload?.message === "string" ? payload.message : `Request failed (${response.status})`
    throw new Error(message)
  }

  return payload as T
}
