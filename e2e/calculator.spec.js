import { test, expect } from '@playwright/test';

test.describe('Калькулятор - E2E тесты', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculator.html');
  });

  test.describe('Ввод чисел', () => {
    test('должен отображать введенное число', async ({ page }) => {
      const display = page.locator('#display');
      await expect(display).toHaveText('0');

      await page.click('button:has-text("5")');
      await expect(display).toHaveText('5');
    });

    test('должен отображать многоразрядное число', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("1")');
      await page.click('button:has-text("2")');
      await page.click('button:has-text("3")');
      
      await expect(display).toHaveText('123');
    });

    test('должен отображать ноль при первом вводе', async ({ page }) => {
      const display = page.locator('#display');
      await expect(display).toHaveText('0');
    });

    test('должен заменять ноль на первую цифру', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("7")');
      await expect(display).toHaveText('7');
    });

    test('должен добавлять десятичную точку', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("5")');
      await page.click('button:has-text(".")');
      
      await expect(display).toHaveText('5.');
    });

    test('должен добавлять цифры после десятичной точки', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("3")');
      await page.click('button:has-text(".")');
      await page.click('button:has-text("1")');
      await page.click('button:has-text("4")');
      
      await expect(display).toHaveText('3.14');
    });

    test('не должен добавлять вторую десятичную точку в одном числе', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("2")');
      await page.click('button:has-text(".")');
      await page.click('button:has-text("5")');
      await page.click('button:has-text(".")');
      
      await expect(display).toHaveText('2.5');
    });

    test('должен добавлять десятичную точку к нулю', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text(".")');
      await expect(display).toHaveText('0.');
    });
  });

  test.describe('Операции', () => {
    test('должен добавлять оператор сложения', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("5")');
      await page.click('button.operator:has-text("+")');
      
      await expect(display).toHaveText('5+');
    });

    test('должен добавлять оператор вычитания', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("8")');
      await page.click('button.operator:has-text("-")');
      
      await expect(display).toHaveText('8-');
    });

    test('должен добавлять оператор умножения', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("6")');
      // Используем селектор по позиции или по onclick атрибуту
      // Кнопка умножения находится в первой строке, третья кнопка оператора
      await page.click('button.operator[onclick*="appendOperator(\'*\')"]');
      
      // Проверяем, что отображается символ умножения (× или *)
      const displayText = await display.textContent();
      expect(displayText).toMatch(/6[×*]/);
    });

    test('должен добавлять оператор деления', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("9")');
      await page.click('button.operator:has-text("/")');
      
      await expect(display).toHaveText('9/');
    });

    test('должен заменять предыдущий оператор новым', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("4")');
      await page.click('button.operator:has-text("+")');
      await page.click('button.operator:has-text("-")');
      
      await expect(display).toHaveText('4-');
    });

    test('должен выполнять операцию сложения', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("5")');
      await page.click('button.operator:has-text("+")');
      await page.click('button:has-text("3")');
      await page.click('button.equals');
      
      await expect(display).toHaveText('8');
    });

    test('должен выполнять операцию вычитания', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("1")');
      await page.click('button:has-text("0")');
      await page.click('button.operator:has-text("-")');
      await page.click('button:has-text("4")');
      await page.click('button.equals');
      
      await expect(display).toHaveText('6');
    });

    test('должен выполнять операцию умножения', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("6")');
      await page.click('button.operator:has-text("×")');
      await page.click('button:has-text("7")');
      await page.click('button.equals');
      
      await expect(display).toHaveText('42');
    });

    test('должен выполнять операцию деления', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("1")');
      await page.click('button:has-text("5")');
      await page.click('button.operator:has-text("/")');
      await page.click('button:has-text("3")');
      await page.click('button.equals');
      
      await expect(display).toHaveText('5');
    });

    test('должен выполнять сложное выражение', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("1")');
      await page.click('button:has-text("0")');
      await page.click('button.operator:has-text("+")');
      await page.click('button:has-text("5")');
      await page.click('button.operator:has-text("×")');
      await page.click('button:has-text("2")');
      await page.click('button.equals');
      
      await expect(display).toHaveText('20');
    });
  });

  test.describe('Отображение результатов', () => {
    test('должен отображать результат простого сложения', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("2")');
      await page.click('button.operator:has-text("+")');
      await page.click('button:has-text("2")');
      await page.click('button.equals');
      
      await expect(display).toHaveText('4');
    });

    test('должен отображать результат с десятичными числами', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("5")');
      await page.click('button:has-text(".")');
      await page.click('button:has-text("5")');
      await page.click('button.operator:has-text("+")');
      await page.click('button:has-text("2")');
      await page.click('button:has-text(".")');
      await page.click('button:has-text("5")');
      await page.click('button.equals');
      
      const result = await display.textContent();
      expect(parseFloat(result)).toBeCloseTo(8, 5);
    });

    test('должен отображать отрицательный результат', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("5")');
      await page.click('button.operator:has-text("-")');
      await page.click('button:has-text("1")');
      await page.click('button:has-text("0")');
      await page.click('button.equals');
      
      await expect(display).toHaveText('-5');
    });

    test('должен отображать ошибку при делении на ноль', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("1")');
      await page.click('button:has-text("0")');
      await page.click('button.operator:has-text("/")');
      await page.click('button:has-text("0")');
      await page.click('button.equals');
      
      await expect(display).toHaveText('Ошибка');
    });

    test('должен отображать результат после вычисления при новом вводе', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("5")');
      await page.click('button.operator:has-text("+")');
      await page.click('button:has-text("3")');
      await page.click('button.equals');
      await expect(display).toHaveText('8');
      
      await page.click('button:has-text("7")');
      await expect(display).toHaveText('7');
    });
  });

  test.describe('Функции управления', () => {
    test('должен очищать дисплей при нажатии C', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("1")');
      await page.click('button:has-text("2")');
      await page.click('button:has-text("3")');
      await expect(display).toHaveText('123');
      
      await page.click('button.clear');
      await expect(display).toHaveText('0');
    });

    test('должен удалять последний символ при нажатии ⌫', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("1")');
      await page.click('button:has-text("2")');
      await page.click('button:has-text("3")');
      await expect(display).toHaveText('123');
      
      await page.click('button.operator:has-text("⌫")');
      await expect(display).toHaveText('12');
      
      await page.click('button.operator:has-text("⌫")');
      await expect(display).toHaveText('1');
      
      await page.click('button.operator:has-text("⌫")');
      await expect(display).toHaveText('0');
    });

    test('должен удалять оператор при нажатии ⌫', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("5")');
      await page.click('button.operator:has-text("+")');
      await expect(display).toHaveText('5+');
      
      await page.click('button.operator:has-text("⌫")');
      await expect(display).toHaveText('5');
    });
  });

  test.describe('Клавиатурный ввод', () => {
    test('должен реагировать на ввод цифр с клавиатуры', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.keyboard.press('5');
      await expect(display).toHaveText('5');
      
      await page.keyboard.press('3');
      await expect(display).toHaveText('53');
    });

    test('должен реагировать на операторы с клавиатуры', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.keyboard.press('8');
      await page.keyboard.press('+');
      await expect(display).toHaveText('8+');
      
      await page.keyboard.press('2');
      await page.keyboard.press('Enter');
      await expect(display).toHaveText('10');
    });

    test('должен реагировать на Enter для вычисления', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.keyboard.press('6');
      await page.keyboard.press('*');
      await page.keyboard.press('7');
      await page.keyboard.press('Enter');
      
      await expect(display).toHaveText('42');
    });

    test('должен реагировать на Escape для очистки', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.keyboard.press('9');
      await page.keyboard.press('9');
      await expect(display).toHaveText('99');
      
      await page.keyboard.press('Escape');
      await expect(display).toHaveText('0');
    });

    test('должен реагировать на Backspace для удаления', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.keyboard.press('4');
      await page.keyboard.press('5');
      await page.keyboard.press('6');
      await expect(display).toHaveText('456');
      
      await page.keyboard.press('Backspace');
      await expect(display).toHaveText('45');
    });

    test('должен реагировать на точку с клавиатуры', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.keyboard.press('3');
      await page.keyboard.press('.');
      await page.keyboard.press('1');
      await page.keyboard.press('4');
      
      await expect(display).toHaveText('3.14');
    });
  });

  test.describe('Интеграционные сценарии', () => {
    test('должен выполнять последовательность операций', async ({ page }) => {
      const display = page.locator('#display');
      
      // 10 + 5 = 15
      await page.click('button:has-text("1")');
      await page.click('button:has-text("0")');
      await page.click('button.operator:has-text("+")');
      await page.click('button:has-text("5")');
      await page.click('button.equals');
      await expect(display).toHaveText('15');
      
      // 15 * 2 = 30
      await page.click('button.operator:has-text("×")');
      await page.click('button:has-text("2")');
      await page.click('button.equals');
      await expect(display).toHaveText('30');
    });

    test('должен обрабатывать цепочку вычислений', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button:has-text("2")');
      await page.click('button.operator:has-text("+")');
      await page.click('button:has-text("3")');
      await page.click('button.operator:has-text("×")');
      await page.click('button:has-text("4")');
      await page.click('button.equals');
      
      // 2 + 3 * 4 = 14 (умножение имеет приоритет)
      await expect(display).toHaveText('14');
    });

    test('должен работать с нулем', async ({ page }) => {
      const display = page.locator('#display');
      
      await page.click('button.zero');
      await expect(display).toHaveText('0');
      
      await page.click('button:has-text("5")');
      await page.click('button.operator:has-text("×")');
      await page.click('button.zero');
      await page.click('button.equals');
      
      await expect(display).toHaveText('0');
    });
  });
});

