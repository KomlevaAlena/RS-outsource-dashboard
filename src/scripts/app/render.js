/**
 * render.js
 * Этот файл отвечает за "отрисовку" интерфейса.
 * Он берет данные и превращает их в HTML-код.
 */

import { store } from './store.js';
import { openVacationCalendar } from './vacation.js';
import { calculateVacationFactor, calculateEffectiveCapacity, calculateProjectFinance, calculateGlobalFinance } from './formulas.js';

// Глобальное состояние сортировки для текущего сеанса отображения
const currentSort = {
    tab: null,       // 'projects' или 'employees'
    field: null,     // имя поля, по которому сортируем
    direction: 'asc' // 'asc' (по возрастанию) или 'desc' (по убыванию)
};

// Хранилище активных фильтров
const currentFilters = {
    projectSearch: '', // Строка поиска по названию проекта или компании
    employeePosition: '' // Выбранная должность для фильтрации сотрудников
};

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
    let projects = data.projects || [];
    const assignments = data.assignments || [];
    const employees = data.employees || [];

    if (projects.length === 0) {
        return '<p class="empty-state">There are no projects yet</p>';
    }
    // 1. ПРИМЕНЯЕМ ПОИСК/ФИЛЬТРАЦИЮ (Если пользователь что-то ввел)
    if (currentFilters.projectSearch.trim() !== '') {
        const query = currentFilters.projectSearch.toLowerCase().trim();
        projects = projects.filter(function(project) {
            const nameMatches = project.projectName ? project.projectName.toLowerCase().includes(query) : false;
            const companyMatches = project.companyName ? project.companyName.toLowerCase().includes(query) : false;
            return nameMatches || companyMatches; // Ищем и по проекту, и по компании
        });
    }

    // ЛОГИКА СОРТИРОВКИ ПРОЕКТОВ
    if (currentSort.tab === 'projects'  && currentSort.field) {
        // Создаем копию массива, чтобы не мутировать исходные данные в Store
        projects = [...projects].sort(function(a, b) {
            let valA, valB;
            // Если сортируем по расчетным финансовым полям, вычисляем их "на лету"
            if (currentSort.field === 'expenses' || currentSort === 'profit' || currentSort.field === 'effectiveCapacity') {
                const finA = calculateProjectFinance(a, assignments, employees, periodKey);
                const finB = calculateProjectFinance(b, assignments, employees, periodKey);
                valA = finA[currentSort.field];
                valB = finB[currentSort.field]; 
            } else {
                // Иначе берем стандартные поля (companyName, projectName, budget)
                valA = a[currentSort.field];
                valB = b[currentSort.field];
            }
            // Логика сравнения для строк и чисел
            if (typeof valA === 'string') {
                return currentSort.direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
            } else {
                return currentSort.direction === 'asc' ? valA - valB : valB - valA;
            }
        });
    }

    // Вспомогательная функция для отрисовки стрелочек в шапке
    function getArrow(field) {
        if (currentSort.tab === 'projects' && currentSort.field === field) {
            return currentSort.direction === 'asc' ? ' ↑' : ' ↓';
        }
        return '';
    }

    // Начинаем собирать строку с заголовков таблицы (добавили data-sort и класс sortable)
    let html = `
    <div class="table-actions">
        <input type="text" 
               id="project-search-input" 
               class="form__input form__input--search" 
               placeholder="🔍 Search by project or company..." 
               value="${currentFilters.projectSearch}">
    </div>
    `;

    if (projects.length === 0) {
        html += '<p class="empty-state">No matching projects found</p>';
        return html;
    }

    html += ` 
    <table class="table">
        <thead>
            <tr>
                <th class="sortable" data-sort="companyName">Company${getArrow('companyName')}</th>
                <th class="sortable" data-sort="projectName">Project${getArrow('projectName')}</th>
                <th class="sortable" data-sort="budget">Budget (Rev.)${getArrow('budget')}</th>
                <th class="sortable" data-sort="effectiveCapacity">Capacity${getArrow('effectiveCapacity')}</th>
                <th class="sortable" data-sort="expenses">Expenses${getArrow('expenses')}</th>
                <th class="sortable" data-sort="profit">Profit${getArrow('profit')}</th>
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

    let displayedEmployees = employees || [];

    // 1. СОБИРАЕМ ВСЕ УНИКАЛЬНЫЕ ДОЛЖНОСТИ ДЛЯ СЕЛЕКТА
    const allPositions = [];
    displayedEmployees.forEach(function(emp) {
        if (emp.position && !allPositions.includes(emp.position)) {
            allPositions.push(emp.position);
        }
    });
    allPositions.sort(); // Сортируем должности по алфавиту

    // 2. ПРИМЕНЯЕМ ФИЛЬТРАЦИЮ ПО ДОЛЖНОСТИ
    if (currentFilters.employeePosition && currentFilters.employeePosition !== '') {
        displayedEmployees = displayedEmployees.filter(function(emp) {
            return emp.position === currentFilters.employeePosition;
        });
    }

    // 3. ЛОГИКА СОРТИРОВКИ СОТРУДНИКОВ
    if (currentSort.tab === 'employees' && currentSort.field) {
        displayedEmployees = [...displayedEmployees].sort(function(a, b) {
            let valA, valB;

            if (currentSort.field === 'vacationFactor') {
                valA = calculateVacationFactor(a, periodKey);
                valB = calculateVacationFactor(b, periodKey);
            } else if (currentSort.field === 'effectiveCapacity') {
                valA = calculateEffectiveCapacity(a, periodKey);
                valB = calculateEffectiveCapacity(b, periodKey);
            } else {
                valA = a[currentSort.field];
                valB = b[currentSort.field];
            }

            if (typeof valA === 'string') {
                return currentSort.direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
            } else {
                return currentSort.direction === 'asc' ? valA - valB : valB - valA;
            }
        });
    }

    function getArrow(field) {
        if (currentSort.tab === 'employees' && currentSort.field === field) {
            return currentSort.direction === 'asc' ? ' ↑' : ' ↓';
        }
        return '';
    }

    // 4. ГЕНЕРИРУЕМ HTML СЕЛЕКТА ФИЛЬТРАЦИИ
    let optionsHtml = `<option value="">All Positions</option>`;
    allPositions.forEach(function(pos) {
        const selected = currentFilters.employeePosition === pos ? 'selected' : '';
        optionsHtml += `<option value="${pos}" ${selected}>${pos}</option>`;
    });

    // Создаем базовый HTML и СРАЗУ вставляем туда селект
    let html = `
    <div class="table-actions">
        <select id="employee-position-filter" class="select select--filter" style="max-width: 250px; margin-bottom: 15px; padding: 6px 10px; border-radius: 4px; border: 1px solid #ccc;">
            ${optionsHtml}
        </select>
    </div>
    `;

    // Если после фильтрации никого не осталось
    if (displayedEmployees.length === 0) {
        html += '<p class="empty-state">No employees found for this position</p>';
        return html;
    }

    // Добавляем саму таблицу
    html += `
    <table class="table">
        <thead>
            <tr>
                <th class="sortable" data-sort="name">Name${getArrow('name')}</th>
                <th class="sortable" data-sort="position">Position${getArrow('position')}</th>
                <th class="sortable" data-sort="age">Age${getArrow('age')}</th>
                <th class="sortable" data-sort="salary">Salary${getArrow('salary')}</th>
                <th class="sortable" data-sort="vacationFactor">Vacation Factor${getArrow('vacationFactor')}</th>
                <th class="sortable" data-sort="effectiveCapacity">Eff. Capacity${getArrow('effectiveCapacity')}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;

    displayedEmployees.forEach(function(emp) {
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
        
        // --- ЕДИНЫЙ ОБРАБОТЧИК КЛИКОВ (ПРОЕКТЫ) ---
        container.onclick = function(event) {
            console.log('Кликнули по элементу:', event.target);
            
            // 1. Клик по сортировке
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

            // 2. Клик на удаление проекта
            if (event.target.classList.contains('btn-delete')) {
                const projectId = event.target.getAttribute('data-id');
                handleDeleteProject(projectId, periodKey);
            }

            // 3. Клик на Assign
            if (event.target.classList.contains('btn-assign')) {
                console.log('Ура, поймали клик по кнопке Assign!');
                const projectId = event.target.getAttribute('data-id');
                openAssignModal(projectId, periodKey);
            }

            // 4. Клик на Capacity (Подробности команды)
            const capacityCell = event.target.closest('.clickable-capacity');
            if (capacityCell) {
                const projectId = capacityCell.getAttribute('data-id');
                openDetailsModal(projectId, periodKey);
            }
        };

        // --- ЖИВОЙ ПОИСК ПРИ ВВОДЕ ТЕКСТА (ПРОЕКТЫ) ---
        container.oninput = function(event) {
            if (event.target.id === 'project-search-input') {
                currentFilters.projectSearch = event.target.value; // Сохраняем текст в стейт
                
                // Перерисовываем содержимое
                const summaryHtml = createFinancialSummary(data, periodKey);
                const tableHtml = createProjectsTable(data, periodKey);
                container.innerHTML = summaryHtml + tableHtml;

                // Возвращаем фокус ввода в инпут
                const input = document.getElementById('project-search-input');
                if (input) {
                    input.focus();
                    input.setSelectionRange(input.value.length, input.value.length);
                }
            }
        };

    } else if (tabName === 'employees') {
        container.innerHTML = createEmployeesTable(data.employees, periodKey);

        // --- ОБРАБОТЧИК КЛИКОВ (СОТРУДНИКИ) ---
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

            // 2. Клик по календарю отпусков
            if (event.target.classList.contains('btn-availability')) {
                const employeeId = event.target.getAttribute('data-id');
                console.log(`📅 Нажали календарь сотрудника с ID: ${employeeId}`);
                openVacationCalendar(employeeId, periodKey);
            }

            // 3. Клик по удалению сотрудника
            if (event.target.classList.contains('btn-delete--emp')) {
                const employeeId = event.target.getAttribute('data-id');
                handleDeleteEmployee(employeeId, periodKey);
            }
        };

        // --- 2. ФИЛЬТРАЦИЯ СОТРУДНИКОВ ПО ДОЛЖНОСТИ (ВСТАВИЛИ СЮДА!) ---
        container.onchange = function(event) {
            if (event.target.id === 'employee-position-filter') {
                currentFilters.employeePosition = event.target.value; // Записываем выбранную должность в стейт
                renderCurrentTab('employees', periodKey); // Перерисовываем вкладку, чтобы применился фильтр
            }
        };

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
