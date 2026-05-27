(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))l(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function t(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(a){if(a.ep)return;a.ep=!0;const o=t(a);fetch(a.href,o)}})();const h="monthData",r={getRawData(){const n=localStorage.getItem(h);return n?JSON.parse(n):{}},saveData(n){const e=JSON.stringify(n);localStorage.setItem(h,e)},getMonthData(n){const e=this.getRawData();return e[n]?e[n]:{employees:[],projects:[]}}},B={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};function D(n,e){if(!confirm("Are you sure you want to delete this project?"))return;const l=r.getMonthData(e),a=l.projects.filter(function(s){return s.id!==n});l.projects=a;const o=r.getRawData();o[e]=l,r.saveData(o),console.log(`❌ Проект с ID ${n} успешно удален`),p("projects",e)}function L(n,e){if(!confirm("Are you sure you want to remove this employee?"))return;const l=r.getMonthData(e);l.employees=l.employees.filter(function(o){return o.id!==n});const a=r.getRawData();a[e]=l,r.saveData(a),console.log(`❌ Сотрудник с ID ${n} удален`),p("employees",e)}function S(n,e,t,l){const a=r.getMonthData(l),o=a.employees.find(s=>s.id===n);if(o){if(e==="salary"){const c=Number(t);if(isNaN(c)||c<=0){alert("Please enter the correct salary amount"),p("employees",l);return}o[e]=c}else{if(t.trim()===""){alert("The field cannot be empty"),p("employees",l);return}o[e]=t.trim()}const s=r.getRawData();s[l]=a,r.saveData(s),console.log(`📝 Сотрудник ${n}: поле ${e} обновлено на ${t}`)}}function C(n){if(n.length===0)return'<p class="empty-state">There are no projects yet</p>';let e=` 
    <table class="table">
        <thead>
            <tr>
                <th>Company</th>
                <th>Project</th>
                <th>Budget</th>
                <th>Capacity</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;return n.forEach(function(t){e+=`
            <tr>
                <td>${t.companyName}</td>
                <td>${t.projectName}</td>
                <td>${t.budget} $</td>
                <td>${t.capacity||0} p.</td>
                <td><button class="btn-delete" data-id="${t.id}">Delete</button></td>
            </tr>
        `}),e+="</tbody></table>",e}function N(n){if(n.length===0)return'<p class="empty-state">No employees added yet</p>';let e=`
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Age</th>
                <th>Salary</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;return n.forEach(function(t){e+=`
            <tr>
                <td>${t.name}</td>
                <td class="editable" data-id="${t.id}" data-field="position">${t.position}</td>
                <td>${t.age} y.o.</td>
                <td class="editable" data-id="${t.id}" data-field="salary">${t.salary} $</td>
                <td><button class="btn-delete btn-delete--emp" data-id="${t.id}">Delete</button></td>
            </tr>
        `}),e+="</tbody></table>",e}function p(n,e){const t=document.getElementById("table-container");if(!t)return;const l=r.getMonthData(e);n==="projects"?(t.innerHTML=C(l.projects),t.onclick=function(a){if(a.target.classList.contains("btn-delete")){const o=a.target.getAttribute("data-id");D(o,e)}}):n==="employees"&&(t.innerHTML=N(l.employees),t.onclick=function(a){if(a.target.classList.contains("btn-delete--emp")){const o=a.target.getAttribute("data-id");L(o,e)}},t.ondblclick=function(a){const o=a.target;if(o.classList.contains("editable")&&!o.querySelector("input")){let u=function(){const y=i.value;S(m,d,y,e),p("employees",e)};var s=u;const c=o.textContent.replace(" $","").trim(),m=o.getAttribute("data-id"),d=o.getAttribute("data-field"),i=document.createElement("input");i.type=d==="salary"?"number":"text",i.value=c,i.className="table-inline-input",o.innerHTML="",o.appendChild(i),i.focus(),i.onkeydown=function(y){y.key==="Enter"&&u()},i.onblur=function(){u()}}})}function v(){const n=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+n.value}function A(n){const e=document.querySelectorAll(".nav-button"),t=document.getElementById("page-title"),l=document.getElementById("add-entity-btn");e.forEach(function(c){c.classList.remove("nav-button--active")});const a=n.currentTarget;a.classList.add("nav-button--active");const o=a.getAttribute("data-tab");o==="projects"?(t.textContent="Projects",l.textContent="+ Add projects"):o==="employees"&&(t.textContent="Employees",l.textContent="+ Add employee"),console.log("Переключено на вкладку:",o);const s=v();p(o,s)}function E(){const e=document.querySelector(".nav-button--active").getAttribute("data-tab"),t=v();p(e,t),console.log("Период изменен на:",t)}function _(){const n=document.getElementById("project-panel");n&&n.classList.add("slide-panel--open")}function I(){const n=document.getElementById("project-panel");n&&n.classList.remove("slide-panel--open")}function P(){const n=document.getElementById("employee-panel");n&&n.classList.add("slide-panel--open")}function j(){const n=document.getElementById("employee-panel");n&&n.classList.remove("slide-panel--open")}function $(){const n=document.getElementById("sidebar"),e=document.getElementById("sidebar-toggle"),t=document.querySelectorAll(".nav-button"),l=document.getElementById("month-select"),a=document.getElementById("year-select"),o=document.getElementById("add-entity-btn"),s=document.getElementById("project-panel-close"),c=document.getElementById("project-panel-overlay"),m=document.getElementById("employee-panel-close"),d=document.getElementById("employee-panel-overlay");n&&e&&e.addEventListener("click",function(){n.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),t.forEach(function(i){i.addEventListener("click",A)}),l&&a&&(l.addEventListener("change",E),a.addEventListener("change",E)),o&&o.addEventListener("click",_),s&&s.addEventListener("click",I),c&&c.addEventListener("click",I),o&&o.addEventListener("click",function(){const i=document.querySelector(".nav-button--active").getAttribute("data-tab");i==="projects"?_():i==="employees"&&P()}),m&&m.addEventListener("click",j),d&&d.addEventListener("click",j),p("projects",v())}function g(){const n=document.getElementById("proj-name"),e=document.getElementById("proj-company"),t=document.getElementById("proj-budget"),l=document.getElementById("proj-capacity"),a=document.getElementById("proj-submit"),o=n.value.trim().length>0,s=e.value.trim().length>0,c=Number(t.value)>0,m=Number(l.value)>0;o&&s&&c&&m?a.disabled=!1:a.disabled=!0}function w(n){n.preventDefault();const e=document.getElementById("proj-name"),t=document.getElementById("proj-company"),l=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity"),o=document.getElementById("month-select"),c=document.getElementById("year-select").value+"-"+o.value,d={id:"proj_"+Date.now(),projectName:e.value.trim(),companyName:t.value.trim(),budget:Number(l.value),capacity:Number(a.value)},i=r.getMonthData(c);i.projects.push(d);const u=r.getRawData();u[c]=i,r.saveData(u),console.log("✅ Новый проект успешно сохранен в Store:",d),p("projects",c),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const y=document.getElementById("project-panel");y&&y.classList.remove("slide-panel--open")}function T(){const n=document.getElementById("project-form");if(n){const e=document.getElementById("proj-name"),t=document.getElementById("proj-company"),l=document.getElementById("proj-budget"),a=document.getElementById("proj-capacity");e.addEventListener("input",g),t.addEventListener("input",g),l.addEventListener("input",g),a.addEventListener("input",g),n.addEventListener("submit",w)}}function b(){const n=document.getElementById("emp-name"),e=document.getElementById("emp-position"),t=document.getElementById("emp-age"),l=document.getElementById("emp-salary"),a=document.getElementById("emp-submit"),o=document.getElementById("error-emp-age"),s=n.value.trim().length>0,c=e.value.trim().length>0,m=Number(l.value)>0,d=Number(t.value);let i=!1;t.value.trim()===""?o.textContent="":d<18?o.textContent="The employee must be over 18 years of age":(o.textContent="",i=!0),s&&c&&i&&m?a.disabled=!1:a.disabled=!0}function M(n){n.preventDefault();const e=document.getElementById("emp-name"),t=document.getElementById("emp-position"),l=document.getElementById("emp-age"),a=document.getElementById("emp-salary"),o=document.getElementById("month-select"),c=document.getElementById("year-select").value+"-"+o.value,m={id:"emp_"+Date.now(),name:e.value.trim(),position:t.value.trim(),age:Number(l.value),salary:Number(a.value)},d=r.getMonthData(c);d.employees.push(m);const i=r.getRawData();i[c]=d,r.saveData(i),console.log("✅ Новый сотрудник добавлен:",m),p("employees",c),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const u=document.getElementById("employee-panel");u&&u.classList.remove("slide-panel--open")}function O(){const n=document.getElementById("employee-form");if(n){const e=document.getElementById("emp-name"),t=document.getElementById("emp-position"),l=document.getElementById("emp-age"),a=document.getElementById("emp-salary");e.addEventListener("input",b),t.addEventListener("input",b),l.addEventListener("input",b),a.addEventListener("input",b),n.addEventListener("submit",M)}}const f={"dashboard-app":`
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
`};class q{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const e=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${e.length}`),e.forEach(t=>{const l=t.getAttribute("data-component");this.loadComponent(t,l)})}loadComponent(e,t){console.log(`📥 Загружаю компонент: ${t}`),f[t]?(e.innerHTML=f[t],e.setAttribute("data-loaded","true"),this.loadedComponents.add(t),console.log(`✅ ${t} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${t}" не найден в components.js`),e.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${t}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(t=>{let l=!1;t.forEach(a=>{a.addedNodes.length&&a.addedNodes.forEach(o=>{o.nodeType===1&&o.querySelectorAll&&o.querySelectorAll("[data-component]").length>0&&(l=!0)})}),l&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new q().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const x=r.getRawData();Object.keys(x).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),r.saveData(B)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(f));console.log("📅 Данные за май 2026:",r.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),$(),T(),O()},0)});
