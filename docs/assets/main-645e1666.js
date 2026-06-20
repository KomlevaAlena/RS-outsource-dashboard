(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const P="monthData",u={getRawData(){const n=localStorage.getItem(P);return n?JSON.parse(n):{}},saveData(n){const t=JSON.stringify(n);localStorage.setItem(P,t)},getMonthData(n){const t=this.getRawData();return t[n]?t[n]:{employees:[],projects:[]}}},V={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};let E=new Set,A=null,N="";function R(n,t){A=n,N=t;const o=document.getElementById("vacation-modal"),c=document.getElementById("vacation-modal-title"),e=document.getElementById("calendar-grid-container");if(!o||!e){console.error("❌ Элементы календаря не найдены в DOM");return}const s=t.split("-"),a=parseInt(s[0],10),i=parseInt(s[1],10),l=u.getMonthData(t).employees.find(d=>String(d.id)===String(n));if(l){c.textContent=`Availability for ${l.name}`;const d=l.vacations||[];E=new Set(d.map(Number))}else E=new Set;U(a,i,e),z(o,a,i,e),o.classList.add("modal--open"),console.log(`📅 Календарь открыт для сотрудника ${n} на период ${t}`)}function U(n,t,o){o.innerHTML=G(n,t),O(n,t)}function G(n,t){const o=new Date(n,t+1,0).getDate();let c=new Date(n,t,1).getDay()-1;c<0&&(c=6);const e=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];let s='<div class="calendar-grid">';e.forEach(a=>{s+=`<div class="calendar-header-cell ${a==="Sat"||a==="Sun"?"calendar-header-cell--weekend":""}">${a}</div>`});for(let a=0;a<c;a++)s+='<div class="calendar-day-cell calendar-day-cell--empty"></div>';for(let a=1;a<=o;a++){const r=new Date(n,t,a).getDay(),l=r===0||r===6;let d="calendar-day-cell calendar-day-target";l&&(d+=" calendar-day-cell--weekend"),E.has(a)&&(d+=" calendar-day-cell--selected"),s+=`<div class="${d}" data-day="${a}">${a}</div>`}return s+="</div>",s}function O(n,t){const o=new Date(n,t+1,0).getDate();let c=0,e=0;for(let l=1;l<=o;l++){const d=new Date(n,t,l).getDay();d===0||d===6||(c++,E.has(l)&&e++)}const s=c-e,a=document.getElementById("calendar-working-days");a&&(a.textContent=`Working Days: ${s}/${c} days`);const i=J(n,t),r=document.getElementById("calendar-vacation-ranges");r&&(r.textContent=i||"None")}function J(n,t){const o=Array.from(E).sort((i,r)=>i-r);if(o.length===0)return"";const c=[];let e=o[0],s=o[0];const a=i=>{const r=String(i).padStart(2,"0"),l=String(t+1).padStart(2,"0");return`${r}.${l}`};for(let i=1;i<o.length;i++){const r=o[i];let l=!1;if(r===s+1)l=!0;else{let d=!1;for(let p=s+1;p<r;p++){const m=new Date(n,t,p).getDay();if(m!==0&&m!==6){d=!0;break}}d||(l=!0)}l||(e===s?c.push(a(e)):c.push(`${a(e)}-${a(s)}`),e=r),s=r}return e===s?c.push(a(e)):c.push(`${a(e)}-${a(s)}`),c.join(", ")}function z(n,t,o,c){c.onclick=function(s){const a=s.target;if(!a.classList.contains("calendar-day-target"))return;const i=parseInt(a.getAttribute("data-day"),10);E.has(i)?(E.delete(i),a.classList.remove("calendar-day-cell--selected")):(E.add(i),a.classList.add("calendar-day-cell--selected")),O(t,o)},n.onclick=function(s){(s.target.id==="vacation-modal-overlay"||s.target.id==="vacation-modal-close")&&(n.classList.remove("modal--open"),console.log("🔒 Календарь закрыт"))};const e=document.getElementById("btn-save-vacation");e&&(e.onclick=function(){const s=u.getRawData(),r=((s[N]||{}).employees||[]).find(l=>String(l.id)===String(A));r&&(r.vacations=Array.from(E).sort((l,d)=>l-d),u.saveData(s),console.log(`💾 Отпуска сохранены для сотрудника ${A}:`,r.vacations),h("employees",N),n.classList.remove("modal--open"))})}function Y(n,t){const o=new Date(n,t+1,0).getDate();let c=0;for(let e=1;e<=o;e++){const s=new Date(n,t,e).getDay();s===0||s===6||c++}return c}function Z(n,t,o){if(!n||!Array.isArray(n)||n.length===0)return 0;let c=0;return n.forEach(e=>{const s=new Date(t,o,e).getDay();s===0||s===6||c++}),c}function j(n,t){const o=t.split("-"),c=parseInt(o[0],10),e=parseInt(o[1],10),s=Y(c,e),a=n.vacations||[],i=Z(a,c,e);if(s===0)return 0;const r=i/s;return Math.round(r*100)/100}function S(n,t){const c=100*(1-j(n,t));return Math.round(c)}function L(n,t,o,c){const e=t.filter(function(l){return String(l.projectId)===String(n.id)});let s=0,a=0;e.forEach(function(l){const d=o.find(function(p){return String(p.id)===String(l.employeeId)});if(d){s+=l.capacity;const p=j(d,c),m=d.salary*(l.capacity/100)*(1-p);a+=m}});const i=n.budget,r=i-a;return{effectiveCapacity:Math.round(s),expenses:Math.round(a),revenue:Math.round(i),profit:Math.round(r)}}function Q(n,t,o,c){let e=0,s=0,a=0,i=0;return n.forEach(function(r){const l=L(r,t,o,c);e+=l.revenue,s+=l.effectiveCapacity,a+=l.expenses,i+=l.profit}),{totalBudget:e,totalCapacity:s,totalExpenses:a,totalProfit:i}}let g={projects:{companyName:"",projectName:""},employees:{name:"",surname:"",position:""},employeePosition:""};function W(n){const t=g[n];let o="",c=0;for(const e in t)if(t[e]&&t[e].trim()!==""){c++;const s=e.replace(/([A-Z])/g," $1").replace(/^./,a=>a.toUpperCase());o+=`
                <div class="filter-chip">
                    <span>${s}: <strong>${t[e]}</strong></span>
                    <button class="filter-chip__remove" data-filter-tab="${n}" data-filter-key="${e}">×</button>
                </div>
            `}return c>=2&&(o+=`
            <div class="filter-chip filter-chip--clear-all" data-filter-clear-tab="${n}">
                Clear Filters
            </div>
        `),`<div class="filter-chips-container">${o}</div>`}function X(n,t){if(!confirm("Are you sure you want to delete this project?"))return;const c=u.getMonthData(t),e=c.projects.filter(function(a){return a.id!==n});c.projects=e;const s=u.getRawData();s[t]=c,u.saveData(s),console.log(`❌ Проект с ID ${n} успешно удален`),renderCurrentTab("projects",t)}function K(n,t){const o=n.projects||[],c=n.assignments||[],e=n.employees||[],s=o.length,a=Q(o,c,e,t);return` 
        <div class="fin-summary">
            <div class="fin-card">
                <span class="fin-card__title">Active Projects</span>
                <span class="fin-card__value">${s}</span>
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
    `}function ee(n,t,o){let c=n.projects||[];const e=n.assignments||[],s=n.employees||[];if(g.projects.companyName&&g.projects.companyName.trim()!==""){const r=g.projects.companyName.toLowerCase().trim();c=c.filter(l=>l.companyName?l.companyName.toLowerCase().includes(r):!1)}if(g.projects.projectName&&g.projects.projectName.trim()!==""){const r=g.projects.projectName.toLowerCase().trim();c=c.filter(l=>l.projectName?l.projectName.toLowerCase().includes(r):!1)}o.tab==="projects"&&o.field&&(c=[...c].sort(function(r,l){let d,p;if(o.field==="expenses"||o.field==="profit"||o.field==="effectiveCapacity"){const m=L(r,e,s,t),y=L(l,e,s,t);d=m[o.field],p=y[o.field]}else d=r[o.field],p=l[o.field];return typeof d=="string"?o.direction==="asc"?d.localeCompare(p):p.localeCompare(d):o.direction==="asc"?d-p:p-d}));function a(r){return o.tab==="projects"&&o.field===r?o.direction==="asc"?" ↑":" ↓":""}let i=W("projects");return c.length===0?(i+='<p class="empty-state">No matching projects found</p>',i):(i+=` 
    <table class="table">
        <thead>
            <tr>
                <th class="sortable" data-sort="companyName">
                    Company${a("companyName")}
                    <span class="filter-icon" data-filter-field="companyName">⌕</span>
                </th>
                <th class="sortable" data-sort="projectName">
                    Project${a("projectName")}
                    <span class="filter-icon" data-filter-field="projectName">⌕</span>
                </th>
                <th class="sortable" data-sort="budget">Budget (Rev.)${a("budget")}</th>
                <th class="sortable" data-sort="effectiveCapacity">Capacity${a("effectiveCapacity")}</th>
                <th class="sortable" data-sort="expenses">Expenses${a("expenses")}</th>
                <th class="sortable" data-sort="profit">Profit${a("profit")}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `,c.forEach(function(r){const l=L(r,e,s,t),d=l.profit<0?"text-danger":"text-success";i+=`
            <tr>
                <td>${r.companyName}</td>
                <td>${r.projectName}</td>
                <td>${r.budget.toLocaleString()} $</td>
                <td class="clickable-capacity" data-id="${r.id}">
                    <span class="capacity-link">${l.effectiveCapacity} / ${r.capacity} p.</span>
                </td>
                <td>${l.expenses.toLocaleString()} $</td>
                <td class="${d}"><strong>${l.profit.toLocaleString()} $</strong></td>
                <td>
                    <button class="btn-assign" data-id="${r.id}">Assign</button>
                    <button class="btn-delete" data-id="${r.id}">Delete</button>
                </td>
            </tr>
        `}),i+="</tbody></table>",i)}function H(n,t){const o=document.getElementById("details-modal"),c=document.getElementById("details-modal-body"),e=document.getElementById("details-modal-title");if(!o||!c)return;typeof u.loadFromLocalStorage=="function"&&u.loadFromLocalStorage();const s=u.getMonthData(t),a=s.projects||[],i=s.employees||[],r=s.assignments||[],l=a.find(p=>p.id===n);l&&(e.textContent=`Team for "${l.projectName}"`);const d=r.filter(p=>String(p.projectId)===String(n));if(d.length===0)c.innerHTML='<p class="empty-state">No employees assigned to this project yet.</p>';else{let p='<ul class="team-list">';d.forEach(function(m){const y=i.find(v=>String(v.id)===String(m.employeeId));y&&(p+=`
                    <li class="team-item">
                        <div class="team-item__info">
                            <strong class="team-item__name">${y.name}</strong>
                            <span class="team-item__position">${y.position}</span>
                        </div>
                        <div class="team-item__actions">
                            <span class="team-item__capacity">${m.capacity}% load</span>
                            <button class="btn-remove-asm" 
                                    data-project-id="${n}" 
                                    data-employee-id="${y.id}" 
                                    title="Remove from project">×</button>
                        </div>
                    </li>
                `)}),p+="</ul>",c.innerHTML=p}o.onclick=function(p){if(p.target.classList.contains("btn-remove-asm")){const m=p.target.getAttribute("data-project-id"),y=p.target.getAttribute("data-employee-id");if(!confirm("Are you sure you want to remove this employee from the project?"))return;const v=u.getRawData(),f=v[t]||{},I=f.assignments||[];f.assignments=I.filter(function(_){return!(String(_.projectId)===String(m)&&String(_.employeeId)===String(y))}),u.saveData(v),H(m,t),renderCurrentTab("projects",t);return}(p.target.id==="details-modal-overlay"||p.target.id==="details-modal-close")&&o.classList.remove("modal--open")},o.classList.add("modal--open")}function te(n,t){const o=document.getElementById("assign-modal"),c=document.getElementById("assign-project-id"),e=document.getElementById("assign-emp-select");if(!o||!e)return;c&&(c.value=n);const s=u.getMonthData(t),a=s&&s.employees?s.employees:[];if(a.length===0)e.innerHTML='<option value="">-- No employees available --</option>';else{let l='<option value="">-- Select an employee --</option>';a.forEach(function(d){const p=d.name||"Unknown Name",m=d.position||"No Position";l+=`<option value="${d.id}">${p} (${m})</option>`}),e.innerHTML=l}const i=document.getElementById("assign-capacity-range"),r=document.getElementById("assign-range-value");i&&(i.value=50),r&&(r.textContent="50"),o.classList.add("modal--open")}function ae(n,t,o){if(!confirm("Are you sure you want to remove this employee?"))return;const e=u.getMonthData(t);e.employees=e.employees.filter(function(a){return a.id!==n});const s=u.getRawData();s[t]=e,u.saveData(s),console.log(`❌ Сотрудник с ID ${n} удален`),o()}function M(n,t,o,c,e){const s=u.getMonthData(c),a=s.employees.find(i=>i.id===n);if(a){if(t==="salary"){const r=Number(o);if(isNaN(r)||r<=0){alert("Please enter the correct salary amount"),e();return}a[t]=r}else{if(o.trim()===""){alert("The field cannot be empty"),e();return}a[t]=o.trim()}const i=u.getRawData();i[c]=s,u.saveData(i),console.log(`📝 Сотрудник ${n}: поле ${t} обновлено на ${o}`),e()}}function ne(n,t,o,c){if(n.length===0)return'<p class="empty-state">No employees added yet</p>';let e=n||[];if(g.employees.name&&g.employees.name.trim()!==""){const i=g.employees.name.toLowerCase().trim();e=e.filter(r=>r.name?(r.name.split(" ")[0]||"").toLowerCase().includes(i):!1)}if(g.employees.surname&&g.employees.surname.trim()!==""){const i=g.employees.surname.toLowerCase().trim();e=e.filter(r=>r.name?(r.name.split(" ").slice(1).join(" ")||"").toLowerCase().includes(i):!1)}if(g.employees.position&&g.employees.position.trim()!==""){const i=g.employees.position.toLowerCase().trim();e=e.filter(r=>r.position?r.position.toLowerCase().includes(i):!1)}o.tab==="employees"&&o.field&&(e=[...e].sort(function(i,r){let l,d;return o.field==="vacationFactor"?(l=j(i,t),d=j(r,t)):o.field==="effectiveCapacity"?(l=S(i,t),d=S(r,t)):(l=i[o.field],d=r[o.field]),typeof l=="string"?o.direction==="asc"?l.localeCompare(d):d.localeCompare(l):o.direction==="asc"?l-d:d-l}));function s(i){return o.tab==="employees"&&o.field===i?o.direction==="asc"?" ↑":" ↓":""}let a=W("employees");return e.length===0?(a+='<p class="empty-state">No employees found matching filters</p>',a):(a+=`
    <table class="table">
        <thead>
            <tr>
                <th class="sortable" data-sort="name">
                    Name${s("name")}
                    <span class="filter-icon" data-filter-field="name">⌕</span>
                </th>
                <th>
                    Surname
                    <span class="filter-icon" data-filter-field="surname">⌕</span>
                </th>
                <th class="sortable" data-sort="position">
                    Position${s("position")}
                    <span class="filter-icon" data-filter-field="position">⌕</span>
                </th>
                <th class="sortable" data-sort="age">Age${s("age")}</th>
                <th class="sortable" data-sort="salary">Salary${s("salary")}</th>
                <th class="sortable" data-sort="vacationFactor">Vacation Factor${s("vacationFactor")}</th>
                <th class="sortable" data-sort="effectiveCapacity">Eff. Capacity${s("effectiveCapacity")}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `,e.forEach(function(i){const r=j(i,t),l=S(i,t),d=i.name?i.name.split(" "):["Unknown",""],p=d[0],m=d.slice(1).join(" ")||"—";a+=`
            <tr>
                <td>${p}</td>
                <td>${m}</td>
                <td class="editable" data-id="${i.id}" data-field="position">${i.position}</td>
                <td>${i.age} y.o.</td>
                <td class="editable" data-id="${i.id}" data-field="salary">${i.salary} $</td>
                <td><span class="badge badge--factor">${r}</span></td>
                <td><span class="badge badge--capacity">${l}%</span></td>
                <td>
                    <button class="btn-delete btn-delete--emp" data-id="${i.id}">Delete</button>
                    <button class="btn-availability" data-id="${i.id}">Availability</button>
                </td>
            </tr>
        `}),a+="</tbody></table>",setTimeout(()=>{const i=document.querySelector(".table");i&&!i.dataset.dblclickAssigned&&(i.dataset.dblclickAssigned="true",i.ondblclick=function(r){const l=r.target;if(l.classList.contains("editable")&&!l.querySelector("input")&&!l.querySelector("select")){const m=l.textContent.replace(" $","").trim(),y=l.getAttribute("data-id"),v=l.getAttribute("data-field");if(v==="position"){let _=function(){M(y,v,f.value,t,c)};var d=_;const f=document.createElement("select");f.className="table-inline-select",["Junior","Middle","Senior","Lead","Architect","BO"].forEach($=>{const B=document.createElement("option");B.value=$,B.textContent=$,$.toLowerCase()===m.toLowerCase()&&(B.selected=!0),f.appendChild(B)}),l.innerHTML="",l.appendChild(f),f.focus(),f.onchange=_,f.onblur=_}else if(v==="salary"){let I=function(){M(y,v,f.value,t,c)};var p=I;const f=document.createElement("input");f.type="number",f.min="0",f.value=m,f.className="table-inline-input",l.innerHTML="",l.appendChild(f),f.focus(),f.onkeydown=_=>{_.key==="Enter"&&f.blur(),_.key==="Escape"&&(l.innerHTML=m+" $")},f.onblur=I}}})},0),a)}const b={tab:null,field:null,direction:"asc"};function h(n,t){const o=document.getElementById("table-container");if(!o)return;const c=u.getMonthData(t);if(n==="projects"){const e=K(c,t),s=ee(c,t,b);o.innerHTML=e+s,o.onclick=function(a){if(a.target.classList.contains("sortable")){const l=a.target.getAttribute("data-sort");b.tab==="projects"&&b.field===l?b.direction=b.direction==="asc"?"desc":"asc":(b.tab="projects",b.field=l,b.direction="asc"),h("projects",t);return}if(a.target.classList.contains("filter-icon")){a.stopPropagation();const l=document.querySelector(".filter-popup");l&&l.remove();const d=a.target.getAttribute("data-filter-field"),p=a.target.closest("th"),m=document.createElement("div");m.className="filter-popup",m.innerHTML=`
                    <input type="text" id="filter-popup-input" class="filter-popup__input" placeholder="Search..." value="${g.projects[d]}">
                    <div class="filter-popup__actions">
                        <button class="filter-popup__btn" id="filter-btn-cancel">Cancel</button>
                        <button class="filter-popup__btn filter-popup__btn--apply" id="filter-btn-apply" data-field="${d}">Apply</button>
                    </div>
                `,p.appendChild(m);const y=m.querySelector("#filter-popup-input");y.focus(),y.onkeydown=function(v){v.key==="Enter"&&m.querySelector("#filter-btn-apply").click()};return}if(a.target.id==="filter-btn-apply"){const l=a.target.getAttribute("data-field"),d=document.getElementById("filter-popup-input").value;g.projects[l]=d,h("projects",t);return}if(a.target.id==="filter-btn-cancel"){const l=a.target.closest(".filter-popup");l&&l.remove();return}if(a.target.classList.contains("filter-chip__remove")){const l=a.target.getAttribute("data-filter-key");g.projects[l]="",h("projects",t);return}if(a.target.classList.contains("filter-chip--clear-all")){g.projects.companyName="",g.projects.projectName="",h("projects",t);return}const i=document.querySelector(".filter-popup");if(i&&!a.target.closest(".filter-popup")&&i.remove(),a.target.classList.contains("btn-delete")){const l=a.target.getAttribute("data-id");X(l,t)}if(a.target.classList.contains("btn-assign")){const l=a.target.getAttribute("data-id");te(l,t)}const r=a.target.closest(".clickable-capacity");if(r){const l=r.getAttribute("data-id");H(l,t)}}}else n==="employees"&&(o.innerHTML=ne(c.employees,t,b,()=>h("employees",t)),o.onclick=function(e){if(e.target.classList.contains("sortable")){const a=e.target.getAttribute("data-sort");b.tab==="employees"&&b.field===a?b.direction=b.direction==="asc"?"desc":"asc":(b.tab="employees",b.field=a,b.direction="asc"),h("employees",t);return}if(e.target.classList.contains("filter-icon")){e.stopPropagation();const a=document.querySelector(".filter-popup");a&&a.remove();const i=e.target.getAttribute("data-filter-field"),r=e.target.closest("th"),l=document.createElement("div");l.className="filter-popup",l.innerHTML=`
                    <input type="text" id="filter-popup-input" class="filter-popup__input" placeholder="Search..." value="${g.employees[i]||""}">
                    <div class="filter-popup__actions">
                        <button class="filter-popup__btn" id="filter-btn-cancel">Cancel</button>
                        <button class="filter-popup__btn filter-popup__btn--apply" id="filter-btn-apply" data-field="${i}">Apply</button>
                    </div>
                `,r.appendChild(l);const d=l.querySelector("#filter-popup-input");d.focus(),d.onkeydown=function(p){p.key==="Enter"&&l.querySelector("#filter-btn-apply").click()};return}if(e.target.id==="filter-btn-apply"){const a=e.target.getAttribute("data-field"),i=document.getElementById("filter-popup-input").value;g.employees[a]=i,h("employees",t);return}if(e.target.id==="filter-btn-cancel"){const a=e.target.closest(".filter-popup");a&&a.remove();return}if(e.target.classList.contains("filter-chip__remove")){const a=e.target.getAttribute("data-filter-key");g.employees[a]="",h("employees",t);return}if(e.target.classList.contains("filter-chip--clear-all")){g.employees.name="",g.employees.surname="",g.employees.position="",h("employees",t);return}const s=document.querySelector(".filter-popup");if(s&&!e.target.closest(".filter-popup")&&s.remove(),e.target.classList.contains("btn-availability")){const a=e.target.getAttribute("data-id");R(a,t)}if(e.target.classList.contains("btn-delete--emp")){const a=e.target.getAttribute("data-id");ae(a,t,()=>h("employees",t))}})}function w(){const n=document.getElementById("month-select"),t=document.getElementById("year-select");return!n||!t?"2026-01":t.value+"-"+n.value}function oe(n){const t=document.querySelectorAll(".nav-button"),o=document.getElementById("page-title"),c=document.getElementById("add-entity-btn");t.forEach(function(i){i.classList.remove("nav-button--active")});const e=n.currentTarget;e.classList.add("nav-button--active");const s=e.getAttribute("data-tab");s==="projects"?(o.textContent="Projects",c&&(c.textContent="+ Add projects")):s==="employees"&&(o.textContent="Employees",c&&(c.textContent="+ Add employee")),console.log("Переключено на вкладку:",s);const a=w();h(s,a)}function x(){const n=document.querySelector(".nav-button--active"),t=n?n.getAttribute("data-tab"):"projects",o=w();h(t,o),console.log("Период изменен на:",o)}function se(){const n=document.getElementById("project-panel");n&&n.classList.add("slide-panel--open")}function T(){const n=document.getElementById("project-panel");n&&n.classList.remove("slide-panel--open")}function le(){const n=document.getElementById("employee-panel");n&&n.classList.add("slide-panel--open")}function q(){const n=document.getElementById("employee-panel");n&&n.classList.remove("slide-panel--open")}function ie(){const n=document.getElementById("sidebar"),t=document.getElementById("sidebar-toggle"),o=document.querySelectorAll(".nav-button"),c=document.getElementById("month-select"),e=document.getElementById("year-select"),s=document.getElementById("add-entity-btn"),a=document.getElementById("project-panel-close"),i=document.getElementById("project-panel-overlay"),r=document.getElementById("employee-panel-close"),l=document.getElementById("employee-panel-overlay");if(!c||!e)return;const d=localStorage.getItem("app-selected-month"),p=localStorage.getItem("app-selected-year");d&&(c.value=d),p&&(e.value=p),c.addEventListener("change",function(){localStorage.setItem("app-selected-month",c.value),x()}),e.addEventListener("change",function(){localStorage.setItem("app-selected-year",e.value),x()}),n&&t&&t.addEventListener("click",function(){n.classList.toggle("sidebar--collapsed")}),o.forEach(function(v){v.addEventListener("click",oe)}),s&&s.addEventListener("click",function(){const v=document.querySelector(".nav-button--active"),f=v?v.getAttribute("data-tab"):"projects";f==="projects"?se():f==="employees"&&le()}),a&&a.addEventListener("click",T),i&&i.addEventListener("click",T),r&&r.addEventListener("click",q),l&&l.addEventListener("click",q);const m=document.querySelector(".nav-button--active"),y=m?m.getAttribute("data-tab"):"projects";h(y,w())}function D(){const n=document.getElementById("proj-name"),t=document.getElementById("proj-company"),o=document.getElementById("proj-budget"),c=document.getElementById("proj-capacity"),e=document.getElementById("proj-submit"),s=n.value.trim().length>0,a=t.value.trim().length>0,i=Number(o.value)>0,r=Number(c.value)>0;s&&a&&i&&r?e.disabled=!1:e.disabled=!0}function ce(n){n.preventDefault();const t=document.getElementById("proj-name"),o=document.getElementById("proj-company"),c=document.getElementById("proj-budget"),e=document.getElementById("proj-capacity"),s=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+s.value,l={id:"proj_"+Date.now(),projectName:t.value.trim(),companyName:o.value.trim(),budget:Number(c.value),capacity:Number(e.value)},d=u.getMonthData(i);d.projects.push(l);const p=u.getRawData();p[i]=d,u.saveData(p),console.log("✅ Новый проект успешно сохранен в Store:",l),h("projects",i),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const m=document.getElementById("project-panel");m&&m.classList.remove("slide-panel--open")}function re(){const n=document.getElementById("project-form");if(n){const t=document.getElementById("proj-name"),o=document.getElementById("proj-company"),c=document.getElementById("proj-budget"),e=document.getElementById("proj-capacity");t.addEventListener("input",D),o.addEventListener("input",D),c.addEventListener("input",D),e.addEventListener("input",D),n.addEventListener("submit",ce)}}function C(){const n=document.getElementById("emp-name"),t=document.getElementById("emp-position"),o=document.getElementById("emp-age"),c=document.getElementById("emp-salary"),e=document.getElementById("emp-submit"),s=document.getElementById("error-emp-age"),a=n.value.trim().length>0,i=t.value.trim().length>0,r=Number(c.value)>0,l=Number(o.value);let d=!1;o.value.trim()===""?s.textContent="":l<18?s.textContent="The employee must be over 18 years of age":(s.textContent="",d=!0),a&&i&&d&&r?e.disabled=!1:e.disabled=!0}function de(n){n.preventDefault();const t=document.getElementById("emp-name"),o=document.getElementById("emp-position"),c=document.getElementById("emp-age"),e=document.getElementById("emp-salary"),s=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+s.value,r={id:"emp_"+Date.now(),name:t.value.trim(),position:o.value.trim(),age:Number(c.value),salary:Number(e.value)},l=u.getMonthData(i);l.employees.push(r);const d=u.getRawData();d[i]=l,u.saveData(d),console.log("✅ Новый сотрудник добавлен:",r),h("employees",i),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const p=document.getElementById("employee-panel");p&&p.classList.remove("slide-panel--open")}function pe(){const n=document.getElementById("employee-form");if(n){const t=document.getElementById("emp-name"),o=document.getElementById("emp-position"),c=document.getElementById("emp-age"),e=document.getElementById("emp-salary");t.addEventListener("input",C),o.addEventListener("input",C),c.addEventListener("input",C),e.addEventListener("input",C),n.addEventListener("submit",de)}}function F(){const n=document.getElementById("assign-modal");n&&n.classList.remove("modal--open")}function me(){const n=document.getElementById("assign-modal"),t=document.getElementById("assign-capacity-range"),o=document.getElementById("assign-range-value"),c=document.getElementById("assign-form");if(!n)return;n.onclick=function(s){(s.target.id==="assign-modal-overlay"||s.target.id==="assign-modal-close")&&(console.log("🔒 Закрываем модальное окно..."),F())},t&&o&&(t.oninput=function(){o.textContent=t.value}),c&&(c.onsubmit=function(s){s.preventDefault();const a=document.getElementById("assign-project-id").value,i=document.getElementById("assign-emp-select").value,r=Number(t.value),l=document.getElementById("month-select"),p=document.getElementById("year-select").value+"-"+l.value;if(console.log("✏️ СОХРАНЯЕМ НАЗНАЧЕНИЕ. Ключ периода:",p),!i){alert("Please select an employee first!");return}const m=u.getMonthData(p);m.assignments||(m.assignments=[]);const y=m.assignments.find(function(f){return String(f.projectId)===String(a)&&String(f.employeeId)===String(i)});if(y)console.log("🔄 Сотрудник уже на проекте. Обновляем capacity с",y.capacity,"на",r),y.capacity=r;else{const f={projectId:a,employeeId:i,capacity:r};m.assignments.push(f),console.log("🔗 Новое назначение добавлено в Стор:",f)}const v=u.getRawData();v[p]=m,u.saveData(v),alert("Employee successfully assigned to the project!"),F(),renderCurrentTab("projects",p)});const e=document.getElementById("details-modal");e&&(e.onclick=function(s){(s.target.id==="details-modal-overlay"||s.target.id==="details-modal-close")&&e.classList.remove("modal--open")})}const k={"dashboard-app":`
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
`};class ue{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const t=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${t.length}`),t.forEach(o=>{const c=o.getAttribute("data-component");this.loadComponent(o,c)})}loadComponent(t,o){console.log(`📥 Загружаю компонент: ${o}`),k[o]?(t.innerHTML=k[o],t.setAttribute("data-loaded","true"),this.loadedComponents.add(o),console.log(`✅ ${o} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${o}" не найден в components.js`),t.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${o}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(o=>{let c=!1;o.forEach(e=>{e.addedNodes.length&&e.addedNodes.forEach(s=>{s.nodeType===1&&s.querySelectorAll&&s.querySelectorAll("[data-component]").length>0&&(c=!0)})}),c&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new ue().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const fe=u.getRawData();Object.keys(fe).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),u.saveData(V)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(k));console.log("📅 Данные за май 2026:",u.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),ie(),re(),pe(),me()},0)});
