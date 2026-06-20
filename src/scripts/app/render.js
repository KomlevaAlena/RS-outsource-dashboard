/**
 * render.js
 * Этот файл отвечает за "отрисовку" интерфейса.
 * Он берет данные и превращает их в HTML-код.
 */

import { store } from './store.js';
import { openVacationCalendar } from './vacation.js';
import { calculateVacationFactor, calculateEffectiveCapacity, calculateProjectFinance, calculateGlobalFinance } from './formulas.js';
import { currentFilters } from './filters.js';
import { createProjectsTable, createFinancialSummary, openAssignModal, openDetailsModal, handleDeleteProject } from './projectsTable.js';
import { createEmployeesTable, handleDeleteEmployee, updateEmployeeField } from './employeesTable.js';

// Глобальное состояние сортировки для текущего сеанса отображения
const currentSort = {
    tab: null,       // 'projects' или 'employees'
    field: null,     // имя поля, по которому сортируем
    direction: 'asc' // 'asc' (по возрастанию) или 'desc' (по убыванию)
};

// ✅ ОДИН ОБЪЕКТ ДЛЯ ВСЕХ ФИЛЬТРОВ (Объединенный)
// let currentFilters = {
//     projects: {
//         companyName: '',
//         projectName: ''
//     },
//     employees: {
//         name: '',
//         surname: '',
//         position: ''
//     },
//     employeePosition: '' 
// };

