# 02 - Secure API Design

## Цель
Спроектировать и реализовать REST API с учётом безопасности "by design".

## Что делать
1. Написать спецификацию API (OpenAPI/Swagger)
2. Реализовать API с правильной аутентификацией и авторизацией
3. Показать типичные ошибки и как их избежать
4. Добавить тесты безопасности

## Чек-лист безопасности API
- [ ] Аутентификация (JWT с правильной валидацией)
- [ ] Авторизация (RBAC, проверка прав на каждом эндпоинте)
- [ ] Input validation (параметры, body, headers)
- [ ] Rate limiting
- [ ] CORS правильно настроен
- [ ] Нет Mass Assignment
- [ ] Нет IDOR (Insecure Direct Object Reference)
- [ ] Логирование security-событий
- [ ] Обработка ошибок без утечки информации
- [ ] HTTPS only

## Технологии
- Python (Flask/FastAPI) или Node.js (Express)
- PostgreSQL
- JWT для аутентификации
- Docker

## Структура проекта
```
02-secure-api-design/
├── README.md
├── docs/
│   ├── api-spec.yaml        # OpenAPI спецификация
│   ├── security-decisions.md # Почему выбрали такую архитектуру
│   └── threat-model.md      # Threat model для этого API
├── src/
│   └── ...                  # Код API
├── tests/
│   ├── security/            # Security-тесты
│   └── functional/          # Функциональные тесты
├── Dockerfile
└── docker-compose.yml
```

## Статус: Planned
