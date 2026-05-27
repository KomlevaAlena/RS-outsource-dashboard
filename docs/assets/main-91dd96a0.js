(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();const E="monthData",r={getRawData(){const e=localStorage.getItem(E);return e?JSON.parse(e):{}},saveData(e){const n=JSON.stringify(e);localStorage.setItem(E,n)},getMonthData(e){const n=this.getRawData();return n[e]?n[e]:{employees:[],projects:[]}}},B={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};function L(e,n){if(!confirm("Are you sure you want to delete this project?"))return;const l=r.getMonthData(n),o=l.projects.filter(function(s){return s.id!==e});l.projects=o;const a=r.getRawData();a[n]=l,r.saveData(a),console.log(`❌ Проект с ID ${e} успешно удален`),p("projects",n)}function S(e){if(e.length===0)return'<p class="empty-state">There are no projects yet</p>';let n=` 
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
    `;return e.forEach(function(t){n+=`
            <tr>
                <td>${t.companyName}</td>
                <td>${t.projectName}</td>
                <td>${t.budget} $</td>
                <td>${t.capacity||0} p.</td>
                <td><button class="btn-delete" data-id="${t.id}">Delete</button></td>
            </tr>
        `}),n+="</tbody></table>",n}function p(e,n){const t=document.getElementById("table-container");if(!t)return;const l=r.getMonthData(n);e==="projects"?(t.innerHTML=S(l.projects),t.onclick=function(o){if(o.target.classList.contains("btn-delete")){const a=o.target.getAttribute("data-id");L(a,n)}}):e==="employees"&&(t.innerHTML="<p>There will be a table of employees here soon....</p>",t.onclick=null)}function v(){const e=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+e.value}function D(e){const n=document.querySelectorAll(".nav-button"),t=document.getElementById("page-title"),l=document.getElementById("add-entity-btn");n.forEach(function(c){c.classList.remove("nav-button--active")});const o=e.currentTarget;o.classList.add("nav-button--active");const a=o.getAttribute("data-tab");a==="projects"?(t.textContent="Projects",l.textContent="+ Add projects"):a==="employees"&&(t.textContent="Employees",l.textContent="+ Add employee"),console.log("Переключено на вкладку:",a);const s=v();p(a,s)}function _(){const n=document.querySelector(".nav-button--active").getAttribute("data-tab"),t=v();p(n,t),console.log("Период изменен на:",t)}function h(){const e=document.getElementById("project-panel");e&&e.classList.add("slide-panel--open")}function I(){const e=document.getElementById("project-panel");e&&e.classList.remove("slide-panel--open")}function C(){const e=document.getElementById("employee-panel");e&&e.classList.add("slide-panel--open")}function j(){const e=document.getElementById("employee-panel");e&&e.classList.remove("slide-panel--open")}function N(){const e=document.getElementById("sidebar"),n=document.getElementById("sidebar-toggle"),t=document.querySelectorAll(".nav-button"),l=document.getElementById("month-select"),o=document.getElementById("year-select"),a=document.getElementById("add-entity-btn"),s=document.getElementById("project-panel-close"),c=document.getElementById("project-panel-overlay"),d=document.getElementById("employee-panel-close"),m=document.getElementById("employee-panel-overlay");e&&n&&n.addEventListener("click",function(){e.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),t.forEach(function(i){i.addEventListener("click",D)}),l&&o&&(l.addEventListener("change",_),o.addEventListener("change",_)),a&&a.addEventListener("click",h),s&&s.addEventListener("click",I),c&&c.addEventListener("click",I),a&&a.addEventListener("click",function(){const i=document.querySelector(".nav-button--active").getAttribute("data-tab");i==="projects"?h():i==="employees"&&C()}),d&&d.addEventListener("click",j),m&&m.addEventListener("click",j),p("projects",v())}function y(){const e=document.getElementById("proj-name"),n=document.getElementById("proj-company"),t=document.getElementById("proj-budget"),l=document.getElementById("proj-capacity"),o=document.getElementById("proj-submit"),a=e.value.trim().length>0,s=n.value.trim().length>0,c=Number(t.value)>0,d=Number(l.value)>0;a&&s&&c&&d?o.disabled=!1:o.disabled=!0}function P(e){e.preventDefault();const n=document.getElementById("proj-name"),t=document.getElementById("proj-company"),l=document.getElementById("proj-budget"),o=document.getElementById("proj-capacity"),a=document.getElementById("month-select"),c=document.getElementById("year-select").value+"-"+a.value,m={id:"proj_"+Date.now(),projectName:n.value.trim(),companyName:t.value.trim(),budget:Number(l.value),capacity:Number(o.value)},i=r.getMonthData(c);i.projects.push(m);const u=r.getRawData();u[c]=i,r.saveData(u),console.log("✅ Новый проект успешно сохранен в Store:",m),p("projects",c),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const f=document.getElementById("project-panel");f&&f.classList.remove("slide-panel--open")}function A(){const e=document.getElementById("project-form");if(e){const n=document.getElementById("proj-name"),t=document.getElementById("proj-company"),l=document.getElementById("proj-budget"),o=document.getElementById("proj-capacity");n.addEventListener("input",y),t.addEventListener("input",y),l.addEventListener("input",y),o.addEventListener("input",y),e.addEventListener("submit",P)}}function g(){const e=document.getElementById("emp-name"),n=document.getElementById("emp-position"),t=document.getElementById("emp-age"),l=document.getElementById("emp-salary"),o=document.getElementById("emp-submit"),a=document.getElementById("error-emp-age"),s=e.value.trim().length>0,c=n.value.trim().length>0,d=Number(l.value)>0,m=Number(t.value);let i=!1;t.value.trim()===""?a.textContent="":m<18?a.textContent="The employee must be over 18 years of age":(a.textContent="",i=!0),s&&c&&i&&d?o.disabled=!1:o.disabled=!0}function w(e){e.preventDefault();const n=document.getElementById("emp-name"),t=document.getElementById("emp-position"),l=document.getElementById("emp-age"),o=document.getElementById("emp-salary"),a=document.getElementById("month-select"),c=document.getElementById("year-select").value+"-"+a.value,d={id:"emp_"+Date.now(),name:n.value.trim(),position:t.value.trim(),age:Number(l.value),salary:Number(o.value)},m=r.getMonthData(c);m.employees.push(d);const i=r.getRawData();i[c]=m,r.saveData(i),console.log("✅ Новый сотрудник добавлен:",d),p("employees",c),document.getElementById("employee-form").reset(),document.getElementById("emp-submit").disabled=!0;const u=document.getElementById("employee-panel");u&&u.classList.remove("slide-panel--open")}function T(){const e=document.getElementById("employee-form");if(e){const n=document.getElementById("emp-name"),t=document.getElementById("emp-position"),l=document.getElementById("emp-age"),o=document.getElementById("emp-salary");n.addEventListener("input",g),t.addEventListener("input",g),l.addEventListener("input",g),o.addEventListener("input",g),e.addEventListener("submit",w)}}const b={"dashboard-app":`
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
`};class O{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const n=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${n.length}`),n.forEach(t=>{const l=t.getAttribute("data-component");this.loadComponent(t,l)})}loadComponent(n,t){console.log(`📥 Загружаю компонент: ${t}`),b[t]?(n.innerHTML=b[t],n.setAttribute("data-loaded","true"),this.loadedComponents.add(t),console.log(`✅ ${t} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${t}" не найден в components.js`),n.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${t}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(t=>{let l=!1;t.forEach(o=>{o.addedNodes.length&&o.addedNodes.forEach(a=>{a.nodeType===1&&a.querySelectorAll&&a.querySelectorAll("[data-component]").length>0&&(l=!0)})}),l&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new O().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const q=r.getRawData();Object.keys(q).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),r.saveData(B)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(b));console.log("📅 Данные за май 2026:",r.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),N(),A(),T()},0)});
