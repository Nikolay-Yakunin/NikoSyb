# post-service

post-service - микросервис для постов.

## Структура
```
.
├── cmd
│   └── main.go            -- Entry point
├── env
│   ├── .env.dev           -- Пример окружения для разработки
│   └── .env.prod          -- Пример окружения для продакшена
├── internal
│   └── post
│       ├── model.go       -- Тип Post
│       ├── handler.go     -- Gin хандлер
│       ├── repository.go  -- Паттерн Repository, планируется выделить в пакет, для переиспользования (насколько можно)
│       └── service.go     -- Паттерн Service, планирую добавить больше валидации
├── pkg
│   └── config
│       └── config.go      -- Паттерн Config
├── Dockerfile             -- Разделен на 2 стадии, на сборку и развертывание бинарника.
├── go.mod                 -- При форке, или других *перемещениях* кода, желательно актуализировать путь
├── Makefile               -- Команды для запуска, и линтинга
└── README.md              -- Вы сейчас здесь
```

## Makefile

- **run** - запускает сервис
- **build** - билдит сервис в бинарник 
- **fmt** - проходит fmt по всему проекту

## API

 - **/v1**
    - POST **/posts**              - Создает пост
    - GET  **/posts?page=&limit=** - Получить посты с пагинацие и лимитом
    - GET  **/posts/:id**          - Получить пост по id

### POST /v1/posts

Возможно, **"images"** будет удален, за ненадобностью.

#### Пример тела запроса:
```json
{
    "title": "test-api title",
    "body": "text or\n\n### Md\n\n**Yes**\n\n - *Blog* are supported ```md```\n\n```json\n\n{\n\n   'support': 'is well'\n\n}\n\n```",
    "images": ["image1"]
}
```

#### Коды ответов

 - **201**: пост успешно создан

### GET /v1/posts?page=&limit=

Запрос возвращает посты по страницам.

 - **page**: неотрицательное, целое число
 - **limit**: число от 1 до 100

#### Пример ответа

```json
{
    "page": 0,
    "limit": 10,
    "total": 0,
    "total_pages": 0,
    "posts": [ARRAY]
}
```

### GET /posts/:id

Запрос возвращает один пост по **id**.

 - **id**: неотрицательное, целое число

#### Пример ответа

```json
{
    "ID": 1,
    "CreatedAt": "2025-10-10T20:05:30.807155Z",
    "UpdatedAt": "2025-10-10T20:05:30.807155Z",
    "DeletedAt": null,
    "title": "title",
    "body": "body",
    "images": [],
}
```

## Post Type

Содержит 2 основных поля, одно шаткое, и встраивание для работы с **gorm**.

 - Title - Заголовок поста, храниться отдельно, для:
    - Неполнотекстового поиска
 - Body - Содержит контент поста, существуют вопросы, по поддержке изображений.
 - Images - Возможно не самый лучший вариант хранить изображения, скорее всего уберем данный атрибут. 

```go
type Post struct {
	gorm.Model
	Title string `json:"title" binding:"required" gorm:"type:varchar(255);not null"`
	Body string `json:"body" binding:"required" gorm:"type:text;not null"`
	Images pq.StringArray `json:"images" gorm:"type:text[]"`
}
```

## Планы

- Добавить аутентификацию для POST маршрутов
- Оптимизировать хранение постов
- Добавить метрики Prometheus и Grafana Loki