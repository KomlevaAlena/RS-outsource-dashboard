(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const e of o)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(o){const e={};return o.integrity&&(e.integrity=o.integrity),o.referrerPolicy&&(e.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?e.credentials="include":o.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(o){if(o.ep)return;o.ep=!0;const e=a(o);fetch(o.href,e)}})();const S="monthData",u={getRawData(){const n=localStorage.getItem(S);return n?JSON.parse(n):{}},saveData(n){const t=JSON.stringify(n);localStorage.setItem(S,t)},getMonthData(n){const t=this.getRawData();return t[n]?t[n]:{employees:[],projects:[]}}},M={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};let v=new Set,E=null,I="";function T(n,t){E=n,I=t;const a=document.getElementById("vacation-modal"),s=document.getElementById("vacation-modal-title"),o=document.getElementById("calendar-grid-container");if(!a||!o){console.error("❌ Элементы календаря не найдены в DOM");return}const e=t.split("-"),l=parseInt(e[0],10),i=parseInt(e[1],10),r=u.getMonthData(t).employees.find(d=>String(d.id)===String(n));if(r){s.textContent=`Availability for ${r.name}`;const d=r.vacations||[];v=new Set(d.map(Number))}else v=new Set;x(l,i,o),H(a,l,i,o),a.classList.add("modal--open"),console.log(`📅 Календарь открыт для сотрудника ${n} на период ${t}`)}function x(n,t,a){a.innerHTML=O(n,t),N(n,t)}function O(n,t){const a=new Date(n,t+1,0).getDate();let s=new Date(n,t,1).getDay()-1;s<0&&(s=6);const o=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];let e='<div class="calendar-grid">';o.forEach(l=>{e+=`<div class="calendar-header-cell ${l==="Sat"||l==="Sun"?"calendar-header-cell--weekend":""}">${l}</div>`});for(let l=0;l<s;l++)e+='<div class="calendar-day-cell calendar-day-cell--empty"></div>';for(let l=1;l<=a;l++){const c=new Date(n,t,l).getDay(),r=c===0||c===6;let d="calendar-day-cell calendar-day-target";r&&(d+=" calendar-day-cell--weekend"),v.has(l)&&(d+=" calendar-day-cell--selected"),e+=`<div class="${d}" data-day="${l}">${l}</div>`}return e+="</div>",e}function N(n,t){const a=new Date(n,t+1,0).getDate();let s=0,o=0;for(let r=1;r<=a;r++){const d=new Date(n,t,r).getDay();d===0||d===6||(s++,v.has(r)&&o++)}const e=s-o,l=document.getElementById("calendar-working-days");l&&(l.textContent=`Working Days: ${e}/${s} days`);const i=q(n,t),c=document.getElementById("calendar-vacation-ranges");c&&(c.textContent=i||"None")}function q(n,t){const a=Array.from(v).sort((i,c)=>i-c);if(a.length===0)return"";const s=[];let o=a[0],e=a[0];const l=i=>{const c=String(i).padStart(2,"0"),r=String(t+1).padStart(2,"0");return`${c}.${r}`};for(let i=1;i<a.length;i++){const c=a[i];let r=!1;if(c===e+1)r=!0;else{let d=!1;for(let m=e+1;m<c;m++){const p=new Date(n,t,m).getDay();if(p!==0&&p!==6){d=!0;break}}d||(r=!0)}r||(o===e?s.push(l(o)):s.push(`${l(o)}-${l(e)}`),o=c),e=c}return o===e?s.push(l(o)):s.push(`${l(o)}-${l(e)}`),s.join(", ")}function H(n,t,a,s){s.onclick=function(e){const l=e.target;if(!l.classList.contains("calendar-day-target"))return;const i=parseInt(l.getAttribute("data-day"),10);v.has(i)?(v.delete(i),l.classList.remove("calendar-day-cell--selected")):(v.add(i),l.classList.add("calendar-day-cell--selected")),N(t,a)},n.onclick=function(e){(e.target.id==="vacation-modal-overlay"||e.target.id==="vacation-modal-close")&&(n.classList.remove("modal--open"),console.log("🔒 Календарь закрыт"))};const o=document.getElementById("btn-save-vacation");o&&(o.onclick=function(){const e=u.getRawData(),c=((e[I]||{}).employees||[]).find(r=>String(r.id)===String(E));c&&(c.vacations=Array.from(v).sort((r,d)=>r-d),u.saveData(e),console.log(`💾 Отпуска сохранены для сотрудника ${E}:`,c.vacations),y("employees",I),n.classList.remove("modal--open"))})}function R(n,t){if(!confirm("Are you sure you want to delete this project?"))return;const s=u.getMonthData(t),o=s.projects.filter(function(l){return l.id!==n});s.projects=o;const e=u.getRawData();e[t]=s,u.saveData(e),console.log(`❌ Проект с ID ${n} успешно удален`),y("projects",t)}function V(n,t){if(!confirm("Are you sure you want to remove this employee?"))return;const s=u.getMonthData(t);s.employees=s.employees.filter(function(e){return e.id!==n});const o=u.getRawData();o[t]=s,u.saveData(o),console.log(`❌ Сотрудник с ID ${n} удален`),y("employees",t)}function W(n,t,a,s){const o=u.getMonthData(s),e=o.employees.find(l=>l.id===n);if(e){if(t==="salary"){const i=Number(a);if(isNaN(i)||i<=0){alert("Please enter the correct salary amount"),y("employees",s);return}e[t]=i}else{if(a.trim()===""){alert("The field cannot be empty"),y("employees",s);return}e[t]=a.trim()}const l=u.getRawData();l[s]=o,u.saveData(l),console.log(`📝 Сотрудник ${n}: поле ${t} обновлено на ${a}`)}}function F(n){if(n.length===0)return'<p class="empty-state">There are no projects yet</p>';let t=` 
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
    `;return n.forEach(function(a){t+=`
            <tr>
                <td>${a.companyName}</td>
                <td>${a.projectName}</td>
                <td>${a.budget} $</td>
                <td class="clickable-capacity" data-id="${a.id}">
                    <span class="capacity-link">${a.capacity||0} p.</span>
                </td>
                <td>
                    <button class="btn-assign" data-id="${a.id}">Assign</button>
                    <button class="btn-delete" data-id="${a.id}">Delete</button>
                </td>
            </tr>
        `}),t+="</tbody></table>",t}function G(n){if(n.length===0)return'<p class="empty-state">No employees added yet</p>';let t=`
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
    `;return n.forEach(function(a){t+=`
            <tr>
                <td>${a.name}</td>
                <td class="editable" data-id="${a.id}" data-field="position">${a.position}</td>
                <td>${a.age} y.o.</td>
                <td class="editable" data-id="${a.id}" data-field="salary">${a.salary} $</td>
                <td>
                    <button class="btn-delete btn-delete--emp" data-id="${a.id}">Delete</button>
                    <button class="btn-availability" data-id="${a.id}">Availability</button>
                </td>
            </tr>
        `}),t+="</tbody></table>",t}function J(n){const t=n.length;let a=0,s=0;return n.forEach(function(e){a+=e.budget,s+=e.capacity||0}),` 
        <div class="fin-summary">
            <div class="fin-card">
                <span class="fin-card__title">Active Projects</span>
                <span class="fin-card__value">${t}</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Budget</span>
                <span class="fin-card__value">${a.toLocaleString()} $</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Capacity</span>
                <span class="fin-card__value">${s} p.</span>
            </div>
        </div>
        `}function k(n,t){console.log("📖 ЧИТАЕМ НАЗНАЧЕНИЯ. Ключ периода:",t);const a=document.getElementById("details-modal"),s=document.getElementById("details-modal-body"),o=document.getElementById("details-modal-title");if(!a||!s)return;typeof u.loadFromLocalStorage=="function"&&u.loadFromLocalStorage();const e=u.getMonthData(t),l=e.projects||[],i=e.employees||[],c=e.assignments||[];console.log("Проверяем, что пришло из базы для проекта:",{projectId:n,allAssignmentsInMonth:c,filtered:c.filter(m=>m.projectId===n)});const r=l.find(m=>m.id===n);r&&(o.textContent=`Team for "${r.projectName}"`);const d=c.filter(m=>String(m.projectId)===String(n));if(d.length===0)s.innerHTML='<p class="empty-state">No employees assigned to this project yet.</p>';else{let m='<ul class="team-list">';d.forEach(function(p){const g=i.find(f=>String(f.id)===String(p.employeeId));g&&(m+=`
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
                `)}),m+="</ul>",s.innerHTML=m}a.onclick=function(m){if(m.target.classList.contains("btn-remove-asm")){const p=m.target.getAttribute("data-project-id"),g=m.target.getAttribute("data-employee-id");if(!confirm("Are you sure you want to remove this employee from the project?"))return;const f=u.getRawData(),b=f[t]||{},P=b.assignments||[];b.assignments=P.filter(function(D){return!(String(D.projectId)===String(p)&&String(D.employeeId)===String(g))}),u.saveData(f),console.log(`🗑 Сотрудник ${g} удален с проекта ${p}`),k(p,t),y("projects",t);return}(m.target.id==="details-modal-overlay"||m.target.id==="details-modal-close")&&(console.log("🔒 Закрываем окно подробностей команды"),a.classList.remove("modal--open"))},a.classList.add("modal--open")}function U(n,t){const a=document.getElementById("assign-modal"),s=document.getElementById("assign-project-id"),o=document.getElementById("assign-emp-select");if(console.log("Поиск элементов модалки:",{modal:a,projectInput:s,empSelect:o}),!a||!o){console.error("❌ Ошибка: Элементы модального окна не найдены в HTML!");return}s&&(s.value=n);const e=u.getMonthData(t),l=e&&e.employees?e.employees:[];if(console.log("Список сотрудников для модалки:",l),l.length===0)o.innerHTML='<option value="">-- No employees available --</option>';else{let r='<option value="">-- Select an employee --</option>';l.forEach(function(d){const m=d.name||"Unknown Name",p=d.position||"No Position";r+=`<option value="${d.id}">${m} (${p})</option>`}),o.innerHTML=r}const i=document.getElementById("assign-capacity-range"),c=document.getElementById("assign-range-value");i&&(i.value=50),c&&(c.textContent="50"),a.classList.add("modal--open"),console.log("🚀 Класс modal--open успешно добавлен!")}function y(n,t){const a=document.getElementById("table-container");if(!a)return;const s=u.getMonthData(t);if(n==="projects"){const o=J(s.projects),e=F(s.projects);a.innerHTML=o+e,a.onclick=function(l){if(console.log("Кликнули по элементу:",l.target),l.target.classList.contains("btn-delete")){const c=l.target.getAttribute("data-id");R(c,t)}if(l.target.classList.contains("btn-assign")){console.log("Ура, поймали клик по кнопке Assign!");const c=l.target.getAttribute("data-id");U(c,t)}const i=l.target.closest(".clickable-capacity");if(i){const c=i.getAttribute("data-id");k(c,t)}}}else n==="employees"&&(a.innerHTML=G(s.employees),a.onclick=function(o){if(o.target.classList.contains("btn-availability")){const e=o.target.getAttribute("data-id");console.log(`📅 Нажали календарь сотрудника с ID: ${e}`),T(e,t)}if(o.target.classList.contains("btn-delete--emp")){const e=o.target.getAttribute("data-id");V(e,t)}},a.ondblclick=function(o){const e=o.target;if(e.classList.contains("editable")&&!e.querySelector("input")){let m=function(){const p=d.value;W(c,r,p,t),y("employees",t)};var l=m;const i=e.textContent.replace(" $","").trim(),c=e.getAttribute("data-id"),r=e.getAttribute("data-field"),d=document.createElement("input");d.type=r==="salary"?"number":"text",d.value=i,d.className="table-inline-input",e.innerHTML="",e.appendChild(d),d.focus(),d.onkeydown=function(p){p.key==="Enter"&&m()},d.onblur=function(){m()}}})}function B(){const n=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+n.value}function z(n){const t=document.querySelectorAll(".nav-button"),a=document.getElementById("page-title"),s=document.getElementById("add-entity-btn");t.forEach(function(i){i.classList.remove("nav-button--active")});const o=n.currentTarget;o.classList.add("nav-button--active");const e=o.getAttribute("data-tab");e==="projects"?(a.textContent="Projects",s.textContent="+ Add projects"):e==="employees"&&(a.textContent="Employees",s.textContent="+ Add employee"),console.log("Переключено на вкладку:",e);const l=B();y(e,l)}function L(){const t=document.querySelector(".nav-button--active").getAttribute("data-tab"),a=B();y(t,a),console.log("Период изменен на:",a)}function $(){const n=document.getElementById("project-panel");n&&n.classList.add("slide-panel--open")}function A(){const n=document.getElementById("project-panel");n&&n.classList.remove("slide-panel--open")}function Y(){const n=document.getElementById("employee-panel");n&&n.classList.add("slide-panel--open")}function C(){const n=document.getElementById("employee-panel");n&&n.classList.remove("slide-panel--open")}function Q(){const n=document.getElementById("sidebar"),t=document.getElementById("sidebar-toggle"),a=document.querySelectorAll(".nav-button");document.querySelectorAll(".sidebar__nav-btn");const s=document.getElementById("month-select"),o=document.getElementById("year-select"),e=document.getElementById("add-entity-btn"),l=document.getElementById("project-panel-close"),i=document.getElementById("project-panel-overlay"),c=document.getElementById("employee-panel-close"),r=document.getElementById("employee-panel-overlay");if(!s||!o)return;const d=localStorage.getItem("app-selected-month"),m=localStorage.getItem("app-selected-year");d&&(s.value=d),m&&(o.value=m);function p(){return o.value+"-"+s.value}let g="projects";s.addEventListener("change",function(){localStorage.setItem("app-selected-month",s.value),console.log("📅 Месяц изменен на:",s.value),y(g,p())}),o.addEventListener("change",function(){localStorage.setItem("app-selected-year",o.value),console.log("📅 Год изменен на:",o.value),y(g,p())}),n&&t&&t.addEventListener("click",function(){n.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),a.forEach(function(f){f.addEventListener("click",z)}),s&&o&&(s.addEventListener("change",L),o.addEventListener("change",L)),e&&e.addEventListener("click",$),l&&l.addEventListener("click",A),i&&i.addEventListener("click",A),e&&e.addEventListener("click",function(){const f=document.querySelector(".nav-button--active").getAttribute("data-tab");f==="projects"?$():f==="employees"&&Y()}),c&&c.addEventListener("click",C),r&&r.addEventListener("click",C),y("projects",B())}function h(){const n=document.getElementById("proj-name"),t=document.getElementById("proj-company"),a=document.getElementById("proj-budget"),s=document.getElementById("proj-capacity"),o=document.getElementById("proj-submit"),e=n.value.trim().length>0,l=t.value.trim().length>0,i=Number(a.value)>0,c=Number(s.value)>0;e&&l&&i&&c?o.disabled=!1:o.disabled=!0}function X(n){n.preventDefault();const t=document.getElementById("proj-name"),a=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),o=document.getElementById("proj-capacity"),e=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+e.value,r={id:"proj_"+Date.now(),projectName:t.value.trim(),companyName:a.value.trim(),budget:Number(s.value),capacity:Number(o.value)},d=u.getMonthData(i);d.projects.push(r);const m=u.getRawData();m[i]=d,u.saveData(m),console.log("✅ Новый проект успешно сохранен в Store:",r),y("projects",i),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const p=document.getElementById("project-panel");p&&p.classList.remove("slide-panel--open")}function Z(){const n=document.getElementById("project-form");if(n){const t=document.getElementById("proj-name"),a=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),o=document.getElementById("proj-capacity");t.addEventListener("input",h),a.addEventListener("input",h),s.addEventListener("input",h),o.addEventListener("input",h),n.addEventListener("submit",X)}}function _(){const n=document.getElementById("emp-name"),t=document.getElementById("emp-position"),a=document.getElementById("emp-age"),s=document.getElementById("emp-salary"),o=document.getElementById("emp-submit"),e=document.getElementById("error-emp-age"),l=n.value.trim().length>0,i=t.value.trim().length>0,c=Number(s.value)>0,r=Number(a.value);let d=!1;a.value.trim()===""?e.textContent="":r<18?e.textContent="The employee must be over 18 years of age":(e.textContent="",d=!0),l&&i&&d&&c?o.disabled=!1:o.disabled=!0}function K(n){n.preventDefault();const t=document.getElementById("emp-name"),a=document.getElementById("emp-position"),s=document.getElementById("emp-age"),o=document.getElementById("emp-salary"),e=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+e.value,c={id:"emp_"+Date.now(),name:t.value.trim(),position:a.value.trim(),age:Number(s.value),salary:Number(o.value)},r=u.getMonthData(i);r.employees.push(c);const d=u.getRawData();d[i]=r,u.saveData(d),console.log("✅ Новый сотрудник добавлен:",c),y("employees",i),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const m=document.getElementById("employee-panel");m&&m.classList.remove("slide-panel--open")}function ee(){const n=document.getElementById("employee-form");if(n){const t=document.getElementById("emp-name"),a=document.getElementById("emp-position"),s=document.getElementById("emp-age"),o=document.getElementById("emp-salary");t.addEventListener("input",_),a.addEventListener("input",_),s.addEventListener("input",_),o.addEventListener("input",_),n.addEventListener("submit",K)}}function w(){const n=document.getElementById("assign-modal");n&&n.classList.remove("modal--open")}function te(){const n=document.getElementById("assign-modal"),t=document.getElementById("assign-capacity-range"),a=document.getElementById("assign-range-value"),s=document.getElementById("assign-form");if(!n)return;n.onclick=function(e){(e.target.id==="assign-modal-overlay"||e.target.id==="assign-modal-close")&&(console.log("🔒 Закрываем модальное окно..."),w())},t&&a&&(t.oninput=function(){a.textContent=t.value}),s&&(s.onsubmit=function(e){e.preventDefault();const l=document.getElementById("assign-project-id").value,i=document.getElementById("assign-emp-select").value,c=Number(t.value),r=document.getElementById("month-select"),m=document.getElementById("year-select").value+"-"+r.value;if(console.log("✏️ СОХРАНЯЕМ НАЗНАЧЕНИЕ. Ключ периода:",m),!i){alert("Please select an employee first!");return}const p=u.getMonthData(m);p.assignments||(p.assignments=[]);const g=p.assignments.find(function(b){return String(b.projectId)===String(l)&&String(b.employeeId)===String(i)});if(g)console.log("🔄 Сотрудник уже на проекте. Обновляем capacity с",g.capacity,"на",c),g.capacity=c;else{const b={projectId:l,employeeId:i,capacity:c};p.assignments.push(b),console.log("🔗 Новое назначение добавлено в Стор:",b)}const f=u.getRawData();f[m]=p,u.saveData(f),alert("Employee successfully assigned to the project!"),w(),renderCurrentTab("projects",m)});const o=document.getElementById("details-modal");o&&(o.onclick=function(e){(e.target.id==="details-modal-overlay"||e.target.id==="details-modal-close")&&o.classList.remove("modal--open")})}const j={"dashboard-app":`
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

  <div class="modal" id="vacation-modal">
      <div class="modal__overlay" id="vacation-modal-overlay"></div>
      <div class="modal__content calendar-modal">
          <div class="modal__header">
              <h2 id="vacation-modal-title">Availability Calendar</h2>
              <button class="modal__close" id="vacation-modal-close">×</button>
          </div>
          
          <div class="modal__body">
              <div id="calendar-grid-container"></div>
              
              <div class="calendar-info" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
                  <p id="calendar-working-days" style="font-weight: bold; margin-bottom: 8px;">Working Days: --/-- days</p>
                  <p class="vacation-ranges-title" style="margin-bottom: 4px; color: #666; font-size: 0.9em;">Selected Vacations:</p>
                  <div id="calendar-vacation-ranges" class="vacation-ranges-list" style="font-style: italic; color: #333;">None</div>
              </div>
          </div>
          
          <div class="modal__footer" style="margin-top: 20px; display: flex; justify-content: flex-end;">
              <button id="btn-save-vacation" class="btn btn--primary">Set Vacation</button>
          </div>
      </div>
  </div>
`};class ne{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const t=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${t.length}`),t.forEach(a=>{const s=a.getAttribute("data-component");this.loadComponent(a,s)})}loadComponent(t,a){console.log(`📥 Загружаю компонент: ${a}`),j[a]?(t.innerHTML=j[a],t.setAttribute("data-loaded","true"),this.loadedComponents.add(a),console.log(`✅ ${a} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${a}" не найден в components.js`),t.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${a}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(a=>{let s=!1;a.forEach(o=>{o.addedNodes.length&&o.addedNodes.forEach(e=>{e.nodeType===1&&e.querySelectorAll&&e.querySelectorAll("[data-component]").length>0&&(s=!0)})}),s&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new ne().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const ae=u.getRawData();Object.keys(ae).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),u.saveData(M)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(j));console.log("📅 Данные за май 2026:",u.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),Q(),Z(),ee(),te()},0)});
