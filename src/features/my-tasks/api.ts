import { request } from '@/shared/api/client'
import type { Task, TaskListResponse } from './types'

export const tasksKeys = {
  list: ['tasks', 'list'] as const,
}

export function fetchTasks(signal?: AbortSignal): Promise<TaskListResponse> {
  return request<TaskListResponse>('/tasks', { signal })
}

export function completeTask(id: string): Promise<Task> {
  return request<Task>(`/tasks/${id}/complete`, { method: 'POST' })
}
