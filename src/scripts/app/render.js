/**
 * render.js
 * Этот файл отвечает за "отрисовку" интерфейса.
 * Он берет данные и превращает их в HTML-код.
 */

import { store } from './store.js';
import { openVacationCalendar } from './vacation.js';
import { calculateVacationFactor, calculateEffectiveCapacity, calculateProjectFinance, calculateGlobalFinance } from './formulas.js';

function handleDeleteProject(projectId, periodKey) { // --- ЛОГИКА УДАЛЕНИЯ ПРОЕКТОВ
    const isConfirmed = confirm('Are you sure you want to delete this project?'); // Спрашиваем подтверждение у пользователя
    if (!isConfirmed) return;

    const monthData = store.getMonthData(periodKey); // 1. Берем данные за этот месяц из Стора

    const updatedProjects = monthData.projects.filter(function(project){ // 2. Фильтруем массив проектов
        return project.id !== projectId;
    });

    monthData.projects = updatedProjects; // 3. Записываем обновленный массив обратно

    const allData = store.getRawData();
    allData[periodKey] = monthData;
    store.saveData(allData);
    console.log(`❌ Проект с ID ${projectId} успешно удален`);
    renderCurrentTab('projects', periodKey); // 5. Перерисовываем таблицу
}

function handleDeleteEmployee(employeeId, periodKey) {
    const isConfirmed = confirm('Are you sure you want to remove this employee?');
    if (!isConfirmed) return;

    const monthData = store.getMonthData(periodKey);
    // Фильтруем массив сотрудников, удаляя нужного по ID
    monthData.employees = monthData.employees.filter(function(emp) {
        return emp.id !== employeeId;
    })

    const allData = store.getRawData();
    allData[periodKey] = monthData;
    store.saveData(allData);
    console.log(`❌ Сотрудник с ID ${employeeId} удален`);
    // Перерисовываем вкладку сотрудников
    renderCurrentTab('employees', periodKey);
}

function updateEmployeeField(employeeId, field, newValue, periodKey) {
    const monthData = store.getMonthData(periodKey);
    const employee = monthData.employees.find(emp => emp.id === employeeId); // Находим нужного сотрудника

    if (employee) {
        // Если правим зарплату — переводим в число, если должность — оставляем строкой
        if (field === 'salary') {
            const numValue = Number(newValue);
            if (isNaN(numValue) || numValue <= 0) {
                alert('Please enter the correct salary amount');
                renderCurrentTab('employees', periodKey); // Сбрасываем изменения
                return;
            }
            employee[field] = numValue;
        } else {
            if (newValue.trim() === '') {
                alert('The field cannot be empty');
                renderCurrentTab('employees', periodKey);
                return;
            }
            employee[field] = newValue.trim();
        }
        const allData = store.getRawData();// Сохраняем в Стор
        allData[periodKey] = monthData;
        store.saveData(allData);
        console.log(`📝 Сотрудник ${employeeId}: поле ${field} обновлено на ${newValue}`);
    }
}

function createProjectsTable(data, periodKey) { // 1. Функция для сборки таблицы проектов
    const projects = data.projects || [];
    const assignments = data.assignments || [];
    const employees = data.employees || [];

    if (projects.length === 0) {
        return '<p class="empty-state">There are no projects yet</p>';
    }

    // Начинаем собирать строку с заголовков таблицы
    let html = ` 
    <table class="table">
        <thead>
            <tr>
                <th>Company</th>
                <th>Project</th>
                <th>Budget (Rev.)</th>
                <th>Capacity</th>
                <th>Expenses</th>
                <th>Profit</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;

    projects.forEach(function(project) {
        // Вызываем нашу новую функцию расчетов для каждого проекта
        const finance = calculateProjectFinance(project, assignments, employees, periodKey);
        // Класс для подсветки прибыли: если меньше 0 — красный текст, если больше — зеленый
        const profitClass = finance.profit < 0 ? 'text-danger' : 'text-success';

        html += `
            <tr>
                <td>${project.companyName}</td>
                <td>${project.projectName}</td>
                <td>${project.budget.toLocaleString()} $</td>
                <td class="clickable-capacity" data-id="${project.id}">
                    <span class="capacity-link">${finance.effectiveCapacity} / ${project.capacity} p.</span>
                </td>
                <td>${finance.expenses.toLocaleString()} $</td>
                <td class="${profitClass}"><strong>${finance.profit.toLocaleString()} $</strong></td>
                <td>
                    <button class="btn-assign" data-id="${project.id}">Assign</button>
                    <button class="btn-delete" data-id="${project.id}">Delete</button>
                </td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    return html;
}

