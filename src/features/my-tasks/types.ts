export type TaskStatus = 'todo' | 'in_progress' | 'done'

export interface Task {
  id: string
  title: string
  project: string
  status: TaskStatus
  /** дата без времени, YYYY-MM-DD */
  dueDate: string | null
  updatedAt: string
}

export interface TaskListResponse {
  items: Task[]
}
