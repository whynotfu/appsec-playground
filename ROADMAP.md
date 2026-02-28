# Roadmap: Application Security Engineer

> Путь от студента 2 курса до AppSec-инженера.
> Рассчитан на ~1.5-2 года до первого оффера.

---

## Общая стратегия

```
Сейчас (2 курс)          Стажировка/Junior         Middle            Senior
     |                         |                      |                 |
     v                         v                      v                 v
  Foundation    -->    AppSec Engineer Jr    -->   AppSec +       Security
  (6-8 мес)           (первая работа)          Threat Modeling    Architect
```

---

## ФАЗА 1: Фундамент (Февраль — Июль 2026)

Цель: построить базу знаний, без которой невозможно работать в AppSec.

### 1.1 Web Security Fundamentals (приоритет #1)

Это основа AppSec. Без этого никуда.

**Что изучить:**
- [ ] OWASP Top 10 — выучить наизусть, понимать каждую уязвимость
  - Injection (SQL, NoSQL, Command, LDAP)
  - Broken Authentication
  - Sensitive Data Exposure
  - XXE (XML External Entities)
  - Broken Access Control
  - Security Misconfiguration
  - XSS (Cross-Site Scripting)
  - Insecure Deserialization
  - Using Components with Known Vulnerabilities
  - Insufficient Logging & Monitoring
- [ ] HTTP протокол глубоко: методы, заголовки, cookies, CORS, CSP, HSTS
- [ ] Аутентификация и авторизация: OAuth 2.0, JWT, session management
- [ ] HTTPS/TLS: как работает, что может пойти не так

**Практика:**
- [ ] PortSwigger Web Security Academy (БЕСПЛАТНО) — пройти ВСЕ лабы
  - Это лучший бесплатный ресурс. Реально лучший. Начни с него.
  - https://portswigger.net/web-security
- [ ] OWASP Juice Shop — развернуть локально, найти уязвимости
- [ ] Hack The Box — начать с Easy машин (Web-категория)

**Инструменты освоить:**
- [ ] Burp Suite Community Edition — твой главный рабочий инструмент
- [ ] Browser DevTools (Network tab, Console) — ты уже знаешь как фронтендер
- [ ] curl / httpie — для ручных HTTP-запросов

### 1.2 Backend Security (параллельно, раз ты уже читаешь книгу)

**Что изучить:**
- [ ] Как работают бэкенд-фреймворки изнутри (выбери один: Go / Python Flask / Node.js Express)
- [ ] SQL и базы данных: нормальные запросы + как их ломают (SQL injection)
- [ ] API Security: REST, GraphQL — типичные уязвимости
  - BOLA (Broken Object Level Authorization)
  - Mass Assignment
  - Rate Limiting отсутствие
  - SSRF через API
- [ ] Криптография основы: хеширование (bcrypt, argon2), шифрование (AES, RSA), цифровые подписи

**Книги:**
- [ ] "The Web Application Hacker's Handbook" (Stuttard & Pinto) — библия AppSec
- [ ] Книга про архитектуру бэкенда, которую ты уже читаешь — дочитай
- [ ] OWASP Testing Guide (бесплатно онлайн)

### 1.3 Linux Security (ты уже изучаешь — отлично)

- [ ] Права доступа, пользователи, группы, sudo
- [ ] Файловая система, процессы, сервисы (systemd)
- [ ] Сетевые утилиты: netstat/ss, iptables/nftables, tcpdump
- [ ] SSH: настройка, ключи, hardening
- [ ] Базовый shell scripting для автоматизации

### 1.4 Networking Security (у тебя уже есть база — углуби)

- [ ] Wireshark — анализ трафика, поиск аномалий
- [ ] DNS Security: DNS poisoning, DNSSEC
- [ ] ARP spoofing, MITM-атаки (теория + лабы)
- [ ] VPN, туннелирование
- [ ] Firewall rules: iptables практика

---

## ФАЗА 2: Специализация AppSec (Август — Декабрь 2026)

Цель: стать способной пройти собеседование на Junior AppSec.

### 2.1 Security Code Review

Это то, чем AppSec-инженеры занимаются каждый день.

- [ ] Научиться читать чужой код и находить уязвимости
- [ ] Semgrep — статический анализатор (SAST), написать свои правила
- [ ] CodeQL — GitHub'овский инструмент анализа кода
- [ ] Практика: найти реальные CVE в open-source проектах, понять root cause

**Проект для портфолио:**
> Взять 3-5 open-source проектов, провести security review, написать отчёт
> с найденными проблемами и рекомендациями по исправлению.

### 2.2 Threat Modeling

Это навык, который отличает хорошего безопасника от посредственного.

- [ ] STRIDE модель (Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation of Privilege)
- [ ] Attack Trees
- [ ] Data Flow Diagrams (DFD)
- [ ] Практика: нарисовать threat model для любого приложения, которым пользуешься

**Проект для портфолио:**
> Полный threat model для веб-приложения: DFD, STRIDE анализ, список угроз,
> приоритизация рисков, рекомендации по митигации.

### 2.3 DevSecOps Basics

- [ ] CI/CD pipelines: GitHub Actions, GitLab CI
- [ ] SAST инструменты: Semgrep, SonarQube, Bandit (Python)
- [ ] DAST инструменты: OWASP ZAP, Nikto
- [ ] SCA (Software Composition Analysis): Dependabot, Snyk
- [ ] Container Security: Docker security best practices, Trivy
- [ ] Secrets scanning: git-secrets, truffleHog

