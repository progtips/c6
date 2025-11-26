# Инструкция по деплою на Vercel

## Проблема 404: NOT_FOUND

Если после деплоя вы видите ошибку 404, это обычно означает, что Vercel не может найти файлы или неправильно настроена маршрутизация.

### ✅ Решение (обновлено)

Файл `vercel.json` уже настроен правильно с маршрутизацией. Если проблема сохраняется, выполните следующие шаги:

### 1. Проверьте настройки проекта в Vercel Dashboard

1. Зайдите в настройки проекта на [vercel.com](https://vercel.com)
2. Перейдите в раздел **Settings** → **General**
3. Убедитесь, что:
   - **Framework Preset**: `Other` или `Static HTML`
   - **Root Directory**: `.` (точка, корень проекта)
   - **Build Command**: оставьте пустым или укажите `null`
   - **Output Directory**: `.` (точка) или оставьте пустым
   - **Install Command**: `pnpm install` (если используете pnpm)

### 2. Пересоберите проект

После изменения настроек:
1. Перейдите в раздел **Deployments**
2. Найдите последний деплой
3. Нажмите **Redeploy** (три точки → Redeploy)

### 3. Альтернативный вариант через CLI

Если проблема сохраняется, попробуйте задеплоить через CLI:

```powershell
# Установите Vercel CLI (если еще не установлен)
npm install -g vercel

# Задеплойте проект с явными настройками
vercel --prod
```

При запросе настроек укажите:
- **Set up and deploy?** → `Y`
- **Which scope?** → выберите ваш аккаунт
- **Link to existing project?** → `N` (или `Y` если проект уже существует)
- **What's your project's name?** → `c6` или другое имя
- **In which directory is your code located?** → `./`
- **Want to override the settings?** → `Y`
- **Which settings would you like to override?** → выберите все настройки
- **Framework?** → `Other`
- **Build Command?** → оставьте пустым
- **Output Directory?** → `.`
- **Development Command?** → оставьте пустым
- **Install Command?** → `pnpm install`

### 4. Проверьте файлы в репозитории

Убедитесь, что все файлы закоммичены и запушены в Git:

```powershell
git status
git add .
git commit -m "Подготовка к деплою на Vercel"
git push
```

### 5. Конфигурация vercel.json

Текущий `vercel.json` содержит правильную конфигурацию с маршрутизацией:

```json
{
  "version": 2,
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

Эта конфигурация перенаправляет все запросы к `index.html`, что необходимо для статического сайта.

**Важно**: Убедитесь, что файл `vercel.json` закоммичен и запушен в репозиторий!

## Структура проекта

Проект должен содержать:
- `index.html` - главный файл (обязательно)
- `package.json` - файл зависимостей
- `vercel.json` - конфигурация Vercel (опционально)

## Проверка локально

Перед деплоем проверьте, что сайт работает локально:

```powershell
# Установите зависимости
pnpm install

# Запустите локальный сервер
npx http-server . -p 3000
```

Откройте браузер и перейдите на `http://localhost:3000` - должен открыться калькулятор.

