import { formatRelativeTime } from './formatDate'

const now = new Date('2026-09-29T12:00:00Z')

describe('formatRelativeTime', () => {
  it.each([
    ['2026-09-29T11:59:40Z', 'только что'],
    ['2026-09-29T11:55:00Z', '5 минут назад'],
    ['2026-09-29T09:00:00Z', '3 часа назад'],
    ['2026-09-28T10:00:00Z', 'вчера'],
  ])('%s → %s', (iso, expected) => {
    expect(formatRelativeTime(iso, now)).toBe(expected)
  })

  it('старше недели показывает датой', () => {
    expect(formatRelativeTime('2026-09-12T12:00:00Z', now)).toBe('12 сентября')
  })
})
