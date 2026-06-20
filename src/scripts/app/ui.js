/**
 * ui.js
 * Файл для управления интерфейсом (кнопки, переключения вкладок, меню)
 */

import { renderCurrentTab } from './render.js';

function getCurrentPeriod() { // собирает "год-месяц" из селекторов
    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');

    if (!monthSelect || !yearSelect) return '2026-01'; // Дефолтный фоллбек
    return yearSelect.value + '-' + monthSelect.value;
}

function handleTabSwitch(event) {
    const navButtons = document.querySelectorAll('.nav-button'); // 1. Находим все кнопки навигации
    const pageTitle = document.getElementById('page-title'); // 2. Находим заголовок страницы
    const addEntityBtn = document.getElementById('add-entity-btn'); // Главная кнопка действия

    navButtons.forEach(function(btn) {
        btn.classList.remove('nav-button--active'); // 3. Убираем у всех кнопок класс активного состояния
    });

    const clickedBtn = event.currentTarget;
    clickedBtn.classList.add('nav-button--active'); // 4. Добавляем класс активности той кнопке, на которую нажали

    const selectedTab = clickedBtn.getAttribute('data-tab'); // 5. Проверяем, какая вкладка выбрана

    if (selectedTab === 'projects') {
        pageTitle.textContent = 'Projects';
        if (addEntityBtn) addEntityBtn.textContent = '+ Add projects';
    } else if (selectedTab === 'employees') {
        pageTitle.textContent = 'Employees';
        if (addEntityBtn) addEntityBtn.textContent = '+ Add employee';
    }

    console.log('Переключено на вкладку:', selectedTab);

    const period = getCurrentPeriod();
    renderCurrentTab(selectedTab, period);
}

function handlePeriodChange() {
    const activeTabBtn = document.querySelector('.nav-button--active');
    const selectedTab = activeTabBtn ? activeTabBtn.getAttribute('data-tab') : 'projects';

    const period = getCurrentPeriod();
    renderCurrentTab(selectedTab, period);
    console.log('Период изменен на:', period);
}

function openProjectsPanel() {
    const panel = document.getElementById('project-panel');
    if (panel) panel.classList.add('slide-panel--open');
}

function closeProjectsPanel() {
    const panel = document.getElementById('project-panel');
    if (panel) panel.classList.remove('slide-panel--open');
}

function openEmployeesPanel() {
    const panel = document.getElementById('employee-panel');
    if (panel) panel.classList.add('slide-panel--open');
}

function closeEmployeesPanel() {
    const panel = document.getElementById('employee-panel');
    if (panel) panel.classList.remove('slide-panel--open');
}

export function initUI() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const navButtons = document.querySelectorAll('.nav-button'); // Кнопки вкладок

    const monthSelect = document.getElementById('month-select'); // Селекторы
    const yearSelect = document.getElementById('year-select');

    const addEntityBtn = document.getElementById('add-entity-btn');
    const panelCloseBtn = document.getElementById('project-panel-close');
    const panelOverlay = document.getElementById('project-panel-overlay');

    const empCloseBtn = document.getElementById('employee-panel-close');
    const empOverlay = document.getElementById('employee-panel-overlay');

    if (!monthSelect || !yearSelect) return;

    // 1. Восстанавливаем сохраненный период из памяти браузера
    const savedMonth = localStorage.getItem('app-selected-month');
    const savedYear = localStorage.getItem('app-selected-year');
    
    if (savedMonth) monthSelect.value = savedMonth;
    if (savedYear) yearSelect.value = savedYear;

    // 2. Слушаем изменения селекторов периода (сохраняем в память и обновляем UI)
    monthSelect.addEventListener('change', function() {
        localStorage.setItem('app-selected-month', monthSelect.value);
        handlePeriodChange();
    });

    yearSelect.addEventListener('change', function() {
        localStorage.setItem('app-selected-year', yearSelect.value);
        handlePeriodChange();
    });

    // 3. Логика сворачивания сайдбара
    if (sidebar && toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('sidebar--collapsed');
        });
    }

    // 4. Логика переключения вкладок
    navButtons.forEach(function(button) {
        button.addEventListener('click', handleTabSwitch);
    });

    // 5. Логика открытия боковых панелей (Умный клик по главной кнопке)
    if (addEntityBtn) {
        addEntityBtn.addEventListener('click', function() {
            const activeTabBtn = document.querySelector('.nav-button--active');
            const activeTab = activeTabBtn ? activeTabBtn.getAttribute('data-tab') : 'projects';
            
            if (activeTab === 'projects') {
                openProjectsPanel();
            } else if (activeTab === 'employees') {
                openEmployeesPanel();
            }
        });
    }

    // 6. Слушатели закрытия панелей проектов
    if (panelCloseBtn) panelCloseBtn.addEventListener('click', closeProjectsPanel);
    if (panelOverlay) panelOverlay.addEventListener('click', closeProjectsPanel);

    // 7. Слушатели закрытия панелей сотрудников
    if (empCloseBtn) empCloseBtn.addEventListener('click', closeEmployeesPanel);
    if (empOverlay) empOverlay.addEventListener('click', closeEmployeesPanel);

    // Первоначальный рендер при загрузке
    const activeTabBtn = document.querySelector('.nav-button--active');
    const initialTab = activeTabBtn ? activeTabBtn.getAttribute('data-tab') : 'projects';
    renderCurrentTab(initialTab, getCurrentPeriod());
}