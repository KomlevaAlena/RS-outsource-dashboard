/**
 * store.js
 * Этот файл отвечает за "память" нашего приложения.
 * Мы используем localStorage, чтобы данные не пропадали после перезагрузки страницы.
 */
const STORAGE_KEY = 'monthData'; // Ключ, под которым мы будем хранить все данные в браузере

export const store = {
    // 1. Метод для получения всех данных из памяти браузера
    getRawData() {
        const data = localStorage.getItem(STORAGE_KEY); // Достаем строку из localStorage по нашему ключу
        return data ? JSON.parse(data) : {};
    },
    //2. Метод для сохранения данных в память браузера
    // @param {Object} data - весь объект с данными, который нужно сохранить
    saveData(data) {
        const stringData = JSON.stringify(data);// Превращаем наш JS-объект в текстовую строку
        localStorage.setItem(STORAGE_KEY, stringData);// Записываем эту строку в localStorage
    },
    //3. Метод для получения данных конкретного месяца
    //@param {string} periodKey - строка вида "2026-0" (год-месяц)
    getMonthData(periodKey) {
        const allData = this.getRawData(); // Берем всё, что есть
        if (!allData[periodKey]) {
            return  { employees: [], projects: []}; //Если в данных еще нет этого месяца, возвращаем заготовку: пустые списки сотрудников и проектов
        }

        return allData[periodKey];// Если месяц найден, возвращаем его содержимое 
    }
};