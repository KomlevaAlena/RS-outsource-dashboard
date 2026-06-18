(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const e of a)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(a){const e={};return a.integrity&&(e.integrity=a.integrity),a.referrerPolicy&&(e.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?e.credentials="include":a.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(a){if(a.ep)return;a.ep=!0;const e=o(a);fetch(a.href,e)}})();const w="monthData",g={getRawData(){const n=localStorage.getItem(w);return n?JSON.parse(n):{}},saveData(n){const t=JSON.stringify(n);localStorage.setItem(w,t)},getMonthData(n){const t=this.getRawData();return t[n]?t[n]:{employees:[],projects:[]}}},q={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};let b=new Set,S=null,$="";function R(n,t){S=n,$=t;const o=document.getElementById("vacation-modal"),s=document.getElementById("vacation-modal-title"),a=document.getElementById("calendar-grid-container");if(!o||!a){console.error("❌ Элементы календаря не найдены в DOM");return}const e=t.split("-"),l=parseInt(e[0],10),i=parseInt(e[1],10),r=g.getMonthData(t).employees.find(d=>String(d.id)===String(n));if(r){s.textContent=`Availability for ${r.name}`;const d=r.vacations||[];b=new Set(d.map(Number))}else b=new Set;V(l,i,a),U(o,l,i,a),o.classList.add("modal--open"),console.log(`📅 Календарь открыт для сотрудника ${n} на период ${t}`)}function V(n,t,o){o.innerHTML=G(n,t),O(n,t)}function G(n,t){const o=new Date(n,t+1,0).getDate();let s=new Date(n,t,1).getDay()-1;s<0&&(s=6);const a=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];let e='<div class="calendar-grid">';a.forEach(l=>{e+=`<div class="calendar-header-cell ${l==="Sat"||l==="Sun"?"calendar-header-cell--weekend":""}">${l}</div>`});for(let l=0;l<s;l++)e+='<div class="calendar-day-cell calendar-day-cell--empty"></div>';for(let l=1;l<=o;l++){const c=new Date(n,t,l).getDay(),r=c===0||c===6;let d="calendar-day-cell calendar-day-target";r&&(d+=" calendar-day-cell--weekend"),b.has(l)&&(d+=" calendar-day-cell--selected"),e+=`<div class="${d}" data-day="${l}">${l}</div>`}return e+="</div>",e}function O(n,t){const o=new Date(n,t+1,0).getDate();let s=0,a=0;for(let r=1;r<=o;r++){const d=new Date(n,t,r).getDay();d===0||d===6||(s++,b.has(r)&&a++)}const e=s-a,l=document.getElementById("calendar-working-days");l&&(l.textContent=`Working Days: ${e}/${s} days`);const i=J(n,t),c=document.getElementById("calendar-vacation-ranges");c&&(c.textContent=i||"None")}function J(n,t){const o=Array.from(b).sort((i,c)=>i-c);if(o.length===0)return"";const s=[];let a=o[0],e=o[0];const l=i=>{const c=String(i).padStart(2,"0"),r=String(t+1).padStart(2,"0");return`${c}.${r}`};for(let i=1;i<o.length;i++){const c=o[i];let r=!1;if(c===e+1)r=!0;else{let d=!1;for(let m=e+1;m<c;m++){const p=new Date(n,t,m).getDay();if(p!==0&&p!==6){d=!0;break}}d||(r=!0)}r||(a===e?s.push(l(a)):s.push(`${l(a)}-${l(e)}`),a=c),e=c}return a===e?s.push(l(a)):s.push(`${l(a)}-${l(e)}`),s.join(", ")}function U(n,t,o,s){s.onclick=function(e){const l=e.target;if(!l.classList.contains("calendar-day-target"))return;const i=parseInt(l.getAttribute("data-day"),10);b.has(i)?(b.delete(i),l.classList.remove("calendar-day-cell--selected")):(b.add(i),l.classList.add("calendar-day-cell--selected")),O(t,o)},n.onclick=function(e){(e.target.id==="vacation-modal-overlay"||e.target.id==="vacation-modal-close")&&(n.classList.remove("modal--open"),console.log("🔒 Календарь закрыт"))};const a=document.getElementById("btn-save-vacation");a&&(a.onclick=function(){const e=g.getRawData(),c=((e[$]||{}).employees||[]).find(r=>String(r.id)===String(S));c&&(c.vacations=Array.from(b).sort((r,d)=>r-d),g.saveData(e),console.log(`💾 Отпуска сохранены для сотрудника ${S}:`,c.vacations),f("employees",$),n.classList.remove("modal--open"))})}function z(n,t){const o=new Date(n,t+1,0).getDate();let s=0;for(let a=1;a<=o;a++){const e=new Date(n,t,a).getDay();e===0||e===6||s++}return s}function Y(n,t,o){if(!n||!Array.isArray(n)||n.length===0)return 0;let s=0;return n.forEach(a=>{const e=new Date(t,o,a).getDay();e===0||e===6||s++}),s}function _(n,t){const o=t.split("-"),s=parseInt(o[0],10),a=parseInt(o[1],10),e=z(s,a),l=n.vacations||[],i=Y(l,s,a);if(e===0)return 0;const c=i/e;return Math.round(c*100)/100}function B(n,t){const s=100*(1-_(n,t));return Math.round(s)}function j(n,t,o,s){const a=t.filter(function(r){return String(r.projectId)===String(n.id)});let e=0,l=0;a.forEach(function(r){const d=o.find(function(m){return String(m.id)===String(r.employeeId)});if(d){e+=r.capacity;const m=_(d,s),p=d.salary*(r.capacity/100)*(1-m);l+=p}});const i=n.budget,c=i-l;return{effectiveCapacity:Math.round(e),expenses:Math.round(l),revenue:Math.round(i),profit:Math.round(c)}}function Q(n,t,o,s){let a=0,e=0,l=0,i=0;return n.forEach(function(c){const r=j(c,t,o,s);a+=r.revenue,e+=r.effectiveCapacity,l+=r.expenses,i+=r.profit}),{totalBudget:a,totalCapacity:e,totalExpenses:l,totalProfit:i}}const u={tab:null,field:null,direction:"asc"},D={projectSearch:"",employeePosition:""};function X(n,t){if(!confirm("Are you sure you want to delete this project?"))return;const s=g.getMonthData(t),a=s.projects.filter(function(l){return l.id!==n});s.projects=a;const e=g.getRawData();e[t]=s,g.saveData(e),console.log(`❌ Проект с ID ${n} успешно удален`),f("projects",t)}function Z(n,t){if(!confirm("Are you sure you want to remove this employee?"))return;const s=g.getMonthData(t);s.employees=s.employees.filter(function(e){return e.id!==n});const a=g.getRawData();a[t]=s,g.saveData(a),console.log(`❌ Сотрудник с ID ${n} удален`),f("employees",t)}function K(n,t,o,s){const a=g.getMonthData(s),e=a.employees.find(l=>l.id===n);if(e){if(t==="salary"){const i=Number(o);if(isNaN(i)||i<=0){alert("Please enter the correct salary amount"),f("employees",s);return}e[t]=i}else{if(o.trim()===""){alert("The field cannot be empty"),f("employees",s);return}e[t]=o.trim()}const l=g.getRawData();l[s]=a,g.saveData(l),console.log(`📝 Сотрудник ${n}: поле ${t} обновлено на ${o}`)}}function k(n,t){let o=n.projects||[];const s=n.assignments||[],a=n.employees||[];if(o.length===0)return'<p class="empty-state">There are no projects yet</p>';if(D.projectSearch.trim()!==""){const i=D.projectSearch.toLowerCase().trim();o=o.filter(function(c){const r=c.projectName?c.projectName.toLowerCase().includes(i):!1,d=c.companyName?c.companyName.toLowerCase().includes(i):!1;return r||d})}u.tab==="projects"&&u.field&&(o=[...o].sort(function(i,c){let r,d;if(u.field==="expenses"||u==="profit"||u.field==="effectiveCapacity"){const m=j(i,s,a,t),p=j(c,s,a,t);r=m[u.field],d=p[u.field]}else r=i[u.field],d=c[u.field];return typeof r=="string"?u.direction==="asc"?r.localeCompare(d):d.localeCompare(r):u.direction==="asc"?r-d:d-r}));function e(i){return u.tab==="projects"&&u.field===i?u.direction==="asc"?" ↑":" ↓":""}let l=`
    <div class="table-actions">
        <input type="text" 
               id="project-search-input" 
               class="form__input form__input--search" 
               placeholder="🔍 Search by project or company..." 
               value="${D.projectSearch}">
    </div>
    `;return o.length===0?(l+='<p class="empty-state">No matching projects found</p>',l):(l+=` 
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
    `,o.forEach(function(i){const c=j(i,s,a,t),r=c.profit<0?"text-danger":"text-success";l+=`
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
        `}),l+="</tbody></table>",l)}function ee(n,t){if(n.length===0)return'<p class="empty-state">No employees added yet</p>';let o=n;u.tab==="employees"&&u.field&&(o=[...n].sort(function(e,l){let i,c;return u.field==="vacationFactor"?(i=_(e,t),c=_(l,t)):u.field==="effectiveCapacity"?(i=B(e,t),c=B(l,t)):(i=e[u.field],c=l[u.field]),typeof i=="string"?u.direction==="asc"?i.localeCompare(c):c.localeCompare(i):u.direction==="asc"?i-c:c-i}));function s(e){return u.tab==="employees"&&u.field===e?u.direction==="asc"?" ↑":" ↓":""}let a=`
    <table class="table">
        <thead>
            <tr>
                <th class="sortable" data-sort="name">Name${s("name")}</th>
                <th class="sortable" data-sort="position">Position${s("position")}</th>
                <th class="sortable" data-sort="age">Age${s("age")}</th>
                <th class="sortable" data-sort="salary">Salary${s("salary")}</th>
                <th class="sortable" data-sort="vacationFactor">Vacation Factor${s("vacationFactor")}</th>
                <th class="sortable" data-sort="effectiveCapacity">Eff. Capacity${s("effectiveCapacity")}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;return o.forEach(function(e){const l=_(e,t),i=B(e,t);a+=`
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
        `}),a+="</tbody></table>",a}function N(n,t){const o=n.projects||[],s=n.assignments||[],a=n.employees||[],e=o.length,l=Q(o,s,a,t);return` 
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
        `}function W(n,t){console.log("📖 ЧИТАЕМ НАЗНАЧЕНИЯ. Ключ периода:",t);const o=document.getElementById("details-modal"),s=document.getElementById("details-modal-body"),a=document.getElementById("details-modal-title");if(!o||!s)return;typeof g.loadFromLocalStorage=="function"&&g.loadFromLocalStorage();const e=g.getMonthData(t),l=e.projects||[],i=e.employees||[],c=e.assignments||[];console.log("Проверяем, что пришло из базы для проекта:",{projectId:n,allAssignmentsInMonth:c,filtered:c.filter(m=>m.projectId===n)});const r=l.find(m=>m.id===n);r&&(a.textContent=`Team for "${r.projectName}"`);const d=c.filter(m=>String(m.projectId)===String(n));if(d.length===0)s.innerHTML='<p class="empty-state">No employees assigned to this project yet.</p>';else{let m='<ul class="team-list">';d.forEach(function(p){const y=i.find(v=>String(v.id)===String(p.employeeId));y&&(m+=`
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
                `)}),m+="</ul>",s.innerHTML=m}o.onclick=function(m){if(m.target.classList.contains("btn-remove-asm")){const p=m.target.getAttribute("data-project-id"),y=m.target.getAttribute("data-employee-id");if(!confirm("Are you sure you want to remove this employee from the project?"))return;const v=g.getRawData(),h=v[t]||{},H=h.assignments||[];h.assignments=H.filter(function(A){return!(String(A.projectId)===String(p)&&String(A.employeeId)===String(y))}),g.saveData(v),console.log(`🗑 Сотрудник ${y} удален с проекта ${p}`),W(p,t),f("projects",t);return}(m.target.id==="details-modal-overlay"||m.target.id==="details-modal-close")&&(console.log("🔒 Закрываем окно подробностей команды"),o.classList.remove("modal--open"))},o.classList.add("modal--open")}function te(n,t){const o=document.getElementById("assign-modal"),s=document.getElementById("assign-project-id"),a=document.getElementById("assign-emp-select");if(console.log("Поиск элементов модалки:",{modal:o,projectInput:s,empSelect:a}),!o||!a){console.error("❌ Ошибка: Элементы модального окна не найдены в HTML!");return}s&&(s.value=n);const e=g.getMonthData(t),l=e&&e.employees?e.employees:[];if(console.log("Список сотрудников для модалки:",l),l.length===0)a.innerHTML='<option value="">-- No employees available --</option>';else{let r='<option value="">-- Select an employee --</option>';l.forEach(function(d){const m=d.name||"Unknown Name",p=d.position||"No Position";r+=`<option value="${d.id}">${m} (${p})</option>`}),a.innerHTML=r}const i=document.getElementById("assign-capacity-range"),c=document.getElementById("assign-range-value");i&&(i.value=50),c&&(c.textContent="50"),o.classList.add("modal--open"),console.log("🚀 Класс modal--open успешно добавлен!")}function f(n,t){const o=document.getElementById("table-container");if(!o)return;const s=g.getMonthData(t);if(n==="projects"){const a=N(s,t),e=k(s,t);o.innerHTML=a+e,o.onclick=function(l){if(console.log("Кликнули по элементу:",l.target),l.target.classList.contains("sortable")){const c=l.target.getAttribute("data-sort");u.tab==="projects"&&u.field===c?u.direction=u.direction==="asc"?"desc":"asc":(u.tab="projects",u.field=c,u.direction="asc"),f("projects",t);return}if(l.target.classList.contains("btn-delete")){const c=l.target.getAttribute("data-id");X(c,t)}if(l.target.classList.contains("btn-assign")){console.log("Ура, поймали клик по кнопке Assign!");const c=l.target.getAttribute("data-id");te(c,t)}const i=l.target.closest(".clickable-capacity");if(i){const c=i.getAttribute("data-id");W(c,t)}},o.oninput=function(l){if(l.target.id==="project-search-input"){D.projectSearch=l.target.value;const i=N(s,t),c=k(s,t);o.innerHTML=i+c;const r=document.getElementById("project-search-input");r&&(r.focus(),r.setSelectionRange(r.value.length,r.value.length))}}}else n==="employees"&&(o.innerHTML=ee(s.employees,t),o.onclick=function(a){if(a.target.classList.contains("sortable")){const e=a.target.getAttribute("data-sort");u.tab==="employees"&&u.field===e?u.direction=u.direction==="asc"?"desc":"asc":(u.tab="employees",u.field=e,u.direction="asc"),f("employees",t);return}if(a.target.classList.contains("btn-availability")){const e=a.target.getAttribute("data-id");console.log(`📅 Нажали календарь сотрудника с ID: ${e}`),R(e,t)}if(a.target.classList.contains("btn-delete--emp")){const e=a.target.getAttribute("data-id");Z(e,t)}},o.ondblclick=function(a){const e=a.target;if(e.classList.contains("editable")&&!e.querySelector("input")){let m=function(){const p=d.value;K(c,r,p,t),f("employees",t)};var l=m;const i=e.textContent.replace(" $","").trim(),c=e.getAttribute("data-id"),r=e.getAttribute("data-field"),d=document.createElement("input");d.type=r==="salary"?"number":"text",d.value=i,d.className="table-inline-input",e.innerHTML="",e.appendChild(d),d.focus(),d.onkeydown=function(p){p.key==="Enter"&&m()},d.onblur=function(){m()}}})}function C(){const n=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+n.value}function ne(n){const t=document.querySelectorAll(".nav-button"),o=document.getElementById("page-title"),s=document.getElementById("add-entity-btn");t.forEach(function(i){i.classList.remove("nav-button--active")});const a=n.currentTarget;a.classList.add("nav-button--active");const e=a.getAttribute("data-tab");e==="projects"?(o.textContent="Projects",s.textContent="+ Add projects"):e==="employees"&&(o.textContent="Employees",s.textContent="+ Add employee"),console.log("Переключено на вкладку:",e);const l=C();f(e,l)}function M(){const t=document.querySelector(".nav-button--active").getAttribute("data-tab"),o=C();f(t,o),console.log("Период изменен на:",o)}function P(){const n=document.getElementById("project-panel");n&&n.classList.add("slide-panel--open")}function x(){const n=document.getElementById("project-panel");n&&n.classList.remove("slide-panel--open")}function ae(){const n=document.getElementById("employee-panel");n&&n.classList.add("slide-panel--open")}function T(){const n=document.getElementById("employee-panel");n&&n.classList.remove("slide-panel--open")}function oe(){const n=document.getElementById("sidebar"),t=document.getElementById("sidebar-toggle"),o=document.querySelectorAll(".nav-button");document.querySelectorAll(".sidebar__nav-btn");const s=document.getElementById("month-select"),a=document.getElementById("year-select"),e=document.getElementById("add-entity-btn"),l=document.getElementById("project-panel-close"),i=document.getElementById("project-panel-overlay"),c=document.getElementById("employee-panel-close"),r=document.getElementById("employee-panel-overlay");if(!s||!a)return;const d=localStorage.getItem("app-selected-month"),m=localStorage.getItem("app-selected-year");d&&(s.value=d),m&&(a.value=m);function p(){return a.value+"-"+s.value}let y="projects";s.addEventListener("change",function(){localStorage.setItem("app-selected-month",s.value),console.log("📅 Месяц изменен на:",s.value),f(y,p())}),a.addEventListener("change",function(){localStorage.setItem("app-selected-year",a.value),console.log("📅 Год изменен на:",a.value),f(y,p())}),n&&t&&t.addEventListener("click",function(){n.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),o.forEach(function(v){v.addEventListener("click",ne)}),s&&a&&(s.addEventListener("change",M),a.addEventListener("change",M)),e&&e.addEventListener("click",P),l&&l.addEventListener("click",x),i&&i.addEventListener("click",x),e&&e.addEventListener("click",function(){const v=document.querySelector(".nav-button--active").getAttribute("data-tab");v==="projects"?P():v==="employees"&&ae()}),c&&c.addEventListener("click",T),r&&r.addEventListener("click",T),f("projects",C())}function E(){const n=document.getElementById("proj-name"),t=document.getElementById("proj-company"),o=document.getElementById("proj-budget"),s=document.getElementById("proj-capacity"),a=document.getElementById("proj-submit"),e=n.value.trim().length>0,l=t.value.trim().length>0,i=Number(o.value)>0,c=Number(s.value)>0;e&&l&&i&&c?a.disabled=!1:a.disabled=!0}function se(n){n.preventDefault();const t=document.getElementById("proj-name"),o=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity"),e=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+e.value,r={id:"proj_"+Date.now(),projectName:t.value.trim(),companyName:o.value.trim(),budget:Number(s.value),capacity:Number(a.value)},d=g.getMonthData(i);d.projects.push(r);const m=g.getRawData();m[i]=d,g.saveData(m),console.log("✅ Новый проект успешно сохранен в Store:",r),f("projects",i),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const p=document.getElementById("project-panel");p&&p.classList.remove("slide-panel--open")}function le(){const n=document.getElementById("project-form");if(n){const t=document.getElementById("proj-name"),o=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity");t.addEventListener("input",E),o.addEventListener("input",E),s.addEventListener("input",E),a.addEventListener("input",E),n.addEventListener("submit",se)}}function I(){const n=document.getElementById("emp-name"),t=document.getElementById("emp-position"),o=document.getElementById("emp-age"),s=document.getElementById("emp-salary"),a=document.getElementById("emp-submit"),e=document.getElementById("error-emp-age"),l=n.value.trim().length>0,i=t.value.trim().length>0,c=Number(s.value)>0,r=Number(o.value);let d=!1;o.value.trim()===""?e.textContent="":r<18?e.textContent="The employee must be over 18 years of age":(e.textContent="",d=!0),l&&i&&d&&c?a.disabled=!1:a.disabled=!0}function ie(n){n.preventDefault();const t=document.getElementById("emp-name"),o=document.getElementById("emp-position"),s=document.getElementById("emp-age"),a=document.getElementById("emp-salary"),e=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+e.value,c={id:"emp_"+Date.now(),name:t.value.trim(),position:o.value.trim(),age:Number(s.value),salary:Number(a.value)},r=g.getMonthData(i);r.employees.push(c);const d=g.getRawData();d[i]=r,g.saveData(d),console.log("✅ Новый сотрудник добавлен:",c),f("employees",i),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const m=document.getElementById("employee-panel");m&&m.classList.remove("slide-panel--open")}function ce(){const n=document.getElementById("employee-form");if(n){const t=document.getElementById("emp-name"),o=document.getElementById("emp-position"),s=document.getElementById("emp-age"),a=document.getElementById("emp-salary");t.addEventListener("input",I),o.addEventListener("input",I),s.addEventListener("input",I),a.addEventListener("input",I),n.addEventListener("submit",ie)}}function F(){const n=document.getElementById("assign-modal");n&&n.classList.remove("modal--open")}function re(){const n=document.getElementById("assign-modal"),t=document.getElementById("assign-capacity-range"),o=document.getElementById("assign-range-value"),s=document.getElementById("assign-form");if(!n)return;n.onclick=function(e){(e.target.id==="assign-modal-overlay"||e.target.id==="assign-modal-close")&&(console.log("🔒 Закрываем модальное окно..."),F())},t&&o&&(t.oninput=function(){o.textContent=t.value}),s&&(s.onsubmit=function(e){e.preventDefault();const l=document.getElementById("assign-project-id").value,i=document.getElementById("assign-emp-select").value,c=Number(t.value),r=document.getElementById("month-select"),m=document.getElementById("year-select").value+"-"+r.value;if(console.log("✏️ СОХРАНЯЕМ НАЗНАЧЕНИЕ. Ключ периода:",m),!i){alert("Please select an employee first!");return}const p=g.getMonthData(m);p.assignments||(p.assignments=[]);const y=p.assignments.find(function(h){return String(h.projectId)===String(l)&&String(h.employeeId)===String(i)});if(y)console.log("🔄 Сотрудник уже на проекте. Обновляем capacity с",y.capacity,"на",c),y.capacity=c;else{const h={projectId:l,employeeId:i,capacity:c};p.assignments.push(h),console.log("🔗 Новое назначение добавлено в Стор:",h)}const v=g.getRawData();v[m]=p,g.saveData(v),alert("Employee successfully assigned to the project!"),F(),renderCurrentTab("projects",m)});const a=document.getElementById("details-modal");a&&(a.onclick=function(e){(e.target.id==="details-modal-overlay"||e.target.id==="details-modal-close")&&a.classList.remove("modal--open")})}const L={"dashboard-app":`
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
`};class de{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const t=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${t.length}`),t.forEach(o=>{const s=o.getAttribute("data-component");this.loadComponent(o,s)})}loadComponent(t,o){console.log(`📥 Загружаю компонент: ${o}`),L[o]?(t.innerHTML=L[o],t.setAttribute("data-loaded","true"),this.loadedComponents.add(o),console.log(`✅ ${o} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${o}" не найден в components.js`),t.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${o}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(o=>{let s=!1;o.forEach(a=>{a.addedNodes.length&&a.addedNodes.forEach(e=>{e.nodeType===1&&e.querySelectorAll&&e.querySelectorAll("[data-component]").length>0&&(s=!0)})}),s&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new de().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const me=g.getRawData();Object.keys(me).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),g.saveData(q)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(L));console.log("📅 Данные за май 2026:",g.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),oe(),le(),ce(),re()},0)});
