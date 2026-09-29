import type { ReactNode } from 'react'
import styles from './Card.module.css'

interface CardProps {
  title: string
  /** то, что стоит в шапке рядом с заголовком: счётчик, бейдж */
  titleExtra?: ReactNode
  footer?: ReactNode
  children: ReactNode
}

export function Card({ title, titleExtra, footer, children }: CardProps) {
  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {titleExtra}
      </header>
      <div className={styles.body}>{children}</div>
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </section>
  )
}
