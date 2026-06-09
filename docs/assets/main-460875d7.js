(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=t(a);fetch(a.href,o)}})();const E="monthData",m={getRawData(){const e=localStorage.getItem(E);return e?JSON.parse(e):{}},saveData(e){const n=JSON.stringify(e);localStorage.setItem(E,n)},getMonthData(e){const n=this.getRawData();return n[e]?n[e]:{employees:[],projects:[]}}},S={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};function A(e,n){if(!confirm("Are you sure you want to delete this project?"))return;const s=m.getMonthData(n),a=s.projects.filter(function(l){return l.id!==e});s.projects=a;const o=m.getRawData();o[n]=s,m.saveData(o),console.log(`❌ Проект с ID ${e} успешно удален`),g("projects",n)}function C(e,n){if(!confirm("Are you sure you want to remove this employee?"))return;const s=m.getMonthData(n);s.employees=s.employees.filter(function(o){return o.id!==e});const a=m.getRawData();a[n]=s,m.saveData(a),console.log(`❌ Сотрудник с ID ${e} удален`),g("employees",n)}function N(e,n,t,s){const a=m.getMonthData(s),o=a.employees.find(l=>l.id===e);if(o){if(n==="salary"){const i=Number(t);if(isNaN(i)||i<=0){alert("Please enter the correct salary amount"),g("employees",s);return}o[n]=i}else{if(t.trim()===""){alert("The field cannot be empty"),g("employees",s);return}o[n]=t.trim()}const l=m.getRawData();l[s]=a,m.saveData(l),console.log(`📝 Сотрудник ${e}: поле ${n} обновлено на ${t}`)}}function P(e){if(e.length===0)return'<p class="empty-state">There are no projects yet</p>';let n=` 
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
    `;return e.forEach(function(t){n+=`
            <tr>
                <td>${t.companyName}</td>
                <td>${t.projectName}</td>
                <td>${t.budget} $</td>
                <td class="clickable-capacity" data-id="${t.id}">
                    <span class="capacity-link">${t.capacity||0} p.</span>
                </td>
                <td>
                    <button class="btn-assign" data-id="${t.id}">Assign</button>
                    <button class="btn-delete" data-id="${t.id}">Delete</button>
                </td>
            </tr>
        `}),n+="</tbody></table>",n}function $(e){if(e.length===0)return'<p class="empty-state">No employees added yet</p>';let n=`
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
    `;return e.forEach(function(t){n+=`
            <tr>
                <td>${t.name}</td>
                <td class="editable" data-id="${t.id}" data-field="position">${t.position}</td>
                <td>${t.age} y.o.</td>
                <td class="editable" data-id="${t.id}" data-field="salary">${t.salary} $</td>
                <td><button class="btn-delete btn-delete--emp" data-id="${t.id}">Delete</button></td>
            </tr>
        `}),n+="</tbody></table>",n}function T(e){const n=e.length;let t=0,s=0;return e.forEach(function(o){t+=o.budget,s+=o.capacity||0}),` 
        <div class="fin-summary">
            <div class="fin-card">
                <span class="fin-card__title">Active Projects</span>
                <span class="fin-card__value">${n}</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Budget</span>
                <span class="fin-card__value">${t.toLocaleString()} $</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Capacity</span>
                <span class="fin-card__value">${s} p.</span>
            </div>
        </div>
        `}function M(e,n){console.log("📖 ЧИТАЕМ НАЗНАЧЕНИЯ. Ключ периода:",n);const t=document.getElementById("details-modal"),s=document.getElementById("details-modal-body"),a=document.getElementById("details-modal-title");if(!t||!s)return;typeof m.loadFromLocalStorage=="function"&&m.loadFromLocalStorage();const o=m.getMonthData(n),l=o.projects||[],i=o.employees||[],r=o.assignments||[];console.log("Проверяем, что пришло из базы для проекта:",{projectId:e,allAssignmentsInMonth:r,filtered:r.filter(d=>d.projectId===e)});const p=l.find(d=>d.id===e);p&&(a.textContent=`Team for "${p.projectName}"`);const c=r.filter(d=>String(d.projectId)===String(e));if(c.length===0)s.innerHTML='<p class="empty-state">No employees assigned to this project yet.</p>';else{let d='<ul class="team-list">';c.forEach(function(u){const y=i.find(f=>f.id===u.employeeId);y&&(d+=`
                    <li class="team-item">
                        <div class="team-item__info">
                            <strong class="team-item__name">${y.name}</strong>
                            <span class="team-item__position">${y.position}</span>
                        </div>
                        <span class="team-item__capacity">${u.capacity}% load</span>
                    </li>
                `)}),d+="</ul>",s.innerHTML=d}t.classList.add("modal--open")}function w(e,n){const t=document.getElementById("assign-modal"),s=document.getElementById("assign-project-id"),a=document.getElementById("assign-emp-select");if(console.log("Поиск элементов модалки:",{modal:t,projectInput:s,empSelect:a}),!t||!a){console.error("❌ Ошибка: Элементы модального окна не найдены в HTML!");return}s&&(s.value=e);const o=m.getMonthData(n),l=o&&o.employees?o.employees:[];if(console.log("Список сотрудников для модалки:",l),l.length===0)a.innerHTML='<option value="">-- No employees available --</option>';else{let p='<option value="">-- Select an employee --</option>';l.forEach(function(c){const d=c.name||"Unknown Name",u=c.position||"No Position";p+=`<option value="${c.id}">${d} (${u})</option>`}),a.innerHTML=p}const i=document.getElementById("assign-capacity-range"),r=document.getElementById("assign-range-value");i&&(i.value=50),r&&(r.textContent="50"),t.classList.add("modal--open"),console.log("🚀 Класс modal--open успешно добавлен!")}function g(e,n){const t=document.getElementById("table-container");if(!t)return;const s=m.getMonthData(n);if(e==="projects"){const a=T(s.projects),o=P(s.projects);t.innerHTML=a+o,t.onclick=function(l){if(console.log("Кликнули по элементу:",l.target),l.target.classList.contains("btn-delete")){const r=l.target.getAttribute("data-id");A(r,n)}if(l.target.classList.contains("btn-assign")){console.log("Ура, поймали клик по кнопке Assign!");const r=l.target.getAttribute("data-id");w(r,n)}const i=l.target.closest(".clickable-capacity");if(i){const r=i.getAttribute("data-id");M(r,n)}}}else e==="employees"&&(t.innerHTML=$(s.employees),t.onclick=function(a){if(a.target.classList.contains("btn-delete--emp")){const o=a.target.getAttribute("data-id");C(o,n)}},t.ondblclick=function(a){const o=a.target;if(o.classList.contains("editable")&&!o.querySelector("input")){let d=function(){const u=c.value;N(r,p,u,n),g("employees",n)};var l=d;const i=o.textContent.replace(" $","").trim(),r=o.getAttribute("data-id"),p=o.getAttribute("data-field"),c=document.createElement("input");c.type=p==="salary"?"number":"text",c.value=i,c.className="table-inline-input",o.innerHTML="",o.appendChild(c),c.focus(),c.onkeydown=function(u){u.key==="Enter"&&d()},c.onblur=function(){d()}}})}function h(){const e=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+e.value}function q(e){const n=document.querySelectorAll(".nav-button"),t=document.getElementById("page-title"),s=document.getElementById("add-entity-btn");n.forEach(function(i){i.classList.remove("nav-button--active")});const a=e.currentTarget;a.classList.add("nav-button--active");const o=a.getAttribute("data-tab");o==="projects"?(t.textContent="Projects",s.textContent="+ Add projects"):o==="employees"&&(t.textContent="Employees",s.textContent="+ Add employee"),console.log("Переключено на вкладку:",o);const l=h();g(o,l)}function I(){const n=document.querySelector(".nav-button--active").getAttribute("data-tab"),t=h();g(n,t),console.log("Период изменен на:",t)}function B(){const e=document.getElementById("project-panel");e&&e.classList.add("slide-panel--open")}function j(){const e=document.getElementById("project-panel");e&&e.classList.remove("slide-panel--open")}function x(){const e=document.getElementById("employee-panel");e&&e.classList.add("slide-panel--open")}function L(){const e=document.getElementById("employee-panel");e&&e.classList.remove("slide-panel--open")}function k(){const e=document.getElementById("sidebar"),n=document.getElementById("sidebar-toggle"),t=document.querySelectorAll(".nav-button");document.querySelectorAll(".sidebar__nav-btn");const s=document.getElementById("month-select"),a=document.getElementById("year-select"),o=document.getElementById("add-entity-btn"),l=document.getElementById("project-panel-close"),i=document.getElementById("project-panel-overlay"),r=document.getElementById("employee-panel-close"),p=document.getElementById("employee-panel-overlay");if(!s||!a)return;const c=localStorage.getItem("app-selected-month"),d=localStorage.getItem("app-selected-year");c&&(s.value=c),d&&(a.value=d);function u(){return a.value+"-"+s.value}let y="projects";s.addEventListener("change",function(){localStorage.setItem("app-selected-month",s.value),console.log("📅 Месяц изменен на:",s.value),g(y,u())}),a.addEventListener("change",function(){localStorage.setItem("app-selected-year",a.value),console.log("📅 Год изменен на:",a.value),g(y,u())}),e&&n&&n.addEventListener("click",function(){e.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),t.forEach(function(f){f.addEventListener("click",q)}),s&&a&&(s.addEventListener("change",I),a.addEventListener("change",I)),o&&o.addEventListener("click",B),l&&l.addEventListener("click",j),i&&i.addEventListener("click",j),o&&o.addEventListener("click",function(){const f=document.querySelector(".nav-button--active").getAttribute("data-tab");f==="projects"?B():f==="employees"&&x()}),r&&r.addEventListener("click",L),p&&p.addEventListener("click",L),g("projects",h())}function v(){const e=document.getElementById("proj-name"),n=document.getElementById("proj-company"),t=document.getElementById("proj-budget"),s=document.getElementById("proj-capacity"),a=document.getElementById("proj-submit"),o=e.value.trim().length>0,l=n.value.trim().length>0,i=Number(t.value)>0,r=Number(s.value)>0;o&&l&&i&&r?a.disabled=!1:a.disabled=!0}function O(e){e.preventDefault();const n=document.getElementById("proj-name"),t=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity"),o=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+o.value,p={id:"proj_"+Date.now(),projectName:n.value.trim(),companyName:t.value.trim(),budget:Number(s.value),capacity:Number(a.value)},c=m.getMonthData(i);c.projects.push(p);const d=m.getRawData();d[i]=c,m.saveData(d),console.log("✅ Новый проект успешно сохранен в Store:",p),g("projects",i),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const u=document.getElementById("project-panel");u&&u.classList.remove("slide-panel--open")}function H(){const e=document.getElementById("project-form");if(e){const n=document.getElementById("proj-name"),t=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity");n.addEventListener("input",v),t.addEventListener("input",v),s.addEventListener("input",v),a.addEventListener("input",v),e.addEventListener("submit",O)}}function b(){const e=document.getElementById("emp-name"),n=document.getElementById("emp-position"),t=document.getElementById("emp-age"),s=document.getElementById("emp-salary"),a=document.getElementById("emp-submit"),o=document.getElementById("error-emp-age"),l=e.value.trim().length>0,i=n.value.trim().length>0,r=Number(s.value)>0,p=Number(t.value);let c=!1;t.value.trim()===""?o.textContent="":p<18?o.textContent="The employee must be over 18 years of age":(o.textContent="",c=!0),l&&i&&c&&r?a.disabled=!1:a.disabled=!0}function F(e){e.preventDefault();const n=document.getElementById("emp-name"),t=document.getElementById("emp-position"),s=document.getElementById("emp-age"),a=document.getElementById("emp-salary"),o=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+o.value,r={id:"emp_"+Date.now(),name:n.value.trim(),position:t.value.trim(),age:Number(s.value),salary:Number(a.value)},p=m.getMonthData(i);p.employees.push(r);const c=m.getRawData();c[i]=p,m.saveData(c),console.log("✅ Новый сотрудник добавлен:",r),g("employees",i),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const d=document.getElementById("employee-panel");d&&d.classList.remove("slide-panel--open")}function R(){const e=document.getElementById("employee-form");if(e){const n=document.getElementById("emp-name"),t=document.getElementById("emp-position"),s=document.getElementById("emp-age"),a=document.getElementById("emp-salary");n.addEventListener("input",b),t.addEventListener("input",b),s.addEventListener("input",b),a.addEventListener("input",b),e.addEventListener("submit",F)}}function D(){const e=document.getElementById("assign-modal");e&&e.classList.remove("modal--open")}function V(){const e=document.getElementById("assign-modal"),n=document.getElementById("assign-capacity-range"),t=document.getElementById("assign-range-value"),s=document.getElementById("assign-form");if(!e)return;e.onclick=function(o){(o.target.id==="assign-modal-overlay"||o.target.id==="assign-modal-close")&&(console.log("🔒 Закрываем модальное окно..."),D())},n&&t&&(n.oninput=function(){t.textContent=n.value}),s&&(s.onsubmit=function(o){o.preventDefault();const l=document.getElementById("assign-project-id").value,i=document.getElementById("assign-emp-select").value,r=Number(n.value),p=document.getElementById("month-select"),d=document.getElementById("year-select").value+"-"+p.value;if(console.log("✏️ СОХРАНЯЕМ НАЗНАЧЕНИЕ. Ключ периода:",d),!i){alert("Please select an employee first!");return}const u=m.getMonthData(d);u.assignments||(u.assignments=[]);const y={projectId:l,employeeId:i,capacity:r};u.assignments.push(y);const f=m.getRawData();f[d]=u,m.saveData(f),console.log("🔗 Успешное назначение в Стор:",y),alert("Employee successfully assigned to the project!"),D()});const a=document.getElementById("details-modal");a&&(a.onclick=function(o){(o.target.id==="details-modal-overlay"||o.target.id==="details-modal-close")&&a.classList.remove("modal--open")})}const _={"dashboard-app":`
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

  <div class="modal" id="details-modal">
      <div class="modal__overlay" id="details-modal-overlay"></div>
      <div class="modal__content">
          <div class="modal__header">
              <h2 id="details-modal-title">Project Team</h2>
              <button class="modal__close" id="details-modal-close">×</button>
          </div>
          
          <div id="details-modal-body">
              </div>
      </div>
  </div>
`};class J{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const n=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${n.length}`),n.forEach(t=>{const s=t.getAttribute("data-component");this.loadComponent(t,s)})}loadComponent(n,t){console.log(`📥 Загружаю компонент: ${t}`),_[t]?(n.innerHTML=_[t],n.setAttribute("data-loaded","true"),this.loadedComponents.add(t),console.log(`✅ ${t} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${t}" не найден в components.js`),n.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${t}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(t=>{let s=!1;t.forEach(a=>{a.addedNodes.length&&a.addedNodes.forEach(o=>{o.nodeType===1&&o.querySelectorAll&&o.querySelectorAll("[data-component]").length>0&&(s=!0)})}),s&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new J().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const U=m.getRawData();Object.keys(U).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),m.saveData(S)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(_));console.log("📅 Данные за май 2026:",m.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),k(),H(),R(),V()},0)});
