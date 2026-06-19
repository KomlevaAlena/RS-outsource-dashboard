(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const e of a)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(a){const e={};return a.integrity&&(e.integrity=a.integrity),a.referrerPolicy&&(e.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?e.credentials="include":a.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function i(a){if(a.ep)return;a.ep=!0;const e=o(a);fetch(a.href,e)}})();const N="monthData",f={getRawData(){const n=localStorage.getItem(N);return n?JSON.parse(n):{}},saveData(n){const t=JSON.stringify(n);localStorage.setItem(N,t)},getMonthData(n){const t=this.getRawData();return t[n]?t[n]:{employees:[],projects:[]}}},q={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};let h=new Set,S=null,$="";function W(n,t){S=n,$=t;const o=document.getElementById("vacation-modal"),i=document.getElementById("vacation-modal-title"),a=document.getElementById("calendar-grid-container");if(!o||!a){console.error("❌ Элементы календаря не найдены в DOM");return}const e=t.split("-"),s=parseInt(e[0],10),l=parseInt(e[1],10),c=f.getMonthData(t).employees.find(d=>String(d.id)===String(n));if(c){i.textContent=`Availability for ${c.name}`;const d=c.vacations||[];h=new Set(d.map(Number))}else h=new Set;H(s,l,a),G(o,s,l,a),o.classList.add("modal--open"),console.log(`📅 Календарь открыт для сотрудника ${n} на период ${t}`)}function H(n,t,o){o.innerHTML=V(n,t),T(n,t)}function V(n,t){const o=new Date(n,t+1,0).getDate();let i=new Date(n,t,1).getDay()-1;i<0&&(i=6);const a=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];let e='<div class="calendar-grid">';a.forEach(s=>{e+=`<div class="calendar-header-cell ${s==="Sat"||s==="Sun"?"calendar-header-cell--weekend":""}">${s}</div>`});for(let s=0;s<i;s++)e+='<div class="calendar-day-cell calendar-day-cell--empty"></div>';for(let s=1;s<=o;s++){const r=new Date(n,t,s).getDay(),c=r===0||r===6;let d="calendar-day-cell calendar-day-target";c&&(d+=" calendar-day-cell--weekend"),h.has(s)&&(d+=" calendar-day-cell--selected"),e+=`<div class="${d}" data-day="${s}">${s}</div>`}return e+="</div>",e}function T(n,t){const o=new Date(n,t+1,0).getDate();let i=0,a=0;for(let c=1;c<=o;c++){const d=new Date(n,t,c).getDay();d===0||d===6||(i++,h.has(c)&&a++)}const e=i-a,s=document.getElementById("calendar-working-days");s&&(s.textContent=`Working Days: ${e}/${i} days`);const l=R(n,t),r=document.getElementById("calendar-vacation-ranges");r&&(r.textContent=l||"None")}function R(n,t){const o=Array.from(h).sort((l,r)=>l-r);if(o.length===0)return"";const i=[];let a=o[0],e=o[0];const s=l=>{const r=String(l).padStart(2,"0"),c=String(t+1).padStart(2,"0");return`${r}.${c}`};for(let l=1;l<o.length;l++){const r=o[l];let c=!1;if(r===e+1)c=!0;else{let d=!1;for(let p=e+1;p<r;p++){const u=new Date(n,t,p).getDay();if(u!==0&&u!==6){d=!0;break}}d||(c=!0)}c||(a===e?i.push(s(a)):i.push(`${s(a)}-${s(e)}`),a=r),e=r}return a===e?i.push(s(a)):i.push(`${s(a)}-${s(e)}`),i.join(", ")}function G(n,t,o,i){i.onclick=function(e){const s=e.target;if(!s.classList.contains("calendar-day-target"))return;const l=parseInt(s.getAttribute("data-day"),10);h.has(l)?(h.delete(l),s.classList.remove("calendar-day-cell--selected")):(h.add(l),s.classList.add("calendar-day-cell--selected")),T(t,o)},n.onclick=function(e){(e.target.id==="vacation-modal-overlay"||e.target.id==="vacation-modal-close")&&(n.classList.remove("modal--open"),console.log("🔒 Календарь закрыт"))};const a=document.getElementById("btn-save-vacation");a&&(a.onclick=function(){const e=f.getRawData(),r=((e[$]||{}).employees||[]).find(c=>String(c.id)===String(S));r&&(r.vacations=Array.from(h).sort((c,d)=>c-d),f.saveData(e),console.log(`💾 Отпуска сохранены для сотрудника ${S}:`,r.vacations),g("employees",$),n.classList.remove("modal--open"))})}function U(n,t){const o=new Date(n,t+1,0).getDate();let i=0;for(let a=1;a<=o;a++){const e=new Date(n,t,a).getDay();e===0||e===6||i++}return i}function J(n,t,o){if(!n||!Array.isArray(n)||n.length===0)return 0;let i=0;return n.forEach(a=>{const e=new Date(t,o,a).getDay();e===0||e===6||i++}),i}function E(n,t){const o=t.split("-"),i=parseInt(o[0],10),a=parseInt(o[1],10),e=U(i,a),s=n.vacations||[],l=J(s,i,a);if(e===0)return 0;const r=l/e;return Math.round(r*100)/100}function B(n,t){const i=100*(1-E(n,t));return Math.round(i)}function D(n,t,o,i){const a=t.filter(function(c){return String(c.projectId)===String(n.id)});let e=0,s=0;a.forEach(function(c){const d=o.find(function(p){return String(p.id)===String(c.employeeId)});if(d){e+=c.capacity;const p=E(d,i),u=d.salary*(c.capacity/100)*(1-p);s+=u}});const l=n.budget,r=l-s;return{effectiveCapacity:Math.round(e),expenses:Math.round(s),revenue:Math.round(l),profit:Math.round(r)}}function z(n,t,o,i){let a=0,e=0,s=0,l=0;return n.forEach(function(r){const c=D(r,t,o,i);a+=c.revenue,e+=c.effectiveCapacity,s+=c.expenses,l+=c.profit}),{totalBudget:a,totalCapacity:e,totalExpenses:s,totalProfit:l}}const m={tab:null,field:null,direction:"asc"};let y={projects:{companyName:"",projectName:""},employees:{name:"",surname:"",position:""},employeePosition:""};function Y(n,t){if(!confirm("Are you sure you want to delete this project?"))return;const i=f.getMonthData(t),a=i.projects.filter(function(s){return s.id!==n});i.projects=a;const e=f.getRawData();e[t]=i,f.saveData(e),console.log(`❌ Проект с ID ${n} успешно удален`),g("projects",t)}function Z(n,t){if(!confirm("Are you sure you want to remove this employee?"))return;const i=f.getMonthData(t);i.employees=i.employees.filter(function(e){return e.id!==n});const a=f.getRawData();a[t]=i,f.saveData(a),console.log(`❌ Сотрудник с ID ${n} удален`),g("employees",t)}function Q(n,t,o,i){const a=f.getMonthData(i),e=a.employees.find(s=>s.id===n);if(e){if(t==="salary"){const l=Number(o);if(isNaN(l)||l<=0){alert("Please enter the correct salary amount"),g("employees",i);return}e[t]=l}else{if(o.trim()===""){alert("The field cannot be empty"),g("employees",i);return}e[t]=o.trim()}const s=f.getRawData();s[i]=a,f.saveData(s),console.log(`📝 Сотрудник ${n}: поле ${t} обновлено на ${o}`)}}function X(n){const t=y[n];let o="",i=0;for(const a in t)if(t[a]&&t[a].trim()!==""){i++;const e=a.replace(/([A-Z])/g," $1").replace(/^./,s=>s.toUpperCase());o+=`
                <div class="filter-chip">
                    <span>${e}: <strong>${t[a]}</strong></span>
                    <button class="filter-chip__remove" data-filter-tab="${n}" data-filter-key="${a}">×</button>
                </div>
            `}return i>=2&&(o+=`
            <div class="filter-chip filter-chip--clear-all" data-filter-clear-tab="${n}">
                Clear Filters
            </div>
        `),`<div class="filter-chips-container">${o}</div>`}function K(n,t){let o=n.projects||[];const i=n.assignments||[],a=n.employees||[];if(y.projects.companyName&&y.projects.companyName.trim()!==""){const l=y.projects.companyName.toLowerCase().trim();o=o.filter(r=>r.companyName?r.companyName.toLowerCase().includes(l):!1)}if(y.projects.projectName&&y.projects.projectName.trim()!==""){const l=y.projects.projectName.toLowerCase().trim();o=o.filter(r=>r.projectName?r.projectName.toLowerCase().includes(l):!1)}m.tab==="projects"&&m.field&&(o=[...o].sort(function(l,r){let c,d;if(m.field==="expenses"||m.field==="profit"||m.field==="effectiveCapacity"){const p=D(l,i,a,t),u=D(r,i,a,t);c=p[m.field],d=u[m.field]}else c=l[m.field],d=r[m.field];return typeof c=="string"?m.direction==="asc"?c.localeCompare(d):d.localeCompare(c):m.direction==="asc"?c-d:d-c}));function e(l){return m.tab==="projects"&&m.field===l?m.direction==="asc"?" ↑":" ↓":""}let s=X("projects");return o.length===0?(s+='<p class="empty-state">No matching projects found</p>',s):(s+=` 
    <table class="table">
        <thead>
            <tr>
                <th class="sortable" data-sort="companyName">
                    Company${e("companyName")}
                    <span class="filter-icon" data-filter-field="companyName">⌕</span>
                </th>
                <th class="sortable" data-sort="projectName">
                    Project${e("projectName")}
                    <span class="filter-icon" data-filter-field="projectName">⌕</span>
                </th>
                <th class="sortable" data-sort="budget">Budget (Rev.)${e("budget")}</th>
                <th class="sortable" data-sort="effectiveCapacity">Capacity${e("effectiveCapacity")}</th>
                <th class="sortable" data-sort="expenses">Expenses${e("expenses")}</th>
                <th class="sortable" data-sort="profit">Profit${e("profit")}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `,o.forEach(function(l){const r=D(l,i,a,t),c=r.profit<0?"text-danger":"text-success";s+=`
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
        `}),s+="</tbody></table>",s)}function ee(n,t){if(n.length===0)return'<p class="empty-state">No employees added yet</p>';let o=n||[];const i=[];o.forEach(function(l){l.position&&!i.includes(l.position)&&i.push(l.position)}),i.sort(),y.employeePosition&&y.employeePosition!==""&&(o=o.filter(function(l){return l.position===y.employeePosition})),m.tab==="employees"&&m.field&&(o=[...o].sort(function(l,r){let c,d;return m.field==="vacationFactor"?(c=E(l,t),d=E(r,t)):m.field==="effectiveCapacity"?(c=B(l,t),d=B(r,t)):(c=l[m.field],d=r[m.field]),typeof c=="string"?m.direction==="asc"?c.localeCompare(d):d.localeCompare(c):m.direction==="asc"?c-d:d-c}));function a(l){return m.tab==="employees"&&m.field===l?m.direction==="asc"?" ↑":" ↓":""}let e='<option value="">All Positions</option>';i.forEach(function(l){const r=y.employeePosition===l?"selected":"";e+=`<option value="${l}" ${r}>${l}</option>`});let s=`
    <div class="table-actions">
        <select id="employee-position-filter" class="select select--filter" style="max-width: 250px; margin-bottom: 15px; padding: 6px 10px; border-radius: 4px; border: 1px solid #ccc;">
            ${e}
        </select>
    </div>
    `;return o.length===0?(s+='<p class="empty-state">No employees found for this position</p>',s):(s+=`
    <table class="table">
        <thead>
            <tr>
                <th class="sortable" data-sort="name">Name${a("name")}</th>
                <th class="sortable" data-sort="position">Position${a("position")}</th>
                <th class="sortable" data-sort="age">Age${a("age")}</th>
                <th class="sortable" data-sort="salary">Salary${a("salary")}</th>
                <th class="sortable" data-sort="vacationFactor">Vacation Factor${a("vacationFactor")}</th>
                <th class="sortable" data-sort="effectiveCapacity">Eff. Capacity${a("effectiveCapacity")}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `,o.forEach(function(l){const r=E(l,t),c=B(l,t);s+=`
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
        `}),s+="</tbody></table>",s)}function te(n,t){const o=n.projects||[],i=n.assignments||[],a=n.employees||[],e=o.length,s=z(o,i,a,t);return` 
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
    `}function F(n,t){const o=document.getElementById("details-modal"),i=document.getElementById("details-modal-body"),a=document.getElementById("details-modal-title");if(!o||!i)return;typeof f.loadFromLocalStorage=="function"&&f.loadFromLocalStorage();const e=f.getMonthData(t),s=e.projects||[],l=e.employees||[],r=e.assignments||[],c=s.find(p=>p.id===n);c&&(a.textContent=`Team for "${c.projectName}"`);const d=r.filter(p=>String(p.projectId)===String(n));if(d.length===0)i.innerHTML='<p class="empty-state">No employees assigned to this project yet.</p>';else{let p='<ul class="team-list">';d.forEach(function(u){const v=l.find(b=>String(b.id)===String(u.employeeId));v&&(p+=`
                    <li class="team-item">
                        <div class="team-item__info">
                            <strong class="team-item__name">${v.name}</strong>
                            <span class="team-item__position">${v.position}</span>
                        </div>
                        <div class="team-item__actions">
                            <span class="team-item__capacity">${u.capacity}% load</span>
                            <button class="btn-remove-asm" 
                                    data-project-id="${n}" 
                                    data-employee-id="${v.id}" 
                                    title="Remove from project">×</button>
                        </div>
                    </li>
                `)}),p+="</ul>",i.innerHTML=p}o.onclick=function(p){if(p.target.classList.contains("btn-remove-asm")){const u=p.target.getAttribute("data-project-id"),v=p.target.getAttribute("data-employee-id");if(!confirm("Are you sure you want to remove this employee from the project?"))return;const b=f.getRawData(),_=b[t]||{},O=_.assignments||[];_.assignments=O.filter(function(A){return!(String(A.projectId)===String(u)&&String(A.employeeId)===String(v))}),f.saveData(b),F(u,t),g("projects",t);return}(p.target.id==="details-modal-overlay"||p.target.id==="details-modal-close")&&o.classList.remove("modal--open")},o.classList.add("modal--open")}function ae(n,t){const o=document.getElementById("assign-modal"),i=document.getElementById("assign-project-id"),a=document.getElementById("assign-emp-select");if(!o||!a)return;i&&(i.value=n);const e=f.getMonthData(t),s=e&&e.employees?e.employees:[];if(s.length===0)a.innerHTML='<option value="">-- No employees available --</option>';else{let c='<option value="">-- Select an employee --</option>';s.forEach(function(d){const p=d.name||"Unknown Name",u=d.position||"No Position";c+=`<option value="${d.id}">${p} (${u})</option>`}),a.innerHTML=c}const l=document.getElementById("assign-capacity-range"),r=document.getElementById("assign-range-value");l&&(l.value=50),r&&(r.textContent="50"),o.classList.add("modal--open")}function g(n,t){const o=document.getElementById("table-container");if(!o)return;const i=f.getMonthData(t);if(n==="projects"){const a=te(i,t),e=K(i,t);o.innerHTML=a+e,o.onclick=function(s){if(s.target.classList.contains("sortable")){const c=s.target.getAttribute("data-sort");m.tab==="projects"&&m.field===c?m.direction=m.direction==="asc"?"desc":"asc":(m.tab="projects",m.field=c,m.direction="asc"),g("projects",t);return}if(s.target.classList.contains("filter-icon")){s.stopPropagation();const c=document.querySelector(".filter-popup");c&&c.remove();const d=s.target.getAttribute("data-filter-field"),p=s.target.closest("th"),u=document.createElement("div");u.className="filter-popup",u.innerHTML=`
                    <input type="text" id="filter-popup-input" class="filter-popup__input" placeholder="Search..." value="${y.projects[d]}">
                    <div class="filter-popup__actions">
                        <button class="filter-popup__btn" id="filter-btn-cancel">Cancel</button>
                        <button class="filter-popup__btn filter-popup__btn--apply" id="filter-btn-apply" data-field="${d}">Apply</button>
                    </div>
                `,p.appendChild(u);const v=u.querySelector("#filter-popup-input");v.focus(),v.onkeydown=function(b){b.key==="Enter"&&u.querySelector("#filter-btn-apply").click()};return}if(s.target.id==="filter-btn-apply"){const c=s.target.getAttribute("data-field"),d=document.getElementById("filter-popup-input").value;y.projects[c]=d,g("projects",t);return}if(s.target.id==="filter-btn-cancel"){const c=s.target.closest(".filter-popup");c&&c.remove();return}if(s.target.classList.contains("filter-chip__remove")){const c=s.target.getAttribute("data-filter-key");y.projects[c]="",g("projects",t);return}if(s.target.classList.contains("filter-chip--clear-all")){y.projects.companyName="",y.projects.projectName="",g("projects",t);return}const l=document.querySelector(".filter-popup");if(l&&!s.target.closest(".filter-popup")&&l.remove(),s.target.classList.contains("btn-delete")){const c=s.target.getAttribute("data-id");Y(c,t)}if(s.target.classList.contains("btn-assign")){const c=s.target.getAttribute("data-id");ae(c,t)}const r=s.target.closest(".clickable-capacity");if(r){const c=r.getAttribute("data-id");F(c,t)}}}else n==="employees"&&(o.innerHTML=ee(i.employees,t),o.onclick=function(a){if(a.target.classList.contains("sortable")){const e=a.target.getAttribute("data-sort");m.tab==="employees"&&m.field===e?m.direction=m.direction==="asc"?"desc":"asc":(m.tab="employees",m.field=e,m.direction="asc"),g("employees",t);return}if(a.target.classList.contains("btn-availability")){const e=a.target.getAttribute("data-id");W(e,t)}if(a.target.classList.contains("btn-delete--emp")){const e=a.target.getAttribute("data-id");Z(e,t)}},o.onchange=function(a){a.target.id==="employee-position-filter"&&(y.employeePosition=a.target.value,g("employees",t))},o.ondblclick=function(a){const e=a.target;if(e.classList.contains("editable")&&!e.querySelector("input")){let p=function(){const u=d.value;Q(r,c,u,t),g("employees",t)};var s=p;const l=e.textContent.replace(" $","").trim(),r=e.getAttribute("data-id"),c=e.getAttribute("data-field"),d=document.createElement("input");d.type=c==="salary"?"number":"text",d.value=l,d.className="table-inline-input",e.innerHTML="",e.appendChild(d),d.focus(),d.onkeydown=function(u){u.key==="Enter"&&p()},d.onblur=function(){p()}}})}function L(){const n=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+n.value}function ne(n){const t=document.querySelectorAll(".nav-button"),o=document.getElementById("page-title"),i=document.getElementById("add-entity-btn");t.forEach(function(l){l.classList.remove("nav-button--active")});const a=n.currentTarget;a.classList.add("nav-button--active");const e=a.getAttribute("data-tab");e==="projects"?(o.textContent="Projects",i.textContent="+ Add projects"):e==="employees"&&(o.textContent="Employees",i.textContent="+ Add employee"),console.log("Переключено на вкладку:",e);const s=L();g(e,s)}function k(){const t=document.querySelector(".nav-button--active").getAttribute("data-tab"),o=L();g(t,o),console.log("Период изменен на:",o)}function w(){const n=document.getElementById("project-panel");n&&n.classList.add("slide-panel--open")}function P(){const n=document.getElementById("project-panel");n&&n.classList.remove("slide-panel--open")}function oe(){const n=document.getElementById("employee-panel");n&&n.classList.add("slide-panel--open")}function x(){const n=document.getElementById("employee-panel");n&&n.classList.remove("slide-panel--open")}function se(){const n=document.getElementById("sidebar"),t=document.getElementById("sidebar-toggle"),o=document.querySelectorAll(".nav-button");document.querySelectorAll(".sidebar__nav-btn");const i=document.getElementById("month-select"),a=document.getElementById("year-select"),e=document.getElementById("add-entity-btn"),s=document.getElementById("project-panel-close"),l=document.getElementById("project-panel-overlay"),r=document.getElementById("employee-panel-close"),c=document.getElementById("employee-panel-overlay");if(!i||!a)return;const d=localStorage.getItem("app-selected-month"),p=localStorage.getItem("app-selected-year");d&&(i.value=d),p&&(a.value=p);function u(){return a.value+"-"+i.value}let v="projects";i.addEventListener("change",function(){localStorage.setItem("app-selected-month",i.value),console.log("📅 Месяц изменен на:",i.value),g(v,u())}),a.addEventListener("change",function(){localStorage.setItem("app-selected-year",a.value),console.log("📅 Год изменен на:",a.value),g(v,u())}),n&&t&&t.addEventListener("click",function(){n.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),o.forEach(function(b){b.addEventListener("click",ne)}),i&&a&&(i.addEventListener("change",k),a.addEventListener("change",k)),e&&e.addEventListener("click",w),s&&s.addEventListener("click",P),l&&l.addEventListener("click",P),e&&e.addEventListener("click",function(){const b=document.querySelector(".nav-button--active").getAttribute("data-tab");b==="projects"?w():b==="employees"&&oe()}),r&&r.addEventListener("click",x),c&&c.addEventListener("click",x),g("projects",L())}function I(){const n=document.getElementById("proj-name"),t=document.getElementById("proj-company"),o=document.getElementById("proj-budget"),i=document.getElementById("proj-capacity"),a=document.getElementById("proj-submit"),e=n.value.trim().length>0,s=t.value.trim().length>0,l=Number(o.value)>0,r=Number(i.value)>0;e&&s&&l&&r?a.disabled=!1:a.disabled=!0}function le(n){n.preventDefault();const t=document.getElementById("proj-name"),o=document.getElementById("proj-company"),i=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity"),e=document.getElementById("month-select"),l=document.getElementById("year-select").value+"-"+e.value,c={id:"proj_"+Date.now(),projectName:t.value.trim(),companyName:o.value.trim(),budget:Number(i.value),capacity:Number(a.value)},d=f.getMonthData(l);d.projects.push(c);const p=f.getRawData();p[l]=d,f.saveData(p),console.log("✅ Новый проект успешно сохранен в Store:",c),g("projects",l),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const u=document.getElementById("project-panel");u&&u.classList.remove("slide-panel--open")}function ie(){const n=document.getElementById("project-form");if(n){const t=document.getElementById("proj-name"),o=document.getElementById("proj-company"),i=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity");t.addEventListener("input",I),o.addEventListener("input",I),i.addEventListener("input",I),a.addEventListener("input",I),n.addEventListener("submit",le)}}function j(){const n=document.getElementById("emp-name"),t=document.getElementById("emp-position"),o=document.getElementById("emp-age"),i=document.getElementById("emp-salary"),a=document.getElementById("emp-submit"),e=document.getElementById("error-emp-age"),s=n.value.trim().length>0,l=t.value.trim().length>0,r=Number(i.value)>0,c=Number(o.value);let d=!1;o.value.trim()===""?e.textContent="":c<18?e.textContent="The employee must be over 18 years of age":(e.textContent="",d=!0),s&&l&&d&&r?a.disabled=!1:a.disabled=!0}function ce(n){n.preventDefault();const t=document.getElementById("emp-name"),o=document.getElementById("emp-position"),i=document.getElementById("emp-age"),a=document.getElementById("emp-salary"),e=document.getElementById("month-select"),l=document.getElementById("year-select").value+"-"+e.value,r={id:"emp_"+Date.now(),name:t.value.trim(),position:o.value.trim(),age:Number(i.value),salary:Number(a.value)},c=f.getMonthData(l);c.employees.push(r);const d=f.getRawData();d[l]=c,f.saveData(d),console.log("✅ Новый сотрудник добавлен:",r),g("employees",l),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const p=document.getElementById("employee-panel");p&&p.classList.remove("slide-panel--open")}function re(){const n=document.getElementById("employee-form");if(n){const t=document.getElementById("emp-name"),o=document.getElementById("emp-position"),i=document.getElementById("emp-age"),a=document.getElementById("emp-salary");t.addEventListener("input",j),o.addEventListener("input",j),i.addEventListener("input",j),a.addEventListener("input",j),n.addEventListener("submit",ce)}}function M(){const n=document.getElementById("assign-modal");n&&n.classList.remove("modal--open")}function de(){const n=document.getElementById("assign-modal"),t=document.getElementById("assign-capacity-range"),o=document.getElementById("assign-range-value"),i=document.getElementById("assign-form");if(!n)return;n.onclick=function(e){(e.target.id==="assign-modal-overlay"||e.target.id==="assign-modal-close")&&(console.log("🔒 Закрываем модальное окно..."),M())},t&&o&&(t.oninput=function(){o.textContent=t.value}),i&&(i.onsubmit=function(e){e.preventDefault();const s=document.getElementById("assign-project-id").value,l=document.getElementById("assign-emp-select").value,r=Number(t.value),c=document.getElementById("month-select"),p=document.getElementById("year-select").value+"-"+c.value;if(console.log("✏️ СОХРАНЯЕМ НАЗНАЧЕНИЕ. Ключ периода:",p),!l){alert("Please select an employee first!");return}const u=f.getMonthData(p);u.assignments||(u.assignments=[]);const v=u.assignments.find(function(_){return String(_.projectId)===String(s)&&String(_.employeeId)===String(l)});if(v)console.log("🔄 Сотрудник уже на проекте. Обновляем capacity с",v.capacity,"на",r),v.capacity=r;else{const _={projectId:s,employeeId:l,capacity:r};u.assignments.push(_),console.log("🔗 Новое назначение добавлено в Стор:",_)}const b=f.getRawData();b[p]=u,f.saveData(b),alert("Employee successfully assigned to the project!"),M(),renderCurrentTab("projects",p)});const a=document.getElementById("details-modal");a&&(a.onclick=function(e){(e.target.id==="details-modal-overlay"||e.target.id==="details-modal-close")&&a.classList.remove("modal--open")})}const C={"dashboard-app":`
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
`};class pe{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const t=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${t.length}`),t.forEach(o=>{const i=o.getAttribute("data-component");this.loadComponent(o,i)})}loadComponent(t,o){console.log(`📥 Загружаю компонент: ${o}`),C[o]?(t.innerHTML=C[o],t.setAttribute("data-loaded","true"),this.loadedComponents.add(o),console.log(`✅ ${o} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${o}" не найден в components.js`),t.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${o}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(o=>{let i=!1;o.forEach(a=>{a.addedNodes.length&&a.addedNodes.forEach(e=>{e.nodeType===1&&e.querySelectorAll&&e.querySelectorAll("[data-component]").length>0&&(i=!0)})}),i&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new pe().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const me=f.getRawData();Object.keys(me).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),f.saveData(q)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(C));console.log("📅 Данные за май 2026:",f.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),se(),ie(),re(),de()},0)});
