# Santero Город — рабочий отчёт

**Обновление:** 2026-10-15 13:00 CEST

---

## Состояние

- Этап 1 (стабилизация / CI): **закрыт**
- Этап 2 (архитектура UI): **шаг 1 выполнен**
- Backend: не начат

---

## План этапа 2 (приоритеты)

1. **Сделано:** вынести Splash, BottomNav, MainHome из page.tsx
2. Дальше: CitySelect, Travel, hook hydrate города, ScreenShell для переходов
3. Затем: заглушки vs реальные входы, лёгкий desktop max-width
4. Не трогать domain modules без нужды; не backend

---

## Шаг 1 — что изменено

| Файл | Роль |
|------|------|
| `src/app/ui/SplashScreen.tsx` | splash SG |
| `src/app/ui/BottomNav.tsx` | нижнее меню |
| `src/app/ui/MainHomeScreen.tsx` | главная + collapse header |
| `src/app/page.tsx` | только маршрутизация экранов и state |

Поведение сохранено. Заглушки «Транспорт / Места / События» помечены «Скоро» / «не подключён». Карточки Вакансии и Новости ведут в реальные модули.

---

## CI (подтверждено)

**Run #6:** https://github.com/nuroxsfera/santero-gorod/actions/runs/38724083703  
**SHA:** `899bc85`  
**Conclusion:** **success** (typecheck, 39 tests, lint, build)

---

## Следующий шаг

Вынести CitySelect + Travel + опционально `useCityBootstrap`, снова прогнать CI.