function createEmployeesTable(employees, periodKey) { // ТАБЛИЦА СОТРУДНИКОВ
    if (employees.length === 0) {
        return '<p class="empty-state">No employees added yet</p>';
    }

    let html = `
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Age</th>
                <th>Salary</th>
                <th>Vacation Factor</th>
                <th>Eff. Capacity</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;

    employees.forEach(function(emp) {
        // Вызываем наши формулы для каждого сотрудника прямо внутри цикла:
        const vacationFactor = calculateVacationFactor(emp, periodKey);
        const effectiveCapacity = calculateEffectiveCapacity(emp, periodKey);

        html += `
            <tr>
                <td>${emp.name}</td>
                <td class="editable" data-id="${emp.id}" data-field="position">${emp.position}</td>
                <td>${emp.age} y.o.</td>
                <td class="editable" data-id="${emp.id}" data-field="salary">${emp.salary} $</td>
                <td><span class="badge badge--factor">${vacationFactor}</span></td>
                <td><span class="badge badge--capacity">${effectiveCapacity}%</span></td>
                <td>
                    <button class="btn-delete btn-delete--emp" data-id="${emp.id}">Delete</button>
                    <button class="btn-availability" data-id="${emp.id}">Availability</button>
                </td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    return html;
}

function createFinancialSummary(data, periodKey) {
    const projects = data.projects || [];
    const assignments = data.assignments || [];
    const employees = data.employees || [];
    const totalProjects = projects.length;

    // Вызываем глобальный расчет финансов по фирме
    const globalFinance = calculateGlobalFinance(projects, assignments, employees, periodKey);

    let html = ` 
        <div class="fin-summary">
            <div class="fin-card">
                <span class="fin-card__title">Active Projects</span>
                <span class="fin-card__value">${totalProjects}</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Revenue</span>
                <span class="fin-card__value">${globalFinance.totalBudget.toLocaleString()} $</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Expenses</span>
                <span class="fin-card__value">${globalFinance.totalExpenses.toLocaleString()} $</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Profit</span>
                <span class="fin-card__value">${globalFinance.totalProfit.toLocaleString()} $</span>
            </div>
        </div>
        `;

    return html;
}

function openDetailsModal(projectId, periodKey) { // Функция открытия поп-апа со списком назначенных сотрудников
    console.log('📖 ЧИТАЕМ НАЗНАЧЕНИЯ. Ключ периода:', periodKey);

    const modal = document.getElementById('details-modal');
    const modalBody = document.getElementById('details-modal-body');
    const modalTitle = document.getElementById('details-modal-title');

    if (!modal || !modalBody) return;

    if (typeof store.loadFromLocalStorage === 'function') {
        store.loadFromLocalStorage(); 
    }

    const monthData = store.getMonthData(periodKey);
    const projects = monthData.projects || [];
    const employees = monthData.employees || [];
    const assignments = monthData.assignments || [];

    console.log('Проверяем, что пришло из базы для проекта:', {
        projectId: projectId,
        allAssignmentsInMonth: assignments,
        filtered: assignments.filter(asm => asm.projectId === projectId)
    });

    const currentProject = projects.find(p => p.id === projectId);
    if (currentProject) {
        modalTitle.textContent = `Team for "${currentProject.projectName}"`;
    }

    const projectAssignments = assignments.filter(asm => String(asm.projectId) === String(projectId));

    if (projectAssignments.length === 0) {
        modalBody.innerHTML = '<p class="empty-state">No employees assigned to this project yet.</p>';
    } else {
        let listHtml = '<ul class="team-list">';
        
        //Сразу собираем разметку с кнопками удаления
        projectAssignments.forEach(function(asm) {
            const employee = employees.find(emp => String(emp.id) === String(asm.employeeId));
            if (employee) {
                listHtml += `
                    <li class="team-item">
                        <div class="team-item__info">
                            <strong class="team-item__name">${employee.name}</strong>
                            <span class="team-item__position">${employee.position}</span>
                        </div>
                        <div class="team-item__actions">
                            <span class="team-item__capacity">${asm.capacity}% load</span>
                            <button class="btn-remove-asm" 
                                    data-project-id="${projectId}" 
                                    data-employee-id="${employee.id}" 
                                    title="Remove from project">×</button>
                        </div>
                    </li>
                `;
            }
        });

        listHtml += '</ul>';
        modalBody.innerHTML = listHtml;
    }

    // ЛОГИКА УДАЛЕНИЯ С ПРОЕКТА (Вынесена наружу, работает по всей области модалки)
    // ЕДИНЫЙ СЛУШАТЕЛЬ КЛИКОВ ДЛЯ МОДАЛКИ ПОДРОБНОСТЕЙ
    modal.onclick = function(event) {
        // 1. ЛОГИКА УДАЛЕНИЯ СОТРУДНИКА С ПРОЕКТА
        if (event.target.classList.contains('btn-remove-asm')) {
            const pId = event.target.getAttribute('data-project-id');
            const eId = event.target.getAttribute('data-employee-id');

            if (!confirm('Are you sure you want to remove this employee from the project?')) return;

            const currentData = store.getRawData();
            const currentMonthData = currentData[periodKey] || {};
            const currentAssignments = currentMonthData.assignments || [];

            currentMonthData.assignments = currentAssignments.filter(function(asm) {
                return !(String(asm.projectId) === String(pId) && String(asm.employeeId) === String(eId));
            });

            store.saveData(currentData);
            console.log(`🗑 Сотрудник ${eId} удален с проекта ${pId}`);

            openDetailsModal(pId, periodKey);
            renderCurrentTab('projects', periodKey);
            return; // Выходим из функции, чтобы не срабатывали проверки ниже
        }

        // 2. ЛОГИКА ЗАКРЫТИЯ ОКНА (Клик на темный фон ИЛИ на крестик в углу)
        if (event.target.id === 'details-modal-overlay' || event.target.id === 'details-modal-close') {
            console.log('🔒 Закрываем окно подробностей команды');
            modal.classList.remove('modal--open');
        }
    };

    // Открываем модалку!
    modal.classList.add('modal--open');
}
 
