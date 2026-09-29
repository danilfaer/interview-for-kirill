const MINUTE = 60
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

const relativeFormatter = new Intl.RelativeTimeFormat('ru', { numeric: 'auto' })
const dateFormatter = new Intl.DateTimeFormat('ru', { day: 'numeric', month: 'long' })

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso))
}

// "5 минут назад", "вчера", а всё что старше недели — просто датой
export function formatRelativeTime(iso: string, now: Date = new Date()): string {
  const seconds = Math.round((now.getTime() - new Date(iso).getTime()) / 1000)

  if (seconds < MINUTE) return 'только что'
  if (seconds < HOUR) return relativeFormatter.format(-Math.floor(seconds / MINUTE), 'minute')
  if (seconds < DAY) return relativeFormatter.format(-Math.floor(seconds / HOUR), 'hour')
  if (seconds < 7 * DAY) return relativeFormatter.format(-Math.floor(seconds / DAY), 'day')

  return formatDate(iso)
}
