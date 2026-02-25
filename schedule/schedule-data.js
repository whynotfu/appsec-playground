// ============================================================
// University Schedule — Group 241-327 (Московский Политех)
// ONLY in-person classes (lectures removed — they're useless)
// Commute: 1.5h each way
// ============================================================

const TIME_SLOTS = {
    1: { start: '9:00', end: '10:30' },
    2: { start: '10:40', end: '12:10' },
    3: { start: '12:20', end: '13:50' },
    4: { start: '14:30', end: '16:00' },
    5: { start: '16:10', end: '17:40' },
    6: { start: '17:50', end: '19:20' },
};

const COMMUTE_MINUTES = 90; // 1.5 hours each way

// Only in-person classes at physical locations
const UNI_CLASSES = [
    // === TUESDAY (day 2) ===
    { day: 2, slot: 5, subject: 'Дискретные структуры', type: 'Лаб', teacher: 'Набебин, Воробьев', location: 'Прянишникова ВЦ5', df: '2026-04-06', dt: '2026-05-02' },
    { day: 2, slot: 6, subject: 'Дискретные структуры', type: 'Лаб', teacher: 'Набебин, Воробьев', location: 'Прянишникова ВЦ5', df: '2026-04-06', dt: '2026-05-03' },
    { day: 2, slot: 6, subject: 'ОФП', type: 'Практика', teacher: '', location: 'Б. Семеновская, Спортзал', df: '2026-02-02', dt: '2026-06-06' },

    // === WEDNESDAY (day 3) ===
    { day: 3, slot: 1, subject: 'Иностранный язык', type: 'Практика', teacher: 'Асламова и др.', location: 'Автозаводская', df: '2026-04-06', dt: '2026-06-06' },
    { day: 3, slot: 2, subject: 'Иностранный язык', type: 'Практика', teacher: 'Асламова и др.', location: 'Автозаводская', df: '2026-04-06', dt: '2026-06-06' },

    // === THURSDAY (day 4) ===
    { day: 4, slot: 1, subject: 'Архитектура и дизайн ПО', type: 'Практика', teacher: 'Недогарок А.А.', location: 'Автозаводская ав4805', df: '2026-03-02', dt: '2026-04-05' },
    { day: 4, slot: 2, subject: 'Архитектура и дизайн ПО', type: 'Практика', teacher: 'Недогарок А.А.', location: 'Автозаводская ав4805', df: '2026-03-02', dt: '2026-04-05' },
    { day: 4, slot: 2, subject: 'Архитектура и дизайн ПО', type: 'Лаб', teacher: 'Недогарок, Николаев', location: 'Автозаводская ав1202', df: '2026-04-06', dt: '2026-06-06' },
    { day: 4, slot: 3, subject: 'Архитектура и дизайн ПО', type: 'Лаб', teacher: 'Недогарок, Николаев', location: 'Автозаводская ав1202', df: '2026-04-06', dt: '2026-06-07' },
    { day: 4, slot: 4, subject: 'ОС Linux', type: 'Практика', teacher: 'Горшков, Самсонов', location: 'Автозаводская ав4805', df: '2026-04-06', dt: '2026-06-06' },
    { day: 4, slot: 5, subject: 'ОС Linux', type: 'Лаб', teacher: 'Горшков, Самсонов', location: 'Автозаводская ав4810', df: '2026-04-06', dt: '2026-06-06' },

    // === FRIDAY (day 5) ===
    { day: 5, slot: 2, subject: 'ТерВер', type: 'Практика', teacher: 'Самохин В.Н.', location: 'Прянишникова Пр2503', df: '2026-04-06', dt: '2026-06-06' },
    { day: 5, slot: 3, subject: 'Разработка веб-приложений', type: 'Практика', teacher: 'Баринов В.Р.', location: 'Прянишникова ВЦ4', df: '2026-02-02', dt: '2026-04-04' },
    { day: 5, slot: 3, subject: 'ТерВер', type: 'Практика', teacher: 'Самохин В.Н.', location: 'Прянишникова Пр2305', df: '2026-04-06', dt: '2026-06-07' },
    { day: 5, slot: 4, subject: 'ТерВер', type: 'Практика', teacher: 'Самохин В.Н.', location: 'Прянишникова Пр2506', df: '2026-02-02', dt: '2026-04-04' },

    // === SATURDAY (day 6) ===
    { day: 6, slot: 2, subject: 'ИБ (1 подгр)', type: 'Лаб', teacher: 'Кривоногов А.А.', location: 'Автозаводская ав4808', df: '2026-04-06', dt: '2026-06-06' },
    { day: 6, slot: 3, subject: 'Разработка веб-приложений', type: 'Лаб', teacher: 'Баринов, Белич', location: 'Прянишникова Пр2304', df: '2026-02-02', dt: '2026-04-05' },
    { day: 6, slot: 3, subject: 'ИБ', type: 'Практика', teacher: 'Кривоногов А.А.', location: 'Автозаводская ав4808', df: '2026-04-06', dt: '2026-06-07' },
    { day: 6, slot: 4, subject: 'Разработка веб-приложений', type: 'Лаб', teacher: 'Баринов, Белич', location: 'Прянишникова Пр2304', df: '2026-02-02', dt: '2026-04-05' },
    { day: 6, slot: 4, subject: 'ИБ (2 подгр)', type: 'Лаб', teacher: 'Кривоногов А.А.', location: 'Автозаводская ав4808', df: '2026-04-06', dt: '2026-06-07' },
];

