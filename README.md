# NikoSyb

NikoSyb - блог фронт + бэк, фронт на Next Js + TS, бэк на Go + Gin, Gorm. Идея, хранить в бд посты с текстом MarkDown, передавать его через API, парсить на фронте и рендерить.

### Структура
```text
.
├── blog-client        -- Пользовательский клиент
├── blog-service       -- Сервис для блога
├── nginx              -- Папка для конфига nginx (монтируется в докер композ)
├── compose.prod.yaml  -- Докер композ файл (планируется перенести в отдельную директорию)
└── README.md          -- Вы сейчас здесь 
```

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