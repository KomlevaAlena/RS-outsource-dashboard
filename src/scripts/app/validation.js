/**
 * validation.js
 * Вынесенный модуль для бизнес-валидации данных приложения.
 */
import { store } from './store.js';
/**
 * Вычисляет, сколько свободных процентов загрузки осталось у сотрудника в конкретном периоде.
 * @param {string} employeeId - ID сотрудника
 * @param {string} periodKey - Ключ периода (например, "2026-4")
 * @param {string|null} excludeProjectId - ID проекта, который нужно исключить из расчетов (при обновлении текущего назначения)
 * @returns {number} Количество доступных процентов (от 0 до 100)
 */
export function getEmployeeAvailableCapacity (employeeId, periodKey, excludeProjectId = null) {
    const monthData = store.getMonthData(periodKey);
    const assignments = monthData.assignments || [];
    // Считаем сумму всех процентов занятости сотрудника на других проектах
    const currentLoad = assignments.filter(function(asm) {
        // Отбираем только назначения этого сотрудника
        const isTargetEmploee = String(asm.employeeId) === String(employeeId);
        // Если мы редактируем существующее назначение, то старую загрузку этого же проекта не учитываем
        const isNotExcludedProject = excludeProjectId ? String(asm.projectId) !== String(excludeProjectId) : true;
        return isTargetEmploee && isNotExcludedProject;
    })
    .reduce(function(sum, asm) {
            return sum + (asm.capacity || 0);
        }, 0);
    // У сотрудника максимум может быть 100% времени. Возвращаем остаток.
    const available = 100 - currentLoad;
    return available < 0 ? 0 : available;
}