// Главный файл - импортируем все стили и скрипты
console.log('🎯 Starting Todo App...');

// Импортируем стили
import './styles/main.scss';
console.log('✅ SCSS styles imported');

// Импортируем нашу память (Store) и начальные данные (Seed)
import { store } from './scripts/app/store.js';
import { initialData } from './scripts/app/seed-data.js';
import { initUI } from './scripts/app/ui.js';
// ПРОВЕРКА: Если в памяти совсем пусто, запишем туда наши начальные данные
const currentData = store.getRawData();
if (Object.keys(currentData).length === 0) {
  console.log('📦 Память пуста, записываю начальные данные...');
  store.saveData(initialData);
} else {
  console.log('📦 Данные уже есть в памяти, загружаю...');
}

// Импортируем загрузчик компонентов
import './scripts/simple-components-loader.js';
console.log('✅ Components loader imported');

console.log('🚀 All modules loaded - waiting for components...');

// Импортируем компоненты для проверки
import { components } from './components/components.js';

console.log('📦 Доступные компоненты:', Object.keys(components));
console.log('📅 Данные за май 2026:', store.getMonthData('2026-4'));

// // Импортируем контроллер Todo
// import { todoController } from './scripts/todo/todoController.js';
// console.log('✅ Todo Controller импортирован');

// // Запускаем контроллер ОДИН раз
// todoController.init();
// console.log('🚀 Todo Controller started');

// Проверка что контроллер загрузился
document.addEventListener('DOMContentLoaded', function() {
  
  // Даем загрузчику компонентов мгновение, чтобы вставить HTML
  setTimeout(function() {
    console.log('Инициализирую обработчики событий интерфейса...');
    initUI();
  }, 0);
  
});
