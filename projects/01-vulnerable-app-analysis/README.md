# 01 - Vulnerable App Analysis

## Цель
Анализ уязвимостей в веб-приложении по методологии OWASP Top 10.

## Что делать
1. Развернуть OWASP Juice Shop (или DVWA) локально через Docker
2. Систематически проверить приложение на каждую категорию OWASP Top 10
3. Задокументировать каждую найденную уязвимость
4. Предложить исправления (remediation)

## Формат отчёта для каждой уязвимости

```markdown
### [Название уязвимости]
- **Категория OWASP:** (например, A01:2021 - Broken Access Control)
- **Severity:** Critical / High / Medium / Low
- **Описание:** Что именно не так
- **Шаги воспроизведения:**
  1. ...
  2. ...
  3. ...
- **Доказательство:** (скриншоты, HTTP-запросы из Burp Suite)
- **Воздействие:** Что может сделать атакующий
- **Рекомендация по исправлению:** Как это починить
```

## Инструменты
- Burp Suite Community Edition
- Docker (для запуска Juice Shop)
- Browser DevTools

## Ресурсы
- [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/)
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)

## Статус: Planned
