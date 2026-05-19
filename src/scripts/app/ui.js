/**
 * ui.js
 * Файл для управления интерфейсом (кнопки, переключения вкладок, меню)
 */

import { renderCurrentTab } from './render.js';

function handleTabSwich(event) {
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
    renderCurrentTab(selectedTab, '2026-4');
}

export function initUI() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const navButtons = document.querySelectorAll('.nav-button'); // Находим все кнопки вкладок
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
    button.addEventListener('click', handleTabSwich);
  });
}
