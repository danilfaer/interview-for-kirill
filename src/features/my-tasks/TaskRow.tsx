import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDate, formatRelativeTime } from '@/shared/lib/formatDate'
import { Badge, Button } from '@/shared/ui'
import type { Tone } from '@/shared/ui'
import { completeTask, tasksKeys } from './api'
import type { Task, TaskListResponse, TaskStatus } from './types'
import styles from './TaskRow.module.css'

const statusView: Record<TaskStatus, { label: string; tone: Tone }> = {
  todo: { label: 'Новая', tone: 'neutral' },
  in_progress: { label: 'В работе', tone: 'info' },
  done: { label: 'Готово', tone: 'success' },
}

interface TaskRowProps {
  task: Task
}

export function TaskRow({ task }: TaskRowProps) {
  const queryClient = useQueryClient()

  // без оптимистичного апдейта: задачу закрываем только когда бэк подтвердил
  const complete = useMutation({
    mutationFn: () => completeTask(task.id),
    onSuccess: (updated) => {
      queryClient.setQueryData<TaskListResponse>(tasksKeys.list, (data) =>
        data
          ? { items: data.items.map((item) => (item.id === updated.id ? updated : item)) }
          : data,
      )
    },
  })

  const status = statusView[task.status]

  return (
    <li className={styles.row}>
      <div className={styles.main}>
        <p className={styles.title}>{task.title}</p>
        <p className={styles.meta}>
          {task.project}
          {task.dueDate && ` · до ${formatDate(task.dueDate)}`}
          {` · обновлено ${formatRelativeTime(task.updatedAt)}`}
        </p>
        {complete.isError && (
          <p className={styles.error} role="alert">
            Не удалось завершить задачу
          </p>
        )}
      </div>
      <div className={styles.side}>
        <Badge tone={status.tone}>{status.label}</Badge>
        {task.status !== 'done' && (
          <Button
            variant="ghost"
            size="s"
            loading={complete.isPending}
            onClick={() => complete.mutate()}
          >
            Завершить
          </Button>
        )}
      </div>
    </li>
  )
}