// ============================================================
// Security study tasks — adapted per day and period
// ============================================================

const SECURITY_TASKS_P1 = {
    1: [
        { time: '10:00 — 12:00', title: 'PortSwigger Web Security Academy', desc: '2-3 лабы по текущей теме недели', type: 'sec' },
        { time: '12:00 — 12:30', title: 'Перерыв + мемы', desc: 'Ты заслужила', type: 'rest' },
        { time: '13:00 — 14:30', title: 'Книга: Web App Hacker\'s Handbook', desc: 'Одна глава + заметки', type: 'sec' },
        { time: '15:00 — 17:00', title: 'Проект для портфолио', desc: 'Работа над текущим проектом из ROADMAP', type: 'sec' },
    ],
    2: [
        { time: '10:00 — 12:00', title: 'Burp Suite + Juice Shop', desc: 'Практика с перехватом трафика, поиск уязвимостей', type: 'sec' },
        { time: '13:00 — 14:30', title: 'Security Code Review', desc: 'Чтение чужого кода на уязвимости. Semgrep практика', type: 'sec' },
        { time: '~16:20', title: '>>> Дорога в универ', desc: 'Б. Семеновская (1.5ч)', type: 'commute' },
        { time: '17:50 — 19:20', title: 'ОФП', desc: 'Спортзал', type: 'uni' },
        { time: '~20:50', title: '<<< Дома', desc: '', type: 'commute' },
    ],
    3: [
        { time: '10:00 — 12:00', title: 'CTF / Hack The Box', desc: 'Решить 1 задачу. Написать writeup сразу!', type: 'ctf' },
        { time: '13:00 — 14:30', title: 'Backend Security: код + анализ', desc: 'Пишешь бэкенд — ищешь в нём уязвимости', type: 'sec' },
        { time: '15:00 — 16:00', title: 'Новости ИБ + community', desc: 'Telegram каналы, блоги, Twitter/X security', type: 'rest' },
    ],
    4: [
        { time: '~7:30', title: '>>> Дорога в универ', desc: 'Автозаводская (1.5ч)', type: 'commute' },
        { time: '9:00 — 12:10', title: 'Архитектура и дизайн ПО', desc: 'Практика | Автозаводская ав4805', type: 'uni' },
        { time: '~13:40', title: '<<< Дома', desc: '', type: 'commute' },
        { time: '14:30 — 16:00', title: 'Security Code Review практика', desc: 'Анализ open-source кода на уязвимости', type: 'sec' },
        { time: '16:30 — 17:30', title: 'Проект для портфолио', desc: 'Одна конкретная задача — commit & push', type: 'sec' },
    ],
    5: [
        { time: '9:00 — 10:30', title: 'PortSwigger лабы', desc: '1-2 лабы пока свежая голова', type: 'sec' },
        { time: '~10:50', title: '>>> Дорога в универ', desc: 'Прянишникова (1.5ч)', type: 'commute' },
        { time: '12:20 — 13:50', title: 'Разработка веб-приложений', desc: 'Практика | Прянишникова ВЦ4', type: 'uni' },
        { time: '14:30 — 16:00', title: 'ТерВер', desc: 'Практика | Прянишникова', type: 'uni' },
        { time: '~17:30', title: '<<< Дома', desc: '', type: 'commute' },
        { time: '18:30 — 19:30', title: 'CTF writeup', desc: 'Оформить решение задачи для портфолио', type: 'ctf' },
    ],
    6: [
        { time: '9:00 — 10:00', title: 'Повторение за неделю', desc: 'Пробежаться по заметкам, закрепить', type: 'sec' },
        { time: '~10:50', title: '>>> Дорога в универ', desc: 'Прянишникова (1.5ч)', type: 'commute' },
        { time: '12:20 — 16:00', title: 'Разработка веб-приложений', desc: 'Лаб. работа | Прянишникова Пр2304', type: 'uni' },
        { time: '~17:30', title: '<<< Дома', desc: '', type: 'commute' },
        { time: '18:30 — 19:30', title: 'Лёгкий контент', desc: 'LiveOverflow / John Hammond видео', type: 'rest' },
    ],
    0: [
        { time: '12:00 — 13:00', title: 'Обзор недели + планирование', desc: 'Что сделано — обновить чек-лист — цели на неделю', type: 'rest' },
        { time: '14:00 — 15:30', title: 'Лёгкое чтение / видео', desc: 'Статьи, подкасты, YouTube. Без давления', type: 'rest' },
    ],
};

