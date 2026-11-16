(() => {
 const key='duv-admin-demo-v1';
 const sections={
  catalogo:{title:'Catálogo',columns:['Curso','Descripción','Estado'],states:['En preparación','Publicado en el prototipo'],rows:[
   ['Educación sexual digital','Itinerario de ejemplo sobre alfabetización digital y acompañamiento educativo.','Publicado en el prototipo'],
   ['Bienestar digital en el aula','Formación ficticia para equipos docentes.','Publicado en el prototipo'],
   ['Diálogo con familias','Propuesta ficticia de un taller de comunicación.','En preparación']
  ]},
  alumnado:{title:'Alumnado matriculado',columns:['Nombre ficticio','Curso','Estado'],rows:[
   ['Alumna Demo','Educación sexual digital','En curso'],['Estudiante Ejemplo','Bienestar digital en el aula','Inscripción simulada']
  ]},
  centros:{title:'Solicitudes de centros y entidades',columns:['Entidad ficticia','Solicitud','Estado'],states:['Nueva','En revisión','Cerrada'],rows:[
   ['Centro Ejemplo Norte','Taller de bienestar digital para docentes','Nueva'],['Entidad Demo Sur','Formación para un equipo socioeducativo','En revisión']
  ]},
  campanas:{title:'Formularios de campañas',columns:['Contacto ficticio','Campaña y consulta','Estado'],states:['Nuevo','Revisado','Archivado'],rows:[
   ['contacto@example.com','Educación sexual digital · Consulta sobre modalidades','Nuevo'],['interes@example.org','Educación sexual digital · Solicita el programa','Nuevo']
  ]},
  docentes:{title:'Docentes colaboradores',columns:['Nombre ficticio','Área o propuesta','Estado'],states:['Propuesta recibida','En revisión','Colaboración simulada'],rows:[
   ['Docente Demo A','Bienestar digital','Colaboración simulada'],['Docente Demo B','Educación afectivo-sexual','Propuesta recibida']
  ]}
 };
 try{
  const saved=JSON.parse(localStorage.getItem(key));
  for(const [id,section] of Object.entries(sections))if(Array.isArray(saved?.[id])&&saved[id].length===section.rows.length&&saved[id].every(row=>Array.isArray(row)&&row.length===3&&row.every(value=>typeof value==='string')))section.rows=saved[id];
 }catch{}
 const view=document.querySelector('#view');
 const status=document.querySelector('#status');
 const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const card=(label,value)=>`<article class="card"><span>${label}</span><strong>${value}</strong></article>`;
 let editing=null;
 function render(){
  const [requested,index]=location.hash.slice(1).split('/');
  const section=Object.hasOwn(sections,requested)?sections[requested]:null;
  const active=section?requested:'resumen';
  for(const link of document.querySelectorAll('nav a')){
   if(link.hash==='#'+active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
  }
  editing=null;
  if(!section){
   const total=sections.catalogo.rows.length;
   const published=sections.catalogo.rows.filter(row=>row[2]==='Publicado en el prototipo').length;
   view.innerHTML=`<h1>Resumen de administración</h1><p>Consulta la actividad de la escuela y accede a cada área de gestión.</p><div class="cards">${card('Cursos publicados en el prototipo',published)}${card('Cursos en preparación',total-published)}</div><a href="#catalogo">Gestionar catálogo →</a><h2>Indicadores simulados</h2><p>Mes ilustrativo · El panel utiliza cifras ficticias para mostrar el tipo de seguimiento disponible.</p><div class="cards">${card('Visitas', '1.240')}${card('Muestras de interés',84)}${card('Inscripciones',26)}${card('Ventas simuladas','1.380 €')}</div>`;
  }else if(section.states&&/^\d+$/.test(index)&&section.rows[Number(index)]){
   editing={section,index:Number(index)};
   const row=section.rows[editing.index];
   view.innerHTML=`<a href="#${active}">← ${section.title}</a><h1>${esc(row[0])}</h1><form><label>${section.columns[0]}<input name="name" required maxlength="120" value="${esc(row[0])}"></label><label>${section.columns[1]}<textarea name="description" required maxlength="600" rows="4">${esc(row[1])}</textarea></label><label for="admin-state">Estado</label><select id="admin-state" name="state">${section.states.map(state=>`<option${state===row[2]?' selected':''}>${state}</option>`).join('')}</select><button>Guardar cambios de demo</button></form>`;
  }else{
   view.innerHTML=`<h1>${section.title}</h1><div class="table" tabindex="0" role="region" aria-label="${section.title}"><table><thead><tr>${section.columns.map(column=>`<th scope="col">${column}</th>`).join('')}${section.states?'<th scope="col">Acción</th>':''}</tr></thead><tbody>${section.rows.map((row,i)=>`<tr><th scope="row">${esc(row[0])}</th><td>${esc(row[1])}</td><td>${esc(row[2])}</td>${section.states?`<td><a href="#${active}/${i}" aria-label="Abrir ficha de ${esc(row[0])}">Abrir ficha</a></td>`:''}</tr>`).join('')}</tbody></table></div>`;
  }
 }
 view.addEventListener('submit',event=>{
  event.preventDefault();
  if(!editing)return;
  const data=new FormData(event.target);
  const name=data.get('name').trim(),description=data.get('description').trim();
  if(!name||!description){status.textContent='Completa ambos campos de texto.';return;}
  editing.section.rows[editing.index]=[name,description,data.get('state')];
  try{
   localStorage.setItem(key,JSON.stringify(Object.fromEntries(Object.entries(sections).map(([id,section])=>[id,section.rows]))));
   status.textContent='Cambios guardados en este navegador.';
  }catch{status.textContent='Cambios aplicados durante esta sesión.';}
  render();
  view.querySelector('h1').setAttribute('tabindex','-1');
  view.querySelector('h1').focus();
 });
 window.addEventListener('hashchange',()=>{
  status.textContent='';
  render();
  const heading=view.querySelector('h1');
  heading.tabIndex=-1;
  heading.focus();
 });
 render();
})();
