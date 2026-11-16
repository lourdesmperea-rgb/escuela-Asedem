const main=document.querySelector('main'), modal=document.querySelector('dialog');
const groups=['LGTBI+','Discapacidad','Adopción','Educación intercultural','Salud mental','Jóvenes','Sistémica','Convivencia','Género','Duelo','Altas capacidades','Autocuidado'];
const services=['Formación','Talleres','Programas para centros','Psicoterapia','Recursos','Colaboración'];
const territories=['Comunitat Valenciana, Cataluña, Aragón y Murcia'];
const seed=[
['Clara Vidal','Maestra y formadora','Alicante','Duelo','Talleres','Presencial','Profesorado'],
['Nuria Montes','Psicóloga sanitaria','Madrid','Salud mental','Psicoterapia','Online','Familias'],
['Daniel Reyes','Orientador educativo','Valencia','Convivencia','Programas para centros','Presencial','Adolescencia'],
['Irene Salas','Educadora social','Murcia','Adopción','Formación','Online','Familias'],
['Marta Soler','Pedagoga','Alicante','Altas capacidades','Recursos','Online','Infancia'],
['Álvaro Gil','Formador','Sevilla','Autocuidado','Colaboración','Online','Profesorado']
].map(([name,role,zone,area,service,mode,audience])=>({name,role,zone,area,service,mode,audience,web:'',visible:true}));
const sample={title:'Acompañar el duelo en el aula',goal:'Diseñar un taller para ayudar al profesorado a acompañar al alumnado ante una pérdida.',group:'Duelo',person:'Clara Vidal',step:'Revisar el caso práctico y acordar los materiales.',date:'',notes:'',status:'En preparación'};
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem('asedem-'+key))??fallback}catch{return fallback}};
const write=(key,value)=>localStorage.setItem('asedem-'+key,JSON.stringify(value));
let profile=read('profile',{name:'Lucía Romero',role:'Docente',zone:'Alicante',area:'Convivencia',service:'Talleres',mode:'Presencial',audience:'Profesorado',web:'',visible:false});
let projects=read('projects',[sample]);
const esc=(s='')=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>s.normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase().trim();
const people=()=>[...seed,...(profile.visible?[profile]:[])];
const options=(values,chosen='')=>values.map(v=>'<option '+(v===chosen?'selected':'')+'>'+esc(v)+'</option>').join('');
const hero=(title,copy)=>'<div class="hero"><h1>'+title+'</h1><p>'+copy+'</p></div>';
const chip=s=>'<span class="chip">'+esc(s)+'</span>';
const button=(label,attrs='',primary=false)=>'<button '+attrs+(primary?' class="primary"':'')+'>'+label+'</button>';
const footer='<footer>Prototipo de Escuela Asedem · Perfiles ficticios · Cambios guardados en este navegador</footer>';
function showDialog(html){modal.innerHTML='<div class="row between"><strong>Mi ASEDEM</strong>'+button('Cerrar','data-close')+'</div><div class="section">'+html+'</div>';if(!modal.open)modal.showModal()}
function directory(){
main.innerHTML=hero('Directorio profesional','Encuentra a personas socias por lo que hacen, con quién trabajan y dónde pueden colaborar.')+
'<div class="panel"><div class="row between"><h2>Buscar profesionales</h2>'+button('Editar mi perfil','data-page="perfil"')+'</div><form id="filters" class="filters"><label class="search">Nombre, especialidad o provincia<input name="q" type="search" placeholder="Ej. duelo, Alicante"></label>'+
[['service','Qué buscas',services],['area','Área de trabajo',groups],['zone','Provincia',[...new Set(people().map(p=>p.zone))].sort()],['mode','Modalidad',['Presencial','Online','Mixta']],['audience','Con quién trabaja',['Infancia','Adolescencia','Familias','Profesorado']]].map(([k,l,v])=>'<label>'+l+'<select name="'+k+'"><option value="">Cualquiera</option>'+options(v)+'</select></label>').join('')+'</form>'+button('Limpiar filtros','data-clear')+'</div><div id="results"></div>';
const form=document.querySelector('#filters');form.addEventListener('submit',e=>e.preventDefault());form.addEventListener('input',results);results();
}
function results(){
const f=new FormData(document.querySelector('#filters'));
const found=people().map((p,i)=>({p,i})).filter(({p})=>norm(f.get('q')).split(/[ ,]+/).every(word=>norm(Object.values(p).join(' ')).includes(word))&&['service','area','zone','mode','audience'].every(k=>!f.get(k)||p[k]===f.get(k)));
document.querySelector('#results').innerHTML='<p role="status">'+found.length+' '+(found.length===1?'profesional':'profesionales')+'</p>'+(found.length?'<div class="grid">'+found.map(({p,i})=>'<article class="card"><div class="avatar">'+esc(p.name.split(' ').map(s=>s[0]).slice(0,2).join(''))+'</div><h3>'+esc(p.name)+'</h3><div class="muted">'+esc(p.role)+' · '+esc(p.zone)+'</div><p>'+chip(p.area)+chip(p.service)+'</p>'+button('Ver perfil','data-person="'+i+'"')+'</article>').join('')+'</div>':'<p class="panel">Prueba otra zona o amplía los filtros.</p>');
}
const input=(name,label,value='',type='text')=>'<label>'+label+'<input name="'+name+'" type="'+type+'" value="'+esc(value)+'" '+(type==='text'?'required':'')+'></label>';
const select=(name,label,list,value)=>'<label>'+label+'<select name="'+name+'">'+options(list,value)+'</select></label>';
const area=(name,label,value='')=>'<label>'+label+'<textarea name="'+name+'" rows="3">'+esc(value)+'</textarea></label>';
function profilePage(){main.innerHTML=hero('Mi perfil profesional','Elige qué datos profesionales quieres compartir en el directorio.')+'<form id="profile" class="panel stack">'+input('name','Nombre',profile.name)+input('role','Perfil profesional',profile.role)+input('zone','Provincia de actuación',profile.zone)+select('area','Área',groups,profile.area)+select('service','Servicio',services,profile.service)+select('mode','Modalidad',['Presencial','Online','Mixta'],profile.mode)+select('audience','Público',['Infancia','Adolescencia','Familias','Profesorado'],profile.audience)+input('web','Web o red profesional',profile.web,'url')+'<label class="row"><input style="width:auto" type="checkbox" name="visible" '+(profile.visible?'checked':'')+'> Mostrar mi ficha en el directorio</label><button class="primary">Guardar perfil</button><div role="status" id="saved"></div></form>'}
function groupPage(){main.innerHTML=hero('Grupos y territorios','Consulta las iniciativas vinculadas a los grupos de trabajo de ASEDEM.')+'<h2 class="section">Grupos temáticos</h2><div class="grid">'+groups.map(g=>'<article class="card"><h3>'+esc(g)+'</h3>'+button('Ver iniciativas','data-group="'+esc(g)+'"')+'</article>').join('')+'</div><h2 class="section">Delegación de ejemplo</h2><div class="panel"><h3>'+territories[0]+'</h3>'+button('Ver iniciativa compartida','data-project="0"')+'</div>'}
function initiativePage(){main.innerHTML=hero('Iniciativas','Organiza una colaboración, recupera los acuerdos y deja claro el siguiente paso.')+'<div class="row section">'+button('Nueva iniciativa','data-new',true)+'</div><div class="stack">'+projects.map((p,i)=>'<article class="card"><h3>'+esc(p.title)+'</h3>'+chip(p.group)+chip(p.status)+'<p>'+esc(p.step)+'</p>'+button('Abrir iniciativa','data-project="'+i+'"')+'</article>').join('')+'</div>'}
function projectEditor(i){
const p=projects[i];showDialog('<h2>'+esc(p.title)+'</h2>'+chip(p.status)+'<form class="stack" id="project" data-id="'+i+'">'+input('title','Título',p.title)+area('goal','Objetivo',p.goal)+select('group','Grupo temático',groups,p.group)+input('person','Persona de referencia',p.person)+input('step','Próximo paso',p.step)+input('date','Fecha prevista',p.date,'date')+area('notes','Acuerdos y materiales',p.notes)+'<button class="primary">Guardar acuerdos</button></form><div class="row section">'+(p.status==='En revisión'?button('Aprobar como coordinación (demo)','data-review="'+i+'"'):p.status==='En preparación'?button('Enviar a revisión','data-review="'+i+'"'):'')+'</div>');
}
function newProject(person='',group='Duelo'){showDialog('<h2>Abrir una colaboración</h2><form class="stack" id="project">'+input('title','Título')+area('goal','Objetivo')+select('group','Grupo temático',groups,group)+input('person','Persona de referencia',person)+input('step','Próximo paso')+input('date','Fecha prevista','','date')+area('notes','Acuerdos y materiales')+'<button class="primary">Crear iniciativa</button></form>')}
let member=read('member',null), memberMessage='';
function memberPage(){
  const date=member?.renewal?new Intl.DateTimeFormat('es-ES',{dateStyle:'long',timeZone:'UTC'}).format(new Date(member.renewal)):null;
  const due=date&&Date.now()>=Date.parse(member.renewal);
  main.innerHTML=hero('Alta y cuota de socia o socio','Solicita el alta, consulta el estado de tu cuota anual y pide acceso al grupo de WhatsApp.')+
  '<p class="notice">Demostración · Usa datos ficticios. El pago y la solicitud a WhatsApp se simulan.</p>'+
  (member?'<section class="panel"><h2>Mi alta</h2><p>'+esc(member.name)+' · '+esc(member.email)+'</p><p>Cuota: <strong>'+(due?'Pendiente de renovación':date?'Al corriente':'Pendiente de pago')+'</strong></p>'+(date?'<p>Próxima renovación: '+date+'</p>':'')+
  (date&&!due?'':button(due?'Simular renovación anual':'Simular pago de la cuota anual','data-member-pay',true))+'</section>':
  '<form class="panel stack" id="member-form"><h2>Solicitar el alta</h2>'+input('name','Nombre y apellidos')+input('email','Correo electrónico','','email').replace('<input ','<input required ')+'<button class="primary">Guardar solicitud</button></form>')+
  (date&&!due?'<section class="panel"><h2>Grupo de WhatsApp</h2><p>'+(member.whatsapp?'Solicitud de acceso simulada. Pendiente de aprobación.':'Tu cuota está al corriente. Ya puedes solicitar el acceso al grupo.')+'</p>'+(member.whatsapp?'':button('Simular solicitud de acceso','data-member-whatsapp',true))+'</section>':'')+
  '<p role="status">'+esc(memberMessage)+'</p>';
}
document.addEventListener('submit',e=>{
  if(e.target.id!=='member-form')return;
  e.preventDefault();
  const data=new FormData(e.target);
  const name=data.get('name').trim();
  if(!name){e.target.elements.name.focus();return}
  member={name,email:data.get('email').trim(),renewal:null,whatsapp:false};
  write('member',member);memberMessage='Solicitud guardada. Ya puedes simular el pago.';render('socios');
});
document.addEventListener('click',e=>{
  const control=e.target.closest('[data-member-pay],[data-member-whatsapp]');
  if(!control||!member)return;
  const active=member.renewal&&Date.parse(member.renewal)>Date.now();
  if(control.hasAttribute('data-member-pay')&&!active){
    const next=new Date();
    const month=next.getUTCMonth();
    next.setUTCFullYear(next.getUTCFullYear()+1);
    if(next.getUTCMonth()!==month)next.setUTCDate(0);
    member.renewal=next.toISOString();
    memberMessage='Pago simulado. Cuota al corriente.';
  }
  if(control.hasAttribute('data-member-whatsapp')&&active){
    member.whatsapp=true;memberMessage='Solicitud de acceso simulada.';
  }
  write('member',member);render('socios');
});
let demoSession=sessionStorage.getItem('asedem-demo-session')==='active';
function accessPage(){
  main.innerHTML=hero('Acceso a Mi ASEDEM','Entra en tu área de socio o solicita el alta en la asociación.')+
  '<div class="grid access-grid">'+
  '<section class="panel"><h2>Ya soy socio/a</h2><p>Consulta tu perfil, tus iniciativas y el campus desde tu área de socio.</p>'+button('Iniciar sesión','data-page="login"',true)+'</section>'+
  '<section class="panel"><h2>Quiero asociarme</h2><p>Solicita el alta y consulta los pasos para abonar la cuota anual.</p>'+button('Hazte socio','data-page="socios"')+'</section></div>'+
  '<p class="muted">Acceso simulado para probar el recorrido.</p>';
}
function loginPage(){
  main.innerHTML=hero('Iniciar sesión en Mi ASEDEM','Accede a tu área privada de socia o socio.')+
  '<section class="panel"><form id="member-login" class="stack">'+
  '<p class="muted">Acceso de demo. Usa un correo y una contraseña ficticios.</p>'+
  '<label>Correo electrónico<input name="email" type="email" autocomplete="username" required></label>'+
  '<label>Contraseña<input name="password" type="password" autocomplete="current-password" required></label>'+
  '<button class="primary" type="submit">Entrar en Mi ASEDEM</button></form>'+
  '<p><a href="#acceso">Volver a las opciones de acceso</a></p></section>';
}
document.addEventListener('submit',e=>{
  if(e.target.id!=='member-login')return;
  e.preventDefault();
  if(!e.target.reportValidity())return;
  sessionStorage.setItem('asedem-demo-session','active');
  demoSession=true;
  go('directorio');
});
document.addEventListener('click',e=>{
  if(!e.target.closest('[data-demo-logout]'))return;
  demoSession=false;
  sessionStorage.removeItem('asedem-demo-session');
  sessionStorage.removeItem('duv-campus-demo');
  go('acceso');
});
const privatePages=new Set(['directorio','grupos','iniciativas','perfil']);
const pages={acceso:accessPage,login:loginPage,socios:memberPage,directorio:directory,perfil:profilePage,grupos:groupPage,iniciativas:initiativePage};
function render(page){
  if(page==='campus'||(page==='mi-campus'&&demoSession)){
    const entry=document.querySelector(page==='campus'?'header .campus-entry':'aside .campus-entry');
    location.replace(entry.href);
    return;
  }
  const requested=Object.hasOwn(pages,page)?page:'acceso';
  const key=privatePages.has(requested)&&!demoSession?'acceso':requested;
  document.querySelector('aside').hidden=!demoSession||key==='acceso'||key==='login';
  document.querySelector('#member-access').dataset.page=demoSession?'directorio':'acceso';
  pages[key]();
  document.querySelectorAll('[data-page]').forEach(b=>b.setAttribute('aria-current',String(b.dataset.page===key)));
  main.insertAdjacentHTML('beforeend',footer);
}
function go(page){if(location.hash==='#'+page)render(page);else location.hash=page}
window.addEventListener('hashchange',()=>{render(location.hash.slice(1));window.scrollTo(0,0)});
document.addEventListener('click',e=>{
const b=e.target.closest('button');if(!b)return;const d=b.dataset;
if(d.page){go(d.page);return}
if('close'in d){modal.close();return}
if('clear'in d){document.querySelector('#filters').reset();results();return}
if('person'in d){const p=people()[d.person];const web=/^https?:\/\//i.test(p.web)?'<p><a href="'+esc(p.web)+'" target="_blank" rel="noopener noreferrer">Web o red profesional</a></p>':'';showDialog('<h2>'+esc(p.name)+'</h2><p>'+esc(p.role)+' · '+esc(p.zone)+'</p>'+[p.area,p.service,p.mode,p.audience].map(chip).join('')+web+'<p class="muted">Ficha ficticia de demostración.</p>'+button('Proponer colaboración','data-collab="'+d.person+'"',true));return}
if('collab'in d){const p=people()[d.collab];newProject(p.name,p.area);return}
if('new'in d){newProject();return}
if('project'in d){projectEditor(Number(d.project));return}
if('group'in d){const items=projects.map((p,i)=>({p,i})).filter(({p})=>p.group===d.group);showDialog('<h2>'+esc(d.group)+'</h2><div class="stack">'+(items.length?items.map(({p,i})=>button(esc(p.title),'data-project="'+i+'"')).join(''):'<p>Aún no hay iniciativas en este grupo.</p>')+button('Proponer iniciativa','data-new-group="'+esc(d.group)+'"')+'</div>');return}
if('newGroup'in d){newProject('',d.newGroup);return}
if('review'in d){const i=Number(d.review),p=projects[i];p.status=p.status==='En revisión'?'Aprobada':'En revisión';write('projects',projects);render(location.hash.slice(1));projectEditor(i);return}


});
document.addEventListener('submit',e=>{
const form=e.target;if(!['profile','project'].includes(form.id))return;e.preventDefault();
const data=Object.fromEntries(new FormData(form));
if(form.id==='profile'){if(data.web&&!/^https?:\/\//i.test(data.web)){document.querySelector('#saved').textContent='Introduce un enlace que comience por https:// o http://.';return}profile={...data,visible:data.visible==='on'};write('profile',profile);document.querySelector('#saved').textContent='Perfil guardado.';return}
if(form.dataset.id===undefined){projects.push({...data,status:'En preparación'});write('projects',projects);modal.close();go('iniciativas');return}
const i=Number(form.dataset.id);projects[i]={...projects[i],...data};write('projects',projects);modal.close();render(location.hash.slice(1));
});
render(location.hash.slice(1));

const siteHeader=document.querySelector('.asedem-header');
function updateHeaderSize(){
  const compact=siteHeader.classList.contains('is-compact');
  siteHeader.classList.toggle('is-compact',window.scrollY>(compact?12:96));
}
window.addEventListener('scroll',updateHeaderSize,{passive:true});
window.addEventListener('pageshow',updateHeaderSize);
updateHeaderSize();
