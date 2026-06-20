(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))l(a);new MutationObserver(a=>{for(const e of a)if(e.type==="childList")for(const t of e.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&l(t)}).observe(document,{childList:!0,subtree:!0});function s(a){const e={};return a.integrity&&(e.integrity=a.integrity),a.referrerPolicy&&(e.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?e.credentials="include":a.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function l(a){if(a.ep)return;a.ep=!0;const e=s(a);fetch(a.href,e)}})();const N="monthData",u={getRawData(){const o=localStorage.getItem(N);return o?JSON.parse(o):{}},saveData(o){const n=JSON.stringify(o);localStorage.setItem(N,n)},getMonthData(o){const n=this.getRawData();return n[o]?n[o]:{employees:[],projects:[]}}},O={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};let _=new Set,S=null,C="";function W(o,n){S=o,C=n;const s=document.getElementById("vacation-modal"),l=document.getElementById("vacation-modal-title"),a=document.getElementById("calendar-grid-container");if(!s||!a){console.error("❌ Элементы календаря не найдены в DOM");return}const e=n.split("-"),t=parseInt(e[0],10),c=parseInt(e[1],10),i=u.getMonthData(n).employees.find(d=>String(d.id)===String(o));if(i){l.textContent=`Availability for ${i.name}`;const d=i.vacations||[];_=new Set(d.map(Number))}else _=new Set;H(t,c,a),G(s,t,c,a),s.classList.add("modal--open"),console.log(`📅 Календарь открыт для сотрудника ${o} на период ${n}`)}function H(o,n,s){s.innerHTML=V(o,n),M(o,n)}function V(o,n){const s=new Date(o,n+1,0).getDate();let l=new Date(o,n,1).getDay()-1;l<0&&(l=6);const a=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];let e='<div class="calendar-grid">';a.forEach(t=>{e+=`<div class="calendar-header-cell ${t==="Sat"||t==="Sun"?"calendar-header-cell--weekend":""}">${t}</div>`});for(let t=0;t<l;t++)e+='<div class="calendar-day-cell calendar-day-cell--empty"></div>';for(let t=1;t<=s;t++){const r=new Date(o,n,t).getDay(),i=r===0||r===6;let d="calendar-day-cell calendar-day-target";i&&(d+=" calendar-day-cell--weekend"),_.has(t)&&(d+=" calendar-day-cell--selected"),e+=`<div class="${d}" data-day="${t}">${t}</div>`}return e+="</div>",e}function M(o,n){const s=new Date(o,n+1,0).getDate();let l=0,a=0;for(let i=1;i<=s;i++){const d=new Date(o,n,i).getDay();d===0||d===6||(l++,_.has(i)&&a++)}const e=l-a,t=document.getElementById("calendar-working-days");t&&(t.textContent=`Working Days: ${e}/${l} days`);const c=R(o,n),r=document.getElementById("calendar-vacation-ranges");r&&(r.textContent=c||"None")}function R(o,n){const s=Array.from(_).sort((c,r)=>c-r);if(s.length===0)return"";const l=[];let a=s[0],e=s[0];const t=c=>{const r=String(c).padStart(2,"0"),i=String(n+1).padStart(2,"0");return`${r}.${i}`};for(let c=1;c<s.length;c++){const r=s[c];let i=!1;if(r===e+1)i=!0;else{let d=!1;for(let p=e+1;p<r;p++){const m=new Date(o,n,p).getDay();if(m!==0&&m!==6){d=!0;break}}d||(i=!0)}i||(a===e?l.push(t(a)):l.push(`${t(a)}-${t(e)}`),a=r),e=r}return a===e?l.push(t(a)):l.push(`${t(a)}-${t(e)}`),l.join(", ")}function G(o,n,s,l){l.onclick=function(e){const t=e.target;if(!t.classList.contains("calendar-day-target"))return;const c=parseInt(t.getAttribute("data-day"),10);_.has(c)?(_.delete(c),t.classList.remove("calendar-day-cell--selected")):(_.add(c),t.classList.add("calendar-day-cell--selected")),M(n,s)},o.onclick=function(e){(e.target.id==="vacation-modal-overlay"||e.target.id==="vacation-modal-close")&&(o.classList.remove("modal--open"),console.log("🔒 Календарь закрыт"))};const a=document.getElementById("btn-save-vacation");a&&(a.onclick=function(){const e=u.getRawData(),r=((e[C]||{}).employees||[]).find(i=>String(i.id)===String(S));r&&(r.vacations=Array.from(_).sort((i,d)=>i-d),u.saveData(e),console.log(`💾 Отпуска сохранены для сотрудника ${S}:`,r.vacations),v("employees",C),o.classList.remove("modal--open"))})}function U(o,n){const s=new Date(o,n+1,0).getDate();let l=0;for(let a=1;a<=s;a++){const e=new Date(o,n,a).getDay();e===0||e===6||l++}return l}function J(o,n,s){if(!o||!Array.isArray(o)||o.length===0)return 0;let l=0;return o.forEach(a=>{const e=new Date(n,s,a).getDay();e===0||e===6||l++}),l}function E(o,n){const s=n.split("-"),l=parseInt(s[0],10),a=parseInt(s[1],10),e=U(l,a),t=o.vacations||[],c=J(t,l,a);if(e===0)return 0;const r=c/e;return Math.round(r*100)/100}function B(o,n){const l=100*(1-E(o,n));return Math.round(l)}function D(o,n,s,l){const a=n.filter(function(i){return String(i.projectId)===String(o.id)});let e=0,t=0;a.forEach(function(i){const d=s.find(function(p){return String(p.id)===String(i.employeeId)});if(d){e+=i.capacity;const p=E(d,l),m=d.salary*(i.capacity/100)*(1-p);t+=m}});const c=o.budget,r=c-t;return{effectiveCapacity:Math.round(e),expenses:Math.round(t),revenue:Math.round(c),profit:Math.round(r)}}function z(o,n,s,l){let a=0,e=0,t=0,c=0;return o.forEach(function(r){const i=D(r,n,s,l);a+=i.revenue,e+=i.effectiveCapacity,t+=i.expenses,c+=i.profit}),{totalBudget:a,totalCapacity:e,totalExpenses:t,totalProfit:c}}let f={projects:{companyName:"",projectName:""},employees:{name:"",surname:"",position:""},employeePosition:""};function T(o){const n=f[o];let s="",l=0;for(const a in n)if(n[a]&&n[a].trim()!==""){l++;const e=a.replace(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase());s+=`
                <div class="filter-chip">
                    <span>${e}: <strong>${n[a]}</strong></span>
                    <button class="filter-chip__remove" data-filter-tab="${o}" data-filter-key="${a}">×</button>
                </div>
            `}return l>=2&&(s+=`
            <div class="filter-chip filter-chip--clear-all" data-filter-clear-tab="${o}">
                Clear Filters
            </div>
        `),`<div class="filter-chips-container">${s}</div>`}function Y(o,n){if(!confirm("Are you sure you want to delete this project?"))return;const l=u.getMonthData(n),a=l.projects.filter(function(t){return t.id!==o});l.projects=a;const e=u.getRawData();e[n]=l,u.saveData(e),console.log(`❌ Проект с ID ${o} успешно удален`),renderCurrentTab("projects",n)}function Z(o,n){const s=o.projects||[],l=o.assignments||[],a=o.employees||[],e=s.length,t=z(s,l,a,n);return` 
        <div class="fin-summary">
            <div class="fin-card">
                <span class="fin-card__title">Active Projects</span>
                <span class="fin-card__value">${e}</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Revenue</span>
                <span class="fin-card__value">${t.totalBudget.toLocaleString()} $</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Expenses</span>
                <span class="fin-card__value">${t.totalExpenses.toLocaleString()} $</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Profit</span>
                <span class="fin-card__value">${t.totalProfit.toLocaleString()} $</span>
            </div>
        </div>
    `}function Q(o,n,s){let l=o.projects||[];const a=o.assignments||[],e=o.employees||[];if(f.projects.companyName&&f.projects.companyName.trim()!==""){const r=f.projects.companyName.toLowerCase().trim();l=l.filter(i=>i.companyName?i.companyName.toLowerCase().includes(r):!1)}if(f.projects.projectName&&f.projects.projectName.trim()!==""){const r=f.projects.projectName.toLowerCase().trim();l=l.filter(i=>i.projectName?i.projectName.toLowerCase().includes(r):!1)}s.tab==="projects"&&s.field&&(l=[...l].sort(function(r,i){let d,p;if(s.field==="expenses"||s.field==="profit"||s.field==="effectiveCapacity"){const m=D(r,a,e,n),g=D(i,a,e,n);d=m[s.field],p=g[s.field]}else d=r[s.field],p=i[s.field];return typeof d=="string"?s.direction==="asc"?d.localeCompare(p):p.localeCompare(d):s.direction==="asc"?d-p:p-d}));function t(r){return s.tab==="projects"&&s.field===r?s.direction==="asc"?" ↑":" ↓":""}let c=T("projects");return l.length===0?(c+='<p class="empty-state">No matching projects found</p>',c):(c+=` 
    <table class="table">
        <thead>
            <tr>
                <th class="sortable" data-sort="companyName">
                    Company${t("companyName")}
                    <span class="filter-icon" data-filter-field="companyName">⌕</span>
                </th>
                <th class="sortable" data-sort="projectName">
                    Project${t("projectName")}
                    <span class="filter-icon" data-filter-field="projectName">⌕</span>
                </th>
                <th class="sortable" data-sort="budget">Budget (Rev.)${t("budget")}</th>
                <th class="sortable" data-sort="effectiveCapacity">Capacity${t("effectiveCapacity")}</th>
                <th class="sortable" data-sort="expenses">Expenses${t("expenses")}</th>
                <th class="sortable" data-sort="profit">Profit${t("profit")}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `,l.forEach(function(r){const i=D(r,a,e,n),d=i.profit<0?"text-danger":"text-success";c+=`
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
        `}),c+="</tbody></table>",c)}function q(o,n){const s=document.getElementById("details-modal"),l=document.getElementById("details-modal-body"),a=document.getElementById("details-modal-title");if(!s||!l)return;typeof u.loadFromLocalStorage=="function"&&u.loadFromLocalStorage();const e=u.getMonthData(n),t=e.projects||[],c=e.employees||[],r=e.assignments||[],i=t.find(p=>p.id===o);i&&(a.textContent=`Team for "${i.projectName}"`);const d=r.filter(p=>String(p.projectId)===String(o));if(d.length===0)l.innerHTML='<p class="empty-state">No employees assigned to this project yet.</p>';else{let p='<ul class="team-list">';d.forEach(function(m){const g=c.find(b=>String(b.id)===String(m.employeeId));g&&(p+=`
                    <li class="team-item">
                        <div class="team-item__info">
                            <strong class="team-item__name">${g.name}</strong>
                            <span class="team-item__position">${g.position}</span>
                        </div>
                        <div class="team-item__actions">
                            <span class="team-item__capacity">${m.capacity}% load</span>
                            <button class="btn-remove-asm" 
                                    data-project-id="${o}" 
                                    data-employee-id="${g.id}" 
                                    title="Remove from project">×</button>
                        </div>
                    </li>
                `)}),p+="</ul>",l.innerHTML=p}s.onclick=function(p){if(p.target.classList.contains("btn-remove-asm")){const m=p.target.getAttribute("data-project-id"),g=p.target.getAttribute("data-employee-id");if(!confirm("Are you sure you want to remove this employee from the project?"))return;const b=u.getRawData(),h=b[n]||{},F=h.assignments||[];h.assignments=F.filter(function(A){return!(String(A.projectId)===String(m)&&String(A.employeeId)===String(g))}),u.saveData(b),q(m,n),renderCurrentTab("projects",n);return}(p.target.id==="details-modal-overlay"||p.target.id==="details-modal-close")&&s.classList.remove("modal--open")},s.classList.add("modal--open")}function X(o,n){const s=document.getElementById("assign-modal"),l=document.getElementById("assign-project-id"),a=document.getElementById("assign-emp-select");if(!s||!a)return;l&&(l.value=o);const e=u.getMonthData(n),t=e&&e.employees?e.employees:[];if(t.length===0)a.innerHTML='<option value="">-- No employees available --</option>';else{let i='<option value="">-- Select an employee --</option>';t.forEach(function(d){const p=d.name||"Unknown Name",m=d.position||"No Position";i+=`<option value="${d.id}">${p} (${m})</option>`}),a.innerHTML=i}const c=document.getElementById("assign-capacity-range"),r=document.getElementById("assign-range-value");c&&(c.value=50),r&&(r.textContent="50"),s.classList.add("modal--open")}function K(o,n){if(!confirm("Are you sure you want to remove this employee?"))return;const l=u.getMonthData(n);l.employees=l.employees.filter(function(e){return e.id!==o});const a=u.getRawData();a[n]=l,u.saveData(a),console.log(`❌ Сотрудник с ID ${o} удален`),renderCurrentTab("employees",n)}function ee(o,n,s,l){const a=u.getMonthData(l),e=a.employees.find(t=>t.id===o);if(e){if(n==="salary"){const c=Number(s);if(isNaN(c)||c<=0){alert("Please enter the correct salary amount"),renderCurrentTab("employees",l);return}e[n]=c}else{if(s.trim()===""){alert("The field cannot be empty"),renderCurrentTab("employees",l);return}e[n]=s.trim()}const t=u.getRawData();t[l]=a,u.saveData(t),console.log(`📝 Сотрудник ${o}: поле ${n} обновлено на ${s}`)}}function te(o,n){if(o.length===0)return'<p class="empty-state">No employees added yet</p>';let s=o||[];if(f.employees.name&&f.employees.name.trim()!==""){const e=f.employees.name.toLowerCase().trim();s=s.filter(t=>t.name?(t.name.split(" ")[0]||"").toLowerCase().includes(e):!1)}if(f.employees.surname&&f.employees.surname.trim()!==""){const e=f.employees.surname.toLowerCase().trim();s=s.filter(t=>t.name?(t.name.split(" ").slice(1).join(" ")||"").toLowerCase().includes(e):!1)}if(f.employees.position&&f.employees.position.trim()!==""){const e=f.employees.position.toLowerCase().trim();s=s.filter(t=>t.position?t.position.toLowerCase().includes(e):falses)}currentSort.tab==="employees"&&currentSort.field&&(s=[...s].sort(function(e,t){let c,r;return currentSort.field==="vacationFactor"?(c=E(e,n),r=E(t,n)):currentSort.field==="effectiveCapacity"?(c=B(e,n),r=B(t,n)):(c=e[currentSort.field],r=t[currentSort.field]),typeof c=="string"?currentSort.direction==="asc"?c.localeCompare(r):r.localeCompare(c):currentSort.direction==="asc"?c-r:r-c}));function l(e){return currentSort.tab==="employees"&&currentSort.field===e?currentSort.direction==="asc"?" ↑":" ↓":""}if(s.length===0)return a+='<p class="empty-state">No employees found for this position</p>',a;let a=T("employees");return s.length===0?(a+='<p class="empty-state">No employees found matching filters</p>',a):(a+=`
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
    `,s.forEach(function(e){const t=E(e,n),c=B(e,n);a+=`
            <tr>
                <td>${e.name}</td>
                <td class="editable" data-id="${e.id}" data-field="position">${e.position}</td>
                <td>${e.age} y.o.</td>
                <td class="editable" data-id="${e.id}" data-field="salary">${e.salary} $</td>
                <td><span class="badge badge--factor">${t}</span></td>
                <td><span class="badge badge--capacity">${c}%</span></td>
                <td>
                    <button class="btn-delete btn-delete--emp" data-id="${e.id}">Delete</button>
                    <button class="btn-availability" data-id="${e.id}">Availability</button>
                </td>
            </tr>
        `}),a+="</tbody></table>",a)}const y={tab:null,field:null,direction:"asc"};function v(o,n){const s=document.getElementById("table-container");if(!s)return;const l=u.getMonthData(n);if(o==="projects"){const a=Z(l,n),e=Q(l,n,y);s.innerHTML=a+e,s.onclick=function(t){if(t.target.classList.contains("sortable")){const i=t.target.getAttribute("data-sort");y.tab==="projects"&&y.field===i?y.direction=y.direction==="asc"?"desc":"asc":(y.tab="projects",y.field=i,y.direction="asc"),v("projects",n);return}if(t.target.classList.contains("filter-icon")){t.stopPropagation();const i=document.querySelector(".filter-popup");i&&i.remove();const d=t.target.getAttribute("data-filter-field"),p=t.target.closest("th"),m=document.createElement("div");m.className="filter-popup",m.innerHTML=`
                    <input type="text" id="filter-popup-input" class="filter-popup__input" placeholder="Search..." value="${f.projects[d]}">
                    <div class="filter-popup__actions">
                        <button class="filter-popup__btn" id="filter-btn-cancel">Cancel</button>
                        <button class="filter-popup__btn filter-popup__btn--apply" id="filter-btn-apply" data-field="${d}">Apply</button>
                    </div>
                `,p.appendChild(m);const g=m.querySelector("#filter-popup-input");g.focus(),g.onkeydown=function(b){b.key==="Enter"&&m.querySelector("#filter-btn-apply").click()};return}if(t.target.id==="filter-btn-apply"){const i=t.target.getAttribute("data-field"),d=document.getElementById("filter-popup-input").value;f.projects[i]=d,v("projects",n);return}if(t.target.id==="filter-btn-cancel"){const i=t.target.closest(".filter-popup");i&&i.remove();return}if(t.target.classList.contains("filter-chip__remove")){const i=t.target.getAttribute("data-filter-key");f.projects[i]="",v("projects",n);return}if(t.target.classList.contains("filter-chip--clear-all")){f.projects.companyName="",f.projects.projectName="",v("projects",n);return}const c=document.querySelector(".filter-popup");if(c&&!t.target.closest(".filter-popup")&&c.remove(),t.target.classList.contains("btn-delete")){const i=t.target.getAttribute("data-id");Y(i,n)}if(t.target.classList.contains("btn-assign")){const i=t.target.getAttribute("data-id");X(i,n)}const r=t.target.closest(".clickable-capacity");if(r){const i=r.getAttribute("data-id");q(i,n)}}}else o==="employees"&&(s.innerHTML=te(l.employees,n),s.onclick=function(a){if(a.target.classList.contains("sortable")){const t=a.target.getAttribute("data-sort");y.tab==="employees"&&y.field===t?y.direction=y.direction==="asc"?"desc":"asc":(y.tab="employees",y.field=t,y.direction="asc"),v("employees",n);return}if(a.target.classList.contains("filter-icon")){a.stopPropagation();const t=document.querySelector(".filter-popup");t&&t.remove();const c=a.target.getAttribute("data-filter-field"),r=a.target.closest("th"),i=document.createElement("div");i.className="filter-popup",i.innerHTML=`
                    <input type="text" id="filter-popup-input" class="filter-popup__input" placeholder="Search..." value="${f.employees[c]}">
                    <div class="filter-popup__actions">
                        <button class="filter-popup__btn" id="filter-btn-cancel">Cancel</button>
                        <button class="filter-popup__btn filter-popup__btn--apply" id="filter-btn-apply" data-field="${c}">Apply</button>
                    </div>
                `,r.appendChild(i);const d=i.querySelector("#filter-popup-input");d.focus(),d.onkeydown=function(p){p.key==="Enter"&&i.querySelector("#filter-btn-apply").click()};return}if(a.target.id==="filter-btn-apply"){const t=a.target.getAttribute("data-field"),c=document.getElementById("filter-popup-input").value;f.employees[t]=c,v("employees",n);return}if(a.target.id==="filter-btn-cancel"){const t=a.target.closest(".filter-popup");t&&t.remove();return}if(a.target.classList.contains("filter-chip__remove")){const t=a.target.getAttribute("data-filter-key");f.employees[t]="",v("employees",n);return}if(a.target.classList.contains("filter-chip--clear-all")){f.employees.name="",f.employees.surname="",f.employees.position="",v("employees",n);return}const e=document.querySelector(".filter-popup");if(e&&!a.target.closest(".filter-popup")&&e.remove(),a.target.classList.contains("btn-availability")){const t=a.target.getAttribute("data-id");W(t,n)}if(a.target.classList.contains("btn-delete--emp")){const t=a.target.getAttribute("data-id");K(t,n)}},s.ondblclick=function(a){const e=a.target;if(e.classList.contains("editable")&&!e.querySelector("input")){let p=function(){const m=d.value;ee(r,i,m,n),v("employees",n)};var t=p;const c=e.textContent.replace(" $","").trim(),r=e.getAttribute("data-id"),i=e.getAttribute("data-field"),d=document.createElement("input");d.type=i==="salary"?"number":"text",d.value=c,d.className="table-inline-input",e.innerHTML="",e.appendChild(d),d.focus(),d.onkeydown=function(m){m.key==="Enter"&&p()},d.onblur=function(){p()}}})}function L(){const o=document.getElementById("month-select"),n=document.getElementById("year-select");return!o||!n?"2026-01":n.value+"-"+o.value}function ae(o){const n=document.querySelectorAll(".nav-button"),s=document.getElementById("page-title"),l=document.getElementById("add-entity-btn");n.forEach(function(c){c.classList.remove("nav-button--active")});const a=o.currentTarget;a.classList.add("nav-button--active");const e=a.getAttribute("data-tab");e==="projects"?(s.textContent="Projects",l&&(l.textContent="+ Add projects")):e==="employees"&&(s.textContent="Employees",l&&(l.textContent="+ Add employee")),console.log("Переключено на вкладку:",e);const t=L();v(e,t)}function w(){const o=document.querySelector(".nav-button--active"),n=o?o.getAttribute("data-tab"):"projects",s=L();v(n,s),console.log("Период изменен на:",s)}function ne(){const o=document.getElementById("project-panel");o&&o.classList.add("slide-panel--open")}function k(){const o=document.getElementById("project-panel");o&&o.classList.remove("slide-panel--open")}function oe(){const o=document.getElementById("employee-panel");o&&o.classList.add("slide-panel--open")}function P(){const o=document.getElementById("employee-panel");o&&o.classList.remove("slide-panel--open")}function se(){const o=document.getElementById("sidebar"),n=document.getElementById("sidebar-toggle"),s=document.querySelectorAll(".nav-button"),l=document.getElementById("month-select"),a=document.getElementById("year-select"),e=document.getElementById("add-entity-btn"),t=document.getElementById("project-panel-close"),c=document.getElementById("project-panel-overlay"),r=document.getElementById("employee-panel-close"),i=document.getElementById("employee-panel-overlay");if(!l||!a)return;const d=localStorage.getItem("app-selected-month"),p=localStorage.getItem("app-selected-year");d&&(l.value=d),p&&(a.value=p),l.addEventListener("change",function(){localStorage.setItem("app-selected-month",l.value),w()}),a.addEventListener("change",function(){localStorage.setItem("app-selected-year",a.value),w()}),o&&n&&n.addEventListener("click",function(){o.classList.toggle("sidebar--collapsed")}),s.forEach(function(b){b.addEventListener("click",ae)}),e&&e.addEventListener("click",function(){const b=document.querySelector(".nav-button--active"),h=b?b.getAttribute("data-tab"):"projects";h==="projects"?ne():h==="employees"&&oe()}),t&&t.addEventListener("click",k),c&&c.addEventListener("click",k),r&&r.addEventListener("click",P),i&&i.addEventListener("click",P);const m=document.querySelector(".nav-button--active"),g=m?m.getAttribute("data-tab"):"projects";v(g,L())}function I(){const o=document.getElementById("proj-name"),n=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),l=document.getElementById("proj-capacity"),a=document.getElementById("proj-submit"),e=o.value.trim().length>0,t=n.value.trim().length>0,c=Number(s.value)>0,r=Number(l.value)>0;e&&t&&c&&r?a.disabled=!1:a.disabled=!0}function le(o){o.preventDefault();const n=document.getElementById("proj-name"),s=document.getElementById("proj-company"),l=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity"),e=document.getElementById("month-select"),c=document.getElementById("year-select").value+"-"+e.value,i={id:"proj_"+Date.now(),projectName:n.value.trim(),companyName:s.value.trim(),budget:Number(l.value),capacity:Number(a.value)},d=u.getMonthData(c);d.projects.push(i);const p=u.getRawData();p[c]=d,u.saveData(p),console.log("✅ Новый проект успешно сохранен в Store:",i),v("projects",c),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const m=document.getElementById("project-panel");m&&m.classList.remove("slide-panel--open")}function ie(){const o=document.getElementById("project-form");if(o){const n=document.getElementById("proj-name"),s=document.getElementById("proj-company"),l=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity");n.addEventListener("input",I),s.addEventListener("input",I),l.addEventListener("input",I),a.addEventListener("input",I),o.addEventListener("submit",le)}}function j(){const o=document.getElementById("emp-name"),n=document.getElementById("emp-position"),s=document.getElementById("emp-age"),l=document.getElementById("emp-salary"),a=document.getElementById("emp-submit"),e=document.getElementById("error-emp-age"),t=o.value.trim().length>0,c=n.value.trim().length>0,r=Number(l.value)>0,i=Number(s.value);let d=!1;s.value.trim()===""?e.textContent="":i<18?e.textContent="The employee must be over 18 years of age":(e.textContent="",d=!0),t&&c&&d&&r?a.disabled=!1:a.disabled=!0}function ce(o){o.preventDefault();const n=document.getElementById("emp-name"),s=document.getElementById("emp-position"),l=document.getElementById("emp-age"),a=document.getElementById("emp-salary"),e=document.getElementById("month-select"),c=document.getElementById("year-select").value+"-"+e.value,r={id:"emp_"+Date.now(),name:n.value.trim(),position:s.value.trim(),age:Number(l.value),salary:Number(a.value)},i=u.getMonthData(c);i.employees.push(r);const d=u.getRawData();d[c]=i,u.saveData(d),console.log("✅ Новый сотрудник добавлен:",r),v("employees",c),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const p=document.getElementById("employee-panel");p&&p.classList.remove("slide-panel--open")}function re(){const o=document.getElementById("employee-form");if(o){const n=document.getElementById("emp-name"),s=document.getElementById("emp-position"),l=document.getElementById("emp-age"),a=document.getElementById("emp-salary");n.addEventListener("input",j),s.addEventListener("input",j),l.addEventListener("input",j),a.addEventListener("input",j),o.addEventListener("submit",ce)}}function x(){const o=document.getElementById("assign-modal");o&&o.classList.remove("modal--open")}function de(){const o=document.getElementById("assign-modal"),n=document.getElementById("assign-capacity-range"),s=document.getElementById("assign-range-value"),l=document.getElementById("assign-form");if(!o)return;o.onclick=function(e){(e.target.id==="assign-modal-overlay"||e.target.id==="assign-modal-close")&&(console.log("🔒 Закрываем модальное окно..."),x())},n&&s&&(n.oninput=function(){s.textContent=n.value}),l&&(l.onsubmit=function(e){e.preventDefault();const t=document.getElementById("assign-project-id").value,c=document.getElementById("assign-emp-select").value,r=Number(n.value),i=document.getElementById("month-select"),p=document.getElementById("year-select").value+"-"+i.value;if(console.log("✏️ СОХРАНЯЕМ НАЗНАЧЕНИЕ. Ключ периода:",p),!c){alert("Please select an employee first!");return}const m=u.getMonthData(p);m.assignments||(m.assignments=[]);const g=m.assignments.find(function(h){return String(h.projectId)===String(t)&&String(h.employeeId)===String(c)});if(g)console.log("🔄 Сотрудник уже на проекте. Обновляем capacity с",g.capacity,"на",r),g.capacity=r;else{const h={projectId:t,employeeId:c,capacity:r};m.assignments.push(h),console.log("🔗 Новое назначение добавлено в Стор:",h)}const b=u.getRawData();b[p]=m,u.saveData(b),alert("Employee successfully assigned to the project!"),x(),renderCurrentTab("projects",p)});const a=document.getElementById("details-modal");a&&(a.onclick=function(e){(e.target.id==="details-modal-overlay"||e.target.id==="details-modal-close")&&a.classList.remove("modal--open")})}const $={"dashboard-app":`
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
`};class pe{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const n=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${n.length}`),n.forEach(s=>{const l=s.getAttribute("data-component");this.loadComponent(s,l)})}loadComponent(n,s){console.log(`📥 Загружаю компонент: ${s}`),$[s]?(n.innerHTML=$[s],n.setAttribute("data-loaded","true"),this.loadedComponents.add(s),console.log(`✅ ${s} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${s}" не найден в components.js`),n.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${s}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(s=>{let l=!1;s.forEach(a=>{a.addedNodes.length&&a.addedNodes.forEach(e=>{e.nodeType===1&&e.querySelectorAll&&e.querySelectorAll("[data-component]").length>0&&(l=!0)})}),l&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new pe().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const me=u.getRawData();Object.keys(me).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),u.saveData(O)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys($));console.log("📅 Данные за май 2026:",u.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),se(),ie(),re(),de()},0)});
