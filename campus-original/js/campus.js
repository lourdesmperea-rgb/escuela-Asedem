(() => {
 'use strict';
 const sessionKey='duv-campus-demo';
 let access=false;
 let requestedCampusPath;
 const url=new URL(location.href);
 const fromMemberArea=url.searchParams.get('acceso')==='socio';
 try{
  access=sessionStorage.getItem(sessionKey)==='1';
  if(fromMemberArea&&sessionStorage.getItem('asedem-demo-session')==='active'){
   access=true;
   sessionStorage.setItem(sessionKey,'1');
  }
 }catch{}
 if(fromMemberArea){
  url.searchParams.delete('acceso');
  history.replaceState(null,'',url);
 }
 const $=selector=>document.querySelector(selector);
 const course=window.campusCourse;
 const demoCourses=[
  {id:'bienestar',title:'Bienestar digital en el aula',progress:65,time:95,activities:4,result:83,next:'Actividad 5 · Analizar hábitos digitales'},
  {id:'convivencia',title:'Convivencia y prevención de violencias',progress:40,time:60,activities:2,result:75,next:'Unidad 3 · Acuerdos de convivencia'},
  {id:'dialogo',title:'Diálogo afectivo-sexual con familias',progress:20,time:35,activities:1,result:80,next:'Actividad 2 · Preparar una conversación'}
 ];
 function renderExample(id,resume){
  const item=demoCourses.find(course=>course.id===id);
  if(!item)return false;
  $('#campus-services').innerHTML=`<a href="${campusHref}">← Mis cursos</a><p class="eyebrow">Curso ficticio · Vista ilustrativa</p><h1>${item.title}</h1><article class="white-panel university-card"><h2>${resume?'Punto de reanudación':'Menú del curso'}</h2><p>${item.next}</p><p>${item.progress} % de avance simulado</p><progress max="100" value="${item.progress}" aria-label="Avance simulado"></progress><p>La Unidad 4 de Pornografía, adolescencia y educación sexual digital es la experiencia interactiva de esta demo.</p>${resume?'':`<a class="primary" href="#/campus/ejemplo/${id}/continuar">Continuar</a>`}</article>`;
  return true;
 }
 const campusHref='#/campus/mis-cursos';
 const courseHref='#/campus/curso';
 const unitHref='#/campus/unidad/conversacion-educativa';
 function enter(href=requestedCampusPath||campusHref){
  requestedCampusPath=undefined;
  access=true;
  try{sessionStorage.setItem(sessionKey,'1');}catch{}
  $('#campus-login-form').reset();
  $('#campus-password').type='password';
  $('#toggle-campus-password').textContent='Mostrar';
  $('#toggle-campus-password').setAttribute('aria-pressed','false');
  location.hash=href;
 }
 const list=items=>`<ul>${items.map(item=>`<li>${item}</li>`).join('')}</ul>`;
 const units=course.modules.map((module,index)=>({
  number:index+1,
  title:module.appliedTitle||module.title,
  ...(module.appliedTitle?{
   path:unitHref.slice(2),
   view:"unidad",
   render:moment=>window.unitExperience.open(moment),
   progress:()=>{
    const state=window.unitExperience.progress();
    return {done:state.activityCount+Number(state.finished),total:5,finished:state.finished,started:state.started,moment:state.moment,criterion:"Cuatro actividades y cierre de la unidad"};
   }
  }:{
   path:`campus/unidad/${index+1}`,
   view:'unidad-multiformato',
   render:()=>window.learningUnits.render(index+1,`campus/unidad/${index+1}`),
   progress:()=>window.learningUnits.progress(index+1)
  })
 }));
 function canOpen(unit){
  return unit.view==='unidad'||units.slice(0,unit.number-1).every(previous=>previous.progress().finished);
 }
 function courseProgress(){
  return {done:units.filter(unit=>unit.progress().finished).length,total:units.length};
 }
 const statusFor=state=>state.finished?'Completada':state.started?'En curso':'Disponible';
 function courseLayout(content,currentPath){
  const entries=units.map(unit=>({unit,state:unit.progress?.()}));
  const finished=entries.filter(({state})=>state?.finished).length;
  const meter=(label,value,total,note)=>`<div class="course-meter"><p><strong>${label} · ${Math.round(100*value/total)} %</strong></p><progress max="${total}" value="${value}" aria-label="${label}"></progress><p class="small">${note}</p></div>`;
  const current=entries.find(({unit})=>unit.path&&unit.path===currentPath);
  const links=entries.map(({unit,state})=>{
   const unlocked=canOpen(unit);
   const label=`Unidad ${unit.number}`;
   const classes=`course-unit-link${state?.started?' visited':''}`;
   const description=unlocked?statusFor(state):'Completa las unidades anteriores';
   return `<li>${unlocked?`<a class="${classes}" href="#/${unit.path}" ${current?.unit===unit?'aria-current="page"':''}>${label}</a>`:`<span class="${classes}" aria-disabled="true" title="${description}" aria-label="${label} · ${description}">${label}</span>`}</li>`;
  }).join('');
  return `<div class="course-workspace"><div class="course-campus-control"><button type="button" class="secondary" data-campus-menu aria-controls="campus-sidebar" aria-expanded="false">Campus</button></div><header class="course-page-header"><div class="course-title-row"><h1>${course.title}</h1><a class="secondary course-icon" href="${campusHref}" aria-label="Cerrar curso">×</a></div>${meter('Progreso global del curso',finished,units.length,`${finished} de ${units.length} unidades finalizadas`)}</header>
  <nav class="course-unit-sidebar" aria-label="Unidades del curso"><ol>${links}</ol></nav><div class="course-workspace-content ${current?'course-unit-content':''}">${current?`<h2 class="course-unit-title">Unidad ${current.unit.number} · ${current.unit.title}</h2>${meter('Progreso de la unidad',current.state.done,current.state.total,current.state.criterion)}`:''}${content}</div></div>`;

 }
 function render(view){
  const next=units.find(item=>canOpen(item)&&!item.progress().finished)||units[0];
  const totals=courseProgress();

  if(view==='campus'){
   const percent=Math.round(100*totals.done/totals.total);
   $('#campus').innerHTML=`<p class="eyebrow">Campus · Matrículas de demostración</p><h1>Mis cursos</h1><p>Consulta el avance de cada formación y retoma la actividad pendiente.</p><div class="duv-course-grid"><article class="white-panel university-card"><h2>${course.title}</h2><p>${totals.done} de ${totals.total} unidades finalizadas</p><progress max="100" value="${percent}" aria-label="Avance del curso"></progress><div class="actions"><a class="primary" href="#/${next.path}">${totals.done===totals.total?"Revisar curso":`Continuar · Unidad ${next.number}`}</a><a class="secondary" href="${courseHref}">Menú del curso</a></div></article>${demoCourses.map(item=>`<article class="white-panel university-card"><p class="eyebrow">Curso ficticio</p><h2>${item.title}</h2><p>${item.progress} % de avance simulado</p><progress max="100" value="${item.progress}" aria-label="Avance de ${item.title}"></progress><div class="actions"><a class="primary" href="#/campus/ejemplo/${item.id}/continuar">Continuar</a><a class="secondary" href="#/campus/ejemplo/${item.id}">Menú del curso</a></div></article>`).join('')}</div>`;
   return;
  }
  $('#campus-curso').innerHTML=courseLayout(`<nav class="breadcrumb" aria-label="Ruta de navegación"><a href="${campusHref}">Volver a Mis cursos</a></nav>
  <section class="white-panel study-panel"><h2>Qué aprenderás</h2><p>${course.description}</p><p><strong>Dirigido a.</strong> ${course.audience}</p>${list(course.objectives)}<h3>Resultados de aprendizaje</h3>${list(course.outcomes)}<a href="#/campus/materiales">Consultar materiales del curso →</a></section>`);

 }
 window.campusExperience={hasAccess:()=>access,requireDemoAccess(path){requestedCampusPath='#/'+path;location.replace('#/campus');},render,courseLayout,courseProgress,canOpen,unitFor:path=>units.find(unit=>unit.path===path),demoCourses,renderExample,courseTitle:course.title};
 document.addEventListener('click',event=>{
  const jump=event.target.closest('[data-study-jump]');
  if(jump){
   const target=document.getElementById(jump.dataset.studyJump);
   target.focus({preventScroll:true});
   target.scrollIntoView({block:'start',behavior:'instant'});
  }
  if(event.target.closest('[data-study-logout]')){
   access=false;
   try{sessionStorage.removeItem(sessionKey);}catch{}
   location.hash='/campus';
  }
  if(event.target.closest('[data-study-reset]')){
   $('#dialog-content').innerHTML='<h2 id="dialog-title">¿Reiniciar el progreso de la demo?</h2><p>Se borrarán las decisiones, la evaluación y el borrador de la Unidad 4 de este navegador.</p><div class="actions"><button class="secondary" type="button" data-close autofocus>Cancelar</button><button class="primary" type="button" data-study-confirm>Reiniciar progreso</button></div>';
   $('#demo-dialog').showModal();
  }
  if(event.target.closest('[data-study-confirm]')){
   window.unitExperience.reset();
   window.campusDashboard.resetTime();
   $('#demo-dialog').close();
   window.campusDashboard.render('campus/progreso');
   $('#campus-services h1').tabIndex=-1;
   $('#campus-services h1').focus();
  }
 });
 $('#campus-login-form').addEventListener('submit',e=>{e.preventDefault();if(!e.currentTarget.checkValidity()){e.currentTarget.reportValidity();return;}enter();});
 $('#campus-demo-access').addEventListener('click',()=>enter());
 $('#toggle-campus-password').addEventListener('click',()=>{const field=$('#campus-password'),shown=field.type==='password';field.type=shown?'text':'password';$('#toggle-campus-password').textContent=shown?'Ocultar':'Mostrar';$('#toggle-campus-password').setAttribute('aria-pressed',String(shown));});
 $('#campus-forgot-password').addEventListener('click',()=>{const dialog=$('#demo-dialog');$('#dialog-content').innerHTML='<h2 id="dialog-title">Recuperar contraseña</h2><p>En el campus real, aquí podrías solicitar un enlace para restablecer tu contraseña.</p><p>Esta demo no tiene cuentas ni envía correos electrónicos.</p><button class="primary" id="close-campus-recovery">Volver al inicio de sesión</button>';dialog.showModal();$('#close-campus-recovery').addEventListener('click',()=>dialog.close());});
})();
