/**
 * formulas.js
 * Модуль для централизованного расчета бизнес-логики и финансовых показателей проекта.
 */
/**
 * Вспомогательная функция: Считает общее количество рабочих дней (будней) в месяце
 * @param {number} year - Год (например, 2026)
 * @param {number} month - Индекс месяца (0 - Январь, 11 - Декабрь)
 * @returns {number} Количество будних дней
 */

export function getTotalWorkingDaysInMonth(year, month) {
    const deysInMonth = new Date(year, month + 1, 0).getDate();
    let workingDaysCount = 0;

    for (let day = 1; day <= deysInMonth; day++) {
        const dayOfWeek = new Date(year, month, day).getDay();
        const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6) // 0 = Воскресенье, 6 = Суббота
        if (!isWeekend) {
            workingDaysCount++;
        }
    }
    return workingDaysCount;
}

/**
 * Вспомогательная функция: Считает сколько дней отпуска сотрудника выпало на рабочие дни (будни)
 * @param {Array<number>} vacations - Массив выбранных дней отпуска (например, [4, 5, 6])
 * @param {number} year - Год
 * @param {number} month - Индекс месяца
 * @returns {number} Количество дней отпуска, пришедшихся на будни
 */

export function getVacationWorkingDays(vacations, year, month) {
    if (!vacations || !Array.isArray(vacations) || vacations.length === 0) {
        return 0; // Если отпусков нет, они не массив или массив пустой — сразу возвращаем 0 рабочих дней отпуска
    }
    let vacationBudniCount = 0;
    vacations.forEach(day => {
        const dayOfWeek = new Date(year, month, day).getDay();
        const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
        if(!isWeekend) {
            vacationBudniCount++;
        }
    });
    return vacationBudniCount;
}

/**
 * РЕАЛИЗАЦИЯ ТАСКИ 5.2: Расчет коэффициента отпусков сотрудника (Vacation Factor)
 * Формула: (Отпуска на буднях) / (Всего будней в месяце)
 * @param {Object} employee - Объект сотрудника из Стора
 * @param {string} periodKey - Ключ периода (например, "2026-4")
 * @returns {number} Коэффициент отпусков от 0.00 до 1.00
 */

export function calculateVacationFactor(employee, periodKey) {
    const parts = periodKey.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);

    const totalWorkingDays = getTotalWorkingDaysInMonth(year, month);
    // Достаем массив отпусков сотрудника (если его нет — передаем пустой массив)
    const vacations = employee.vacations || [];
    const vacationWorkingDays = getVacationWorkingDays(vacations, year, month);

    if (totalWorkingDays === 0) return 0;
    // Рассчитываем коэффициент и округляем до 2 знаков после запятой
    const factor = vacationWorkingDays / totalWorkingDays;
    return Math.round(factor * 100) / 100;
}

/**
 * МОСТИК К ТАСКЕ 5.3: Расчет Эффективной мощности сотрудника (Effective Capacity)
 * Базовая доступность сотрудника (100% или 1.0) уменьшается на его коэффициент отпусков
 * Формула: 100% * (1 - Vacation Factor)
 * @param {Object} employee - Объект сотрудника
 * @param {string} periodKey - Ключ периода
 * @returns {number} Эффективная мощность в процентах (например, 76)
 */

export function calculateEffectiveCapacity(employee, periodKey) {
    const vacationFactor = calculateVacationFactor(employee, periodKey);// Например, если отпусков 24%, то эффективная мощность: 100 * (1 - 0.24) = 76%
    const effectiveCapacity = 100 * (1 - vacationFactor);
    return Math.round(effectiveCapacity);
}
