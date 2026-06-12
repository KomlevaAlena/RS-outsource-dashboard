(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const e of a)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(a){const e={};return a.integrity&&(e.integrity=a.integrity),a.referrerPolicy&&(e.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?e.credentials="include":a.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(a){if(a.ep)return;a.ep=!0;const e=o(a);fetch(a.href,e)}})();const S="monthData",u={getRawData(){const t=localStorage.getItem(S);return t?JSON.parse(t):{}},saveData(t){const n=JSON.stringify(t);localStorage.setItem(S,n)},getMonthData(t){const n=this.getRawData();return n[t]?n[t]:{employees:[],projects:[]}}},T={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};let v=new Set,E=null,I="";function x(t,n){E=t,I=n;const o=document.getElementById("vacation-modal"),s=document.getElementById("vacation-modal-title"),a=document.getElementById("calendar-grid-container");if(!o||!a){console.error("❌ Элементы календаря не найдены в DOM");return}const e=n.split("-"),l=parseInt(e[0],10),i=parseInt(e[1],10),r=u.getMonthData(n).employees.find(d=>String(d.id)===String(t));if(r){s.textContent=`Availability for ${r.name}`;const d=r.vacations||[];v=new Set(d.map(Number))}else v=new Set;O(l,i,a),H(o,l,i,a),o.classList.add("modal--open"),console.log(`📅 Календарь открыт для сотрудника ${t} на период ${n}`)}function O(t,n,o){o.innerHTML=W(t,n),w(t,n)}function W(t,n){const o=new Date(t,n+1,0).getDate();let s=new Date(t,n,1).getDay()-1;s<0&&(s=6);const a=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];let e='<div class="calendar-grid">';a.forEach(l=>{e+=`<div class="calendar-header-cell ${l==="Sat"||l==="Sun"?"calendar-header-cell--weekend":""}">${l}</div>`});for(let l=0;l<s;l++)e+='<div class="calendar-day-cell calendar-day-cell--empty"></div>';for(let l=1;l<=o;l++){const c=new Date(t,n,l).getDay(),r=c===0||c===6;let d="calendar-day-cell calendar-day-target";r&&(d+=" calendar-day-cell--weekend"),v.has(l)&&(d+=" calendar-day-cell--selected"),e+=`<div class="${d}" data-day="${l}">${l}</div>`}return e+="</div>",e}function w(t,n){const o=new Date(t,n+1,0).getDate();let s=0,a=0;for(let r=1;r<=o;r++){const d=new Date(t,n,r).getDay();d===0||d===6||(s++,v.has(r)&&a++)}const e=s-a,l=document.getElementById("calendar-working-days");l&&(l.textContent=`Working Days: ${e}/${s} days`);const i=q(t,n),c=document.getElementById("calendar-vacation-ranges");c&&(c.textContent=i||"None")}function q(t,n){const o=Array.from(v).sort((i,c)=>i-c);if(o.length===0)return"";const s=[];let a=o[0],e=o[0];const l=i=>{const c=String(i).padStart(2,"0"),r=String(n+1).padStart(2,"0");return`${c}.${r}`};for(let i=1;i<o.length;i++){const c=o[i];let r=!1;if(c===e+1)r=!0;else{let d=!1;for(let m=e+1;m<c;m++){const p=new Date(t,n,m).getDay();if(p!==0&&p!==6){d=!0;break}}d||(r=!0)}r||(a===e?s.push(l(a)):s.push(`${l(a)}-${l(e)}`),a=c),e=c}return a===e?s.push(l(a)):s.push(`${l(a)}-${l(e)}`),s.join(", ")}function H(t,n,o,s){s.onclick=function(e){const l=e.target;if(!l.classList.contains("calendar-day-target"))return;const i=parseInt(l.getAttribute("data-day"),10);v.has(i)?(v.delete(i),l.classList.remove("calendar-day-cell--selected")):(v.add(i),l.classList.add("calendar-day-cell--selected")),w(n,o)},t.onclick=function(e){(e.target.id==="vacation-modal-overlay"||e.target.id==="vacation-modal-close")&&(t.classList.remove("modal--open"),console.log("🔒 Календарь закрыт"))};const a=document.getElementById("btn-save-vacation");a&&(a.onclick=function(){const e=u.getRawData(),c=((e[I]||{}).employees||[]).find(r=>String(r.id)===String(E));c&&(c.vacations=Array.from(v).sort((r,d)=>r-d),u.saveData(e),console.log(`💾 Отпуска сохранены для сотрудника ${E}:`,c.vacations),y("employees",I),t.classList.remove("modal--open"))})}function V(t,n){const o=new Date(t,n+1,0).getDate();let s=0;for(let a=1;a<=o;a++){const e=new Date(t,n,a).getDay();e===0||e===6||s++}return s}function F(t,n,o){if(!t||!Array.isArray(t)||t.length===0)return 0;let s=0;return t.forEach(a=>{const e=new Date(n,o,a).getDay();e===0||e===6||s++}),s}function N(t,n){const o=n.split("-"),s=parseInt(o[0],10),a=parseInt(o[1],10),e=V(s,a),l=t.vacations||[],i=F(l,s,a);if(e===0)return 0;const c=i/e;return Math.round(c*100)/100}function R(t,n){const s=100*(1-N(t,n));return Math.round(s)}function G(t,n){if(!confirm("Are you sure you want to delete this project?"))return;const s=u.getMonthData(n),a=s.projects.filter(function(l){return l.id!==t});s.projects=a;const e=u.getRawData();e[n]=s,u.saveData(e),console.log(`❌ Проект с ID ${t} успешно удален`),y("projects",n)}function J(t,n){if(!confirm("Are you sure you want to remove this employee?"))return;const s=u.getMonthData(n);s.employees=s.employees.filter(function(e){return e.id!==t});const a=u.getRawData();a[n]=s,u.saveData(a),console.log(`❌ Сотрудник с ID ${t} удален`),y("employees",n)}function U(t,n,o,s){const a=u.getMonthData(s),e=a.employees.find(l=>l.id===t);if(e){if(n==="salary"){const i=Number(o);if(isNaN(i)||i<=0){alert("Please enter the correct salary amount"),y("employees",s);return}e[n]=i}else{if(o.trim()===""){alert("The field cannot be empty"),y("employees",s);return}e[n]=o.trim()}const l=u.getRawData();l[s]=a,u.saveData(l),console.log(`📝 Сотрудник ${t}: поле ${n} обновлено на ${o}`)}}function z(t){if(t.length===0)return'<p class="empty-state">There are no projects yet</p>';let n=` 
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
    `;return t.forEach(function(o){n+=`
            <tr>
                <td>${o.companyName}</td>
                <td>${o.projectName}</td>
                <td>${o.budget} $</td>
                <td class="clickable-capacity" data-id="${o.id}">
                    <span class="capacity-link">${o.capacity||0} p.</span>
                </td>
                <td>
                    <button class="btn-assign" data-id="${o.id}">Assign</button>
                    <button class="btn-delete" data-id="${o.id}">Delete</button>
                </td>
            </tr>
        `}),n+="</tbody></table>",n}function Y(t,n){if(t.length===0)return'<p class="empty-state">No employees added yet</p>';let o=`
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Age</th>
                <th>Salary</th>
                <th>Vacation Factor</th>
                <th>Eff. Capacity</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;return t.forEach(function(s){const a=N(s,n),e=R(s,n);o+=`
            <tr>
                <td>${s.name}</td>
                <td class="editable" data-id="${s.id}" data-field="position">${s.position}</td>
                <td>${s.age} y.o.</td>
                <td class="editable" data-id="${s.id}" data-field="salary">${s.salary} $</td>
                <td><span class="badge badge--factor">${a}</span></td>
                <td><span class="badge badge--capacity">${e}%</span></td>
                <td>
                    <button class="btn-delete btn-delete--emp" data-id="${s.id}">Delete</button>
                    <button class="btn-availability" data-id="${s.id}">Availability</button>
                </td>
            </tr>
        `}),o+="</tbody></table>",o}function Q(t){const n=t.length;let o=0,s=0;return t.forEach(function(e){o+=e.budget,s+=e.capacity||0}),` 
        <div class="fin-summary">
            <div class="fin-card">
                <span class="fin-card__title">Active Projects</span>
                <span class="fin-card__value">${n}</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Budget</span>
                <span class="fin-card__value">${o.toLocaleString()} $</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Capacity</span>
                <span class="fin-card__value">${s} p.</span>
            </div>
        </div>
        `}function M(t,n){console.log("📖 ЧИТАЕМ НАЗНАЧЕНИЯ. Ключ периода:",n);const o=document.getElementById("details-modal"),s=document.getElementById("details-modal-body"),a=document.getElementById("details-modal-title");if(!o||!s)return;typeof u.loadFromLocalStorage=="function"&&u.loadFromLocalStorage();const e=u.getMonthData(n),l=e.projects||[],i=e.employees||[],c=e.assignments||[];console.log("Проверяем, что пришло из базы для проекта:",{projectId:t,allAssignmentsInMonth:c,filtered:c.filter(m=>m.projectId===t)});const r=l.find(m=>m.id===t);r&&(a.textContent=`Team for "${r.projectName}"`);const d=c.filter(m=>String(m.projectId)===String(t));if(d.length===0)s.innerHTML='<p class="empty-state">No employees assigned to this project yet.</p>';else{let m='<ul class="team-list">';d.forEach(function(p){const g=i.find(f=>String(f.id)===String(p.employeeId));g&&(m+=`
                    <li class="team-item">
                        <div class="team-item__info">
                            <strong class="team-item__name">${g.name}</strong>
                            <span class="team-item__position">${g.position}</span>
                        </div>
                        <div class="team-item__actions">
                            <span class="team-item__capacity">${p.capacity}% load</span>
                            <button class="btn-remove-asm" 
                                    data-project-id="${t}" 
                                    data-employee-id="${g.id}" 
                                    title="Remove from project">×</button>
                        </div>
                    </li>
                `)}),m+="</ul>",s.innerHTML=m}o.onclick=function(m){if(m.target.classList.contains("btn-remove-asm")){const p=m.target.getAttribute("data-project-id"),g=m.target.getAttribute("data-employee-id");if(!confirm("Are you sure you want to remove this employee from the project?"))return;const f=u.getRawData(),b=f[n]||{},P=b.assignments||[];b.assignments=P.filter(function(j){return!(String(j.projectId)===String(p)&&String(j.employeeId)===String(g))}),u.saveData(f),console.log(`🗑 Сотрудник ${g} удален с проекта ${p}`),M(p,n),y("projects",n);return}(m.target.id==="details-modal-overlay"||m.target.id==="details-modal-close")&&(console.log("🔒 Закрываем окно подробностей команды"),o.classList.remove("modal--open"))},o.classList.add("modal--open")}function X(t,n){const o=document.getElementById("assign-modal"),s=document.getElementById("assign-project-id"),a=document.getElementById("assign-emp-select");if(console.log("Поиск элементов модалки:",{modal:o,projectInput:s,empSelect:a}),!o||!a){console.error("❌ Ошибка: Элементы модального окна не найдены в HTML!");return}s&&(s.value=t);const e=u.getMonthData(n),l=e&&e.employees?e.employees:[];if(console.log("Список сотрудников для модалки:",l),l.length===0)a.innerHTML='<option value="">-- No employees available --</option>';else{let r='<option value="">-- Select an employee --</option>';l.forEach(function(d){const m=d.name||"Unknown Name",p=d.position||"No Position";r+=`<option value="${d.id}">${m} (${p})</option>`}),a.innerHTML=r}const i=document.getElementById("assign-capacity-range"),c=document.getElementById("assign-range-value");i&&(i.value=50),c&&(c.textContent="50"),o.classList.add("modal--open"),console.log("🚀 Класс modal--open успешно добавлен!")}function y(t,n){const o=document.getElementById("table-container");if(!o)return;const s=u.getMonthData(n);if(t==="projects"){const a=Q(s.projects),e=z(s.projects);o.innerHTML=a+e,o.onclick=function(l){if(console.log("Кликнули по элементу:",l.target),l.target.classList.contains("btn-delete")){const c=l.target.getAttribute("data-id");G(c,n)}if(l.target.classList.contains("btn-assign")){console.log("Ура, поймали клик по кнопке Assign!");const c=l.target.getAttribute("data-id");X(c,n)}const i=l.target.closest(".clickable-capacity");if(i){const c=i.getAttribute("data-id");M(c,n)}}}else t==="employees"&&(o.innerHTML=Y(s.employees,n),o.onclick=function(a){if(a.target.classList.contains("btn-availability")){const e=a.target.getAttribute("data-id");console.log(`📅 Нажали календарь сотрудника с ID: ${e}`),x(e,n)}if(a.target.classList.contains("btn-delete--emp")){const e=a.target.getAttribute("data-id");J(e,n)}},o.ondblclick=function(a){const e=a.target;if(e.classList.contains("editable")&&!e.querySelector("input")){let m=function(){const p=d.value;U(c,r,p,n),y("employees",n)};var l=m;const i=e.textContent.replace(" $","").trim(),c=e.getAttribute("data-id"),r=e.getAttribute("data-field"),d=document.createElement("input");d.type=r==="salary"?"number":"text",d.value=i,d.className="table-inline-input",e.innerHTML="",e.appendChild(d),d.focus(),d.onkeydown=function(p){p.key==="Enter"&&m()},d.onblur=function(){m()}}})}function B(){const t=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+t.value}function Z(t){const n=document.querySelectorAll(".nav-button"),o=document.getElementById("page-title"),s=document.getElementById("add-entity-btn");n.forEach(function(i){i.classList.remove("nav-button--active")});const a=t.currentTarget;a.classList.add("nav-button--active");const e=a.getAttribute("data-tab");e==="projects"?(o.textContent="Projects",s.textContent="+ Add projects"):e==="employees"&&(o.textContent="Employees",s.textContent="+ Add employee"),console.log("Переключено на вкладку:",e);const l=B();y(e,l)}function L(){const n=document.querySelector(".nav-button--active").getAttribute("data-tab"),o=B();y(n,o),console.log("Период изменен на:",o)}function $(){const t=document.getElementById("project-panel");t&&t.classList.add("slide-panel--open")}function C(){const t=document.getElementById("project-panel");t&&t.classList.remove("slide-panel--open")}function K(){const t=document.getElementById("employee-panel");t&&t.classList.add("slide-panel--open")}function A(){const t=document.getElementById("employee-panel");t&&t.classList.remove("slide-panel--open")}function ee(){const t=document.getElementById("sidebar"),n=document.getElementById("sidebar-toggle"),o=document.querySelectorAll(".nav-button");document.querySelectorAll(".sidebar__nav-btn");const s=document.getElementById("month-select"),a=document.getElementById("year-select"),e=document.getElementById("add-entity-btn"),l=document.getElementById("project-panel-close"),i=document.getElementById("project-panel-overlay"),c=document.getElementById("employee-panel-close"),r=document.getElementById("employee-panel-overlay");if(!s||!a)return;const d=localStorage.getItem("app-selected-month"),m=localStorage.getItem("app-selected-year");d&&(s.value=d),m&&(a.value=m);function p(){return a.value+"-"+s.value}let g="projects";s.addEventListener("change",function(){localStorage.setItem("app-selected-month",s.value),console.log("📅 Месяц изменен на:",s.value),y(g,p())}),a.addEventListener("change",function(){localStorage.setItem("app-selected-year",a.value),console.log("📅 Год изменен на:",a.value),y(g,p())}),t&&n&&n.addEventListener("click",function(){t.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),o.forEach(function(f){f.addEventListener("click",Z)}),s&&a&&(s.addEventListener("change",L),a.addEventListener("change",L)),e&&e.addEventListener("click",$),l&&l.addEventListener("click",C),i&&i.addEventListener("click",C),e&&e.addEventListener("click",function(){const f=document.querySelector(".nav-button--active").getAttribute("data-tab");f==="projects"?$():f==="employees"&&K()}),c&&c.addEventListener("click",A),r&&r.addEventListener("click",A),y("projects",B())}function h(){const t=document.getElementById("proj-name"),n=document.getElementById("proj-company"),o=document.getElementById("proj-budget"),s=document.getElementById("proj-capacity"),a=document.getElementById("proj-submit"),e=t.value.trim().length>0,l=n.value.trim().length>0,i=Number(o.value)>0,c=Number(s.value)>0;e&&l&&i&&c?a.disabled=!1:a.disabled=!0}function te(t){t.preventDefault();const n=document.getElementById("proj-name"),o=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity"),e=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+e.value,r={id:"proj_"+Date.now(),projectName:n.value.trim(),companyName:o.value.trim(),budget:Number(s.value),capacity:Number(a.value)},d=u.getMonthData(i);d.projects.push(r);const m=u.getRawData();m[i]=d,u.saveData(m),console.log("✅ Новый проект успешно сохранен в Store:",r),y("projects",i),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const p=document.getElementById("project-panel");p&&p.classList.remove("slide-panel--open")}function ne(){const t=document.getElementById("project-form");if(t){const n=document.getElementById("proj-name"),o=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity");n.addEventListener("input",h),o.addEventListener("input",h),s.addEventListener("input",h),a.addEventListener("input",h),t.addEventListener("submit",te)}}function _(){const t=document.getElementById("emp-name"),n=document.getElementById("emp-position"),o=document.getElementById("emp-age"),s=document.getElementById("emp-salary"),a=document.getElementById("emp-submit"),e=document.getElementById("error-emp-age"),l=t.value.trim().length>0,i=n.value.trim().length>0,c=Number(s.value)>0,r=Number(o.value);let d=!1;o.value.trim()===""?e.textContent="":r<18?e.textContent="The employee must be over 18 years of age":(e.textContent="",d=!0),l&&i&&d&&c?a.disabled=!1:a.disabled=!0}function ae(t){t.preventDefault();const n=document.getElementById("emp-name"),o=document.getElementById("emp-position"),s=document.getElementById("emp-age"),a=document.getElementById("emp-salary"),e=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+e.value,c={id:"emp_"+Date.now(),name:n.value.trim(),position:o.value.trim(),age:Number(s.value),salary:Number(a.value)},r=u.getMonthData(i);r.employees.push(c);const d=u.getRawData();d[i]=r,u.saveData(d),console.log("✅ Новый сотрудник добавлен:",c),y("employees",i),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const m=document.getElementById("employee-panel");m&&m.classList.remove("slide-panel--open")}function oe(){const t=document.getElementById("employee-form");if(t){const n=document.getElementById("emp-name"),o=document.getElementById("emp-position"),s=document.getElementById("emp-age"),a=document.getElementById("emp-salary");n.addEventListener("input",_),o.addEventListener("input",_),s.addEventListener("input",_),a.addEventListener("input",_),t.addEventListener("submit",ae)}}function k(){const t=document.getElementById("assign-modal");t&&t.classList.remove("modal--open")}function se(){const t=document.getElementById("assign-modal"),n=document.getElementById("assign-capacity-range"),o=document.getElementById("assign-range-value"),s=document.getElementById("assign-form");if(!t)return;t.onclick=function(e){(e.target.id==="assign-modal-overlay"||e.target.id==="assign-modal-close")&&(console.log("🔒 Закрываем модальное окно..."),k())},n&&o&&(n.oninput=function(){o.textContent=n.value}),s&&(s.onsubmit=function(e){e.preventDefault();const l=document.getElementById("assign-project-id").value,i=document.getElementById("assign-emp-select").value,c=Number(n.value),r=document.getElementById("month-select"),m=document.getElementById("year-select").value+"-"+r.value;if(console.log("✏️ СОХРАНЯЕМ НАЗНАЧЕНИЕ. Ключ периода:",m),!i){alert("Please select an employee first!");return}const p=u.getMonthData(m);p.assignments||(p.assignments=[]);const g=p.assignments.find(function(b){return String(b.projectId)===String(l)&&String(b.employeeId)===String(i)});if(g)console.log("🔄 Сотрудник уже на проекте. Обновляем capacity с",g.capacity,"на",c),g.capacity=c;else{const b={projectId:l,employeeId:i,capacity:c};p.assignments.push(b),console.log("🔗 Новое назначение добавлено в Стор:",b)}const f=u.getRawData();f[m]=p,u.saveData(f),alert("Employee successfully assigned to the project!"),k(),renderCurrentTab("projects",m)});const a=document.getElementById("details-modal");a&&(a.onclick=function(e){(e.target.id==="details-modal-overlay"||e.target.id==="details-modal-close")&&a.classList.remove("modal--open")})}const D={"dashboard-app":`
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
`};class le{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const n=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${n.length}`),n.forEach(o=>{const s=o.getAttribute("data-component");this.loadComponent(o,s)})}loadComponent(n,o){console.log(`📥 Загружаю компонент: ${o}`),D[o]?(n.innerHTML=D[o],n.setAttribute("data-loaded","true"),this.loadedComponents.add(o),console.log(`✅ ${o} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${o}" не найден в components.js`),n.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${o}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(o=>{let s=!1;o.forEach(a=>{a.addedNodes.length&&a.addedNodes.forEach(e=>{e.nodeType===1&&e.querySelectorAll&&e.querySelectorAll("[data-component]").length>0&&(s=!0)})}),s&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new le().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const ie=u.getRawData();Object.keys(ie).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),u.saveData(T)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(D));console.log("📅 Данные за май 2026:",u.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),ee(),ne(),oe(),se()},0)});
