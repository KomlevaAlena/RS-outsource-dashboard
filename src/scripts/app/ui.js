/**
 * ui.js
 * Файл для управления интерфейсом (кнопки, переключения вкладок, меню)
 */
export function initUI() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    // Проверяем наличие элементов на странице
    if (sidebar && toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('sidebar--collapsed');
            console.log('Клик зафиксирован: состояние сайдбара изменено');
        });
    }
}
