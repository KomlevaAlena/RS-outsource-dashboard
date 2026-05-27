(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();const h="monthData",i={getRawData(){const e=localStorage.getItem(h);return e?JSON.parse(e):{}},saveData(e){const t=JSON.stringify(e);localStorage.setItem(h,t)},getMonthData(e){const t=this.getRawData();return t[e]?t[e]:{employees:[],projects:[]}}},B={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};function D(e,t){if(!confirm("Are you sure you want to delete this project?"))return;const s=i.getMonthData(t),o=s.projects.filter(function(l){return l.id!==e});s.projects=o;const a=i.getRawData();a[t]=s,i.saveData(a),console.log(`❌ Проект с ID ${e} успешно удален`),p("projects",t)}function L(e,t){if(!confirm("Are you sure you want to remove this employee?"))return;const s=i.getMonthData(t);s.employees=s.employees.filter(function(a){return a.id!==e});const o=i.getRawData();o[t]=s,i.saveData(o),console.log(`❌ Сотрудник с ID ${e} удален`),p("employees",t)}function S(e){if(e.length===0)return'<p class="empty-state">There are no projects yet</p>';let t=` 
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
    `;return e.forEach(function(n){t+=`
            <tr>
                <td>${n.companyName}</td>
                <td>${n.projectName}</td>
                <td>${n.budget} $</td>
                <td>${n.capacity||0} p.</td>
                <td><button class="btn-delete" data-id="${n.id}">Delete</button></td>
            </tr>
        `}),t+="</tbody></table>",t}function C(e){if(e.length===0)return'<p class="empty-state">No employees added yet</p>';let t=`
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
    `;return e.forEach(function(n){t+=`
            <tr>
                <td>${n.name}</td>
                <td>${n.position}</td>
                <td>${n.age} y.o.</td>
                <td>${n.salary} $</td>
                <td><button class="btn-delete btn-delete--emp" data-id="${n.id}">Delete</button></td>
            </tr>
        `}),t+="</tbody></table>",t}function p(e,t){const n=document.getElementById("table-container");if(!n)return;const s=i.getMonthData(t);e==="projects"?(n.innerHTML=S(s.projects),n.onclick=function(o){if(o.target.classList.contains("btn-delete")){const a=o.target.getAttribute("data-id");D(a,t)}}):e==="employees"&&(n.innerHTML=C(s.employees),n.onclick=function(o){if(o.target.classList.contains("btn-delete--emp")){const a=o.target.getAttribute("data-id");L(a,t)}})}function f(){const e=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+e.value}function N(e){const t=document.querySelectorAll(".nav-button"),n=document.getElementById("page-title"),s=document.getElementById("add-entity-btn");t.forEach(function(c){c.classList.remove("nav-button--active")});const o=e.currentTarget;o.classList.add("nav-button--active");const a=o.getAttribute("data-tab");a==="projects"?(n.textContent="Projects",s.textContent="+ Add projects"):a==="employees"&&(n.textContent="Employees",s.textContent="+ Add employee"),console.log("Переключено на вкладку:",a);const l=f();p(a,l)}function E(){const t=document.querySelector(".nav-button--active").getAttribute("data-tab"),n=f();p(t,n),console.log("Период изменен на:",n)}function _(){const e=document.getElementById("project-panel");e&&e.classList.add("slide-panel--open")}function I(){const e=document.getElementById("project-panel");e&&e.classList.remove("slide-panel--open")}function A(){const e=document.getElementById("employee-panel");e&&e.classList.add("slide-panel--open")}function j(){const e=document.getElementById("employee-panel");e&&e.classList.remove("slide-panel--open")}function P(){const e=document.getElementById("sidebar"),t=document.getElementById("sidebar-toggle"),n=document.querySelectorAll(".nav-button"),s=document.getElementById("month-select"),o=document.getElementById("year-select"),a=document.getElementById("add-entity-btn"),l=document.getElementById("project-panel-close"),c=document.getElementById("project-panel-overlay"),d=document.getElementById("employee-panel-close"),m=document.getElementById("employee-panel-overlay");e&&t&&t.addEventListener("click",function(){e.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),n.forEach(function(r){r.addEventListener("click",N)}),s&&o&&(s.addEventListener("change",E),o.addEventListener("change",E)),a&&a.addEventListener("click",_),l&&l.addEventListener("click",I),c&&c.addEventListener("click",I),a&&a.addEventListener("click",function(){const r=document.querySelector(".nav-button--active").getAttribute("data-tab");r==="projects"?_():r==="employees"&&A()}),d&&d.addEventListener("click",j),m&&m.addEventListener("click",j),p("projects",f())}function y(){const e=document.getElementById("proj-name"),t=document.getElementById("proj-company"),n=document.getElementById("proj-budget"),s=document.getElementById("proj-capacity"),o=document.getElementById("proj-submit"),a=e.value.trim().length>0,l=t.value.trim().length>0,c=Number(n.value)>0,d=Number(s.value)>0;a&&l&&c&&d?o.disabled=!1:o.disabled=!0}function w(e){e.preventDefault();const t=document.getElementById("proj-name"),n=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),o=document.getElementById("proj-capacity"),a=document.getElementById("month-select"),c=document.getElementById("year-select").value+"-"+a.value,m={id:"proj_"+Date.now(),projectName:t.value.trim(),companyName:n.value.trim(),budget:Number(s.value),capacity:Number(o.value)},r=i.getMonthData(c);r.projects.push(m);const u=i.getRawData();u[c]=r,i.saveData(u),console.log("✅ Новый проект успешно сохранен в Store:",m),p("projects",c),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const v=document.getElementById("project-panel");v&&v.classList.remove("slide-panel--open")}function T(){const e=document.getElementById("project-form");if(e){const t=document.getElementById("proj-name"),n=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),o=document.getElementById("proj-capacity");t.addEventListener("input",y),n.addEventListener("input",y),s.addEventListener("input",y),o.addEventListener("input",y),e.addEventListener("submit",w)}}function g(){const e=document.getElementById("emp-name"),t=document.getElementById("emp-position"),n=document.getElementById("emp-age"),s=document.getElementById("emp-salary"),o=document.getElementById("emp-submit"),a=document.getElementById("error-emp-age"),l=e.value.trim().length>0,c=t.value.trim().length>0,d=Number(s.value)>0,m=Number(n.value);let r=!1;n.value.trim()===""?a.textContent="":m<18?a.textContent="The employee must be over 18 years of age":(a.textContent="",r=!0),l&&c&&r&&d?o.disabled=!1:o.disabled=!0}function $(e){e.preventDefault();const t=document.getElementById("emp-name"),n=document.getElementById("emp-position"),s=document.getElementById("emp-age"),o=document.getElementById("emp-salary"),a=document.getElementById("month-select"),c=document.getElementById("year-select").value+"-"+a.value,d={id:"emp_"+Date.now(),name:t.value.trim(),position:n.value.trim(),age:Number(s.value),salary:Number(o.value)},m=i.getMonthData(c);m.employees.push(d);const r=i.getRawData();r[c]=m,i.saveData(r),console.log("✅ Новый сотрудник добавлен:",d),p("employees",c),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const u=document.getElementById("employee-panel");u&&u.classList.remove("slide-panel--open")}function O(){const e=document.getElementById("employee-form");if(e){const t=document.getElementById("emp-name"),n=document.getElementById("emp-position"),s=document.getElementById("emp-age"),o=document.getElementById("emp-salary");t.addEventListener("input",g),n.addEventListener("input",g),s.addEventListener("input",g),o.addEventListener("input",g),e.addEventListener("submit",$)}}const b={"dashboard-app":`
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
`};class q{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const t=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${t.length}`),t.forEach(n=>{const s=n.getAttribute("data-component");this.loadComponent(n,s)})}loadComponent(t,n){console.log(`📥 Загружаю компонент: ${n}`),b[n]?(t.innerHTML=b[n],t.setAttribute("data-loaded","true"),this.loadedComponents.add(n),console.log(`✅ ${n} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${n}" не найден в components.js`),t.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${n}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(n=>{let s=!1;n.forEach(o=>{o.addedNodes.length&&o.addedNodes.forEach(a=>{a.nodeType===1&&a.querySelectorAll&&a.querySelectorAll("[data-component]").length>0&&(s=!0)})}),s&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new q().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const M=i.getRawData();Object.keys(M).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),i.saveData(B)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(b));console.log("📅 Данные за май 2026:",i.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),P(),T(),O()},0)});
