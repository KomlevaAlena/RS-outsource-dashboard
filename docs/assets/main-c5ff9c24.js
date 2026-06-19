(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const e of o)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(o){const e={};return o.integrity&&(e.integrity=o.integrity),o.referrerPolicy&&(e.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?e.credentials="include":o.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function i(o){if(o.ep)return;o.ep=!0;const e=s(o);fetch(o.href,e)}})();const N="monthData",f={getRawData(){const n=localStorage.getItem(N);return n?JSON.parse(n):{}},saveData(n){const t=JSON.stringify(n);localStorage.setItem(N,t)},getMonthData(n){const t=this.getRawData();return t[n]?t[n]:{employees:[],projects:[]}}},q={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};let h=new Set,S=null,$="";function W(n,t){S=n,$=t;const s=document.getElementById("vacation-modal"),i=document.getElementById("vacation-modal-title"),o=document.getElementById("calendar-grid-container");if(!s||!o){console.error("❌ Элементы календаря не найдены в DOM");return}const e=t.split("-"),a=parseInt(e[0],10),l=parseInt(e[1],10),c=f.getMonthData(t).employees.find(d=>String(d.id)===String(n));if(c){i.textContent=`Availability for ${c.name}`;const d=c.vacations||[];h=new Set(d.map(Number))}else h=new Set;H(a,l,o),G(s,a,l,o),s.classList.add("modal--open"),console.log(`📅 Календарь открыт для сотрудника ${n} на период ${t}`)}function H(n,t,s){s.innerHTML=V(n,t),T(n,t)}function V(n,t){const s=new Date(n,t+1,0).getDate();let i=new Date(n,t,1).getDay()-1;i<0&&(i=6);const o=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];let e='<div class="calendar-grid">';o.forEach(a=>{e+=`<div class="calendar-header-cell ${a==="Sat"||a==="Sun"?"calendar-header-cell--weekend":""}">${a}</div>`});for(let a=0;a<i;a++)e+='<div class="calendar-day-cell calendar-day-cell--empty"></div>';for(let a=1;a<=s;a++){const r=new Date(n,t,a).getDay(),c=r===0||r===6;let d="calendar-day-cell calendar-day-target";c&&(d+=" calendar-day-cell--weekend"),h.has(a)&&(d+=" calendar-day-cell--selected"),e+=`<div class="${d}" data-day="${a}">${a}</div>`}return e+="</div>",e}function T(n,t){const s=new Date(n,t+1,0).getDate();let i=0,o=0;for(let c=1;c<=s;c++){const d=new Date(n,t,c).getDay();d===0||d===6||(i++,h.has(c)&&o++)}const e=i-o,a=document.getElementById("calendar-working-days");a&&(a.textContent=`Working Days: ${e}/${i} days`);const l=R(n,t),r=document.getElementById("calendar-vacation-ranges");r&&(r.textContent=l||"None")}function R(n,t){const s=Array.from(h).sort((l,r)=>l-r);if(s.length===0)return"";const i=[];let o=s[0],e=s[0];const a=l=>{const r=String(l).padStart(2,"0"),c=String(t+1).padStart(2,"0");return`${r}.${c}`};for(let l=1;l<s.length;l++){const r=s[l];let c=!1;if(r===e+1)c=!0;else{let d=!1;for(let p=e+1;p<r;p++){const u=new Date(n,t,p).getDay();if(u!==0&&u!==6){d=!0;break}}d||(c=!0)}c||(o===e?i.push(a(o)):i.push(`${a(o)}-${a(e)}`),o=r),e=r}return o===e?i.push(a(o)):i.push(`${a(o)}-${a(e)}`),i.join(", ")}function G(n,t,s,i){i.onclick=function(e){const a=e.target;if(!a.classList.contains("calendar-day-target"))return;const l=parseInt(a.getAttribute("data-day"),10);h.has(l)?(h.delete(l),a.classList.remove("calendar-day-cell--selected")):(h.add(l),a.classList.add("calendar-day-cell--selected")),T(t,s)},n.onclick=function(e){(e.target.id==="vacation-modal-overlay"||e.target.id==="vacation-modal-close")&&(n.classList.remove("modal--open"),console.log("🔒 Календарь закрыт"))};const o=document.getElementById("btn-save-vacation");o&&(o.onclick=function(){const e=f.getRawData(),r=((e[$]||{}).employees||[]).find(c=>String(c.id)===String(S));r&&(r.vacations=Array.from(h).sort((c,d)=>c-d),f.saveData(e),console.log(`💾 Отпуска сохранены для сотрудника ${S}:`,r.vacations),g("employees",$),n.classList.remove("modal--open"))})}function J(n,t){const s=new Date(n,t+1,0).getDate();let i=0;for(let o=1;o<=s;o++){const e=new Date(n,t,o).getDay();e===0||e===6||i++}return i}function U(n,t,s){if(!n||!Array.isArray(n)||n.length===0)return 0;let i=0;return n.forEach(o=>{const e=new Date(t,s,o).getDay();e===0||e===6||i++}),i}function E(n,t){const s=t.split("-"),i=parseInt(s[0],10),o=parseInt(s[1],10),e=J(i,o),a=n.vacations||[],l=U(a,i,o);if(e===0)return 0;const r=l/e;return Math.round(r*100)/100}function B(n,t){const i=100*(1-E(n,t));return Math.round(i)}function D(n,t,s,i){const o=t.filter(function(c){return String(c.projectId)===String(n.id)});let e=0,a=0;o.forEach(function(c){const d=s.find(function(p){return String(p.id)===String(c.employeeId)});if(d){e+=c.capacity;const p=E(d,i),u=d.salary*(c.capacity/100)*(1-p);a+=u}});const l=n.budget,r=l-a;return{effectiveCapacity:Math.round(e),expenses:Math.round(a),revenue:Math.round(l),profit:Math.round(r)}}function z(n,t,s,i){let o=0,e=0,a=0,l=0;return n.forEach(function(r){const c=D(r,t,s,i);o+=c.revenue,e+=c.effectiveCapacity,a+=c.expenses,l+=c.profit}),{totalBudget:o,totalCapacity:e,totalExpenses:a,totalProfit:l}}const m={tab:null,field:null,direction:"asc"};let v={projects:{companyName:"",projectName:""},employees:{name:"",surname:"",position:""},employeePosition:""};function Y(n,t){if(!confirm("Are you sure you want to delete this project?"))return;const i=f.getMonthData(t),o=i.projects.filter(function(a){return a.id!==n});i.projects=o;const e=f.getRawData();e[t]=i,f.saveData(e),console.log(`❌ Проект с ID ${n} успешно удален`),g("projects",t)}function Q(n,t){if(!confirm("Are you sure you want to remove this employee?"))return;const i=f.getMonthData(t);i.employees=i.employees.filter(function(e){return e.id!==n});const o=f.getRawData();o[t]=i,f.saveData(o),console.log(`❌ Сотрудник с ID ${n} удален`),g("employees",t)}function X(n,t,s,i){const o=f.getMonthData(i),e=o.employees.find(a=>a.id===n);if(e){if(t==="salary"){const l=Number(s);if(isNaN(l)||l<=0){alert("Please enter the correct salary amount"),g("employees",i);return}e[t]=l}else{if(s.trim()===""){alert("The field cannot be empty"),g("employees",i);return}e[t]=s.trim()}const a=f.getRawData();a[i]=o,f.saveData(a),console.log(`📝 Сотрудник ${n}: поле ${t} обновлено на ${s}`)}}function Z(n,t){let s=n.projects||[];const i=n.assignments||[],o=n.employees||[];if(s.length===0)return'<p class="empty-state">There are no projects yet</p>';if(v.projects.companyName&&v.projects.companyName.trim()!==""){const l=v.projects.companyName.toLowerCase().trim();s=s.filter(r=>r.companyName?r.companyName.toLowerCase().includes(l):!1)}if(v.projects.projectName&&v.projects.projectName.trim()!==""){const l=v.projects.projectName.toLowerCase().trim();s=s.filter(r=>r.projectName?r.projectName.toLowerCase().includes(l):!1)}m.tab==="projects"&&m.field&&(s=[...s].sort(function(l,r){let c,d;if(m.field==="expenses"||m==="profit"||m.field==="effectiveCapacity"){const p=D(l,i,o,t),u=D(r,i,o,t);c=p[m.field],d=u[m.field]}else c=l[m.field],d=r[m.field];return typeof c=="string"?m.direction==="asc"?c.localeCompare(d):d.localeCompare(c):m.direction==="asc"?c-d:d-c}));function e(l){return m.tab==="projects"&&m.field===l?m.direction==="asc"?" ↑":" ↓":""}let a=`
    <div class="table-actions">
        <input type="text" 
               id="project-search-input" 
               class="form__input form__input--search" 
               placeholder="🔍 Search by project or company..." 
               value="${v.projectSearch}">
    </div>
    `;return s.length===0?(a+='<p class="empty-state">No matching projects found</p>',a):(a+=` 
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
    `,s.forEach(function(l){const r=D(l,i,o,t),c=r.profit<0?"text-danger":"text-success";a+=`
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
        `}),a+="</tbody></table>",a)}function K(n,t){if(n.length===0)return'<p class="empty-state">No employees added yet</p>';let s=n||[];const i=[];s.forEach(function(l){l.position&&!i.includes(l.position)&&i.push(l.position)}),i.sort(),v.employeePosition&&v.employeePosition!==""&&(s=s.filter(function(l){return l.position===v.employeePosition})),m.tab==="employees"&&m.field&&(s=[...s].sort(function(l,r){let c,d;return m.field==="vacationFactor"?(c=E(l,t),d=E(r,t)):m.field==="effectiveCapacity"?(c=B(l,t),d=B(r,t)):(c=l[m.field],d=r[m.field]),typeof c=="string"?m.direction==="asc"?c.localeCompare(d):d.localeCompare(c):m.direction==="asc"?c-d:d-c}));function o(l){return m.tab==="employees"&&m.field===l?m.direction==="asc"?" ↑":" ↓":""}let e='<option value="">All Positions</option>';i.forEach(function(l){const r=v.employeePosition===l?"selected":"";e+=`<option value="${l}" ${r}>${l}</option>`});let a=`
    <div class="table-actions">
        <select id="employee-position-filter" class="select select--filter" style="max-width: 250px; margin-bottom: 15px; padding: 6px 10px; border-radius: 4px; border: 1px solid #ccc;">
            ${e}
        </select>
    </div>
    `;return s.length===0?(a+='<p class="empty-state">No employees found for this position</p>',a):(a+=`
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
    `,s.forEach(function(l){const r=E(l,t),c=B(l,t);a+=`
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
        `}),a+="</tbody></table>",a)}function ee(n,t){const s=n.projects||[],i=n.assignments||[],o=n.employees||[],e=s.length,a=z(s,i,o,t);return` 
        <div class="fin-summary">
            <div class="fin-card">
                <span class="fin-card__title">Active Projects</span>
                <span class="fin-card__value">${e}</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Revenue</span>
                <span class="fin-card__value">${a.totalBudget.toLocaleString()} $</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Expenses</span>
                <span class="fin-card__value">${a.totalExpenses.toLocaleString()} $</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Profit</span>
                <span class="fin-card__value">${a.totalProfit.toLocaleString()} $</span>
            </div>
        </div>
        `}function F(n,t){console.log("📖 ЧИТАЕМ НАЗНАЧЕНИЯ. Ключ периода:",t);const s=document.getElementById("details-modal"),i=document.getElementById("details-modal-body"),o=document.getElementById("details-modal-title");if(!s||!i)return;typeof f.loadFromLocalStorage=="function"&&f.loadFromLocalStorage();const e=f.getMonthData(t),a=e.projects||[],l=e.employees||[],r=e.assignments||[];console.log("Проверяем, что пришло из базы для проекта:",{projectId:n,allAssignmentsInMonth:r,filtered:r.filter(p=>p.projectId===n)});const c=a.find(p=>p.id===n);c&&(o.textContent=`Team for "${c.projectName}"`);const d=r.filter(p=>String(p.projectId)===String(n));if(d.length===0)i.innerHTML='<p class="empty-state">No employees assigned to this project yet.</p>';else{let p='<ul class="team-list">';d.forEach(function(u){const y=l.find(b=>String(b.id)===String(u.employeeId));y&&(p+=`
                    <li class="team-item">
                        <div class="team-item__info">
                            <strong class="team-item__name">${y.name}</strong>
                            <span class="team-item__position">${y.position}</span>
                        </div>
                        <div class="team-item__actions">
                            <span class="team-item__capacity">${u.capacity}% load</span>
                            <button class="btn-remove-asm" 
                                    data-project-id="${n}" 
                                    data-employee-id="${y.id}" 
                                    title="Remove from project">×</button>
                        </div>
                    </li>
                `)}),p+="</ul>",i.innerHTML=p}s.onclick=function(p){if(p.target.classList.contains("btn-remove-asm")){const u=p.target.getAttribute("data-project-id"),y=p.target.getAttribute("data-employee-id");if(!confirm("Are you sure you want to remove this employee from the project?"))return;const b=f.getRawData(),_=b[t]||{},O=_.assignments||[];_.assignments=O.filter(function(A){return!(String(A.projectId)===String(u)&&String(A.employeeId)===String(y))}),f.saveData(b),console.log(`🗑 Сотрудник ${y} удален с проекта ${u}`),F(u,t),g("projects",t);return}(p.target.id==="details-modal-overlay"||p.target.id==="details-modal-close")&&(console.log("🔒 Закрываем окно подробностей команды"),s.classList.remove("modal--open"))},s.classList.add("modal--open")}function te(n,t){const s=document.getElementById("assign-modal"),i=document.getElementById("assign-project-id"),o=document.getElementById("assign-emp-select");if(console.log("Поиск элементов модалки:",{modal:s,projectInput:i,empSelect:o}),!s||!o){console.error("❌ Ошибка: Элементы модального окна не найдены в HTML!");return}i&&(i.value=n);const e=f.getMonthData(t),a=e&&e.employees?e.employees:[];if(console.log("Список сотрудников для модалки:",a),a.length===0)o.innerHTML='<option value="">-- No employees available --</option>';else{let c='<option value="">-- Select an employee --</option>';a.forEach(function(d){const p=d.name||"Unknown Name",u=d.position||"No Position";c+=`<option value="${d.id}">${p} (${u})</option>`}),o.innerHTML=c}const l=document.getElementById("assign-capacity-range"),r=document.getElementById("assign-range-value");l&&(l.value=50),r&&(r.textContent="50"),s.classList.add("modal--open"),console.log("🚀 Класс modal--open успешно добавлен!")}function g(n,t){const s=document.getElementById("table-container");if(!s)return;const i=f.getMonthData(t);if(n==="projects"){const o=ee(i,t),e=Z(i,t);s.innerHTML=o+e,s.onclick=function(a){if(console.log("Кликнули по элементу:",a.target),a.target.classList.contains("sortable")){const c=a.target.getAttribute("data-sort");m.tab==="projects"&&m.field===c?m.direction=m.direction==="asc"?"desc":"asc":(m.tab="projects",m.field=c,m.direction="asc"),g("projects",t);return}if(a.target.classList.contains("filter-icon")){a.stopPropagation();const c=document.querySelector(".filter-popup");c&&c.remove();const d=a.target.getAttribute("data-filter-field"),p=a.target.closest("th"),u=document.createElement("div");u.className="filter-popup",u.innerHTML=`
                    <input type="text" id="filter-popup-input" class="filter-popup__input" placeholder="Search..." value="${v.projects[d]}">
                    <div class="filter-popup__actions">
                        <button class="filter-popup__btn" id="filter-btn-cancel">Cancel</button>
                        <button class="filter-popup__btn filter-popup__btn--apply" id="filter-btn-apply" data-field="${d}">Apply</button>
                    </div>
                `,p.appendChild(u);const y=u.querySelector("#filter-popup-input");y.focus(),y.onkeydown=function(b){b.key==="Enter"&&u.querySelector("#filter-btn-apply").click()};return}if(a.target.id==="filter-btn-apply"){const c=a.target.getAttribute("data-field"),d=document.getElementById("filter-popup-input").value;v.projects[c]=d,g("projects",t);return}if(a.target.id==="filter-btn-cancel"){const c=a.target.closest(".filter-popup");c&&c.remove();return}if(a.target.classList.contains("filter-chip__remove")){const c=a.target.getAttribute("data-filter-key");v.projects[c]="",g("projects",t);return}if(a.target.classList.contains("filter-chip--clear-all")){v.projects.companyName="",v.projects.projectName="",g("projects",t);return}const l=document.querySelector(".filter-popup");if(l&&!a.target.closest(".filter-popup")&&l.remove(),a.target.classList.contains("btn-delete")){const c=a.target.getAttribute("data-id");Y(c,t)}if(a.target.classList.contains("btn-assign")){console.log("Ура, поймали клик по кнопке Assign!");const c=a.target.getAttribute("data-id");te(c,t)}const r=a.target.closest(".clickable-capacity");if(r){const c=r.getAttribute("data-id");F(c,t)}}}else n==="employees"&&(s.innerHTML=K(i.employees,t),s.onclick=function(o){if(o.target.classList.contains("sortable")){const e=o.target.getAttribute("data-sort");m.tab==="employees"&&m.field===e?m.direction=m.direction==="asc"?"desc":"asc":(m.tab="employees",m.field=e,m.direction="asc"),g("employees",t);return}if(o.target.classList.contains("btn-availability")){const e=o.target.getAttribute("data-id");console.log(`📅 Нажали календарь сотрудника с ID: ${e}`),W(e,t)}if(o.target.classList.contains("btn-delete--emp")){const e=o.target.getAttribute("data-id");Q(e,t)}},s.onchange=function(o){o.target.id==="employee-position-filter"&&(v.employeePosition=o.target.value,g("employees",t))},s.ondblclick=function(o){const e=o.target;if(e.classList.contains("editable")&&!e.querySelector("input")){let p=function(){const u=d.value;X(r,c,u,t),g("employees",t)};var a=p;const l=e.textContent.replace(" $","").trim(),r=e.getAttribute("data-id"),c=e.getAttribute("data-field"),d=document.createElement("input");d.type=c==="salary"?"number":"text",d.value=l,d.className="table-inline-input",e.innerHTML="",e.appendChild(d),d.focus(),d.onkeydown=function(u){u.key==="Enter"&&p()},d.onblur=function(){p()}}})}function C(){const n=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+n.value}function oe(n){const t=document.querySelectorAll(".nav-button"),s=document.getElementById("page-title"),i=document.getElementById("add-entity-btn");t.forEach(function(l){l.classList.remove("nav-button--active")});const o=n.currentTarget;o.classList.add("nav-button--active");const e=o.getAttribute("data-tab");e==="projects"?(s.textContent="Projects",i.textContent="+ Add projects"):e==="employees"&&(s.textContent="Employees",i.textContent="+ Add employee"),console.log("Переключено на вкладку:",e);const a=C();g(e,a)}function w(){const t=document.querySelector(".nav-button--active").getAttribute("data-tab"),s=C();g(t,s),console.log("Период изменен на:",s)}function k(){const n=document.getElementById("project-panel");n&&n.classList.add("slide-panel--open")}function P(){const n=document.getElementById("project-panel");n&&n.classList.remove("slide-panel--open")}function ne(){const n=document.getElementById("employee-panel");n&&n.classList.add("slide-panel--open")}function x(){const n=document.getElementById("employee-panel");n&&n.classList.remove("slide-panel--open")}function ae(){const n=document.getElementById("sidebar"),t=document.getElementById("sidebar-toggle"),s=document.querySelectorAll(".nav-button");document.querySelectorAll(".sidebar__nav-btn");const i=document.getElementById("month-select"),o=document.getElementById("year-select"),e=document.getElementById("add-entity-btn"),a=document.getElementById("project-panel-close"),l=document.getElementById("project-panel-overlay"),r=document.getElementById("employee-panel-close"),c=document.getElementById("employee-panel-overlay");if(!i||!o)return;const d=localStorage.getItem("app-selected-month"),p=localStorage.getItem("app-selected-year");d&&(i.value=d),p&&(o.value=p);function u(){return o.value+"-"+i.value}let y="projects";i.addEventListener("change",function(){localStorage.setItem("app-selected-month",i.value),console.log("📅 Месяц изменен на:",i.value),g(y,u())}),o.addEventListener("change",function(){localStorage.setItem("app-selected-year",o.value),console.log("📅 Год изменен на:",o.value),g(y,u())}),n&&t&&t.addEventListener("click",function(){n.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),s.forEach(function(b){b.addEventListener("click",oe)}),i&&o&&(i.addEventListener("change",w),o.addEventListener("change",w)),e&&e.addEventListener("click",k),a&&a.addEventListener("click",P),l&&l.addEventListener("click",P),e&&e.addEventListener("click",function(){const b=document.querySelector(".nav-button--active").getAttribute("data-tab");b==="projects"?k():b==="employees"&&ne()}),r&&r.addEventListener("click",x),c&&c.addEventListener("click",x),g("projects",C())}function I(){const n=document.getElementById("proj-name"),t=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),i=document.getElementById("proj-capacity"),o=document.getElementById("proj-submit"),e=n.value.trim().length>0,a=t.value.trim().length>0,l=Number(s.value)>0,r=Number(i.value)>0;e&&a&&l&&r?o.disabled=!1:o.disabled=!0}function se(n){n.preventDefault();const t=document.getElementById("proj-name"),s=document.getElementById("proj-company"),i=document.getElementById("proj-budget"),o=document.getElementById("proj-capacity"),e=document.getElementById("month-select"),l=document.getElementById("year-select").value+"-"+e.value,c={id:"proj_"+Date.now(),projectName:t.value.trim(),companyName:s.value.trim(),budget:Number(i.value),capacity:Number(o.value)},d=f.getMonthData(l);d.projects.push(c);const p=f.getRawData();p[l]=d,f.saveData(p),console.log("✅ Новый проект успешно сохранен в Store:",c),g("projects",l),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const u=document.getElementById("project-panel");u&&u.classList.remove("slide-panel--open")}function le(){const n=document.getElementById("project-form");if(n){const t=document.getElementById("proj-name"),s=document.getElementById("proj-company"),i=document.getElementById("proj-budget"),o=document.getElementById("proj-capacity");t.addEventListener("input",I),s.addEventListener("input",I),i.addEventListener("input",I),o.addEventListener("input",I),n.addEventListener("submit",se)}}function j(){const n=document.getElementById("emp-name"),t=document.getElementById("emp-position"),s=document.getElementById("emp-age"),i=document.getElementById("emp-salary"),o=document.getElementById("emp-submit"),e=document.getElementById("error-emp-age"),a=n.value.trim().length>0,l=t.value.trim().length>0,r=Number(i.value)>0,c=Number(s.value);let d=!1;s.value.trim()===""?e.textContent="":c<18?e.textContent="The employee must be over 18 years of age":(e.textContent="",d=!0),a&&l&&d&&r?o.disabled=!1:o.disabled=!0}function ie(n){n.preventDefault();const t=document.getElementById("emp-name"),s=document.getElementById("emp-position"),i=document.getElementById("emp-age"),o=document.getElementById("emp-salary"),e=document.getElementById("month-select"),l=document.getElementById("year-select").value+"-"+e.value,r={id:"emp_"+Date.now(),name:t.value.trim(),position:s.value.trim(),age:Number(i.value),salary:Number(o.value)},c=f.getMonthData(l);c.employees.push(r);const d=f.getRawData();d[l]=c,f.saveData(d),console.log("✅ Новый сотрудник добавлен:",r),g("employees",l),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const p=document.getElementById("employee-panel");p&&p.classList.remove("slide-panel--open")}function ce(){const n=document.getElementById("employee-form");if(n){const t=document.getElementById("emp-name"),s=document.getElementById("emp-position"),i=document.getElementById("emp-age"),o=document.getElementById("emp-salary");t.addEventListener("input",j),s.addEventListener("input",j),i.addEventListener("input",j),o.addEventListener("input",j),n.addEventListener("submit",ie)}}function M(){const n=document.getElementById("assign-modal");n&&n.classList.remove("modal--open")}function re(){const n=document.getElementById("assign-modal"),t=document.getElementById("assign-capacity-range"),s=document.getElementById("assign-range-value"),i=document.getElementById("assign-form");if(!n)return;n.onclick=function(e){(e.target.id==="assign-modal-overlay"||e.target.id==="assign-modal-close")&&(console.log("🔒 Закрываем модальное окно..."),M())},t&&s&&(t.oninput=function(){s.textContent=t.value}),i&&(i.onsubmit=function(e){e.preventDefault();const a=document.getElementById("assign-project-id").value,l=document.getElementById("assign-emp-select").value,r=Number(t.value),c=document.getElementById("month-select"),p=document.getElementById("year-select").value+"-"+c.value;if(console.log("✏️ СОХРАНЯЕМ НАЗНАЧЕНИЕ. Ключ периода:",p),!l){alert("Please select an employee first!");return}const u=f.getMonthData(p);u.assignments||(u.assignments=[]);const y=u.assignments.find(function(_){return String(_.projectId)===String(a)&&String(_.employeeId)===String(l)});if(y)console.log("🔄 Сотрудник уже на проекте. Обновляем capacity с",y.capacity,"на",r),y.capacity=r;else{const _={projectId:a,employeeId:l,capacity:r};u.assignments.push(_),console.log("🔗 Новое назначение добавлено в Стор:",_)}const b=f.getRawData();b[p]=u,f.saveData(b),alert("Employee successfully assigned to the project!"),M(),renderCurrentTab("projects",p)});const o=document.getElementById("details-modal");o&&(o.onclick=function(e){(e.target.id==="details-modal-overlay"||e.target.id==="details-modal-close")&&o.classList.remove("modal--open")})}const L={"dashboard-app":`
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
`};class de{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const t=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${t.length}`),t.forEach(s=>{const i=s.getAttribute("data-component");this.loadComponent(s,i)})}loadComponent(t,s){console.log(`📥 Загружаю компонент: ${s}`),L[s]?(t.innerHTML=L[s],t.setAttribute("data-loaded","true"),this.loadedComponents.add(s),console.log(`✅ ${s} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${s}" не найден в components.js`),t.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${s}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(s=>{let i=!1;s.forEach(o=>{o.addedNodes.length&&o.addedNodes.forEach(e=>{e.nodeType===1&&e.querySelectorAll&&e.querySelectorAll("[data-component]").length>0&&(i=!0)})}),i&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new de().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const pe=f.getRawData();Object.keys(pe).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),f.saveData(q)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(L));console.log("📅 Данные за май 2026:",f.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),ae(),le(),ce(),re()},0)});
