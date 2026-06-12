(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const e of a)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function s(a){const e={};return a.integrity&&(e.integrity=a.integrity),a.referrerPolicy&&(e.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?e.credentials="include":a.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(a){if(a.ep)return;a.ep=!0;const e=s(a);fetch(a.href,e)}})();const A="monthData",g={getRawData(){const n=localStorage.getItem(A);return n?JSON.parse(n):{}},saveData(n){const t=JSON.stringify(n);localStorage.setItem(A,t)},getMonthData(n){const t=this.getRawData();return t[n]?t[n]:{employees:[],projects:[]}}},O={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};let b=new Set,B=null,S="";function W(n,t){B=n,S=t;const s=document.getElementById("vacation-modal"),o=document.getElementById("vacation-modal-title"),a=document.getElementById("calendar-grid-container");if(!s||!a){console.error("❌ Элементы календаря не найдены в DOM");return}const e=t.split("-"),l=parseInt(e[0],10),i=parseInt(e[1],10),r=g.getMonthData(t).employees.find(d=>String(d.id)===String(n));if(r){o.textContent=`Availability for ${r.name}`;const d=r.vacations||[];b=new Set(d.map(Number))}else b=new Set;q(l,i,a),R(s,l,i,a),s.classList.add("modal--open"),console.log(`📅 Календарь открыт для сотрудника ${n} на период ${t}`)}function q(n,t,s){s.innerHTML=H(n,t),x(n,t)}function H(n,t){const s=new Date(n,t+1,0).getDate();let o=new Date(n,t,1).getDay()-1;o<0&&(o=6);const a=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];let e='<div class="calendar-grid">';a.forEach(l=>{e+=`<div class="calendar-header-cell ${l==="Sat"||l==="Sun"?"calendar-header-cell--weekend":""}">${l}</div>`});for(let l=0;l<o;l++)e+='<div class="calendar-day-cell calendar-day-cell--empty"></div>';for(let l=1;l<=s;l++){const c=new Date(n,t,l).getDay(),r=c===0||c===6;let d="calendar-day-cell calendar-day-target";r&&(d+=" calendar-day-cell--weekend"),b.has(l)&&(d+=" calendar-day-cell--selected"),e+=`<div class="${d}" data-day="${l}">${l}</div>`}return e+="</div>",e}function x(n,t){const s=new Date(n,t+1,0).getDate();let o=0,a=0;for(let r=1;r<=s;r++){const d=new Date(n,t,r).getDay();d===0||d===6||(o++,b.has(r)&&a++)}const e=o-a,l=document.getElementById("calendar-working-days");l&&(l.textContent=`Working Days: ${e}/${o} days`);const i=V(n,t),c=document.getElementById("calendar-vacation-ranges");c&&(c.textContent=i||"None")}function V(n,t){const s=Array.from(b).sort((i,c)=>i-c);if(s.length===0)return"";const o=[];let a=s[0],e=s[0];const l=i=>{const c=String(i).padStart(2,"0"),r=String(t+1).padStart(2,"0");return`${c}.${r}`};for(let i=1;i<s.length;i++){const c=s[i];let r=!1;if(c===e+1)r=!0;else{let d=!1;for(let m=e+1;m<c;m++){const p=new Date(n,t,m).getDay();if(p!==0&&p!==6){d=!0;break}}d||(r=!0)}r||(a===e?o.push(l(a)):o.push(`${l(a)}-${l(e)}`),a=c),e=c}return a===e?o.push(l(a)):o.push(`${l(a)}-${l(e)}`),o.join(", ")}function R(n,t,s,o){o.onclick=function(e){const l=e.target;if(!l.classList.contains("calendar-day-target"))return;const i=parseInt(l.getAttribute("data-day"),10);b.has(i)?(b.delete(i),l.classList.remove("calendar-day-cell--selected")):(b.add(i),l.classList.add("calendar-day-cell--selected")),x(t,s)},n.onclick=function(e){(e.target.id==="vacation-modal-overlay"||e.target.id==="vacation-modal-close")&&(n.classList.remove("modal--open"),console.log("🔒 Календарь закрыт"))};const a=document.getElementById("btn-save-vacation");a&&(a.onclick=function(){const e=g.getRawData(),c=((e[S]||{}).employees||[]).find(r=>String(r.id)===String(B));c&&(c.vacations=Array.from(b).sort((r,d)=>r-d),g.saveData(e),console.log(`💾 Отпуска сохранены для сотрудника ${B}:`,c.vacations),f("employees",S),n.classList.remove("modal--open"))})}function G(n,t){const s=new Date(n,t+1,0).getDate();let o=0;for(let a=1;a<=s;a++){const e=new Date(n,t,a).getDay();e===0||e===6||o++}return o}function J(n,t,s){if(!n||!Array.isArray(n)||n.length===0)return 0;let o=0;return n.forEach(a=>{const e=new Date(t,s,a).getDay();e===0||e===6||o++}),o}function _(n,t){const s=t.split("-"),o=parseInt(s[0],10),a=parseInt(s[1],10),e=G(o,a),l=n.vacations||[],i=J(l,o,a);if(e===0)return 0;const c=i/e;return Math.round(c*100)/100}function D(n,t){const o=100*(1-_(n,t));return Math.round(o)}function j(n,t,s,o){const a=t.filter(function(r){return String(r.projectId)===String(n.id)});let e=0,l=0;a.forEach(function(r){const d=s.find(function(m){return String(m.id)===String(r.employeeId)});if(d){e+=r.capacity;const m=_(d,o),p=d.salary*(r.capacity/100)*(1-m);l+=p}});const i=n.budget,c=i-l;return{effectiveCapacity:Math.round(e),expenses:Math.round(l),revenue:Math.round(i),profit:Math.round(c)}}function U(n,t,s,o){let a=0,e=0,l=0,i=0;return n.forEach(function(c){const r=j(c,t,s,o);a+=r.revenue,e+=r.effectiveCapacity,l+=r.expenses,i+=r.profit}),{totalBudget:a,totalCapacity:e,totalExpenses:l,totalProfit:i}}const u={tab:null,field:null,direction:"asc"};function z(n,t){if(!confirm("Are you sure you want to delete this project?"))return;const o=g.getMonthData(t),a=o.projects.filter(function(l){return l.id!==n});o.projects=a;const e=g.getRawData();e[t]=o,g.saveData(e),console.log(`❌ Проект с ID ${n} успешно удален`),f("projects",t)}function Y(n,t){if(!confirm("Are you sure you want to remove this employee?"))return;const o=g.getMonthData(t);o.employees=o.employees.filter(function(e){return e.id!==n});const a=g.getRawData();a[t]=o,g.saveData(a),console.log(`❌ Сотрудник с ID ${n} удален`),f("employees",t)}function Q(n,t,s,o){const a=g.getMonthData(o),e=a.employees.find(l=>l.id===n);if(e){if(t==="salary"){const i=Number(s);if(isNaN(i)||i<=0){alert("Please enter the correct salary amount"),f("employees",o);return}e[t]=i}else{if(s.trim()===""){alert("The field cannot be empty"),f("employees",o);return}e[t]=s.trim()}const l=g.getRawData();l[o]=a,g.saveData(l),console.log(`📝 Сотрудник ${n}: поле ${t} обновлено на ${s}`)}}function X(n,t){const s=n.projects||[],o=n.assignments||[],a=n.employees||[];if(s.length===0)return'<p class="empty-state">There are no projects yet</p>';u.tab==="projects"&&u.field&&(s=[...s].sort(function(i,c){let r,d;if(u.field==="expenses"||u==="profit"||u.field==="effectiveCapacity"){const m=j(i,o,a,t),p=j(c,o,a,t);r=m[u.field],d=p[u.field]}else r=i[u.field],d=c[u.field];return typeof r=="string"?u.direction==="asc"?r.localeCompare(d):d.localeCompare(r):u.direction==="asc"?r-d:d-r}));function e(i){return u.tab==="projects"&&u.field===i?u.direction==="asc"?" ↑":" ↓":""}let l=` 
    <table class="table">
        <thead>
            <tr>
                <th class="sortable" data-sort="companyName">Company${e("companyName")}</th>
                <th class="sortable" data-sort="projectName">Project${e("projectName")}</th>
                <th class="sortable" data-sort="budget">Budget (Rev.)${e("budget")}</th>
                <th class="sortable" data-sort="effectiveCapacity">Capacity${e("effectiveCapacity")}</th>
                <th class="sortable" data-sort="expenses">Expenses${e("expenses")}</th>
                <th class="sortable" data-sort="profit">Profit${e("profit")}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;return s.forEach(function(i){const c=j(i,o,a,t),r=c.profit<0?"text-danger":"text-success";l+=`
            <tr>
                <td>${i.companyName}</td>
                <td>${i.projectName}</td>
                <td>${i.budget.toLocaleString()} $</td>
                <td class="clickable-capacity" data-id="${i.id}">
                    <span class="capacity-link">${c.effectiveCapacity} / ${i.capacity} p.</span>
                </td>
                <td>${c.expenses.toLocaleString()} $</td>
                <td class="${r}"><strong>${c.profit.toLocaleString()} $</strong></td>
                <td>
                    <button class="btn-assign" data-id="${i.id}">Assign</button>
                    <button class="btn-delete" data-id="${i.id}">Delete</button>
                </td>
            </tr>
        `}),l+="</tbody></table>",l}function Z(n,t){if(n.length===0)return'<p class="empty-state">No employees added yet</p>';let s=n;u.tab==="employees"&&u.field&&(s=[...n].sort(function(e,l){let i,c;return u.field==="vacationFactor"?(i=_(e,t),c=_(l,t)):u.field==="effectiveCapacity"?(i=D(e,t),c=D(l,t)):(i=e[u.field],c=l[u.field]),typeof i=="string"?u.direction==="asc"?i.localeCompare(c):c.localeCompare(i):u.direction==="asc"?i-c:c-i}));function o(e){return u.tab==="employees"&&u.field===e?u.direction==="asc"?" ↑":" ↓":""}let a=`
    <table class="table">
        <thead>
            <tr>
                <th class="sortable" data-sort="name">Name${o("name")}</th>
                <th class="sortable" data-sort="position">Position${o("position")}</th>
                <th class="sortable" data-sort="age">Age${o("age")}</th>
                <th class="sortable" data-sort="salary">Salary${o("salary")}</th>
                <th class="sortable" data-sort="vacationFactor">Vacation Factor${o("vacationFactor")}</th>
                <th class="sortable" data-sort="effectiveCapacity">Eff. Capacity${o("effectiveCapacity")}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;return s.forEach(function(e){const l=_(e,t),i=D(e,t);a+=`
            <tr>
                <td>${e.name}</td>
                <td class="editable" data-id="${e.id}" data-field="position">${e.position}</td>
                <td>${e.age} y.o.</td>
                <td class="editable" data-id="${e.id}" data-field="salary">${e.salary} $</td>
                <td><span class="badge badge--factor">${l}</span></td>
                <td><span class="badge badge--capacity">${i}%</span></td>
                <td>
                    <button class="btn-delete btn-delete--emp" data-id="${e.id}">Delete</button>
                    <button class="btn-availability" data-id="${e.id}">Availability</button>
                </td>
            </tr>
        `}),a+="</tbody></table>",a}function K(n,t){const s=n.projects||[],o=n.assignments||[],a=n.employees||[],e=s.length,l=U(s,o,a,t);return` 
        <div class="fin-summary">
            <div class="fin-card">
                <span class="fin-card__title">Active Projects</span>
                <span class="fin-card__value">${e}</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Revenue</span>
                <span class="fin-card__value">${l.totalBudget.toLocaleString()} $</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Expenses</span>
                <span class="fin-card__value">${l.totalExpenses.toLocaleString()} $</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Profit</span>
                <span class="fin-card__value">${l.totalProfit.toLocaleString()} $</span>
            </div>
        </div>
        `}function T(n,t){console.log("📖 ЧИТАЕМ НАЗНАЧЕНИЯ. Ключ периода:",t);const s=document.getElementById("details-modal"),o=document.getElementById("details-modal-body"),a=document.getElementById("details-modal-title");if(!s||!o)return;typeof g.loadFromLocalStorage=="function"&&g.loadFromLocalStorage();const e=g.getMonthData(t),l=e.projects||[],i=e.employees||[],c=e.assignments||[];console.log("Проверяем, что пришло из базы для проекта:",{projectId:n,allAssignmentsInMonth:c,filtered:c.filter(m=>m.projectId===n)});const r=l.find(m=>m.id===n);r&&(a.textContent=`Team for "${r.projectName}"`);const d=c.filter(m=>String(m.projectId)===String(n));if(d.length===0)o.innerHTML='<p class="empty-state">No employees assigned to this project yet.</p>';else{let m='<ul class="team-list">';d.forEach(function(p){const y=i.find(v=>String(v.id)===String(p.employeeId));y&&(m+=`
                    <li class="team-item">
                        <div class="team-item__info">
                            <strong class="team-item__name">${y.name}</strong>
                            <span class="team-item__position">${y.position}</span>
                        </div>
                        <div class="team-item__actions">
                            <span class="team-item__capacity">${p.capacity}% load</span>
                            <button class="btn-remove-asm" 
                                    data-project-id="${n}" 
                                    data-employee-id="${y.id}" 
                                    title="Remove from project">×</button>
                        </div>
                    </li>
                `)}),m+="</ul>",o.innerHTML=m}s.onclick=function(m){if(m.target.classList.contains("btn-remove-asm")){const p=m.target.getAttribute("data-project-id"),y=m.target.getAttribute("data-employee-id");if(!confirm("Are you sure you want to remove this employee from the project?"))return;const v=g.getRawData(),h=v[t]||{},F=h.assignments||[];h.assignments=F.filter(function(C){return!(String(C.projectId)===String(p)&&String(C.employeeId)===String(y))}),g.saveData(v),console.log(`🗑 Сотрудник ${y} удален с проекта ${p}`),T(p,t),f("projects",t);return}(m.target.id==="details-modal-overlay"||m.target.id==="details-modal-close")&&(console.log("🔒 Закрываем окно подробностей команды"),s.classList.remove("modal--open"))},s.classList.add("modal--open")}function ee(n,t){const s=document.getElementById("assign-modal"),o=document.getElementById("assign-project-id"),a=document.getElementById("assign-emp-select");if(console.log("Поиск элементов модалки:",{modal:s,projectInput:o,empSelect:a}),!s||!a){console.error("❌ Ошибка: Элементы модального окна не найдены в HTML!");return}o&&(o.value=n);const e=g.getMonthData(t),l=e&&e.employees?e.employees:[];if(console.log("Список сотрудников для модалки:",l),l.length===0)a.innerHTML='<option value="">-- No employees available --</option>';else{let r='<option value="">-- Select an employee --</option>';l.forEach(function(d){const m=d.name||"Unknown Name",p=d.position||"No Position";r+=`<option value="${d.id}">${m} (${p})</option>`}),a.innerHTML=r}const i=document.getElementById("assign-capacity-range"),c=document.getElementById("assign-range-value");i&&(i.value=50),c&&(c.textContent="50"),s.classList.add("modal--open"),console.log("🚀 Класс modal--open успешно добавлен!")}function f(n,t){const s=document.getElementById("table-container");if(!s)return;const o=g.getMonthData(t);if(n==="projects"){const a=K(o,t),e=X(o,t);s.innerHTML=a+e,s.onclick=function(l){if(console.log("Кликнули по элементу:",l.target),l.target.classList.contains("sortable")){const c=l.target.getAttribute("data-sort");u.tab==="projects"&&u.field===c?u.direction=u.direction==="asc"?"desc":"asc":(u.tab="projects",u.field=c,u.direction="asc"),f("projects",t);return}if(l.target.classList.contains("btn-delete")){const c=l.target.getAttribute("data-id");z(c,t)}if(l.target.classList.contains("btn-assign")){console.log("Ура, поймали клик по кнопке Assign!");const c=l.target.getAttribute("data-id");ee(c,t)}const i=l.target.closest(".clickable-capacity");if(i){const c=i.getAttribute("data-id");T(c,t)}}}else n==="employees"&&(s.innerHTML=Z(o.employees,t),s.onclick=function(a){if(a.target.classList.contains("sortable")){const e=a.target.getAttribute("data-sort");u.tab==="employees"&&u.field===e?u.direction=u.direction==="asc"?"desc":"asc":(u.tab="employees",u.field=e,u.direction="asc"),f("employees",t);return}if(a.target.classList.contains("btn-availability")){const e=a.target.getAttribute("data-id");console.log(`📅 Нажали календарь сотрудника с ID: ${e}`),W(e,t)}if(a.target.classList.contains("btn-delete--emp")){const e=a.target.getAttribute("data-id");Y(e,t)}},s.ondblclick=function(a){const e=a.target;if(e.classList.contains("editable")&&!e.querySelector("input")){let m=function(){const p=d.value;Q(c,r,p,t),f("employees",t)};var l=m;const i=e.textContent.replace(" $","").trim(),c=e.getAttribute("data-id"),r=e.getAttribute("data-field"),d=document.createElement("input");d.type=r==="salary"?"number":"text",d.value=i,d.className="table-inline-input",e.innerHTML="",e.appendChild(d),d.focus(),d.onkeydown=function(p){p.key==="Enter"&&m()},d.onblur=function(){m()}}})}function L(){const n=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+n.value}function te(n){const t=document.querySelectorAll(".nav-button"),s=document.getElementById("page-title"),o=document.getElementById("add-entity-btn");t.forEach(function(i){i.classList.remove("nav-button--active")});const a=n.currentTarget;a.classList.add("nav-button--active");const e=a.getAttribute("data-tab");e==="projects"?(s.textContent="Projects",o.textContent="+ Add projects"):e==="employees"&&(s.textContent="Employees",o.textContent="+ Add employee"),console.log("Переключено на вкладку:",e);const l=L();f(e,l)}function k(){const t=document.querySelector(".nav-button--active").getAttribute("data-tab"),s=L();f(t,s),console.log("Период изменен на:",s)}function w(){const n=document.getElementById("project-panel");n&&n.classList.add("slide-panel--open")}function N(){const n=document.getElementById("project-panel");n&&n.classList.remove("slide-panel--open")}function ne(){const n=document.getElementById("employee-panel");n&&n.classList.add("slide-panel--open")}function M(){const n=document.getElementById("employee-panel");n&&n.classList.remove("slide-panel--open")}function ae(){const n=document.getElementById("sidebar"),t=document.getElementById("sidebar-toggle"),s=document.querySelectorAll(".nav-button");document.querySelectorAll(".sidebar__nav-btn");const o=document.getElementById("month-select"),a=document.getElementById("year-select"),e=document.getElementById("add-entity-btn"),l=document.getElementById("project-panel-close"),i=document.getElementById("project-panel-overlay"),c=document.getElementById("employee-panel-close"),r=document.getElementById("employee-panel-overlay");if(!o||!a)return;const d=localStorage.getItem("app-selected-month"),m=localStorage.getItem("app-selected-year");d&&(o.value=d),m&&(a.value=m);function p(){return a.value+"-"+o.value}let y="projects";o.addEventListener("change",function(){localStorage.setItem("app-selected-month",o.value),console.log("📅 Месяц изменен на:",o.value),f(y,p())}),a.addEventListener("change",function(){localStorage.setItem("app-selected-year",a.value),console.log("📅 Год изменен на:",a.value),f(y,p())}),n&&t&&t.addEventListener("click",function(){n.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),s.forEach(function(v){v.addEventListener("click",te)}),o&&a&&(o.addEventListener("change",k),a.addEventListener("change",k)),e&&e.addEventListener("click",w),l&&l.addEventListener("click",N),i&&i.addEventListener("click",N),e&&e.addEventListener("click",function(){const v=document.querySelector(".nav-button--active").getAttribute("data-tab");v==="projects"?w():v==="employees"&&ne()}),c&&c.addEventListener("click",M),r&&r.addEventListener("click",M),f("projects",L())}function E(){const n=document.getElementById("proj-name"),t=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),o=document.getElementById("proj-capacity"),a=document.getElementById("proj-submit"),e=n.value.trim().length>0,l=t.value.trim().length>0,i=Number(s.value)>0,c=Number(o.value)>0;e&&l&&i&&c?a.disabled=!1:a.disabled=!0}function oe(n){n.preventDefault();const t=document.getElementById("proj-name"),s=document.getElementById("proj-company"),o=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity"),e=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+e.value,r={id:"proj_"+Date.now(),projectName:t.value.trim(),companyName:s.value.trim(),budget:Number(o.value),capacity:Number(a.value)},d=g.getMonthData(i);d.projects.push(r);const m=g.getRawData();m[i]=d,g.saveData(m),console.log("✅ Новый проект успешно сохранен в Store:",r),f("projects",i),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const p=document.getElementById("project-panel");p&&p.classList.remove("slide-panel--open")}function se(){const n=document.getElementById("project-form");if(n){const t=document.getElementById("proj-name"),s=document.getElementById("proj-company"),o=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity");t.addEventListener("input",E),s.addEventListener("input",E),o.addEventListener("input",E),a.addEventListener("input",E),n.addEventListener("submit",oe)}}function I(){const n=document.getElementById("emp-name"),t=document.getElementById("emp-position"),s=document.getElementById("emp-age"),o=document.getElementById("emp-salary"),a=document.getElementById("emp-submit"),e=document.getElementById("error-emp-age"),l=n.value.trim().length>0,i=t.value.trim().length>0,c=Number(o.value)>0,r=Number(s.value);let d=!1;s.value.trim()===""?e.textContent="":r<18?e.textContent="The employee must be over 18 years of age":(e.textContent="",d=!0),l&&i&&d&&c?a.disabled=!1:a.disabled=!0}function le(n){n.preventDefault();const t=document.getElementById("emp-name"),s=document.getElementById("emp-position"),o=document.getElementById("emp-age"),a=document.getElementById("emp-salary"),e=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+e.value,c={id:"emp_"+Date.now(),name:t.value.trim(),position:s.value.trim(),age:Number(o.value),salary:Number(a.value)},r=g.getMonthData(i);r.employees.push(c);const d=g.getRawData();d[i]=r,g.saveData(d),console.log("✅ Новый сотрудник добавлен:",c),f("employees",i),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const m=document.getElementById("employee-panel");m&&m.classList.remove("slide-panel--open")}function ie(){const n=document.getElementById("employee-form");if(n){const t=document.getElementById("emp-name"),s=document.getElementById("emp-position"),o=document.getElementById("emp-age"),a=document.getElementById("emp-salary");t.addEventListener("input",I),s.addEventListener("input",I),o.addEventListener("input",I),a.addEventListener("input",I),n.addEventListener("submit",le)}}function P(){const n=document.getElementById("assign-modal");n&&n.classList.remove("modal--open")}function ce(){const n=document.getElementById("assign-modal"),t=document.getElementById("assign-capacity-range"),s=document.getElementById("assign-range-value"),o=document.getElementById("assign-form");if(!n)return;n.onclick=function(e){(e.target.id==="assign-modal-overlay"||e.target.id==="assign-modal-close")&&(console.log("🔒 Закрываем модальное окно..."),P())},t&&s&&(t.oninput=function(){s.textContent=t.value}),o&&(o.onsubmit=function(e){e.preventDefault();const l=document.getElementById("assign-project-id").value,i=document.getElementById("assign-emp-select").value,c=Number(t.value),r=document.getElementById("month-select"),m=document.getElementById("year-select").value+"-"+r.value;if(console.log("✏️ СОХРАНЯЕМ НАЗНАЧЕНИЕ. Ключ периода:",m),!i){alert("Please select an employee first!");return}const p=g.getMonthData(m);p.assignments||(p.assignments=[]);const y=p.assignments.find(function(h){return String(h.projectId)===String(l)&&String(h.employeeId)===String(i)});if(y)console.log("🔄 Сотрудник уже на проекте. Обновляем capacity с",y.capacity,"на",c),y.capacity=c;else{const h={projectId:l,employeeId:i,capacity:c};p.assignments.push(h),console.log("🔗 Новое назначение добавлено в Стор:",h)}const v=g.getRawData();v[m]=p,g.saveData(v),alert("Employee successfully assigned to the project!"),P(),renderCurrentTab("projects",m)});const a=document.getElementById("details-modal");a&&(a.onclick=function(e){(e.target.id==="details-modal-overlay"||e.target.id==="details-modal-close")&&a.classList.remove("modal--open")})}const $={"dashboard-app":`
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
`};class re{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const t=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${t.length}`),t.forEach(s=>{const o=s.getAttribute("data-component");this.loadComponent(s,o)})}loadComponent(t,s){console.log(`📥 Загружаю компонент: ${s}`),$[s]?(t.innerHTML=$[s],t.setAttribute("data-loaded","true"),this.loadedComponents.add(s),console.log(`✅ ${s} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${s}" не найден в components.js`),t.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${s}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(s=>{let o=!1;s.forEach(a=>{a.addedNodes.length&&a.addedNodes.forEach(e=>{e.nodeType===1&&e.querySelectorAll&&e.querySelectorAll("[data-component]").length>0&&(o=!0)})}),o&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new re().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const de=g.getRawData();Object.keys(de).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),g.saveData(O)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys($));console.log("📅 Данные за май 2026:",g.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),ae(),se(),ie(),ce()},0)});
