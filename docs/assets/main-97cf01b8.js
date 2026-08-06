(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();const M="monthData",g={getRawData(){const e=localStorage.getItem(M);return e?JSON.parse(e):{}},saveData(e){const t=JSON.stringify(e);localStorage.setItem(M,t)},getMonthData(e){const t=this.getRawData();return t[e]?t[e]:{employees:[],projects:[]}}},V={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};let D=new Set,N=null,k="";function U(e,t){N=e,k=t;const o=document.getElementById("vacation-modal"),i=document.getElementById("vacation-modal-title"),n=document.getElementById("calendar-grid-container");if(!o||!n){console.error("❌ Элементы календаря не найдены в DOM");return}const s=t.split("-"),a=parseInt(s[0],10),c=parseInt(s[1],10),l=g.getMonthData(t).employees.find(d=>String(d.id)===String(e));if(l){i.textContent=`Availability for ${l.name}`;const d=l.vacations||[];D=new Set(d.map(Number))}else D=new Set;J(a,c,n),z(o,a,c,n),o.classList.add("modal--open"),console.log(`📅 Календарь открыт для сотрудника ${e} на период ${t}`)}function J(e,t,o){o.innerHTML=Y(e,t),W(e,t)}function Y(e,t){const o=new Date(e,t+1,0).getDate();let i=new Date(e,t,1).getDay()-1;i<0&&(i=6);const n=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];let s='<div class="calendar-grid">';n.forEach(a=>{s+=`<div class="calendar-header-cell ${a==="Sat"||a==="Sun"?"calendar-header-cell--weekend":""}">${a}</div>`});for(let a=0;a<i;a++)s+='<div class="calendar-day-cell calendar-day-cell--empty"></div>';for(let a=1;a<=o;a++){const r=new Date(e,t,a).getDay(),l=r===0||r===6;let d="calendar-day-cell calendar-day-target";l&&(d+=" calendar-day-cell--weekend"),D.has(a)&&(d+=" calendar-day-cell--selected"),s+=`<div class="${d}" data-day="${a}">${a}</div>`}return s+="</div>",s}function W(e,t){const o=new Date(e,t+1,0).getDate();let i=0,n=0;for(let l=1;l<=o;l++){const d=new Date(e,t,l).getDay();d===0||d===6||(i++,D.has(l)&&n++)}const s=i-n,a=document.getElementById("calendar-working-days");a&&(a.textContent=`Working Days: ${s}/${i} days`);const c=G(e,t),r=document.getElementById("calendar-vacation-ranges");r&&(r.textContent=c||"None")}function G(e,t){const o=Array.from(D).sort((c,r)=>c-r);if(o.length===0)return"";const i=[];let n=o[0],s=o[0];const a=c=>{const r=String(c).padStart(2,"0"),l=String(t+1).padStart(2,"0");return`${r}.${l}`};for(let c=1;c<o.length;c++){const r=o[c];let l=!1;if(r===s+1)l=!0;else{let d=!1;for(let m=s+1;m<r;m++){const u=new Date(e,t,m).getDay();if(u!==0&&u!==6){d=!0;break}}d||(l=!0)}l||(n===s?i.push(a(n)):i.push(`${a(n)}-${a(s)}`),n=r),s=r}return n===s?i.push(a(n)):i.push(`${a(n)}-${a(s)}`),i.join(", ")}function z(e,t,o,i){i.onclick=function(s){const a=s.target;if(!a.classList.contains("calendar-day-target"))return;const c=parseInt(a.getAttribute("data-day"),10);D.has(c)?(D.delete(c),a.classList.remove("calendar-day-cell--selected")):(D.add(c),a.classList.add("calendar-day-cell--selected")),W(t,o)},e.onclick=function(s){(s.target.id==="vacation-modal-overlay"||s.target.id==="vacation-modal-close")&&(e.classList.remove("modal--open"),console.log("🔒 Календарь закрыт"))};const n=document.getElementById("btn-save-vacation");n&&(n.onclick=function(){const s=g.getRawData(),r=((s[k]||{}).employees||[]).find(l=>String(l.id)===String(N));r&&(r.vacations=Array.from(D).sort((l,d)=>l-d),g.saveData(s),console.log(`💾 Отпуска сохранены для сотрудника ${N}:`,r.vacations),_("employees",k),e.classList.remove("modal--open"))})}function X(e,t){const o=new Date(e,t+1,0).getDate();let i=0;for(let n=1;n<=o;n++){const s=new Date(e,t,n).getDay();s===0||s===6||i++}return i}function Z(e,t,o){if(!e||!Array.isArray(e)||e.length===0)return 0;let i=0;return e.forEach(n=>{const s=new Date(t,o,n).getDay();s===0||s===6||i++}),i}function L(e,t){const o=t.split("-"),i=parseInt(o[0],10),n=parseInt(o[1],10),s=X(i,n),a=e.vacations||[],c=Z(a,i,n);if(s===0)return 0;const r=c/s;return Math.round(r*100)/100}function A(e,t){const i=100*(1-L(e,t));return Math.round(i)}function w(e,t,o,i){const n=t.filter(function(l){return String(l.projectId)===String(e.id)});let s=0,a=0;n.forEach(function(l){const d=o.find(function(m){return String(m.id)===String(l.employeeId)});if(d){s+=l.capacity;const m=L(d,i),u=d.salary*(l.capacity/100)*(1-m);a+=u}});const c=e.budget,r=c-a;return{effectiveCapacity:Math.round(s),expenses:Math.round(a),revenue:Math.round(c),profit:Math.round(r)}}function Q(e,t,o,i){let n=0,s=0,a=0,c=0;return e.forEach(function(r){const l=w(r,t,o,i);n+=l.revenue,s+=l.effectiveCapacity,a+=l.expenses,c+=l.profit}),{totalBudget:n,totalCapacity:s,totalExpenses:a,totalProfit:c}}let y={projects:{companyName:"",projectName:""},employees:{name:"",surname:"",position:""},employeePosition:""};function H(e){const t=y[e];let o="",i=0;for(const n in t)if(t[n]&&t[n].trim()!==""){i++;const s=n.replace(/([A-Z])/g," $1").replace(/^./,a=>a.toUpperCase());o+=`
                <div class="filter-chip">
                    <span>${s}: <strong>${t[n]}</strong></span>
                    <button class="filter-chip__remove" data-filter-tab="${e}" data-filter-key="${n}">×</button>
                </div>
            `}return i>=2&&(o+=`
            <div class="filter-chip filter-chip--clear-all" data-filter-clear-tab="${e}">
                Clear Filters
            </div>
        `),`<div class="filter-chips-container">${o}</div>`}function B(e){return(Number(e)||0).toLocaleString("en-US",{minimumFractionDigits:2,minimumFractionDigits:2})+" $"}function K(e,t){if(!confirm("Are you sure you want to delete this project?"))return;const i=g.getMonthData(t),n=i.projects.filter(function(a){return a.id!==e});i.projects=n;const s=g.getRawData();s[t]=i,g.saveData(s),console.log(`❌ Проект с ID ${e} успешно удален`),_("projects",t)}function ee(e,t){const o=e.projects||[],i=e.assignments||[],n=e.employees||[],s=o.length,a=Q(o,i,n,t);return` 
        <div class="fin-summary">
            <div class="fin-card">
                <span class="fin-card__title">Active Projects</span>
                <span class="fin-card__value">${s}</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Revenue</span>
                <span class="fin-card__value">${B(a.totalBudget)}</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Expenses</span>
                
                <span class="fin-card__value">${B(a.totalExpenses)}</span>
            </div>
            <div class="fin-card">
                <span class="fin-card__title">Total Profit</span>
                <span class="fin-card__value">${B(a.totalProfit)}</span>
            </div>
        </div>
    `}function te(e,t,o){let i=e.projects||[];const n=e.assignments||[],s=e.employees||[];if(y.projects.companyName&&y.projects.companyName.trim()!==""){const r=y.projects.companyName.toLowerCase().trim();i=i.filter(l=>l.companyName?l.companyName.toLowerCase().includes(r):!1)}if(y.projects.projectName&&y.projects.projectName.trim()!==""){const r=y.projects.projectName.toLowerCase().trim();i=i.filter(l=>l.projectName?l.projectName.toLowerCase().includes(r):!1)}o.tab==="projects"&&o.field&&(i=[...i].sort(function(r,l){let d,m;if(o.field==="expenses"||o.field==="profit"||o.field==="effectiveCapacity"){const u=w(r,n,s,t),p=w(l,n,s,t);d=u[o.field],m=p[o.field]}else d=r[o.field],m=l[o.field];return typeof d=="string"?o.direction==="asc"?d.localeCompare(m):m.localeCompare(d):o.direction==="asc"?d-m:m-d}));function a(r){return o.tab==="projects"&&o.field===r?o.direction==="asc"?" ↑":" ↓":""}let c=H("projects");return i.length===0?(c+='<p class="empty-state">No matching projects found</p>',c):(c+=` 
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
    `,i.forEach(function(r){const l=w(r,n,s,t),d=l.profit<0?"text-danger":"text-success";c+=`
            <tr>
                <td>${r.companyName}</td>
                <td>${r.projectName}</td>
                <td>${B(r.budget)}</td>
                <td class="clickable-capacity" data-id="${r.id}">
                    <span class="capacity-link">${l.effectiveCapacity} / ${r.capacity} p.</span>
                </td>
                <td>${B(l.expenses)}</td>
                <td class="${d}"><strong>${B(l.profit)}</strong></td>
                <td>
                    <button class="btn-assign" data-id="${r.id}">Assign</button>
                    <button class="btn-delete" data-id="${r.id}">Delete</button>
                </td>
            </tr>
        `}),c+="</tbody></table>",c)}function R(e,t){const o=document.getElementById("details-modal"),i=document.getElementById("details-modal-body"),n=document.getElementById("details-modal-title");if(!o||!i)return;typeof g.loadFromLocalStorage=="function"&&g.loadFromLocalStorage();const s=g.getMonthData(t),a=s.projects||[],c=s.employees||[],r=s.assignments||[],l=a.find(m=>m.id===e);l&&(n.textContent=`Team for "${l.projectName}"`);const d=r.filter(m=>String(m.projectId)===String(e));if(d.length===0)i.innerHTML='<p class="empty-state">No employees assigned to this project yet.</p>';else{let m='<ul class="team-list">';d.forEach(function(u){const p=c.find(b=>String(b.id)===String(u.employeeId));p&&(m+=`
                    <li class="team-item">
                        <div class="team-item__info">
                            <a href="#" class="team-item__name employee-link" 
                                data-id="${p.id}" 
                                data-name="${p.name}" 
                                data-surname="${p.surname||""}">
                                ${p.name}
                            </a>
                            <span class="team-item__position">${p.position}</span>
                        </div>
                        <div class="team-item__actions">
                            <span class="team-item__capacity">${u.capacity}% load</span>
                            <button class="btn-remove-asm" 
                                    data-project-id="${e}" 
                                    data-employee-id="${p.id}" 
                                    title="Remove from project">×</button>
                        </div>
                    </li>
                `)}),m+="</ul>",i.innerHTML=m}o.onclick=function(m){if(m.target.classList.contains("employee-link")){m.preventDefault(),console.log("Вы кликнули на сотрудника, создаем меню...");const p=o.querySelector(".action-menu");p&&p.remove();const b=m.target.getAttribute("data-id"),f=m.target.getAttribute("data-name"),h=document.createElement("div");h.className="action-menu",h.style.position="fixed",h.style.top=`${m.clientY}px`,h.style.left=`${m.clientX}px`,h.style.zIndex="2000",h.style.background="#fff",h.style.border="1px solid #ccc",h.style.padding="5px",h.style.boxShadow="0px 2px 5px rgba(0,0,0,0.2)",h.innerHTML=`
                <button class="menu-btn-see" data-name="${f}" style="display:block; width:100%; text-align:left; margin-bottom:4px;">See at Employees</button>
                <button class="menu-btn-unassign" data-emp-id="${b}" style="display:block; width:100%; text-align:left;">Unassign</button>
            `,o.appendChild(h);return}if(m.target.classList.contains("menu-btn-see")){console.log("Нажата кнопка перевода на вкладку сотрудников");const p=m.target.getAttribute("data-name");y&&y.employees&&(y.employees.name=p);const b=document.getElementById("details-modal");b&&b.classList.remove("modal--open");const f=o.querySelector(".action-menu");f&&f.remove(),_("employees",t);return}if(m.target.classList.contains("menu-btn-unassign")){console.log("Нажата кнопка Unassign");const p=m.target.getAttribute("data-emp-id"),b=o.querySelector(".action-menu");b&&b.remove();const f=o.querySelector(`.btn-remove-asm[data-employee-id="${p}"]`);f?f.click():console.log("Не удалось найти кнопку удаления с data-employee-id="+p);return}const u=o.querySelector(".action-menu");if(u&&!m.target.closest(".action-menu")&&u.remove(),m.target.classList.contains("btn-remove-asm")){const p=m.target.getAttribute("data-project-id"),b=m.target.getAttribute("data-employee-id");if(!confirm("Are you sure you want to remove this employee from the project?"))return;const f=g.getRawData(),h=f[t]||{},v=h.assignments||[];h.assignments=v.filter(function(E){return!(String(E.projectId)===String(p)&&String(E.employeeId)===String(b))}),g.saveData(f),R(p,t),_("projects",t);return}(m.target.id==="details-modal-overlay"||m.target.id==="details-modal-close")&&o.classList.remove("modal--open")},o.classList.add("modal--open")}function ae(e,t){const o=document.getElementById("assign-modal"),i=document.getElementById("assign-project-id"),n=document.getElementById("assign-emp-select");if(!o||!n)return;i&&(i.value=e);const s=g.getMonthData(t),a=s&&s.employees?s.employees:[];if(a.length===0)n.innerHTML='<option value="">-- No employees available --</option>';else{let l='<option value="">-- Select an employee --</option>';a.forEach(function(d){const m=d.name||"Unknown Name",u=d.position||"No Position";l+=`<option value="${d.id}">${m} (${u})</option>`}),n.innerHTML=l}const c=document.getElementById("assign-capacity-range"),r=document.getElementById("assign-range-value");c&&(c.value=50),r&&(r.textContent="50"),o.classList.add("modal--open")}function ne(e,t,o){if(!confirm("Are you sure you want to remove this employee?"))return;const n=g.getMonthData(t);n.employees=n.employees.filter(function(a){return a.id!==e});const s=g.getRawData();s[t]=n,g.saveData(s),console.log(`❌ Сотрудник с ID ${e} удален`),o()}function P(e,t,o,i,n){const s=g.getMonthData(i),a=s.employees.find(c=>c.id===e);if(a){if(t==="salary"){const r=Number(o);if(isNaN(r)||r<=0){alert("Please enter the correct salary amount"),n();return}a[t]=r}else{if(o.trim()===""){alert("The field cannot be empty"),n();return}a[t]=o.trim()}const c=g.getRawData();c[i]=s,g.saveData(c),console.log(`📝 Сотрудник ${e}: поле ${t} обновлено на ${o}`),n()}}function oe(e,t,o,i){if(e.length===0)return'<p class="empty-state">No employees added yet</p>';let n=e||[];if(y.employees.name&&y.employees.name.trim()!==""){const c=y.employees.name.toLowerCase().trim();n=n.filter(r=>r.name?(r.name.split(" ")[0]||"").toLowerCase().includes(c):!1)}if(y.employees.surname&&y.employees.surname.trim()!==""){const c=y.employees.surname.toLowerCase().trim();n=n.filter(r=>r.name?(r.name.split(" ").slice(1).join(" ")||"").toLowerCase().includes(c):!1)}if(y.employees.position&&y.employees.position.trim()!==""){const c=y.employees.position.toLowerCase().trim();n=n.filter(r=>r.position?r.position.toLowerCase().includes(c):!1)}o.tab==="employees"&&o.field&&(n=[...n].sort(function(c,r){let l,d;return o.field==="vacationFactor"?(l=L(c,t),d=L(r,t)):o.field==="effectiveCapacity"?(l=A(c,t),d=A(r,t)):(l=c[o.field],d=r[o.field]),typeof l=="string"?o.direction==="asc"?l.localeCompare(d):d.localeCompare(l):o.direction==="asc"?l-d:d-l}));function s(c){return o.tab==="employees"&&o.field===c?o.direction==="asc"?" ↑":" ↓":""}let a=H("employees");return n.length===0?(a+='<p class="empty-state">No employees found matching filters</p>',a):(a+=`
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
    `,n.forEach(function(c){const r=L(c,t),l=A(c,t),d=c.name?c.name.split(" "):["Unknown",""],m=d[0],u=d.slice(1).join(" ")||"—";a+=`
            <tr>
                <td>${m}</td>
                <td>${u}</td>
                <td class="editable" data-id="${c.id}" data-field="position">${c.position}</td>
                <td>${c.age} y.o.</td>
                <td class="editable" data-id="${c.id}" data-field="salary">${B(c.salary)}</td>
                <td><span class="badge badge--factor">${r}</span></td>
                <td><span class="badge badge--capacity">${l}%</span></td>
                <td>
                    <button class="btn-delete btn-delete--emp" data-id="${c.id}">Delete</button>
                    <button class="btn-availability" data-id="${c.id}">Availability</button>
                </td>
            </tr>
        `}),a+="</tbody></table>",setTimeout(()=>{const c=document.querySelector(".table");c&&!c.dataset.dblclickAssigned&&(c.dataset.dblclickAssigned="true",c.ondblclick=function(r){const l=r.target;if(l.classList.contains("editable")&&!l.querySelector("input")&&!l.querySelector("select")){const u=l.getAttribute("data-id"),p=l.getAttribute("data-field");let b=l.textContent.trim();if(p==="salary"&&(b=b.replace(/[^0-9.]/g,"")),p==="position"){let v=function(){P(u,p,f.value,t,i)};var d=v;const f=document.createElement("select");f.className="table-inline-select",["Junior","Middle","Senior","Lead","Architect","BO"].forEach(E=>{const j=document.createElement("option");j.value=E,j.textContent=E,E.toLowerCase()===b.toLowerCase()&&(j.selected=!0),f.appendChild(j)}),l.innerHTML="",l.appendChild(f),f.focus(),f.onblur=v}else if(p==="salary"){let h=function(){P(u,p,f.value,t,i)};var m=h;const f=document.createElement("input");f.type="number",f.min="0",f.value=b,f.className="table-inline-input",l.innerHTML="",l.appendChild(f),f.focus(),f.onkeydown=v=>{v.key==="Enter"&&f.blur(),v.key==="Escape"&&(l.innerHTML=B(b))},f.onblur=h}}})},0),a)}function se(e,t){if(!e)return;if(t){e.style.display="block",e.style.visibility="hidden";const s=t.getBoundingClientRect(),a=e.getBoundingClientRect(),c=window.innerWidth,r=window.innerHeight;let l=s.bottom+window.scrollY,d=s.left+window.scrollX;s.bottom+a.height>r?(l=s.top+window.scrollY-a.height,e.classList.add("popup--top")):e.classList.remove("popup--top"),s.left+a.width>c?(d=c-a.width-10,e.classList.add("popup--left")):e.classList.remove("popup--left"),e.style.top=`${l}px`,e.style.left=`${d}px`,e.style.visibility="visible";return}const o=e.getBoundingClientRect(),i=window.innerWidth,n=window.innerHeight;if(o.right>i){const s=o.right-i+15;e.style.left=`calc(50% - ${s}px)`}o.bottom>n&&(e.style.top="auto",e.style.bottom="100%")}const I={tab:null,field:null,direction:"asc"};function _(e,t){const o=document.getElementById("table-container");if(!o)return;const i=g.getMonthData(t);if(e==="projects"){const n=ee(i,t),s=te(i,t,I);o.innerHTML=n+s,o.onclick=function(a){if(a.target.classList.contains("sortable")){const l=a.target.getAttribute("data-sort");I.tab==="projects"&&I.field===l?I.direction=I.direction==="asc"?"desc":"asc":(I.tab="projects",I.field=l,I.direction="asc"),_("projects",t);return}if(a.target.classList.contains("filter-icon")){a.stopPropagation();const l=document.querySelector(".filter-popup");l&&l.remove();const d=a.target.getAttribute("data-filter-field"),m=a.target.closest("th"),u=document.createElement("div");u.className="filter-popup",u.innerHTML=`
                    <input type="text" id="filter-popup-input" class="filter-popup__input" placeholder="Search..." value="${y.projects[d]}">
                    <div class="filter-popup__actions">
                        <button class="filter-popup__btn" id="filter-btn-cancel">Cancel</button>
                        <button class="filter-popup__btn filter-popup__btn--apply" id="filter-btn-apply" data-field="${d}">Apply</button>
                    </div>
                `,m.appendChild(u),se(u);const p=u.querySelector("#filter-popup-input");p.focus(),p.onkeydown=function(b){b.key==="Enter"&&u.querySelector("#filter-btn-apply").click()};return}if(a.target.id==="filter-btn-apply"){const l=a.target.getAttribute("data-field"),d=document.getElementById("filter-popup-input").value;y.projects[l]=d,_("projects",t);return}if(a.target.id==="filter-btn-cancel"){const l=a.target.closest(".filter-popup");l&&l.remove();return}if(a.target.classList.contains("filter-chip__remove")){const l=a.target.getAttribute("data-filter-key");y.projects[l]="",_("projects",t);return}if(a.target.classList.contains("filter-chip--clear-all")){y.projects.companyName="",y.projects.projectName="",_("projects",t);return}const c=document.querySelector(".filter-popup");if(c&&!a.target.closest(".filter-popup")&&c.remove(),a.target.classList.contains("btn-delete")){const l=a.target.getAttribute("data-id");K(l,t)}if(a.target.classList.contains("btn-assign")){const l=a.target.getAttribute("data-id");ae(l,t)}const r=a.target.closest(".clickable-capacity");if(r){const l=r.getAttribute("data-id");R(l,t)}}}else e==="employees"&&(o.innerHTML=oe(i.employees,t,I,()=>_("employees",t)),o.onclick=function(n){if(n.target.classList.contains("sortable")){const a=n.target.getAttribute("data-sort");I.tab==="employees"&&I.field===a?I.direction=I.direction==="asc"?"desc":"asc":(I.tab="employees",I.field=a,I.direction="asc"),_("employees",t);return}if(n.target.classList.contains("filter-icon")){n.stopPropagation();const a=document.querySelector(".filter-popup");a&&a.remove();const c=n.target.getAttribute("data-filter-field"),r=n.target.closest("th"),l=document.createElement("div");l.className="filter-popup",l.innerHTML=`
                    <input type="text" id="filter-popup-input" class="filter-popup__input" placeholder="Search..." value="${y.employees[c]||""}">
                    <div class="filter-popup__actions">
                        <button class="filter-popup__btn" id="filter-btn-cancel">Cancel</button>
                        <button class="filter-popup__btn filter-popup__btn--apply" id="filter-btn-apply" data-field="${c}">Apply</button>
                    </div>
                `,r.appendChild(l);const d=l.querySelector("#filter-popup-input");d.focus(),d.onkeydown=function(m){m.key==="Enter"&&l.querySelector("#filter-btn-apply").click()};return}if(n.target.id==="filter-btn-apply"){const a=n.target.getAttribute("data-field"),c=document.getElementById("filter-popup-input").value;y.employees[a]=c,_("employees",t);return}if(n.target.id==="filter-btn-cancel"){const a=n.target.closest(".filter-popup");a&&a.remove();return}if(n.target.classList.contains("filter-chip__remove")){const a=n.target.getAttribute("data-filter-key");y.employees[a]="",_("employees",t);return}if(n.target.classList.contains("filter-chip--clear-all")){y.employees.name="",y.employees.surname="",y.employees.position="",_("employees",t);return}const s=document.querySelector(".filter-popup");if(s&&!n.target.closest(".filter-popup")&&s.remove(),n.target.classList.contains("btn-availability")){const a=n.target.getAttribute("data-id");U(a,t)}if(n.target.classList.contains("btn-delete--emp")){const a=n.target.getAttribute("data-id");ne(a,t,()=>_("employees",t))}})}function le(){try{const e=g.getMonthData(),t=JSON.stringify(e,null,2),o=new Blob([t],{type:"application/json"}),i=URL.createObjectURL(o),s=`dashboard-backup-${new Date().toISOString().slice(0,10)}.json`,a=document.createElement("a");a.href=i,a.download=s,a.click,URL.revokeObjectURL(i),console.log("Database successfully exported to JSON file!")}catch(e){console.error("Export failed:",e),alert("Failed to export data. Please check console for details.")}}function ie(e,t){const o=e.target.files[0];if(!o)return;const i=new FileReader;i.onload=function(n){try{const s=JSON.parse(n.target.result);if(typeof s!="object"||s===null)throw new Error("Data is not a valid JSON Object");g.saveData(s),alert("Database successfully imported!"),console.log("Database imported and saved."),e.target.value="",t()}catch(s){console.error("Import failed:",s),alert("Failed to import data! Ensure the file is a valid JSON dashboard export."),e.target.value=""}},i.readAsText(o)}function ce(){if(confirm("Are you sure you want to delete ALL data? This will clear all employees, projects, and vacations, and reload the application."))try{localStorage.removeItem("monthlyData"),location.reload()}catch(t){console.error("Reset failed:",t),alert("Failed to reset database.")}}function $(){const e=document.getElementById("month-select"),t=document.getElementById("year-select");return!e||!t?"2026-01":t.value+"-"+e.value}function re(e){const t=document.querySelectorAll(".nav-button"),o=document.getElementById("page-title"),i=document.getElementById("add-entity-btn");t.forEach(function(c){c.classList.remove("nav-button--active")});const n=e.currentTarget;n.classList.add("nav-button--active");const s=n.getAttribute("data-tab");s==="projects"?(o.textContent="Projects",i&&(i.textContent="+ Add projects")):s==="employees"&&(o.textContent="Employees",i&&(i.textContent="+ Add employee")),console.log("Переключено на вкладку:",s);const a=$();_(s,a)}function T(){const e=document.querySelector(".nav-button--active"),t=e?e.getAttribute("data-tab"):"projects",o=$();_(t,o),console.log("Период изменен на:",o)}function de(){const e=document.getElementById("project-panel");e&&e.classList.add("slide-panel--open")}function q(){const e=document.getElementById("project-panel");e&&e.classList.remove("slide-panel--open")}function me(){const e=document.getElementById("employee-panel");e&&e.classList.add("slide-panel--open")}function O(){const e=document.getElementById("employee-panel");e&&e.classList.remove("slide-panel--open")}function pe(){const e=document.getElementById("sidebar"),t=document.getElementById("sidebar-toggle"),o=document.querySelectorAll(".nav-button"),i=document.getElementById("month-select"),n=document.getElementById("year-select"),s=document.getElementById("add-entity-btn"),a=document.getElementById("project-panel-close"),c=document.getElementById("project-panel-overlay"),r=document.getElementById("employee-panel-close"),l=document.getElementById("employee-panel-overlay");if(!i||!n)return;const d=localStorage.getItem("app-selected-month"),m=localStorage.getItem("app-selected-year");d&&(i.value=d),m&&(n.value=m),i.addEventListener("change",function(){localStorage.setItem("app-selected-month",i.value),T()}),n.addEventListener("change",function(){localStorage.setItem("app-selected-year",n.value),T()}),e&&t&&t.addEventListener("click",function(){e.classList.toggle("sidebar--collapsed")}),o.forEach(function(E){E.addEventListener("click",re)}),s&&s.addEventListener("click",function(){const E=document.querySelector(".nav-button--active"),j=E?E.getAttribute("data-tab"):"projects";j==="projects"?de():j==="employees"&&me()}),a&&a.addEventListener("click",q),c&&c.addEventListener("click",q),r&&r.addEventListener("click",O),l&&l.addEventListener("click",O);const u=document.getElementById("btn-export-db"),p=document.getElementById("import-db-file"),b=document.getElementById("btn-reset-db"),f=()=>{const E=document.querySelector(".nav-button--active"),j=E?E.getAttribute("data-tab"):"projects";_(j,$())};u&&u.addEventListener("click",le),p&&p.addEventListener("change",E=>ie(E,f)),b&&b.addEventListener("click",ce);const h=document.querySelector(".nav-button--active"),v=h?h.getAttribute("data-tab"):"projects";_(v,$())}function C(){const e=document.getElementById("proj-name"),t=document.getElementById("proj-company"),o=document.getElementById("proj-budget"),i=document.getElementById("proj-capacity"),n=document.getElementById("proj-submit"),s=e.value.trim().length>0,a=t.value.trim().length>0,c=Number(o.value)>0,r=Number(i.value)>0;s&&a&&c&&r?n.disabled=!1:n.disabled=!0}function ue(e){e.preventDefault();const t=document.getElementById("proj-name"),o=document.getElementById("proj-company"),i=document.getElementById("proj-budget"),n=document.getElementById("proj-capacity"),s=document.getElementById("month-select"),c=document.getElementById("year-select").value+"-"+s.value,l={id:"proj_"+Date.now(),projectName:t.value.trim(),companyName:o.value.trim(),budget:Number(i.value),capacity:Number(n.value)},d=g.getMonthData(c);d.projects.push(l);const m=g.getRawData();m[c]=d,g.saveData(m),console.log("✅ Новый проект успешно сохранен в Store:",l),_("projects",c),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const u=document.getElementById("project-panel");u&&u.classList.remove("slide-panel--open")}function fe(){const e=document.getElementById("project-form");if(e){const t=document.getElementById("proj-name"),o=document.getElementById("proj-company"),i=document.getElementById("proj-budget"),n=document.getElementById("proj-capacity");t.addEventListener("input",C),o.addEventListener("input",C),i.addEventListener("input",C),n.addEventListener("input",C),e.addEventListener("submit",ue)}}function S(){const e=document.getElementById("emp-name"),t=document.getElementById("emp-position"),o=document.getElementById("emp-age"),i=document.getElementById("emp-salary"),n=document.getElementById("emp-submit"),s=document.getElementById("error-emp-age"),a=e.value.trim().length>0,c=t.value.trim().length>0,r=Number(i.value)>0,l=Number(o.value);let d=!1;o.value.trim()===""?s.textContent="":l<18?s.textContent="The employee must be over 18 years of age":(s.textContent="",d=!0),a&&c&&d&&r?n.disabled=!1:n.disabled=!0}function ge(e){e.preventDefault();const t=document.getElementById("emp-name"),o=document.getElementById("emp-position"),i=document.getElementById("emp-age"),n=document.getElementById("emp-salary"),s=document.getElementById("month-select"),c=document.getElementById("year-select").value+"-"+s.value,r={id:"emp_"+Date.now(),name:t.value.trim(),position:o.value.trim(),age:Number(i.value),salary:Number(n.value)},l=g.getMonthData(c);l.employees.push(r);const d=g.getRawData();d[c]=l,g.saveData(d),console.log("✅ Новый сотрудник добавлен:",r),_("employees",c),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const m=document.getElementById("employee-panel");m&&m.classList.remove("slide-panel--open")}function ye(){const e=document.getElementById("employee-form");if(e){const t=document.getElementById("emp-name"),o=document.getElementById("emp-position"),i=document.getElementById("emp-age"),n=document.getElementById("emp-salary");t.addEventListener("input",S),o.addEventListener("input",S),i.addEventListener("input",S),n.addEventListener("input",S),e.addEventListener("submit",ge)}}function be(e,t,o=null){const a=100-(g.getMonthData(t).assignments||[]).filter(function(c){const r=String(c.employeeId)===String(e),l=o?String(c.projectId)!==String(o):!0;return r&&l}).reduce(function(c,r){return c+(r.capacity||0)},0);return a<0?0:a}function F(){const e=document.getElementById("assign-modal");e&&e.classList.remove("modal--open")}function ve(){const e=document.getElementById("assign-modal"),t=document.getElementById("assign-capacity-range"),o=document.getElementById("assign-range-value"),i=document.getElementById("assign-form");if(!e)return;e.onclick=function(s){(s.target.id==="assign-modal-overlay"||s.target.id==="assign-modal-close")&&(console.log("🔒 Закрываем модальное окно..."),F())},t&&o&&(t.oninput=function(){o.textContent=t.value}),i&&(i.onsubmit=function(s){s.preventDefault();const a=document.getElementById("assign-project-id").value,c=document.getElementById("assign-emp-select").value,r=Number(t.value),l=document.getElementById("month-select"),m=document.getElementById("year-select").value+"-"+l.value;console.log("✏️ СОХРАНЯЕМ НАЗНАЧЕНИЕ. Ключ периода:",m);const u=document.getElementById("assign-emp-select");if(c)u.classList.remove("is-invalid");else{u.classList.add("is-invalid"),console.warn("⚠️ Ошибка валидации: Сотрудник не выбран");return}const p=be(c,m,a);if(r>p){console.warn(`⚠️ Превышен лимит загрузки! Доступно: ${p}%, запрошено: ${r}%`),t.classList.add("is-invalid");let v=document.getElementById("assign-error-msg");v||(v=document.createElement("div"),v.id="assign-error-msg",v.style.color="#dc3545",v.style.marginTop="10px",v.style.fontWeight="bold",i.appendChild(v)),v.textContent=`Error: Employee exceeds 100% load. Max available: ${p}%`;return}else{t.classList.remove("is-invalid");const v=document.getElementById("assign-error-msg");v&&v.remove()}const b=g.getMonthData(m);b.assignments||(b.assignments=[]);const f=b.assignments.find(function(v){return String(v.projectId)===String(a)&&String(v.employeeId)===String(c)});if(f)console.log("🔄 Сотрудник уже на проекте. Обновляем capacity с",f.capacity,"на",r),f.capacity=r;else{const v={projectId:a,employeeId:c,capacity:r};b.assignments.push(v),console.log("🔗 Новое назначение добавлено в Стор:",v)}const h=g.getRawData();h[m]=b,g.saveData(h),F(),_("projects",m)});const n=document.getElementById("details-modal");n&&(n.onclick=function(s){(s.target.id==="details-modal-overlay"||s.target.id==="details-modal-close")&&n.classList.remove("modal--open")})}const x={"dashboard-app":`
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
        <!-- ТЕХНОЛОГИЧЕСКИЙ БЛОК: Панель администратора в самом низу сайдбара -->
        <div class="sidebar__admin-panel">
            <div class="sidebar__admin-tool">Admin Tools</div>
            <div class="sidebar__admin-wrapper">
                <button id="btn-export-db" class="btn btn--secondary" title="Export Database to JSON">Export</button>
                
                <label for="import-db-file" class="btn btn--secondary" text-align: center; cursor: pointer;" title="Import Database from JSON">
                    Import
                    <input type="file" id="import-db-file" accept=".json">
                </label>
                
                <button id="btn-reset-db" class="btn btn--danger" title="Reset Database to Default">Reset DB</button>
            </div>
        </div>

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

  <!-- <div class="modal" id="details-modal">
      <div class="modal__overlay" id="details-modal-overlay"></div>
      <div class="modal__content">
          <div class="modal__header">
              <h2 id="details-modal-title">Project Team</h2>
              <button class="modal__close" id="details-modal-close">×</button>
          </div>
          
          <div id="details-modal-body">
              </div>
      </div>
  </div> -->

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
              
              <div class="calendar-info">
                  <p class="calendar-working-days" id="calendar-working-days">Working Days: --/-- days</p>
                  <p class="vacation-ranges-title">Selected Vacations:</p>
                  <div id="calendar-vacation-ranges" class="vacation-ranges-list">None</div>
              </div>
          </div>
          
          <div class="modal__footer">
              <button id="btn-save-vacation" class="btn btn--primary">Set Vacation</button>
          </div>
      </div>
  </div>
`};class he{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const t=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${t.length}`),t.forEach(o=>{const i=o.getAttribute("data-component");this.loadComponent(o,i)})}loadComponent(t,o){console.log(`📥 Загружаю компонент: ${o}`),x[o]?(t.innerHTML=x[o],t.setAttribute("data-loaded","true"),this.loadedComponents.add(o),console.log(`✅ ${o} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${o}" не найден в components.js`),t.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${o}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(o=>{let i=!1;o.forEach(n=>{n.addedNodes.length&&n.addedNodes.forEach(s=>{s.nodeType===1&&s.querySelectorAll&&s.querySelectorAll("[data-component]").length>0&&(i=!0)})}),i&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new he().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const _e=g.getRawData();Object.keys(_e).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),g.saveData(V)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(x));console.log("📅 Данные за май 2026:",g.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),pe(),fe(),ye(),ve()},0)});
