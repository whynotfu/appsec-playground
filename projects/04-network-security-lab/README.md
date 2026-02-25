# 04 - Network Security Lab

## Цель
Настроить сетевую безопасность: firewall, IDS, анализ трафика.

## Что делать
1. Развернуть виртуальную сеть (VirtualBox/VMware или Docker)
2. Настроить firewall (iptables/nftables)
3. Развернуть IDS (Suricata или Snort)
4. Провести анализ трафика с Wireshark
5. Задокументировать каждый шаг

## Лабораторные работы

### Lab 1: Firewall Configuration
- Настройка iptables правил
- Блокировка нежелательного трафика
- Логирование подозрительной активности

### Lab 2: IDS/IPS Setup
- Установка Suricata
- Написание кастомных правил
- Обнаружение типичных атак (port scan, brute force)

### Lab 3: Traffic Analysis
- Захват и анализ трафика Wireshark
- Обнаружение аномалий в pcap-файлах
- Анализ DNS-запросов, HTTP-трафика

### Lab 4: VPN Setup
- Настройка WireGuard
- Проверка утечек (DNS leak, WebRTC)

## Инструменты
- Wireshark
- Suricata / Snort
- iptables / nftables
- nmap
- tcpdump

## Статус: Planned
