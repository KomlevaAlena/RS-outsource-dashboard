(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const e of a)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function s(a){const e={};return a.integrity&&(e.integrity=a.integrity),a.referrerPolicy&&(e.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?e.credentials="include":a.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(a){if(a.ep)return;a.ep=!0;const e=s(a);fetch(a.href,e)}})();const L="monthData",u={getRawData(){const t=localStorage.getItem(L);return t?JSON.parse(t):{}},saveData(t){const n=JSON.stringify(t);localStorage.setItem(L,n)},getMonthData(t){const n=this.getRawData();return n[t]?n[t]:{employees:[],projects:[]}}},T={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};let v=new Set,E=null,I="";function O(t,n){E=t,I=n;const s=document.getElementById("vacation-modal"),o=document.getElementById("vacation-modal-title"),a=document.getElementById("calendar-grid-container");if(!s||!a){console.error("❌ Элементы календаря не найдены в DOM");return}const e=n.split("-"),l=parseInt(e[0],10),i=parseInt(e[1],10),d=u.getMonthData(n).employees.find(r=>String(r.id)===String(t));if(d){o.textContent=`Availability for ${d.name}`;const r=d.vacations||[];v=new Set(r.map(Number))}else v=new Set;W(l,i,a),H(s,l,i,a),s.classList.add("modal--open"),console.log(`📅 Календарь открыт для сотрудника ${t} на период ${n}`)}function W(t,n,s){s.innerHTML=F(t,n),M(t,n)}function F(t,n){const s=new Date(t,n+1,0).getDate();let o=new Date(t,n,1).getDay()-1;o<0&&(o=6);const a=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];let e='<div class="calendar-grid">';a.forEach(l=>{e+=`<div class="calendar-header-cell ${l==="Sat"||l==="Sun"?"calendar-header-cell--weekend":""}">${l}</div>`});for(let l=0;l<o;l++)e+='<div class="calendar-day-cell calendar-day-cell--empty"></div>';for(let l=1;l<=s;l++){const c=new Date(t,n,l).getDay(),d=c===0||c===6;let r="calendar-day-cell calendar-day-target";d&&(r+=" calendar-day-cell--weekend"),v.has(l)&&(r+=" calendar-day-cell--selected"),e+=`<div class="${r}" data-day="${l}">${l}</div>`}return e+="</div>",e}function M(t,n){const s=new Date(t,n+1,0).getDate();let o=0,a=0;for(let d=1;d<=s;d++){const r=new Date(t,n,d).getDay();r===0||r===6||(o++,v.has(d)&&a++)}const e=o-a,l=document.getElementById("calendar-working-days");l&&(l.textContent=`Working Days: ${e}/${o} days`);const i=q(t,n),c=document.getElementById("calendar-vacation-ranges");c&&(c.textContent=i||"None")}function q(t,n){const s=Array.from(v).sort((i,c)=>i-c);if(s.length===0)return"";const o=[];let a=s[0],e=s[0];const l=i=>{const c=String(i).padStart(2,"0"),d=String(n+1).padStart(2,"0");return`${c}.${d}`};for(let i=1;i<s.length;i++){const c=s[i];let d=!1;if(c===e+1)d=!0;else{let r=!1;for(let m=e+1;m<c;m++){const p=new Date(t,n,m).getDay();if(p!==0&&p!==6){r=!0;break}}r||(d=!0)}d||(a===e?o.push(l(a)):o.push(`${l(a)}-${l(e)}`),a=c),e=c}return a===e?o.push(l(a)):o.push(`${l(a)}-${l(e)}`),o.join(", ")}function H(t,n,s,o){o.onclick=function(e){const l=e.target;if(!l.classList.contains("calendar-day-target"))return;const i=parseInt(l.getAttribute("data-day"),10);v.has(i)?(v.delete(i),l.classList.remove("calendar-day-cell--selected")):(v.add(i),l.classList.add("calendar-day-cell--selected")),M(n,s)},t.onclick=function(e){(e.target.id==="vacation-modal-overlay"||e.target.id==="vacation-modal-close")&&(t.classList.remove("modal--open"),console.log("🔒 Календарь закрыт"))};const a=document.getElementById("btn-save-vacation");a&&(a.onclick=function(){const e=u.getRawData(),c=((e[I]||{}).employees||[]).find(d=>String(d.id)===String(E));c&&(c.vacations=Array.from(v).sort((d,r)=>d-r),u.saveData(e),console.log(`💾 Отпуска сохранены для сотрудника ${E}:`,c.vacations),y("employees",I),t.classList.remove("modal--open"))})}function V(t,n){const s=new Date(t,n+1,0).getDate();let o=0;for(let a=1;a<=s;a++){const e=new Date(t,n,a).getDay();e===0||e===6||o++}return o}function R(t,n,s){if(!t||!Array.isArray(t)||t.length===0)return 0;let o=0;return t.forEach(a=>{const e=new Date(n,s,a).getDay();e===0||e===6||o++}),o}function j(t,n){const s=n.split("-"),o=parseInt(s[0],10),a=parseInt(s[1],10),e=V(o,a),l=t.vacations||[],i=R(l,o,a);if(e===0)return 0;const c=i/e;return Math.round(c*100)/100}function G(t,n){const o=100*(1-j(t,n));return Math.round(o)}function P(t,n,s,o){const a=n.filter(function(d){return String(d.projectId)===String(t.id)});let e=0,l=0;a.forEach(function(d){const r=s.find(function(m){return String(m.id)===String(d.employeeId)});if(r){e+=d.capacity;const m=j(r,o),p=r.salary*(d.capacity/100)*(1-m);l+=p}});const i=t.budget,c=i-l;return{effectiveCapacity:Math.round(e),expenses:Math.round(l),revenue:Math.round(i),profit:Math.round(c)}}function J(t,n,s,o){let a=0,e=0,l=0,i=0;return t.forEach(function(c){const d=P(c,n,s,o);a+=d.revenue,e+=d.effectiveCapacity,l+=d.expenses,i+=d.profit}),{totalBudget:a,totalCapacity:e,totalExpenses:l,totalProfit:i}}function U(t,n){if(!confirm("Are you sure you want to delete this project?"))return;const o=u.getMonthData(n),a=o.projects.filter(function(l){return l.id!==t});o.projects=a;const e=u.getRawData();e[n]=o,u.saveData(e),console.log(`❌ Проект с ID ${t} успешно удален`),y("projects",n)}function z(t,n){if(!confirm("Are you sure you want to remove this employee?"))return;const o=u.getMonthData(n);o.employees=o.employees.filter(function(e){return e.id!==t});const a=u.getRawData();a[n]=o,u.saveData(a),console.log(`❌ Сотрудник с ID ${t} удален`),y("employees",n)}function Y(t,n,s,o){const a=u.getMonthData(o),e=a.employees.find(l=>l.id===t);if(e){if(n==="salary"){const i=Number(s);if(isNaN(i)||i<=0){alert("Please enter the correct salary amount"),y("employees",o);return}e[n]=i}else{if(s.trim()===""){alert("The field cannot be empty"),y("employees",o);return}e[n]=s.trim()}const l=u.getRawData();l[o]=a,u.saveData(l),console.log(`📝 Сотрудник ${t}: поле ${n} обновлено на ${s}`)}}function Q(t,n){const s=t.projects||[],o=t.assignments||[],a=t.employees||[];if(s.length===0)return'<p class="empty-state">There are no projects yet</p>';let e=` 
    <table class="table">
        <thead>
            <tr>
                <th>Company</th>
                <th>Project</th>
                <th>Budget (Rev.)</th>
                <th>Capacity</th>
                <th>Expenses</th>
                <th>Profit</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;return s.forEach(function(l){const i=P(l,o,a,n),c=i.profit<0?"text-danger":"text-success";e+=`
            <tr>
                <td>${l.companyName}</td>
                <td>${l.projectName}</td>
                <td>${l.budget.toLocaleString()} $</td>
                <td class="clickable-capacity" data-id="${l.id}">
                    <span class="capacity-link">${i.effectiveCapacity} / ${l.capacity} p.</span>
                </td>
                <td>${i.expenses.toLocaleString()} $</td>
                <td class="${c}"><strong>${i.profit.toLocaleString()} $</strong></td>
                <td>
                    <button class="btn-assign" data-id="${l.id}">Assign</button>
                    <button class="btn-delete" data-id="${l.id}">Delete</button>
                </td>
            </tr>
        `}),e+="</tbody></table>",e}function X(t,n){if(t.length===0)return'<p class="empty-state">No employees added yet</p>';let s=`
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Age</th>
                <th>Salary</th>
                <th>Vacation Factor</th>
                <th>Eff. Capacity</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;return t.forEach(function(o){const a=j(o,n),e=G(o,n);s+=`
            <tr>
                <td>${o.name}</td>
                <td class="editable" data-id="${o.id}" data-field="position">${o.position}</td>
                <td>${o.age} y.o.</td>
                <td class="editable" data-id="${o.id}" data-field="salary">${o.salary} $</td>
                <td><span class="badge badge--factor">${a}</span></td>
                <td><span class="badge badge--capacity">${e}%</span></td>
                <td>
                    <button class="btn-delete btn-delete--emp" data-id="${o.id}">Delete</button>
                    <button class="btn-availability" data-id="${o.id}">Availability</button>
                </td>
            </tr>
        `}),s+="</tbody></table>",s}function Z(t,n){const s=t.projects||[],o=t.assignments||[],a=t.employees||[],e=s.length,l=J(s,o,a,n);return` 
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
        `}function N(t,n){console.log("📖 ЧИТАЕМ НАЗНАЧЕНИЯ. Ключ периода:",n);const s=document.getElementById("details-modal"),o=document.getElementById("details-modal-body"),a=document.getElementById("details-modal-title");if(!s||!o)return;typeof u.loadFromLocalStorage=="function"&&u.loadFromLocalStorage();const e=u.getMonthData(n),l=e.projects||[],i=e.employees||[],c=e.assignments||[];console.log("Проверяем, что пришло из базы для проекта:",{projectId:t,allAssignmentsInMonth:c,filtered:c.filter(m=>m.projectId===t)});const d=l.find(m=>m.id===t);d&&(a.textContent=`Team for "${d.projectName}"`);const r=c.filter(m=>String(m.projectId)===String(t));if(r.length===0)o.innerHTML='<p class="empty-state">No employees assigned to this project yet.</p>';else{let m='<ul class="team-list">';r.forEach(function(p){const g=i.find(f=>String(f.id)===String(p.employeeId));g&&(m+=`
                    <li class="team-item">
                        <div class="team-item__info">
                            <strong class="team-item__name">${g.name}</strong>
                            <span class="team-item__position">${g.position}</span>
                        </div>
                        <div class="team-item__actions">
                            <span class="team-item__capacity">${p.capacity}% load</span>
                            <button class="btn-remove-asm" 
                                    data-project-id="${t}" 
                                    data-employee-id="${g.id}" 
                                    title="Remove from project">×</button>
                        </div>
                    </li>
                `)}),m+="</ul>",o.innerHTML=m}s.onclick=function(m){if(m.target.classList.contains("btn-remove-asm")){const p=m.target.getAttribute("data-project-id"),g=m.target.getAttribute("data-employee-id");if(!confirm("Are you sure you want to remove this employee from the project?"))return;const f=u.getRawData(),b=f[n]||{},x=b.assignments||[];b.assignments=x.filter(function(S){return!(String(S.projectId)===String(p)&&String(S.employeeId)===String(g))}),u.saveData(f),console.log(`🗑 Сотрудник ${g} удален с проекта ${p}`),N(p,n),y("projects",n);return}(m.target.id==="details-modal-overlay"||m.target.id==="details-modal-close")&&(console.log("🔒 Закрываем окно подробностей команды"),s.classList.remove("modal--open"))},s.classList.add("modal--open")}function K(t,n){const s=document.getElementById("assign-modal"),o=document.getElementById("assign-project-id"),a=document.getElementById("assign-emp-select");if(console.log("Поиск элементов модалки:",{modal:s,projectInput:o,empSelect:a}),!s||!a){console.error("❌ Ошибка: Элементы модального окна не найдены в HTML!");return}o&&(o.value=t);const e=u.getMonthData(n),l=e&&e.employees?e.employees:[];if(console.log("Список сотрудников для модалки:",l),l.length===0)a.innerHTML='<option value="">-- No employees available --</option>';else{let d='<option value="">-- Select an employee --</option>';l.forEach(function(r){const m=r.name||"Unknown Name",p=r.position||"No Position";d+=`<option value="${r.id}">${m} (${p})</option>`}),a.innerHTML=d}const i=document.getElementById("assign-capacity-range"),c=document.getElementById("assign-range-value");i&&(i.value=50),c&&(c.textContent="50"),s.classList.add("modal--open"),console.log("🚀 Класс modal--open успешно добавлен!")}function y(t,n){const s=document.getElementById("table-container");if(!s)return;const o=u.getMonthData(n);if(t==="projects"){const a=Z(o,n),e=Q(o,n);s.innerHTML=a+e,s.onclick=function(l){if(console.log("Кликнули по элементу:",l.target),l.target.classList.contains("btn-delete")){const c=l.target.getAttribute("data-id");U(c,n)}if(l.target.classList.contains("btn-assign")){console.log("Ура, поймали клик по кнопке Assign!");const c=l.target.getAttribute("data-id");K(c,n)}const i=l.target.closest(".clickable-capacity");if(i){const c=i.getAttribute("data-id");N(c,n)}}}else t==="employees"&&(s.innerHTML=X(o.employees,n),s.onclick=function(a){if(a.target.classList.contains("btn-availability")){const e=a.target.getAttribute("data-id");console.log(`📅 Нажали календарь сотрудника с ID: ${e}`),O(e,n)}if(a.target.classList.contains("btn-delete--emp")){const e=a.target.getAttribute("data-id");z(e,n)}},s.ondblclick=function(a){const e=a.target;if(e.classList.contains("editable")&&!e.querySelector("input")){let m=function(){const p=r.value;Y(c,d,p,n),y("employees",n)};var l=m;const i=e.textContent.replace(" $","").trim(),c=e.getAttribute("data-id"),d=e.getAttribute("data-field"),r=document.createElement("input");r.type=d==="salary"?"number":"text",r.value=i,r.className="table-inline-input",e.innerHTML="",e.appendChild(r),r.focus(),r.onkeydown=function(p){p.key==="Enter"&&m()},r.onblur=function(){m()}}})}function B(){const t=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+t.value}function ee(t){const n=document.querySelectorAll(".nav-button"),s=document.getElementById("page-title"),o=document.getElementById("add-entity-btn");n.forEach(function(i){i.classList.remove("nav-button--active")});const a=t.currentTarget;a.classList.add("nav-button--active");const e=a.getAttribute("data-tab");e==="projects"?(s.textContent="Projects",o.textContent="+ Add projects"):e==="employees"&&(s.textContent="Employees",o.textContent="+ Add employee"),console.log("Переключено на вкладку:",e);const l=B();y(e,l)}function $(){const n=document.querySelector(".nav-button--active").getAttribute("data-tab"),s=B();y(n,s),console.log("Период изменен на:",s)}function C(){const t=document.getElementById("project-panel");t&&t.classList.add("slide-panel--open")}function A(){const t=document.getElementById("project-panel");t&&t.classList.remove("slide-panel--open")}function te(){const t=document.getElementById("employee-panel");t&&t.classList.add("slide-panel--open")}function k(){const t=document.getElementById("employee-panel");t&&t.classList.remove("slide-panel--open")}function ne(){const t=document.getElementById("sidebar"),n=document.getElementById("sidebar-toggle"),s=document.querySelectorAll(".nav-button");document.querySelectorAll(".sidebar__nav-btn");const o=document.getElementById("month-select"),a=document.getElementById("year-select"),e=document.getElementById("add-entity-btn"),l=document.getElementById("project-panel-close"),i=document.getElementById("project-panel-overlay"),c=document.getElementById("employee-panel-close"),d=document.getElementById("employee-panel-overlay");if(!o||!a)return;const r=localStorage.getItem("app-selected-month"),m=localStorage.getItem("app-selected-year");r&&(o.value=r),m&&(a.value=m);function p(){return a.value+"-"+o.value}let g="projects";o.addEventListener("change",function(){localStorage.setItem("app-selected-month",o.value),console.log("📅 Месяц изменен на:",o.value),y(g,p())}),a.addEventListener("change",function(){localStorage.setItem("app-selected-year",a.value),console.log("📅 Год изменен на:",a.value),y(g,p())}),t&&n&&n.addEventListener("click",function(){t.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),s.forEach(function(f){f.addEventListener("click",ee)}),o&&a&&(o.addEventListener("change",$),a.addEventListener("change",$)),e&&e.addEventListener("click",C),l&&l.addEventListener("click",A),i&&i.addEventListener("click",A),e&&e.addEventListener("click",function(){const f=document.querySelector(".nav-button--active").getAttribute("data-tab");f==="projects"?C():f==="employees"&&te()}),c&&c.addEventListener("click",k),d&&d.addEventListener("click",k),y("projects",B())}function h(){const t=document.getElementById("proj-name"),n=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),o=document.getElementById("proj-capacity"),a=document.getElementById("proj-submit"),e=t.value.trim().length>0,l=n.value.trim().length>0,i=Number(s.value)>0,c=Number(o.value)>0;e&&l&&i&&c?a.disabled=!1:a.disabled=!0}function ae(t){t.preventDefault();const n=document.getElementById("proj-name"),s=document.getElementById("proj-company"),o=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity"),e=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+e.value,d={id:"proj_"+Date.now(),projectName:n.value.trim(),companyName:s.value.trim(),budget:Number(o.value),capacity:Number(a.value)},r=u.getMonthData(i);r.projects.push(d);const m=u.getRawData();m[i]=r,u.saveData(m),console.log("✅ Новый проект успешно сохранен в Store:",d),y("projects",i),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const p=document.getElementById("project-panel");p&&p.classList.remove("slide-panel--open")}function oe(){const t=document.getElementById("project-form");if(t){const n=document.getElementById("proj-name"),s=document.getElementById("proj-company"),o=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity");n.addEventListener("input",h),s.addEventListener("input",h),o.addEventListener("input",h),a.addEventListener("input",h),t.addEventListener("submit",ae)}}function _(){const t=document.getElementById("emp-name"),n=document.getElementById("emp-position"),s=document.getElementById("emp-age"),o=document.getElementById("emp-salary"),a=document.getElementById("emp-submit"),e=document.getElementById("error-emp-age"),l=t.value.trim().length>0,i=n.value.trim().length>0,c=Number(o.value)>0,d=Number(s.value);let r=!1;s.value.trim()===""?e.textContent="":d<18?e.textContent="The employee must be over 18 years of age":(e.textContent="",r=!0),l&&i&&r&&c?a.disabled=!1:a.disabled=!0}function se(t){t.preventDefault();const n=document.getElementById("emp-name"),s=document.getElementById("emp-position"),o=document.getElementById("emp-age"),a=document.getElementById("emp-salary"),e=document.getElementById("month-select"),i=document.getElementById("year-select").value+"-"+e.value,c={id:"emp_"+Date.now(),name:n.value.trim(),position:s.value.trim(),age:Number(o.value),salary:Number(a.value)},d=u.getMonthData(i);d.employees.push(c);const r=u.getRawData();r[i]=d,u.saveData(r),console.log("✅ Новый сотрудник добавлен:",c),y("employees",i),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const m=document.getElementById("employee-panel");m&&m.classList.remove("slide-panel--open")}function le(){const t=document.getElementById("employee-form");if(t){const n=document.getElementById("emp-name"),s=document.getElementById("emp-position"),o=document.getElementById("emp-age"),a=document.getElementById("emp-salary");n.addEventListener("input",_),s.addEventListener("input",_),o.addEventListener("input",_),a.addEventListener("input",_),t.addEventListener("submit",se)}}function w(){const t=document.getElementById("assign-modal");t&&t.classList.remove("modal--open")}function ie(){const t=document.getElementById("assign-modal"),n=document.getElementById("assign-capacity-range"),s=document.getElementById("assign-range-value"),o=document.getElementById("assign-form");if(!t)return;t.onclick=function(e){(e.target.id==="assign-modal-overlay"||e.target.id==="assign-modal-close")&&(console.log("🔒 Закрываем модальное окно..."),w())},n&&s&&(n.oninput=function(){s.textContent=n.value}),o&&(o.onsubmit=function(e){e.preventDefault();const l=document.getElementById("assign-project-id").value,i=document.getElementById("assign-emp-select").value,c=Number(n.value),d=document.getElementById("month-select"),m=document.getElementById("year-select").value+"-"+d.value;if(console.log("✏️ СОХРАНЯЕМ НАЗНАЧЕНИЕ. Ключ периода:",m),!i){alert("Please select an employee first!");return}const p=u.getMonthData(m);p.assignments||(p.assignments=[]);const g=p.assignments.find(function(b){return String(b.projectId)===String(l)&&String(b.employeeId)===String(i)});if(g)console.log("🔄 Сотрудник уже на проекте. Обновляем capacity с",g.capacity,"на",c),g.capacity=c;else{const b={projectId:l,employeeId:i,capacity:c};p.assignments.push(b),console.log("🔗 Новое назначение добавлено в Стор:",b)}const f=u.getRawData();f[m]=p,u.saveData(f),alert("Employee successfully assigned to the project!"),w(),renderCurrentTab("projects",m)});const a=document.getElementById("details-modal");a&&(a.onclick=function(e){(e.target.id==="details-modal-overlay"||e.target.id==="details-modal-close")&&a.classList.remove("modal--open")})}const D={"dashboard-app":`
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
`};class ce{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const n=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${n.length}`),n.forEach(s=>{const o=s.getAttribute("data-component");this.loadComponent(s,o)})}loadComponent(n,s){console.log(`📥 Загружаю компонент: ${s}`),D[s]?(n.innerHTML=D[s],n.setAttribute("data-loaded","true"),this.loadedComponents.add(s),console.log(`✅ ${s} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${s}" не найден в components.js`),n.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${s}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(s=>{let o=!1;s.forEach(a=>{a.addedNodes.length&&a.addedNodes.forEach(e=>{e.nodeType===1&&e.querySelectorAll&&e.querySelectorAll("[data-component]").length>0&&(o=!0)})}),o&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new ce().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const de=u.getRawData();Object.keys(de).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),u.saveData(T)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(D));console.log("📅 Данные за май 2026:",u.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),ne(),oe(),le(),ie()},0)});
