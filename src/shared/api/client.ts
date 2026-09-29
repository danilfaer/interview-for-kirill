const BASE_URL = '/api'

type QueryValue = string | number | boolean | undefined

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  query?: Record<string, QueryValue>
  body?: unknown
  signal?: AbortSignal
}

interface ErrorPayload {
  code: string
  message: string
}

export class ApiError extends Error {
  readonly status: number
  readonly code: string

  constructor(status: number, code: string, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

function buildUrl(path: string, query?: Record<string, QueryValue>): string {
  const url = new URL(BASE_URL + path, window.location.origin)

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value))
  }

  return url.toString()
}

function isErrorPayload(value: unknown): value is ErrorPayload {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as ErrorPayload).code === 'string' &&
    typeof (value as ErrorPayload).message === 'string'
  )
}

async function toApiError(response: Response): Promise<ApiError> {
  // бэк может упасть и без json — тогда отдаём безликую ошибку
  const payload: unknown = await response.json().catch(() => null)

  if (isErrorPayload(payload)) {
    return new ApiError(response.status, payload.code, payload.message)
  }

  return new ApiError(response.status, 'unknown', 'Что-то пошло не так')
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', query, body, signal } = options

  const response = await fetch(buildUrl(path, query), {
    method,
    signal,
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  if (!response.ok) throw await toApiError(response)
  if (response.status === 204) return undefined as T

  return (await response.json()) as T
}
