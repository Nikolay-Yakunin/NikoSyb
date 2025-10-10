## post-service

post-service - микросервис для постов.

### Структура
```
post-service/
├── cmd
│   └── main.go           -- Entry point
├── internal
│   └── post              -- Post - Основной пакет бизнес логики
│       ├── handler.go    -- Gin харндлеры
│       ├── model.go      -- структура Post, включены метатеги для json и gorm
│       ├── repository.go -- паттерн Repository, планируется выделить в пакет, для переиспользования (насколько можно)
│       └── service.go    -- сервис Post
├── pkg
│   └── config            -- Паттерн Config
│       └── config.go     -- Пока содержит DNS для дб, PORT для сервера
├── go.mod               
├── go.sum
├── compose.dev.yaml
├── Dockerfile            -- Разделен на 2 стадии, на сборку и развертывание бинарника.
├── Makefile              -- make run; make fmt; make build
└── README.md             -- Вы сейчас здесь
```
### Планы

- Оптимизировать хранение постов
- Добавить кеширование
- Добавить метрики Prometheus и Grafana Loki