// employeesTable.js
import { store } from './store.js';
import { calculateVacationFactor, calculateEffectiveCapacity } from './formulas.js';
import { currentFilters, createFilterChipsHtml } from './filters.js';

export function handleDeleteEmployee(employeeId, periodKey) {
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

export function updateEmployeeField(employeeId, field, newValue, periodKey) {
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

export function createEmployeesTable(employees, periodKey) {
    if (employees.length === 0) {
        return '<p class="empty-state">No employees added yet</p>';
    }

    let displayedEmployees = employees || [];

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
