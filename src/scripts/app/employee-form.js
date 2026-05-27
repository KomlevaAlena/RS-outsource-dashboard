/**
 * employee-form.js
 * Логика валидации формы сотрудников и сохранение их в Store.
 */

import { store } from './store.js';
import { renderCurrentTab } from './render.js';

function validateEmployeeForm() { // Функция для валидации полей формы на лету
    const nameInput = document.getElementById('emp-name');
    const positionInput = document.getElementById('emp-position');
    const ageInput = document.getElementById('emp-age');
    const salaryInput = document.getElementById('emp-salary');
    const submitBtn = document.getElementById('emp-submit');
    const ageError = document.getElementById('error-emp-age');
    // Базовая проверка на заполненность
    const isNameValid = nameInput.value.trim().length > 0;
    const isPositionValid = positionInput.value.trim().length > 0;
    const isSalaryValid = Number(salaryInput.value) > 0;
    // Специфическая проверка возраста: берем число
    const ageValue = Number(ageInput.value);
    let isAgeValid = false;

    if (ageInput.value.trim() === '') {
        ageError.textContent = ''; // Если поле пустое, ошибку не пишем
    } else if (ageValue < 18) {
        ageError.textContent = 'The employee must be over 18 years of age' // Сотрудник должен быть старше 18 лет
    } else {
        ageError.textContent = ''; // Всё ок, стираем ошибку
        isAgeValid = true;
    }

    if (isNameValid && isPositionValid && isAgeValid && isSalaryValid) { // Кнопка активна только если ВСЕ поля валидны
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

function handleEmployeeSubmit(event) {
    event.preventDefault(); // Отменяем перезагрузку страницы
    const nameInput = document.getElementById('emp-name');
    const positionInput = document.getElementById('emp-position');
    const ageInput = document.getElementById('emp-age');
    const salaryInput = document.getElementById('emp-salary');
    // Получаем текущий выбранный период из сайдбара
    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');
    const periodKey = yearSelect.value + '-' + monthSelect.value;

    const newEmployee = {
        id: 'emp_' + Date.now(), // Уникальный ID
        name: nameInput.value.trim(),
        position: positionInput.value.trim(),
        age: Number(ageInput.value),
        salary: Number(salaryInput.value)
    }

    const monthData = store.getMonthData(periodKey);// 1. Извлекаем данные месяца из хранилища
    monthData.employees.push(newEmployee);// 2. Добавляем сотрудника в массив
    const allData = store.getRawData();// 3. Сохраняем обратно в LocalStorage
    allData[periodKey] = monthData;
    store.saveData(allData);
    console.log('✅ Новый сотрудник добавлен:', newEmployee);

    renderCurrentTab('employees', periodKey);// 4. Просим рендер обновить текущую вкладку
    // 5. Очищаем форму и закрываем панель
    document.getElementById('employee-form').reset();
    document.getElementById('emp-submit').disabled = true;
    const panel = document.getElementById('employee-panel');
    if (panel) {
        panel.classList.remove('slide-panel--open');
    }
}

export function initEmployeeForm() {
    const form = document.getElementById('employee-form');

    if (form) {
        const nameInput = document.getElementById('emp-name');
        const positionInput = document.getElementById('emp-position');
        const ageInput = document.getElementById('emp-age');
        const salaryInput = document.getElementById('emp-salary');
        // Отслеживаем ввод текста
        nameInput.addEventListener('input', validateEmployeeForm);
        positionInput.addEventListener('input', validateEmployeeForm);
        ageInput.addEventListener('input', validateEmployeeForm);
        salaryInput.addEventListener('input', validateEmployeeForm);
        // Отслеживаем отправку формы
        form.addEventListener('submit', handleEmployeeSubmit);
    }
}