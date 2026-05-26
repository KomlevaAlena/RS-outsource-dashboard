(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();const f="monthData",r={getRawData(){const e=localStorage.getItem(f);return e?JSON.parse(e):{}},saveData(e){const o=JSON.stringify(e);localStorage.setItem(f,o)},getMonthData(e){const o=this.getRawData();return o[e]?o[e]:{employees:[],projects:[]}}},E={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};function _(e){if(e.length===0)return'<p class="empty-state">There are no projects yet</p>';let o=` 
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
    `;return e.forEach(function(t){o+=`
            <tr>
                <td>${t.companyName}</td>
                <td>${t.projectName}</td>
                <td>${t.budget} $</td>
                <td><button class="btn-delete" data-id="${t.id}">Delete</button></td>
            </tr>
        `}),o+="</tbody></table>",o}function p(e,o){const t=document.getElementById("table-container");if(!t)return;const s=r.getMonthData(o);e==="projects"?t.innerHTML=_(s.projects):e==="employees"&&(t.innerHTML="<p>There will be a table of employees here soon....</p>")}function m(){const e=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+e.value}function I(e){const o=document.querySelectorAll(".nav-button"),t=document.getElementById("page-title"),s=document.getElementById("add-entity-btn");o.forEach(function(c){c.classList.remove("nav-button--active")});const n=e.currentTarget;n.classList.add("nav-button--active");const a=n.getAttribute("data-tab");a==="projects"?(t.textContent="Projects",s.textContent="+ Add projects"):a==="employees"&&(t.textContent="Employees",s.textContent="+ Add employee"),console.log("Переключено на вкладку:",a);const l=m();p(a,l)}function h(){const o=document.querySelector(".nav-button--active").getAttribute("data-tab"),t=m();p(o,t),console.log("Период изменен на:",t)}function B(){const e=document.getElementById("project-panel");e&&e.classList.add("slide-panel--open")}function j(){const e=document.getElementById("project-panel");e&&e.classList.remove("slide-panel--open")}function L(){const e=document.getElementById("sidebar"),o=document.getElementById("sidebar-toggle"),t=document.querySelectorAll(".nav-button"),s=document.getElementById("month-select"),n=document.getElementById("year-select"),a=document.getElementById("add-entity-btn"),l=document.getElementById("project-panel-close"),c=document.getElementById("project-panel-overlay");e&&o&&o.addEventListener("click",function(){e.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),t.forEach(function(i){i.addEventListener("click",I)}),s&&n&&(s.addEventListener("change",h),n.addEventListener("change",h)),a&&a.addEventListener("click",B),l&&l.addEventListener("click",j),c&&c.addEventListener("click",j),p("projects",m())}function d(){const e=document.getElementById("proj-name"),o=document.getElementById("proj-company"),t=document.getElementById("proj-budget"),s=document.getElementById("proj-capacity"),n=document.getElementById("proj-submit"),a=e.value.trim().length>0,l=o.value.trim().length>0,c=Number(t.value)>0,i=Number(s.value)>0;a&&l&&c&&i?n.disabled=!1:n.disabled=!0}function S(e){e.preventDefault();const o=document.getElementById("proj-name"),t=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),n=document.getElementById("proj-capacity"),a=document.getElementById("month-select"),c=document.getElementById("year-select").value+"-"+a.value,g={id:"proj_"+Date.now(),projectName:o.value.trim(),companyName:t.value.trim(),budget:Number(s.value),capacity:Number(n.value)},b=r.getMonthData(c);b.projects.push(g);const y=r.getRawData();y[c]=b,r.saveData(y),console.log("✅ Новый проект успешно сохранен в Store:",g),p("projects",c),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const v=document.getElementById("project-panel");v&&v.classList.remove("slide-panel--open")}function C(){const e=document.getElementById("project-form");if(e){const o=document.getElementById("proj-name"),t=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),n=document.getElementById("proj-capacity");o.addEventListener("input",d),t.addEventListener("input",d),s.addEventListener("input",d),n.addEventListener("input",d),e.addEventListener("submit",S)}}const u={"dashboard-app":`
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
`};class D{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const o=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${o.length}`),o.forEach(t=>{const s=t.getAttribute("data-component");this.loadComponent(t,s)})}loadComponent(o,t){console.log(`📥 Загружаю компонент: ${t}`),u[t]?(o.innerHTML=u[t],o.setAttribute("data-loaded","true"),this.loadedComponents.add(t),console.log(`✅ ${t} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${t}" не найден в components.js`),o.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${t}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(t=>{let s=!1;t.forEach(n=>{n.addedNodes.length&&n.addedNodes.forEach(a=>{a.nodeType===1&&a.querySelectorAll&&a.querySelectorAll("[data-component]").length>0&&(s=!0)})}),s&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new D().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const N=r.getRawData();Object.keys(N).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),r.saveData(E)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(u));console.log("📅 Данные за май 2026:",r.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),L(),C()},0)});
