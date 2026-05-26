/**
 * ui.js
 * Файл для управления интерфейсом (кнопки, переключения вкладок, меню)
 */

import { renderCurrentTab } from './render.js';

function getCurrentPeriod() { // собирает "год-месяц" из селекторов
    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');

    return yearSelect.value + '-' + monthSelect.value; // .value берет значение из <option value="...">
}

function handleTabSwitch(event) {
    const navButtons = document.querySelectorAll('.nav-button');// 1. Находим все кнопки навигации
    const pageTitle = document.getElementById('page-title'); //2. Находим заголовок страницы и главную кнопку действия
    const addEntityBtn = document.getElementById('add-entity-btn'); // "добавить сущность кнопки"

    navButtons.forEach(function(btn) {
        btn.classList.remove('nav-button--active'); // 3. Убираем у всех кнопок класс активного состояния
    });

    const clickedBtn = event.currentTarget;
    clickedBtn.classList.add('nav-button--active'); // 4. Добавляем класс активности той кнопке, на которую нажали

    const selectedTab = clickedBtn.getAttribute('data-tab'); // 5. Проверяем, какая вкладка выбрана через data-атрибут

    if (selectedTab === 'projects') {
        pageTitle.textContent = 'Projects';
        addEntityBtn.textContent = '+ Add projects';
    } else if (selectedTab === 'employees') {
        pageTitle.textContent = 'Employees';
        addEntityBtn.textContent = '+ Add employee';
    }

    console.log('Переключено на вкладку:', selectedTab);

    const period = getCurrentPeriod();
    renderCurrentTab(selectedTab, period); // ТЕПЕРЬ МЫ БЕРЕМ ПЕРИОД ДИНАМИЧЕСКИ!
}

function handlePeriodChange() {
    const activeTabBtn = document.querySelector('.nav-button--active');
    const selectedTab = activeTabBtn.getAttribute('data-tab');

    const period = getCurrentPeriod();
    renderCurrentTab(selectedTab, period);
    console.log('Период изменен на:', period);
}

export function initUI() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const navButtons = document.querySelectorAll('.nav-button'); // Находим все кнопки вкладок

    const monthSelect = document.getElementById('month-select');// Находим селекторы
    const yearSelect = document.getElementById('year-select');

    // Проверяем наличие элементов на странице
    if (sidebar && toggleBtn) { // Логика сворачивания сайдбара
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('sidebar--collapsed');
            console.log('Клик зафиксирован: состояние сайдбара изменено');
        });
    }

    // Логика переключения вкладок
    navButtons.forEach(function(button) {
        // Вешаем событие клика на каждую кнопку
        button.addEventListener('click', handleTabSwitch);
    });

    if (monthSelect && yearSelect) { // Добавляем слушатель события 'change' (изменение выбора)
        monthSelect.addEventListener('change', handlePeriodChange);
        yearSelect.addEventListener('change', handlePeriodChange);
    }

    renderCurrentTab('projects', getCurrentPeriod());
}


