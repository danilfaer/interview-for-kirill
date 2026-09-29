import { delay, http, HttpResponse } from 'msw'
import { db } from './db'
import { getScenario } from './scenario'

const priorityWeight = { high: 0, normal: 1, low: 2 }

function errorResponse(status: number, code: string, message: string) {
  return HttpResponse.json({ code, message }, { status })
}

function randomBetween(min: number, max: number): number {
  return Math.round(min + Math.random() * (max - min))
}

// задержка как у живого бэка + сценарии с падениями
async function simulateNetwork(kind: 'query' | 'mutation') {
  const scenario = getScenario()

  if (import.meta.env.MODE !== 'test') {
    await delay(scenario === 'slow' ? 4000 : randomBetween(600, 1200))
  }

  const shouldFail = scenario === 'error' || (scenario === 'mutation-error' && kind === 'mutation')

  return shouldFail ? errorResponse(500, 'internal_error', 'Внутренняя ошибка сервера') : null
}

function parseInteger(value: string | null, fallback: number): number {
  return value === null ? fallback : Number(value)
}

function getNotifications() {
  const scenario = getScenario()

  if (scenario === 'empty') return []
  if (scenario === 'many') return db.manyNotifications

  return db.notifications
}

export const handlers = [
  http.get('/api/tasks', async () => {
    const failure = await simulateNetwork('query')
    if (failure) return failure

    return HttpResponse.json({ items: getScenario() === 'empty' ? [] : db.tasks })
  }),

  http.post('/api/tasks/:id/complete', async ({ params }) => {
    const failure = await simulateNetwork('mutation')
    if (failure) return failure

    const task = db.tasks.find((item) => item.id === params.id)
    if (!task) return errorResponse(404, 'not_found', 'Задача не найдена')

    task.status = 'done'
    task.updatedAt = new Date().toISOString()

    return HttpResponse.json(task)
  }),

  http.get('/api/notifications', async ({ request }) => {
    const failure = await simulateNetwork('query')
    if (failure) return failure

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') ?? 'all'
    const limit = parseInteger(searchParams.get('limit'), 20)
    const offset = parseInteger(searchParams.get('offset'), 0)

    if (status !== 'all' && status !== 'unread') {
      return errorResponse(400, 'invalid_params', 'Параметр status должен быть all или unread')
    }
    if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
      return errorResponse(400, 'invalid_params', 'Параметр limit должен быть от 1 до 50')
    }
    if (!Number.isInteger(offset) || offset < 0) {
      return errorResponse(400, 'invalid_params', 'Параметр offset должен быть не меньше 0')
    }

    const all = getNotifications()
    const sorted = [...all].sort(
      (a, b) =>
        priorityWeight[a.priority] - priorityWeight[b.priority] ||
        b.createdAt.localeCompare(a.createdAt),
    )
    const filtered = status === 'unread' ? sorted.filter((item) => !item.isRead) : sorted

    return HttpResponse.json({
      items: filtered.slice(offset, offset + limit),
      unreadCount: all.filter((item) => !item.isRead).length,
      hasMore: offset + limit < filtered.length,
    })
  }),

  http.post('/api/notifications/:id/read', async ({ params }) => {
    const failure = await simulateNetwork('mutation')
    if (failure) return failure

    const notification = getNotifications().find((item) => item.id === params.id)
    if (!notification) return errorResponse(404, 'not_found', 'Уведомление не найдено')

    notification.isRead = true

    return HttpResponse.json(notification)
  }),
]
