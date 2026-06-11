/**
 * vacation.js
 * Модуль для управления календарем отпусков (Availability Calendar).
 */

import { store } from './store.js';
import { renderCurrentTab } from './render.js';

// Храним выбранные пользователем дни как Set
let selectedDays = new Set();
let currentEmployeeId = null;
let currentPeriodKey = '';

/**
 * Главная функция открытия календаря
 */
export function openVacationCalendar(employeeId, periodKey) {
    currentEmployeeId = employeeId;
    currentPeriodKey = periodKey;

    const modal = document.getElementById('vacation-modal');
    const modalTitle = document.getElementById('vacation-modal-title');
    const gridContainer = document.getElementById('calendar-grid-container');

    if (!modal || !gridContainer) {
        console.error('❌ Элементы календаря не найдены в DOM');
        return;
    }

    // Парсим период (например, "2026-4" -> год 2026, месяц 4 [Май])
    const parts = periodKey.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);

    // Подгружаем имя сотрудника для заголовка и его сохраненные отпуска
    const monthData = store.getMonthData(periodKey);
    const employee = monthData.employees.find(emp => String(emp.id) === String(employeeId));

    if (employee) {
        modalTitle.textContent = `Availability for ${employee.name}`;
        const savedVacations = employee.vacations || [];
        selectedDays = new Set(savedVacations.map(Number)); 
    } else {
        selectedDays = new Set();
    }

    // Отрисовываем сетку и обновляем статистику
    renderCalendarStats(year, month, gridContainer);

    // Вешаем логику закрытия и кликов на модалку, передавая нужные переменные
    initCalendarEvents(modal, year, month, gridContainer);

    // Открываем окно
    modal.classList.add('modal--open');
    console.log(`📅 Календарь открыт для сотрудника ${employeeId} на период ${periodKey}`);
}

/**
 * Отрисовка сетки и обновление интерфейса статистики
 */
function renderCalendarStats(year, month, container) {
    container.innerHTML = buildGridHtml(year, month); // 1. Рендерим саму сетку дней
    updateCalendarStats(year, month); // 2. Считаем и обновляем статистику на экране
}

/**
 * Сборка HTML-кода сетки календаря
 */
function buildGridHtml(year, month) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Корректируем JS-день недели: 0 (вс) -> превращаем в 6, 1 (пн) -> 0 и т.д.
    let firstDayIndex = new Date(year, month, 1).getDay() - 1;
    if (firstDayIndex < 0) firstDayIndex = 6; 

    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let html = '<div class="calendar-grid">';
    
    // Выводим заголовки дней недели
    weekDays.forEach(day => {
        const isWeekendHeader = day === 'Sat' || day === 'Sun';
        html += `<div class="calendar-header-cell ${isWeekendHeader ? 'calendar-header-cell--weekend' : ''}">${day}</div>`;
    });

    // Рисуем пустые ячейки для сдвига начала месяца
    for (let i = 0; i < firstDayIndex; i++) {
        html += '<div class="calendar-day-cell calendar-day-cell--empty"></div>';
    }

    // Рисуем карточки дней месяца
    for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(year, month, day);
        const dayOfWeek = dateObj.getDay(); // 0 = Вс, 6 = Сб
        const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);

        let classes = 'calendar-day-cell calendar-day-target';
        if (isWeekend) classes += ' calendar-day-cell--weekend';
        if (selectedDays.has(day)) classes += ' calendar-day-cell--selected';
        
        html += `<div class="${classes}" data-day="${day}">${day}</div>`;
    }

    html += '</div>';
    return html;
}

/**
 * Подсчет рабочих дней и форматирование диапазонов по ТЗ
 */
