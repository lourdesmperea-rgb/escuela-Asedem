(() => {
 'use strict';
 const {courses,resources}=window.schoolData;
 const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
 const scene=(n,label='')=>`<div class="scene scene-${n}" ${label?`role="img" aria-label="${label}"`:'aria-hidden="true"'}></div>`;
 const resourceCards=()=>resources.map(r=>`<article class="resource-card"><div class="resource-photo" aria-hidden="true">${window.schoolPhotos.image(r.art)}<span class="play">▶</span></div><div class="resource-content"><span class="tag">Vídeo abierto</span><h3>${r.title}</h3><a href="https://www.daleunavuelta.org/videos/" target="_blank" rel="noopener noreferrer" aria-label="Ver ${r.title} en la biblioteca oficial">Ver en la web oficial ↗</a></div></article>`).join('');
 $$('[data-resources]').forEach(el=>el.innerHTML=resourceCards());
 function renderCourse(c){
 if(c.detailExperience){window.coursePage.render(c);return;}
 $('#ficha').classList.remove('complete-course');
 $('#ficha').innerHTML=`<nav class="breadcrumb" aria-label="Ruta de navegación"><a href="#/">Inicio</a> / <a href="#/formacion">Formación</a> / <span aria-current="page">${c.title}</span></nav><div class="hero course-hero"><div><div class="eyebrow">${c.audience}</div><h1>${c.title}</h1><p>${c.description}</p>${c.demo?'<p class="note">Propuesta de ejemplo para la demo. Programa y condiciones orientativos; no es una oferta comercial vigente.</p>':''}</div>${window.catalogExperience.photo(c)}</div><div class="block detail-layout"><div>${c.objectives.length?`<h2>Qué aprenderás</h2><ul class="checklist">${c.objectives.map(s=>`<li>${s}</li>`).join('')}</ul>`:''}<div class="block"><h2>Programa del curso</h2>${c.program.length?c.program.map(([title,topics],i)=>`<details ${i===0?'open':''}><summary>${title}</summary><ul>${topics.map(t=>`<li>${t}</li>`).join('')}</ul></details>`).join(''):'<p>El programa específico de esta versión se incorporará tras contrastar su ficha oficial. No se reutiliza el temario de la versión para educadores.</p>'}</div></div><aside class="summary-card" aria-label="Resumen del curso"><h2>Tu formación, de un vistazo</h2><ul>${c.facts.map(f=>`<li>${f}</li>`).join('')}</ul><button class="primary" data-enroll="${c.id}">Ver acceso individual →</button><p class="small">Recorrido simulado. No se realizan pagos ni matrículas.</p>${c.source?`<a href="${c.source}" target="_blank" rel="noopener noreferrer">Consultar información oficial ↗</a>`:'<p class="small">Esta propuesta no tiene una ficha oficial publicada.</p>'}</aside></div>${c.authors?`<div class="block authors"><h2>Quiénes lo han desarrollado</h2><p>${c.authors}</p></div>`:''}<div class="block"><h2>Recursos para empezar</h2><div class="resource-grid">${resourceCards()}</div></div><div class="block resource-strip"><div><h2>Accede a más recursos gratuitos</h2><p>Consulta materiales abiertos y, si te interesa, elige recibir novedades por correo.</p></div><button class="primary" data-register>Consultar recurso gratuito →</button></div>`;
 }
 const routes={'':'inicio','formacion':'catalogo','formacion/profesionales':'catalogo','formacion/tema/educacion-afectivo-sexual':'catalogo','formacion/tema/prevencion-pornografia':'catalogo','formacion/tema/prevencion-violencias':'catalogo','formacion/tema/bienestar-digital':'catalogo','colabora-como-docente':'docentes','recursos':'recursos','comunidad':'comunidad','centros-y-entidades':'centros','campus':'campus-login','campus/mis-cursos':'campus','campus/curso':'campus-curso','campus/materiales':'campus-materiales','landing':'landing','la-escuela':'escuela'};
 function route(){
 const path=location.hash.replace(/^#\/?/,'').replace(/\/$/,'');
 const legacyRoutes={'servicios':'centros-y-entidades','para-centros':'centros-y-entidades','para-profesionales':'colabora-como-docente','comunidad/para-ti':'comunidad','comunidad/profesionales':'comunidad','curso/trabajo-red-clinica':'curso/trabajo-red-educativa'};
 if(legacyRoutes[path]){location.replace('#/'+legacyRoutes[path]);return;}
 if(path.startsWith('campus/')&&!window.campusExperience.hasAccess()){window.campusExperience.requireDemoAccess(path);return;}
 const serviceTitles={'progreso':'Mi progreso','certificados':'Certificados','buzon':'Buzón','anuncios':'Anuncios','eventos':'Eventos','calendario':'Calendario','perfil':'Mi perfil','preferencias':'Preferencias','ayuda':'Ayuda y soporte','gestion':'Gestión formativa'};
 const service=path.startsWith('campus/')&&Object.hasOwn(serviceTitles,path.slice(7))?serviceTitles[path.slice(7)]:null;
 const example=path.match(/^campus\/ejemplo\/([a-z]+)(\/continuar)?$/);
 let view=service?'campus-services':routes[path];let title=service||'';
 if(example&&window.campusExperience.renderExample(example[1],Boolean(example[2]))){view='campus-services';title='Curso de ejemplo';}
 const momentRoute=path.match(/^(.+)\/momento\/([1-6])$/);
 const unit=window.campusExperience.unitFor(momentRoute?.[1]||path);
 if(unit&&!window.campusExperience.canOpen(unit)){location.replace('#/campus/curso');return;}
 if(unit){
  if(momentRoute)history.replaceState(null,'','#/'+unit.path);
  view=unit.view;title=unit.title;
 }
 if(view==='campus-login'&&window.campusExperience.hasAccess()){location.replace('#/campus/mis-cursos');return;}
 if(view==='campus'||view==='campus-curso')window.campusExperience.render(view);
 if(view==='campus-curso')title='Mi curso';
 if(path.startsWith('inscripcion/')){
  view=window.enrolmentExperience.render(path.slice('inscripcion/'.length));
  if(!view)return;
  if(view==='inscripcion')title='Inscripción simulada';
 }

 if(path==='formacion/profesionales')window.catalogExperience.selectAudience('Profesionales');
 const themeRoutes={'formacion/tema/educacion-afectivo-sexual':'Educación afectivo-sexual','formacion/tema/prevencion-pornografia':'Prevención del consumo de pornografía','formacion/tema/prevencion-violencias':'Prevención de violencias','formacion/tema/bienestar-digital':'Bienestar digital'};
 if(themeRoutes[path])window.catalogExperience.selectArea(themeRoutes[path]);
 if(path==='recursos/confirmacion'){location.replace('#/recurso/conversaciones-sexualidad-digital');return;}
 if(path.startsWith('recurso/')&&window.resourceExperience.detail(path.slice('recurso/'.length)))view='recurso-registro';
 document.querySelector('.shell').classList.toggle('resource-mode',['recursos','recurso-registro'].includes(view));
 if(path.startsWith('curso/')){const c=courses.find(c=>c.id===path.slice(6));if(c){renderCourse(c);view='ficha';title=c.title;}}
 view=view||'not-found';
 $('.shell').classList.toggle('home-mode',view==='inicio');
 $('.shell').classList.toggle('campaign-mode',view==='landing');
 $('.shell').classList.remove('home-header-compact');
 $('#header-mission').hidden=view!=='inicio';
 $$('.view').forEach(el=>el.hidden=el.id!==view);
 const privateCampus=['campus','campus-curso','campus-materiales','unidad','unidad-multiformato','campus-services'].includes(view);
 $('.shell').classList.toggle('private-campus',privateCampus);
 $('.shell').classList.toggle('professional-campus',privateCampus&&path==='campus/gestion');
 const courseView=view==='campus-curso'||view==='unidad'||view==='unidad-multiformato';
 $('.shell').classList.toggle('course-mode',courseView);
 $('.shell').classList.remove('course-campus-open');
 $('#campus-sidebar').hidden=!privateCampus||courseView;
 if(unit)unit.render(momentRoute?Number(momentRoute[2])-1:undefined);
 $('#campus-user').hidden=!privateCampus;
 if(privateCampus){window.campusDashboard.render(path);window.campusServices.render(path);}
 if(courseView)$('#campus-sidebar').insertAdjacentHTML('afterbegin','<button type="button" class="secondary campus-collapse" data-campus-menu aria-controls="campus-sidebar" aria-label="Plegar menú del campus">‹ Plegar</button>');
 $$('.site-header [data-nav],.site-footer [data-nav]').forEach(a=>{const active=a.dataset.nav===(['ficha','inscripcion'].includes(view)?'catalogo':['campus-login','unidad','campus-materiales','campus-curso','campus-services'].includes(view)?'campus':view.startsWith('recurso')?'recursos':view);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 $('.site-nav').classList.remove('open');$('.menu-toggle').setAttribute('aria-expanded','false');
 document.title=`${title||({inicio:'Inicio',catalogo:'Formación',docentes:'Colabora como docente',recursos:'Recursos gratuitos',comunidad:'Comunidad gratuita',centros:'Centros y entidades',campus:'Mi campus','campus-login':'Mi campus · Iniciar sesión','recurso-registro':'Ficha del recurso','campus-materiales':'Materiales del curso',landing:'Pornografía, adolescencia y educación sexual digital · Campaña',escuela:'La escuela'}[view]||'Página no encontrada')} · Escuela Dale Una Vuelta`;
 window.scrollTo(0,0);syncCompactHeader();$('#main').focus({preventScroll:true});
 }
 window.addEventListener('hashchange',route);
 const shell=$('.shell'),header=$('.site-header'),mission=$('#header-mission');
 function syncCompactHeader(){
 const home=shell.classList.contains('home-mode'),compact=shell.classList.contains('home-header-compact');
 const next=home&&(compact?window.scrollY>8:window.scrollY>80);
 shell.classList.toggle('home-header-compact',next);
 mission.inert=next;mission.setAttribute('aria-hidden',String(next));
 }
 let headerFrame=0;
 window.addEventListener('scroll',()=>{if(headerFrame)return;headerFrame=requestAnimationFrame(()=>{headerFrame=0;syncCompactHeader();});},{passive:true});
 const headerObserver=new ResizeObserver(()=>{
 document.documentElement.style.setProperty('--header-height',header.getBoundingClientRect().height+'px');
 // Keep the home spacer at its expanded height to prevent scroll jumps.
 if(shell.classList.contains('home-mode')&&!$('.site-nav').classList.contains('open')){
 const padding=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--home-mission-padding'))||0;
 const full=$('.header-inner').getBoundingClientRect().height+$('.header-mission-content').scrollHeight+padding+1;
 document.documentElement.style.setProperty('--home-header-height',full+'px');
 }
 });
 headerObserver.observe($('.site-header'));
 const dialog=$('#demo-dialog');
 function openDialog(html){$('#dialog-content').innerHTML=html;dialog.showModal();}
 function register(){location.hash='/recurso/conversaciones-sexualidad-digital';}
 $('.dialog-close').addEventListener('click',()=>dialog.close());
 document.addEventListener('click',e=>{
 const el=e.target.closest('button,a');if(!el)return;
 if(el.hasAttribute('data-campus-menu')){
  const sidebar=$('#campus-sidebar');
  sidebar.hidden=!sidebar.hidden;
  $('.shell').classList.toggle('course-campus-open',!sidebar.hidden);
  (sidebar.hidden?$('.view:not([hidden]) [data-campus-menu]'):sidebar.querySelector('[data-campus-menu]'))?.focus();
  return;
 }
 if(el.matches('.skip')){
  e.preventDefault();
  const target=$('.view:not([hidden]) h1')||$('#main');
  target.tabIndex=-1;
  target.focus({preventScroll:true});
  target.scrollIntoView({block:'start'});
  return;
 }
 if(el.matches('.menu-toggle')){const expanded=el.getAttribute('aria-expanded')==='true';el.setAttribute('aria-expanded',!expanded);$('.site-nav').classList.toggle('open',!expanded);if(!expanded)$('.site-nav a').focus();}
 if(el.hasAttribute('data-close'))dialog.close();
 if(el.hasAttribute('data-about-demo'))openDialog('<h2 id="dialog-title">Sobre esta demo</h2><p>Prototipo de una escuela de formación especializada, recursos educativos y comunidad gratuita.</p><p>Las referencias formativas documentadas se distinguen de las propuestas de ejemplo. No se realizan pagos, crean cuentas, envían formularios a un servidor. El progreso y las preferencias de demo se guardan en este navegador.</p><p>El campus y los formularios son simulaciones. Las fotografías son ilustrativas y no representan al equipo ni a participantes reales.</p><a class="primary" href="#/la-escuela" data-close>Conocer la escuela →</a>');
 if(el.hasAttribute('data-register'))register();
 if(el.dataset.enroll){const c=courses.find(c=>c.id===el.dataset.enroll);openDialog(`<h2 id="dialog-title">Acceso individual · Demostración</h2><p>${c.title}</p><p>Dirigido a: ${c.audience}.</p><p>Cada formación tiene su propio acceso individual. Consulta las condiciones de compra o inscripción en su ficha oficial. Esta demo no cobra ni matricula.</p>${c.source?`<a class="primary" href="${c.source}" target="_blank" rel="noopener noreferrer">Consultar acceso en la web oficial ↗</a>`:'<p class="small">Formación de ejemplo: no admite inscripción real.</p>'}`);}
 if(el.dataset.view)location.hash='/'+({catalogo:'formacion',inicio:''}[el.dataset.view]??el.dataset.view);
 if(el.hasAttribute('data-acc')){const expanded=el.getAttribute('aria-expanded')==='true';el.setAttribute('aria-expanded',!expanded);el.nextElementSibling.classList.toggle('on',!expanded);}
 if(el.dataset.submit){const p=el.dataset.submit,n=$('#'+p+'-name').value.trim(),email=$('#'+p+'-email'),ok=$('#'+p+'-consent').checked;$('#'+p+'-status').textContent=!n||!email.value||!email.validity.valid?'Introduce nombre y correo válido.':!ok?'Marca la casilla de consentimiento para continuar.':'✓ Simulación completada. No se han enviado ni guardado datos.';}
 });
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('.site-nav').classList.contains('open')){$('.site-nav').classList.remove('open');$('.menu-toggle').setAttribute('aria-expanded','false');$('.menu-toggle').focus();}});
 route();
})();
