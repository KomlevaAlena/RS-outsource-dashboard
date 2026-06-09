/**
 * assign-modal.js
 * Логика закрытия модального окна и обработки ползунка процентов.
 */

import { store } from './store.js';

// Функция, которая просто убирает класс видимости
export function closeAssignModal() {
    const modal = document.getElementById('assign-modal');
    if (modal) {
        modal.classList.remove('modal--open');
    }
}

/**
 * Главный инициализатор слушателей для модального окна
 */
export function initAssignModal() {
    const modal = document.getElementById('assign-modal');
    const rangeInput = document.getElementById('assign-capacity-range');
    const rangeValue = document.getElementById('assign-range-value');
    const form = document.getElementById('assign-form');

    if (!modal) return;

    // УМНОЕ ЗАКРЫТИЕ (Делегирование кликов внутри модалки)
    modal.onclick = function(event) {
        // Если кликнули на темный фон (overlay) ИЛИ на крестик (close)
        if (event.target.id === 'assign-modal-overlay' || event.target.id === 'assign-modal-close') {
            console.log('🔒 Закрываем модальное окно...');
            closeAssignModal();
        }
    };

    // Живое обновление процентов при движении ползунка (слайдера)
    if (rangeInput && rangeValue) {
        rangeInput.oninput = function() {
            rangeValue.textContent = rangeInput.value;
        };
    }

    // Слушатель отправки формы
    if (form) {
        form.onsubmit = function(event) {
            event.preventDefault(); // Запрещаем перезагрузку страницы
            
            // Вытаскиваем данные из полей модалки
            const projectId = document.getElementById('assign-project-id').value;
            const employeeId = document.getElementById('assign-emp-select').value;
            const capacity = Number(rangeInput.value);
            // Получаем текущий период (год и месяц) из сайдбара
            const monthSelect = document.getElementById('month-select');
            const yearSelect = document.getElementById('year-select');
            const periodKey = yearSelect.value + '-' + monthSelect.value;
            
            console.log('✏️ СОХРАНЯЕМ НАЗНАЧЕНИЕ. Ключ периода:', periodKey);
            // Проверка выбора сотрудника?
            if (!employeeId) {
                alert('Please select an employee first!');
                return;
            }
            const monthData = store.getMonthData(periodKey);// 1. Достаем данные текущего месяца
            if (!monthData.assignments) { // 2. Если 'assignments' еще нет в этом месяце — создаем его пустым
                monthData.assignments = [];
            }
            // 3. обьект с назначением сотрудника
            const newAssignment = {
                projectId: projectId,
                employeeId: employeeId,
                capacity: capacity
            };
            monthData.assignments.push(newAssignment); // добавляем назначение

            const allData = store.getRawData(); // 5. Сохраняем обновленный месяц обратно в LocalStorage
            allData[periodKey] = monthData;
            store.saveData(allData);

            console.log('🔗 Успешное назначение в Стор:', newAssignment);
            alert('Employee successfully assigned to the project!');
            
            closeAssignModal();
        };
    }

    const detailsModal = document.getElementById('details-modal');
    if (detailsModal) {
        detailsModal.onclick = function(event) {
            if (event.target.id === 'details-modal-overlay' || event.target.id === 'details-modal-close') {
                detailsModal.classList.remove('modal--open');
            }
        };
    }
}
