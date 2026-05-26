(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function e(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=e(n);fetch(n.href,a)}})();const u="monthData",c={getRawData(){const t=localStorage.getItem(u);return t?JSON.parse(t):{}},saveData(t){const o=JSON.stringify(t);localStorage.setItem(u,o)},getMonthData(t){const o=this.getRawData();return o[t]?o[t]:{employees:[],projects:[]}}},v={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};function f(t){if(t.length===0)return'<p class="empty-state">There are no projects yet</p>';let o=` 
    <table class="table">
        <thead>
            <tr>
                <th>Company</th>
                <th>Project</th>
                <th>Budget</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;return t.forEach(function(e){o+=`
            <tr>
                <td>${e.companyName}</td>
                <td>${e.projectName}</td>
                <td>${e.budget} $</td>
                <td><button class="btn-delete" data-id="${e.id}">Delete</button></td>
            </tr>
        `}),o+="</tbody></table>",o}function d(t,o){const e=document.getElementById("table-container");if(!e)return;const s=c.getMonthData(o);t==="projects"?e.innerHTML=f(s.projects):t==="employees"&&(e.innerHTML="<p>There will be a table of employees here soon....</p>")}function p(){const t=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+t.value}function y(t){const o=document.querySelectorAll(".nav-button"),e=document.getElementById("page-title"),s=document.getElementById("add-entity-btn");o.forEach(function(r){r.classList.remove("nav-button--active")});const n=t.currentTarget;n.classList.add("nav-button--active");const a=n.getAttribute("data-tab");a==="projects"?(e.textContent="Projects",s.textContent="+ Add projects"):a==="employees"&&(e.textContent="Employees",s.textContent="+ Add employee"),console.log("Переключено на вкладку:",a);const l=p();d(a,l)}function m(){const o=document.querySelector(".nav-button--active").getAttribute("data-tab"),e=p();d(o,e),console.log("Период изменен на:",e)}function h(){const t=document.getElementById("project-panel");t&&t.classList.add("slide-panel--open")}function b(){const t=document.getElementById("project-panel");t&&t.classList.remove("slide-panel--open")}function _(){const t=document.getElementById("sidebar"),o=document.getElementById("sidebar-toggle"),e=document.querySelectorAll(".nav-button"),s=document.getElementById("month-select"),n=document.getElementById("year-select"),a=document.getElementById("add-entity-btn"),l=document.getElementById("project-panel-close"),r=document.getElementById("project-panel-overlay");t&&o&&o.addEventListener("click",function(){t.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),e.forEach(function(g){g.addEventListener("click",y)}),s&&n&&(s.addEventListener("change",m),n.addEventListener("change",m)),a&&a.addEventListener("click",h),l&&l.addEventListener("click",b),r&&r.addEventListener("click",b),d("projects",p())}const i={"dashboard-app":`
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
              <option value="4" selected>Май</option>
              <option value="5">Июнь</option>
              <option value="6">Июль</option>
              <option value="7">Август</option>
              <option value="8">Сентябрь</option>
              <option value="9">Октябрь</option>
              <option value="10">Ноябрь</option>
              <option value="11">Декабрь</option>
            </select>
            <select id="year-select" class="select">
              <option value="2025">2025</option>
              <option value="2026" selected>2026</option>
              <option value="2027">2027</option>
            </select>
        </div>
        <ul class="nav-list">
          <li class="nav-list__item">
            <button class="nav-button nav-button--active" data-tab="projects">Projects</button>
          </li>
          <li class="nav-list__item">
            <button class="nav-button" data-tab="employees">Employees</button>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="main-content">
      <header class="main-header">
        <h1 id="page-title">Projects</h1>
        <button class="btn btn--primary" id="add-entity-btn">+ Add project</button>
      </header>

      <div id="table-container" class="table-container">
      </div>
    </main>
    <div class="slide-panel" id="project-panel">
        <div class="slide-panel__overlay" id="project-panel-overlay"></div>
        
        <div class="slide-panel__content">
            <div class="slide-panel__header">
                <h2>New Project</h2>
                <button class="slide-panel__close" id="project-panel-close">×</button>
            </div>

            <form class="form" id="project-form" novalidate>
                <div class="form__group">
                    <label class="form__label">Project Name</label>
                    <input type="text" id="proj-name" class="form__input" required>
                    <span class="form__error" id="error-proj-name"></span>
                </div>
                <div class="form__group">
                    <label class="form__label">Company Name</label>
                    <input type="text" id="proj-company" class="form__input" required>
                    <span class="form__error" id="error-proj-company"></span>
                </div>
                <div class="form__group">
                    <label class="form__label">Budget</label>
                    <input type="number" id="proj-budget" class="form__input" required>
                    <span class="form__error" id="error-proj-budget"></span>
                </div>
                <div class="form__group">
                    <label class="form__label">Employee Capacity</label>
                    <input type="number" id="proj-capacity" class="form__input" required>
                    <span class="form__error" id="error-proj-capacity"></span>
                </div>
                <button type="submit" class="btn btn--primary form__submit" id="proj-submit" disabled>Save Project</button>
            </form>
        </div>
    </div>
  </div>
`};class j{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const o=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${o.length}`),o.forEach(e=>{const s=e.getAttribute("data-component");this.loadComponent(e,s)})}loadComponent(o,e){console.log(`📥 Загружаю компонент: ${e}`),i[e]?(o.innerHTML=i[e],o.setAttribute("data-loaded","true"),this.loadedComponents.add(e),console.log(`✅ ${e} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${e}" не найден в components.js`),o.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${e}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(e=>{let s=!1;e.forEach(n=>{n.addedNodes.length&&n.addedNodes.forEach(a=>{a.nodeType===1&&a.querySelectorAll&&a.querySelectorAll("[data-component]").length>0&&(s=!0)})}),s&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new j().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const E=c.getRawData();Object.keys(E).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),c.saveData(v)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(i));console.log("📅 Данные за май 2026:",c.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),_()},0)});