function openAssignModal(projectId, periodKey) {
    const modal = document.getElementById('assign-modal');
    const projectInput = document.getElementById('assign-project-id');
    const empSelect = document.getElementById('assign-emp-select');

    console.log('Поиск элементов модалки:', { modal, projectInput, empSelect });

    if (!modal || !empSelect) {
        console.error('❌ Ошибка: Элементы модального окна не найдены в HTML!');
        return;
    }
    
    if (projectInput) {
        projectInput.value = projectId;
    }
    
    const monthData = store.getMonthData(periodKey);
    const employees = (monthData && monthData.employees) ? monthData.employees : [];

    console.log('Список сотрудников для модалки:', employees);
    
    if (employees.length === 0) {
        empSelect.innerHTML = '<option value="">-- No employees available --</option>';
    } else {
        let optionsHtml = '<option value="">-- Select an employee --</option>';
        
        employees.forEach(function(emp) {
            const name = emp.name || 'Unknown Name';
            const position = emp.position || 'No Position';
            optionsHtml += `<option value="${emp.id}">${name} (${position})</option>`;
        });
        
        empSelect.innerHTML = optionsHtml;
    }
    
    const rangeInput = document.getElementById('assign-capacity-range');
    const rangeValue = document.getElementById('assign-range-value');
    if (rangeInput) rangeInput.value = 50;
    if (rangeValue) rangeValue.textContent = '50';
    
    modal.classList.add('modal--open');
    console.log('🚀 Класс modal--open успешно добавлен!');
}

// 2. Главная функция, которую мы будем вызывать извне
export function renderCurrentTab(tabName, periodKey) {
    const container = document.getElementById('table-container');
    if (!container) return;

    const data = store.getMonthData(periodKey);

    if (tabName === 'projects') {
        const summaryHtml = createFinancialSummary(data, periodKey);
        const tableHtml = createProjectsTable(data, periodKey);

        container.innerHTML = summaryHtml + tableHtml;
        
        container.onclick = function(event) {
            console.log('Кликнули по элементу:', event.target);
            if (event.target.classList.contains('btn-delete')) {
                const projectId = event.target.getAttribute('data-id');
                handleDeleteProject(projectId, periodKey);
            }
            if (event.target.classList.contains('btn-assign')) {
                console.log('Ура, поймали клик по кнопке Assign!');
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
        // Переписываем эту строчку: теперь передаем и сотрудников, и periodKey
        container.innerHTML = createEmployeesTable(data.employees, periodKey);

        container.onclick = function(event) {

            if (event.target.classList.contains('btn-availability')) { // Ловим клик по кнопке отпусков
                const employeeId = event.target.getAttribute('data-id');
                console.log(`📅 Нажали календарь сотрудника с ID: ${employeeId}`);
                // вызов функции открытия календаря:
                openVacationCalendar(employeeId, periodKey);
            }

            if(event.target.classList.contains('btn-delete--emp')) { 
                const employeeId = event.target.getAttribute('data-id');
                handleDeleteEmployee(employeeId, periodKey);
            }
        };

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
                    if (e.key === 'Enter') {
                        finishEditing();
                    }
                };
                input.onblur = function() {
                    finishEditing();
                };
            }
        };
    }
}
