(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function e(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=e(a);fetch(a.href,o)}})();const _="monthData",d={getRawData(){const t=localStorage.getItem(_);return t?JSON.parse(t):{}},saveData(t){const n=JSON.stringify(t);localStorage.setItem(_,n)},getMonthData(t){const n=this.getRawData();return n[t]?n[t]:{employees:[],projects:[]}}},L={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};function S(t,n){if(!confirm("Are you sure you want to delete this project?"))return;const s=d.getMonthData(n),a=s.projects.filter(function(l){return l.id!==t});s.projects=a;const o=d.getRawData();o[n]=s,d.saveData(o),console.log(`❌ Проект с ID ${t} успешно удален`),g("projects",n)}function C(t,n){if(!confirm("Are you sure you want to remove this employee?"))return;const s=d.getMonthData(n);s.employees=s.employees.filter(function(o){return o.id!==t});const a=d.getRawData();a[n]=s,d.saveData(a),console.log(`❌ Сотрудник с ID ${t} удален`),g("employees",n)}function A(t,n,e,s){const a=d.getMonthData(s),o=a.employees.find(l=>l.id===t);if(o){if(n==="salary"){const i=Number(e);if(isNaN(i)||i<=0){alert("Please enter the correct salary amount"),g("employees",s);return}o[n]=i}else{if(e.trim()===""){alert("The field cannot be empty"),g("employees",s);return}o[n]=e.trim()}const l=d.getRawData();l[s]=a,d.saveData(l),console.log(`📝 Сотрудник ${t}: поле ${n} обновлено на ${e}`)}}function N(t){if(t.length===0)return'<p class="empty-state">There are no projects yet</p>';let n=` 
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
        `}),n+="</tbody></table>",n}function P(t){if(t.length===0)return'<p class="empty-state">No employees added yet</p>';let n=`
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
        `}),n+="</tbody></table>",n}function $(t){const n=t.length;let e=0,s=0;return t.forEach(function(o){e+=o.budget,s+=o.capacity||0}),` 
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
        `}function w(t,n){const e=document.getElementById("assign-modal"),s=document.getElementById("assign-project-id"),a=document.getElementById("assign-emp-select");if(console.log("Поиск элементов модалки:",{modal:e,projectInput:s,empSelect:a}),!e||!a){console.error("❌ Ошибка: Элементы модального окна не найдены в HTML!");return}s&&(s.value=t);const o=d.getMonthData(n),l=o&&o.employees?o.employees:[];if(console.log("Список сотрудников для модалки:",l),l.length===0)a.innerHTML='<option value="">-- No employees available --</option>';else{let m='<option value="">-- Select an employee --</option>';l.forEach(function(c){const p=c.name||"Unknown Name",u=c.position||"No Position";m+=`<option value="${c.id}">${p} (${u})</option>`}),a.innerHTML=m}const i=document.getElementById("assign-capacity-range"),r=document.getElementById("assign-range-value");i&&(i.value=50),r&&(r.textContent="50"),e.classList.add("modal--open"),console.log("🚀 Класс modal--open успешно добавлен!")}function g(t,n){const e=document.getElementById("table-container");if(!e)return;const s=d.getMonthData(n);if(t==="projects"){const a=$(s.projects),o=N(s.projects);e.innerHTML=a+o,e.onclick=function(l){if(console.log("Кликнули по элементу:",l.target),l.target.classList.contains("btn-delete")){const i=l.target.getAttribute("data-id");S(i,n)}if(l.target.classList.contains("btn-assign")){console.log("Ура, поймали клик по кнопке Assign!");const i=l.target.getAttribute("data-id");w(i,n)}}}else t==="employees"&&(e.innerHTML=P(s.employees),e.onclick=function(a){if(a.target.classList.contains("btn-delete--emp")){const o=a.target.getAttribute("data-id");C(o,n)}},e.ondblclick=function(a){const o=a.target;if(o.classList.contains("editable")&&!o.querySelector("input")){let p=function(){const u=c.value;A(r,m,u,n),g("employees",n)};var l=p;const i=o.textContent.replace(" $","").trim(),r=o.getAttribute("data-id"),m=o.getAttribute("data-field"),c=document.createElement("input");c.type=m==="salary"?"number":"text",c.value=i,c.className="table-inline-input",o.innerHTML="",o.appendChild(c),c.focus(),c.onkeydown=function(u){u.key==="Enter"&&p()},c.onblur=function(){p()}}})}function v(){const t=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+t.value}function T(t){const n=document.querySelectorAll(".nav-button"),e=document.getElementById("page-title"),s=document.getElementById("add-entity-btn");n.forEach(function(i){i.classList.remove("nav-button--active")});const a=t.currentTarget;a.classList.add("nav-button--active");const o=a.getAttribute("data-tab");o==="projects"?(e.textContent="Projects",s.textContent="+ Add projects"):o==="employees"&&(e.textContent="Employees",s.textContent="+ Add employee"),console.log("Переключено на вкладку:",o);const l=v();g(o,l)}function E(){const n=document.querySelector(".nav-button--active").getAttribute("data-tab"),e=v();g(n,e),console.log("Период изменен на:",e)}function I(){const t=document.getElementById("project-panel");t&&t.classList.add("slide-panel--open")}function B(){const t=document.getElementById("project-panel");t&&t.classList.remove("slide-panel--open")}function M(){const t=document.getElementById("employee-panel");t&&t.classList.add("slide-panel--open")}function j(){const t=document.getElementById("employee-panel");t&&t.classList.remove("slide-panel--open")}function q(){const t=document.getElementById("sidebar"),n=document.getElementById("sidebar-toggle"),e=document.querySelectorAll(".nav-button"),s=document.getElementById("month-select"),a=document.getElementById("year-select"),o=document.getElementById("add-entity-btn"),l=document.getElementById("project-panel-close"),i=document.getElementById("project-panel-overlay"),r=document.getElementById("employee-panel-close"),m=document.getElementById("employee-panel-overlay");t&&n&&n.addEventListener("click",function(){t.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),e.forEach(function(c){c.addEventListener("click",T)}),s&&a&&(s.addEventListener("change",E),a.addEventListener("change",E)),o&&o.addEventListener("click",I),l&&l.addEventListener("click",B),i&&i.addEventListener("click",B),o&&o.addEventListener("click",function(){const c=document.querySelector(".nav-button--active").getAttribute("data-tab");c==="projects"?I():c==="employees"&&M()}),r&&r.addEventListener("click",j),m&&m.addEventListener("click",j),g("projects",v())}function y(){const t=document.getElementById("proj-name"),n=document.getElementById("proj-company"),e=document.getElementById("proj-budget"),s=document.getElementById("proj-capacity"),a=document.getElementById("proj-submit"),o=t.value.trim().length>0,l=n.value.trim().length>0,i=Number(e.value)>0,r=Number(s.value)>0;o&&l&&i&&r?a.disabled=!1:a.disabled=!0}function x(t){t.preventDefault();const n=document.getElementById("proj-name"),e=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity"),o=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+o.value,m={id:"proj_"+Date.now(),projectName:n.value.trim(),companyName:e.value.trim(),budget:Number(s.value),capacity:Number(a.value)},c=d.getMonthData(i);c.projects.push(m);const p=d.getRawData();p[i]=c,d.saveData(p),console.log("✅ Новый проект успешно сохранен в Store:",m),g("projects",i),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const u=document.getElementById("project-panel");u&&u.classList.remove("slide-panel--open")}function O(){const t=document.getElementById("project-form");if(t){const n=document.getElementById("proj-name"),e=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity");n.addEventListener("input",y),e.addEventListener("input",y),s.addEventListener("input",y),a.addEventListener("input",y),t.addEventListener("submit",x)}}function f(){const t=document.getElementById("emp-name"),n=document.getElementById("emp-position"),e=document.getElementById("emp-age"),s=document.getElementById("emp-salary"),a=document.getElementById("emp-submit"),o=document.getElementById("error-emp-age"),l=t.value.trim().length>0,i=n.value.trim().length>0,r=Number(s.value)>0,m=Number(e.value);let c=!1;e.value.trim()===""?o.textContent="":m<18?o.textContent="The employee must be over 18 years of age":(o.textContent="",c=!0),l&&i&&c&&r?a.disabled=!1:a.disabled=!0}function k(t){t.preventDefault();const n=document.getElementById("emp-name"),e=document.getElementById("emp-position"),s=document.getElementById("emp-age"),a=document.getElementById("emp-salary"),o=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+o.value,r={id:"emp_"+Date.now(),name:n.value.trim(),position:e.value.trim(),age:Number(s.value),salary:Number(a.value)},m=d.getMonthData(i);m.employees.push(r);const c=d.getRawData();c[i]=m,d.saveData(c),console.log("✅ Новый сотрудник добавлен:",r),g("employees",i),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const p=document.getElementById("employee-panel");p&&p.classList.remove("slide-panel--open")}function H(){const t=document.getElementById("employee-form");if(t){const n=document.getElementById("emp-name"),e=document.getElementById("emp-position"),s=document.getElementById("emp-age"),a=document.getElementById("emp-salary");n.addEventListener("input",f),e.addEventListener("input",f),s.addEventListener("input",f),a.addEventListener("input",f),t.addEventListener("submit",k)}}function D(){const t=document.getElementById("assign-modal");t&&t.classList.remove("modal--open")}function R(){const t=document.getElementById("assign-modal"),n=document.getElementById("assign-capacity-range"),e=document.getElementById("assign-range-value"),s=document.getElementById("assign-form");t&&(t.onclick=function(a){(a.target.id==="assign-modal-overlay"||a.target.id==="assign-modal-close")&&(console.log("🔒 Закрываем модальное окно..."),D())},n&&e&&(n.oninput=function(){e.textContent=n.value}),s&&(s.onsubmit=function(a){a.preventDefault();const o=document.getElementById("assign-project-id").value,l=document.getElementById("assign-emp-select").value,i=Number(n.value),r=document.getElementById("month-select"),c=document.getElementById("year-select").value+"-"+r.value;if(!l){alert("Please select an employee first!");return}const p=d.getMonthData(c);p.assignments||(p.assignments=[]);const u={projectId:o,employeeId:l,capacity:i};p.assignments.push(u);const h=d.getRawData();h[c]=p,d.saveData(h),console.log("🔗 Успешное назначение в Стор:",u),alert("Employee successfully assigned to the project!"),D()}))}const b={"dashboard-app":`
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
      `)}setupObserver(){new MutationObserver(e=>{let s=!1;e.forEach(a=>{a.addedNodes.length&&a.addedNodes.forEach(o=>{o.nodeType===1&&o.querySelectorAll&&o.querySelectorAll("[data-component]").length>0&&(s=!0)})}),s&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new V().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const F=d.getRawData();Object.keys(F).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),d.saveData(L)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(b));console.log("📅 Данные за май 2026:",d.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),q(),O(),H(),R()},0)});
