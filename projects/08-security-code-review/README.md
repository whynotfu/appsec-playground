# 08 - Security Code Review

## Цель
Провести security code review реальных open-source проектов и задокументировать находки.

## Что делать
1. Выбрать 3-5 небольших open-source веб-приложений
2. Провести ручной security code review
3. Использовать SAST-инструменты для автоматизированного анализа
4. Сравнить результаты ручного и автоматизированного анализа
5. Написать отчёты

## Чек-лист для code review

### Input Validation
- [ ] Все пользовательские входы валидируются
- [ ] Используется allowlist, а не denylist
- [ ] Нет SQL/NoSQL injection
- [ ] Нет Command injection
- [ ] Нет Path traversal

### Authentication & Session
- [ ] Пароли хешируются (bcrypt/argon2)
- [ ] Нет hardcoded credentials
- [ ] Сессии правильно invalidated
- [ ] CSRF protection

### Authorization
- [ ] Проверка прав на каждом эндпоинте
- [ ] Нет IDOR
- [ ] Принцип минимальных привилегий

### Data Protection
- [ ] Sensitive data не логируется
- [ ] Нет информации в error messages
- [ ] HTTPS enforced
- [ ] Правильное использование криптографии

### Dependencies
- [ ] Нет известных CVE в зависимостях
- [ ] Зависимости закреплены по версиям
- [ ] Нет лишних зависимостей

## Формат отчёта

```markdown
# Security Code Review: [Название проекта]

## Обзор проекта
- URL репозитория
- Технологии
- Размер кодовой базы

## Методология
- Ручной анализ: сколько времени
- Инструменты: какие SAST использовались

## Находки

### [FINDING-001] Название уязвимости
- **Severity:** High
- **Файл:** path/to/file.py:42
- **Описание:** ...
- **Код:** (фрагмент уязвимого кода)
- **Рекомендация:** (как исправить)

## Статистика
- Критических: X
- Высоких: X
- Средних: X
- Низких: X
```

## Инструменты
- Semgrep
- CodeQL
- Bandit (Python)
- ESLint security plugin (JavaScript)
- Ручной анализ + Burp Suite

## Статус: Planned
