(() => {
 const course='#/curso/pornografia-adolescencia-educacion-sexual-digital';
 const items=[
  {id:'biblioteca-videos',title:'Biblioteca de vídeos de Dale Una Vuelta',format:'Vídeos',theme:'Prevención del consumo de pornografía',access:'Libre',description:'Consulta la biblioteca audiovisual de la organización en su web oficial.',body:'El enlace abre el índice de vídeos de Dale Una Vuelta. La disponibilidad de cada publicación depende de su web.',url:'https://www.daleunavuelta.org/videos/'},
  {id:'conversaciones-sexualidad-digital',title:'Conversaciones sobre sexualidad digital',format:'Guías y publicaciones',theme:'Educación afectivo-sexual',access:'Registro',file:'assets/recursos/conversaciones.txt',example:true,description:'Preguntas para preparar una conversación educativa desde la escucha y el respeto.',body:'Plantea una situación ficticia: una persona adolescente encuentra un contenido digital que le genera dudas. Pregunta qué mensajes transmite, qué información falta para entender la situación y cómo se podría hablar de ella sin exponer a nadie.',related:'Practica cómo responder a una pregunta inesperada en la Unidad 4 del curso de ejemplo.'},
  {id:'acuerdos-digitales',title:'Acuerdos para el bienestar digital',format:'Materiales educativos',theme:'Bienestar digital',access:'Registro',file:'assets/recursos/acuerdos.txt',example:true,description:'Una actividad breve para revisar acuerdos sobre intimidad y convivencia digital.',body:'En un caso ficticio, un grupo quiere compartir una imagen de una actividad. Identificad a quién hay que preguntar, cómo respetar una negativa y qué alternativas permiten participar sin aparecer en la imagen.'},
  {id:'plantilla-intervencion',title:'Plantilla para preparar una intervención educativa',format:'Ficha práctica',theme:'Educación afectivo-sexual',access:'Campus',example:true,description:'Material complementario de la formación de ejemplo, vinculado a la Unidad 4.',body:'Describe la situación ficticia. Redacta una frase que acoja la pregunta sin exponer a nadie, una explicación que distinga representación y relación, y una pregunta abierta sobre consentimiento. Revisa si las tres frases evitan la burla y respetan la intimidad.',related:'La Unidad 4 permite aplicar esta estructura y contrastarla con un ejemplo orientativo.'}
 ];
 const $=selector=>document.querySelector(selector);
 const search=$('#resource-search');
 const theme=$('#resource-theme');
 const format=$('#resource-format');
 const categories=[['Guías y publicaciones','▤'],['Vídeos','▶'],['Materiales educativos','▦']];
 const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const label=item=>({'Libre':'Gratuito · Acceso directo','Registro':'Gratuito · Registro para descargar','Campus':'Exclusivo del campus'})[item.access];
 const badge=item=>label(item)+(item.example?' · Ejemplo':'');
 const icon=item=>categories.find(([name])=>name===item.format)?.[1]||'▦';
 const downloadButton=item=>`<button type="button" class="primary" data-library-download="${item.id}" aria-label="Descargar gratis: ${item.title}">Descargar gratis →</button>`;
 const entry=item=>`<article class="white-panel library-card library-item"><span class="library-icon" aria-hidden="true">${icon(item)}</span><p class="eyebrow">${item.format}</p><h2><a href="#/recurso/${item.id}">${item.title}</a></h2><p class="library-badge">${badge(item)}</p><p>${item.description}</p><div class="actions"><a class="secondary" href="#/recurso/${item.id}">Ver ficha →</a>${item.file?downloadButton(item):''}</div></article>`;
 function render(){
  const terms=normalize(search.value.trim()).split(/\s+/).filter(Boolean);
  const results=items.filter(item=>item.access!=='Campus'&&(!theme.value||theme.value===item.theme)&&(!format.value||format.value===item.format)&&terms.every(term=>normalize([item.title,item.description,item.theme,item.format,item.body].join(' ')).includes(term)));
  $('#resource-count').textContent=`${results.length} ${results.length===1?'recurso':'recursos'}`;
  $('#resource-list').innerHTML=results.length?results.map(entry).join(''):'<div class="white-panel library-card"><h2>No hay coincidencias</h2><p>Prueba otras palabras o restablece los filtros.</p></div>';
  document.querySelectorAll('[data-library-format]').forEach(button=>button.setAttribute('aria-pressed',String(format.value===button.dataset.libraryFormat)));
 }
 function detail(id){
  const item=items.find(resource=>resource.id===id);
  if(!item)return false;
  let action='';
  if(item.file)action=downloadButton(item);
  if(item.url)action=`<a class="primary" href="${item.url}" target="_blank" rel="noopener noreferrer">Abrir biblioteca oficial ↗</a>`;
  if(item.access==='Campus')action='<a class="primary" href="#/campus/materiales">Ir a materiales del campus →</a>';
  $('#recurso-registro').innerHTML=`<nav class="breadcrumb" aria-label="Ruta de navegación"><a href="#/recursos">Recursos</a> / Ficha</nav><article class="white-panel library-card"><p class="eyebrow">${badge(item)}</p><h1>${item.title}</h1><p>${item.format} · ${item.theme}</p><p>${item.description}</p><h2>${item.access==='Campus'?'Cómo acceder':'Contenido'}</h2><p>${item.access==='Campus'?'Este material acompaña a la formación. En la demo puedes consultarlo desde el campus con el acceso de prueba.':item.body}</p>${action}</article>${item.related?`<aside class="white-panel library-card"><h2>Formación relacionada</h2><p>${item.related}</p><a href="${course}">Ver la ficha del curso de ejemplo →</a></aside>`:''}`;
  return true;
 }
 theme.insertAdjacentHTML('beforeend',[...new Set(items.filter(item=>item.access!=='Campus').map(item=>item.theme))].map(value=>`<option>${value}</option>`).join(''));
 format.insertAdjacentHTML('beforeend',categories.map(([name])=>`<option>${name}</option>`).join(''));
 $('#resource-categories').innerHTML=categories.map(([name,symbol])=>`<button type="button" data-library-format="${name}" aria-pressed="false"><span aria-hidden="true">${symbol}</span>${name}</button>`).join('');
 search.addEventListener('input',render);
 for(const field of [theme,format])field.addEventListener('change',render);
 $('#resource-clear').addEventListener('click',()=>{
  search.value='';theme.value='';format.value='';
  render();search.focus();
 });

 // Demo-only memory. The future request record is separate from mailing consent.
 // Request: email, profile, resourceId, requestedAt.
 // Consent: granted, recordedAt, version, withdrawnAt. Only active opt-ins reach mailing.
 const consentVersion='demo-1';
 let registration=null;
 const requests=[];
 const dialog=$('#demo-dialog');
 const content=$('#dialog-content');
 function confirmAccess(item){
  requests.push({resourceId:item.id,requestedAt:new Date().toISOString()});
  content.innerHTML=`<p class="eyebrow">Biblioteca gratuita</p><h2 id="dialog-title" tabindex="-1">Ya puedes acceder a tu recurso</h2><p>${item.title}</p><a class="primary" href="${item.file}" download>Descargar archivo de ejemplo (TXT) →</a><p class="small">Acceso de demostración. Puedes seguir explorando la biblioteca.</p>`;
  content.querySelector('h2').focus();
 }
 function requestAccess(item){
  if(registration){
   confirmAccess(item);
   dialog.showModal();
   return;
  }
  content.innerHTML=`<p class="eyebrow">Biblioteca gratuita · Demostración</p><h2 id="dialog-title">Accede gratis a este recurso</h2><p><strong>${item.title}</strong></p><p>El registro ayuda a conocer qué perfiles se interesan por los materiales. Usa un correo ficticio.</p><p class="checkout-notice">No es una compra. No requiere suscripción ni datos de pago.</p>
  <form class="resource-access-form" id="library-download-form">
   <label for="library-email">Correo electrónico</label><input id="library-email" type="email" required maxlength="254" autocomplete="off" placeholder="alumna@example.com">
   <label for="library-profile">Perfil</label><select id="library-profile" required><option value="">Selecciona tu perfil</option><option>Profesional del ámbito educativo</option><option>Profesional del ámbito de la salud</option><option>No soy profesional de estos ámbitos</option></select>
   <label class="optional-news"><input id="library-consent" type="checkbox"><span>Deseo recibir por correo electrónico novedades, recursos y propuestas formativas de Escuela Dale Una Vuelta.</span></label>
   <p class="small">En esta demo no se envían ni conservan datos personales. <a href="privacidad-recursos.html" target="_blank" rel="noopener noreferrer">Información de privacidad · Borrador ↗</a></p>
   <button class="primary" type="submit">Acceder al recurso gratuito</button>
  </form>`;
  content.querySelector('form').addEventListener('submit',event=>{
   event.preventDefault();
   const granted=$('#library-consent').checked;
   registration={profile:$('#library-profile').value,consent:{granted,recordedAt:granted?new Date().toISOString():null,version:granted?consentVersion:null,withdrawnAt:null}};
   event.currentTarget.reset();
   confirmAccess(item);
  });
  dialog.showModal();
 }
 document.addEventListener('click',event=>{
  const category=event.target.closest('[data-library-format]');
  if(category){
   format.value=format.value===category.dataset.libraryFormat?'':category.dataset.libraryFormat;
   render();
  }
  const button=event.target.closest('[data-library-download]');
  if(button){
   const item=items.find(resource=>resource.id===button.dataset.libraryDownload&&resource.file);
   if(item)requestAccess(item);
  }
 });
 const material=items.find(item=>item.access==='Campus');
 $('#campus-materiales').innerHTML=`<a href="#/campus/curso">← Volver al índice del curso</a><h1>Materiales del curso</h1><article class="white-panel library-card"><p class="eyebrow">Campus de demostración · Material de ejemplo</p><h2>${material.title}</h2><p>${material.body}</p><a class="primary" href="#/campus/unidad/conversacion-educativa">Abrir la Unidad 4 →</a></article>`;
 window.resourceExperience={detail};
 render();
})();
