# kern

Небольшая React-библиотека компонентов с типизированными вариантами,
доступными примитивами и минимальным слоем дизайн-токенов.

[![Deploy Storybook](https://github.com/RodionTmnkv/kern/actions/workflows/deploy-storybook.yml/badge.svg)](https://github.com/RodionTmnkv/kern/actions/workflows/deploy-storybook.yml)

## Зачем этот проект

Хотелось место, где можно принять решения по дизайн-системе целиком —
от названий токенов до API компонента — без дедлайна, который заставляет
резать углы. У каждого примитива здесь есть причина существовать и
причина выглядеть именно так.

## Компоненты

- **Button** — Полиморфная кнопка (поддержка `asChild`), состояния загрузки, семантические цвета.
- **Input** — Поле ввода с поддержкой label, hint и error. Автоматическая связка a11y.
- **Switch** — Переключатель на базе Radix UI с поддержкой клавиатуры и описаний.
- **Dialog** — Модальное окно с фокус-ловушкой, порталом и CSS-анимациями.
- **Toast** — Всплывающие уведомления с вариантами (success, destructive) и свайпами.

## Стек

- **React 18 + TypeScript** (`strict`, `noUncheckedIndexedAccess`)
- **Tailwind CSS v4** с тонким слоем токенов через `@theme`
- **CVA** для API вариантов
- **Radix UI** для доступных headless-примитивов (Slot, Switch, Dialog, Toast)
- **Storybook 8** с `@storybook/addon-a11y`
- **Vitest + Testing Library + jest-axe**

## Решения, которые стоит объяснить

**`asChild` вместо `as`.** Проп `as` — популярный паттерн, но он воюет
с TypeScript: приходится кастовать типы пропсов и терять автодополнение
атрибутов для полиморфного тега. `asChild` (конвенция Radix) оставляет
`Button` строго кнопкой, а вызывающий код передаёт одного ребёнка,
который получает все пропсы. Никаких кастов, никакой ручной обработки
атрибутов.

**Токены живут в CSS, а не в конфиге.** Tailwind v4 инлайнит их через
`@theme`, поэтому компонент никогда не импортирует объект токенов.
Он просто пишет `bg-primary`. Понадобится сменить палитру — меняем один
CSS-файл.

**Тесты покрывают логику и контракты, а не стили.** Есть тесты на поведение
`asChild`, на открытие/закрытие `Dialog` и `Toast`, на обработку клавиатуры
в `Switch`. Нет теста, который проверяет, что `variant="primary"` навешивает
`bg-primary` — это тест на Tailwind, а не на компонент.

**Доступность — не опция.** Все компоненты проверяются через `jest-axe`
и `@storybook/addon-a11y`. `Dialog` и `Toast` используют Radix UI для
фокус-ловушек и ARIA-атрибутов.

## Скрипты

- `npm run storybook` — Storybook локально на :6006
- `npm run build-storybook` — статическая сборка
- `npm run test` — Vitest

## Живая версия

Storybook: <https://RodionTmnkv.github.io/kern/>

## Автор

Rodion Temnikov — [github.com/RodionTmnkv](https://github.com/RodionTmnkv)