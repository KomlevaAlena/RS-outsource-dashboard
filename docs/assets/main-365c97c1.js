(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const e of n)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const e={};return n.integrity&&(e.integrity=n.integrity),n.referrerPolicy&&(e.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?e.credentials="include":n.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function i(n){if(n.ep)return;n.ep=!0;const e=a(n);fetch(n.href,e)}})();const w="monthData",g={getRawData(){const o=localStorage.getItem(w);return o?JSON.parse(o):{}},saveData(o){const t=JSON.stringify(o);localStorage.setItem(w,t)},getMonthData(o){const t=this.getRawData();return t[o]?t[o]:{employees:[],projects:[]}}},q={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};let b=new Set,S=null,$="";function R(o,t){S=o,$=t;const a=document.getElementById("vacation-modal"),i=document.getElementById("vacation-modal-title"),n=document.getElementById("calendar-grid-container");if(!a||!n){console.error("❌ Элементы календаря не найдены в DOM");return}const e=t.split("-"),s=parseInt(e[0],10),l=parseInt(e[1],10),c=g.getMonthData(t).employees.find(d=>String(d.id)===String(o));if(c){i.textContent=`Availability for ${c.name}`;const d=c.vacations||[];b=new Set(d.map(Number))}else b=new Set;V(s,l,n),U(a,s,l,n),a.classList.add("modal--open"),console.log(`📅 Календарь открыт для сотрудника ${o} на период ${t}`)}function V(o,t,a){a.innerHTML=G(o,t),O(o,t)}function G(o,t){const a=new Date(o,t+1,0).getDate();let i=new Date(o,t,1).getDay()-1;i<0&&(i=6);const n=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];let e='<div class="calendar-grid">';n.forEach(s=>{e+=`<div class="calendar-header-cell ${s==="Sat"||s==="Sun"?"calendar-header-cell--weekend":""}">${s}</div>`});for(let s=0;s<i;s++)e+='<div class="calendar-day-cell calendar-day-cell--empty"></div>';for(let s=1;s<=a;s++){const r=new Date(o,t,s).getDay(),c=r===0||r===6;let d="calendar-day-cell calendar-day-target";c&&(d+=" calendar-day-cell--weekend"),b.has(s)&&(d+=" calendar-day-cell--selected"),e+=`<div class="${d}" data-day="${s}">${s}</div>`}return e+="</div>",e}function O(o,t){const a=new Date(o,t+1,0).getDate();let i=0,n=0;for(let c=1;c<=a;c++){const d=new Date(o,t,c).getDay();d===0||d===6||(i++,b.has(c)&&n++)}const e=i-n,s=document.getElementById("calendar-working-days");s&&(s.textContent=`Working Days: ${e}/${i} days`);const l=J(o,t),r=document.getElementById("calendar-vacation-ranges");r&&(r.textContent=l||"None")}function J(o,t){const a=Array.from(b).sort((l,r)=>l-r);if(a.length===0)return"";const i=[];let n=a[0],e=a[0];const s=l=>{const r=String(l).padStart(2,"0"),c=String(t+1).padStart(2,"0");return`${r}.${c}`};for(let l=1;l<a.length;l++){const r=a[l];let c=!1;if(r===e+1)c=!0;else{let d=!1;for(let m=e+1;m<r;m++){const u=new Date(o,t,m).getDay();if(u!==0&&u!==6){d=!0;break}}d||(c=!0)}c||(n===e?i.push(s(n)):i.push(`${s(n)}-${s(e)}`),n=r),e=r}return n===e?i.push(s(n)):i.push(`${s(n)}-${s(e)}`),i.join(", ")}function U(o,t,a,i){i.onclick=function(e){const s=e.target;if(!s.classList.contains("calendar-day-target"))return;const l=parseInt(s.getAttribute("data-day"),10);b.has(l)?(b.delete(l),s.classList.remove("calendar-day-cell--selected")):(b.add(l),s.classList.add("calendar-day-cell--selected")),O(t,a)},o.onclick=function(e){(e.target.id==="vacation-modal-overlay"||e.target.id==="vacation-modal-close")&&(o.classList.remove("modal--open"),console.log("🔒 Календарь закрыт"))};const n=document.getElementById("btn-save-vacation");n&&(n.onclick=function(){const e=g.getRawData(),r=((e[$]||{}).employees||[]).find(c=>String(c.id)===String(S));r&&(r.vacations=Array.from(b).sort((c,d)=>c-d),g.saveData(e),console.log(`💾 Отпуска сохранены для сотрудника ${S}:`,r.vacations),f("employees",$),o.classList.remove("modal--open"))})}function z(o,t){const a=new Date(o,t+1,0).getDate();let i=0;for(let n=1;n<=a;n++){const e=new Date(o,t,n).getDay();e===0||e===6||i++}return i}function Y(o,t,a){if(!o||!Array.isArray(o)||o.length===0)return 0;let i=0;return o.forEach(n=>{const e=new Date(t,a,n).getDay();e===0||e===6||i++}),i}function E(o,t){const a=t.split("-"),i=parseInt(a[0],10),n=parseInt(a[1],10),e=z(i,n),s=o.vacations||[],l=Y(s,i,n);if(e===0)return 0;const r=l/e;return Math.round(r*100)/100}function B(o,t){const i=100*(1-E(o,t));return Math.round(i)}function D(o,t,a,i){const n=t.filter(function(c){return String(c.projectId)===String(o.id)});let e=0,s=0;n.forEach(function(c){const d=a.find(function(m){return String(m.id)===String(c.employeeId)});if(d){e+=c.capacity;const m=E(d,i),u=d.salary*(c.capacity/100)*(1-m);s+=u}});const l=o.budget,r=l-s;return{effectiveCapacity:Math.round(e),expenses:Math.round(s),revenue:Math.round(l),profit:Math.round(r)}}function Q(o,t,a,i){let n=0,e=0,s=0,l=0;return o.forEach(function(r){const c=D(r,t,a,i);n+=c.revenue,e+=c.effectiveCapacity,s+=c.expenses,l+=c.profit}),{totalBudget:n,totalCapacity:e,totalExpenses:s,totalProfit:l}}const p={tab:null,field:null,direction:"asc"};let _={projects:{companyName:"",projectName:""},employees:{name:"",surname:"",position:""},employeePosition:""};function X(o,t){if(!confirm("Are you sure you want to delete this project?"))return;const i=g.getMonthData(t),n=i.projects.filter(function(s){return s.id!==o});i.projects=n;const e=g.getRawData();e[t]=i,g.saveData(e),console.log(`❌ Проект с ID ${o} успешно удален`),f("projects",t)}function Z(o,t){if(!confirm("Are you sure you want to remove this employee?"))return;const i=g.getMonthData(t);i.employees=i.employees.filter(function(e){return e.id!==o});const n=g.getRawData();n[t]=i,g.saveData(n),console.log(`❌ Сотрудник с ID ${o} удален`),f("employees",t)}function K(o,t,a,i){const n=g.getMonthData(i),e=n.employees.find(s=>s.id===o);if(e){if(t==="salary"){const l=Number(a);if(isNaN(l)||l<=0){alert("Please enter the correct salary amount"),f("employees",i);return}e[t]=l}else{if(a.trim()===""){alert("The field cannot be empty"),f("employees",i);return}e[t]=a.trim()}const s=g.getRawData();s[i]=n,g.saveData(s),console.log(`📝 Сотрудник ${o}: поле ${t} обновлено на ${a}`)}}function P(o,t){let a=o.projects||[];const i=o.assignments||[],n=o.employees||[];if(a.length===0)return'<p class="empty-state">There are no projects yet</p>';p.tab==="projects"&&p.field&&(a=[...a].sort(function(l,r){let c,d;if(p.field==="expenses"||p==="profit"||p.field==="effectiveCapacity"){const m=D(l,i,n,t),u=D(r,i,n,t);c=m[p.field],d=u[p.field]}else c=l[p.field],d=r[p.field];return typeof c=="string"?p.direction==="asc"?c.localeCompare(d):d.localeCompare(c):p.direction==="asc"?c-d:d-c}));function e(l){return p.tab==="projects"&&p.field===l?p.direction==="asc"?" ↑":" ↓":""}let s=`
    <div class="table-actions">
        <input type="text" 
               id="project-search-input" 
               class="form__input form__input--search" 
               placeholder="🔍 Search by project or company..." 
               value="${_.projectSearch}">
    </div>
    `;return a.length===0?(s+='<p class="empty-state">No matching projects found</p>',s):(s+=` 
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
    `,a.forEach(function(l){const r=D(l,i,n,t),c=r.profit<0?"text-danger":"text-success";s+=`
            <tr>
                <td>${l.companyName}</td>
                <td>${l.projectName}</td>
                <td>${l.budget.toLocaleString()} $</td>
                <td class="clickable-capacity" data-id="${l.id}">
                    <span class="capacity-link">${r.effectiveCapacity} / ${l.capacity} p.</span>
                </td>
                <td>${r.expenses.toLocaleString()} $</td>
                <td class="${c}"><strong>${r.profit.toLocaleString()} $</strong></td>
                <td>
                    <button class="btn-assign" data-id="${l.id}">Assign</button>
                    <button class="btn-delete" data-id="${l.id}">Delete</button>
                </td>
            </tr>
        `}),s+="</tbody></table>",s)}function ee(o,t){if(o.length===0)return'<p class="empty-state">No employees added yet</p>';let a=o||[];const i=[];a.forEach(function(l){l.position&&!i.includes(l.position)&&i.push(l.position)}),i.sort(),_.employeePosition&&_.employeePosition!==""&&(a=a.filter(function(l){return l.position===_.employeePosition})),p.tab==="employees"&&p.field&&(a=[...a].sort(function(l,r){let c,d;return p.field==="vacationFactor"?(c=E(l,t),d=E(r,t)):p.field==="effectiveCapacity"?(c=B(l,t),d=B(r,t)):(c=l[p.field],d=r[p.field]),typeof c=="string"?p.direction==="asc"?c.localeCompare(d):d.localeCompare(c):p.direction==="asc"?c-d:d-c}));function n(l){return p.tab==="employees"&&p.field===l?p.direction==="asc"?" ↑":" ↓":""}let e='<option value="">All Positions</option>';i.forEach(function(l){const r=_.employeePosition===l?"selected":"";e+=`<option value="${l}" ${r}>${l}</option>`});let s=`
    <div class="table-actions">
        <select id="employee-position-filter" class="select select--filter" style="max-width: 250px; margin-bottom: 15px; padding: 6px 10px; border-radius: 4px; border: 1px solid #ccc;">
            ${e}
        </select>
    </div>
    `;return a.length===0?(s+='<p class="empty-state">No employees found for this position</p>',s):(s+=`
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
    `,a.forEach(function(l){const r=E(l,t),c=B(l,t);s+=`
            <tr>
                <td>${l.name}</td>
                <td class="editable" data-id="${l.id}" data-field="position">${l.position}</td>
                <td>${l.age} y.o.</td>
                <td class="editable" data-id="${l.id}" data-field="salary">${l.salary} $</td>
                <td><span class="badge badge--factor">${r}</span></td>
                <td><span class="badge badge--capacity">${c}%</span></td>
                <td>
                    <button class="btn-delete btn-delete--emp" data-id="${l.id}">Delete</button>
                    <button class="btn-availability" data-id="${l.id}">Availability</button>
                </td>
            </tr>
        `}),s+="</tbody></table>",s)}function k(o,t){const a=o.projects||[],i=o.assignments||[],n=o.employees||[],e=a.length,s=Q(a,i,n,t);return` 
        <div class="fin-summary">
            <div class="fin-card">
                <span class="fin-card__title">Active Projects</span>
                <span class="fin-card__value">${e}</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Revenue</span>
                <span class="fin-card__value">${s.totalBudget.toLocaleString()} $</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Expenses</span>
                <span class="fin-card__value">${s.totalExpenses.toLocaleString()} $</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Profit</span>
                <span class="fin-card__value">${s.totalProfit.toLocaleString()} $</span>
            </div>
        </div>
        `}function W(o,t){console.log("📖 ЧИТАЕМ НАЗНАЧЕНИЯ. Ключ периода:",t);const a=document.getElementById("details-modal"),i=document.getElementById("details-modal-body"),n=document.getElementById("details-modal-title");if(!a||!i)return;typeof g.loadFromLocalStorage=="function"&&g.loadFromLocalStorage();const e=g.getMonthData(t),s=e.projects||[],l=e.employees||[],r=e.assignments||[];console.log("Проверяем, что пришло из базы для проекта:",{projectId:o,allAssignmentsInMonth:r,filtered:r.filter(m=>m.projectId===o)});const c=s.find(m=>m.id===o);c&&(n.textContent=`Team for "${c.projectName}"`);const d=r.filter(m=>String(m.projectId)===String(o));if(d.length===0)i.innerHTML='<p class="empty-state">No employees assigned to this project yet.</p>';else{let m='<ul class="team-list">';d.forEach(function(u){const y=l.find(v=>String(v.id)===String(u.employeeId));y&&(m+=`
                    <li class="team-item">
                        <div class="team-item__info">
                            <strong class="team-item__name">${y.name}</strong>
                            <span class="team-item__position">${y.position}</span>
                        </div>
                        <div class="team-item__actions">
                            <span class="team-item__capacity">${u.capacity}% load</span>
                            <button class="btn-remove-asm" 
                                    data-project-id="${o}" 
                                    data-employee-id="${y.id}" 
                                    title="Remove from project">×</button>
                        </div>
                    </li>
                `)}),m+="</ul>",i.innerHTML=m}a.onclick=function(m){if(m.target.classList.contains("btn-remove-asm")){const u=m.target.getAttribute("data-project-id"),y=m.target.getAttribute("data-employee-id");if(!confirm("Are you sure you want to remove this employee from the project?"))return;const v=g.getRawData(),h=v[t]||{},H=h.assignments||[];h.assignments=H.filter(function(A){return!(String(A.projectId)===String(u)&&String(A.employeeId)===String(y))}),g.saveData(v),console.log(`🗑 Сотрудник ${y} удален с проекта ${u}`),W(u,t),f("projects",t);return}(m.target.id==="details-modal-overlay"||m.target.id==="details-modal-close")&&(console.log("🔒 Закрываем окно подробностей команды"),a.classList.remove("modal--open"))},a.classList.add("modal--open")}function te(o,t){const a=document.getElementById("assign-modal"),i=document.getElementById("assign-project-id"),n=document.getElementById("assign-emp-select");if(console.log("Поиск элементов модалки:",{modal:a,projectInput:i,empSelect:n}),!a||!n){console.error("❌ Ошибка: Элементы модального окна не найдены в HTML!");return}i&&(i.value=o);const e=g.getMonthData(t),s=e&&e.employees?e.employees:[];if(console.log("Список сотрудников для модалки:",s),s.length===0)n.innerHTML='<option value="">-- No employees available --</option>';else{let c='<option value="">-- Select an employee --</option>';s.forEach(function(d){const m=d.name||"Unknown Name",u=d.position||"No Position";c+=`<option value="${d.id}">${m} (${u})</option>`}),n.innerHTML=c}const l=document.getElementById("assign-capacity-range"),r=document.getElementById("assign-range-value");l&&(l.value=50),r&&(r.textContent="50"),a.classList.add("modal--open"),console.log("🚀 Класс modal--open успешно добавлен!")}function f(o,t){const a=document.getElementById("table-container");if(!a)return;const i=g.getMonthData(t);if(o==="projects"){const n=k(i,t),e=P(i,t);a.innerHTML=n+e,a.onclick=function(s){if(console.log("Кликнули по элементу:",s.target),s.target.classList.contains("sortable")){const r=s.target.getAttribute("data-sort");p.tab==="projects"&&p.field===r?p.direction=p.direction==="asc"?"desc":"asc":(p.tab="projects",p.field=r,p.direction="asc"),f("projects",t);return}if(s.target.classList.contains("btn-delete")){const r=s.target.getAttribute("data-id");X(r,t)}if(s.target.classList.contains("btn-assign")){console.log("Ура, поймали клик по кнопке Assign!");const r=s.target.getAttribute("data-id");te(r,t)}const l=s.target.closest(".clickable-capacity");if(l){const r=l.getAttribute("data-id");W(r,t)}},a.oninput=function(s){if(s.target.id==="project-search-input"){_.projectSearch=s.target.value;const l=k(i,t),r=P(i,t);a.innerHTML=l+r;const c=document.getElementById("project-search-input");c&&(c.focus(),c.setSelectionRange(c.value.length,c.value.length))}}}else o==="employees"&&(a.innerHTML=ee(i.employees,t),a.onclick=function(n){if(n.target.classList.contains("sortable")){const e=n.target.getAttribute("data-sort");p.tab==="employees"&&p.field===e?p.direction=p.direction==="asc"?"desc":"asc":(p.tab="employees",p.field=e,p.direction="asc"),f("employees",t);return}if(n.target.classList.contains("btn-availability")){const e=n.target.getAttribute("data-id");console.log(`📅 Нажали календарь сотрудника с ID: ${e}`),R(e,t)}if(n.target.classList.contains("btn-delete--emp")){const e=n.target.getAttribute("data-id");Z(e,t)}},a.onchange=function(n){n.target.id==="employee-position-filter"&&(_.employeePosition=n.target.value,f("employees",t))},a.ondblclick=function(n){const e=n.target;if(e.classList.contains("editable")&&!e.querySelector("input")){let m=function(){const u=d.value;K(r,c,u,t),f("employees",t)};var s=m;const l=e.textContent.replace(" $","").trim(),r=e.getAttribute("data-id"),c=e.getAttribute("data-field"),d=document.createElement("input");d.type=c==="salary"?"number":"text",d.value=l,d.className="table-inline-input",e.innerHTML="",e.appendChild(d),d.focus(),d.onkeydown=function(u){u.key==="Enter"&&m()},d.onblur=function(){m()}}})}function C(){const o=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+o.value}function ne(o){const t=document.querySelectorAll(".nav-button"),a=document.getElementById("page-title"),i=document.getElementById("add-entity-btn");t.forEach(function(l){l.classList.remove("nav-button--active")});const n=o.currentTarget;n.classList.add("nav-button--active");const e=n.getAttribute("data-tab");e==="projects"?(a.textContent="Projects",i.textContent="+ Add projects"):e==="employees"&&(a.textContent="Employees",i.textContent="+ Add employee"),console.log("Переключено на вкладку:",e);const s=C();f(e,s)}function x(){const t=document.querySelector(".nav-button--active").getAttribute("data-tab"),a=C();f(t,a),console.log("Период изменен на:",a)}function N(){const o=document.getElementById("project-panel");o&&o.classList.add("slide-panel--open")}function M(){const o=document.getElementById("project-panel");o&&o.classList.remove("slide-panel--open")}function oe(){const o=document.getElementById("employee-panel");o&&o.classList.add("slide-panel--open")}function T(){const o=document.getElementById("employee-panel");o&&o.classList.remove("slide-panel--open")}function ae(){const o=document.getElementById("sidebar"),t=document.getElementById("sidebar-toggle"),a=document.querySelectorAll(".nav-button");document.querySelectorAll(".sidebar__nav-btn");const i=document.getElementById("month-select"),n=document.getElementById("year-select"),e=document.getElementById("add-entity-btn"),s=document.getElementById("project-panel-close"),l=document.getElementById("project-panel-overlay"),r=document.getElementById("employee-panel-close"),c=document.getElementById("employee-panel-overlay");if(!i||!n)return;const d=localStorage.getItem("app-selected-month"),m=localStorage.getItem("app-selected-year");d&&(i.value=d),m&&(n.value=m);function u(){return n.value+"-"+i.value}let y="projects";i.addEventListener("change",function(){localStorage.setItem("app-selected-month",i.value),console.log("📅 Месяц изменен на:",i.value),f(y,u())}),n.addEventListener("change",function(){localStorage.setItem("app-selected-year",n.value),console.log("📅 Год изменен на:",n.value),f(y,u())}),o&&t&&t.addEventListener("click",function(){o.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),a.forEach(function(v){v.addEventListener("click",ne)}),i&&n&&(i.addEventListener("change",x),n.addEventListener("change",x)),e&&e.addEventListener("click",N),s&&s.addEventListener("click",M),l&&l.addEventListener("click",M),e&&e.addEventListener("click",function(){const v=document.querySelector(".nav-button--active").getAttribute("data-tab");v==="projects"?N():v==="employees"&&oe()}),r&&r.addEventListener("click",T),c&&c.addEventListener("click",T),f("projects",C())}function I(){const o=document.getElementById("proj-name"),t=document.getElementById("proj-company"),a=document.getElementById("proj-budget"),i=document.getElementById("proj-capacity"),n=document.getElementById("proj-submit"),e=o.value.trim().length>0,s=t.value.trim().length>0,l=Number(a.value)>0,r=Number(i.value)>0;e&&s&&l&&r?n.disabled=!1:n.disabled=!0}function se(o){o.preventDefault();const t=document.getElementById("proj-name"),a=document.getElementById("proj-company"),i=document.getElementById("proj-budget"),n=document.getElementById("proj-capacity"),e=document.getElementById("month-select"),l=document.getElementById("year-select").value+"-"+e.value,c={id:"proj_"+Date.now(),projectName:t.value.trim(),companyName:a.value.trim(),budget:Number(i.value),capacity:Number(n.value)},d=g.getMonthData(l);d.projects.push(c);const m=g.getRawData();m[l]=d,g.saveData(m),console.log("✅ Новый проект успешно сохранен в Store:",c),f("projects",l),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const u=document.getElementById("project-panel");u&&u.classList.remove("slide-panel--open")}function le(){const o=document.getElementById("project-form");if(o){const t=document.getElementById("proj-name"),a=document.getElementById("proj-company"),i=document.getElementById("proj-budget"),n=document.getElementById("proj-capacity");t.addEventListener("input",I),a.addEventListener("input",I),i.addEventListener("input",I),n.addEventListener("input",I),o.addEventListener("submit",se)}}function j(){const o=document.getElementById("emp-name"),t=document.getElementById("emp-position"),a=document.getElementById("emp-age"),i=document.getElementById("emp-salary"),n=document.getElementById("emp-submit"),e=document.getElementById("error-emp-age"),s=o.value.trim().length>0,l=t.value.trim().length>0,r=Number(i.value)>0,c=Number(a.value);let d=!1;a.value.trim()===""?e.textContent="":c<18?e.textContent="The employee must be over 18 years of age":(e.textContent="",d=!0),s&&l&&d&&r?n.disabled=!1:n.disabled=!0}function ie(o){o.preventDefault();const t=document.getElementById("emp-name"),a=document.getElementById("emp-position"),i=document.getElementById("emp-age"),n=document.getElementById("emp-salary"),e=document.getElementById("month-select"),l=document.getElementById("year-select").value+"-"+e.value,r={id:"emp_"+Date.now(),name:t.value.trim(),position:a.value.trim(),age:Number(i.value),salary:Number(n.value)},c=g.getMonthData(l);c.employees.push(r);const d=g.getRawData();d[l]=c,g.saveData(d),console.log("✅ Новый сотрудник добавлен:",r),f("employees",l),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const m=document.getElementById("employee-panel");m&&m.classList.remove("slide-panel--open")}function ce(){const o=document.getElementById("employee-form");if(o){const t=document.getElementById("emp-name"),a=document.getElementById("emp-position"),i=document.getElementById("emp-age"),n=document.getElementById("emp-salary");t.addEventListener("input",j),a.addEventListener("input",j),i.addEventListener("input",j),n.addEventListener("input",j),o.addEventListener("submit",ie)}}function F(){const o=document.getElementById("assign-modal");o&&o.classList.remove("modal--open")}function re(){const o=document.getElementById("assign-modal"),t=document.getElementById("assign-capacity-range"),a=document.getElementById("assign-range-value"),i=document.getElementById("assign-form");if(!o)return;o.onclick=function(e){(e.target.id==="assign-modal-overlay"||e.target.id==="assign-modal-close")&&(console.log("🔒 Закрываем модальное окно..."),F())},t&&a&&(t.oninput=function(){a.textContent=t.value}),i&&(i.onsubmit=function(e){e.preventDefault();const s=document.getElementById("assign-project-id").value,l=document.getElementById("assign-emp-select").value,r=Number(t.value),c=document.getElementById("month-select"),m=document.getElementById("year-select").value+"-"+c.value;if(console.log("✏️ СОХРАНЯЕМ НАЗНАЧЕНИЕ. Ключ периода:",m),!l){alert("Please select an employee first!");return}const u=g.getMonthData(m);u.assignments||(u.assignments=[]);const y=u.assignments.find(function(h){return String(h.projectId)===String(s)&&String(h.employeeId)===String(l)});if(y)console.log("🔄 Сотрудник уже на проекте. Обновляем capacity с",y.capacity,"на",r),y.capacity=r;else{const h={projectId:s,employeeId:l,capacity:r};u.assignments.push(h),console.log("🔗 Новое назначение добавлено в Стор:",h)}const v=g.getRawData();v[m]=u,g.saveData(v),alert("Employee successfully assigned to the project!"),F(),renderCurrentTab("projects",m)});const n=document.getElementById("details-modal");n&&(n.onclick=function(e){(e.target.id==="details-modal-overlay"||e.target.id==="details-modal-close")&&n.classList.remove("modal--open")})}const L={"dashboard-app":`
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
`};class de{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const t=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${t.length}`),t.forEach(a=>{const i=a.getAttribute("data-component");this.loadComponent(a,i)})}loadComponent(t,a){console.log(`📥 Загружаю компонент: ${a}`),L[a]?(t.innerHTML=L[a],t.setAttribute("data-loaded","true"),this.loadedComponents.add(a),console.log(`✅ ${a} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${a}" не найден в components.js`),t.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${a}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(a=>{let i=!1;a.forEach(n=>{n.addedNodes.length&&n.addedNodes.forEach(e=>{e.nodeType===1&&e.querySelectorAll&&e.querySelectorAll("[data-component]").length>0&&(i=!0)})}),i&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new de().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const me=g.getRawData();Object.keys(me).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),g.saveData(q)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(L));console.log("📅 Данные за май 2026:",g.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),ae(),le(),ce(),re()},0)});
