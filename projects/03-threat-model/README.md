# 03 - Threat Model Report

## Цель
Провести полноценный Threat Modeling для веб-приложения используя методологию STRIDE.

## Что делать
1. Выбрать реальное или учебное приложение (e-commerce, мессенджер, банк)
2. Нарисовать Data Flow Diagram (DFD)
3. Определить trust boundaries
4. Применить STRIDE к каждому элементу
5. Оценить и приоритизировать риски
6. Предложить контрмеры (mitigations)

## Структура отчёта

```
03-threat-model/
├── README.md
├── diagrams/
│   ├── system-context.png    # Контекстная диаграмма
│   ├── dfd-level0.png        # DFD уровень 0
│   └── dfd-level1.png        # DFD уровень 1 (детализация)
├── stride-analysis.md        # STRIDE анализ каждого компонента
├── risk-assessment.md        # Оценка рисков (CVSS или DREAD)
├── mitigations.md            # Рекомендации по защите
└── attack-trees/             # Attack trees для ключевых угроз
    ├── auth-bypass.md
    └── data-exfiltration.md
```

## Шаблон STRIDE анализа

| Элемент | Spoofing | Tampering | Repudiation | Info Disclosure | DoS | Elevation |
|---------|----------|-----------|-------------|-----------------|-----|-----------|
| Web App |          |           |             |                 |     |           |
| API     |          |           |             |                 |     |           |
| DB      |          |           |             |                 |     |           |
| Auth    |          |           |             |                 |     |           |

## Инструменты
- Microsoft Threat Modeling Tool (бесплатно) или draw.io
- Для диаграмм: Mermaid, PlantUML, или draw.io

## Ресурсы
- "Threat Modeling: Designing for Security" — Adam Shostack
- [OWASP Threat Modeling](https://owasp.org/www-community/Threat_Modeling)

## Статус: Planned
