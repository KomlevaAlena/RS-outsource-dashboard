/**
 * assign-modal.js
 * Логика закрытия модального окна и обработки ползунка процентов.
 */

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

    // Слушатель отправки формы (пока оставляем заглушку)
    if (form) {
        form.onsubmit = function(event) {
            event.preventDefault(); // Запрещаем перезагрузку страницы
            
            alert('Great! Logic for saving will be here soon.');
            
            closeAssignModal();
        };
    }
}
