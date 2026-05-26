/**
 * project-form.js
 * Логика валидации и добавления новых проектов.
 */

import { store } from "./store";
import { renderCurrentTab } from "./render";

function validateForm() { // Вспомогательная функция, которая проверяет всю форму целиком
    const nameInput = document.getElementById('proj-name');
    const companyInput = document.getElementById('proj-company');
    const budgetInput = document.getElementById('proj-budget');
    const capacityInput = document.getElementById('proj-capacity');
    const submitBtn = document.getElementById('proj-submit');
    // Проверяем, что все поля заполнены (длина строки больше 0, а числа больше нуля)
    const isNameValid = nameInput.value.trim().length > 0;
    const isCompanyValid = companyInput.value.trim().length > 0;
    const isBudgetValid = Number(budgetInput.value) > 0;
    const isCapacityValid = Number(capacityInput.value) > 0;
    // Если всё заполнено правильно, разблокируем кнопку. Если нет — блокируем.
    if (isNameValid && isCompanyValid && isBudgetValid && isCapacityValid) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

function handleFormSubmit(event) { // Функция обработки отправки формы
    event.preventDefault(); // Отменяем стандартную перезагрузку страницы браузером

    const nameInput = document.getElementById('proj-name');
    const companyInput = document.getElementById('proj-company');
    const budgetInput = document.getElementById('proj-budget');
    const capacityInput = document.getElementById('proj-capacity');

    // Получаем текущий выбранный период из селекторов в сайдбаре
    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');
    const periodKey = yearSelect.value + '-' + monthSelect.value;

    // Создаем уникальный ID для нового проекта
    const newProjectId = 'proj_' + Date.now();

    const newProject = { // Собираем объект нового проекта
        id: newProjectId,
        projectName: nameInput.value.trim(),
        companyName: companyInput.value.trim(),
        budget: Number(budgetInput.value),
        capacity: Number(capacityInput.value)
    };

    const monthData = store.getMonthData(periodKey); // 1. Загружаем из Стора все текущие данные за этот месяц
    monthData.projects.push(newProject); // 2. Добавляем наш новый проект в массив проектов этого месяца
    const allData = store.getRawData(); // 3. Сохраняем обновленный слепок месяца обратно в Стор
    allData[periodKey] = monthData; // Для этого нам нужно обновить глобальный объект. Наш store.js умеет сохранять весь объект.
    store.saveData(allData);
    console.log('✅ Новый проект успешно сохранен в Store:', newProject);

    renderCurrentTab('projects', periodKey); // 4. Обновляем таблицу на экране прямо сейчас!

    document.getElementById('project-form').reset(); // 5. Сбрасываем поля формы и закрываем панель
    document.getElementById('proj-submit').disabled = true; // Снова блокируем кнопку

    const panel = document.getElementById('project-panel');
    if (panel) {
        panel.classList.remove('slide-panel--open');
    }
}

export function initProjectForm() { // Главная функция инициализации формы
    const form = document.getElementById('project-form');

    if (form) {
        const nameInput = document.getElementById('proj-name');
        const companyInput = document.getElementById('proj-company');
        const budgetInput = document.getElementById('proj-budget');
        const capacityInput = document.getElementById('proj-capacity');
        // Вешаем событие 'input' (срабатывает при каждом нажатии клавиши) на каждое поле
        nameInput.addEventListener('input', validateForm);
        companyInput.addEventListener('input', validateForm);
        budgetInput.addEventListener('input', validateForm);
        capacityInput.addEventListener('input', validateForm);
        // Вешаем событие отправки формы
        form.addEventListener('submit', handleFormSubmit);
    }
}