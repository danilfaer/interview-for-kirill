import { Button } from './Button'
import styles from './ErrorMessage.module.css'

interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({
  message = 'Не удалось загрузить данные',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className={styles.error} role="alert">
      <p className={styles.text}>{message}</p>
      {onRetry && (
        <Button size="s" onClick={onRetry}>
          Повторить
        </Button>
      )}
    </div>
  )
}
