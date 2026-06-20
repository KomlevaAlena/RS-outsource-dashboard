// filters.js

// Глобальный объект фильтров, экспортируем его, чтобы таблицы могли читать/писать в него
export let currentFilters = {
    projects: {
        companyName: '',
        projectName: ''
    },
    employees: {
        name: '',
        surname: '',
        position: ''
    },
    employeePosition: '' 
};

// Функция генерации чипсов
export function createFilterChipsHtml(tab) {
    const filters = currentFilters[tab];
    let chipsHtml = '';
    let activeCount = 0;
    
    for (const key in filters) {
        if (filters[key] && filters[key].trim() !== '') {
            activeCount++;
            const readableLabel = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            chipsHtml += `
                <div class="filter-chip">
                    <span>${readableLabel}: <strong>${filters[key]}</strong></span>
                    <button class="filter-chip__remove" data-filter-tab="${tab}" data-filter-key="${key}">×</button>
                </div>
            `;
        }
    }
    if (activeCount >= 2) {
        chipsHtml += `
            <div class="filter-chip filter-chip--clear-all" data-filter-clear-tab="${tab}">
                Clear Filters
            </div>
        `;
    }
    return `<div class="filter-chips-container">${chipsHtml}</div>`;
}
