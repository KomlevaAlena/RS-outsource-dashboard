(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const e of n)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(n){const e={};return n.integrity&&(e.integrity=n.integrity),n.referrerPolicy&&(e.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?e.credentials="include":n.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function i(n){if(n.ep)return;n.ep=!0;const e=o(n);fetch(n.href,e)}})();const w="monthData",g={getRawData(){const a=localStorage.getItem(w);return a?JSON.parse(a):{}},saveData(a){const t=JSON.stringify(a);localStorage.setItem(w,t)},getMonthData(a){const t=this.getRawData();return t[a]?t[a]:{employees:[],projects:[]}}},q={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};let b=new Set,S=null,$="";function R(a,t){S=a,$=t;const o=document.getElementById("vacation-modal"),i=document.getElementById("vacation-modal-title"),n=document.getElementById("calendar-grid-container");if(!o||!n){console.error("❌ Элементы календаря не найдены в DOM");return}const e=t.split("-"),l=parseInt(e[0],10),s=parseInt(e[1],10),r=g.getMonthData(t).employees.find(d=>String(d.id)===String(a));if(r){i.textContent=`Availability for ${r.name}`;const d=r.vacations||[];b=new Set(d.map(Number))}else b=new Set;V(l,s,n),U(o,l,s,n),o.classList.add("modal--open"),console.log(`📅 Календарь открыт для сотрудника ${a} на период ${t}`)}function V(a,t,o){o.innerHTML=G(a,t),O(a,t)}function G(a,t){const o=new Date(a,t+1,0).getDate();let i=new Date(a,t,1).getDay()-1;i<0&&(i=6);const n=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];let e='<div class="calendar-grid">';n.forEach(l=>{e+=`<div class="calendar-header-cell ${l==="Sat"||l==="Sun"?"calendar-header-cell--weekend":""}">${l}</div>`});for(let l=0;l<i;l++)e+='<div class="calendar-day-cell calendar-day-cell--empty"></div>';for(let l=1;l<=o;l++){const c=new Date(a,t,l).getDay(),r=c===0||c===6;let d="calendar-day-cell calendar-day-target";r&&(d+=" calendar-day-cell--weekend"),b.has(l)&&(d+=" calendar-day-cell--selected"),e+=`<div class="${d}" data-day="${l}">${l}</div>`}return e+="</div>",e}function O(a,t){const o=new Date(a,t+1,0).getDate();let i=0,n=0;for(let r=1;r<=o;r++){const d=new Date(a,t,r).getDay();d===0||d===6||(i++,b.has(r)&&n++)}const e=i-n,l=document.getElementById("calendar-working-days");l&&(l.textContent=`Working Days: ${e}/${i} days`);const s=J(a,t),c=document.getElementById("calendar-vacation-ranges");c&&(c.textContent=s||"None")}function J(a,t){const o=Array.from(b).sort((s,c)=>s-c);if(o.length===0)return"";const i=[];let n=o[0],e=o[0];const l=s=>{const c=String(s).padStart(2,"0"),r=String(t+1).padStart(2,"0");return`${c}.${r}`};for(let s=1;s<o.length;s++){const c=o[s];let r=!1;if(c===e+1)r=!0;else{let d=!1;for(let m=e+1;m<c;m++){const u=new Date(a,t,m).getDay();if(u!==0&&u!==6){d=!0;break}}d||(r=!0)}r||(n===e?i.push(l(n)):i.push(`${l(n)}-${l(e)}`),n=c),e=c}return n===e?i.push(l(n)):i.push(`${l(n)}-${l(e)}`),i.join(", ")}function U(a,t,o,i){i.onclick=function(e){const l=e.target;if(!l.classList.contains("calendar-day-target"))return;const s=parseInt(l.getAttribute("data-day"),10);b.has(s)?(b.delete(s),l.classList.remove("calendar-day-cell--selected")):(b.add(s),l.classList.add("calendar-day-cell--selected")),O(t,o)},a.onclick=function(e){(e.target.id==="vacation-modal-overlay"||e.target.id==="vacation-modal-close")&&(a.classList.remove("modal--open"),console.log("🔒 Календарь закрыт"))};const n=document.getElementById("btn-save-vacation");n&&(n.onclick=function(){const e=g.getRawData(),c=((e[$]||{}).employees||[]).find(r=>String(r.id)===String(S));c&&(c.vacations=Array.from(b).sort((r,d)=>r-d),g.saveData(e),console.log(`💾 Отпуска сохранены для сотрудника ${S}:`,c.vacations),f("employees",$),a.classList.remove("modal--open"))})}function z(a,t){const o=new Date(a,t+1,0).getDate();let i=0;for(let n=1;n<=o;n++){const e=new Date(a,t,n).getDay();e===0||e===6||i++}return i}function Y(a,t,o){if(!a||!Array.isArray(a)||a.length===0)return 0;let i=0;return a.forEach(n=>{const e=new Date(t,o,n).getDay();e===0||e===6||i++}),i}function E(a,t){const o=t.split("-"),i=parseInt(o[0],10),n=parseInt(o[1],10),e=z(i,n),l=a.vacations||[],s=Y(l,i,n);if(e===0)return 0;const c=s/e;return Math.round(c*100)/100}function B(a,t){const i=100*(1-E(a,t));return Math.round(i)}function D(a,t,o,i){const n=t.filter(function(r){return String(r.projectId)===String(a.id)});let e=0,l=0;n.forEach(function(r){const d=o.find(function(m){return String(m.id)===String(r.employeeId)});if(d){e+=r.capacity;const m=E(d,i),u=d.salary*(r.capacity/100)*(1-m);l+=u}});const s=a.budget,c=s-l;return{effectiveCapacity:Math.round(e),expenses:Math.round(l),revenue:Math.round(s),profit:Math.round(c)}}function Q(a,t,o,i){let n=0,e=0,l=0,s=0;return a.forEach(function(c){const r=D(c,t,o,i);n+=r.revenue,e+=r.effectiveCapacity,l+=r.expenses,s+=r.profit}),{totalBudget:n,totalCapacity:e,totalExpenses:l,totalProfit:s}}const p={tab:null,field:null,direction:"asc"},h={projectSearch:"",employeePosition:""};function X(a,t){if(!confirm("Are you sure you want to delete this project?"))return;const i=g.getMonthData(t),n=i.projects.filter(function(l){return l.id!==a});i.projects=n;const e=g.getRawData();e[t]=i,g.saveData(e),console.log(`❌ Проект с ID ${a} успешно удален`),f("projects",t)}function Z(a,t){if(!confirm("Are you sure you want to remove this employee?"))return;const i=g.getMonthData(t);i.employees=i.employees.filter(function(e){return e.id!==a});const n=g.getRawData();n[t]=i,g.saveData(n),console.log(`❌ Сотрудник с ID ${a} удален`),f("employees",t)}function K(a,t,o,i){const n=g.getMonthData(i),e=n.employees.find(l=>l.id===a);if(e){if(t==="salary"){const s=Number(o);if(isNaN(s)||s<=0){alert("Please enter the correct salary amount"),f("employees",i);return}e[t]=s}else{if(o.trim()===""){alert("The field cannot be empty"),f("employees",i);return}e[t]=o.trim()}const l=g.getRawData();l[i]=n,g.saveData(l),console.log(`📝 Сотрудник ${a}: поле ${t} обновлено на ${o}`)}}function N(a,t){let o=a.projects||[];const i=a.assignments||[],n=a.employees||[];if(o.length===0)return'<p class="empty-state">There are no projects yet</p>';if(h.projectSearch.trim()!==""){const s=h.projectSearch.toLowerCase().trim();o=o.filter(function(c){const r=c.projectName?c.projectName.toLowerCase().includes(s):!1,d=c.companyName?c.companyName.toLowerCase().includes(s):!1;return r||d})}p.tab==="projects"&&p.field&&(o=[...o].sort(function(s,c){let r,d;if(p.field==="expenses"||p==="profit"||p.field==="effectiveCapacity"){const m=D(s,i,n,t),u=D(c,i,n,t);r=m[p.field],d=u[p.field]}else r=s[p.field],d=c[p.field];return typeof r=="string"?p.direction==="asc"?r.localeCompare(d):d.localeCompare(r):p.direction==="asc"?r-d:d-r}));function e(s){return p.tab==="projects"&&p.field===s?p.direction==="asc"?" ↑":" ↓":""}let l=`
    <div class="table-actions">
        <input type="text" 
               id="project-search-input" 
               class="form__input form__input--search" 
               placeholder="🔍 Search by project or company..." 
               value="${h.projectSearch}">
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
    `,o.forEach(function(s){const c=D(s,i,n,t),r=c.profit<0?"text-danger":"text-success";l+=`
            <tr>
                <td>${s.companyName}</td>
                <td>${s.projectName}</td>
                <td>${s.budget.toLocaleString()} $</td>
                <td class="clickable-capacity" data-id="${s.id}">
                    <span class="capacity-link">${c.effectiveCapacity} / ${s.capacity} p.</span>
                </td>
                <td>${c.expenses.toLocaleString()} $</td>
                <td class="${r}"><strong>${c.profit.toLocaleString()} $</strong></td>
                <td>
                    <button class="btn-assign" data-id="${s.id}">Assign</button>
                    <button class="btn-delete" data-id="${s.id}">Delete</button>
                </td>
            </tr>
        `}),l+="</tbody></table>",l)}function ee(a,t){if(a.length===0)return'<p class="empty-state">No employees added yet</p>';let o=a||[];const i=[];o.forEach(function(s){s.position&&!i.includes(s.position)&&i.push(s.position)}),i.sort(),h.employeePosition&&h.employeePosition!==""&&(o=o.filter(function(s){return s.position===h.employeePosition})),p.tab==="employees"&&p.field&&(o=[...o].sort(function(s,c){let r,d;return p.field==="vacationFactor"?(r=E(s,t),d=E(c,t)):p.field==="effectiveCapacity"?(r=B(s,t),d=B(c,t)):(r=s[p.field],d=c[p.field]),typeof r=="string"?p.direction==="asc"?r.localeCompare(d):d.localeCompare(r):p.direction==="asc"?r-d:d-r}));function n(s){return p.tab==="employees"&&p.field===s?p.direction==="asc"?" ↑":" ↓":""}let e='<option value="">All Positions</option>';i.forEach(function(s){const c=h.employeePosition===s?"selected":"";e+=`<option value="${s}" ${c}>${s}</option>`});let l=`
    <div class="table-actions">
        <select id="employee-position-filter" class="select select--filter" style="max-width: 250px; margin-bottom: 15px; padding: 6px 10px; border-radius: 4px; border: 1px solid #ccc;">
            ${e}
        </select>
    </div>
    `;return o.length===0?(l+='<p class="empty-state">No employees found for this position</p>',l):(l+=`
    <table class="table">
        <thead>
            <tr>
                <th class="sortable" data-sort="name">Name${n("name")}</th>
                <th class="sortable" data-sort="position">Position${n("position")}</th>
                <th class="sortable" data-sort="age">Age${n("age")}</th>
                <th class="sortable" data-sort="salary">Salary${n("salary")}</th>
                <th class="sortable" data-sort="vacationFactor">Vacation Factor${n("vacationFactor")}</th>
                <th class="sortable" data-sort="effectiveCapacity">Eff. Capacity${n("effectiveCapacity")}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `,o.forEach(function(s){const c=E(s,t),r=B(s,t);l+=`
            <tr>
                <td>${s.name}</td>
                <td class="editable" data-id="${s.id}" data-field="position">${s.position}</td>
                <td>${s.age} y.o.</td>
                <td class="editable" data-id="${s.id}" data-field="salary">${s.salary} $</td>
                <td><span class="badge badge--factor">${c}</span></td>
                <td><span class="badge badge--capacity">${r}%</span></td>
                <td>
                    <button class="btn-delete btn-delete--emp" data-id="${s.id}">Delete</button>
                    <button class="btn-availability" data-id="${s.id}">Availability</button>
                </td>
            </tr>
        `}),l+="</tbody></table>",l)}function P(a,t){const o=a.projects||[],i=a.assignments||[],n=a.employees||[],e=o.length,l=Q(o,i,n,t);return` 
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
        `}function W(a,t){console.log("📖 ЧИТАЕМ НАЗНАЧЕНИЯ. Ключ периода:",t);const o=document.getElementById("details-modal"),i=document.getElementById("details-modal-body"),n=document.getElementById("details-modal-title");if(!o||!i)return;typeof g.loadFromLocalStorage=="function"&&g.loadFromLocalStorage();const e=g.getMonthData(t),l=e.projects||[],s=e.employees||[],c=e.assignments||[];console.log("Проверяем, что пришло из базы для проекта:",{projectId:a,allAssignmentsInMonth:c,filtered:c.filter(m=>m.projectId===a)});const r=l.find(m=>m.id===a);r&&(n.textContent=`Team for "${r.projectName}"`);const d=c.filter(m=>String(m.projectId)===String(a));if(d.length===0)i.innerHTML='<p class="empty-state">No employees assigned to this project yet.</p>';else{let m='<ul class="team-list">';d.forEach(function(u){const y=s.find(v=>String(v.id)===String(u.employeeId));y&&(m+=`
                    <li class="team-item">
                        <div class="team-item__info">
                            <strong class="team-item__name">${y.name}</strong>
                            <span class="team-item__position">${y.position}</span>
                        </div>
                        <div class="team-item__actions">
                            <span class="team-item__capacity">${u.capacity}% load</span>
                            <button class="btn-remove-asm" 
                                    data-project-id="${a}" 
                                    data-employee-id="${y.id}" 
                                    title="Remove from project">×</button>
                        </div>
                    </li>
                `)}),m+="</ul>",i.innerHTML=m}o.onclick=function(m){if(m.target.classList.contains("btn-remove-asm")){const u=m.target.getAttribute("data-project-id"),y=m.target.getAttribute("data-employee-id");if(!confirm("Are you sure you want to remove this employee from the project?"))return;const v=g.getRawData(),_=v[t]||{},H=_.assignments||[];_.assignments=H.filter(function(A){return!(String(A.projectId)===String(u)&&String(A.employeeId)===String(y))}),g.saveData(v),console.log(`🗑 Сотрудник ${y} удален с проекта ${u}`),W(u,t),f("projects",t);return}(m.target.id==="details-modal-overlay"||m.target.id==="details-modal-close")&&(console.log("🔒 Закрываем окно подробностей команды"),o.classList.remove("modal--open"))},o.classList.add("modal--open")}function te(a,t){const o=document.getElementById("assign-modal"),i=document.getElementById("assign-project-id"),n=document.getElementById("assign-emp-select");if(console.log("Поиск элементов модалки:",{modal:o,projectInput:i,empSelect:n}),!o||!n){console.error("❌ Ошибка: Элементы модального окна не найдены в HTML!");return}i&&(i.value=a);const e=g.getMonthData(t),l=e&&e.employees?e.employees:[];if(console.log("Список сотрудников для модалки:",l),l.length===0)n.innerHTML='<option value="">-- No employees available --</option>';else{let r='<option value="">-- Select an employee --</option>';l.forEach(function(d){const m=d.name||"Unknown Name",u=d.position||"No Position";r+=`<option value="${d.id}">${m} (${u})</option>`}),n.innerHTML=r}const s=document.getElementById("assign-capacity-range"),c=document.getElementById("assign-range-value");s&&(s.value=50),c&&(c.textContent="50"),o.classList.add("modal--open"),console.log("🚀 Класс modal--open успешно добавлен!")}function f(a,t){const o=document.getElementById("table-container");if(!o)return;const i=g.getMonthData(t);if(a==="projects"){const n=P(i,t),e=N(i,t);o.innerHTML=n+e,o.onclick=function(l){if(console.log("Кликнули по элементу:",l.target),l.target.classList.contains("sortable")){const c=l.target.getAttribute("data-sort");p.tab==="projects"&&p.field===c?p.direction=p.direction==="asc"?"desc":"asc":(p.tab="projects",p.field=c,p.direction="asc"),f("projects",t);return}if(l.target.classList.contains("btn-delete")){const c=l.target.getAttribute("data-id");X(c,t)}if(l.target.classList.contains("btn-assign")){console.log("Ура, поймали клик по кнопке Assign!");const c=l.target.getAttribute("data-id");te(c,t)}const s=l.target.closest(".clickable-capacity");if(s){const c=s.getAttribute("data-id");W(c,t)}},o.oninput=function(l){if(l.target.id==="project-search-input"){h.projectSearch=l.target.value;const s=P(i,t),c=N(i,t);o.innerHTML=s+c;const r=document.getElementById("project-search-input");r&&(r.focus(),r.setSelectionRange(r.value.length,r.value.length))}}}else a==="employees"&&(o.innerHTML=ee(i.employees,t),o.onclick=function(n){if(n.target.classList.contains("sortable")){const e=n.target.getAttribute("data-sort");p.tab==="employees"&&p.field===e?p.direction=p.direction==="asc"?"desc":"asc":(p.tab="employees",p.field=e,p.direction="asc"),f("employees",t);return}if(n.target.classList.contains("btn-availability")){const e=n.target.getAttribute("data-id");console.log(`📅 Нажали календарь сотрудника с ID: ${e}`),R(e,t)}if(n.target.classList.contains("btn-delete--emp")){const e=n.target.getAttribute("data-id");Z(e,t)}},o.onchange=function(n){n.target.id==="employee-position-filter"&&(h.employeePosition=n.target.value,f("employees",t))},o.ondblclick=function(n){const e=n.target;if(e.classList.contains("editable")&&!e.querySelector("input")){let m=function(){const u=d.value;K(c,r,u,t),f("employees",t)};var l=m;const s=e.textContent.replace(" $","").trim(),c=e.getAttribute("data-id"),r=e.getAttribute("data-field"),d=document.createElement("input");d.type=r==="salary"?"number":"text",d.value=s,d.className="table-inline-input",e.innerHTML="",e.appendChild(d),d.focus(),d.onkeydown=function(u){u.key==="Enter"&&m()},d.onblur=function(){m()}}})}function C(){const a=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+a.value}function ne(a){const t=document.querySelectorAll(".nav-button"),o=document.getElementById("page-title"),i=document.getElementById("add-entity-btn");t.forEach(function(s){s.classList.remove("nav-button--active")});const n=a.currentTarget;n.classList.add("nav-button--active");const e=n.getAttribute("data-tab");e==="projects"?(o.textContent="Projects",i.textContent="+ Add projects"):e==="employees"&&(o.textContent="Employees",i.textContent="+ Add employee"),console.log("Переключено на вкладку:",e);const l=C();f(e,l)}function k(){const t=document.querySelector(".nav-button--active").getAttribute("data-tab"),o=C();f(t,o),console.log("Период изменен на:",o)}function x(){const a=document.getElementById("project-panel");a&&a.classList.add("slide-panel--open")}function M(){const a=document.getElementById("project-panel");a&&a.classList.remove("slide-panel--open")}function ae(){const a=document.getElementById("employee-panel");a&&a.classList.add("slide-panel--open")}function T(){const a=document.getElementById("employee-panel");a&&a.classList.remove("slide-panel--open")}function oe(){const a=document.getElementById("sidebar"),t=document.getElementById("sidebar-toggle"),o=document.querySelectorAll(".nav-button");document.querySelectorAll(".sidebar__nav-btn");const i=document.getElementById("month-select"),n=document.getElementById("year-select"),e=document.getElementById("add-entity-btn"),l=document.getElementById("project-panel-close"),s=document.getElementById("project-panel-overlay"),c=document.getElementById("employee-panel-close"),r=document.getElementById("employee-panel-overlay");if(!i||!n)return;const d=localStorage.getItem("app-selected-month"),m=localStorage.getItem("app-selected-year");d&&(i.value=d),m&&(n.value=m);function u(){return n.value+"-"+i.value}let y="projects";i.addEventListener("change",function(){localStorage.setItem("app-selected-month",i.value),console.log("📅 Месяц изменен на:",i.value),f(y,u())}),n.addEventListener("change",function(){localStorage.setItem("app-selected-year",n.value),console.log("📅 Год изменен на:",n.value),f(y,u())}),a&&t&&t.addEventListener("click",function(){a.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),o.forEach(function(v){v.addEventListener("click",ne)}),i&&n&&(i.addEventListener("change",k),n.addEventListener("change",k)),e&&e.addEventListener("click",x),l&&l.addEventListener("click",M),s&&s.addEventListener("click",M),e&&e.addEventListener("click",function(){const v=document.querySelector(".nav-button--active").getAttribute("data-tab");v==="projects"?x():v==="employees"&&ae()}),c&&c.addEventListener("click",T),r&&r.addEventListener("click",T),f("projects",C())}function I(){const a=document.getElementById("proj-name"),t=document.getElementById("proj-company"),o=document.getElementById("proj-budget"),i=document.getElementById("proj-capacity"),n=document.getElementById("proj-submit"),e=a.value.trim().length>0,l=t.value.trim().length>0,s=Number(o.value)>0,c=Number(i.value)>0;e&&l&&s&&c?n.disabled=!1:n.disabled=!0}function se(a){a.preventDefault();const t=document.getElementById("proj-name"),o=document.getElementById("proj-company"),i=document.getElementById("proj-budget"),n=document.getElementById("proj-capacity"),e=document.getElementById("month-select"),s=document.getElementById("year-select").value+"-"+e.value,r={id:"proj_"+Date.now(),projectName:t.value.trim(),companyName:o.value.trim(),budget:Number(i.value),capacity:Number(n.value)},d=g.getMonthData(s);d.projects.push(r);const m=g.getRawData();m[s]=d,g.saveData(m),console.log("✅ Новый проект успешно сохранен в Store:",r),f("projects",s),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const u=document.getElementById("project-panel");u&&u.classList.remove("slide-panel--open")}function le(){const a=document.getElementById("project-form");if(a){const t=document.getElementById("proj-name"),o=document.getElementById("proj-company"),i=document.getElementById("proj-budget"),n=document.getElementById("proj-capacity");t.addEventListener("input",I),o.addEventListener("input",I),i.addEventListener("input",I),n.addEventListener("input",I),a.addEventListener("submit",se)}}function j(){const a=document.getElementById("emp-name"),t=document.getElementById("emp-position"),o=document.getElementById("emp-age"),i=document.getElementById("emp-salary"),n=document.getElementById("emp-submit"),e=document.getElementById("error-emp-age"),l=a.value.trim().length>0,s=t.value.trim().length>0,c=Number(i.value)>0,r=Number(o.value);let d=!1;o.value.trim()===""?e.textContent="":r<18?e.textContent="The employee must be over 18 years of age":(e.textContent="",d=!0),l&&s&&d&&c?n.disabled=!1:n.disabled=!0}function ie(a){a.preventDefault();const t=document.getElementById("emp-name"),o=document.getElementById("emp-position"),i=document.getElementById("emp-age"),n=document.getElementById("emp-salary"),e=document.getElementById("month-select"),s=document.getElementById("year-select").value+"-"+e.value,c={id:"emp_"+Date.now(),name:t.value.trim(),position:o.value.trim(),age:Number(i.value),salary:Number(n.value)},r=g.getMonthData(s);r.employees.push(c);const d=g.getRawData();d[s]=r,g.saveData(d),console.log("✅ Новый сотрудник добавлен:",c),f("employees",s),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const m=document.getElementById("employee-panel");m&&m.classList.remove("slide-panel--open")}function ce(){const a=document.getElementById("employee-form");if(a){const t=document.getElementById("emp-name"),o=document.getElementById("emp-position"),i=document.getElementById("emp-age"),n=document.getElementById("emp-salary");t.addEventListener("input",j),o.addEventListener("input",j),i.addEventListener("input",j),n.addEventListener("input",j),a.addEventListener("submit",ie)}}function F(){const a=document.getElementById("assign-modal");a&&a.classList.remove("modal--open")}function re(){const a=document.getElementById("assign-modal"),t=document.getElementById("assign-capacity-range"),o=document.getElementById("assign-range-value"),i=document.getElementById("assign-form");if(!a)return;a.onclick=function(e){(e.target.id==="assign-modal-overlay"||e.target.id==="assign-modal-close")&&(console.log("🔒 Закрываем модальное окно..."),F())},t&&o&&(t.oninput=function(){o.textContent=t.value}),i&&(i.onsubmit=function(e){e.preventDefault();const l=document.getElementById("assign-project-id").value,s=document.getElementById("assign-emp-select").value,c=Number(t.value),r=document.getElementById("month-select"),m=document.getElementById("year-select").value+"-"+r.value;if(console.log("✏️ СОХРАНЯЕМ НАЗНАЧЕНИЕ. Ключ периода:",m),!s){alert("Please select an employee first!");return}const u=g.getMonthData(m);u.assignments||(u.assignments=[]);const y=u.assignments.find(function(_){return String(_.projectId)===String(l)&&String(_.employeeId)===String(s)});if(y)console.log("🔄 Сотрудник уже на проекте. Обновляем capacity с",y.capacity,"на",c),y.capacity=c;else{const _={projectId:l,employeeId:s,capacity:c};u.assignments.push(_),console.log("🔗 Новое назначение добавлено в Стор:",_)}const v=g.getRawData();v[m]=u,g.saveData(v),alert("Employee successfully assigned to the project!"),F(),renderCurrentTab("projects",m)});const n=document.getElementById("details-modal");n&&(n.onclick=function(e){(e.target.id==="details-modal-overlay"||e.target.id==="details-modal-close")&&n.classList.remove("modal--open")})}const L={"dashboard-app":`
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
`};class de{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const t=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${t.length}`),t.forEach(o=>{const i=o.getAttribute("data-component");this.loadComponent(o,i)})}loadComponent(t,o){console.log(`📥 Загружаю компонент: ${o}`),L[o]?(t.innerHTML=L[o],t.setAttribute("data-loaded","true"),this.loadedComponents.add(o),console.log(`✅ ${o} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${o}" не найден в components.js`),t.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${o}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(o=>{let i=!1;o.forEach(n=>{n.addedNodes.length&&n.addedNodes.forEach(e=>{e.nodeType===1&&e.querySelectorAll&&e.querySelectorAll("[data-component]").length>0&&(i=!0)})}),i&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new de().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const me=g.getRawData();Object.keys(me).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),g.saveData(q)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(L));console.log("📅 Данные за май 2026:",g.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),oe(),le(),ce(),re()},0)});