function updateCalendarStats(year, month) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let totalWorkingDays = 0; // Всего будней в месяце (Y)
    let vacationWorkingDays = 0; // Сколько отпусков выпало на будни

    for (let day = 1; day <= daysInMonth; day++) {
        const dayOfWeek = new Date(year, month, day).getDay();
        const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);

        if (!isWeekend) {
            totalWorkingDays++;
            if (selectedDays.has(day)) {
                vacationWorkingDays++;
            }
        }
    }

    const actualWorkingDays = totalWorkingDays - vacationWorkingDays; // X = Всего будней - отпуска на буднях
    
    // Выводим строку Working Days: X/Y days
    const workingDaysEl = document.getElementById('calendar-working-days');
    if (workingDaysEl) {
        workingDaysEl.textContent = `Working Days: ${actualWorkingDays}/${totalWorkingDays} days`;
    }
    
    // Форматируем диапазоны (например: "03.01-05.01, 10.01")
    const formattedRanges = calculateVacationRanges(year, month);
    const rangesEl = document.getElementById('calendar-vacation-ranges');
    if (rangesEl) {
        rangesEl.textContent = formattedRanges || 'None';
    }
}

/**
 * Алгоритм склеивания consecutive дней с учетом выходных по ТЗ
 */
function calculateVacationRanges(year, month) {
    const sortedDays = Array.from(selectedDays).sort((a, b) => a - b);
    if (sortedDays.length === 0) return '';

    const ranges = [];
    let start = sortedDays[0];
    let prev = sortedDays[0];

    const formatDate = (day) => {
        const d = String(day).padStart(2, '0');
        const m = String(month + 1).padStart(2, '0');
        return `${d}.${m}`;
    };

    for (let i = 1; i < sortedDays.length; i++) {
        const current = sortedDays[i];
        // Проверяем, идут ли дни подряд ИЛИ между ними только выходные
        let isConsecutive = false;
        if (current === prev + 1) {
            isConsecutive = true;
        } else { 
            // Проверяем, нет ли между prev и current будних дней
            let hasBetweenWorkdays = false;
            for (let d = prev + 1; d < current; d++) {
                const dayOfWeek = new Date(year, month, d).getDay();
                if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                    hasBetweenWorkdays = true;
                    break;
                }
            }
            if (!hasBetweenWorkdays) isConsecutive = true;
        }

        if (isConsecutive) {
            prev = current;
        } else { 
            // Закрываем старый диапазон
            if (start === prev) ranges.push(formatDate(start));
            else ranges.push(`${formatDate(start)}-${formatDate(prev)}`);
            start = current;
            prev = current;
        }
    }
    
    if (start === prev) ranges.push(formatDate(start));
    else ranges.push(`${formatDate(start)}-${formatDate(prev)}`);
    
    return ranges.join(', ');
}

/**
 * Логика событий внутри модалки календаря
 */
function initCalendarEvents(modal, year, month, gridContainer) {
    // 1. Обработка клика по ячейке дня (Делегирование событий)
    gridContainer.onclick = function(event) {
        const target = event.target;
        if (!target.classList.contains('calendar-day-target')) return;
        
        const day = parseInt(target.getAttribute('data-day'), 10);
        
        if (selectedDays.has(day)) {
            selectedDays.delete(day);
            target.classList.remove('calendar-day-cell--selected');
        } else {
            selectedDays.add(day);
            target.classList.add('calendar-day-cell--selected');
        }
        // Мгновенно пересчитываем циферки и строки диапазонов при каждом клике!
        updateCalendarStats(year, month);
    };

    // 2. Закрытие по фону или крестику
    modal.onclick = function(event) { 
        if (event.target.id === 'vacation-modal-overlay' || event.target.id === 'vacation-modal-close') {
            modal.classList.remove('modal--open');
            console.log('🔒 Календарь закрыт');
        }
    };

    // 3. Сохранение данных в Стор по кнопке "Set Vacation"
    const saveBtn = document.getElementById('btn-save-vacation');
    if (saveBtn) {
        saveBtn.onclick = function() {
            const currentData = store.getRawData();
            const monthData = currentData[currentPeriodKey] || {};
            const employees = monthData.employees || [];

            const employee = employees.find(emp => String(emp.id) === String(currentEmployeeId));
            if (employee) {
                // Сохраняем массив дней отпуска обратно сотруднику
                employee.vacations = Array.from(selectedDays).sort((a, b) => a - b);
                store.saveData(currentData);
                console.log(`💾 Отпуска сохранены для сотрудника ${currentEmployeeId}:`, employee.vacations);
                
                // Перерисовываем интерфейс, чтобы сработали новые коэффициенты
                renderCurrentTab('employees', currentPeriodKey);
                modal.classList.remove('modal--open');
            }
        };
    }
}
