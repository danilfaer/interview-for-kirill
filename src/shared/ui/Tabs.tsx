import { cn } from '@/shared/lib/cn'
import styles from './Tabs.module.css'

export interface TabItem<T extends string> {
  value: T
  label: string
}

interface TabsProps<T extends string> {
  items: TabItem<T>[]
  value: T
  onChange: (value: T) => void
  'aria-label'?: string
}

export function Tabs<T extends string>({ items, value, onChange, ...rest }: TabsProps<T>) {
  return (
    <div className={styles.tabs} role="tablist" aria-label={rest['aria-label']}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={item.value === value}
          className={cn(styles.tab, item.value === value && styles.active)}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
