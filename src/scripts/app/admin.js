/**
 * src/scripts/app/admin.js
 * Модуль инструментов администратора: Импорт, Экспорт и Сброс базы данных.
 */
import { store } from './store.js';
/**
 * Экспорт всей базы данных (localStorage key: "monthlyData") в JSON-файл
 */
export function exportDatabase() {
    try {
        const rawData = store.getMonthData(); // Загружаем все снапшоты из Стора
        const jsonString = JSON.stringify(rawData, null, 2);
        // Создаем бинарный объект Blob с файлом JSON
        const blob = new Blob([jsonString], {type: 'application/json' });
        const url = URL.createObjectURL(blob);
        // Формируем красивое название файла с текущей датой
        const dateStr = new Date().toISOString().slice(0, 10);
        const fileName = `dashboard-backup-${dateStr}.json`;
        // Скачиваем файл через программный клик по временной ссылке
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click;
        // Освобождаем выделенную память под ссылку
        URL.revokeObjectURL(url);
        console.log('Database successfully exported to JSON file!');
    } catch (error) {
        console.error('Export failed:', error);
        alert('Failed to export data. Please check console for details.');
    }
}

/**
 * Импорт файла JSON обратно в localStorage
 * @param {Event} event - Событие изменения инпута выбора файла
 * @param {Function} refreshCallback - Функция перерисовки текущей страницы
 */

export function importDatabase(event, refreshCallback) {
    const file  = event.target.files[0];
    if (!file) return;

    const render = new FileReader();
    render.onload = function(e) {
        try {
            const importedJson = JSON.parse(e.target.result);
            // Базовая проверка структуры файла
            if (typeof importedJson !== 'object' || importedJson === null) {
                throw new Error('Data is not a valid JSON Object');
            }
            // Перезаписываем данные в Стор
            store.saveData(importedJson);

            alert('Database successfully imported!');
            console.log('Database imported and saved.');
            // Сбрасываем инпут файла, чтобы его можно было загрузить повторно
            event.target.value = '';
            // Вызываем перерисовку
            refreshCallback();
        } catch (error) {
            console.error('Import failed:', error);
            alert('Failed to import data! Ensure the file is a valid JSON dashboard export.');
            event.target.value = '';
        }
    };
    render.readAsText(file);
}

/**
 * Сброс базы данных (Удаление localStorage ключа и перезагрузка)
 */

export function resetDatabase() {
    const isConfirmed = confirm('Are you sure you want to delete ALL data? This will clear all employees, projects, and vacations, and reload the application.');
    if (!isConfirmed) return;
    try {
        // Удаляем данные
        localStorage.removeItem('monthlyData')
        // Перезагрузка страницы автоматически пересоздаст Seed Data при запуске
        location.reload();
    } catch (error) {
        console.error('Reset failed:', error);
        alert('Failed to reset database.');
    }
}