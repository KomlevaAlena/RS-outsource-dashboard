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

// ✅ ОДИН ОБЪЕКТ ДЛЯ ВСЕХ ФИЛЬТРОВ (Объединенный)
let currentFilters = {
    projects: {
        companyName: '',
        projectName: ''
    },
    employees: {
        name: '',
        surname: '',
        position: ''
    },
    employeePosition: '' 
};

function handleDeleteProject(projectId, periodKey) { // --- ЛОГИКА УДАЛЕНИЯ ПРОЕКТОВ
    const isConfirmed = confirm('Are you sure you want to delete this project?');
    if (!isConfirmed) return;

    const monthData = store.getMonthData(periodKey);
    const updatedProjects = monthData.projects.filter(function(project){
        return project.id !== projectId;
    });

    monthData.projects = updatedProjects;

    const allData = store.getRawData();
    allData[periodKey] = monthData;
    store.saveData(allData);
    console.log(`❌ Проект с ID ${projectId} успешно удален`);
    renderCurrentTab('projects', periodKey);
}

function handleDeleteEmployee(employeeId, periodKey) {
    const isConfirmed = confirm('Are you sure you want to remove this employee?');
    if (!isConfirmed) return;

    const monthData = store.getMonthData(periodKey);
    monthData.employees = monthData.employees.filter(function(emp) {
        return emp.id !== employeeId;
    });

    const allData = store.getRawData();
    allData[periodKey] = monthData;
    store.saveData(allData);
    console.log(`❌ Сотрудник с ID ${employeeId} удален`);
    renderCurrentTab('employees', periodKey);
}

