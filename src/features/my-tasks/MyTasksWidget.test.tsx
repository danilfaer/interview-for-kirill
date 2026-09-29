import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { server } from '@/mocks/server'
import { MyTasksWidget } from './MyTasksWidget'

function renderWidget() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })

  render(
    <QueryClientProvider client={client}>
      <MyTasksWidget />
    </QueryClientProvider>,
  )
}

describe('MyTasksWidget', () => {
  it('показывает задачи после загрузки', async () => {
    renderWidget()

    expect(screen.getByRole('status', { name: 'Загрузка' })).toBeInTheDocument()
    expect(await screen.findByText('Подготовить отчёт по итогам квартала')).toBeInTheDocument()
  })

  it('при ошибке даёт повторить запрос', async () => {
    server.use(
      http.get(
        '/api/tasks',
        () => HttpResponse.json({ code: 'internal_error', message: 'Упало' }, { status: 500 }),
        { once: true },
      ),
    )
    renderWidget()

    await userEvent.click(await screen.findByRole('button', { name: 'Повторить' }))

    expect(await screen.findByText('Подготовить отчёт по итогам квартала')).toBeInTheDocument()
  })

  it('оставляет задачу незавершённой, если запрос упал', async () => {
    server.use(
      http.post('/api/tasks/:id/complete', () =>
        HttpResponse.json({ code: 'internal_error', message: 'Упало' }, { status: 500 }),
      ),
    )
    renderWidget()

    const [completeButton] = await screen.findAllByRole('button', { name: 'Завершить' })
    await userEvent.click(completeButton!)

    expect(await screen.findByText('Не удалось завершить задачу')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Завершить' })).toHaveLength(3)
  })
})
