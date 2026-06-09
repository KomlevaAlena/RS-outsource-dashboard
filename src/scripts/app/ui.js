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

function openProjectsPanel() {
    const panel = document.getElementById('project-panel');
    if (panel) {
        panel.classList.add('slide-panel--open');
    }
}

function closeProjectsPanel() {
    const panel = document.getElementById('project-panel');
    if (panel) {
        panel.classList.remove('slide-panel--open');
    }
}

function openEmployeesPanel() {
    const panel = document.getElementById('employee-panel');
    if (panel) {
        panel.classList.add('slide-panel--open');
    }
}

function closeEmployeesPanel() {
    const panel = document.getElementById('employee-panel');
    if (panel) {
        panel.classList.remove('slide-panel--open');
    }
}

export function initUI() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const navButtons = document.querySelectorAll('.nav-button'); // Находим все кнопки вкладок
    const tabButtons = document.querySelectorAll('.sidebar__nav-btn');

    const monthSelect = document.getElementById('month-select');// Находим селекторы
    const yearSelect = document.getElementById('year-select');

    const addEntityBtn = document.getElementById('add-entity-btn');
    const panelCloseBtn = document.getElementById('project-panel-close');
    const panelOverlay = document.getElementById('project-panel-overlay');

    // const addEntityBtn = document.getElementById('add-entity-btn');
    const empCloseBtn = document.getElementById('employee-panel-close');
    const empOverlay = document.getElementById('employee-panel-overlay');

    if (!monthSelect || !yearSelect) return;
    // 1. Проверяем, есть ли сохраненный период в памяти
    const savedMonth = localStorage.getItem('app-selected-month');
    const savedYear = localStorage.getItem('app-selected-year');
    // Если есть — выставляем их в селекты, если нет — оставляем дефолтные (например, текущие)
    if (savedMonth) monthSelect.value = savedMonth;
    if (savedYear) yearSelect.value = savedYear;
    // Функция для получения текущего ключа периода
    function getPeriodKey() {
        return yearSelect.value + '-' + monthSelect.value;
    }
    let activeTab = 'projects';// Определяем, какая вкладка сейчас активна (по умолчанию 'projects')
    // 2. Слушаем изменение МЕСЯЦА
    monthSelect.addEventListener('change', function() {
        localStorage.setItem('app-selected-month', monthSelect.value);
        console.log('📅 Месяц изменен на:', monthSelect.value);
        renderCurrentTab(activeTab, getPeriodKey());
    });
    // 3. Слушаем изменение ГОДА
    yearSelect.addEventListener('change', function() {
        // Запоминаем выбор пользователя в память браузера!
        localStorage.setItem('app-selected-year', yearSelect.value);
        
        console.log('📅 Год изменен на:', yearSelect.value);
        renderCurrentTab(activeTab, getPeriodKey());
    });


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

    if (addEntityBtn) {
        addEntityBtn.addEventListener('click', openProjectsPanel);
    }

    if (panelCloseBtn) {
        panelCloseBtn.addEventListener('click', closeProjectsPanel);
    }

    if (panelOverlay) {
        panelOverlay.addEventListener('click', closeProjectsPanel);
    }

    if (addEntityBtn) {
        addEntityBtn.addEventListener('click', function() {
            const activeTab = document.querySelector('.nav-button--active').getAttribute('data-tab');// Проверяем, какой таб сейчас активен
            
            if (activeTab === 'projects') {
                openProjectsPanel();
            } else if (activeTab === 'employees') {
                openEmployeesPanel();
            }
        });
    }

    if (empCloseBtn) empCloseBtn.addEventListener('click', closeEmployeesPanel);
    if (empOverlay) empOverlay.addEventListener('click', closeEmployeesPanel);

    renderCurrentTab('projects', getCurrentPeriod());
}
