(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function e(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=e(o);fetch(o.href,a)}})();const _="monthData",r={getRawData(){const t=localStorage.getItem(_);return t?JSON.parse(t):{}},saveData(t){const n=JSON.stringify(t);localStorage.setItem(_,n)},getMonthData(t){const n=this.getRawData();return n[t]?n[t]:{employees:[],projects:[]}}},L={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};function D(t,n){if(!confirm("Are you sure you want to delete this project?"))return;const s=r.getMonthData(n),o=s.projects.filter(function(l){return l.id!==t});s.projects=o;const a=r.getRawData();a[n]=s,r.saveData(a),console.log(`❌ Проект с ID ${t} успешно удален`),u("projects",n)}function S(t,n){if(!confirm("Are you sure you want to remove this employee?"))return;const s=r.getMonthData(n);s.employees=s.employees.filter(function(a){return a.id!==t});const o=r.getRawData();o[n]=s,r.saveData(o),console.log(`❌ Сотрудник с ID ${t} удален`),u("employees",n)}function C(t,n,e,s){const o=r.getMonthData(s),a=o.employees.find(l=>l.id===t);if(a){if(n==="salary"){const i=Number(e);if(isNaN(i)||i<=0){alert("Please enter the correct salary amount"),u("employees",s);return}a[n]=i}else{if(e.trim()===""){alert("The field cannot be empty"),u("employees",s);return}a[n]=e.trim()}const l=r.getRawData();l[s]=o,r.saveData(l),console.log(`📝 Сотрудник ${t}: поле ${n} обновлено на ${e}`)}}function A(t){if(t.length===0)return'<p class="empty-state">There are no projects yet</p>';let n=` 
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
    `;return t.forEach(function(e){n+=`
            <tr>
                <td>${e.companyName}</td>
                <td>${e.projectName}</td>
                <td>${e.budget} $</td>
                <td>${e.capacity||0} p.</td>
                <td>
                    <button class="btn-assign" data-id="${e.id}">Assign</button>
                    <button class="btn-delete" data-id="${e.id}">Delete</button>
                </td>
            </tr>
        `}),n+="</tbody></table>",n}function N(t){if(t.length===0)return'<p class="empty-state">No employees added yet</p>';let n=`
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Age</th>
                <th>Salary</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;return t.forEach(function(e){n+=`
            <tr>
                <td>${e.name}</td>
                <td class="editable" data-id="${e.id}" data-field="position">${e.position}</td>
                <td>${e.age} y.o.</td>
                <td class="editable" data-id="${e.id}" data-field="salary">${e.salary} $</td>
                <td><button class="btn-delete btn-delete--emp" data-id="${e.id}">Delete</button></td>
            </tr>
        `}),n+="</tbody></table>",n}function P(t){const n=t.length;let e=0,s=0;return t.forEach(function(a){e+=a.budget,s+=a.capacity||0}),` 
        <div class="fin-summary">
            <div class="fin-card">
                <span class="fin-card__title">Active Projects</span>
                <span class="fin-card__value">${n}</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Budget</span>
                <span class="fin-card__value">${e.toLocaleString()} $</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Capacity</span>
                <span class="fin-card__value">${s} p.</span>
            </div>
        </div>
        `}function $(t,n){const e=document.getElementById("assign-modal"),s=document.getElementById("assign-project-id"),o=document.getElementById("assign-emp-select");if(console.log("Поиск элементов модалки:",{modal:e,projectInput:s,empSelect:o}),!e||!o){console.error("❌ Ошибка: Элементы модального окна не найдены в HTML!");return}s&&(s.value=t);const a=r.getMonthData(n),l=a&&a.employees?a.employees:[];if(console.log("Список сотрудников для модалки:",l),l.length===0)o.innerHTML='<option value="">-- No employees available --</option>';else{let d='<option value="">-- Select an employee --</option>';l.forEach(function(c){const p=c.name||"Unknown Name",g=c.position||"No Position";d+=`<option value="${c.id}">${p} (${g})</option>`}),o.innerHTML=d}const i=document.getElementById("assign-capacity-range"),m=document.getElementById("assign-range-value");i&&(i.value=50),m&&(m.textContent="50"),e.classList.add("modal--open"),console.log("🚀 Класс modal--open успешно добавлен!")}function u(t,n){const e=document.getElementById("table-container");if(!e)return;const s=r.getMonthData(n);if(t==="projects"){const o=P(s.projects),a=A(s.projects);e.innerHTML=o+a,e.onclick=function(l){if(console.log("Кликнули по элементу:",l.target),l.target.classList.contains("btn-delete")){const i=l.target.getAttribute("data-id");D(i,n)}if(l.target.classList.contains("btn-assign")){console.log("Ура, поймали клик по кнопке Assign!");const i=l.target.getAttribute("data-id");$(i,n)}}}else t==="employees"&&(e.innerHTML=N(s.employees),e.onclick=function(o){if(o.target.classList.contains("btn-delete--emp")){const a=o.target.getAttribute("data-id");S(a,n)}},e.ondblclick=function(o){const a=o.target;if(a.classList.contains("editable")&&!a.querySelector("input")){let p=function(){const g=c.value;C(m,d,g,n),u("employees",n)};var l=p;const i=a.textContent.replace(" $","").trim(),m=a.getAttribute("data-id"),d=a.getAttribute("data-field"),c=document.createElement("input");c.type=d==="salary"?"number":"text",c.value=i,c.className="table-inline-input",a.innerHTML="",a.appendChild(c),c.focus(),c.onkeydown=function(g){g.key==="Enter"&&p()},c.onblur=function(){p()}}})}function v(){const t=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+t.value}function T(t){const n=document.querySelectorAll(".nav-button"),e=document.getElementById("page-title"),s=document.getElementById("add-entity-btn");n.forEach(function(i){i.classList.remove("nav-button--active")});const o=t.currentTarget;o.classList.add("nav-button--active");const a=o.getAttribute("data-tab");a==="projects"?(e.textContent="Projects",s.textContent="+ Add projects"):a==="employees"&&(e.textContent="Employees",s.textContent="+ Add employee"),console.log("Переключено на вкладку:",a);const l=v();u(a,l)}function h(){const n=document.querySelector(".nav-button--active").getAttribute("data-tab"),e=v();u(n,e),console.log("Период изменен на:",e)}function E(){const t=document.getElementById("project-panel");t&&t.classList.add("slide-panel--open")}function I(){const t=document.getElementById("project-panel");t&&t.classList.remove("slide-panel--open")}function w(){const t=document.getElementById("employee-panel");t&&t.classList.add("slide-panel--open")}function B(){const t=document.getElementById("employee-panel");t&&t.classList.remove("slide-panel--open")}function M(){const t=document.getElementById("sidebar"),n=document.getElementById("sidebar-toggle"),e=document.querySelectorAll(".nav-button"),s=document.getElementById("month-select"),o=document.getElementById("year-select"),a=document.getElementById("add-entity-btn"),l=document.getElementById("project-panel-close"),i=document.getElementById("project-panel-overlay"),m=document.getElementById("employee-panel-close"),d=document.getElementById("employee-panel-overlay");t&&n&&n.addEventListener("click",function(){t.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),e.forEach(function(c){c.addEventListener("click",T)}),s&&o&&(s.addEventListener("change",h),o.addEventListener("change",h)),a&&a.addEventListener("click",E),l&&l.addEventListener("click",I),i&&i.addEventListener("click",I),a&&a.addEventListener("click",function(){const c=document.querySelector(".nav-button--active").getAttribute("data-tab");c==="projects"?E():c==="employees"&&w()}),m&&m.addEventListener("click",B),d&&d.addEventListener("click",B),u("projects",v())}function y(){const t=document.getElementById("proj-name"),n=document.getElementById("proj-company"),e=document.getElementById("proj-budget"),s=document.getElementById("proj-capacity"),o=document.getElementById("proj-submit"),a=t.value.trim().length>0,l=n.value.trim().length>0,i=Number(e.value)>0,m=Number(s.value)>0;a&&l&&i&&m?o.disabled=!1:o.disabled=!0}function q(t){t.preventDefault();const n=document.getElementById("proj-name"),e=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),o=document.getElementById("proj-capacity"),a=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+a.value,d={id:"proj_"+Date.now(),projectName:n.value.trim(),companyName:e.value.trim(),budget:Number(s.value),capacity:Number(o.value)},c=r.getMonthData(i);c.projects.push(d);const p=r.getRawData();p[i]=c,r.saveData(p),console.log("✅ Новый проект успешно сохранен в Store:",d),u("projects",i),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const g=document.getElementById("project-panel");g&&g.classList.remove("slide-panel--open")}function x(){const t=document.getElementById("project-form");if(t){const n=document.getElementById("proj-name"),e=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),o=document.getElementById("proj-capacity");n.addEventListener("input",y),e.addEventListener("input",y),s.addEventListener("input",y),o.addEventListener("input",y),t.addEventListener("submit",q)}}function f(){const t=document.getElementById("emp-name"),n=document.getElementById("emp-position"),e=document.getElementById("emp-age"),s=document.getElementById("emp-salary"),o=document.getElementById("emp-submit"),a=document.getElementById("error-emp-age"),l=t.value.trim().length>0,i=n.value.trim().length>0,m=Number(s.value)>0,d=Number(e.value);let c=!1;e.value.trim()===""?a.textContent="":d<18?a.textContent="The employee must be over 18 years of age":(a.textContent="",c=!0),l&&i&&c&&m?o.disabled=!1:o.disabled=!0}function O(t){t.preventDefault();const n=document.getElementById("emp-name"),e=document.getElementById("emp-position"),s=document.getElementById("emp-age"),o=document.getElementById("emp-salary"),a=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+a.value,m={id:"emp_"+Date.now(),name:n.value.trim(),position:e.value.trim(),age:Number(s.value),salary:Number(o.value)},d=r.getMonthData(i);d.employees.push(m);const c=r.getRawData();c[i]=d,r.saveData(c),console.log("✅ Новый сотрудник добавлен:",m),u("employees",i),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const p=document.getElementById("employee-panel");p&&p.classList.remove("slide-panel--open")}function k(){const t=document.getElementById("employee-form");if(t){const n=document.getElementById("emp-name"),e=document.getElementById("emp-position"),s=document.getElementById("emp-age"),o=document.getElementById("emp-salary");n.addEventListener("input",f),e.addEventListener("input",f),s.addEventListener("input",f),o.addEventListener("input",f),t.addEventListener("submit",O)}}function j(){const t=document.getElementById("assign-modal");t&&t.classList.remove("modal--open")}function H(){const t=document.getElementById("assign-modal"),n=document.getElementById("assign-capacity-range"),e=document.getElementById("assign-range-value"),s=document.getElementById("assign-form");t&&(t.onclick=function(o){(o.target.id==="assign-modal-overlay"||o.target.id==="assign-modal-close")&&(console.log("🔒 Закрываем модальное окно..."),j())},n&&e&&(n.oninput=function(){e.textContent=n.value}),s&&(s.onsubmit=function(o){o.preventDefault(),alert("Great! Logic for saving will be here soon."),j()}))}const b={"dashboard-app":`
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
  <div class="modal" id="assign-modal">
      <div class="modal__overlay" id="assign-modal-overlay"></div>
      <div class="modal__content">
          <div class="modal__header">
              <h2>Assign Employee to Project</h2>
              <button class="modal__close" id="assign-modal-close">×</button>
          </div>
          
          <form id="assign-form" class="form">
              <input type="hidden" id="assign-project-id">

              <div class="form__group">
                  <label class="form__label">Select Employee</label>
                  <select id="assign-emp-select" class="form__input" required>
                      </select>
              </div>

              <div class="form__group">
                  <label class="form__label">Utilization / Capacity (<span id="assign-range-value">50</span>%)</label>
                  <input type="range" id="assign-capacity-range" min="10" max="100" step="10" value="50" class="form__range">
              </div>

              <button type="submit" class="btn btn--primary form__submit">Confirm Assignment</button>
          </form>
      </div>
  </div>
`};class V{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const n=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${n.length}`),n.forEach(e=>{const s=e.getAttribute("data-component");this.loadComponent(e,s)})}loadComponent(n,e){console.log(`📥 Загружаю компонент: ${e}`),b[e]?(n.innerHTML=b[e],n.setAttribute("data-loaded","true"),this.loadedComponents.add(e),console.log(`✅ ${e} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${e}" не найден в components.js`),n.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${e}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(e=>{let s=!1;e.forEach(o=>{o.addedNodes.length&&o.addedNodes.forEach(a=>{a.nodeType===1&&a.querySelectorAll&&a.querySelectorAll("[data-component]").length>0&&(s=!0)})}),s&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new V().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const F=r.getRawData();Object.keys(F).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),r.saveData(L)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(b));console.log("📅 Данные за май 2026:",r.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),M(),x(),k(),H()},0)});