export function renderCurrentTab(tabName, periodKey) {
    const container = document.getElementById('table-container');
    if (!container) return;

    const data = store.getMonthData(periodKey);

    if (tabName === 'projects') {
        const summaryHtml = createFinancialSummary(data, periodKey, currentSort);
        const tableHtml = createProjectsTable(data, periodKey, currentSort);

        container.innerHTML = summaryHtml + tableHtml;
        
        container.onclick = function(event) {
            if (event.target.classList.contains('sortable')) {
                const sortField = event.target.getAttribute('data-sort');
                if (currentSort.tab === 'projects' && currentSort.field === sortField) {
                    currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
                } else {
                    currentSort.tab = 'projects';
                    currentSort.field = sortField;
                    currentSort.direction = 'asc';
                }
                renderCurrentTab('projects', periodKey);
                return;
            }

            if (event.target.classList.contains('filter-icon')) {
                event.stopPropagation();
                
                const oldPopup = document.querySelector('.filter-popup');
                if (oldPopup) oldPopup.remove();

                const field = event.target.getAttribute('data-filter-field');
                const th = event.target.closest('th');
                
                const popup = document.createElement('div');
                popup.className = 'filter-popup';
                popup.innerHTML = `
                    <input type="text" id="filter-popup-input" class="filter-popup__input" placeholder="Search..." value="${currentFilters.projects[field]}">
                    <div class="filter-popup__actions">
                        <button class="filter-popup__btn" id="filter-btn-cancel">Cancel</button>
                        <button class="filter-popup__btn filter-popup__btn--apply" id="filter-btn-apply" data-field="${field}">Apply</button>
                    </div>
                `;
                th.appendChild(popup);
                
                const input = popup.querySelector('#filter-popup-input');
                input.focus();
                input.onkeydown = function(e) {
                    if (e.key === 'Enter') popup.querySelector('#filter-btn-apply').click();
                };
                return;
            }

            if (event.target.id === 'filter-btn-apply') {
                const field = event.target.getAttribute('data-field');
                const val = document.getElementById('filter-popup-input').value;
                currentFilters.projects[field] = val;
                renderCurrentTab('projects', periodKey);
                return;
            }

            if (event.target.id === 'filter-btn-cancel') {
                const popup = event.target.closest('.filter-popup');
                if (popup) popup.remove();
                return;
            }

            if (event.target.classList.contains('filter-chip__remove')) {
                const key = event.target.getAttribute('data-filter-key');
                currentFilters.projects[key] = '';
                renderCurrentTab('projects', periodKey);
                return;
            }

            if (event.target.classList.contains('filter-chip--clear-all')) {
                currentFilters.projects.companyName = '';
                currentFilters.projects.projectName = '';
                renderCurrentTab('projects', periodKey);
                return;
            }

            const openPopup = document.querySelector('.filter-popup');
            if (openPopup && !event.target.closest('.filter-popup')) {
                openPopup.remove();
            }

            if (event.target.classList.contains('btn-delete')) {
                const projectId = event.target.getAttribute('data-id');
                handleDeleteProject(projectId, periodKey);
            }

            if (event.target.classList.contains('btn-assign')) {
                const projectId = event.target.getAttribute('data-id');
                openAssignModal(projectId, periodKey);
            }

            const capacityCell = event.target.closest('.clickable-capacity');
            if (capacityCell) {
                const projectId = capacityCell.getAttribute('data-id');
                openDetailsModal(projectId, periodKey);
            }
        };

    } else if (tabName === 'employees') {
        container.innerHTML = createEmployeesTable(data.employees, periodKey);

        // --- ЕДИНЫЙ ОБРАБОТЧИК КЛИКОВ (СОТРУДНИКИ) ---
        container.onclick = function(event) {
            // 1. Клик по сортировке
            if (event.target.classList.contains('sortable')) {
                const sortField = event.target.getAttribute('data-sort');
                if (currentSort.tab === 'employees' && currentSort.field === sortField) {
                    currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
                } else {
                    currentSort.tab = 'employees';
                    currentSort.field = sortField;
                    currentSort.direction = 'asc';
                }
                renderCurrentTab('employees', periodKey);
                return;
            }

            // 2. КЛИК ПО ИКОНКЕ ЛУПЫ ⌕ (ОТКРЫВАЕМ ПОП-АП ФИЛЬТРА)
            if (event.target.classList.contains('filter-icon')) {
                event.stopPropagation();
                
                const oldPopup = document.querySelector('.filter-popup');
                if (oldPopup) oldPopup.remove();

                const field = event.target.getAttribute('data-filter-field');
                const th = event.target.closest('th');
                
                const popup = document.createElement('div');
                popup.className = 'filter-popup';
                popup.innerHTML = `
                    <input type="text" id="filter-popup-input" class="filter-popup__input" placeholder="Search..." value="${currentFilters.employees[field]}">
                    <div class="filter-popup__actions">
                        <button class="filter-popup__btn" id="filter-btn-cancel">Cancel</button>
                        <button class="filter-popup__btn filter-popup__btn--apply" id="filter-btn-apply" data-field="${field}">Apply</button>
                    </div>
                `;
                th.appendChild(popup);
                
                const input = popup.querySelector('#filter-popup-input');
                input.focus();
                input.onkeydown = function(e) {
                    if (e.key === 'Enter') popup.querySelector('#filter-btn-apply').click();
                };
                return;
            }

            // 3. НАЖАТИЕ КНОПКИ APPLY В ПОП-АПЕ
            if (event.target.id === 'filter-btn-apply') {
                const field = event.target.getAttribute('data-field');
                const val = document.getElementById('filter-popup-input').value;
                currentFilters.employees[field] = val; // Записываем в стейт сотрудников
                renderCurrentTab('employees', periodKey);
                return;
            }

            // 4. НАЖАТИЕ КНОПКИ CANCEL В ПОП-АПЕ
            if (event.target.id === 'filter-btn-cancel') {
                const popup = event.target.closest('.filter-popup');
                if (popup) popup.remove();
                return;
            }

            // 5. УДАЛЕНИЕ ОТДЕЛЬНОГО ЧИПСА (клик по "×")
            if (event.target.classList.contains('filter-chip__remove')) {
                const key = event.target.getAttribute('data-filter-key');
                currentFilters.employees[key] = ''; // Сбрасываем конкретное поле сотрудников
                renderCurrentTab('employees', periodKey);
                return;
            }

            // 6. КЛИК НА ЧИПС "CLEAR FILTERS"
            if (event.target.classList.contains('filter-chip--clear-all')) {
                currentFilters.employees.name = '';
                currentFilters.employees.surname = '';
                currentFilters.employees.position = '';
                renderCurrentTab('employees', periodKey);
                return;
            }

            // 7. ЗАКРЫТИЕ ПОП-АПА ПРИ КЛИКЕ МИМО НЕГО
            const openPopup = document.querySelector('.filter-popup');
            if (openPopup && !event.target.closest('.filter-popup')) {
                openPopup.remove();
            }

            // 8. Клик по календарю отпусков
            if (event.target.classList.contains('btn-availability')) {
                const employeeId = event.target.getAttribute('data-id');
                openVacationCalendar(employeeId, periodKey);
            }

            // 9. Клик по удалению сотрудника
            if (event.target.classList.contains('btn-delete--emp')) {
                const employeeId = event.target.getAttribute('data-id');
                handleDeleteEmployee(employeeId, periodKey);
            }
        };

        // Старый container.onchange для селекта должностей удаляем, он больше не нужен!

        // --- ДАБЛКЛИК ДЛЯ РЕДАКТИРОВАНИЯ (СОТРУДНИКИ) ---
        container.ondblclick = function(event) {
            const cell = event.target;
            if (cell.classList.contains('editable') && !cell.querySelector('input')) {
                const currentText = cell.textContent.replace(' $', '').trim();
                const employeeId = cell.getAttribute('data-id');
                const field = cell.getAttribute('data-field');
                
                const input = document.createElement('input');
                input.type = field === 'salary' ? 'number' : 'text';
                input.value = currentText;
                input.className = 'table-inline-input';
                
                cell.innerHTML = '';
                cell.appendChild(input);
                input.focus();
                
                function finishEditing() {
                    const newValue = input.value;
                    updateEmployeeField(employeeId, field, newValue, periodKey);
                    renderCurrentTab('employees', periodKey);
                }
                
                input.onkeydown = function(e) {
                    if (e.key === 'Enter') finishEditing();
                };
                input.onblur = function() {
                    finishEditing();
                };
            }
        };
    }
}
