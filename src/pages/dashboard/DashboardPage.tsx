import { MyTasksWidget } from '@/features/my-tasks'
import { NotificationsWidget } from '@/features/notifications'
import styles from './DashboardPage.module.css'

const today = new Intl.DateTimeFormat('ru', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
}).format(new Date())

export function DashboardPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.logo}>Кабинет сотрудника</span>
        <span className={styles.user}>Анна Смирнова</span>
      </header>

      <main className={styles.content}>
        <div className={styles.greeting}>
          <h1 className={styles.title}>Добрый день, Анна</h1>
          <p className={styles.date}>{today}</p>
        </div>

        <div className={styles.grid}>
          <MyTasksWidget />
          <NotificationsWidget />
        </div>
      </main>
    </div>
  )
}