**Проект для портфолио:**
> Собрать CI/CD пайплайн с интеграцией security-сканеров.
> GitHub Actions: SAST + SCA + secrets scan на каждый PR.

### 2.4 Vulnerability Management

- [ ] CVSS scoring — как оценивать severity
- [ ] CVE database — как искать и анализировать
- [ ] Responsible Disclosure — как правильно репортить уязвимости
- [ ] Bug Bounty программы — начать с лёгких программ (HackerOne, Bugcrowd)

---

## ФАЗА 3: Поиск работы (Январь — Март 2027)

### 3.1 Подготовка

- [ ] Портфолио на GitHub заполнено (минимум 5 проектов из списка)
- [ ] CTF writeups (минимум 10-15 решённых задач с объяснениями)
- [ ] Резюме адаптировано под AppSec / Security Engineer
- [ ] LinkedIn профиль оформлен (на английском тоже)

### 3.2 Где искать работу (Россия)

**Вакансии:**
- Application Security Engineer (Junior)
- Security Engineer
- DevSecOps Engineer (Junior)
- Инженер по информационной безопасности (AppSec)
- Специалист по анализу защищённости

**Компании в Москве, которые нанимают в AppSec:**
- Яндекс (Security Team)
- VK (ранее Mail.ru)
- Positive Technologies
- Kaspersky
- Сбер (Sber Security)
- Тинькофф
- Ozon
- Wildberries
- Bi.Zone
- Solar Security (Ростелеком)
- Digital Security
- Стажировки — почти все крупные компании имеют летние стажировки, подавайся!

### 3.3 Как проходят собеседования в AppSec

**Что спрашивают:**
1. OWASP Top 10 — расскажи про каждую, как эксплуатировать, как защитить
2. Практическое задание — найди уязвимости в коде / приложении
3. Threat modeling — нарисуй threat model для системы X
4. Сетевая безопасность — основы (TLS, DNS, HTTP)
5. Linux — базовые команды, права, процессы
6. Кейсовые вопросы: "Как бы ты защитил API для мобильного приложения?"

---

## ФАЗА 4: Рост (2027+)

### Security Architect Track (долгосрочная цель)

```
Junior AppSec (1-2 года)
    |
    v
Middle AppSec / Threat Modeling(2-3 года)
    |
    v
Senior AppSec / Security Architect (4-5 лет)
    |
    v
Principal Security Architect / CISO
```

**Что добавить со временем:**
- [ ] Cloud Security (AWS/Azure/GCP)
- [ ] Zero Trust Architecture
- [ ] Security Compliance (ISO 27001, SOC 2, PCI DSS)
- [ ] Incident Response
- [ ] Сертификация: OSCP, CISSP (после 5 лет опыта)

---

## Еженедельный план (пример типичной недели)

| День | Что делать | Время |
|------|-----------|-------|
| Пн | PortSwigger лабы (2-3 лабы) | 1.5-2ч |
| Вт | Книга (Web App Hacker's Handbook) + заметки | 1-1.5ч |
| Ср | Практика: CTF / Hack The Box | 1.5-2ч |
| Чт | Бэкенд: пишешь код + ищешь в нём уязвимости | 1.5-2ч |
| Пт | Security tools: Burp Suite, Semgrep практика | 1-1.5ч |
| Сб | Проект для портфолио (одну задачу) | 2-3ч |
| Вс | Отдых / лёгкое чтение статей, новости ИБ | 0.5-1ч |

**Итого:** ~10-13 часов в неделю (реалистично для студента)

---

## Полезные ресурсы

### Бесплатные
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) — #1 ресурс
- [OWASP](https://owasp.org) — стандарты, гайды, инструменты
- [Hack The Box](https://hackthebox.com) — практика [тут](https://profile.hackthebox.com/profile/019ca4cd-f85c-73e5-9926-56be2d60abdf)
- [TryHackMe](https://tryhackme.com) — более guided, хорошо для начала [тут](https://tryhackme.com/p/whynotfu)
- [PentesterLab](https://pentesterlab.com) — лабы по web security
- [CyberChef](https://gchq.github.io/CyberChef/) — швейцарский нож для encoding/decoding

### YouTube каналы
- LiveOverflow — объясняет сложные вещи просто
- John Hammond — CTF writeups
- IppSec — Hack The Box разборы
- Codeby (русскоязычный)

### Telegram-каналы (русскоязычные)
- @true_sec — новости ИБ
- @informhunting — bug bounty и pentest
- @webpwn — web security

### Книги (в порядке приоритета)
1. "The Web Application Hacker's Handbook" — Stuttard & Pinto
2. "Bug Bounty Bootcamp" — Vickie Li
3. "Threat Modeling: Designing for Security" — Adam Shostack
4. "The Tangled Web" — Michal Zalewski (web security deep dive)
5. "Hacking APIs" — Corey Ball

---

## Метрики успеха (чтобы отслеживать прогресс)

### К июлю 2026:
- [ ] 50+ решённых лаб на PortSwigger
- [ ] Развёрнут и взломан OWASP Juice Shop
- [ ] Уверенно работаешь с Burp Suite
- [ ] Понимаешь каждую уязвимость из OWASP Top 10

### К декабрю 2026:
- [ ] 5+ проектов в портфолио на GitHub
- [ ] 10+ CTF writeups
- [ ] Можешь провести security code review
- [ ] Можешь нарисовать threat model
- [ ] Настроен DevSecOps пайплайн

### К марту 2027:
- [ ] Подано 10+ заявок на стажировки/вакансии
- [ ] Пройдено минимум 3 собеседования
- [ ] Получен оффер

---
