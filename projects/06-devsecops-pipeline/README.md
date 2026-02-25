# 06 - DevSecOps CI/CD Pipeline

## Цель
Собрать CI/CD пайплайн с интегрированными security-инструментами.

## Архитектура пайплайна

```
Developer Push → GitHub Actions Pipeline:
  ├── 1. Secret Scanning (truffleHog / git-secrets)
  ├── 2. SAST - Static Analysis (Semgrep)
  ├── 3. SCA - Dependency Check (Snyk / npm audit / safety)
  ├── 4. Unit Tests
  ├── 5. Docker Build
  ├── 6. Container Scan (Trivy)
  ├── 7. DAST - Dynamic Analysis (OWASP ZAP)
  └── 8. Report Generation
```

## Что реализовать

### GitHub Actions Workflow
- [ ] `.github/workflows/security.yml` — основной security пайплайн
- [ ] Срабатывает на каждый PR
- [ ] Блокирует merge при Critical/High findings
- [ ] Генерирует отчёт в PR comments

### Инструменты в пайплайне
| Этап | Инструмент | Что ищет |
|------|-----------|----------|
| Secrets | truffleHog | API ключи, пароли в коде |
| SAST | Semgrep | SQL injection, XSS, и т.д. |
| SCA | Snyk/Dependabot | Уязвимые зависимости |
| Container | Trivy | CVE в Docker образе |
| DAST | OWASP ZAP | Runtime уязвимости |

### Демо-приложение
- Простое веб-приложение (с намеренными уязвимостями для демонстрации)
- Dockerfile
- docker-compose.yml

## Структура
```
06-devsecops-pipeline/
├── README.md
├── .github/
│   └── workflows/
│       └── security.yml
├── app/                    # Демо-приложение
├── security-configs/
│   ├── semgrep-rules.yml   # Кастомные правила Semgrep
│   ├── trivy-config.yml
│   └── zap-config.yml
├── Dockerfile
└── docker-compose.yml
```

## Статус: Planned
