(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function l(t){if(t.ep)return;t.ep=!0;const e=s(t);fetch(t.href,e)}})();const N="monthData",f={getRawData(){const o=localStorage.getItem(N);return o?JSON.parse(o):{}},saveData(o){const n=JSON.stringify(o);localStorage.setItem(N,n)},getMonthData(o){const n=this.getRawData();return n[o]?n[o]:{employees:[],projects:[]}}},W={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};let h=new Set,B=null,L="";function H(o,n){B=o,L=n;const s=document.getElementById("vacation-modal"),l=document.getElementById("vacation-modal-title"),t=document.getElementById("calendar-grid-container");if(!s||!t){console.error("❌ Элементы календаря не найдены в DOM");return}const e=n.split("-"),a=parseInt(e[0],10),i=parseInt(e[1],10),c=f.getMonthData(n).employees.find(d=>String(d.id)===String(o));if(c){l.textContent=`Availability for ${c.name}`;const d=c.vacations||[];h=new Set(d.map(Number))}else h=new Set;V(a,i,t),U(s,a,i,t),s.classList.add("modal--open"),console.log(`📅 Календарь открыт для сотрудника ${o} на период ${n}`)}function V(o,n,s){s.innerHTML=R(o,n),T(o,n)}function R(o,n){const s=new Date(o,n+1,0).getDate();let l=new Date(o,n,1).getDay()-1;l<0&&(l=6);const t=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];let e='<div class="calendar-grid">';t.forEach(a=>{e+=`<div class="calendar-header-cell ${a==="Sat"||a==="Sun"?"calendar-header-cell--weekend":""}">${a}</div>`});for(let a=0;a<l;a++)e+='<div class="calendar-day-cell calendar-day-cell--empty"></div>';for(let a=1;a<=s;a++){const r=new Date(o,n,a).getDay(),c=r===0||r===6;let d="calendar-day-cell calendar-day-target";c&&(d+=" calendar-day-cell--weekend"),h.has(a)&&(d+=" calendar-day-cell--selected"),e+=`<div class="${d}" data-day="${a}">${a}</div>`}return e+="</div>",e}function T(o,n){const s=new Date(o,n+1,0).getDate();let l=0,t=0;for(let c=1;c<=s;c++){const d=new Date(o,n,c).getDay();d===0||d===6||(l++,h.has(c)&&t++)}const e=l-t,a=document.getElementById("calendar-working-days");a&&(a.textContent=`Working Days: ${e}/${l} days`);const i=G(o,n),r=document.getElementById("calendar-vacation-ranges");r&&(r.textContent=i||"None")}function G(o,n){const s=Array.from(h).sort((i,r)=>i-r);if(s.length===0)return"";const l=[];let t=s[0],e=s[0];const a=i=>{const r=String(i).padStart(2,"0"),c=String(n+1).padStart(2,"0");return`${r}.${c}`};for(let i=1;i<s.length;i++){const r=s[i];let c=!1;if(r===e+1)c=!0;else{let d=!1;for(let p=e+1;p<r;p++){const u=new Date(o,n,p).getDay();if(u!==0&&u!==6){d=!0;break}}d||(c=!0)}c||(t===e?l.push(a(t)):l.push(`${a(t)}-${a(e)}`),t=r),e=r}return t===e?l.push(a(t)):l.push(`${a(t)}-${a(e)}`),l.join(", ")}function U(o,n,s,l){l.onclick=function(e){const a=e.target;if(!a.classList.contains("calendar-day-target"))return;const i=parseInt(a.getAttribute("data-day"),10);h.has(i)?(h.delete(i),a.classList.remove("calendar-day-cell--selected")):(h.add(i),a.classList.add("calendar-day-cell--selected")),T(n,s)},o.onclick=function(e){(e.target.id==="vacation-modal-overlay"||e.target.id==="vacation-modal-close")&&(o.classList.remove("modal--open"),console.log("🔒 Календарь закрыт"))};const t=document.getElementById("btn-save-vacation");t&&(t.onclick=function(){const e=f.getRawData(),r=((e[L]||{}).employees||[]).find(c=>String(c.id)===String(B));r&&(r.vacations=Array.from(h).sort((c,d)=>c-d),f.saveData(e),console.log(`💾 Отпуска сохранены для сотрудника ${B}:`,r.vacations),y("employees",L),o.classList.remove("modal--open"))})}function J(o,n){const s=new Date(o,n+1,0).getDate();let l=0;for(let t=1;t<=s;t++){const e=new Date(o,n,t).getDay();e===0||e===6||l++}return l}function z(o,n,s){if(!o||!Array.isArray(o)||o.length===0)return 0;let l=0;return o.forEach(t=>{const e=new Date(n,s,t).getDay();e===0||e===6||l++}),l}function E(o,n){const s=n.split("-"),l=parseInt(s[0],10),t=parseInt(s[1],10),e=J(l,t),a=o.vacations||[],i=z(a,l,t);if(e===0)return 0;const r=i/e;return Math.round(r*100)/100}function S(o,n){const l=100*(1-E(o,n));return Math.round(l)}function D(o,n,s,l){const t=n.filter(function(c){return String(c.projectId)===String(o.id)});let e=0,a=0;t.forEach(function(c){const d=s.find(function(p){return String(p.id)===String(c.employeeId)});if(d){e+=c.capacity;const p=E(d,l),u=d.salary*(c.capacity/100)*(1-p);a+=u}});const i=o.budget,r=i-a;return{effectiveCapacity:Math.round(e),expenses:Math.round(a),revenue:Math.round(i),profit:Math.round(r)}}function Y(o,n,s,l){let t=0,e=0,a=0,i=0;return o.forEach(function(r){const c=D(r,n,s,l);t+=c.revenue,e+=c.effectiveCapacity,a+=c.expenses,i+=c.profit}),{totalBudget:t,totalCapacity:e,totalExpenses:a,totalProfit:i}}const m={tab:null,field:null,direction:"asc"};let g={projects:{companyName:"",projectName:""},employees:{name:"",surname:"",position:""},employeePosition:""};function Z(o,n){if(!confirm("Are you sure you want to delete this project?"))return;const l=f.getMonthData(n),t=l.projects.filter(function(a){return a.id!==o});l.projects=t;const e=f.getRawData();e[n]=l,f.saveData(e),console.log(`❌ Проект с ID ${o} успешно удален`),y("projects",n)}function Q(o,n){if(!confirm("Are you sure you want to remove this employee?"))return;const l=f.getMonthData(n);l.employees=l.employees.filter(function(e){return e.id!==o});const t=f.getRawData();t[n]=l,f.saveData(t),console.log(`❌ Сотрудник с ID ${o} удален`),y("employees",n)}function X(o,n,s,l){const t=f.getMonthData(l),e=t.employees.find(a=>a.id===o);if(e){if(n==="salary"){const i=Number(s);if(isNaN(i)||i<=0){alert("Please enter the correct salary amount"),y("employees",l);return}e[n]=i}else{if(s.trim()===""){alert("The field cannot be empty"),y("employees",l);return}e[n]=s.trim()}const a=f.getRawData();a[l]=t,f.saveData(a),console.log(`📝 Сотрудник ${o}: поле ${n} обновлено на ${s}`)}}function q(o){const n=g[o];let s="",l=0;for(const t in n)if(n[t]&&n[t].trim()!==""){l++;const e=t.replace(/([A-Z])/g," $1").replace(/^./,a=>a.toUpperCase());s+=`
                <div class="filter-chip">
                    <span>${e}: <strong>${n[t]}</strong></span>
                    <button class="filter-chip__remove" data-filter-tab="${o}" data-filter-key="${t}">×</button>
                </div>
            `}return l>=2&&(s+=`
            <div class="filter-chip filter-chip--clear-all" data-filter-clear-tab="${o}">
                Clear Filters
            </div>
        `),`<div class="filter-chips-container">${s}</div>`}function K(o,n){let s=o.projects||[];const l=o.assignments||[],t=o.employees||[];if(g.projects.companyName&&g.projects.companyName.trim()!==""){const i=g.projects.companyName.toLowerCase().trim();s=s.filter(r=>r.companyName?r.companyName.toLowerCase().includes(i):!1)}if(g.projects.projectName&&g.projects.projectName.trim()!==""){const i=g.projects.projectName.toLowerCase().trim();s=s.filter(r=>r.projectName?r.projectName.toLowerCase().includes(i):!1)}m.tab==="projects"&&m.field&&(s=[...s].sort(function(i,r){let c,d;if(m.field==="expenses"||m.field==="profit"||m.field==="effectiveCapacity"){const p=D(i,l,t,n),u=D(r,l,t,n);c=p[m.field],d=u[m.field]}else c=i[m.field],d=r[m.field];return typeof c=="string"?m.direction==="asc"?c.localeCompare(d):d.localeCompare(c):m.direction==="asc"?c-d:d-c}));function e(i){return m.tab==="projects"&&m.field===i?m.direction==="asc"?" ↑":" ↓":""}let a=q("projects");return s.length===0?(a+='<p class="empty-state">No matching projects found</p>',a):(a+=` 
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
    `,s.forEach(function(i){const r=D(i,l,t,n),c=r.profit<0?"text-danger":"text-success";a+=`
            <tr>
                <td>${i.companyName}</td>
                <td>${i.projectName}</td>
                <td>${i.budget.toLocaleString()} $</td>
                <td class="clickable-capacity" data-id="${i.id}">
                    <span class="capacity-link">${r.effectiveCapacity} / ${i.capacity} p.</span>
                </td>
                <td>${r.expenses.toLocaleString()} $</td>
                <td class="${c}"><strong>${r.profit.toLocaleString()} $</strong></td>
                <td>
                    <button class="btn-assign" data-id="${i.id}">Assign</button>
                    <button class="btn-delete" data-id="${i.id}">Delete</button>
                </td>
            </tr>
        `}),a+="</tbody></table>",a)}function ee(o,n){if(o.length===0)return'<p class="empty-state">No employees added yet</p>';let s=o||[];if(g.employees.name&&g.employees.name.trim()!==""){const e=g.employees.name.toLowerCase().trim();s=s.filter(a=>a.name?(a.name.split(" ")[0]||"").toLowerCase().includes(e):!1)}if(g.employees.surname&&g.employees.surname.trim()!==""){const e=g.employees.surname.toLowerCase().trim();s=s.filter(a=>a.name?(a.name.split(" ").slice(1).join(" ")||"").toLowerCase().includes(e):!1)}if(g.employees.position&&g.employees.position.trim()!==""){const e=g.employees.position.toLowerCase().trim();s=s.filter(a=>a.position?a.position.toLowerCase().includes(e):falses)}m.tab==="employees"&&m.field&&(s=[...s].sort(function(e,a){let i,r;return m.field==="vacationFactor"?(i=E(e,n),r=E(a,n)):m.field==="effectiveCapacity"?(i=S(e,n),r=S(a,n)):(i=e[m.field],r=a[m.field]),typeof i=="string"?m.direction==="asc"?i.localeCompare(r):r.localeCompare(i):m.direction==="asc"?i-r:r-i}));function l(e){return m.tab==="employees"&&m.field===e?m.direction==="asc"?" ↑":" ↓":""}if(s.length===0)return t+='<p class="empty-state">No employees found for this position</p>',t;let t=q("employees");return s.length===0?(t+='<p class="empty-state">No employees found matching filters</p>',t):(t+=`
    <table class="table">
        <thead>
            <tr>
            <th class="sortable" data-sort="name">
                    Name${l("name")}
                    <span class="filter-icon" data-filter-field="name">⌕</span>
                </th>
                <th>
                    Surname
                    <span class="filter-icon" data-filter-field="surname">⌕</span>
                </th>
                <th class="sortable" data-sort="position">
                    Position${l("position")}
                    <span class="filter-icon" data-filter-field="position">⌕</span>
                </th>
                <th class="sortable" data-sort="name">Name${l("name")}</th>
                <th class="sortable" data-sort="position">Position${l("position")}</th>
                <th class="sortable" data-sort="age">Age${l("age")}</th>
                <th class="sortable" data-sort="salary">Salary${l("salary")}</th>
                <th class="sortable" data-sort="vacationFactor">Vacation Factor${l("vacationFactor")}</th>
                <th class="sortable" data-sort="effectiveCapacity">Eff. Capacity${l("effectiveCapacity")}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `,s.forEach(function(e){const a=E(e,n),i=S(e,n);t+=`
            <tr>
                <td>${e.name}</td>
                <td class="editable" data-id="${e.id}" data-field="position">${e.position}</td>
                <td>${e.age} y.o.</td>
                <td class="editable" data-id="${e.id}" data-field="salary">${e.salary} $</td>
                <td><span class="badge badge--factor">${a}</span></td>
                <td><span class="badge badge--capacity">${i}%</span></td>
                <td>
                    <button class="btn-delete btn-delete--emp" data-id="${e.id}">Delete</button>
                    <button class="btn-availability" data-id="${e.id}">Availability</button>
                </td>
            </tr>
        `}),t+="</tbody></table>",t)}function te(o,n){const s=o.projects||[],l=o.assignments||[],t=o.employees||[],e=s.length,a=Y(s,l,t,n);return` 
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
    `}function F(o,n){const s=document.getElementById("details-modal"),l=document.getElementById("details-modal-body"),t=document.getElementById("details-modal-title");if(!s||!l)return;typeof f.loadFromLocalStorage=="function"&&f.loadFromLocalStorage();const e=f.getMonthData(n),a=e.projects||[],i=e.employees||[],r=e.assignments||[],c=a.find(p=>p.id===o);c&&(t.textContent=`Team for "${c.projectName}"`);const d=r.filter(p=>String(p.projectId)===String(o));if(d.length===0)l.innerHTML='<p class="empty-state">No employees assigned to this project yet.</p>';else{let p='<ul class="team-list">';d.forEach(function(u){const v=i.find(b=>String(b.id)===String(u.employeeId));v&&(p+=`
                    <li class="team-item">
                        <div class="team-item__info">
                            <strong class="team-item__name">${v.name}</strong>
                            <span class="team-item__position">${v.position}</span>
                        </div>
                        <div class="team-item__actions">
                            <span class="team-item__capacity">${u.capacity}% load</span>
                            <button class="btn-remove-asm" 
                                    data-project-id="${o}" 
                                    data-employee-id="${v.id}" 
                                    title="Remove from project">×</button>
                        </div>
                    </li>
                `)}),p+="</ul>",l.innerHTML=p}s.onclick=function(p){if(p.target.classList.contains("btn-remove-asm")){const u=p.target.getAttribute("data-project-id"),v=p.target.getAttribute("data-employee-id");if(!confirm("Are you sure you want to remove this employee from the project?"))return;const b=f.getRawData(),_=b[n]||{},O=_.assignments||[];_.assignments=O.filter(function(A){return!(String(A.projectId)===String(u)&&String(A.employeeId)===String(v))}),f.saveData(b),F(u,n),y("projects",n);return}(p.target.id==="details-modal-overlay"||p.target.id==="details-modal-close")&&s.classList.remove("modal--open")},s.classList.add("modal--open")}function ae(o,n){const s=document.getElementById("assign-modal"),l=document.getElementById("assign-project-id"),t=document.getElementById("assign-emp-select");if(!s||!t)return;l&&(l.value=o);const e=f.getMonthData(n),a=e&&e.employees?e.employees:[];if(a.length===0)t.innerHTML='<option value="">-- No employees available --</option>';else{let c='<option value="">-- Select an employee --</option>';a.forEach(function(d){const p=d.name||"Unknown Name",u=d.position||"No Position";c+=`<option value="${d.id}">${p} (${u})</option>`}),t.innerHTML=c}const i=document.getElementById("assign-capacity-range"),r=document.getElementById("assign-range-value");i&&(i.value=50),r&&(r.textContent="50"),s.classList.add("modal--open")}function y(o,n){const s=document.getElementById("table-container");if(!s)return;const l=f.getMonthData(n);if(o==="projects"){const t=te(l,n),e=K(l,n);s.innerHTML=t+e,s.onclick=function(a){if(a.target.classList.contains("sortable")){const c=a.target.getAttribute("data-sort");m.tab==="projects"&&m.field===c?m.direction=m.direction==="asc"?"desc":"asc":(m.tab="projects",m.field=c,m.direction="asc"),y("projects",n);return}if(a.target.classList.contains("filter-icon")){a.stopPropagation();const c=document.querySelector(".filter-popup");c&&c.remove();const d=a.target.getAttribute("data-filter-field"),p=a.target.closest("th"),u=document.createElement("div");u.className="filter-popup",u.innerHTML=`
                    <input type="text" id="filter-popup-input" class="filter-popup__input" placeholder="Search..." value="${g.projects[d]}">
                    <div class="filter-popup__actions">
                        <button class="filter-popup__btn" id="filter-btn-cancel">Cancel</button>
                        <button class="filter-popup__btn filter-popup__btn--apply" id="filter-btn-apply" data-field="${d}">Apply</button>
                    </div>
                `,p.appendChild(u);const v=u.querySelector("#filter-popup-input");v.focus(),v.onkeydown=function(b){b.key==="Enter"&&u.querySelector("#filter-btn-apply").click()};return}if(a.target.id==="filter-btn-apply"){const c=a.target.getAttribute("data-field"),d=document.getElementById("filter-popup-input").value;g.projects[c]=d,y("projects",n);return}if(a.target.id==="filter-btn-cancel"){const c=a.target.closest(".filter-popup");c&&c.remove();return}if(a.target.classList.contains("filter-chip__remove")){const c=a.target.getAttribute("data-filter-key");g.projects[c]="",y("projects",n);return}if(a.target.classList.contains("filter-chip--clear-all")){g.projects.companyName="",g.projects.projectName="",y("projects",n);return}const i=document.querySelector(".filter-popup");if(i&&!a.target.closest(".filter-popup")&&i.remove(),a.target.classList.contains("btn-delete")){const c=a.target.getAttribute("data-id");Z(c,n)}if(a.target.classList.contains("btn-assign")){const c=a.target.getAttribute("data-id");ae(c,n)}const r=a.target.closest(".clickable-capacity");if(r){const c=r.getAttribute("data-id");F(c,n)}}}else o==="employees"&&(s.innerHTML=ee(l.employees,n),s.onclick=function(t){if(t.target.classList.contains("sortable")){const a=t.target.getAttribute("data-sort");m.tab==="employees"&&m.field===a?m.direction=m.direction==="asc"?"desc":"asc":(m.tab="employees",m.field=a,m.direction="asc"),y("employees",n);return}if(t.target.classList.contains("filter-icon")){t.stopPropagation();const a=document.querySelector(".filter-popup");a&&a.remove();const i=t.target.getAttribute("data-filter-field"),r=t.target.closest("th"),c=document.createElement("div");c.className="filter-popup",c.innerHTML=`
                    <input type="text" id="filter-popup-input" class="filter-popup__input" placeholder="Search..." value="${g.employees[i]}">
                    <div class="filter-popup__actions">
                        <button class="filter-popup__btn" id="filter-btn-cancel">Cancel</button>
                        <button class="filter-popup__btn filter-popup__btn--apply" id="filter-btn-apply" data-field="${i}">Apply</button>
                    </div>
                `,r.appendChild(c);const d=c.querySelector("#filter-popup-input");d.focus(),d.onkeydown=function(p){p.key==="Enter"&&c.querySelector("#filter-btn-apply").click()};return}if(t.target.id==="filter-btn-apply"){const a=t.target.getAttribute("data-field"),i=document.getElementById("filter-popup-input").value;g.employees[a]=i,y("employees",n);return}if(t.target.id==="filter-btn-cancel"){const a=t.target.closest(".filter-popup");a&&a.remove();return}if(t.target.classList.contains("filter-chip__remove")){const a=t.target.getAttribute("data-filter-key");g.employees[a]="",y("employees",n);return}if(t.target.classList.contains("filter-chip--clear-all")){g.employees.name="",g.employees.surname="",g.employees.position="",y("employees",n);return}const e=document.querySelector(".filter-popup");if(e&&!t.target.closest(".filter-popup")&&e.remove(),t.target.classList.contains("btn-availability")){const a=t.target.getAttribute("data-id");H(a,n)}if(t.target.classList.contains("btn-delete--emp")){const a=t.target.getAttribute("data-id");Q(a,n)}},s.ondblclick=function(t){const e=t.target;if(e.classList.contains("editable")&&!e.querySelector("input")){let p=function(){const u=d.value;X(r,c,u,n),y("employees",n)};var a=p;const i=e.textContent.replace(" $","").trim(),r=e.getAttribute("data-id"),c=e.getAttribute("data-field"),d=document.createElement("input");d.type=c==="salary"?"number":"text",d.value=i,d.className="table-inline-input",e.innerHTML="",e.appendChild(d),d.focus(),d.onkeydown=function(u){u.key==="Enter"&&p()},d.onblur=function(){p()}}})}function $(){const o=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+o.value}function ne(o){const n=document.querySelectorAll(".nav-button"),s=document.getElementById("page-title"),l=document.getElementById("add-entity-btn");n.forEach(function(i){i.classList.remove("nav-button--active")});const t=o.currentTarget;t.classList.add("nav-button--active");const e=t.getAttribute("data-tab");e==="projects"?(s.textContent="Projects",l.textContent="+ Add projects"):e==="employees"&&(s.textContent="Employees",l.textContent="+ Add employee"),console.log("Переключено на вкладку:",e);const a=$();y(e,a)}function k(){const n=document.querySelector(".nav-button--active").getAttribute("data-tab"),s=$();y(n,s),console.log("Период изменен на:",s)}function w(){const o=document.getElementById("project-panel");o&&o.classList.add("slide-panel--open")}function P(){const o=document.getElementById("project-panel");o&&o.classList.remove("slide-panel--open")}function oe(){const o=document.getElementById("employee-panel");o&&o.classList.add("slide-panel--open")}function x(){const o=document.getElementById("employee-panel");o&&o.classList.remove("slide-panel--open")}function se(){const o=document.getElementById("sidebar"),n=document.getElementById("sidebar-toggle"),s=document.querySelectorAll(".nav-button");document.querySelectorAll(".sidebar__nav-btn");const l=document.getElementById("month-select"),t=document.getElementById("year-select"),e=document.getElementById("add-entity-btn"),a=document.getElementById("project-panel-close"),i=document.getElementById("project-panel-overlay"),r=document.getElementById("employee-panel-close"),c=document.getElementById("employee-panel-overlay");if(!l||!t)return;const d=localStorage.getItem("app-selected-month"),p=localStorage.getItem("app-selected-year");d&&(l.value=d),p&&(t.value=p);function u(){return t.value+"-"+l.value}let v="projects";l.addEventListener("change",function(){localStorage.setItem("app-selected-month",l.value),console.log("📅 Месяц изменен на:",l.value),y(v,u())}),t.addEventListener("change",function(){localStorage.setItem("app-selected-year",t.value),console.log("📅 Год изменен на:",t.value),y(v,u())}),o&&n&&n.addEventListener("click",function(){o.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),s.forEach(function(b){b.addEventListener("click",ne)}),l&&t&&(l.addEventListener("change",k),t.addEventListener("change",k)),e&&e.addEventListener("click",w),a&&a.addEventListener("click",P),i&&i.addEventListener("click",P),e&&e.addEventListener("click",function(){const b=document.querySelector(".nav-button--active").getAttribute("data-tab");b==="projects"?w():b==="employees"&&oe()}),r&&r.addEventListener("click",x),c&&c.addEventListener("click",x),y("projects",$())}function I(){const o=document.getElementById("proj-name"),n=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),l=document.getElementById("proj-capacity"),t=document.getElementById("proj-submit"),e=o.value.trim().length>0,a=n.value.trim().length>0,i=Number(s.value)>0,r=Number(l.value)>0;e&&a&&i&&r?t.disabled=!1:t.disabled=!0}function le(o){o.preventDefault();const n=document.getElementById("proj-name"),s=document.getElementById("proj-company"),l=document.getElementById("proj-budget"),t=document.getElementById("proj-capacity"),e=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+e.value,c={id:"proj_"+Date.now(),projectName:n.value.trim(),companyName:s.value.trim(),budget:Number(l.value),capacity:Number(t.value)},d=f.getMonthData(i);d.projects.push(c);const p=f.getRawData();p[i]=d,f.saveData(p),console.log("✅ Новый проект успешно сохранен в Store:",c),y("projects",i),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const u=document.getElementById("project-panel");u&&u.classList.remove("slide-panel--open")}function ie(){const o=document.getElementById("project-form");if(o){const n=document.getElementById("proj-name"),s=document.getElementById("proj-company"),l=document.getElementById("proj-budget"),t=document.getElementById("proj-capacity");n.addEventListener("input",I),s.addEventListener("input",I),l.addEventListener("input",I),t.addEventListener("input",I),o.addEventListener("submit",le)}}function j(){const o=document.getElementById("emp-name"),n=document.getElementById("emp-position"),s=document.getElementById("emp-age"),l=document.getElementById("emp-salary"),t=document.getElementById("emp-submit"),e=document.getElementById("error-emp-age"),a=o.value.trim().length>0,i=n.value.trim().length>0,r=Number(l.value)>0,c=Number(s.value);let d=!1;s.value.trim()===""?e.textContent="":c<18?e.textContent="The employee must be over 18 years of age":(e.textContent="",d=!0),a&&i&&d&&r?t.disabled=!1:t.disabled=!0}function ce(o){o.preventDefault();const n=document.getElementById("emp-name"),s=document.getElementById("emp-position"),l=document.getElementById("emp-age"),t=document.getElementById("emp-salary"),e=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+e.value,r={id:"emp_"+Date.now(),name:n.value.trim(),position:s.value.trim(),age:Number(l.value),salary:Number(t.value)},c=f.getMonthData(i);c.employees.push(r);const d=f.getRawData();d[i]=c,f.saveData(d),console.log("✅ Новый сотрудник добавлен:",r),y("employees",i),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const p=document.getElementById("employee-panel");p&&p.classList.remove("slide-panel--open")}function re(){const o=document.getElementById("employee-form");if(o){const n=document.getElementById("emp-name"),s=document.getElementById("emp-position"),l=document.getElementById("emp-age"),t=document.getElementById("emp-salary");n.addEventListener("input",j),s.addEventListener("input",j),l.addEventListener("input",j),t.addEventListener("input",j),o.addEventListener("submit",ce)}}function M(){const o=document.getElementById("assign-modal");o&&o.classList.remove("modal--open")}function de(){const o=document.getElementById("assign-modal"),n=document.getElementById("assign-capacity-range"),s=document.getElementById("assign-range-value"),l=document.getElementById("assign-form");if(!o)return;o.onclick=function(e){(e.target.id==="assign-modal-overlay"||e.target.id==="assign-modal-close")&&(console.log("🔒 Закрываем модальное окно..."),M())},n&&s&&(n.oninput=function(){s.textContent=n.value}),l&&(l.onsubmit=function(e){e.preventDefault();const a=document.getElementById("assign-project-id").value,i=document.getElementById("assign-emp-select").value,r=Number(n.value),c=document.getElementById("month-select"),p=document.getElementById("year-select").value+"-"+c.value;if(console.log("✏️ СОХРАНЯЕМ НАЗНАЧЕНИЕ. Ключ периода:",p),!i){alert("Please select an employee first!");return}const u=f.getMonthData(p);u.assignments||(u.assignments=[]);const v=u.assignments.find(function(_){return String(_.projectId)===String(a)&&String(_.employeeId)===String(i)});if(v)console.log("🔄 Сотрудник уже на проекте. Обновляем capacity с",v.capacity,"на",r),v.capacity=r;else{const _={projectId:a,employeeId:i,capacity:r};u.assignments.push(_),console.log("🔗 Новое назначение добавлено в Стор:",_)}const b=f.getRawData();b[p]=u,f.saveData(b),alert("Employee successfully assigned to the project!"),M(),renderCurrentTab("projects",p)});const t=document.getElementById("details-modal");t&&(t.onclick=function(e){(e.target.id==="details-modal-overlay"||e.target.id==="details-modal-close")&&t.classList.remove("modal--open")})}const C={"dashboard-app":`
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
`};class pe{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const n=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${n.length}`),n.forEach(s=>{const l=s.getAttribute("data-component");this.loadComponent(s,l)})}loadComponent(n,s){console.log(`📥 Загружаю компонент: ${s}`),C[s]?(n.innerHTML=C[s],n.setAttribute("data-loaded","true"),this.loadedComponents.add(s),console.log(`✅ ${s} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${s}" не найден в components.js`),n.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${s}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(s=>{let l=!1;s.forEach(t=>{t.addedNodes.length&&t.addedNodes.forEach(e=>{e.nodeType===1&&e.querySelectorAll&&e.querySelectorAll("[data-component]").length>0&&(l=!0)})}),l&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new pe().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const me=f.getRawData();Object.keys(me).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),f.saveData(W)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(C));console.log("📅 Данные за май 2026:",f.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),se(),ie(),re(),de()},0)});
