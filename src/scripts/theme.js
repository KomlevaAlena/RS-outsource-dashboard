/**
 * src/scripts/theme.js
 * Модуль для управления переключением темы (Light / Dark)
 */

const THEME_KEY = 'app_theme';

/**
 * Инициализация темы при загрузке приложения
 */

export function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    // 1. Проверяем сохраненную тему в localStorage (по умолчанию 'light')
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    // 2. Применяем тему к тегу documentElement (<html>)
    applyTheme(savedTheme, themeToggleBtn);
    // 3. Вешаем обработчик клика на кнопку
    themeToggleBtn.onclick = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        applyTheme(newTheme, themeToggleBtn);
        localStorage.setItem(THEME_KEY, newTheme);
    };
}

/**
 * Вспомогательная функция применения темы и смены иконки
 */

function applyTheme(theme, buttonEl) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        buttonEl.textContent = '☀️'; // Солнышко для возврата на светлую
    } else {
        document.documentElement.removeAttribute('data-theme');
        buttonEl.textContent = '🌙'; // Луна для перехода на темную
    }
}
