(() => {
 'use strict';
 const $=s=>document.querySelector(s);
 document.addEventListener('click',e=>{
 if(!e.target.closest('[data-community-interest]'))return;
 $('#dialog-content').innerHTML='<div class="eyebrow">Comunidad educativa gratuita · Demo</div><h2 id="dialog-title">Sigamos en contacto</h2><p>Prueba el recorrido para recibir novedades sobre recursos y aprendizaje compartido.</p><form id="community-interest-form" class="professional-request-form"><label for="community-name">Nombre</label><input id="community-name" type="text" autocomplete="given-name" maxlength="100" required><label for="community-email">Correo electrónico</label><input id="community-email" type="email" autocomplete="email" maxlength="254" required><p class="small">Utiliza datos de ejemplo. No se envían ni guardan datos, ni se crea una cuenta o una inscripción en cursos.</p><button class="primary" type="submit">Probar envío →</button></form>';
 $('#demo-dialog').showModal();
 });
 document.addEventListener('submit',e=>{
 if(e.target.id!=='community-interest-form')return;e.preventDefault();
 $('#dialog-content').innerHTML='<h2 id="dialog-title" tabindex="-1">Interés simulado completado</h2><p>Has probado cómo manifestar interés en la comunidad educativa gratuita. No se ha enviado ninguna solicitud ni guardado datos.</p><p>Puedes seguir explorando los recursos abiertos. El campus mantiene un acceso independiente para las personas inscritas en una formación.</p><button class="primary" id="close-community-interest">Volver a la comunidad</button>';
 $('#dialog-title').focus();$('#close-community-interest').addEventListener('click',()=>$('#demo-dialog').close());
 });
})();
