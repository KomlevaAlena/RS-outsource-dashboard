import { store } from './store.js';
import { calculateProjectFinance, calculateGlobalFinance } from './formulas.js';
import { currentFilters, createFilterChipsHtml } from './filters.js';
import { formatCurrency } from './format-currency.js';

export function handleDeleteProject(projectId, periodKey) { // --- ЛОГИКА УДАЛЕНИЯ ПРОЕКТОВ
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

export function createFinancialSummary(data, periodKey) {
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
                <span class="fin-card__value">${formatCurrency(globalFinance.totalBudget)}</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Expenses</span>
                
                <span class="fin-card__value">${formatCurrency(globalFinance.totalExpenses)}</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Profit</span>
                <span class="fin-card__value">${formatCurrency(globalFinance.totalProfit)}</span>
            </div>
        </div>
    `;
}

export function createProjectsTable(data, periodKey, currentSort) { 
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
                <td>${formatCurrency(project.budget)}</td>
                <td class="clickable-capacity" data-id="${project.id}">
                    <span class="capacity-link">${finance.effectiveCapacity} / ${project.capacity} p.</span>
                </td>
                <td>${formatCurrency(finance.expenses)}</td>
                <td class="${profitClass}"><strong>${formatCurrency(finance.profit)}</strong></td>
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

export function openDetailsModal(projectId, periodKey) {
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

export function openAssignModal(projectId, periodKey) {
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
