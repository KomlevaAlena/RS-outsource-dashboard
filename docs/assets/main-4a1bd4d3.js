(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();const M="monthData",g={getRawData(){const o=localStorage.getItem(M);return o?JSON.parse(o):{}},saveData(o){const e=JSON.stringify(o);localStorage.setItem(M,e)},getMonthData(o){const e=this.getRawData();return e[o]?e[o]:{employees:[],projects:[]}}},R={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};let I=new Set,N=null,k="";function U(o,e){N=o,k=e;const n=document.getElementById("vacation-modal"),c=document.getElementById("vacation-modal-title"),t=document.getElementById("calendar-grid-container");if(!n||!t){console.error("❌ Элементы календаря не найдены в DOM");return}const s=e.split("-"),a=parseInt(s[0],10),i=parseInt(s[1],10),l=g.getMonthData(e).employees.find(d=>String(d.id)===String(o));if(l){c.textContent=`Availability for ${l.name}`;const d=l.vacations||[];I=new Set(d.map(Number))}else I=new Set;G(a,i,t),Y(n,a,i,t),n.classList.add("modal--open"),console.log(`📅 Календарь открыт для сотрудника ${o} на период ${e}`)}function G(o,e,n){n.innerHTML=J(o,e),W(o,e)}function J(o,e){const n=new Date(o,e+1,0).getDate();let c=new Date(o,e,1).getDay()-1;c<0&&(c=6);const t=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];let s='<div class="calendar-grid">';t.forEach(a=>{s+=`<div class="calendar-header-cell ${a==="Sat"||a==="Sun"?"calendar-header-cell--weekend":""}">${a}</div>`});for(let a=0;a<c;a++)s+='<div class="calendar-day-cell calendar-day-cell--empty"></div>';for(let a=1;a<=n;a++){const r=new Date(o,e,a).getDay(),l=r===0||r===6;let d="calendar-day-cell calendar-day-target";l&&(d+=" calendar-day-cell--weekend"),I.has(a)&&(d+=" calendar-day-cell--selected"),s+=`<div class="${d}" data-day="${a}">${a}</div>`}return s+="</div>",s}function W(o,e){const n=new Date(o,e+1,0).getDate();let c=0,t=0;for(let l=1;l<=n;l++){const d=new Date(o,e,l).getDay();d===0||d===6||(c++,I.has(l)&&t++)}const s=c-t,a=document.getElementById("calendar-working-days");a&&(a.textContent=`Working Days: ${s}/${c} days`);const i=z(o,e),r=document.getElementById("calendar-vacation-ranges");r&&(r.textContent=i||"None")}function z(o,e){const n=Array.from(I).sort((i,r)=>i-r);if(n.length===0)return"";const c=[];let t=n[0],s=n[0];const a=i=>{const r=String(i).padStart(2,"0"),l=String(e+1).padStart(2,"0");return`${r}.${l}`};for(let i=1;i<n.length;i++){const r=n[i];let l=!1;if(r===s+1)l=!0;else{let d=!1;for(let p=s+1;p<r;p++){const m=new Date(o,e,p).getDay();if(m!==0&&m!==6){d=!0;break}}d||(l=!0)}l||(t===s?c.push(a(t)):c.push(`${a(t)}-${a(s)}`),t=r),s=r}return t===s?c.push(a(t)):c.push(`${a(t)}-${a(s)}`),c.join(", ")}function Y(o,e,n,c){c.onclick=function(s){const a=s.target;if(!a.classList.contains("calendar-day-target"))return;const i=parseInt(a.getAttribute("data-day"),10);I.has(i)?(I.delete(i),a.classList.remove("calendar-day-cell--selected")):(I.add(i),a.classList.add("calendar-day-cell--selected")),W(e,n)},o.onclick=function(s){(s.target.id==="vacation-modal-overlay"||s.target.id==="vacation-modal-close")&&(o.classList.remove("modal--open"),console.log("🔒 Календарь закрыт"))};const t=document.getElementById("btn-save-vacation");t&&(t.onclick=function(){const s=g.getRawData(),r=((s[k]||{}).employees||[]).find(l=>String(l.id)===String(N));r&&(r.vacations=Array.from(I).sort((l,d)=>l-d),g.saveData(s),console.log(`💾 Отпуска сохранены для сотрудника ${N}:`,r.vacations),_("employees",k),o.classList.remove("modal--open"))})}function X(o,e){const n=new Date(o,e+1,0).getDate();let c=0;for(let t=1;t<=n;t++){const s=new Date(o,e,t).getDay();s===0||s===6||c++}return c}function Z(o,e,n){if(!o||!Array.isArray(o)||o.length===0)return 0;let c=0;return o.forEach(t=>{const s=new Date(e,n,t).getDay();s===0||s===6||c++}),c}function B(o,e){const n=e.split("-"),c=parseInt(n[0],10),t=parseInt(n[1],10),s=X(c,t),a=o.vacations||[],i=Z(a,c,t);if(s===0)return 0;const r=i/s;return Math.round(r*100)/100}function A(o,e){const c=100*(1-B(o,e));return Math.round(c)}function S(o,e,n,c){const t=e.filter(function(l){return String(l.projectId)===String(o.id)});let s=0,a=0;t.forEach(function(l){const d=n.find(function(p){return String(p.id)===String(l.employeeId)});if(d){s+=l.capacity;const p=B(d,c),m=d.salary*(l.capacity/100)*(1-p);a+=m}});const i=o.budget,r=i-a;return{effectiveCapacity:Math.round(s),expenses:Math.round(a),revenue:Math.round(i),profit:Math.round(r)}}function Q(o,e,n,c){let t=0,s=0,a=0,i=0;return o.forEach(function(r){const l=S(r,e,n,c);t+=l.revenue,s+=l.effectiveCapacity,a+=l.expenses,i+=l.profit}),{totalBudget:t,totalCapacity:s,totalExpenses:a,totalProfit:i}}let b={projects:{companyName:"",projectName:""},employees:{name:"",surname:"",position:""},employeePosition:""};function H(o){const e=b[o];let n="",c=0;for(const t in e)if(e[t]&&e[t].trim()!==""){c++;const s=t.replace(/([A-Z])/g," $1").replace(/^./,a=>a.toUpperCase());n+=`
                <div class="filter-chip">
                    <span>${s}: <strong>${e[t]}</strong></span>
                    <button class="filter-chip__remove" data-filter-tab="${o}" data-filter-key="${t}">×</button>
                </div>
            `}return c>=2&&(n+=`
            <div class="filter-chip filter-chip--clear-all" data-filter-clear-tab="${o}">
                Clear Filters
            </div>
        `),`<div class="filter-chips-container">${n}</div>`}function j(o){return(Number(o)||0).toLocaleString("en-US",{minimumFractionDigits:2,minimumFractionDigits:2})+" $"}function K(o,e){if(!confirm("Are you sure you want to delete this project?"))return;const c=g.getMonthData(e),t=c.projects.filter(function(a){return a.id!==o});c.projects=t;const s=g.getRawData();s[e]=c,g.saveData(s),console.log(`❌ Проект с ID ${o} успешно удален`),_("projects",e)}function ee(o,e){const n=o.projects||[],c=o.assignments||[],t=o.employees||[],s=n.length,a=Q(n,c,t,e);return` 
        <div class="fin-summary">
            <div class="fin-card">
                <span class="fin-card__title">Active Projects</span>
                <span class="fin-card__value">${s}</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Revenue</span>
                <span class="fin-card__value">${j(a.totalBudget)}</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Expenses</span>
                
                <span class="fin-card__value">${j(a.totalExpenses)}</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Profit</span>
                <span class="fin-card__value">${j(a.totalProfit)}</span>
            </div>
        </div>
    `}function te(o,e,n){let c=o.projects||[];const t=o.assignments||[],s=o.employees||[];if(b.projects.companyName&&b.projects.companyName.trim()!==""){const r=b.projects.companyName.toLowerCase().trim();c=c.filter(l=>l.companyName?l.companyName.toLowerCase().includes(r):!1)}if(b.projects.projectName&&b.projects.projectName.trim()!==""){const r=b.projects.projectName.toLowerCase().trim();c=c.filter(l=>l.projectName?l.projectName.toLowerCase().includes(r):!1)}n.tab==="projects"&&n.field&&(c=[...c].sort(function(r,l){let d,p;if(n.field==="expenses"||n.field==="profit"||n.field==="effectiveCapacity"){const m=S(r,t,s,e),f=S(l,t,s,e);d=m[n.field],p=f[n.field]}else d=r[n.field],p=l[n.field];return typeof d=="string"?n.direction==="asc"?d.localeCompare(p):p.localeCompare(d):n.direction==="asc"?d-p:p-d}));function a(r){return n.tab==="projects"&&n.field===r?n.direction==="asc"?" ↑":" ↓":""}let i=H("projects");return c.length===0?(i+='<p class="empty-state">No matching projects found</p>',i):(i+=` 
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
    `,c.forEach(function(r){const l=S(r,t,s,e),d=l.profit<0?"text-danger":"text-success";i+=`
            <tr>
                <td>${r.companyName}</td>
                <td>${r.projectName}</td>
                <td>${j(r.budget)}</td>
                <td class="clickable-capacity" data-id="${r.id}">
                    <span class="capacity-link">${l.effectiveCapacity} / ${r.capacity} p.</span>
                </td>
                <td>${j(l.expenses)}</td>
                <td class="${d}"><strong>${j(l.profit)}</strong></td>
                <td>
                    <button class="btn-assign" data-id="${r.id}">Assign</button>
                    <button class="btn-delete" data-id="${r.id}">Delete</button>
                </td>
            </tr>
        `}),i+="</tbody></table>",i)}function V(o,e){const n=document.getElementById("details-modal"),c=document.getElementById("details-modal-body"),t=document.getElementById("details-modal-title");if(!n||!c)return;typeof g.loadFromLocalStorage=="function"&&g.loadFromLocalStorage();const s=g.getMonthData(e),a=s.projects||[],i=s.employees||[],r=s.assignments||[],l=a.find(p=>p.id===o);l&&(t.textContent=`Team for "${l.projectName}"`);const d=r.filter(p=>String(p.projectId)===String(o));if(d.length===0)c.innerHTML='<p class="empty-state">No employees assigned to this project yet.</p>';else{let p='<ul class="team-list">';d.forEach(function(m){const f=i.find(y=>String(y.id)===String(m.employeeId));f&&(p+=`
                    <li class="team-item">
                        <div class="team-item__info">
                            <a href="#" class="team-item__name employee-link" 
                                data-id="${f.id}" 
                                data-name="${f.name}" 
                                data-surname="${f.surname||""}">
                                ${f.name}
                            </a>
                            <span class="team-item__position">${f.position}</span>
                        </div>
                        <div class="team-item__actions">
                            <span class="team-item__capacity">${m.capacity}% load</span>
                            <button class="btn-remove-asm" 
                                    data-project-id="${o}" 
                                    data-employee-id="${f.id}" 
                                    title="Remove from project">×</button>
                        </div>
                    </li>
                `)}),p+="</ul>",c.innerHTML=p}n.onclick=function(p){if(p.target.classList.contains("employee-link")){p.preventDefault(),console.log("Вы кликнули на сотрудника, создаем меню...");const f=n.querySelector(".action-menu");f&&f.remove();const y=p.target.getAttribute("data-id"),u=p.target.getAttribute("data-name"),h=document.createElement("div");h.className="action-menu",h.style.position="fixed",h.style.top=`${p.clientY}px`,h.style.left=`${p.clientX}px`,h.style.zIndex="2000",h.style.background="#fff",h.style.border="1px solid #ccc",h.style.padding="5px",h.style.boxShadow="0px 2px 5px rgba(0,0,0,0.2)",h.innerHTML=`
                <button class="menu-btn-see" data-name="${u}" style="display:block; width:100%; text-align:left; margin-bottom:4px;">See at Employees</button>
                <button class="menu-btn-unassign" data-emp-id="${y}" style="display:block; width:100%; text-align:left;">Unassign</button>
            `,n.appendChild(h);return}if(p.target.classList.contains("menu-btn-see")){console.log("Нажата кнопка перевода на вкладку сотрудников");const f=p.target.getAttribute("data-name");b&&b.employees&&(b.employees.name=f);const y=document.getElementById("details-modal");y&&y.classList.remove("modal--open");const u=n.querySelector(".action-menu");u&&u.remove(),_("employees",e);return}if(p.target.classList.contains("menu-btn-unassign")){console.log("Нажата кнопка Unassign");const f=p.target.getAttribute("data-emp-id"),y=n.querySelector(".action-menu");y&&y.remove();const u=n.querySelector(`.btn-remove-asm[data-employee-id="${f}"]`);u?u.click():console.log("Не удалось найти кнопку удаления с data-employee-id="+f);return}const m=n.querySelector(".action-menu");if(m&&!p.target.closest(".action-menu")&&m.remove(),p.target.classList.contains("btn-remove-asm")){const f=p.target.getAttribute("data-project-id"),y=p.target.getAttribute("data-employee-id");if(!confirm("Are you sure you want to remove this employee from the project?"))return;const u=g.getRawData(),h=u[e]||{},v=h.assignments||[];h.assignments=v.filter(function(D){return!(String(D.projectId)===String(f)&&String(D.employeeId)===String(y))}),g.saveData(u),V(f,e),_("projects",e);return}(p.target.id==="details-modal-overlay"||p.target.id==="details-modal-close")&&n.classList.remove("modal--open")},n.classList.add("modal--open")}function ae(o,e){const n=document.getElementById("assign-modal"),c=document.getElementById("assign-project-id"),t=document.getElementById("assign-emp-select");if(!n||!t)return;c&&(c.value=o);const s=g.getMonthData(e),a=s&&s.employees?s.employees:[];if(a.length===0)t.innerHTML='<option value="">-- No employees available --</option>';else{let l='<option value="">-- Select an employee --</option>';a.forEach(function(d){const p=d.name||"Unknown Name",m=d.position||"No Position";l+=`<option value="${d.id}">${p} (${m})</option>`}),t.innerHTML=l}const i=document.getElementById("assign-capacity-range"),r=document.getElementById("assign-range-value");i&&(i.value=50),r&&(r.textContent="50"),n.classList.add("modal--open")}function ne(o,e,n){if(!confirm("Are you sure you want to remove this employee?"))return;const t=g.getMonthData(e);t.employees=t.employees.filter(function(a){return a.id!==o});const s=g.getRawData();s[e]=t,g.saveData(s),console.log(`❌ Сотрудник с ID ${o} удален`),n()}function P(o,e,n,c,t){const s=g.getMonthData(c),a=s.employees.find(i=>i.id===o);if(a){if(e==="salary"){const r=Number(n);if(isNaN(r)||r<=0){alert("Please enter the correct salary amount"),t();return}a[e]=r}else{if(n.trim()===""){alert("The field cannot be empty"),t();return}a[e]=n.trim()}const i=g.getRawData();i[c]=s,g.saveData(i),console.log(`📝 Сотрудник ${o}: поле ${e} обновлено на ${n}`),t()}}function oe(o,e,n,c){if(o.length===0)return'<p class="empty-state">No employees added yet</p>';let t=o||[];if(b.employees.name&&b.employees.name.trim()!==""){const i=b.employees.name.toLowerCase().trim();t=t.filter(r=>r.name?(r.name.split(" ")[0]||"").toLowerCase().includes(i):!1)}if(b.employees.surname&&b.employees.surname.trim()!==""){const i=b.employees.surname.toLowerCase().trim();t=t.filter(r=>r.name?(r.name.split(" ").slice(1).join(" ")||"").toLowerCase().includes(i):!1)}if(b.employees.position&&b.employees.position.trim()!==""){const i=b.employees.position.toLowerCase().trim();t=t.filter(r=>r.position?r.position.toLowerCase().includes(i):!1)}n.tab==="employees"&&n.field&&(t=[...t].sort(function(i,r){let l,d;return n.field==="vacationFactor"?(l=B(i,e),d=B(r,e)):n.field==="effectiveCapacity"?(l=A(i,e),d=A(r,e)):(l=i[n.field],d=r[n.field]),typeof l=="string"?n.direction==="asc"?l.localeCompare(d):d.localeCompare(l):n.direction==="asc"?l-d:d-l}));function s(i){return n.tab==="employees"&&n.field===i?n.direction==="asc"?" ↑":" ↓":""}let a=H("employees");return t.length===0?(a+='<p class="empty-state">No employees found matching filters</p>',a):(a+=`
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
    `,t.forEach(function(i){const r=B(i,e),l=A(i,e),d=i.name?i.name.split(" "):["Unknown",""],p=d[0],m=d.slice(1).join(" ")||"—";a+=`
            <tr>
                <td>${p}</td>
                <td>${m}</td>
                <td class="editable" data-id="${i.id}" data-field="position">${i.position}</td>
                <td>${i.age} y.o.</td>
                <td class="editable" data-id="${i.id}" data-field="salary">${j(i.salary)}</td>
                <td><span class="badge badge--factor">${r}</span></td>
                <td><span class="badge badge--capacity">${l}%</span></td>
                <td>
                    <button class="btn-delete btn-delete--emp" data-id="${i.id}">Delete</button>
                    <button class="btn-availability" data-id="${i.id}">Availability</button>
                </td>
            </tr>
        `}),a+="</tbody></table>",setTimeout(()=>{const i=document.querySelector(".table");i&&!i.dataset.dblclickAssigned&&(i.dataset.dblclickAssigned="true",i.ondblclick=function(r){const l=r.target;if(l.classList.contains("editable")&&!l.querySelector("input")&&!l.querySelector("select")){let m=l.textContent.trim();y==="salary"&&(m=m.replace(/[^0-9.]/g,""));const f=l.getAttribute("data-id"),y=l.getAttribute("data-field");if(y==="position"){let v=function(){P(f,y,u.value,e,c)};var d=v;const u=document.createElement("select");u.className="table-inline-select",["Junior","Middle","Senior","Lead","Architect","BO"].forEach(D=>{const C=document.createElement("option");C.value=D,C.textContent=D,D.toLowerCase()===m.toLowerCase()&&(C.selected=!0),u.appendChild(C)}),l.innerHTML="",l.appendChild(u),u.focus(),u.onchange=v,u.onblur=v}else if(y==="salary"){let h=function(){P(f,y,u.value,e,c)};var p=h;const u=document.createElement("input");u.type="number",u.min="0",u.value=m,u.className="table-inline-input",l.innerHTML="",l.appendChild(u),u.focus(),u.onkeydown=v=>{v.key==="Enter"&&u.blur(),v.key==="Escape"&&(l.innerHTML=j(m))},u.onblur=h}}})},0),a)}const E={tab:null,field:null,direction:"asc"};function _(o,e){const n=document.getElementById("table-container");if(!n)return;const c=g.getMonthData(e);if(o==="projects"){const t=ee(c,e),s=te(c,e,E);n.innerHTML=t+s,n.onclick=function(a){if(a.target.classList.contains("sortable")){const l=a.target.getAttribute("data-sort");E.tab==="projects"&&E.field===l?E.direction=E.direction==="asc"?"desc":"asc":(E.tab="projects",E.field=l,E.direction="asc"),_("projects",e);return}if(a.target.classList.contains("filter-icon")){a.stopPropagation();const l=document.querySelector(".filter-popup");l&&l.remove();const d=a.target.getAttribute("data-filter-field"),p=a.target.closest("th"),m=document.createElement("div");m.className="filter-popup",m.innerHTML=`
                    <input type="text" id="filter-popup-input" class="filter-popup__input" placeholder="Search..." value="${b.projects[d]}">
                    <div class="filter-popup__actions">
                        <button class="filter-popup__btn" id="filter-btn-cancel">Cancel</button>
                        <button class="filter-popup__btn filter-popup__btn--apply" id="filter-btn-apply" data-field="${d}">Apply</button>
                    </div>
                `,p.appendChild(m);const f=m.querySelector("#filter-popup-input");f.focus(),f.onkeydown=function(y){y.key==="Enter"&&m.querySelector("#filter-btn-apply").click()};return}if(a.target.id==="filter-btn-apply"){const l=a.target.getAttribute("data-field"),d=document.getElementById("filter-popup-input").value;b.projects[l]=d,_("projects",e);return}if(a.target.id==="filter-btn-cancel"){const l=a.target.closest(".filter-popup");l&&l.remove();return}if(a.target.classList.contains("filter-chip__remove")){const l=a.target.getAttribute("data-filter-key");b.projects[l]="",_("projects",e);return}if(a.target.classList.contains("filter-chip--clear-all")){b.projects.companyName="",b.projects.projectName="",_("projects",e);return}const i=document.querySelector(".filter-popup");if(i&&!a.target.closest(".filter-popup")&&i.remove(),a.target.classList.contains("btn-delete")){const l=a.target.getAttribute("data-id");K(l,e)}if(a.target.classList.contains("btn-assign")){const l=a.target.getAttribute("data-id");ae(l,e)}const r=a.target.closest(".clickable-capacity");if(r){const l=r.getAttribute("data-id");V(l,e)}}}else o==="employees"&&(n.innerHTML=oe(c.employees,e,E,()=>_("employees",e)),n.onclick=function(t){if(t.target.classList.contains("sortable")){const a=t.target.getAttribute("data-sort");E.tab==="employees"&&E.field===a?E.direction=E.direction==="asc"?"desc":"asc":(E.tab="employees",E.field=a,E.direction="asc"),_("employees",e);return}if(t.target.classList.contains("filter-icon")){t.stopPropagation();const a=document.querySelector(".filter-popup");a&&a.remove();const i=t.target.getAttribute("data-filter-field"),r=t.target.closest("th"),l=document.createElement("div");l.className="filter-popup",l.innerHTML=`
                    <input type="text" id="filter-popup-input" class="filter-popup__input" placeholder="Search..." value="${b.employees[i]||""}">
                    <div class="filter-popup__actions">
                        <button class="filter-popup__btn" id="filter-btn-cancel">Cancel</button>
                        <button class="filter-popup__btn filter-popup__btn--apply" id="filter-btn-apply" data-field="${i}">Apply</button>
                    </div>
                `,r.appendChild(l);const d=l.querySelector("#filter-popup-input");d.focus(),d.onkeydown=function(p){p.key==="Enter"&&l.querySelector("#filter-btn-apply").click()};return}if(t.target.id==="filter-btn-apply"){const a=t.target.getAttribute("data-field"),i=document.getElementById("filter-popup-input").value;b.employees[a]=i,_("employees",e);return}if(t.target.id==="filter-btn-cancel"){const a=t.target.closest(".filter-popup");a&&a.remove();return}if(t.target.classList.contains("filter-chip__remove")){const a=t.target.getAttribute("data-filter-key");b.employees[a]="",_("employees",e);return}if(t.target.classList.contains("filter-chip--clear-all")){b.employees.name="",b.employees.surname="",b.employees.position="",_("employees",e);return}const s=document.querySelector(".filter-popup");if(s&&!t.target.closest(".filter-popup")&&s.remove(),t.target.classList.contains("btn-availability")){const a=t.target.getAttribute("data-id");U(a,e)}if(t.target.classList.contains("btn-delete--emp")){const a=t.target.getAttribute("data-id");ne(a,e,()=>_("employees",e))}})}function x(){const o=document.getElementById("month-select"),e=document.getElementById("year-select");return!o||!e?"2026-01":e.value+"-"+o.value}function se(o){const e=document.querySelectorAll(".nav-button"),n=document.getElementById("page-title"),c=document.getElementById("add-entity-btn");e.forEach(function(i){i.classList.remove("nav-button--active")});const t=o.currentTarget;t.classList.add("nav-button--active");const s=t.getAttribute("data-tab");s==="projects"?(n.textContent="Projects",c&&(c.textContent="+ Add projects")):s==="employees"&&(n.textContent="Employees",c&&(c.textContent="+ Add employee")),console.log("Переключено на вкладку:",s);const a=x();_(s,a)}function T(){const o=document.querySelector(".nav-button--active"),e=o?o.getAttribute("data-tab"):"projects",n=x();_(e,n),console.log("Период изменен на:",n)}function le(){const o=document.getElementById("project-panel");o&&o.classList.add("slide-panel--open")}function q(){const o=document.getElementById("project-panel");o&&o.classList.remove("slide-panel--open")}function ie(){const o=document.getElementById("employee-panel");o&&o.classList.add("slide-panel--open")}function F(){const o=document.getElementById("employee-panel");o&&o.classList.remove("slide-panel--open")}function ce(){const o=document.getElementById("sidebar"),e=document.getElementById("sidebar-toggle"),n=document.querySelectorAll(".nav-button"),c=document.getElementById("month-select"),t=document.getElementById("year-select"),s=document.getElementById("add-entity-btn"),a=document.getElementById("project-panel-close"),i=document.getElementById("project-panel-overlay"),r=document.getElementById("employee-panel-close"),l=document.getElementById("employee-panel-overlay");if(!c||!t)return;const d=localStorage.getItem("app-selected-month"),p=localStorage.getItem("app-selected-year");d&&(c.value=d),p&&(t.value=p),c.addEventListener("change",function(){localStorage.setItem("app-selected-month",c.value),T()}),t.addEventListener("change",function(){localStorage.setItem("app-selected-year",t.value),T()}),o&&e&&e.addEventListener("click",function(){o.classList.toggle("sidebar--collapsed")}),n.forEach(function(y){y.addEventListener("click",se)}),s&&s.addEventListener("click",function(){const y=document.querySelector(".nav-button--active"),u=y?y.getAttribute("data-tab"):"projects";u==="projects"?le():u==="employees"&&ie()}),a&&a.addEventListener("click",q),i&&i.addEventListener("click",q),r&&r.addEventListener("click",F),l&&l.addEventListener("click",F);const m=document.querySelector(".nav-button--active"),f=m?m.getAttribute("data-tab"):"projects";_(f,x())}function L(){const o=document.getElementById("proj-name"),e=document.getElementById("proj-company"),n=document.getElementById("proj-budget"),c=document.getElementById("proj-capacity"),t=document.getElementById("proj-submit"),s=o.value.trim().length>0,a=e.value.trim().length>0,i=Number(n.value)>0,r=Number(c.value)>0;s&&a&&i&&r?t.disabled=!1:t.disabled=!0}function re(o){o.preventDefault();const e=document.getElementById("proj-name"),n=document.getElementById("proj-company"),c=document.getElementById("proj-budget"),t=document.getElementById("proj-capacity"),s=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+s.value,l={id:"proj_"+Date.now(),projectName:e.value.trim(),companyName:n.value.trim(),budget:Number(c.value),capacity:Number(t.value)},d=g.getMonthData(i);d.projects.push(l);const p=g.getRawData();p[i]=d,g.saveData(p),console.log("✅ Новый проект успешно сохранен в Store:",l),_("projects",i),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const m=document.getElementById("project-panel");m&&m.classList.remove("slide-panel--open")}function de(){const o=document.getElementById("project-form");if(o){const e=document.getElementById("proj-name"),n=document.getElementById("proj-company"),c=document.getElementById("proj-budget"),t=document.getElementById("proj-capacity");e.addEventListener("input",L),n.addEventListener("input",L),c.addEventListener("input",L),t.addEventListener("input",L),o.addEventListener("submit",re)}}function $(){const o=document.getElementById("emp-name"),e=document.getElementById("emp-position"),n=document.getElementById("emp-age"),c=document.getElementById("emp-salary"),t=document.getElementById("emp-submit"),s=document.getElementById("error-emp-age"),a=o.value.trim().length>0,i=e.value.trim().length>0,r=Number(c.value)>0,l=Number(n.value);let d=!1;n.value.trim()===""?s.textContent="":l<18?s.textContent="The employee must be over 18 years of age":(s.textContent="",d=!0),a&&i&&d&&r?t.disabled=!1:t.disabled=!0}function pe(o){o.preventDefault();const e=document.getElementById("emp-name"),n=document.getElementById("emp-position"),c=document.getElementById("emp-age"),t=document.getElementById("emp-salary"),s=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+s.value,r={id:"emp_"+Date.now(),name:e.value.trim(),position:n.value.trim(),age:Number(c.value),salary:Number(t.value)},l=g.getMonthData(i);l.employees.push(r);const d=g.getRawData();d[i]=l,g.saveData(d),console.log("✅ Новый сотрудник добавлен:",r),_("employees",i),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const p=document.getElementById("employee-panel");p&&p.classList.remove("slide-panel--open")}function me(){const o=document.getElementById("employee-form");if(o){const e=document.getElementById("emp-name"),n=document.getElementById("emp-position"),c=document.getElementById("emp-age"),t=document.getElementById("emp-salary");e.addEventListener("input",$),n.addEventListener("input",$),c.addEventListener("input",$),t.addEventListener("input",$),o.addEventListener("submit",pe)}}function ue(o,e,n=null){const a=100-(g.getMonthData(e).assignments||[]).filter(function(i){const r=String(i.employeeId)===String(o),l=n?String(i.projectId)!==String(n):!0;return r&&l}).reduce(function(i,r){return i+(r.capacity||0)},0);return a<0?0:a}function O(){const o=document.getElementById("assign-modal");o&&o.classList.remove("modal--open")}function fe(){const o=document.getElementById("assign-modal"),e=document.getElementById("assign-capacity-range"),n=document.getElementById("assign-range-value"),c=document.getElementById("assign-form");if(!o)return;o.onclick=function(s){(s.target.id==="assign-modal-overlay"||s.target.id==="assign-modal-close")&&(console.log("🔒 Закрываем модальное окно..."),O())},e&&n&&(e.oninput=function(){n.textContent=e.value}),c&&(c.onsubmit=function(s){s.preventDefault();const a=document.getElementById("assign-project-id").value,i=document.getElementById("assign-emp-select").value,r=Number(e.value),l=document.getElementById("month-select"),p=document.getElementById("year-select").value+"-"+l.value;console.log("✏️ СОХРАНЯЕМ НАЗНАЧЕНИЕ. Ключ периода:",p);const m=document.getElementById("assign-emp-select");if(i)m.classList.remove("is-invalid");else{m.classList.add("is-invalid"),console.warn("⚠️ Ошибка валидации: Сотрудник не выбран");return}const f=ue(i,p,a);if(r>f){console.warn(`⚠️ Превышен лимит загрузки! Доступно: ${f}%, запрошено: ${r}%`),e.classList.add("is-invalid");let v=document.getElementById("assign-error-msg");v||(v=document.createElement("div"),v.id="assign-error-msg",v.style.color="#dc3545",v.style.marginTop="10px",v.style.fontWeight="bold",c.appendChild(v)),v.textContent=`Error: Employee exceeds 100% load. Max available: ${f}%`;return}else{e.classList.remove("is-invalid");const v=document.getElementById("assign-error-msg");v&&v.remove()}const y=g.getMonthData(p);y.assignments||(y.assignments=[]);const u=y.assignments.find(function(v){return String(v.projectId)===String(a)&&String(v.employeeId)===String(i)});if(u)console.log("🔄 Сотрудник уже на проекте. Обновляем capacity с",u.capacity,"на",r),u.capacity=r;else{const v={projectId:a,employeeId:i,capacity:r};y.assignments.push(v),console.log("🔗 Новое назначение добавлено в Стор:",v)}const h=g.getRawData();h[p]=y,g.saveData(h),O(),_("projects",p)});const t=document.getElementById("details-modal");t&&(t.onclick=function(s){(s.target.id==="details-modal-overlay"||s.target.id==="details-modal-close")&&t.classList.remove("modal--open")})}const w={"dashboard-app":`
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
`};class ge{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const e=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${e.length}`),e.forEach(n=>{const c=n.getAttribute("data-component");this.loadComponent(n,c)})}loadComponent(e,n){console.log(`📥 Загружаю компонент: ${n}`),w[n]?(e.innerHTML=w[n],e.setAttribute("data-loaded","true"),this.loadedComponents.add(n),console.log(`✅ ${n} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${n}" не найден в components.js`),e.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${n}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(n=>{let c=!1;n.forEach(t=>{t.addedNodes.length&&t.addedNodes.forEach(s=>{s.nodeType===1&&s.querySelectorAll&&s.querySelectorAll("[data-component]").length>0&&(c=!0)})}),c&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new ge().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const ye=g.getRawData();Object.keys(ye).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),g.saveData(R)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(w));console.log("📅 Данные за май 2026:",g.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),ce(),de(),me(),fe()},0)});
