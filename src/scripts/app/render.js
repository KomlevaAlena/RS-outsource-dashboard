/**
 * render.js
 * Этот файл отвечает за "отрисовку" интерфейса.
 * Он берет данные и превращает их в HTML-код.
 */

import { store } from './store.js';

function handleDeleteProject(projectId, periodKey) { // --- ЛОГИКА УДАЛЕНИЯ ПРОЕКТОВ (у тебя уже есть)
    const isConfirmed = confirm('Are you sure you want to delete this project?'); // Спрашиваем подтверждение у пользователя
    if (!isConfirmed) return;

    const monthData = store.getMonthData(periodKey); // 1. Берем данные за этот месяц из Стора

    const updatedProjects = monthData.projects.filter(function(project){ // 2. Фильтруем массив проектов: оставляем все проекты, кроме того, у которого ID совпадает с удаляемым
        return project.id !== projectId; // Метод filter создает новый массив без удаленного элемента
    });

    monthData.projects = updatedProjects; // 3. Записываем обновленный массив обратно в слепок месяца

    const allData = store.getRawData();
    allData[periodKey] = monthData;
    store.saveData(allData);
    console.log(`❌ Проект с ID ${projectId} успешно удален`);
    renderCurrentTab('projects', periodKey); // 5. Перерисовываем таблицу для этого же месяца, чтобы удаленная строка исчезла
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
    const employee = monthData.employees.find(emp => emp.id === employeeId); // Находим нужного сотрудника в массиве

    if (employee) {
        // Если правим зарплату — переводим в число, если должность — оставляем строкой
        if (field === 'salary') {
            const numValue = Number(newValue);
            if (isNaN(numValue) || numValue <= 0) {
                alert('Please enter the correct salary amount');
                renderCurrentTab('employees', periodKey); // Сбрасываем изменения на экране
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

function createProjectsTable(projects) { // 1. Функция для сборки таблицы проектов
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
                <th>Budget</th>
                <th>Capacity</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;

    projects.forEach(function(project) {
        html += `
            <tr>
                <td>${project.companyName}</td>
                <td>${project.projectName}</td>
                <td>${project.budget} $</td>
                <td class="clickable-capacity" data-id="${project.id}">
                    <span class="capacity-link">${project.capacity || 0} p.</span>
                </td>
                <td>
                    <button class="btn-assign" data-id="${project.id}">Assign</button>
                    <button class="btn-delete" data-id="${project.id}">Delete</button>
                </td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    return  html;
}

function createEmployeesTable(employees) { // ТАБЛИЦА СОТРУДНИКОВ
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
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;

    employees.forEach(function(emp) {
        html += `
            <tr>
                <td>${emp.name}</td>
                <td class="editable" data-id="${emp.id}" data-field="position">${emp.position}</td>
                <td>${emp.age} y.o.</td>
                <td class="editable" data-id="${emp.id}" data-field="salary">${emp.salary} $</td>
                <td><button class="btn-delete btn-delete--emp" data-id="${emp.id}">Delete</button></td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    return html;
}


// Функция для сборки финансовых карточек (виджетов).
//  берет массив проектов и считает общие показатели.

function createFinancialSummary(projects) {
    const totalProjects = projects.length; // 1. Считаем количество проектов (просто смотрим на длину массива)

    let totalBudget = 0; // 2. Считаем общий бюджет и общую вместимость. Сначала они равны нулю.
    let totalCapacity = 0;

    projects.forEach(function(project) { //проходим по массиву и суммируем
        totalBudget += project.budget;
        totalCapacity += (project.capacity || 0); // Если capacity забыли указать, прибавим 0
    });

    //собираем html .toLocaleString() встроенный в браузер «украшатель» чисел, добавляет проблемы в больших числах
    let html = ` 
        <div class="fin-summary">
            <div class="fin-card">
                <span class="fin-card__title">Active Projects</span>
                <span class="fin-card__value">${totalProjects}</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Budget</span>
                <span class="fin-card__value">${totalBudget.toLocaleString()} $</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Capacity</span>
                <span class="fin-card__value">${totalCapacity} p.</span>
            </div>
        </div>
        `;

    return html;
}

function openDetailsModal(projectId, periodKey) { //Функция открытия поп-апа со списком назначенных сотрудников.
    console.log('📖 ЧИТАЕМ НАЗНАЧЕНИЯ. Ключ периода:', periodKey);

    const modal = document.getElementById('details-modal');
    const modalBody = document.getElementById('details-modal-body');
    const modalTitle = document.getElementById('details-modal-title');

    if (!modal || !modalBody) return;
    // перед чтением заставляем Стор перечитать LocalStorage, чтобы поймать только что сохраненного сотрудника!
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

    const currentProject = projects.find(p => p.id === projectId); // Находим сам проект, чтобы написать его имя в заголовке
    if (currentProject) {
        modalTitle.textContent = `Team for "${currentProject.projectName}"`;
    }
    const projectAssignments = assignments.filter(asm => String(asm.projectId) === String(projectId)) // Фильтруем «записки», оставляя только те, которые привязаны к этому проекту
    if (projectAssignments.length === 0) {
        modalBody.innerHTML = '<p class="empty-state">No employees assigned to this project yet.</p>';
    } else {
        let listHtml = '<ul class="team-list">'; // Собираем HTML-список людей
        projectAssignments.forEach(function(asm) {
            const employee = employees.find(emp => emp.id === asm.employeeId);// Ищем данные самого сотрудника по его ID
            if (employee) {
                listHtml += `
                    <li class="team-item">
                        <div class="team-item__info">
                            <strong class="team-item__name">${employee.name}</strong>
                            <span class="team-item__position">${employee.position}</span>
                        </div>
                        <span class="team-item__capacity">${asm.capacity}% load</span>
                    </li>
                `;
            }
        });

        listHtml += '</ul>';
        modalBody.innerHTML = listHtml;
    }
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
    // Записываем ID проекта
    if (projectInput) {
        projectInput.value = projectId;
    }
    // Извлекаем сотрудников текущего месяца
    const monthData = store.getMonthData(periodKey);
    // Делаем жесткую проверку: если employees вообще нет, берем пустой массив []
    const employees = (monthData && monthData.employees) ? monthData.employees : [];

    console.log('Список сотрудников для модалки:', employees);
    // Собираем список сотрудников для выпадающего меню
    if (employees.length === 0) {
        empSelect.innerHTML = '<option value="">-- No employees available --</option>';
    } else {
        let optionsHtml = '<option value="">-- Select an employee --</option>';
        
        employees.forEach(function(emp) {
            // Используем оператор || 'Unknown', чтобы если поля пустые, код не падал
            const name = emp.name || 'Unknown Name';
            const position = emp.position || 'No Position';
            optionsHtml += `<option value="${emp.id}">${name} (${position})</option>`;
        });
        
        empSelect.innerHTML = optionsHtml;
    }
    // Безопасно выставляем значения ползунка
    const rangeInput = document.getElementById('assign-capacity-range');
    const rangeValue = document.getElementById('assign-range-value');
    if (rangeInput) rangeInput.value = 50;
    if (rangeValue) rangeValue.textContent = '50';
    // Включаем модалку!
    modal.classList.add('modal--open');
    console.log('🚀 Класс modal--open успешно добавлен!');
}

// 2. Главная функция, которую мы будем вызывать извне
export function renderCurrentTab(tabName, periodKey) {
    const container = document.getElementById('table-container');
    if (!container) return;

    const data = store.getMonthData(periodKey);// Получаем свежие данные из нашего хранилища

    if (tabName === 'projects') {
        // container.innerHTML = createProjectsTable(data.projects);
        const summaryHtml = createFinancialSummary(data.projects);
        const tableHtml = createProjectsTable(data.projects);

        container.innerHTML = summaryHtml + tableHtml;
        // НАСТРОЙКА ДЕЛЕГИРОВАНИЯ СОБЫТИЙ Очищаем старые слушатели (просто перезаписывая onclick), чтобы они не плодились
        container.onclick = function(event) {
            console.log('Кликнули по элементу:', event.target); // <-- ДОБАВЬ ЭТУ СТРОЧКУ
            if (event.target.classList.contains('btn-delete')) { // Проверяем, содержит ли элемент, по которому кликнули, класс 'btn-delete'
                const projectId = event.target.getAttribute('data-id'); // Вытаскиваем ID проекта из атрибута data-id кнопки
                handleDeleteProject(projectId, periodKey); // Запускаем нашу функцию удаления
            }
            // 2.Клик по кнопке НАЗНАЧЕНИЯ (Assign)
            if (event.target.classList.contains('btn-assign')) {
                console.log('Ура, поймали клик по кнопке Assign!'); // <-- ДОБАВЬ ЭТУ СТРОЧКУ
                const projectId = event.target.getAttribute('data-id');
                openAssignModal(projectId, periodKey);// Вызываем функцию открытия окна
            }
            // 3. Клик по ячейке Capacity или по тексту внутри неё
            const capacityCell = event.target.closest('.clickable-capacity');
            if (capacityCell) {
                const projectId = capacityCell.getAttribute('data-id');
                openDetailsModal(projectId, periodKey);
            }
        };
    } else if (tabName === 'employees') {
        container.innerHTML = createEmployeesTable(data.employees); // отрисовываем таблицу сотрудников

        container.onclick = function(event) { // Делегирование кликов для сотрудников
            if(event.target.classList.contains('btn-delete--emp')) { // Проверяем наличие класса кнопки удаления сотрудника
                const employeeId = event.target.getAttribute('data-id');
                handleDeleteEmployee(employeeId, periodKey);
            }
        };

        container.ondblclick = function(event) { // 2.Делегирование двойных кликов (для редактирования)
            const cell = event.target;
            // Проверяем, что кликнули именно по редактируемой ячейке и в ней еще нет инпута
            if (cell.classList.contains('editable') && !cell.querySelector('input')) {
                const currentText = cell.textContent.replace(' $', '').trim(); // Убираем знак доллара, если он есть
                const employeeId = cell.getAttribute('data-id');
                const field = cell.getAttribute('data-field');
                // Создаем инпут
                const input = document.createElement('input');
                input.type = field ==='salary' ? 'number' : 'text';
                input.value = currentText;
                input.className = 'table-inline-input';
                // Очищаем ячейку и вставляем туда инпут
                cell.innerHTML = '';
                cell.appendChild(input);
                input.focus(); // Фокус
                // Функция завершения редактирования
                function finishEditing() {
                    const newValue = input.value;
                    updateEmployeeField(employeeId, field, newValue, periodKey);
                    renderCurrentTab('employees', periodKey); // Перерисовываем таблицу
                }
                // Если нажали Enter — сохраняем
                input.onkeydown = function(e) {
                    if (e.key === 'Enter') {
                        finishEditing();
                    }
                };
                // Если кликнули в любое другое место экрана — сохраняем
                input.onblur = function() {
                    finishEditing();
                };
            }
        };
    }

    // container.onclick = function(event) {
    //     console.log('Кликнули по элементу:', event.target);

    //     if (event.target.classList.contains('btn-delete')) {
    //         const periodId = event.target.getAttribute('data-id');
    //         handleDeleteProject(periodId, periodKey);
    //     }

    //     if (event.target.classList.contains('btn-assign')) {
    //         const projectId = event.target.getAttribute('data-id');
    //         openAssignModal(projectId, periodKey);
    //     }
    // }
}