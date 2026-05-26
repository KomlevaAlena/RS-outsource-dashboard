(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();const f="monthData",r={getRawData(){const o=localStorage.getItem(f);return o?JSON.parse(o):{}},saveData(o){const e=JSON.stringify(o);localStorage.setItem(f,e)},getMonthData(o){const e=this.getRawData();return e[o]?e[o]:{employees:[],projects:[]}}},E={"2026-4":{employees:[{id:"emp_1",name:"Jone",surname:"Dow",dob:"1995-03-10",position:"Senior",salary:5e3,assignments:[],vacations:[]}],projects:[{id:"proj_1",projectName:"Alpha Dashboard",companyName:"Google",budget:15e3,capacity:3}]}};function _(o,e){if(!confirm("Are you sure you want to delete this project?"))return;const s=r.getMonthData(e),n=s.projects.filter(function(l){return l.id!==o});s.projects=n;const a=r.getRawData();a[e]=s,r.saveData(a),console.log(`❌ Проект с ID ${o} успешно удален`),i("projects",e)}function I(o){if(o.length===0)return'<p class="empty-state">There are no projects yet</p>';let e=` 
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
    `;return o.forEach(function(t){e+=`
            <tr>
                <td>${t.companyName}</td>
                <td>${t.projectName}</td>
                <td>${t.budget} $</td>
                <td>${t.capacity||0} p.</td>
                <td><button class="btn-delete" data-id="${t.id}">Delete</button></td>
            </tr>
        `}),e+="</tbody></table>",e}function i(o,e){const t=document.getElementById("table-container");if(!t)return;const s=r.getMonthData(e);o==="projects"?(t.innerHTML=I(s.projects),t.onclick=function(n){if(n.target.classList.contains("btn-delete")){const a=n.target.getAttribute("data-id");_(a,e)}}):o==="employees"&&(t.innerHTML="<p>There will be a table of employees here soon....</p>",t.onclick=null)}function m(){const o=document.getElementById("month-select");return document.getElementById("year-select").value+"-"+o.value}function B(o){const e=document.querySelectorAll(".nav-button"),t=document.getElementById("page-title"),s=document.getElementById("add-entity-btn");e.forEach(function(c){c.classList.remove("nav-button--active")});const n=o.currentTarget;n.classList.add("nav-button--active");const a=n.getAttribute("data-tab");a==="projects"?(t.textContent="Projects",s.textContent="+ Add projects"):a==="employees"&&(t.textContent="Employees",s.textContent="+ Add employee"),console.log("Переключено на вкладку:",a);const l=m();i(a,l)}function h(){const e=document.querySelector(".nav-button--active").getAttribute("data-tab"),t=m();i(e,t),console.log("Период изменен на:",t)}function L(){const o=document.getElementById("project-panel");o&&o.classList.add("slide-panel--open")}function j(){const o=document.getElementById("project-panel");o&&o.classList.remove("slide-panel--open")}function D(){const o=document.getElementById("sidebar"),e=document.getElementById("sidebar-toggle"),t=document.querySelectorAll(".nav-button"),s=document.getElementById("month-select"),n=document.getElementById("year-select"),a=document.getElementById("add-entity-btn"),l=document.getElementById("project-panel-close"),c=document.getElementById("project-panel-overlay");o&&e&&e.addEventListener("click",function(){o.classList.toggle("sidebar--collapsed"),console.log("Клик зафиксирован: состояние сайдбара изменено")}),t.forEach(function(d){d.addEventListener("click",B)}),s&&n&&(s.addEventListener("change",h),n.addEventListener("change",h)),a&&a.addEventListener("click",L),l&&l.addEventListener("click",j),c&&c.addEventListener("click",j),i("projects",m())}function p(){const o=document.getElementById("proj-name"),e=document.getElementById("proj-company"),t=document.getElementById("proj-budget"),s=document.getElementById("proj-capacity"),n=document.getElementById("proj-submit"),a=o.value.trim().length>0,l=e.value.trim().length>0,c=Number(t.value)>0,d=Number(s.value)>0;a&&l&&c&&d?n.disabled=!1:n.disabled=!0}function S(o){o.preventDefault();const e=document.getElementById("proj-name"),t=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),n=document.getElementById("proj-capacity"),a=document.getElementById("month-select"),c=document.getElementById("year-select").value+"-"+a.value,g={id:"proj_"+Date.now(),projectName:e.value.trim(),companyName:t.value.trim(),budget:Number(s.value),capacity:Number(n.value)},b=r.getMonthData(c);b.projects.push(g);const y=r.getRawData();y[c]=b,r.saveData(y),console.log("✅ Новый проект успешно сохранен в Store:",g),i("projects",c),document.getElementById("project-form").reset(),document.getElementById("proj-submit").disabled=!0;const v=document.getElementById("project-panel");v&&v.classList.remove("slide-panel--open")}function C(){const o=document.getElementById("project-form");if(o){const e=document.getElementById("proj-name"),t=document.getElementById("proj-company"),s=document.getElementById("proj-budget"),n=document.getElementById("proj-capacity");e.addEventListener("input",p),t.addEventListener("input",p),s.addEventListener("input",p),n.addEventListener("input",p),o.addEventListener("submit",S)}}const u={"dashboard-app":`
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
  </div>
`};class P{constructor(){console.log("🔄 SimpleComponentLoader создан"),this.loadedComponents=new Set}init(){console.log("🚀 Начинаю загрузку компонентов..."),this.loadAllComponents(),this.setupObserver(),console.log("✅ Все компоненты загружены")}loadAllComponents(){const e=document.querySelectorAll("[data-component]:not([data-loaded])");console.log(`📊 Найдено компонентов для загрузки: ${e.length}`),e.forEach(t=>{const s=t.getAttribute("data-component");this.loadComponent(t,s)})}loadComponent(e,t){console.log(`📥 Загружаю компонент: ${t}`),u[t]?(e.innerHTML=u[t],e.setAttribute("data-loaded","true"),this.loadedComponents.add(t),console.log(`✅ ${t} загружен`),this.loadAllComponents()):(console.error(`❌ Компонент "${t}" не найден в components.js`),e.innerHTML=`
        <div style="padding: 1rem; background: #fee; border: 2px dashed #e74c3c;">
          <strong>Ошибка компонента:</strong> ${t}<br>
          Компонент не найден в components.js
        </div>
      `)}setupObserver(){new MutationObserver(t=>{let s=!1;t.forEach(n=>{n.addedNodes.length&&n.addedNodes.forEach(a=>{a.nodeType===1&&a.querySelectorAll&&a.querySelectorAll("[data-component]").length>0&&(s=!0)})}),s&&(console.log("🔍 Обнаружены новые компоненты, загружаю..."),this.loadAllComponents())}).observe(document.body,{childList:!0,subtree:!0})}}document.addEventListener("DOMContentLoaded",()=>{new P().init()});console.log("🎯 Starting App...");console.log("✅ SCSS styles imported");const A=r.getRawData();Object.keys(A).length===0?(console.log("📦 Память пуста, записываю начальные данные..."),r.saveData(E)):console.log("📦 Данные уже есть в памяти, загружаю...");console.log("✅ Components loader imported");console.log("🚀 All modules loaded - waiting for components...");console.log("📦 Доступные компоненты:",Object.keys(u));console.log("📅 Данные за май 2026:",r.getMonthData("2026-4"));document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){console.log("Инициализирую обработчики событий интерфейса..."),D(),C()},0)});
