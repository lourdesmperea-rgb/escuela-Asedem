(() => {
 const course=window.schoolData.courses.find(item=>item.detailExperience);
 const page=document.getElementById('landing');
 const cta='<button type="button" class="primary" data-campaign-interest>Simular solicitud de información →</button>';
 const list=items=>'<ul>'+items.map(item=>'<li>'+item+'</li>').join('')+'</ul>';
 page.innerHTML=`
  <header class="campaign-hero">
   <div><span class="course-demo-label">Campaña de demostración</span><p class="eyebrow">Educación afectivo-sexual y bienestar digital</p>
   <h1>Cuando surge una pregunta sobre pornografía, ¿cómo abrimos el diálogo?</h1>
   <p class="campaign-lead">${course.title}</p>
   <p>Una propuesta formativa para preparar respuestas educativas que cuiden la participación, trabajen el consentimiento y ayuden a leer críticamente las representaciones digitales.</p>${cta}</div>
   <div class="resource-photo" aria-hidden="true">${window.schoolPhotos.image(course.photo)}</div>
  </header>
  <section class="campaign-block"><h2>Para quienes acompañan a adolescentes</h2><p>Docentes, profesionales del ámbito socioeducativo y familias que buscan criterios para conversar sobre sexualidad en el entorno digital.</p>
   <div class="organisation-grid">
    <article class="white-panel"><h3>Responder a preguntas inesperadas</h3><p>Dar espacio a la duda y frenar las burlas sin pedir detalles personales.</p></article>
    <article class="white-panel"><h3>Hablar de lo que muestran los vídeos</h3><p>Ayudar a distinguir una representación de una relación basada en el respeto y el acuerdo.</p></article>
    <article class="white-panel"><h3>Llevar los criterios a la práctica</h3><p>Preparar una conversación o una actividad adecuada al contexto educativo.</p></article>
   </div>
  </section>
  <section class="campaign-block white-panel campaign-panel"><p class="eyebrow">Aprendizajes previstos</p><h2>Qué podrás practicar</h2>${list(course.outcomes)}</section>
  <section class="campaign-block"><h2>Programa y metodología</h2><p>El programa de ejemplo reúne cinco unidades. En la unidad aplicada, una conversación ficticia conecta la situación inicial, el microcontenido, el caso con decisiones, el feedback, la aplicación práctica y la evaluación.</p>
   <div class="campaign-program">${course.modules.map((unit,index)=>`<details><summary>Unidad ${index+1} · ${unit.appliedTitle||unit.title}</summary><div><p>${unit.description}</p><p><strong>Actividad propuesta.</strong> ${unit.activity}</p></div></details>`).join('')}</div>
  </section>
  <section class="campaign-block white-panel campaign-panel"><h2>Información práctica</h2><p>Esta formación se presenta como ejemplo. La modalidad, la duración, el equipo docente, las fechas y las condiciones de inscripción están pendientes de confirmación.</p></section>
  <section class="campaign-block white-panel campaign-panel" aria-labelledby="campaign-interest-title">
   <p class="eyebrow">Interés en la formación</p><h2 id="campaign-interest-title" tabindex="-1">Solicita información</h2>
   <p class="checkout-notice">Demostración · Selecciona un perfil ficticio. La prueba no solicita datos de contacto, no envía información y no realiza cobros.</p>
   <form id="campaign-interest-form">
    <label for="campaign-profile">Perfil de ejemplo</label>
    <select id="campaign-profile" required><option value="">Selecciona un perfil</option><option>Docente</option><option>Profesional socioeducativo</option><option>Familiar</option></select>
    <label for="campaign-interest">¿Qué te gustaría conocer?</label>
    <select id="campaign-interest" required><option value="">Selecciona una opción</option><option>Programa y metodología</option><option>Modalidad y duración</option><option>Condiciones de inscripción</option></select>
    <button class="primary" type="submit">Simular solicitud →</button>
   </form>
   <p id="campaign-status" role="status" tabindex="-1"></p>
  </section>
  <section class="campaign-block organisation-faq"><h2>Preguntas frecuentes</h2>
   <details><summary>¿La formación está abierta a inscripciones reales?</summary><p>La página forma parte de la demo de la escuela. El formulario permite probar una solicitud de información.</p></details>
   <details><summary>¿Tendré que contar experiencias personales?</summary><p>Las actividades de ejemplo trabajan con situaciones ficticias y respuestas educativas. No requieren compartir vivencias personales.</p></details>
   <details><summary>¿Qué ocurre al enviar el formulario?</summary><p>Verás una confirmación de prueba. Los campos se vacían y las selecciones no se guardan.</p></details>
  </section>
  <section class="campaign-block campaign-final"><h2>Prepara tu próxima conversación educativa</h2><p>Elige qué te gustaría saber de la formación y prueba el recorrido de solicitud.</p>${cta}</section>`;
 const form=page.querySelector('form');
 const status=page.querySelector('#campaign-status');
 page.addEventListener('click',event=>{
  if(!event.target.closest('[data-campaign-interest]'))return;
  const heading=page.querySelector('#campaign-interest-title');
  heading.focus({preventScroll:true});
  heading.scrollIntoView({block:'start'});
 });
 form.addEventListener('submit',event=>{
  event.preventDefault();
  form.reset();
  status.textContent='Solicitud simulada completada. No se han enviado ni guardado datos.';
  status.focus();
 });
 form.addEventListener('change',()=>{status.textContent='';});
})();
