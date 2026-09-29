interface TaskRecord {
  id: string
  title: string
  project: string
  status: 'todo' | 'in_progress' | 'done'
  dueDate: string | null
  updatedAt: string
}

interface NotificationRecord {
  id: string
  type: 'info' | 'warning' | 'error' | 'system'
  priority: 'low' | 'normal' | 'high'
  title: string
  body: string | null
  isRead: boolean
  createdAt: string
}

const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

function ago(ms: number): string {
  return new Date(Date.now() - ms).toISOString()
}

function inDays(days: number): string {
  return new Date(Date.now() + days * DAY).toISOString().slice(0, 10)
}

function createTasks(): TaskRecord[] {
  return [
    {
      id: 'tsk_481',
      title: 'Подготовить отчёт по итогам квартала',
      project: 'Финансы',
      status: 'in_progress',
      dueDate: inDays(2),
      updatedAt: ago(40 * MINUTE),
    },
    {
      id: 'tsk_479',
      title: 'Согласовать макеты раздела «Документы»',
      project: 'Кабинет сотрудника',
      status: 'todo',
      dueDate: inDays(5),
      updatedAt: ago(3 * HOUR),
    },
    {
      id: 'tsk_466',
      title: 'Провести встречу с новым сотрудником',
      project: 'Адаптация',
      status: 'todo',
      dueDate: null,
      updatedAt: ago(DAY),
    },
    {
      id: 'tsk_452',
      title: 'Обновить регламент согласования отпусков',
      project: 'Кадры',
      status: 'done',
      dueDate: inDays(-1),
      updatedAt: ago(2 * DAY),
    },
  ]
}

function createNotifications(): NotificationRecord[] {
  return [
    {
      id: 'ntf_2041',
      type: 'info',
      priority: 'normal',
      title: 'Вас добавили в проект «Мобильное приложение»',
      body: 'Руководитель проекта — Алексей Воронин. Первая встреча команды в четверг в 11:00.',
      isRead: false,
      createdAt: ago(5 * MINUTE),
    },
    {
      id: 'ntf_2040',
      type: 'error',
      priority: 'high',
      title: 'Доступ к VPN будет отключён через 2 дня',
      body: 'Срок действия сертификата истекает. Перевыпустите его в разделе «Безопасность», иначе удалённый доступ перестанет работать.',
      isRead: false,
      createdAt: ago(25 * MINUTE),
    },
    {
      id: 'ntf_2038',
      type: 'system',
      priority: 'normal',
      title: 'Плановые работы в ночь на субботу',
      body: 'С 01:00 до 04:00 по московскому времени кабинет будет недоступен.',
      isRead: true,
      createdAt: ago(HOUR),
    },
    {
      id: 'ntf_2035',
      type: 'info',
      priority: 'normal',
      title:
        'Изменился порядок согласования командировок для сотрудников региональных офисов: заявку теперь нужно подавать не позднее чем за десять рабочих дней до поездки',
      body: 'Новый порядок действует с 1 октября. Заявки, поданные позже срока, согласуются только через руководителя департамента и могут быть отклонены без объяснения причин. Билеты и гостиницу по таким заявкам сотрудник оплачивает сам, компенсация приходит после возвращения и сдачи отчётных документов. Подробности — в базе знаний, раздел «Командировки».',
      isRead: false,
      createdAt: ago(2 * HOUR),
    },
    {
      id: 'ntf_2031',
      type: 'warning',
      priority: 'high',
      title: 'Согласуйте отпуск Марии Кузнецовой до конца дня',
      body: null,
      isRead: false,
      createdAt: ago(3 * HOUR),
    },
    {
      id: 'ntf_2027',
      type: 'warning',
      priority: 'normal',
      title: 'Не заполнен табель за прошлую неделю',
      body: 'Заполните табель до пятницы, иначе часы не попадут в расчёт.',
      isRead: false,
      createdAt: ago(6 * HOUR),
    },
    {
      id: 'ntf_2019',
      type: 'info',
      priority: 'normal',
      title: 'Заявка на оборудование одобрена',
      body: 'Монитор можно забрать в офисе на 3 этаже, кабинет 312.',
      isRead: true,
      createdAt: ago(DAY + 2 * HOUR),
    },
    {
      id: 'ntf_2016',
      type: 'info',
      priority: 'low',
      title: 'Вышел новый выпуск корпоративного дайджеста',
      body: null,
      isRead: true,
      createdAt: ago(DAY + 5 * HOUR),
    },
    {
      id: 'ntf_2008',
      type: 'system',
      priority: 'low',
      title: 'Обновлена политика хранения документов',
      body: 'Документы старше трёх лет переносятся в архив автоматически.',
      isRead: true,
      createdAt: ago(2 * DAY),
    },
    {
      id: 'ntf_1997',
      type: 'warning',
      priority: 'normal',
      title: 'Истекает срок прохождения курса по безопасности',
      body: 'Осталось 4 дня. Курс занимает около 40 минут.',
      isRead: false,
      createdAt: ago(3 * DAY),
    },
    {
      id: 'ntf_1985',
      type: 'info',
      priority: 'normal',
      title: 'Алексей Воронин оставил комментарий к вашей задаче',
      body: '«Давайте перенесём срок на следующую неделю, сейчас не успеваем».',
      isRead: true,
      createdAt: ago(4 * DAY),
    },
    {
      id: 'ntf_1972',
      type: 'error',
      priority: 'normal',
      title: 'Не удалось выгрузить расчётный лист',
      body: 'Попробуйте запросить выгрузку ещё раз или обратитесь в бухгалтерию.',
      isRead: true,
      createdAt: ago(6 * DAY),
    },
    {
      id: 'ntf_1960',
      type: 'info',
      priority: 'low',
      title: 'Открыта запись на корпоративный турнир по настольному теннису',
      body: null,
      isRead: true,
      createdAt: ago(9 * DAY),
    },
    {
      id: 'ntf_1944',
      type: 'system',
      priority: 'normal',
      title: 'Пароль будет нужно сменить через 14 дней',
      body: 'Сменить пароль можно заранее в разделе «Безопасность».',
      isRead: true,
      createdAt: ago(12 * DAY),
    },
  ]
}

function createManyNotifications(): NotificationRecord[] {
  return Array.from({ length: 130 }, (_, index) => ({
    id: `ntf_${3000 + index}`,
    type: 'info',
    priority: 'normal',
    title: `Новый документ на подпись № ${index + 1}`,
    body: 'Откройте раздел «Документы», чтобы ознакомиться и подписать.',
    isRead: false,
    createdAt: ago((index + 1) * 7 * MINUTE),
  }))
}

export const db = {
  tasks: createTasks(),
  notifications: createNotifications(),
  manyNotifications: createManyNotifications(),
}

export function resetDb(): void {
  db.tasks = createTasks()
  db.notifications = createNotifications()
  db.manyNotifications = createManyNotifications()
}
