import { describe, it, expect, beforeEach } from 'vitest';
import { Calculator } from './calculator.js';

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    describe('appendNumber', () => {
        it('должен добавить цифру к текущему вводу', () => {
            calculator.appendNumber('5');
            expect(calculator.getDisplay()).toBe('5');
        });

        it('должен заменить 0 на первую цифру', () => {
            calculator.appendNumber('3');
            expect(calculator.getDisplay()).toBe('3');
        });

        it('должен добавить цифру к существующему числу', () => {
            calculator.appendNumber('1');
            calculator.appendNumber('2');
            calculator.appendNumber('3');
            expect(calculator.getDisplay()).toBe('123');
        });

        it('должен сбросить дисплей после вычисления перед добавлением новой цифры', () => {
            calculator.appendNumber('5');
            calculator.appendOperator('+');
            calculator.appendNumber('3');
            calculator.calculate();
            calculator.appendNumber('7');
            expect(calculator.getDisplay()).toBe('7');
        });

        it('должен добавить несколько цифр подряд', () => {
            calculator.appendNumber('9');
            calculator.appendNumber('8');
            calculator.appendNumber('7');
            expect(calculator.getDisplay()).toBe('987');
        });
    });

    describe('appendDecimal', () => {
        it('должен добавить десятичную точку', () => {
            calculator.appendNumber('5');
            calculator.appendDecimal();
            expect(calculator.getDisplay()).toBe('5.');
        });

        it('должен добавить десятичную точку к нулю', () => {
            calculator.appendDecimal();
            expect(calculator.getDisplay()).toBe('0.');
        });

        it('не должен добавлять вторую десятичную точку', () => {
            calculator.appendNumber('5');
            calculator.appendDecimal();
            calculator.appendDecimal();
            expect(calculator.getDisplay()).toBe('5.');
        });

        it('должен сбросить дисплей после вычисления перед добавлением точки', () => {
            calculator.appendNumber('5');
            calculator.appendOperator('+');
            calculator.appendNumber('3');
            calculator.calculate();
            calculator.appendDecimal();
            expect(calculator.getDisplay()).toBe('0.');
        });

        it('должен добавить точку к многоразрядному числу', () => {
            calculator.appendNumber('1');
            calculator.appendNumber('2');
            calculator.appendNumber('3');
            calculator.appendDecimal();
            expect(calculator.getDisplay()).toBe('123.');
        });
    });

    describe('appendOperator', () => {
        it('должен добавить оператор сложения', () => {
            calculator.appendNumber('5');
            calculator.appendOperator('+');
            expect(calculator.getDisplay()).toBe('5+');
        });

        it('должен добавить оператор вычитания', () => {
            calculator.appendNumber('10');
            calculator.appendOperator('-');
            expect(calculator.getDisplay()).toBe('10-');
        });

        it('должен добавить оператор умножения', () => {
            calculator.appendNumber('7');
            calculator.appendOperator('*');
            expect(calculator.getDisplay()).toBe('7*');
        });

        it('должен добавить оператор деления', () => {
            calculator.appendNumber('8');
            calculator.appendOperator('/');
            expect(calculator.getDisplay()).toBe('8/');
        });

        it('должен заменить предыдущий оператор новым', () => {
            calculator.appendNumber('5');
            calculator.appendOperator('+');
            calculator.appendOperator('-');
            expect(calculator.getDisplay()).toBe('5-');
        });

        it('должен заменить несколько операторов подряд', () => {
            calculator.appendNumber('3');
            calculator.appendOperator('+');
            calculator.appendOperator('*');
            calculator.appendOperator('/');
            expect(calculator.getDisplay()).toBe('3/');
        });

        it('должен добавить оператор после вычисления', () => {
            calculator.appendNumber('5');
            calculator.appendOperator('+');
            calculator.appendNumber('3');
            calculator.calculate();
            calculator.appendOperator('*');
            expect(calculator.getDisplay()).toBe('8*');
        });
    });

    describe('calculate', () => {
        describe('положительные сценарии', () => {
            it('должен выполнить сложение', () => {
                calculator.appendNumber('5');
                calculator.appendOperator('+');
                calculator.appendNumber('3');
                const result = calculator.calculate();
                expect(result).toBe('8');
                expect(calculator.getDisplay()).toBe('8');
            });

            it('должен выполнить вычитание', () => {
                calculator.appendNumber('10');
                calculator.appendOperator('-');
                calculator.appendNumber('4');
                const result = calculator.calculate();
                expect(result).toBe('6');
                expect(calculator.getDisplay()).toBe('6');
            });

            it('должен выполнить умножение', () => {
                calculator.appendNumber('6');
                calculator.appendOperator('*');
                calculator.appendNumber('7');
                const result = calculator.calculate();
                expect(result).toBe('42');
                expect(calculator.getDisplay()).toBe('42');
            });

            it('должен выполнить деление', () => {
                calculator.appendNumber('15');
                calculator.appendOperator('/');
                calculator.appendNumber('3');
                const result = calculator.calculate();
                expect(result).toBe('5');
                expect(calculator.getDisplay()).toBe('5');
            });

            it('должен выполнить сложное выражение', () => {
                calculator.appendNumber('10');
                calculator.appendOperator('+');
                calculator.appendNumber('5');
                calculator.appendOperator('*');
                calculator.appendNumber('2');
                const result = calculator.calculate();
                expect(result).toBe('20');
                expect(calculator.getDisplay()).toBe('20');
            });

            it('должен обработать десятичные числа', () => {
                calculator.appendNumber('5');
                calculator.appendDecimal();
                calculator.appendNumber('5');
                calculator.appendOperator('+');
                calculator.appendNumber('2');
                calculator.appendDecimal();
                calculator.appendNumber('5');
                const result = calculator.calculate();
                // 5.5 + 2.5 = 8
                expect(parseFloat(result)).toBeCloseTo(8, 5);
                expect(parseFloat(calculator.getDisplay())).toBeCloseTo(8, 5);
            });

            it('должен обработать отрицательные числа', () => {
                calculator.appendNumber('5');
                calculator.appendOperator('-');
                calculator.appendNumber('10');
                const result = calculator.calculate();
                expect(result).toBe('-5');
                expect(calculator.getDisplay()).toBe('-5');
            });

            it('должен обработать деление с остатком', () => {
                calculator.appendNumber('7');
                calculator.appendOperator('/');
                calculator.appendNumber('3');
                const result = calculator.calculate();
                expect(result).toBe('2.3333333333333335');
                expect(calculator.getDisplay()).toBe('2.3333333333333335');
            });

            it('должен обработать умножение на ноль', () => {
                calculator.appendNumber('5');
                calculator.appendOperator('*');
                calculator.appendNumber('0');
                const result = calculator.calculate();
                expect(result).toBe('0');
                expect(calculator.getDisplay()).toBe('0');
            });
        });

        describe('отрицательные сценарии', () => {
            it('должен вернуть ошибку при делении на ноль', () => {
                calculator.appendNumber('10');
                calculator.appendOperator('/');
                calculator.appendNumber('0');
                const result = calculator.calculate();
                expect(result).toBe('Ошибка');
                expect(calculator.getDisplay()).toBe('Ошибка');
            });

            it('должен вернуть ошибку при делении на ноль в сложном выражении', () => {
                calculator.appendNumber('5');
                calculator.appendOperator('+');
                calculator.appendNumber('3');
                calculator.appendOperator('/');
                calculator.appendNumber('0');
                const result = calculator.calculate();
                expect(result).toBe('Ошибка');
                expect(calculator.getDisplay()).toBe('Ошибка');
            });

            it('не должен считать деление на 0.0 как ошибку', () => {
                calculator.appendNumber('10');
                calculator.appendOperator('/');
                calculator.appendNumber('0');
                calculator.appendDecimal();
                calculator.appendNumber('5');
                const result = calculator.calculate();
                expect(result).toBe('20');
                expect(calculator.getDisplay()).toBe('20');
            });

            it('должен обработать замену оператора (последний оператор заменяет предыдущий)', () => {
                calculator.appendNumber('5');
                calculator.appendOperator('+');
                calculator.appendOperator('*');
                calculator.appendNumber('3');
                const result = calculator.calculate();
                // После замены оператора выражение становится "5*3" = 15
                expect(result).toBe('15');
                expect(calculator.getDisplay()).toBe('15');
            });

            it('должен обработать пустое выражение', () => {
                calculator.clearDisplay();
                calculator.appendOperator('+');
                const result = calculator.calculate();
                expect(['Ошибка', 'NaN']).toContain(result);
            });
        });
    });

    describe('clearDisplay', () => {
        it('должен очистить дисплей до нуля', () => {
            calculator.appendNumber('123');
            calculator.clearDisplay();
            expect(calculator.getDisplay()).toBe('0');
        });

        it('должен очистить дисплей после вычисления', () => {
            calculator.appendNumber('5');
            calculator.appendOperator('+');
            calculator.appendNumber('3');
            calculator.calculate();
            calculator.clearDisplay();
            expect(calculator.getDisplay()).toBe('0');
        });

        it('должен сбросить флаг shouldResetDisplay', () => {
            calculator.appendNumber('5');
            calculator.appendOperator('+');
            calculator.appendNumber('3');
            calculator.calculate();
            calculator.clearDisplay();
            calculator.appendNumber('7');
            expect(calculator.getDisplay()).toBe('7');
        });

        it('должен очистить дисплей с операторами', () => {
            calculator.appendNumber('5');
            calculator.appendOperator('+');
            calculator.appendNumber('3');
            calculator.appendOperator('*');
            calculator.clearDisplay();
            expect(calculator.getDisplay()).toBe('0');
        });
    });

    describe('deleteLast', () => {
        it('должен удалить последний символ', () => {
            calculator.appendNumber('123');
            calculator.deleteLast();
            expect(calculator.getDisplay()).toBe('12');
        });

        it('должен удалить несколько символов подряд', () => {
            calculator.appendNumber('123');
            calculator.deleteLast();
            calculator.deleteLast();
            expect(calculator.getDisplay()).toBe('1');
        });

        it('должен установить 0 если остался один символ', () => {
            calculator.appendNumber('5');
            calculator.deleteLast();
            expect(calculator.getDisplay()).toBe('0');
        });

        it('должен удалить оператор', () => {
            calculator.appendNumber('5');
            calculator.appendOperator('+');
            calculator.deleteLast();
            expect(calculator.getDisplay()).toBe('5');
        });

        it('должен очистить дисплей если shouldResetDisplay установлен', () => {
            calculator.appendNumber('5');
            calculator.appendOperator('+');
            calculator.appendNumber('3');
            calculator.calculate();
            calculator.deleteLast();
            expect(calculator.getDisplay()).toBe('0');
        });

        it('должен удалить десятичную точку', () => {
            calculator.appendNumber('5');
            calculator.appendDecimal();
            calculator.deleteLast();
            expect(calculator.getDisplay()).toBe('5');
        });

        it('должен обработать удаление из многосимвольного выражения', () => {
            calculator.appendNumber('1');
            calculator.appendNumber('2');
            calculator.appendOperator('+');
            calculator.appendNumber('3');
            calculator.deleteLast();
            expect(calculator.getDisplay()).toBe('12+');
        });
    });

    describe('getDisplay', () => {
        it('должен вернуть начальное значение 0', () => {
            expect(calculator.getDisplay()).toBe('0');
        });

        it('должен вернуть текущее значение после операций', () => {
            calculator.appendNumber('42');
            expect(calculator.getDisplay()).toBe('42');
        });
    });

    describe('интеграционные тесты', () => {
        it('должен выполнить последовательность операций', () => {
            calculator.appendNumber('1');
            calculator.appendNumber('0');
            calculator.appendOperator('+');
            calculator.appendNumber('5');
            calculator.calculate();
            expect(calculator.getDisplay()).toBe('15');
            
            calculator.appendOperator('*');
            calculator.appendNumber('2');
            calculator.calculate();
            expect(calculator.getDisplay()).toBe('30');
        });

        it('должен обработать цепочку вычислений', () => {
            calculator.appendNumber('2');
            calculator.appendOperator('+');
            calculator.appendNumber('3');
            calculator.appendOperator('*');
            calculator.appendNumber('4');
            calculator.calculate();
            // 2 + 3 * 4 = 2 + 12 = 14 (умножение имеет приоритет)
            expect(calculator.getDisplay()).toBe('14');
            
            calculator.appendOperator('/');
            calculator.appendNumber('5');
            calculator.calculate();
            expect(calculator.getDisplay()).toBe('2.8');
        });

        it('должен обработать работу с десятичными числами в цепочке', () => {
            calculator.appendNumber('1');
            calculator.appendDecimal();
            calculator.appendNumber('5');
            calculator.appendOperator('+');
            calculator.appendNumber('2');
            calculator.appendDecimal();
            calculator.appendNumber('5');
            calculator.calculate();
            // 1.5 + 2.5 = 4
            expect(parseFloat(calculator.getDisplay())).toBeCloseTo(4, 5);
        });
    });
});
