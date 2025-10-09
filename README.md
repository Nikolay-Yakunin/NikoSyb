# NikoSyb

NikoSyb - блог фронт + бэк, фронт на Next Js + TS, бэк на Go + Gin, Gorm. Идея, хранить в бд посты с текстом MarkDown, передавать его через API, парсить(я нашел какую-то либу, но она чет не очень) на фронте и рендерить.

## blog-service

blog-service - микросервис для постов.

### Структура
```
blog-service/
├── cmd
│   └── main.go           -- Entry point
├── internal
│   └── post              -- Post - Основной пакет бизнес логики
│       ├── handler.go    -- Gin харндлеры
│       ├── model.go      -- структура Post, включены метатеги для json и gorm
│       ├── repository.go -- паттерн Repository, планируется выделить в пакет, для переиспользования (насколько можно)
│       └── service.go
├── pkg
│   └── config            -- Паттерн Config
│       └── config.go     -- Пока содержит только DNS для дб
├── go.mod               
├── go.sum
├── compose.dev.yaml      -- Dev композ файл, пока только база и субд, в дальнейшем будет сборка приложения и nginx
└── Makefile              -- make run; make fmt; make build
```
### Планы

- Оптимизировать хранение постов
- Добавить админку и кеширование
- Добавить метрики Prometheus и Grafana Loki

## blog-client

blog-client - клиент для блога.

### Структура
```
blog-client/
├── app
│   ├── blog              -- Блог
│   │   └── page.tsx      -- Страница ленты постов
│   ├── favicon.ico
│   ├── globals.css       -- Глобальные стили, убрана темная тема и изменен container
│   ├── layout.tsx        -- Добавлен шрифт Roboto_mono
│   └── page.tsx          -- Home Page - Футер с ссылками, hero с сслыкой на блог и на этот репозиторий
│── types
│   ├── index.ts          
│   └── post.ts           -- Тип для постов с API
├── biome.json            -- Используется biome вместо prettier ```npm run format```
├── next.config.ts
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
└── public                -- Всякая статика, еще не очищенна
    ├── file.svg
    ├── globe.svg
    ├── next.svg
    ├── vercel.svg
    └── window.svg
```
### Планы

- Починить рендер md синтаксиса
- доработать обработку ошибок, лоадеры и скелетоны (создать их хотя бы)
- Сделать динамическую страницу поста
- Добавить контейнер и nginx

## Запуск

1) Склонируйте репозиторий

```sh
git clone https://github.com/Nikolay-Yakunin/NikoSyb.git
cd NikoSyb
```

2) Скопируйте переменные окружения
```sh
cd blog-service
cp .env.example .env
```

3) Запустите docker-compose в первый раз
```sh
cd ..
docker-compose -f compose.prod.yaml up --build
```

4) Перейдите на ```http://localhost```
```sh
open http://localhost
```

Ура! (Скорее всего, там не будет контента ;) )