/**
 * render.js
 * Этот файл отвечает за "отрисовку" интерфейса.
 * Он берет данные и превращает их в HTML-код.
 */

import { store } from './store.js';

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
                <td><button class="btn-delete" data-id="${project.id}">Delete</button></td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    return  html;
}

// 2. Главная функция, которую мы будем вызывать извне
export function renderCurrentTab(tabName, periodKey) {
    const container = document.getElementById('table-container');
    if (!container) return;

    const data = store.getMonthData(periodKey);// Получаем свежие данные из нашего хранилища

    if (tabName === 'projects') {
        container.innerHTML = createProjectsTable(data.projects);
    } else if (tabName === 'employees') {
        container.innerHTML = '<p>There will be a table of employees here soon....</p>';
    }
}