const SECURITY_TASKS_P2 = {
    1: [
        { time: '10:00 — 12:00', title: 'PortSwigger Web Security Academy', desc: '2-3 лабы по текущей теме', type: 'sec' },
        { time: '12:00 — 12:30', title: 'Перерыв', desc: '...', type: 'rest' },
        { time: '13:00 — 14:30', title: 'Книга: Web App Hacker\'s Handbook', desc: 'Одна глава + заметки', type: 'sec' },
        { time: '15:00 — 17:00', title: 'Проект для портфолио', desc: 'Работа над текущим проектом из ROADMAP', type: 'sec' },
    ],
    2: [
        { time: '10:00 — 12:00', title: 'Burp Suite практика', desc: 'Перехват трафика, анализ приложений', type: 'sec' },
        { time: '12:30 — 13:30', title: 'Security новости', desc: 'Telegram, блоги, что нового в мире ИБ', type: 'rest' },
        { time: '~14:40', title: '>>> Дорога в универ', desc: 'Прянишникова (1.5ч)', type: 'commute' },
        { time: '16:10 — 19:20', title: 'Дискретные структуры + ОФП', desc: 'Лаб. работа | Прянишникова', type: 'uni' },
        { time: '~20:50', title: '<<< Дома', desc: '', type: 'commute' },
    ],
    3: [
        { time: '~7:30', title: '>>> Дорога в универ', desc: 'Автозаводская (1.5ч)', type: 'commute' },
        { time: '9:00 — 12:10', title: 'Иностранный язык', desc: 'Практика | Автозаводская', type: 'uni' },
        { time: '~13:40', title: '<<< Дома', desc: '', type: 'commute' },
        { time: '14:30 — 16:00', title: 'CTF / Hack The Box', desc: 'Решить задачу + writeup', type: 'ctf' },
        { time: '16:30 — 17:30', title: 'Security reading', desc: 'Книга или OWASP Testing Guide', type: 'sec' },
    ],
    4: [
        { time: '~9:10', title: '>>> Дорога в универ', desc: 'Автозаводская (1.5ч)', type: 'commute' },
        { time: '10:40 — 13:50', title: 'Архитектура и дизайн ПО', desc: 'Лаб. работа | Автозаводская', type: 'uni' },
        { time: '14:30 — 17:40', title: 'ОС Linux', desc: 'Практика + Лаб | Автозаводская', type: 'uni' },
        { time: '~19:10', title: '<<< Дома', desc: 'Тяжёлый день — отдыхай', type: 'commute' },
        { time: '20:00 — 20:30', title: 'Лёгкое чтение', desc: 'Одна статья / один пост. Не больше', type: 'rest' },
    ],
    5: [
        { time: '~9:10', title: '>>> Дорога в универ', desc: 'Прянишникова (1.5ч)', type: 'commute' },
        { time: '10:40 — 13:50', title: 'ТерВер', desc: 'Практика | Прянишникова', type: 'uni' },
        { time: '~15:20', title: '<<< Дома', desc: '', type: 'commute' },
        { time: '16:00 — 18:00', title: 'Проект для портфолио', desc: 'Фокус на текущий проект из ROADMAP', type: 'sec' },
        { time: '18:30 — 19:30', title: 'CTF практика', desc: 'PortSwigger / HTB — решить + задокументировать', type: 'ctf' },
    ],
    6: [
        { time: '~9:10', title: '>>> Дорога в универ', desc: 'Автозаводская (1.5ч)', type: 'commute' },
        { time: '10:40 — 16:00', title: 'Информационная безопасность', desc: 'Лаб + Практика | Автозаводская', type: 'uni' },
        { time: '~17:30', title: '<<< Дома', desc: '', type: 'commute' },
        { time: '18:30 — 19:30', title: 'Закрепление ИБ', desc: 'Повторить что было на паре, связать с OWASP', type: 'sec' },
    ],
    0: [
        { time: '12:00 — 13:00', title: 'Обзор недели + планирование', desc: 'Что сделано — чек-лист — цели на неделю', type: 'rest' },
        { time: '14:00 — 15:30', title: 'Лёгкий контент', desc: 'YouTube, статьи, подкасты. Для вдохновения', type: 'rest' },
    ],
};

