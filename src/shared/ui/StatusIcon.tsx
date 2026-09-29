import { cn } from '@/shared/lib/cn'
import type { Tone } from './Badge'
import styles from './StatusIcon.module.css'

const paths: Record<Tone, string> = {
  neutral: 'M5 8h6',
  info: 'M8 7.5v4M8 4.5V5',
  success: 'M5 8.2l2 2 4-4.4',
  warning: 'M8 4.5v4M8 11v.5',
  danger: 'M5.5 5.5l5 5M10.5 5.5l-5 5',
}

interface StatusIconProps {
  tone: Tone
}

export function StatusIcon({ tone }: StatusIconProps) {
  return (
    <span className={cn(styles.icon, styles[tone])} aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d={paths[tone]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  )
}
