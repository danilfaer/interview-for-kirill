# Кабинет сотрудника

Фронтенд личного кабинета: React 19, TypeScript, Vite, TanStack Query. Бэкенда в разработке нет,
запросы к `/api` перехватывает MSW.

## Запуск

Нужен Node.js 22.12 или новее.

```bash
npm ci
npm run dev
```

Приложение откроется на http://localhost:5173.

## Команды

| Команда             | Что делает          |
| ------------------- | ------------------- |
| `npm run dev`       | Дев-сервер с моками |
| `npm test`          | Тесты               |
| `npm run typecheck` | Проверка типов      |
| `npm run lint`      | Линтер              |
| `npm run format`    | Форматирование      |
| `npm run build`     | Сборка              |

## Структура

```
src/
  app/        корень приложения, глобальные стили и токены
  pages/      страницы
  features/   фичи: my-tasks — готовый виджет, notifications — заглушка
  shared/     API-клиент, UI-кит, утилиты
  mocks/      мок-бэкенд
docs/         постановка и контракт
```

## Задача

- Постановка: [docs/task.md](docs/task.md)
- Контракт: [docs/openapi.yaml](docs/openapi.yaml)
- Макеты: [Pixso, страница «Главная. Уведомления»](https://pixso.net/app/design/A4twlxM2ZSQ4eofzbrq5Qw?icon_type=1&page-id=0%3A1&item-id=3%3A1)

Вопросы по постановке, макетам и контракту задавайте интервьюеру: он отвечает за аналитика,
дизайнера и бэкендера.
