## user-client

user-client - клиент для блога.

### Структура
```
.
├── app
│   ├── blog
│   │   ├── [id]
│   │   │   └── page.tsx  -- Динамическая страница поста
│   │   └── page.tsx      -- Динамический список постов
│   ├── favicon.ico       -- Иконка
│   ├── globals.css       -- Убраны темная тема, измененны переменные
│   ├── layout.tsx        -- Измененны шрифты
│   └── page.tsx          -- Главная
├── types
│   ├── index.ts
│   └── post.ts           -- Тип для поста и постов по API 
├── biome.json            -- Линтер
├── Dockerfile            -- Разделен на 2 стадии, сборку и развертывание
├── next.config.ts
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md             -- Вы сейчас здесь
└── tsconfig.json
```
### Планы

- Рефакторинг