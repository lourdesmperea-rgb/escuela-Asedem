(() => {
 'use strict';
 const $=s=>document.querySelector(s);
 let requestOriginLabel='Volver a la colaboración docente';
 const field=(id,label,type='text',extra='')=>`<label for="${id}">${label}</label><input id="${id}" name="${id}" type="${type}" ${extra} required>`;
 function showRequest(kind){
 const team=kind==='team',dialog=$('#demo-dialog');
 requestOriginLabel=document.querySelector('.shell').classList.contains('home-mode')?'Volver al inicio':location.hash==='#/centros-y-entidades'?'Volver a Centros y entidades':'Volver a la colaboración docente';
 const teamFields=field('entity','Nombre del centro o entidad')+`<label for="entity-type">Tipo de entidad</label><select id="entity-type" name="entity-type" required><option value="">Selecciona una opción</option><option>Centro educativo</option><option>Entidad social</option><option>Equipo profesional</option><option>Otra entidad</option></select>`+field('participants-profile','Perfil de las personas participantes')+field('participants-count','Número aproximado de participantes','number','min="1" max="10000"')+`<label for="request-topic">¿Qué necesita tu equipo?</label><textarea id="request-topic" name="request-topic" rows="3" maxlength="2000" required></textarea><label for="request-mode">Modalidad preferida</label><select id="request-mode" name="request-mode" required><option value="">Selecciona una opción</option><option>Online</option><option>Presencial</option><option>Mixta</option><option>Por decidir</option></select>`+field('request-dates','Fechas orientativas');
 const partnerFields=field('proposal-title','Título provisional del curso','text','maxlength="120"')+`<label for="proposal-type">Tipo de propuesta</label><select id="proposal-type" name="proposal-type" required><option value="">Selecciona una opción</option><option>Curso online</option><option>Taller práctico</option><option>Seminario</option><option>Itinerario para un equipo</option></select>`+field('specialty','Tu especialidad')+field('target-audience','¿A quién se dirige la formación?')+field('learning-goal','¿Qué podrá hacer el alumnado al terminar?')+`<label for="request-topic">Cuéntanos tu propuesta</label><textarea id="request-topic" name="request-topic" rows="3" maxlength="2000" required></textarea><label for="content-stage">¿En qué punto está?</label><select id="content-stage" name="content-stage" required><option value="">Selecciona una opción</option><option>Tengo una idea por desarrollar</option><option>Ya tengo contenido creado</option><option>Quiero impartir un taller o seminario</option></select><p class="small">Presentar una propuesta no implica su aceptación. Apoyo de la escuela, reparto de ingresos, propiedad del contenido y condiciones se acordarían individualmente.</p>`;
 $('#dialog-content').innerHTML=`<div class="eyebrow">${team?'Formación para equipos':'Colaboración docente'} · Demo</div><h2 id="dialog-title">${team?'Cuéntanos qué necesita tu equipo':'Propón una formación'}</h2><p class="small">Recorrido de demostración. Utiliza datos de ejemplo: no se envían ni guardan datos.</p><form class="professional-request-form" id="professional-request-form" data-kind="${kind}">${field('contact-name','Nombre de contacto')}${field('contact-email','Correo electrónico','email')}${team?teamFields:`<label for="proposal-entity">Entidad (opcional)</label><input id="proposal-entity" name="proposal-entity" maxlength="120">`+partnerFields}<button type="submit" class="primary">Probar ${team?'solicitud':'propuesta'} →</button></form>`;
 dialog.showModal();
 }
 document.addEventListener('click',e=>{const b=e.target.closest('[data-professional-request]');if(b)showRequest(b.dataset.professionalRequest);});
 document.addEventListener('submit',e=>{if(e.target.id!=='professional-request-form')return;e.preventDefault();const team=e.target.dataset.kind==='team';$('#dialog-content').innerHTML=`<h2 id="dialog-title" tabindex="-1">${team?'Solicitud':'Propuesta'} simulada completada</h2><p>Has probado el recorrido de ${team?'formación para centros y equipos':'colaboración docente'}. No se han enviado ni guardado datos.</p><p>${team?'En la versión operativa, el equipo valoraría las necesidades para preparar una propuesta.':'En la versión operativa, Dale Una Vuelta valoraría el encaje de la propuesta antes de acordar las condiciones y preparar su publicación.'}</p><button class="primary" id="close-professional-request">${requestOriginLabel}</button>`;$('#dialog-title').focus();$('#close-professional-request').addEventListener('click',()=>$('#demo-dialog').close());});
})();

(() => {
 const section = document.getElementById('centros');
 const form = document.getElementById('centres-request-form');
 const needs = form.elements.needs;
 const status = document.getElementById('centres-request-status');
 section.addEventListener('click', event => {
  if (!event.target.closest('[data-centres-start]')) return;
  const heading = document.getElementById('centres-request-title');
  heading.focus({preventScroll:true});
  heading.scrollIntoView({block:'start'});
 });
 needs.addEventListener('input', () => needs.setCustomValidity(''));
 form.addEventListener('submit', event => {
  event.preventDefault();
  needs.setCustomValidity(needs.value.trim() ? '' : 'Describe brevemente el objetivo de tu equipo.');
  if (!form.reportValidity()) return;
  form.reset();
  status.textContent = 'Solicitud simulada completada. En un proceso real se revisaría el encaje antes de preparar una propuesta. No se han enviado ni guardado datos.';
  status.focus();
 });
 form.addEventListener('input', () => { status.textContent = ''; });
})();
