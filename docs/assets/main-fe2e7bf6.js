(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=t(a);fetch(a.href,o)}})();const j="monthData",m={getRawData(){const n=localStorage.getItem(j);return n?JSON.parse(n):{}},saveData(n){const e=JSON.stringify(n);localStorage.setItem(j,e)},getMonthData(n){const e=this.getRawData();return e[n]?e[n]:{employees:[],projects:[]}}},N={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};function P(n,e){if(!confirm("Are you sure you want to delete this project?"))return;const s=m.getMonthData(e),a=s.projects.filter(function(l){return l.id!==n});s.projects=a;const o=m.getRawData();o[e]=s,m.saveData(o),console.log(`❌ Проект с ID ${n} успешно удален`),y("projects",e)}function T(n,e){if(!confirm("Are you sure you want to remove this employee?"))return;const s=m.getMonthData(e);s.employees=s.employees.filter(function(o){return o.id!==n});const a=m.getRawData();a[e]=s,m.saveData(a),console.log(`❌ Сотрудник с ID ${n} удален`),y("employees",e)}function M(n,e,t,s){const a=m.getMonthData(s),o=a.employees.find(l=>l.id===n);if(o){if(e==="salary"){const c=Number(t);if(isNaN(c)||c<=0){alert("Please enter the correct salary amount"),y("employees",s);return}o[e]=c}else{if(t.trim()===""){alert("The field cannot be empty"),y("employees",s);return}o[e]=t.trim()}const l=m.getRawData();l[s]=a,m.saveData(l),console.log(`📝 Сотрудник ${n}: поле ${e} обновлено на ${t}`)}}function w(n){if(n.length===0)return'<p class="empty-state">There are no projects yet</p>';let e=` 
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
    `;return n.forEach(function(t){e+=`
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
        `}),e+="</tbody></table>",e}function x(n){if(n.length===0)return'<p class="empty-state">No employees added yet</p>';let e=`
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
    `;return n.forEach(function(t){e+=`
            <tr>
                <td>${t.name}</td>
                <td class="editable" data-id="${t.id}" data-field="position">${t.position}</td>
                <td>${t.age} y.o.</td>
                <td class="editable" data-id="${t.id}" data-field="salary">${t.salary} $</td>
                <td><button class="btn-delete btn-delete--emp" data-id="${t.id}">Delete</button></td>
            </tr>
        `}),e+="</tbody></table>",e}function k(n){const e=n.length;let t=0,s=0;return n.forEach(function(o){t+=o.budget,s+=o.capacity||0}),` 
        <div class="fin-summary">
            <div class="fin-card">
                <span class="fin-card__title">Active Projects</span>
                <span class="fin-card__value">${e}</span>
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
        `}function C(n,e){console.log("📖 ЧИТАЕМ НАЗНАЧЕНИЯ. Ключ периода:",e);const t=document.getElementById("details-modal"),s=document.getElementById("details-modal-body"),a=document.getElementById("details-modal-title");if(!t||!s)return;typeof m.loadFromLocalStorage=="function"&&m.loadFromLocalStorage();const o=m.getMonthData(e),l=o.projects||[],c=o.employees||[],d=o.assignments||[];console.log("Проверяем, что пришло из базы для проекта:",{projectId:n,allAssignmentsInMonth:d,filtered:d.filter(i=>i.projectId===n)});const u=l.find(i=>i.id===n);u&&(a.textContent=`Team for "${u.projectName}"`);const r=d.filter(i=>String(i.projectId)===String(n));if(r.length===0)s.innerHTML='<p class="empty-state">No employees assigned to this project yet.</p>';else{let i='<ul class="team-list">';r.forEach(function(p){const g=c.find(f=>String(f.id)===String(p.employeeId));g&&(i+=`
                    <li class="team-item">
                        <div class="team-item__info">
                            <strong class="team-item__name">${g.name}</strong>
                            <span class="team-item__position">${g.position}</span>
                        </div>
                        <div class="team-item__actions">
                            <span class="team-item__capacity">${p.capacity}% load</span>
                            <button class="btn-remove-asm" 
                                    data-project-id="${n}" 
                                    data-employee-id="${g.id}" 
                                    title="Remove from project">×</button>
                        </div>
                    </li>
                `)}),i+="</ul>",s.innerHTML=i}t.onclick=function(i){if(i.target.classList.contains("btn-remove-asm")){const p=i.target.getAttribute("data-project-id"),g=i.target.getAttribute("data-employee-id");if(!confirm("Are you sure you want to remove this employee from the project?"))return;const f=m.getRawData(),v=f[e]||{},$=v.assignments||[];v.assignments=$.filter(function(I){return!(String(I.projectId)===String(p)&&String(I.employeeId)===String(g))}),m.saveData(f),console.log(`🗑 Сотрудник ${g} удален с проекта ${p}`),C(p,e),y("projects",e);return}(i.target.id==="details-modal-overlay"||i.target.id==="details-modal-close")&&(console.log("🔒 Закрываем окно подробностей команды"),t.classList.remove("modal--open"))},t.classList.add("modal--open")}function q(n,e){const t=document.getElementById("assign-modal"),s=document.getElementById("assign-project-id"),a=document.getElementById("assign-emp-select");if(console.log("Поиск элементов модалки:",{modal:t,projectInput:s,empSelect:a}),!t||!a){console.error("❌ Ошибка: Элементы модального окна не найдены в HTML!");return}s&&(s.value=n);const o=m.getMonthData(e),l=o&&o.employees?o.employees:[];if(console.log("Список сотрудников для модалки:",l),l.length===0)a.innerHTML='<option value="">-- No employees available --</option>';else{let u='<option value="">-- Select an employee --</option>';l.forEach(function(r){const i=r.name||"Unknown Name",p=r.position||"No Position";u+=`<option value="${r.id}">${i} (${p})</option>`}),a.innerHTML=u}const c=document.getElementById("assign-capacity-range"),d=document.getElementById("assign-range-value");c&&(c.value=50),d&&(d.textContent="50"),t.classList.add("modal--open"),console.log("🚀 Класс modal--open успешно добавлен!")}function y(n,e){const t=document.getElementById("table-container");if(!t)return;const s=m.getMonthData(e);if(n==="projects"){const a=k(s.projects),o=w(s.projects);t.innerHTML=a+o,t.onclick=function(l){if(console.log("Кликнули по элементу:",l.target),l.target.classList.contains("btn-delete")){const d=l.target.getAttribute("data-id");P(d,e)}if(l.target.classList.contains("btn-assign")){console.log("Ура, поймали клик по кнопке Assign!");const d=l.target.getAttribute("data-id");q(d,e)}const c=l.target.closest(".clickable-capacity");if(c){const d=c.getAttribute("data-id");C(d,e)}}}else n==="employees"&&(t.innerHTML=x(s.employees),t.onclick=function(a){if(a.target.classList.contains("btn-delete--emp")){const o=a.target.getAttribute("data-id");T(o,e)}},t.ondblclick=function(a){const o=a.target;if(o.classList.contains("editable")&&!o.querySelector("input")){let i=function(){const p=r.value;M(d,u,p,e),y("employees",e)};var l=i;const c=o.textContent.replace(" $","").trim(),d=o.getAttribute("data-id"),u=o.getAttribute("data-field"),r=document.createElement("input");r.type=u==="salary"?"number":"text",r.value=c,r.className="table-inline-input",o.innerHTML="",o.appendChild(r),r.focus(),r.onkeydown=function(p){p.key==="Enter"&&i()},r.onblur=function(){i()}}})}function E(){const n=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+n.value}function O(n){const e=document.querySelectorAll(".nav-button"),t=document.getElementById("page-title"),s=document.getElementById("add-entity-btn");e.forEach(function(c){c.classList.remove("nav-button--active")});const a=n.currentTarget;a.classList.add("nav-button--active");const o=a.getAttribute("data-tab");o==="projects"?(t.textContent="Projects",s.textContent="+ Add projects"):o==="employees"&&(t.textContent="Employees",s.textContent="+ Add employee"),console.log("Переключено на вкладку:",o);const l=E();y(o,l)}function B(){const e=document.querySelector(".nav-button--active").getAttribute("data-tab"),t=E();y(e,t),console.log("Период изменен на:",t)}function S(){const n=document.getElementById("project-panel");n&&n.classList.add("slide-panel--open")}function D(){const n=document.getElementById("project-panel");n&&n.classList.remove("slide-panel--open")}function H(){const n=document.getElementById("employee-panel");n&&n.classList.add("slide-panel--open")}function L(){const n=document.getElementById("employee-panel");n&&n.classList.remove("slide-panel--open")}function R(){const n=document.getElementById("sidebar"),e=document.getElementById("sidebar-toggle"),t=document.querySelectorAll(".nav-button");document.querySelectorAll(".sidebar__nav-btn");const s=document.getElementById("month-select"),a=document.getElementById("year-select"),o=document.getElementById("add-entity-btn"),l=document.getElementById("project-panel-close"),c=document.getElementById("project-panel-overlay"),d=document.getElementById("employee-panel-close"),u=document.getElementById("employee-panel-overlay");if(!s||!a)return;const r=localStorage.getItem("app-selected-month"),i=localStorage.getItem("app-selected-year");r&&(s.value=r),i&&(a.value=i);function p(){return a.value+"-"+s.value}let g="projects";s.addEventListener("change",function(){localStorage.setItem("app-selected-month",s.value),console.log("📅 Месяц изменен на:",s.value),y(g,p())}),a.addEventListener("change",function(){localStorage.setItem("app-selected-year",a.value),console.log("📅 Год изменен на:",a.value),y(g,p())}),n&&e&&e.addEventListener("click",function(){n.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),t.forEach(function(f){f.addEventListener("click",O)}),s&&a&&(s.addEventListener("change",B),a.addEventListener("change",B)),o&&o.addEventListener("click",S),l&&l.addEventListener("click",D),c&&c.addEventListener("click",D),o&&o.addEventListener("click",function(){const f=document.querySelector(".nav-button--active").getAttribute("data-tab");f==="projects"?S():f==="employees"&&H()}),d&&d.addEventListener("click",L),u&&u.addEventListener("click",L),y("projects",E())}function b(){const n=document.getElementById("proj-name"),e=document.getElementById("proj-company"),t=document.getElementById("proj-budget"),s=document.getElementById("proj-capacity"),a=document.getElementById("proj-submit"),o=n.value.trim().length>0,l=e.value.trim().length>0,c=Number(t.value)>0,d=Number(s.value)>0;o&&l&&c&&d?a.disabled=!1:a.disabled=!0}function F(n){n.preventDefault();const e=document.getElementById("proj-name"),t=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity"),o=document.getElementById("month-select"),c=document.getElementById("year-select").value+"-"+o.value,u={id:"proj_"+Date.now(),projectName:e.value.trim(),companyName:t.value.trim(),budget:Number(s.value),capacity:Number(a.value)},r=m.getMonthData(c);r.projects.push(u);const i=m.getRawData();i[c]=r,m.saveData(i),console.log("✅ Новый проект успешно сохранен в Store:",u),y("projects",c),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const p=document.getElementById("project-panel");p&&p.classList.remove("slide-panel--open")}function V(){const n=document.getElementById("project-form");if(n){const e=document.getElementById("proj-name"),t=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity");e.addEventListener("input",b),t.addEventListener("input",b),s.addEventListener("input",b),a.addEventListener("input",b),n.addEventListener("submit",F)}}function h(){const n=document.getElementById("emp-name"),e=document.getElementById("emp-position"),t=document.getElementById("emp-age"),s=document.getElementById("emp-salary"),a=document.getElementById("emp-submit"),o=document.getElementById("error-emp-age"),l=n.value.trim().length>0,c=e.value.trim().length>0,d=Number(s.value)>0,u=Number(t.value);let r=!1;t.value.trim()===""?o.textContent="":u<18?o.textContent="The employee must be over 18 years of age":(o.textContent="",r=!0),l&&c&&r&&d?a.disabled=!1:a.disabled=!0}function J(n){n.preventDefault();const e=document.getElementById("emp-name"),t=document.getElementById("emp-position"),s=document.getElementById("emp-age"),a=document.getElementById("emp-salary"),o=document.getElementById("month-select"),c=document.getElementById("year-select").value+"-"+o.value,d={id:"emp_"+Date.now(),name:e.value.trim(),position:t.value.trim(),age:Number(s.value),salary:Number(a.value)},u=m.getMonthData(c);u.employees.push(d);const r=m.getRawData();r[c]=u,m.saveData(r),console.log("✅ Новый сотрудник добавлен:",d),y("employees",c),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const i=document.getElementById("employee-panel");i&&i.classList.remove("slide-panel--open")}function U(){const n=document.getElementById("employee-form");if(n){const e=document.getElementById("emp-name"),t=document.getElementById("emp-position"),s=document.getElementById("emp-age"),a=document.getElementById("emp-salary");e.addEventListener("input",h),t.addEventListener("input",h),s.addEventListener("input",h),a.addEventListener("input",h),n.addEventListener("submit",J)}}function A(){const n=document.getElementById("assign-modal");n&&n.classList.remove("modal--open")}function G(){const n=document.getElementById("assign-modal"),e=document.getElementById("assign-capacity-range"),t=document.getElementById("assign-range-value"),s=document.getElementById("assign-form");if(!n)return;n.onclick=function(o){(o.target.id==="assign-modal-overlay"||o.target.id==="assign-modal-close")&&(console.log("🔒 Закрываем модальное окно..."),A())},e&&t&&(e.oninput=function(){t.textContent=e.value}),s&&(s.onsubmit=function(o){o.preventDefault();const l=document.getElementById("assign-project-id").value,c=document.getElementById("assign-emp-select").value,d=Number(e.value),u=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+u.value;if(console.log("✏️ СОХРАНЯЕМ НАЗНАЧЕНИЕ. Ключ периода:",i),!c){alert("Please select an employee first!");return}const p=m.getMonthData(i);p.assignments||(p.assignments=[]);const g=p.assignments.find(function(v){return String(v.projectId)===String(l)&&String(v.employeeId)===String(c)});if(g)console.log("🔄 Сотрудник уже на проекте. Обновляем capacity с",g.capacity,"на",d),g.capacity=d;else{const v={projectId:l,employeeId:c,capacity:d};p.assignments.push(v),console.log("🔗 Новое назначение добавлено в Стор:",v)}const f=m.getRawData();f[i]=p,m.saveData(f),alert("Employee successfully assigned to the project!"),A(),renderCurrentTab("projects",i)});const a=document.getElementById("details-modal");a&&(a.onclick=function(o){(o.target.id==="details-modal-overlay"||o.target.id==="details-modal-close")&&a.classList.remove("modal--open")})}const _={"dashboard-app":`
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
`};class Y{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const e=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${e.length}`),e.forEach(t=>{const s=t.getAttribute("data-component");this.loadComponent(t,s)})}loadComponent(e,t){console.log(`📥 Загружаю компонент: ${t}`),_[t]?(e.innerHTML=_[t],e.setAttribute("data-loaded","true"),this.loadedComponents.add(t),console.log(`✅ ${t} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${t}" не найден в components.js`),e.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${t}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(t=>{let s=!1;t.forEach(a=>{a.addedNodes.length&&a.addedNodes.forEach(o=>{o.nodeType===1&&o.querySelectorAll&&o.querySelectorAll("[data-component]").length>0&&(s=!0)})}),s&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new Y().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const z=m.getRawData();Object.keys(z).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),m.saveData(N)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(_));console.log("📅 Данные за май 2026:",m.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),R(),V(),U(),G()},0)});
