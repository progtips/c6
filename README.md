# c5
Браузерный калькулятор

## Тестирование

### Модульные тесты (Vitest)

Запуск модульных тестов:
```powershell
npm test
```

Запуск с UI:
```powershell
npm run test:ui
```

Запуск с покрытием кода:
```powershell
npm run test:coverage
```

### E2E тесты (Playwright)

Запуск E2E тестов:
```powershell
npm run test:e2e
```

Запуск E2E тестов с UI:
```powershell
npm run test:e2e:ui
```

Запуск E2E тестов в режиме с браузером:
```powershell
npm run test:e2e:headed
```

E2E тесты автоматически запускают локальный сервер и проверяют работу калькулятора в браузерах Chromium, Firefox и WebKit.