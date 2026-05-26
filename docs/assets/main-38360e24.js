(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();const v="monthData",r={getRawData(){const e=localStorage.getItem(v);return e?JSON.parse(e):{}},saveData(e){const t=JSON.stringify(e);localStorage.setItem(v,t)},getMonthData(e){const t=this.getRawData();return t[e]?t[e]:{employees:[],projects:[]}}},I={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};function B(e,t){if(!confirm("Are you sure you want to delete this project?"))return;const s=r.getMonthData(t),n=s.projects.filter(function(l){return l.id!==e});s.projects=n;const a=r.getRawData();a[t]=s,r.saveData(a),console.log(`❌ Проект с ID ${e} успешно удален`),m("projects",t)}function L(e){if(e.length===0)return'<p class="empty-state">There are no projects yet</p>';let t=` 
    <table class="table">
        <thead>
            <tr>
                <th>Company</th>
                <th>Project</th>
                <th>Budget</th>
                <th>Capacity</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;return e.forEach(function(o){t+=`
            <tr>
                <td>${o.companyName}</td>
                <td>${o.projectName}</td>
                <td>${o.budget} $</td>
                <td>${o.capacity||0} p.</td>
                <td><button class="btn-delete" data-id="${o.id}">Delete</button></td>
            </tr>
        `}),t+="</tbody></table>",t}function m(e,t){const o=document.getElementById("table-container");if(!o)return;const s=r.getMonthData(t);e==="projects"?(o.innerHTML=L(s.projects),o.onclick=function(n){if(n.target.classList.contains("btn-delete")){const a=n.target.getAttribute("data-id");B(a,t)}}):e==="employees"&&(o.innerHTML="<p>There will be a table of employees here soon....</p>",o.onclick=null)}function y(){const e=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+e.value}function S(e){const t=document.querySelectorAll(".nav-button"),o=document.getElementById("page-title"),s=document.getElementById("add-entity-btn");t.forEach(function(c){c.classList.remove("nav-button--active")});const n=e.currentTarget;n.classList.add("nav-button--active");const a=n.getAttribute("data-tab");a==="projects"?(o.textContent="Projects",s.textContent="+ Add projects"):a==="employees"&&(o.textContent="Employees",s.textContent="+ Add employee"),console.log("Переключено на вкладку:",a);const l=y();m(a,l)}function _(){const t=document.querySelector(".nav-button--active").getAttribute("data-tab"),o=y();m(t,o),console.log("Период изменен на:",o)}function h(){const e=document.getElementById("project-panel");e&&e.classList.add("slide-panel--open")}function E(){const e=document.getElementById("project-panel");e&&e.classList.remove("slide-panel--open")}function C(){const e=document.getElementById("employee-panel");e&&e.classList.add("slide-panel--open")}function j(){const e=document.getElementById("employee-panel");e&&e.classList.remove("slide-panel--open")}function D(){const e=document.getElementById("sidebar"),t=document.getElementById("sidebar-toggle"),o=document.querySelectorAll(".nav-button"),s=document.getElementById("month-select"),n=document.getElementById("year-select"),a=document.getElementById("add-entity-btn"),l=document.getElementById("project-panel-close"),c=document.getElementById("project-panel-overlay"),d=document.getElementById("employee-panel-close"),p=document.getElementById("employee-panel-overlay");e&&t&&t.addEventListener("click",function(){e.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),o.forEach(function(i){i.addEventListener("click",S)}),s&&n&&(s.addEventListener("change",_),n.addEventListener("change",_)),a&&a.addEventListener("click",h),l&&l.addEventListener("click",E),c&&c.addEventListener("click",E),a&&a.addEventListener("click",function(){const i=document.querySelector(".nav-button--active").getAttribute("data-tab");i==="projects"?h():i==="employees"&&C()}),d&&d.addEventListener("click",j),p&&p.addEventListener("click",j),m("projects",y())}function u(){const e=document.getElementById("proj-name"),t=document.getElementById("proj-company"),o=document.getElementById("proj-budget"),s=document.getElementById("proj-capacity"),n=document.getElementById("proj-submit"),a=e.value.trim().length>0,l=t.value.trim().length>0,c=Number(o.value)>0,d=Number(s.value)>0;a&&l&&c&&d?n.disabled=!1:n.disabled=!0}function P(e){e.preventDefault();const t=document.getElementById("proj-name"),o=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),n=document.getElementById("proj-capacity"),a=document.getElementById("month-select"),c=document.getElementById("year-select").value+"-"+a.value,p={id:"proj_"+Date.now(),projectName:t.value.trim(),companyName:o.value.trim(),budget:Number(s.value),capacity:Number(n.value)},i=r.getMonthData(c);i.projects.push(p);const g=r.getRawData();g[c]=i,r.saveData(g),console.log("✅ Новый проект успешно сохранен в Store:",p),m("projects",c),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const f=document.getElementById("project-panel");f&&f.classList.remove("slide-panel--open")}function A(){const e=document.getElementById("project-form");if(e){const t=document.getElementById("proj-name"),o=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),n=document.getElementById("proj-capacity");t.addEventListener("input",u),o.addEventListener("input",u),s.addEventListener("input",u),n.addEventListener("input",u),e.addEventListener("submit",P)}}const b={"dashboard-app":`
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
    <div class="slide-panel" id="employee-panel">
        <div class="slide-panel__overlay" id="employee-panel-overlay"></div>
        <div class="slide-panel__content">
            <div class="slide-panel__header">
                <h2>New Employee</h2>
                <button class="slide-panel__close" id="employee-panel-close">×</button>
            </div>

            <form class="form" id="employee-form" novalidate>
                <div class="form__group">
                    <label class="form__label">Full Name</label>
                    <input type="text" id="emp-name" class="form__input" required>
                    <span class="form__error" id="error-emp-name"></span>
                </div>
                <div class="form__group">
                    <label class="form__label">Position</label>
                    <input type="text" id="emp-position" class="form__input" required>
                    <span class="form__error" id="error-emp-position"></span>
                </div>
                <div class="form__group">
                    <label class="form__label">Age</label>
                    <input type="number" id="emp-age" class="form__input" required>
                    <span class="form__error" id="error-emp-age"></span>
                </div>
                <div class="form__group">
                    <label class="form__label">Salary ($ / month)</label>
                    <input type="number" id="emp-salary" class="form__input" required>
                    <span class="form__error" id="error-emp-salary"></span>
                </div>
                <button type="submit" class="btn btn--primary form__submit" id="emp-submit" disabled>Save Employee</button>
            </form>
        </div>
    </div>
  </div>
`};class N{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const t=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${t.length}`),t.forEach(o=>{const s=o.getAttribute("data-component");this.loadComponent(o,s)})}loadComponent(t,o){console.log(`📥 Загружаю компонент: ${o}`),b[o]?(t.innerHTML=b[o],t.setAttribute("data-loaded","true"),this.loadedComponents.add(o),console.log(`✅ ${o} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${o}" не найден в components.js`),t.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${o}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(o=>{let s=!1;o.forEach(n=>{n.addedNodes.length&&n.addedNodes.forEach(a=>{a.nodeType===1&&a.querySelectorAll&&a.querySelectorAll("[data-component]").length>0&&(s=!0)})}),s&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new N().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const w=r.getRawData();Object.keys(w).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),r.saveData(I)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(b));console.log("📅 Данные за май 2026:",r.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),D(),A()},0)});
