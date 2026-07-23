/**
 * src/scripts/utils/position-popup.js
 * Функция для умного позиционирования выпадающих окон (popups/tooltips)
 * 
 * @param {HTMLElement} popup - Элемент поп-апа, который нужно позиционировать
 * @param {HTMLElement} target - Элемент (кнопка/ячейка), относительно которого открывается поп-ап
 */

export function autoPositionPopup(popup, target) {
    // Проверка безопасности: если поп-ап не передан, ничего не делаем
    if (!popup) return;
    // Вариант 1: Если передан элемент-триггер (target)
    if (target) {
        // 1. Показываем поп-ап, чтобы браузер мог рассчитать его реальные размеры
    popup.style.display = 'block';
    popup.style.visibility = 'hidden'; // Временно скрываем, пока считаем координаты
    // 2. Получаем координаты элемента-триггера и самого поп-апа
    const targetRect = target.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    // Дефолтные позиции (открываем снизу и слева от элемента)
    let top = targetRect.bottom + window.scrollY;
    let left = targetRect.left + window.scrollX;
    // 3. Проверка ВЫЛЕТА ЗА НИЖНИЙ КРАЙ
    // Если высота поп-апа + позиция превышает высоту экрана, открываем ЕГО НАВЕРХ
    if (targetRect.bottom + popupRect.height > windowHeight) {
        top = targetRect.top + window.scrollY - popupRect.height;
        popup.classList.add('popup--top');
    } else {
        popup.classList.remove('popup--top');
    }
    // 4. Проверка ВЫЛЕТА ЗА ПРАВЫЙ КРАЙ
    // Если ширина поп-апа выходит за правый край экрана, сдвигаем ЕГО ВЛЕВО
    if (targetRect.left + popupRect.width > windowWidth) {
        left = windowWidth - popupRect.width - 10; // 10px отступ от края экрана
        popup.classList.add('popup--left');
    } else {
        popup.classList.remove('popup--left');
    }
    // 5. Применяем рассчитанные стили и делаем поп-ап видимым
    popup.style.top = `${top}px`;
    popup.style.left = `${left}px`;
    popup.style.visibility = 'visible';
    return;
    }
    // Вариант 2: Если передан ТОЛЬКО popup (для вызова в render.js)
    const rect = popup.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    // Если поп-ап выходит за правый край экрана — сдвигаем его влево
    if (rect.right > windowWidth) {
        const offset = rect.right - windowWidth + 15; // 15px отступ от края
        popup.style.left = `calc(50% - ${offset}px)`;
    }
    // Если поп-ап выходит за нижний край экрана — поднимаем наверх
    if (rect.bottom > windowHeight) {
        popup.style.top = 'auto';
        popup.style.bottom = '100%';
    }
}
// Экспортируем алиас для обратной совместимости
export const adjustPopupPosition = autoPositionPopup;
