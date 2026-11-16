(() => {
 const $=s=>document.querySelector(s);
 const key='duv-demo-personal-v1';
 const defaults={name:'Alumna Demo',email:'alumna@example.com',avatar:'AD',role:'Otro perfil',compact:false,news:false,read:[]};
 let profile={...defaults};
 try{profile={...defaults,...JSON.parse(localStorage.getItem(key))};}catch{}
 const save=()=>{try{localStorage.setItem(key,JSON.stringify(profile));}catch{}};
 const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const panel=()=>$('#campus-services');
 const today=new Date();
 const dateIn=days=>new Date(today.getFullYear(),today.getMonth(),today.getDate()+days);
 const events=[
  {date:dateIn(3),type:'Clase síncrona',title:'Clase teórica 3',course:'Bienestar digital en el aula',body:'10:00 · Aula virtual de ejemplo'},
  {date:dateIn(7),type:'Seminario',title:'Seminario de mediación educativa',course:'Convivencia y prevención de violencias',body:'17:00 · Sesión virtual de ejemplo'},
  {date:dateIn(12),type:'Examen',title:'Evaluación de la unidad 2',course:'Diálogo afectivo-sexual con familias',body:'16:00 · Examen presencial de ejemplo'},
  {date:dateIn(25),type:'Clase presencial',title:'Taller de aplicación',course:'Bienestar digital en el aula',body:'11:00 · Sesión presencial de ejemplo'}
 ];
 const messages=[
  {id:'welcome',title:'Bienvenida al campus',sender:'Equipo de formación (demo)',body:'Consulta el itinerario y abre la Unidad 4 para empezar.',link:'#/campus/curso'},
  {id:'practice',title:'Tu aplicación práctica',sender:'Acompañamiento docente (demo)',body:'Puedes volver a tu borrador y contrastarlo con el ejemplo de la unidad.',link:'#/campus/unidad/conversacion-educativa'}
 ];
 const eventCard=e=>`<details class="white-panel university-card"><summary><strong>${label(e.date,{day:"2-digit",month:"2-digit"})} · ${e.title}</strong> · ${e.course} · ${e.type}</summary><p>${e.body}</p></details>`;
 const unread=()=>messages.filter(m=>!profile.read.includes(m.id)).length;
 let month=new Date(today.getFullYear(),today.getMonth(),1);
 let selected=today.getDate();
 const label=(date,options)=>new Intl.DateTimeFormat('es-ES',options).format(date);
 function calendar(){
  const year=month.getFullYear(), m=month.getMonth();
  const monthly=events.filter(e=>e.date.getFullYear()===year&&e.date.getMonth()===m);
  const first=(month.getDay()+6)%7;
  const length=new Date(year,m+1,0).getDate();
  const daily=monthly.filter(e=>e.date.getDate()===selected);
  return `<p>Agenda de demostración · Los eventos son ficticios.</p><div class="white-panel university-card"><div class="actions"><button class="secondary" data-month="-1" aria-label="Mes anterior">←</button><h2>${label(month,{month:'long',year:'numeric'})}</h2><button class="secondary" data-month="1" aria-label="Mes siguiente">→</button></div><div class="calendar-grid">${['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(d=>`<strong>${d}</strong>`).join('')}${'<span></span>'.repeat(first)}${Array.from({length},(_,i)=>{const day=i+1;const has=monthly.some(e=>e.date.getDate()===day);return `<button class="secondary" data-day="${day}" aria-pressed="${day===selected}" aria-label="${label(new Date(year,m,day),{dateStyle:'long'})}${has?', con actividad':''}">${day}${has?' •':''}</button>`;}).join('')}</div></div><h2>Agenda del día ${selected}</h2>${daily.length?daily.map(eventCard).join(''):'<p>No hay actividades de ejemplo para esta fecha.</p>'}`;
 }
 function inbox(){
  return '<p>Mensajes ficticios · Bandeja de entrada</p>'+messages.map(m=>`<details class="white-panel university-card"><summary>${esc(m.title)} · <span data-read-label="${m.id}">${profile.read.includes(m.id)?'Leído':'No leído'}</span></summary><p><strong>${m.sender}</strong> · Curso de ejemplo</p><p>${m.body}</p><div class="actions"><a href="${m.link}">Abrir curso o actividad →</a><button class="secondary" data-read="${m.id}" ${profile.read.includes(m.id)?'disabled':''}>Marcar como leído</button></div></details>`).join('');
 }
 const demoPortrait='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><rect width="160" height="160" fill="#dcebe4"/><circle cx="80" cy="65" r="36" fill="#263e39"/><path d="M20 160c4-37 30-54 60-54s56 17 60 54" fill="#477d74"/><path d="M70 85h20v24q-10 14-20 0" fill="#bd7858"/><ellipse cx="80" cy="70" rx="26" ry="31" fill="#da9876"/><path d="M52 63q16-1 27-22 10 19 29 21-3-34-28-34T52 63" fill="#263e39"/><circle cx="71" cy="69" r="2" fill="#263e39"/><circle cx="89" cy="69" r="2" fill="#263e39"/><path d="M74 83q6 5 12 0" fill="none" stroke="#753d32" stroke-width="2"/></svg>');
 function profileForm(){
  return `<div class="duv-profile-layout"><form id="demo-personal-form" class="white-panel university-card profile-form"><p>Usa datos ficticios. Los cambios se guardan en este navegador.</p>
  <label>Nombre visible<input name="name" required maxlength="50" value="${esc(profile.name)}"></label>
  <label>Correo ficticio<input name="email" type="email" required maxlength="100" value="${esc(profile.email)}"></label>
  <label>Avatar (iniciales)<input name="avatar" required maxlength="3" value="${esc(profile.avatar)}"></label>
  <label>Perfil declarado<select name="role">${['Profesional educativo','Profesional sanitario','Otro perfil'].map(r=>`<option ${r===profile.role?'selected':''}>${r}</option>`).join('')}</select></label>
  <fieldset><legend>Preferencias</legend><label><input type="checkbox" name="compact" ${profile.compact?'checked':''}> Vista compacta</label><label><input type="checkbox" name="news" ${profile.news?'checked':''}> Mostrar avisos destacados en Inicio</label></fieldset>
  <button class="primary">Guardar perfil de demo</button><p role="status" id="demo-profile-status"></p></form>  <aside class="white-panel university-card duv-profile-photo" aria-label="Tarjeta de perfil"><span id="duv-photo-preview"><img alt="Retrato del perfil" src="${esc(profile.photo||demoPortrait)}"></span><small>${esc(profile.name)}</small><label>Imagen de usuario<input name="photo" form="demo-personal-form" type="file" accept="image/png,image/jpeg,image/webp"></label><small>Imagen de demo · Máximo 500 KB</small></aside></div>`;
 }
 const support=`<p>Soporte técnico de demostración</p><details class="white-panel university-card"><summary>¿Cómo retomo la Unidad 4?</summary><p>Usa Continuar aprendiendo en Inicio. El avance se conserva en este navegador.</p></details><details class="white-panel university-card"><summary>¿Dónde encuentro el certificado?</summary><p>El modelo imprimible está en <a href="#/campus/certificados">Certificados</a>.</p></details><form id="demo-support-form" class="white-panel university-card profile-form"><label>Motivo<select required name="topic"><option value="">Selecciona un motivo</option><option>Acceso</option><option>Progreso</option><option>Certificado</option></select></label><label>Describe una incidencia ficticia<textarea required maxlength="600" rows="4"></textarea></label><button class="primary">Probar consulta técnica</button><p role="status" id="demo-support-status"></p></form>`;
 const management=`<p class="eyebrow">Formador/a · Vista de demostración</p><h1>Gestión formativa</h1><p>Escritorio ilustrativo para el equipo de formación. Todos los datos son ficticios.</p>
 <div class="university-kpis">${[['Alumnado activo',48],['Cursos gestionados',3],['Inscripciones de ejemplo',56],['Actividades por revisar',12]].map(([name,value])=>`<article class="white-panel university-card"><span>${name}</span><strong>${value}</strong><small>Datos de demostración</small></article>`).join('')}</div>
 <div class="management-grid"><article class="white-panel university-card"><h2>Seguimiento por grupo</h2>${[['Docentes',72],['Intervención socioeducativa',54],['Orientación',86]].map(([name,value])=>`<p>${name} · ${value} %</p><progress max="100" value="${value}" aria-label="${name}"></progress>`).join('')}<p class="small">Avance ilustrativo · Grupos ficticios</p></article>
 <article class="white-panel university-card"><h2>Revisión y materiales</h2><ul><li>8 intervenciones prácticas por revisar</li><li>4 evaluaciones de ejemplo por comentar</li><li>6 materiales educativos de referencia</li></ul><p class="eyebrow">Funcionalidad prevista</p></article></div>
 <article class="white-panel university-card"><h2>Cursos y unidades</h2><div class="management-table"><table><thead><tr><th scope="col">Curso de ejemplo</th><th scope="col">Inscripciones</th><th scope="col">Unidades</th><th scope="col">Estado</th></tr></thead><tbody><tr><th scope="row">Educación sexual digital</th><td>24</td><td>1 de 5 disponibles</td><td><span class="management-badge">En curso</span></td></tr><tr><th scope="row">Bienestar digital</th><td>18</td><td>3 previstas</td><td><span class="management-badge">Preparación</span></td></tr><tr><th scope="row">Convivencia educativa</th><td>14</td><td>4 previstas</td><td><span class="management-badge">Planificado</span></td></tr></tbody></table></div></article>
 <div class="management-grid"><article class="white-panel university-card"><h2>Calendario formativo</h2><p>Revisión de casos · Grupo Docentes</p><p>Preparación de materiales · Grupo Orientación</p><p class="eyebrow">Agenda ilustrativa</p></article><article class="white-panel university-card"><h2>Comunicaciones con grupos</h2><p>Aviso de actividad · Grupo Docentes</p><p>Resumen de avance · Grupo Orientación</p><p class="eyebrow">Funcionalidad prevista</p></article></div>`;
 function updateHeader(){
  const header=$('#campus-user');
  header.innerHTML=`<a class="campus-alerts" href="#/campus/buzon">Notificaciones <span>${unread()}</span></a><details><summary><span class="campus-avatar">${profile.photo?`<img alt="" src="${esc(profile.photo)}">`:esc(profile.avatar)}</span> ${esc(profile.name)}</summary><div class="campus-user-menu"><a href="#/campus/perfil">Mi perfil</a><a href="#/campus/preferencias">Preferencias</a><a href="#/campus/ayuda">Ayuda</a><button class="secondary" data-study-logout>Cerrar sesión de demo</button></div></details>`;
  $('.shell').classList.toggle('campus-compact',profile.compact);
 }
 function render(path){
  updateHeader();
  const section=path.split('/')[1];
  if(section==='gestion'){$('#campus-user').innerHTML='<span>Formador/a · Demo</span>';panel().innerHTML=management;return;}
  const body=section==='calendario'?calendar():section==='buzon'?inbox():['perfil','preferencias'].includes(section)?profileForm():section==='ayuda'?support:null;
  if(body)panel().insertAdjacentHTML('beforeend',`<div id="campus-service-body">${body}</div>`);
  if(['anuncios','eventos'].includes(section))panel().insertAdjacentHTML('beforeend',`<p>Próximos 14 días · Agenda ficticia de tus cursos</p><div>${events.filter(e=>e.date<dateIn(14)).map(eventCard).join('')}</div><a href="#/campus/calendario">Ver todas las fechas en el calendario →</a>`);

 }
 panel().addEventListener('click',event=>{
  const day=event.target.closest('[data-day]'), move=event.target.closest('[data-month]');
  if(day||move){
   if(move){month=new Date(month.getFullYear(),month.getMonth()+Number(move.dataset.month),1);selected=1;}else selected=Number(day.dataset.day);
   const body=$('#campus-service-body');body.innerHTML=calendar();
   (day?body.querySelector('[aria-pressed="true"]'):body.querySelector('[data-month="'+move.dataset.month+'"]')).focus();
  }
  const button=event.target.closest('[data-read]');
  if(button&&!profile.read.includes(button.dataset.read)){
   profile.read.push(button.dataset.read);save();
   button.closest('details').querySelector('[data-read-label]').textContent='Leído';
   button.disabled=true;updateHeader();
  }
 });
 panel().addEventListener('submit',async event=>{
  if(event.target.id==='demo-personal-form'){
   event.preventDefault();
   const form=event.target,data=new FormData(form);
   for(const field of ['name','avatar']){
    if(!data.get(field).trim()){form.elements[field].focus();$('#demo-profile-status').textContent='Completa el nombre y las iniciales.';return;}
   }
   const photo=form.elements.photo.files[0];
   if(photo){
    if(photo.size>500000||!['image/png','image/jpeg','image/webp'].includes(photo.type)){
     $('#demo-profile-status').textContent='Elige una imagen PNG, JPEG o WebP de hasta 500 KB.';return;
    }
    try{
     profile.photo=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(photo);});
    }catch{const status=$('#demo-profile-status');if(status)status.textContent='No se pudo leer la imagen.';return;}
   }
   for(const field of ['name','email','avatar','role'])profile[field]=data.get(field).trim();
   profile.compact=data.has('compact');profile.news=data.has('news');save();updateHeader();
   if(panel().contains(form)){form.closest(".duv-profile-layout").outerHTML=profileForm();$('#demo-profile-status').textContent='Perfil de demostración guardado.';}
  }
  if(event.target.id==='demo-support-form'){
   event.preventDefault();event.target.reset();$('#demo-support-status').textContent='Consulta de prueba completada. No se ha enviado ningún mensaje.';
  }
 });
 window.campusServices={render};
})();
