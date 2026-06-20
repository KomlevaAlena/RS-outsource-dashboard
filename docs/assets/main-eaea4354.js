(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const e of n.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&l(e)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();const N="monthData",u={getRawData(){const s=localStorage.getItem(N);return s?JSON.parse(s):{}},saveData(s){const a=JSON.stringify(s);localStorage.setItem(N,a)},getMonthData(s){const a=this.getRawData();return a[s]?a[s]:{employees:[],projects:[]}}},O={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};let _=new Set,C=null,L="";function W(s,a){C=s,L=a;const o=document.getElementById("vacation-modal"),l=document.getElementById("vacation-modal-title"),t=document.getElementById("calendar-grid-container");if(!o||!t){console.error("❌ Элементы календаря не найдены в DOM");return}const n=a.split("-"),e=parseInt(n[0],10),c=parseInt(n[1],10),i=u.getMonthData(a).employees.find(d=>String(d.id)===String(s));if(i){l.textContent=`Availability for ${i.name}`;const d=i.vacations||[];_=new Set(d.map(Number))}else _=new Set;H(e,c,t),U(o,e,c,t),o.classList.add("modal--open"),console.log(`📅 Календарь открыт для сотрудника ${s} на период ${a}`)}function H(s,a,o){o.innerHTML=V(s,a),M(s,a)}function V(s,a){const o=new Date(s,a+1,0).getDate();let l=new Date(s,a,1).getDay()-1;l<0&&(l=6);const t=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];let n='<div class="calendar-grid">';t.forEach(e=>{n+=`<div class="calendar-header-cell ${e==="Sat"||e==="Sun"?"calendar-header-cell--weekend":""}">${e}</div>`});for(let e=0;e<l;e++)n+='<div class="calendar-day-cell calendar-day-cell--empty"></div>';for(let e=1;e<=o;e++){const r=new Date(s,a,e).getDay(),i=r===0||r===6;let d="calendar-day-cell calendar-day-target";i&&(d+=" calendar-day-cell--weekend"),_.has(e)&&(d+=" calendar-day-cell--selected"),n+=`<div class="${d}" data-day="${e}">${e}</div>`}return n+="</div>",n}function M(s,a){const o=new Date(s,a+1,0).getDate();let l=0,t=0;for(let i=1;i<=o;i++){const d=new Date(s,a,i).getDay();d===0||d===6||(l++,_.has(i)&&t++)}const n=l-t,e=document.getElementById("calendar-working-days");e&&(e.textContent=`Working Days: ${n}/${l} days`);const c=R(s,a),r=document.getElementById("calendar-vacation-ranges");r&&(r.textContent=c||"None")}function R(s,a){const o=Array.from(_).sort((c,r)=>c-r);if(o.length===0)return"";const l=[];let t=o[0],n=o[0];const e=c=>{const r=String(c).padStart(2,"0"),i=String(a+1).padStart(2,"0");return`${r}.${i}`};for(let c=1;c<o.length;c++){const r=o[c];let i=!1;if(r===n+1)i=!0;else{let d=!1;for(let p=n+1;p<r;p++){const m=new Date(s,a,p).getDay();if(m!==0&&m!==6){d=!0;break}}d||(i=!0)}i||(t===n?l.push(e(t)):l.push(`${e(t)}-${e(n)}`),t=r),n=r}return t===n?l.push(e(t)):l.push(`${e(t)}-${e(n)}`),l.join(", ")}function U(s,a,o,l){l.onclick=function(n){const e=n.target;if(!e.classList.contains("calendar-day-target"))return;const c=parseInt(e.getAttribute("data-day"),10);_.has(c)?(_.delete(c),e.classList.remove("calendar-day-cell--selected")):(_.add(c),e.classList.add("calendar-day-cell--selected")),M(a,o)},s.onclick=function(n){(n.target.id==="vacation-modal-overlay"||n.target.id==="vacation-modal-close")&&(s.classList.remove("modal--open"),console.log("🔒 Календарь закрыт"))};const t=document.getElementById("btn-save-vacation");t&&(t.onclick=function(){const n=u.getRawData(),r=((n[L]||{}).employees||[]).find(i=>String(i.id)===String(C));r&&(r.vacations=Array.from(_).sort((i,d)=>i-d),u.saveData(n),console.log(`💾 Отпуска сохранены для сотрудника ${C}:`,r.vacations),v("employees",L),s.classList.remove("modal--open"))})}function G(s,a){const o=new Date(s,a+1,0).getDate();let l=0;for(let t=1;t<=o;t++){const n=new Date(s,a,t).getDay();n===0||n===6||l++}return l}function J(s,a,o){if(!s||!Array.isArray(s)||s.length===0)return 0;let l=0;return s.forEach(t=>{const n=new Date(a,o,t).getDay();n===0||n===6||l++}),l}function E(s,a){const o=a.split("-"),l=parseInt(o[0],10),t=parseInt(o[1],10),n=G(l,t),e=s.vacations||[],c=J(e,l,t);if(n===0)return 0;const r=c/n;return Math.round(r*100)/100}function B(s,a){const l=100*(1-E(s,a));return Math.round(l)}function D(s,a,o,l){const t=a.filter(function(i){return String(i.projectId)===String(s.id)});let n=0,e=0;t.forEach(function(i){const d=o.find(function(p){return String(p.id)===String(i.employeeId)});if(d){n+=i.capacity;const p=E(d,l),m=d.salary*(i.capacity/100)*(1-p);e+=m}});const c=s.budget,r=c-e;return{effectiveCapacity:Math.round(n),expenses:Math.round(e),revenue:Math.round(c),profit:Math.round(r)}}function z(s,a,o,l){let t=0,n=0,e=0,c=0;return s.forEach(function(r){const i=D(r,a,o,l);t+=i.revenue,n+=i.effectiveCapacity,e+=i.expenses,c+=i.profit}),{totalBudget:t,totalCapacity:n,totalExpenses:e,totalProfit:c}}let f={projects:{companyName:"",projectName:""},employees:{name:"",surname:"",position:""},employeePosition:""};function T(s){const a=f[s];let o="",l=0;for(const t in a)if(a[t]&&a[t].trim()!==""){l++;const n=t.replace(/([A-Z])/g," $1").replace(/^./,e=>e.toUpperCase());o+=`
                <div class="filter-chip">
                    <span>${n}: <strong>${a[t]}</strong></span>
                    <button class="filter-chip__remove" data-filter-tab="${s}" data-filter-key="${t}">×</button>
                </div>
            `}return l>=2&&(o+=`
            <div class="filter-chip filter-chip--clear-all" data-filter-clear-tab="${s}">
                Clear Filters
            </div>
        `),`<div class="filter-chips-container">${o}</div>`}function Y(s,a){if(!confirm("Are you sure you want to delete this project?"))return;const l=u.getMonthData(a),t=l.projects.filter(function(e){return e.id!==s});l.projects=t;const n=u.getRawData();n[a]=l,u.saveData(n),console.log(`❌ Проект с ID ${s} успешно удален`),renderCurrentTab("projects",a)}function Z(s,a){const o=s.projects||[],l=s.assignments||[],t=s.employees||[],n=o.length,e=z(o,l,t,a);return` 
        <div class="fin-summary">
            <div class="fin-card">
                <span class="fin-card__title">Active Projects</span>
                <span class="fin-card__value">${n}</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Revenue</span>
                <span class="fin-card__value">${e.totalBudget.toLocaleString()} $</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Expenses</span>
                <span class="fin-card__value">${e.totalExpenses.toLocaleString()} $</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Profit</span>
                <span class="fin-card__value">${e.totalProfit.toLocaleString()} $</span>
            </div>
        </div>
    `}function Q(s,a,o){let l=s.projects||[];const t=s.assignments||[],n=s.employees||[];if(f.projects.companyName&&f.projects.companyName.trim()!==""){const r=f.projects.companyName.toLowerCase().trim();l=l.filter(i=>i.companyName?i.companyName.toLowerCase().includes(r):!1)}if(f.projects.projectName&&f.projects.projectName.trim()!==""){const r=f.projects.projectName.toLowerCase().trim();l=l.filter(i=>i.projectName?i.projectName.toLowerCase().includes(r):!1)}o.tab==="projects"&&o.field&&(l=[...l].sort(function(r,i){let d,p;if(o.field==="expenses"||o.field==="profit"||o.field==="effectiveCapacity"){const m=D(r,t,n,a),g=D(i,t,n,a);d=m[o.field],p=g[o.field]}else d=r[o.field],p=i[o.field];return typeof d=="string"?o.direction==="asc"?d.localeCompare(p):p.localeCompare(d):o.direction==="asc"?d-p:p-d}));function e(r){return o.tab==="projects"&&o.field===r?o.direction==="asc"?" ↑":" ↓":""}let c=T("projects");return l.length===0?(c+='<p class="empty-state">No matching projects found</p>',c):(c+=` 
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
    `,l.forEach(function(r){const i=D(r,t,n,a),d=i.profit<0?"text-danger":"text-success";c+=`
            <tr>
                <td>${r.companyName}</td>
                <td>${r.projectName}</td>
                <td>${r.budget.toLocaleString()} $</td>
                <td class="clickable-capacity" data-id="${r.id}">
                    <span class="capacity-link">${i.effectiveCapacity} / ${r.capacity} p.</span>
                </td>
                <td>${i.expenses.toLocaleString()} $</td>
                <td class="${d}"><strong>${i.profit.toLocaleString()} $</strong></td>
                <td>
                    <button class="btn-assign" data-id="${r.id}">Assign</button>
                    <button class="btn-delete" data-id="${r.id}">Delete</button>
                </td>
            </tr>
        `}),c+="</tbody></table>",c)}function q(s,a){const o=document.getElementById("details-modal"),l=document.getElementById("details-modal-body"),t=document.getElementById("details-modal-title");if(!o||!l)return;typeof u.loadFromLocalStorage=="function"&&u.loadFromLocalStorage();const n=u.getMonthData(a),e=n.projects||[],c=n.employees||[],r=n.assignments||[],i=e.find(p=>p.id===s);i&&(t.textContent=`Team for "${i.projectName}"`);const d=r.filter(p=>String(p.projectId)===String(s));if(d.length===0)l.innerHTML='<p class="empty-state">No employees assigned to this project yet.</p>';else{let p='<ul class="team-list">';d.forEach(function(m){const g=c.find(b=>String(b.id)===String(m.employeeId));g&&(p+=`
                    <li class="team-item">
                        <div class="team-item__info">
                            <strong class="team-item__name">${g.name}</strong>
                            <span class="team-item__position">${g.position}</span>
                        </div>
                        <div class="team-item__actions">
                            <span class="team-item__capacity">${m.capacity}% load</span>
                            <button class="btn-remove-asm" 
                                    data-project-id="${s}" 
                                    data-employee-id="${g.id}" 
                                    title="Remove from project">×</button>
                        </div>
                    </li>
                `)}),p+="</ul>",l.innerHTML=p}o.onclick=function(p){if(p.target.classList.contains("btn-remove-asm")){const m=p.target.getAttribute("data-project-id"),g=p.target.getAttribute("data-employee-id");if(!confirm("Are you sure you want to remove this employee from the project?"))return;const b=u.getRawData(),h=b[a]||{},F=h.assignments||[];h.assignments=F.filter(function(A){return!(String(A.projectId)===String(m)&&String(A.employeeId)===String(g))}),u.saveData(b),q(m,a),renderCurrentTab("projects",a);return}(p.target.id==="details-modal-overlay"||p.target.id==="details-modal-close")&&o.classList.remove("modal--open")},o.classList.add("modal--open")}function X(s,a){const o=document.getElementById("assign-modal"),l=document.getElementById("assign-project-id"),t=document.getElementById("assign-emp-select");if(!o||!t)return;l&&(l.value=s);const n=u.getMonthData(a),e=n&&n.employees?n.employees:[];if(e.length===0)t.innerHTML='<option value="">-- No employees available --</option>';else{let i='<option value="">-- Select an employee --</option>';e.forEach(function(d){const p=d.name||"Unknown Name",m=d.position||"No Position";i+=`<option value="${d.id}">${p} (${m})</option>`}),t.innerHTML=i}const c=document.getElementById("assign-capacity-range"),r=document.getElementById("assign-range-value");c&&(c.value=50),r&&(r.textContent="50"),o.classList.add("modal--open")}function K(s,a,o){if(!confirm("Are you sure you want to remove this employee?"))return;const t=u.getMonthData(a);t.employees=t.employees.filter(function(e){return e.id!==s});const n=u.getRawData();n[a]=t,u.saveData(n),console.log(`❌ Сотрудник с ID ${s} удален`),o()}function ee(s,a,o,l,t){const n=u.getMonthData(l),e=n.employees.find(c=>c.id===s);if(e){if(a==="salary"){const r=Number(o);if(isNaN(r)||r<=0){alert("Please enter the correct salary amount"),t();return}e[a]=r}else{if(o.trim()===""){alert("The field cannot be empty"),t();return}e[a]=o.trim()}const c=u.getRawData();c[l]=n,u.saveData(c),console.log(`📝 Сотрудник ${s}: поле ${a} обновлено на ${o}`),t()}}function te(s,a,o){if(s.length===0)return'<p class="empty-state">No employees added yet</p>';let l=s||[];if(f.employees.name&&f.employees.name.trim()!==""){const e=f.employees.name.toLowerCase().trim();l=l.filter(c=>c.name?(c.name.split(" ")[0]||"").toLowerCase().includes(e):!1)}if(f.employees.surname&&f.employees.surname.trim()!==""){const e=f.employees.surname.toLowerCase().trim();l=l.filter(c=>c.name?(c.name.split(" ").slice(1).join(" ")||"").toLowerCase().includes(e):!1)}if(f.employees.position&&f.employees.position.trim()!==""){const e=f.employees.position.toLowerCase().trim();l=l.filter(c=>c.position?c.position.toLowerCase().includes(e):!1)}o.tab==="employees"&&o.field&&(l=[...l].sort(function(e,c){let r,i;return o.field==="vacationFactor"?(r=E(e,a),i=E(c,a)):o.field==="effectiveCapacity"?(r=B(e,a),i=B(c,a)):(r=e[o.field],i=c[o.field]),typeof r=="string"?o.direction==="asc"?r.localeCompare(i):i.localeCompare(r):o.direction==="asc"?r-i:i-r}));function t(e){return o.tab==="employees"&&o.field===e?o.direction==="asc"?" ↑":" ↓":""}let n=T("employees");return l.length===0?(n+='<p class="empty-state">No employees found matching filters</p>',n):(n+=`
    <table class="table">
        <thead>
            <tr>
                <th class="sortable" data-sort="name">
                    Name${t("name")}
                    <span class="filter-icon" data-filter-field="name">⌕</span>
                </th>
                <th>
                    Surname
                    <span class="filter-icon" data-filter-field="surname">⌕</span>
                </th>
                <th class="sortable" data-sort="position">
                    Position${t("position")}
                    <span class="filter-icon" data-filter-field="position">⌕</span>
                </th>
                <th class="sortable" data-sort="age">Age${t("age")}</th>
                <th class="sortable" data-sort="salary">Salary${t("salary")}</th>
                <th class="sortable" data-sort="vacationFactor">Vacation Factor${t("vacationFactor")}</th>
                <th class="sortable" data-sort="effectiveCapacity">Eff. Capacity${t("effectiveCapacity")}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `,l.forEach(function(e){const c=E(e,a),r=B(e,a),i=e.name?e.name.split(" "):["Unknown",""],d=i[0],p=i.slice(1).join(" ")||"—";n+=`
            <tr>
                <td>${d}</td>
                <td>${p}</td>
                <td class="editable" data-id="${e.id}" data-field="position">${e.position}</td>
                <td>${e.age} y.o.</td>
                <td class="editable" data-id="${e.id}" data-field="salary">${e.salary} $</td>
                <td><span class="badge badge--factor">${c}</span></td>
                <td><span class="badge badge--capacity">${r}%</span></td>
                <td>
                    <button class="btn-delete btn-delete--emp" data-id="${e.id}">Delete</button>
                    <button class="btn-availability" data-id="${e.id}">Availability</button>
                </td>
            </tr>
        `}),n+="</tbody></table>",n)}const y={tab:null,field:null,direction:"asc"};function v(s,a){const o=document.getElementById("table-container");if(!o)return;const l=u.getMonthData(a);if(s==="projects"){const t=Z(l,a),n=Q(l,a,y);o.innerHTML=t+n,o.onclick=function(e){if(e.target.classList.contains("sortable")){const i=e.target.getAttribute("data-sort");y.tab==="projects"&&y.field===i?y.direction=y.direction==="asc"?"desc":"asc":(y.tab="projects",y.field=i,y.direction="asc"),v("projects",a);return}if(e.target.classList.contains("filter-icon")){e.stopPropagation();const i=document.querySelector(".filter-popup");i&&i.remove();const d=e.target.getAttribute("data-filter-field"),p=e.target.closest("th"),m=document.createElement("div");m.className="filter-popup",m.innerHTML=`
                    <input type="text" id="filter-popup-input" class="filter-popup__input" placeholder="Search..." value="${f.projects[d]}">
                    <div class="filter-popup__actions">
                        <button class="filter-popup__btn" id="filter-btn-cancel">Cancel</button>
                        <button class="filter-popup__btn filter-popup__btn--apply" id="filter-btn-apply" data-field="${d}">Apply</button>
                    </div>
                `,p.appendChild(m);const g=m.querySelector("#filter-popup-input");g.focus(),g.onkeydown=function(b){b.key==="Enter"&&m.querySelector("#filter-btn-apply").click()};return}if(e.target.id==="filter-btn-apply"){const i=e.target.getAttribute("data-field"),d=document.getElementById("filter-popup-input").value;f.projects[i]=d,v("projects",a);return}if(e.target.id==="filter-btn-cancel"){const i=e.target.closest(".filter-popup");i&&i.remove();return}if(e.target.classList.contains("filter-chip__remove")){const i=e.target.getAttribute("data-filter-key");f.projects[i]="",v("projects",a);return}if(e.target.classList.contains("filter-chip--clear-all")){f.projects.companyName="",f.projects.projectName="",v("projects",a);return}const c=document.querySelector(".filter-popup");if(c&&!e.target.closest(".filter-popup")&&c.remove(),e.target.classList.contains("btn-delete")){const i=e.target.getAttribute("data-id");Y(i,a)}if(e.target.classList.contains("btn-assign")){const i=e.target.getAttribute("data-id");X(i,a)}const r=e.target.closest(".clickable-capacity");if(r){const i=r.getAttribute("data-id");q(i,a)}}}else s==="employees"&&(o.innerHTML=te(l.employees,a,y),o.onclick=function(t){if(t.target.classList.contains("sortable")){const e=t.target.getAttribute("data-sort");y.tab==="employees"&&y.field===e?y.direction=y.direction==="asc"?"desc":"asc":(y.tab="employees",y.field=e,y.direction="asc"),v("employees",a);return}if(t.target.classList.contains("filter-icon")){t.stopPropagation();const e=document.querySelector(".filter-popup");e&&e.remove();const c=t.target.getAttribute("data-filter-field"),r=t.target.closest("th"),i=document.createElement("div");i.className="filter-popup",i.innerHTML=`
                    <input type="text" id="filter-popup-input" class="filter-popup__input" placeholder="Search..." value="${f.employees[c]}">
                    <div class="filter-popup__actions">
                        <button class="filter-popup__btn" id="filter-btn-cancel">Cancel</button>
                        <button class="filter-popup__btn filter-popup__btn--apply" id="filter-btn-apply" data-field="${c}">Apply</button>
                    </div>
                `,r.appendChild(i);const d=i.querySelector("#filter-popup-input");d.focus(),d.onkeydown=function(p){p.key==="Enter"&&i.querySelector("#filter-btn-apply").click()};return}if(t.target.id==="filter-btn-apply"){const e=t.target.getAttribute("data-field"),c=document.getElementById("filter-popup-input").value;f.employees[e]=c,v("employees",a);return}if(t.target.id==="filter-btn-cancel"){const e=t.target.closest(".filter-popup");e&&e.remove();return}if(t.target.classList.contains("filter-chip__remove")){const e=t.target.getAttribute("data-filter-key");f.employees[e]="",v("employees",a);return}if(t.target.classList.contains("filter-chip--clear-all")){f.employees.name="",f.employees.surname="",f.employees.position="",v("employees",a);return}const n=document.querySelector(".filter-popup");if(n&&!t.target.closest(".filter-popup")&&n.remove(),t.target.classList.contains("btn-availability")){const e=t.target.getAttribute("data-id");W(e,a)}if(t.target.classList.contains("btn-delete--emp")){const e=t.target.getAttribute("data-id");K(e,a)}},o.ondblclick=function(t){const n=t.target;if(n.classList.contains("editable")&&!n.querySelector("input")){let p=function(){const m=d.value;ee(r,i,m,a),v("employees",a)};var e=p;const c=n.textContent.replace(" $","").trim(),r=n.getAttribute("data-id"),i=n.getAttribute("data-field"),d=document.createElement("input");d.type=i==="salary"?"number":"text",d.value=c,d.className="table-inline-input",n.innerHTML="",n.appendChild(d),d.focus(),d.onkeydown=function(m){m.key==="Enter"&&p()},d.onblur=function(){p()}}})}function S(){const s=document.getElementById("month-select"),a=document.getElementById("year-select");return!s||!a?"2026-01":a.value+"-"+s.value}function ae(s){const a=document.querySelectorAll(".nav-button"),o=document.getElementById("page-title"),l=document.getElementById("add-entity-btn");a.forEach(function(c){c.classList.remove("nav-button--active")});const t=s.currentTarget;t.classList.add("nav-button--active");const n=t.getAttribute("data-tab");n==="projects"?(o.textContent="Projects",l&&(l.textContent="+ Add projects")):n==="employees"&&(o.textContent="Employees",l&&(l.textContent="+ Add employee")),console.log("Переключено на вкладку:",n);const e=S();v(n,e)}function w(){const s=document.querySelector(".nav-button--active"),a=s?s.getAttribute("data-tab"):"projects",o=S();v(a,o),console.log("Период изменен на:",o)}function ne(){const s=document.getElementById("project-panel");s&&s.classList.add("slide-panel--open")}function k(){const s=document.getElementById("project-panel");s&&s.classList.remove("slide-panel--open")}function oe(){const s=document.getElementById("employee-panel");s&&s.classList.add("slide-panel--open")}function P(){const s=document.getElementById("employee-panel");s&&s.classList.remove("slide-panel--open")}function se(){const s=document.getElementById("sidebar"),a=document.getElementById("sidebar-toggle"),o=document.querySelectorAll(".nav-button"),l=document.getElementById("month-select"),t=document.getElementById("year-select"),n=document.getElementById("add-entity-btn"),e=document.getElementById("project-panel-close"),c=document.getElementById("project-panel-overlay"),r=document.getElementById("employee-panel-close"),i=document.getElementById("employee-panel-overlay");if(!l||!t)return;const d=localStorage.getItem("app-selected-month"),p=localStorage.getItem("app-selected-year");d&&(l.value=d),p&&(t.value=p),l.addEventListener("change",function(){localStorage.setItem("app-selected-month",l.value),w()}),t.addEventListener("change",function(){localStorage.setItem("app-selected-year",t.value),w()}),s&&a&&a.addEventListener("click",function(){s.classList.toggle("sidebar--collapsed")}),o.forEach(function(b){b.addEventListener("click",ae)}),n&&n.addEventListener("click",function(){const b=document.querySelector(".nav-button--active"),h=b?b.getAttribute("data-tab"):"projects";h==="projects"?ne():h==="employees"&&oe()}),e&&e.addEventListener("click",k),c&&c.addEventListener("click",k),r&&r.addEventListener("click",P),i&&i.addEventListener("click",P);const m=document.querySelector(".nav-button--active"),g=m?m.getAttribute("data-tab"):"projects";v(g,S())}function I(){const s=document.getElementById("proj-name"),a=document.getElementById("proj-company"),o=document.getElementById("proj-budget"),l=document.getElementById("proj-capacity"),t=document.getElementById("proj-submit"),n=s.value.trim().length>0,e=a.value.trim().length>0,c=Number(o.value)>0,r=Number(l.value)>0;n&&e&&c&&r?t.disabled=!1:t.disabled=!0}function le(s){s.preventDefault();const a=document.getElementById("proj-name"),o=document.getElementById("proj-company"),l=document.getElementById("proj-budget"),t=document.getElementById("proj-capacity"),n=document.getElementById("month-select"),c=document.getElementById("year-select").value+"-"+n.value,i={id:"proj_"+Date.now(),projectName:a.value.trim(),companyName:o.value.trim(),budget:Number(l.value),capacity:Number(t.value)},d=u.getMonthData(c);d.projects.push(i);const p=u.getRawData();p[c]=d,u.saveData(p),console.log("✅ Новый проект успешно сохранен в Store:",i),v("projects",c),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const m=document.getElementById("project-panel");m&&m.classList.remove("slide-panel--open")}function ie(){const s=document.getElementById("project-form");if(s){const a=document.getElementById("proj-name"),o=document.getElementById("proj-company"),l=document.getElementById("proj-budget"),t=document.getElementById("proj-capacity");a.addEventListener("input",I),o.addEventListener("input",I),l.addEventListener("input",I),t.addEventListener("input",I),s.addEventListener("submit",le)}}function j(){const s=document.getElementById("emp-name"),a=document.getElementById("emp-position"),o=document.getElementById("emp-age"),l=document.getElementById("emp-salary"),t=document.getElementById("emp-submit"),n=document.getElementById("error-emp-age"),e=s.value.trim().length>0,c=a.value.trim().length>0,r=Number(l.value)>0,i=Number(o.value);let d=!1;o.value.trim()===""?n.textContent="":i<18?n.textContent="The employee must be over 18 years of age":(n.textContent="",d=!0),e&&c&&d&&r?t.disabled=!1:t.disabled=!0}function ce(s){s.preventDefault();const a=document.getElementById("emp-name"),o=document.getElementById("emp-position"),l=document.getElementById("emp-age"),t=document.getElementById("emp-salary"),n=document.getElementById("month-select"),c=document.getElementById("year-select").value+"-"+n.value,r={id:"emp_"+Date.now(),name:a.value.trim(),position:o.value.trim(),age:Number(l.value),salary:Number(t.value)},i=u.getMonthData(c);i.employees.push(r);const d=u.getRawData();d[c]=i,u.saveData(d),console.log("✅ Новый сотрудник добавлен:",r),v("employees",c),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const p=document.getElementById("employee-panel");p&&p.classList.remove("slide-panel--open")}function re(){const s=document.getElementById("employee-form");if(s){const a=document.getElementById("emp-name"),o=document.getElementById("emp-position"),l=document.getElementById("emp-age"),t=document.getElementById("emp-salary");a.addEventListener("input",j),o.addEventListener("input",j),l.addEventListener("input",j),t.addEventListener("input",j),s.addEventListener("submit",ce)}}function x(){const s=document.getElementById("assign-modal");s&&s.classList.remove("modal--open")}function de(){const s=document.getElementById("assign-modal"),a=document.getElementById("assign-capacity-range"),o=document.getElementById("assign-range-value"),l=document.getElementById("assign-form");if(!s)return;s.onclick=function(n){(n.target.id==="assign-modal-overlay"||n.target.id==="assign-modal-close")&&(console.log("🔒 Закрываем модальное окно..."),x())},a&&o&&(a.oninput=function(){o.textContent=a.value}),l&&(l.onsubmit=function(n){n.preventDefault();const e=document.getElementById("assign-project-id").value,c=document.getElementById("assign-emp-select").value,r=Number(a.value),i=document.getElementById("month-select"),p=document.getElementById("year-select").value+"-"+i.value;if(console.log("✏️ СОХРАНЯЕМ НАЗНАЧЕНИЕ. Ключ периода:",p),!c){alert("Please select an employee first!");return}const m=u.getMonthData(p);m.assignments||(m.assignments=[]);const g=m.assignments.find(function(h){return String(h.projectId)===String(e)&&String(h.employeeId)===String(c)});if(g)console.log("🔄 Сотрудник уже на проекте. Обновляем capacity с",g.capacity,"на",r),g.capacity=r;else{const h={projectId:e,employeeId:c,capacity:r};m.assignments.push(h),console.log("🔗 Новое назначение добавлено в Стор:",h)}const b=u.getRawData();b[p]=m,u.saveData(b),alert("Employee successfully assigned to the project!"),x(),renderCurrentTab("projects",p)});const t=document.getElementById("details-modal");t&&(t.onclick=function(n){(n.target.id==="details-modal-overlay"||n.target.id==="details-modal-close")&&t.classList.remove("modal--open")})}const $={"dashboard-app":`
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
`};class pe{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const a=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${a.length}`),a.forEach(o=>{const l=o.getAttribute("data-component");this.loadComponent(o,l)})}loadComponent(a,o){console.log(`📥 Загружаю компонент: ${o}`),$[o]?(a.innerHTML=$[o],a.setAttribute("data-loaded","true"),this.loadedComponents.add(o),console.log(`✅ ${o} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${o}" не найден в components.js`),a.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${o}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(o=>{let l=!1;o.forEach(t=>{t.addedNodes.length&&t.addedNodes.forEach(n=>{n.nodeType===1&&n.querySelectorAll&&n.querySelectorAll("[data-component]").length>0&&(l=!0)})}),l&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new pe().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const me=u.getRawData();Object.keys(me).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),u.saveData(O)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys($));console.log("📅 Данные за май 2026:",u.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),se(),ie(),re(),de()},0)});
