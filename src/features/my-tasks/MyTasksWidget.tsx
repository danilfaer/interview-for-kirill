import { useQuery } from '@tanstack/react-query'
import { Card, EmptyState, ErrorMessage, Skeleton } from '@/shared/ui'
import { fetchTasks, tasksKeys } from './api'
import { TaskRow } from './TaskRow'

export function MyTasksWidget() {
  const tasks = useQuery({
    queryKey: tasksKeys.list,
    queryFn: ({ signal }) => fetchTasks(signal),
  })

  return <Card title="Мои задачи">{renderContent()}</Card>

  function renderContent() {
    if (tasks.isPending) return <Skeleton rows={4} />

    if (tasks.isError) {
      return <ErrorMessage message="Не удалось загрузить задачи" onRetry={() => tasks.refetch()} />
    }

    if (tasks.data.items.length === 0) {
      return <EmptyState title="Задач нет" description="Новые задачи появятся здесь" />
    }

    return (
      <ul>
        {tasks.data.items.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </ul>
    )
  }
}