const THURSDAY_BEFORE_MAR2 = [
    { time: '10:00 — 12:00', title: 'PortSwigger лабы', desc: '2-3 лабы. Бонусный свободный день!', type: 'sec' },
    { time: '13:00 — 14:30', title: 'Книга + заметки', desc: 'Web App Hacker\'s Handbook', type: 'sec' },
    { time: '15:00 — 16:30', title: 'CTF / Hack The Box', desc: 'Практика', type: 'ctf' },
    { time: '17:00 — 18:00', title: 'Проект для портфолио', desc: 'Доп. время на проект', type: 'sec' },
];

// ============================================================
// Weekly themes — 16 weeks of focused study
// Week 1 starts Feb 2, 2026
// tag: short monospace label for the theme
// ============================================================

const WEEKLY_THEMES = [
    { week: 1, theme: 'SQL Injection', tag: 'SQLi', focus: 'PortSwigger SQL injection labs. Понять UNION, blind, error-based' },
    { week: 2, theme: 'Authentication Attacks', tag: 'AUTH', focus: 'Brute force, credential stuffing, session fixation' },
    { week: 3, theme: 'XSS — Cross-Site Scripting', tag: 'XSS', focus: 'Reflected, Stored, DOM XSS. PortSwigger XSS labs' },
    { week: 4, theme: 'HTTP & Security Headers', tag: 'HTTP', focus: 'CORS, CSP, HSTS, cookies. Browser DevTools' },
    { week: 5, theme: 'Access Control & IDOR', tag: 'IDOR', focus: 'Broken access control. PortSwigger access control labs' },
    { week: 6, theme: 'API Security', tag: 'API', focus: 'BOLA, mass assignment, rate limiting. Burp + API' },
    { week: 7, theme: 'SSRF & XXE', tag: 'SSRF', focus: 'Server-Side Request Forgery, XML External Entities' },
    { week: 8, theme: 'Криптография', tag: 'CRYPTO', focus: 'Хеширование, шифрование, JWT. CyberChef практика' },
    { week: 9, theme: 'Security Code Review', tag: 'REVIEW', focus: 'Semgrep, CodeQL. Анализ open-source кода' },
    { week: 10, theme: 'Threat Modeling (STRIDE)', tag: 'STRIDE', focus: 'DFD диаграммы, STRIDE анализ. Первый threat model' },
    { week: 11, theme: 'Linux Hardening', tag: 'LINUX', focus: 'SSH, iptables, права, аудит. Практика на VM' },
    { week: 12, theme: 'DevSecOps', tag: 'CICD', focus: 'GitHub Actions + Semgrep + Dependabot в CI/CD' },
    { week: 13, theme: 'Container Security', tag: 'DOCKER', focus: 'Docker security, Trivy, минимальные образы' },
    { week: 14, theme: 'Network Analysis', tag: 'NET', focus: 'Wireshark, tcpdump, pcap анализ' },
    { week: 15, theme: 'Bug Bounty Intro', tag: 'BOUNTY', focus: 'HackerOne, Bugcrowd. Разведка, recon' },
    { week: 16, theme: 'Portfolio Sprint', tag: 'SHIP', focus: 'Финализация проектов, оформление GitHub' },
];

// ============================================================
// Milestones
// ============================================================

const MILESTONES = [
    { date: '2026-03-15', title: '// checkpoint: 20+ PortSwigger лаб', type: 'sec' },
    { date: '2026-04-01', title: '// checkpoint: Burp Suite — уверенно работаешь', type: 'sec' },
    { date: '2026-04-05', title: '// end P1 — конец 1-й половины семестра', type: 'uni' },
    { date: '2026-04-06', title: '// start P2 — расписание меняется!', type: 'uni' },
    { date: '2026-04-15', title: '// checkpoint: 1-й проект в портфолио готов', type: 'sec' },
    { date: '2026-04-30', title: '// checkpoint: 50+ PortSwigger лаб', type: 'sec' },
];

// ============================================================
// Stickers — save images to schedule/img/ with these filenames
// ============================================================

const STICKERS = {
    tired:    { file: 'img/tired.jpg',    caption: 'I AM TIRED AS HELL' },
    pora:     { file: 'img/pora.jpg',     caption: 'ПОРА' },
    shocked:  { file: 'img/shocked.jpg',  caption: '这么强？' },
    doubt:    { file: 'img/doubt.jpg',    caption: 'ВРЯД-ЛИ' },
    vibing:   { file: 'img/vibing.jpg',   caption: '*vibing*' },
    rough:    { file: 'img/rough.jpg',     caption: 'mood' },
    cool:     { file: 'img/cool.jpg',     caption: 'cool' },
};

// Sticker rotation is handled in app.js via date hash

const PERIOD_CHANGE_DATE = '2026-04-06';
