// Здесь храним HTML всех компонентов
export const components = {
  'dashboard-app': `
  <div class="dashboard-layout">
    <aside class="sidebar" id="sidebar">
      <div class="sidebar__header">
        <button class="sidebar__toggle" id="sidebar-toggle">☰</button>
        <h2 class="sidebar__title">Project Manager</h2>
      </div>
      <nav class="sidebar__nav">
        <div class="period-selector">
            <select id="month-select" class="select">
              <option value="0">Январь</option>
              <option value="1">Февраль</option>
              <option value="2">Март</option>
              <option value="3">Апрель</option>
              <option value="4">Май</option>
              </select>
            <select id="year-select" class="select">
              <option value="2025">2025</option>
              <option value="2026" selected>2026</option>
              <option value="2027">2027</option>
            </select>
        </div>
        <ul class="nav-list">
          <li class="nav-list__item">
            <button class="nav-button nav-button--active" data-tab="projects">Проекты</button>
          </li>
          <li class="nav-list__item">
            <button class="nav-button" data-tab="employees">Сотрудники</button>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="main-content">
      <header class="main-header">
        <h1 id="page-title">Проекты</h1>
        <button class="btn btn--primary" id="add-entity-btn">+ Добавить проект</button>
      </header>

      <div id="table-container" class="table-container">
        </div>
    </main>
  </div>
`,
};
