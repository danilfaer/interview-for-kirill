import styles from './Skeleton.module.css'

interface SkeletonProps {
  rows?: number
}

export function Skeleton({ rows = 3 }: SkeletonProps) {
  return (
    <div className={styles.skeleton} role="status" aria-label="Загрузка">
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className={styles.row}>
          <div className={styles.line} />
          <div className={styles.lineShort} />
        </div>
      ))}
    </div>
  )
}