function updateEmployeeField(employeeId, field, newValue, periodKey) {
    const monthData = store.getMonthData(periodKey);
    const employee = monthData.employees.find(emp => emp.id === employeeId);

    if (employee) {
        if (field === 'salary') {
            const numValue = Number(newValue);
            if (isNaN(numValue) || numValue <= 0) {
                alert('Please enter the correct salary amount');
                renderCurrentTab('employees', periodKey);
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
        const allData = store.getRawData();
        allData[periodKey] = monthData;
        store.saveData(allData);
        console.log(`📝 Сотрудник ${employeeId}: поле ${field} обновлено на ${newValue}`);
    }
}

function createFilterChipsHtml(tab) {
    const filters = currentFilters[tab];
    let chipsHtml = '';
    let activeCount = 0;
    
    for (const key in filters) {
        if (filters[key] && filters[key].trim() !== '') {
            activeCount++;
            const readableLabel = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            chipsHtml += `
                <div class="filter-chip">
                    <span>${readableLabel}: <strong>${filters[key]}</strong></span>
                    <button class="filter-chip__remove" data-filter-tab="${tab}" data-filter-key="${key}">×</button>
                </div>
            `;
        }
    }
    if (activeCount >= 2) {
        chipsHtml += `
            <div class="filter-chip filter-chip--clear-all" data-filter-clear-tab="${tab}">
                Clear Filters
            </div>
        `;
    }
    return `<div class="filter-chips-container">${chipsHtml}</div>`;
}

function createProjectsTable(data, periodKey) { 
    let projects = data.projects || [];
    const assignments = data.assignments || [];
    const employees = data.employees || [];

    // 1. ФИЛЬТРАЦИЯ МАССИВА ПРОЕКТОВ ПО СТЕЙТУ currentFilters
    if (currentFilters.projects.companyName && currentFilters.projects.companyName.trim() !== '') {
        const query = currentFilters.projects.companyName.toLowerCase().trim();
        projects = projects.filter(p => p.companyName ? p.companyName.toLowerCase().includes(query) : false);
    }
    if (currentFilters.projects.projectName && currentFilters.projects.projectName.trim() !== '') {
        const query = currentFilters.projects.projectName.toLowerCase().trim();
        projects = projects.filter(p => p.projectName ? p.projectName.toLowerCase().includes(query) : false);
    }

    // ЛОГИКА СОРТИРОВКИ ПРОЕКТОВ
    if (currentSort.tab === 'projects'  && currentSort.field) {
        projects = [...projects].sort(function(a, b) {
            let valA, valB;
            if (currentSort.field === 'expenses' || currentSort.field === 'profit' || currentSort.field === 'effectiveCapacity') {
                const finA = calculateProjectFinance(a, assignments, employees, periodKey);
                const finB = calculateProjectFinance(b, assignments, employees, periodKey);
                valA = finA[currentSort.field];
                valB = finB[currentSort.field]; 
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
        if (currentSort.tab === 'projects' && currentSort.field === field) {
            return currentSort.direction === 'asc' ? ' ↑' : ' ↓';
        }
        return '';
    }

    // 2. ГЕНЕРИРУЕМ ЧИПСЫ НАД ТАБЛИЦЕЙ СРАЗУ (Вместо старого инпута)
    let html = createFilterChipsHtml('projects');

    if (projects.length === 0) {
        html += '<p class="empty-state">No matching projects found</p>';
        return html;
    }

    html += ` 
    <table class="table">
        <thead>
            <tr>
                <th class="sortable" data-sort="companyName">
                    Company${getArrow('companyName')}
                    <span class="filter-icon" data-filter-field="companyName">⌕</span>
                </th>
                <th class="sortable" data-sort="projectName">
                    Project${getArrow('projectName')}
                    <span class="filter-icon" data-filter-field="projectName">⌕</span>
                </th>
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
        const finance = calculateProjectFinance(project, assignments, employees, periodKey);
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

function createEmployeesTable(employees, periodKey) {
    if (employees.length === 0) {
        return '<p class="empty-state">No employees added yet</p>';
    }

    let displayedEmployees = employees || [];

    // const allPositions = [];
    // displayedEmployees.forEach(function(emp) {
    //     if (emp.position && !allPositions.includes(emp.position)) {
    //         allPositions.push(emp.position);
    //     }
    // });
    // allPositions.sort();

    // if (currentFilters.employeePosition && currentFilters.employeePosition !== '') {
    //     displayedEmployees = displayedEmployees.filter(function(emp) {
    //         return emp.position === currentFilters.employeePosition;
    //     });
    // }

    // 1. ФИЛЬТРАЦИЯ МАССИВА СОТРУДНИКОВ ПО СТЕЙТУ currentFilters.employees
    if (currentFilters.employees.name && currentFilters.employees.name.trim() !=='') {
        const query = currentFilters.employees.name.toLowerCase().trim();
        displayedEmployees = displayedEmployees.filter(emp => {
            if (!emp.name) return false;
            const firstName = emp.name.split(' ')[0] || '';// Берем первое слово из полного имени
            return firstName.toLowerCase().includes(query);
        });
    }

    if (currentFilters.employees.surname && currentFilters.employees.surname.trim() !== '') {
        const query = currentFilters.employees.surname.toLowerCase().trim();
        displayedEmployees = displayedEmployees.filter(emp => {
            if (!emp.name) return false;
            const surname = emp.name.split(' ').slice(1).join(' ') || ''; // Берем все слова после первого (фамилию)
            return surname.toLowerCase().includes(query);
        })
    }

    if (currentFilters.employees.position && currentFilters.employees.position.trim() !== '') {
        const query = currentFilters.employees.position.toLowerCase().trim();
        displayedEmployees = displayedEmployees.filter(emp => 
            emp.position ? emp.position.toLowerCase().includes(query) : falses
        );
    }



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

    // let optionsHtml = `<option value="">All Positions</option>`;
    // allPositions.forEach(function(pos) {
    //     const selected = currentFilters.employeePosition === pos ? 'selected' : '';
    //     optionsHtml += `<option value="${pos}" ${selected}>${pos}</option>`;
    // });

    // let html = `
    // <div class="table-actions">
    //     <select id="employee-position-filter" class="select select--filter" style="max-width: 250px; margin-bottom: 15px; padding: 6px 10px; border-radius: 4px; border: 1px solid #ccc;">
    //         ${optionsHtml}
    //     </select>
    // </div>
    // `;

    if (displayedEmployees.length === 0) {
        html += '<p class="empty-state">No employees found for this position</p>';
        return html;
    }

    // 3. ГЕНЕРИРУЕМ ЧИПСЫ НАД ТАБЛИЦЕЙ СОТРУДНИКОВ
    let html = createFilterChipsHtml('employees');

    if (displayedEmployees.length === 0) {
        html += '<p class="empty-state">No employees found matching filters</p>';
        return html;
    }

    // 4. СТРОИМ ТАБЛИЦУ

    html += `
    <table class="table">
        <thead>
            <tr>
            <th class="sortable" data-sort="name">
                    Name${getArrow('name')}
                    <span class="filter-icon" data-filter-field="name">⌕</span>
                </th>
                <th>
                    Surname
                    <span class="filter-icon" data-filter-field="surname">⌕</span>
                </th>
                <th class="sortable" data-sort="position">
                    Position${getArrow('position')}
                    <span class="filter-icon" data-filter-field="position">⌕</span>
                </th>
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

    const globalFinance = calculateGlobalFinance(projects, assignments, employees, periodKey);

    return ` 
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
}

function openDetailsModal(projectId, periodKey) {
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

    const currentProject = projects.find(p => p.id === projectId);
    if (currentProject) {
        modalTitle.textContent = `Team for "${currentProject.projectName}"`;
    }

    const projectAssignments = assignments.filter(asm => String(asm.projectId) === String(projectId));

    if (projectAssignments.length === 0) {
        modalBody.innerHTML = '<p class="empty-state">No employees assigned to this project yet.</p>';
    } else {
        let listHtml = '<ul class="team-list">';
        
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

    modal.onclick = function(event) {
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
            openDetailsModal(pId, periodKey);
            renderCurrentTab('projects', periodKey);
            return;
        }

        if (event.target.id === 'details-modal-overlay' || event.target.id === 'details-modal-close') {
            modal.classList.remove('modal--open');
        }
    };

    modal.classList.add('modal--open');
}
 
function openAssignModal(projectId, periodKey) {
    const modal = document.getElementById('assign-modal');
    const projectInput = document.getElementById('assign-project-id');
    const empSelect = document.getElementById('assign-emp-select');

    if (!modal || !empSelect) return;
    
    if (projectInput) projectInput.value = projectId;
    
    const monthData = store.getMonthData(periodKey);
    const employees = (monthData && monthData.employees) ? monthData.employees : [];
    
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
}

export function renderCurrentTab(tabName, periodKey) {
    const container = document.getElementById('table-container');
    if (!container) return;

    const data = store.getMonthData(periodKey);

    if (tabName === 'projects') {
        const summaryHtml = createFinancialSummary(data, periodKey);
        const tableHtml = createProjectsTable(data, periodKey);

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
