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
    // Добавляем строки для каждого проекта
    projects.forEach(function(project) {
        html += `
            <tr>
                <td>${project.companyName}</td>
                <td>${project.projectName}</td>
                <td>${project.budget} $</td>
                <td>${project.capacity || 0} p.</td>
                <td><button class="btn-delete" data-id="${project.id}">Delete</button></td>
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

// 2. Главная функция, которую мы будем вызывать извне
export function renderCurrentTab(tabName, periodKey) {
    const container = document.getElementById('table-container');
    if (!container) return;

    const data = store.getMonthData(periodKey);// Получаем свежие данные из нашего хранилища

    if (tabName === 'projects') {
        container.innerHTML = createProjectsTable(data.projects);
        // НАСТРОЙКА ДЕЛЕГИРОВАНИЯ СОБЫТИЙ Очищаем старые слушатели (просто перезаписывая onclick), чтобы они не плодились
        container.onclick = function(event) {
            if (event.target.classList.contains('btn-delete')) { // Проверяем, содержит ли элемент, по которому кликнули, класс 'btn-delete'
                const projectId = event.target.getAttribute('data-id'); // Вытаскиваем ID проекта из атрибута data-id кнопки
                handleDeleteProject(projectId, periodKey); // Запускаем нашу функцию удаления
            }
        }
    } else if (tabName === 'employees') {
        container.innerHTML = createEmployeesTable(data.employees); // отрисовываем таблицу сотрудников

        // container.onclick = function(event) {
        //     if (event.target.classList.contains('btn-delete--emp')) {
        //         const employeeId = event.target.getAttribute('data-id');
        //         handleDeleteEmployee(employeeId, periodKey);
        //     }
        // }

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
}