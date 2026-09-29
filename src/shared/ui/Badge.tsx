import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import styles from './Badge.module.css'

export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

interface BadgeProps {
  tone?: Tone
  children: ReactNode
}

export function Badge({ tone = 'neutral', children }: BadgeProps) {
  return <span className={cn(styles.badge, styles[tone])}>{children}</span>
}

interface CounterProps {
  value: number
  /** если задан, всё что больше показываем как "max+" */
  max?: number
}

export function Counter({ value, max }: CounterProps) {
  const text = max !== undefined && value > max ? `${max}+` : String(value)

  return <span className={styles.counter}>{text}</span>
}
