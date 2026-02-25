# 05 - Linux Server Hardening Guide

## Цель
Создать практическое руководство по харденингу Linux-сервера (Ubuntu/Debian).

## Структура

### 1. Initial Setup
- [ ] Обновление системы
- [ ] Создание non-root пользователя
- [ ] Настройка sudo

### 2. SSH Hardening
- [ ] Отключение root login
- [ ] Ключи вместо паролей
- [ ] Смена порта
- [ ] Fail2ban

### 3. Firewall
- [ ] UFW / iptables базовые правила
- [ ] Принцип минимальных привилегий (deny all, allow specific)

### 4. Filesystem Security
- [ ] Права доступа на критичные файлы
- [ ] Immutable bit для конфигов
- [ ] /tmp с noexec

### 5. Audit & Monitoring
- [ ] auditd правила
- [ ] Логирование (rsyslog / journald)
- [ ] Мониторинг целостности файлов (AIDE)

### 6. Application Security
- [ ] Принцип минимальных сервисов
- [ ] AppArmor / SELinux профили
- [ ] Автообновления безопасности (unattended-upgrades)

## Формат
Каждый раздел содержит:
- Объяснение **зачем** это нужно
- Конкретные команды
- Скрипт автоматизации (Bash)
- Проверка: как убедиться, что настройка работает

## Бенчмарки
- CIS Benchmark для Ubuntu
- Lynis — автоматический аудит

## Статус: Planned
