(() => {
 const nav=document.querySelector('#campus-sidebar');
 const panel=document.querySelector('#campus-services');
 const timeKey='duv-demo-study-time';
 let time={unidad:0,recursos:0,conexion:0};
 try{
  const saved=JSON.parse(localStorage.getItem(timeKey));
  for(const key of Object.keys(time))if(Number.isFinite(saved?.[key])&&saved[key]>=0)time[key]=saved[key];
 }catch{}
 const pages=[
  ['campus/perfil','Mi perfil','◉'],['campus/mis-cursos','Mis cursos','▤'],['campus/progreso','Mi progreso','▥'],
  ['campus/calendario','Calendario','▦'],['campus/certificados','Certificados','◇'],['campus/buzon','Mensajes','✉'],
  ['campus/anuncios','Anuncios y eventos','◎'],['campus/eventos','Eventos','▦'],['campus/preferencias','Preferencias','⚙'],['campus/ayuda','Ayuda y soporte','?'],['campus/gestion','Gestión formativa','▥']
 ];
 const sections={
  certificados:`<p>Consulta un modelo de documento para la presentación de la escuela.</p><article class="white-panel university-card certificate-preview"><div class="eyebrow">Modelo · Sin validez acreditativa</div><h2>Certificado de finalización</h2><p>Alumna Demo · Pornografía, adolescencia y educación sexual digital</p><a class="primary" href="certificado-demo.html" target="_blank" rel="noopener noreferrer">Abrir certificado de ejemplo ↗</a></article>`
 };
 function duration(seconds){
  const minutes=Math.floor(seconds/60);
  return minutes?Math.floor(minutes/60)+' h '+minutes%60+' min':Math.floor(seconds)+' s';
 }
 function updateTime(){
  for(const node of document.querySelectorAll('[data-study-time]')){
   const key=node.dataset.studyTime;
   node.textContent=duration(key==='total'?time.unidad+time.recursos:time[key]);
  }
  const total=time.unidad+time.recursos;
  for(const bar of document.querySelectorAll('[data-study-bar]'))bar.value=total?100*time[bar.dataset.studyBar]/total:0;
 }
 let previous=performance.now();
 setInterval(()=>{
  const now=performance.now();
  const seconds=Math.min(5,(now-previous)/1000);
  previous=now;
  if(document.hidden||!window.campusExperience.hasAccess())return;
  const path=location.hash.slice(2);
  const key=path.startsWith('campus/unidad/')?'unidad':path==='campus/materiales'?'recursos':null;
  if(!path.startsWith('campus/')||path==='campus/gestion')return;
  time.conexion+=seconds;
  if(key)time[key]+=seconds;
  try{localStorage.setItem(timeKey,JSON.stringify(time));}catch{}
  updateTime();
 },2000);
 function dashboard(){
  const course=window.campusExperience.courseProgress();
  const state=window.unitExperience.progress();
  const result=state.score===null?'Pendiente':state.score+' de 3';
  const scores=state.scores.length?state.scores:[1,3];
  const evolution=scores.map((score,index)=>{
   const label=index?'Último intento':'Primer intento';
   return `<p>${label} · ${score} de 3</p><progress max="3" value="${score}" aria-label="${label}"></progress>`;
  }).join('');
  return `<section class="university-dashboard" aria-label="Indicadores de progreso">

   <div class="university-kpis">
    <div class="white-panel university-card"><span>Unidades finalizadas</span><strong>${course.done} / ${course.total}</strong><small>Progreso global del curso</small></div>
    <div class="white-panel university-card"><span>Actividades realizadas</span><strong>${state.activityCount} / 4</strong><small>Unidad 4 · experiencia disponible</small></div>
    <div class="white-panel university-card"><span>Resultado de la evaluación</span><strong>${result}</strong><small>Decisiones alineadas con los criterios</small></div>
    <div class="white-panel university-card"><span>Tiempo en el campus</span><strong data-study-time="conexion">${duration(time.conexion)}</strong><small>Tiempo estimado con el campus del alumnado visible</small></div>
   </div>
   <div class="university-charts">
    <article class="white-panel university-card"><h3>Seguimiento</h3><p>Momentos visitados · ${state.visitedCount} de 6</p><progress max="6" value="${state.visitedCount}" aria-label="Momentos visitados"></progress><p>Actividades realizadas · ${state.activityCount} de 4</p><progress max="4" value="${state.activityCount}" aria-label="Actividades realizadas"></progress><p class="small">Hito de aprendizaje · ${state.finished?'Unidad interactiva completada':'Completa la Unidad 4 para alcanzar este hito'}.</p></article>
    <article class="white-panel university-card"><h3>Tiempo por espacio</h3><p>Unidades del curso · <strong data-study-time="unidad"></strong></p><progress max="100" data-study-bar="unidad" aria-label="Proporción de tiempo en las unidades"></progress><p>Materiales del curso · <strong data-study-time="recursos"></strong></p><progress max="100" data-study-bar="recursos" aria-label="Proporción de tiempo en materiales"></progress><p class="small">Estimación local mientras la pestaña está visible.</p></article>
    <article class="white-panel university-card"><h3>Evolución del resultado</h3><p class="eyebrow">${state.scores.length?'Resultados de esta demo':'Ejemplo ilustrativo · Datos ficticios'}</p>${evolution}</article>
   </div>
  </section>`;
 }
 function courseProgress(){
  return `<section class="study-panel"><h2>Avance por curso</h2><p>Los tres cursos adicionales muestran cifras ficticias. El tiempo de la experiencia interactiva es una estimación local.</p><div class="white-panel university-card"><h3>${window.campusExperience.courseTitle}</h3><p>Tiempo en las unidades y materiales · <strong data-study-time="total"></strong></p></div><div class="duv-course-grid">${window.campusExperience.demoCourses.map(item=>`<article class="white-panel university-card"><h3>${item.title}</h3><p>Tiempo de ejemplo · ${item.time} min</p><progress max="120" value="${item.time}" aria-label="Tiempo de ejemplo en minutos"></progress><p>${item.activities} actividades · Resultado de ejemplo ${item.result} %</p></article>`).join('')}</div><button class="secondary" data-study-reset>Reiniciar progreso de la demo</button></section>`;
 }
 function render(path){
  const management=path==='campus/gestion';
  const active=pages.find(([href])=>href===path)?.[0]||(path.startsWith('campus/unidad/')||path==='campus/curso'||path.startsWith('campus/ejemplo/')?'campus/mis-cursos':'');
  nav.innerHTML=`<div class="university-sidebar-title"><strong>Campus DUV</strong><small>Entorno privado de demo</small></div><div id="university-menu"><nav aria-label="Navegación del campus">${management?'<p class="management-menu">Resumen de gestión<br>Alumnado y cursos<br>Inscripciones<br>Materiales y revisión<br>Calendario y comunicaciones</p>':pages.filter(([href])=>!['campus/gestion','campus/preferencias','campus/eventos'].includes(href)).map(([href,title,icon])=>`<a href="#/${href}" ${href===active?'aria-current="page"':''}><span aria-hidden="true">${icon}</span>${title}</a>`).join('')}</nav><label for="campus-demo-profile">Modo de demostración</label><select id="campus-demo-profile"><option value="alumnado">Alumnado</option><option value="profesional">Profesional de gestión formativa</option></select><a class="university-public" href="#/">← Ir a la web pública</a></div>`;
  nav.querySelector('select').value=management?'profesional':'alumnado';
  const key=path.split('/')[1];
  const page=pages.find(([href])=>href===path);
  if(page&&!['mis-cursos','curso','materiales'].includes(key))panel.innerHTML=`<p class="eyebrow">Campus · Demostración</p><h1>${page[1]}</h1>${key==='progreso'?dashboard()+courseProgress():sections[key]||''}`;

  updateTime();
 }
 nav.addEventListener('change',event=>{
  if(event.target.id!=='campus-demo-profile')return;
  location.hash=event.target.value==='profesional'?'/campus/gestion':'/campus/mis-cursos';
 });
 window.campusDashboard={render,resetTime(){
  time={unidad:0,recursos:0,conexion:0};
  try{localStorage.removeItem(timeKey);}catch{}
 }};
})();
