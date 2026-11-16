(() => {
 'use strict';
 const id='pornografia-adolescencia-educacion-sexual-digital';
 const example={
 id,title:'Pornografía, adolescencia y educación sexual digital',demo:true,detailExperience:true,
 audience:'Profesionales de la educación y del ámbito socioeducativo, y familias con adolescentes',audiences:['Profesionales','Centros educativos','Familias'],
 areas:['Prevención del consumo de pornografía','Educación afectivo-sexual','Bienestar digital'],format:'Cursos online',photo:1,recognition:[],
 description:'Una propuesta para comprender los mensajes sobre sexualidad en el entorno digital y diseñar respuestas educativas basadas en el diálogo, el pensamiento crítico y la prevención.',
 objectives:['Comprender el entorno de socialización sexual digital de la adolescencia.','Explorar cómo abordar expectativas, consentimiento y límites desde la educación.','Desarrollar criterios para seleccionar recursos y preparar conversaciones educativas.'],
 outcomes:['Distinguir mensajes del contenido pornográfico y contrastarlos con criterios de respeto, consentimiento y reciprocidad.','Elaborar un guion de conversación ajustado a un contexto familiar o educativo.','Analizar una situación ficticia y justificar una respuesta educativa sin recurrir al juicio ni al alarmismo.','Diseñar una actividad breve de alfabetización sexual digital con objetivos y recursos adecuados.'],
 modules:[
 {title:'Adolescencia y socialización digital',topics:['Preguntas y necesidades educativas en la adolescencia.','Agentes de socialización y fuentes de información sobre sexualidad.','Criterios para analizar contenidos y mensajes digitales.'],activity:'Mapa de fuentes: reconocer dónde se construyen las ideas sobre sexualidad.'},
 {title:'Pornografía y expectativas sobre las relaciones',topics:['Representaciones, guiones y expectativas.','Lectura crítica de los mensajes, sin exposición a contenido explícito.','Diferencias entre representación, intimidad y relaciones compartidas.'],activity:'Análisis de un caso ficticio y contraste de sus expectativas.'},
 {title:'Consentimiento, intimidad y convivencia',topics:['Respeto, reciprocidad y autonomía.','Límites personales y comunicación.','Privacidad y circulación de imágenes en contextos digitales.'],activity:'Propuesta de preguntas para trabajar límites y consentimiento.'},
 {title:'Conversaciones que abren el diálogo',topics:['Escucha y preguntas abiertas.','Cómo responder desde el ámbito familiar y educativo.','Adaptación del lenguaje al contexto y a las necesidades del grupo.'],activity:'Diseño de un guion para una conversación educativa.'},
 {title:'Del análisis a una propuesta educativa',topics:['Selección crítica de materiales.','Objetivos, secuencia y actividades de prevención.','Revisión de la propuesta y criterios de autoevaluación.'],activity:'Borrador de una actividad para el aula, un grupo o la familia.'}
 ],
 materials:['Plantilla para analizar mensajes y situaciones digitales.','Guion de apoyo para conversaciones educativas.','Ficha para diseñar una actividad de prevención.','Lista de comprobación para revisar la propuesta final.'],
 faq:[
 ['¿Es una formación publicada por Dale Una Vuelta?','No. Esta ficha es un ejemplo demostrativo de diseño y contenido pedagógico. No se presenta como parte de la oferta oficial.'],
 ['¿Puedo inscribirme o pagar desde esta página?','Solo puedes probar una inscripción simulada. No se solicita un pago, no se crea una cuenta y no se formaliza una matrícula.'],
 ['¿Qué modalidad y duración tendrá?','No están definidas. La ficha no anuncia fechas, horas, sesiones ni plazos de acceso. El tipo de curso online se usa como clasificación orientativa de la demo.'],
 ['¿Quién impartirá la formación?','El equipo docente está pendiente de confirmar. Se incorporarán su identidad, trayectoria y funciones cuando esa información esté verificada.'],
 ['¿Los materiales ya están disponibles?','No. Se muestra una propuesta de materiales para ilustrar la experiencia de aprendizaje; no son entregables descargables ni una prestación contratada.'],
 ['¿Incluye algún certificado o acreditación?','No hay una certificación o acreditación confirmada para este ejemplo. No se anuncia ninguna.'],
 ['¿Puedo plantear una formación para mi centro?','Sí, puedes explorar el recorrido de Formación para centros y entidades de la demo. Su formulario también es simulado y no envía datos.']
 ]};
 const descriptions=[
 'Explora dónde se forman las ideas sobre sexualidad durante la adolescencia.',
 'Analiza los guiones de una representación y las expectativas que pueden transmitir.',
 'Trabaja el acuerdo libre, los límites y la privacidad en situaciones educativas.',
 'Aplica los criterios de escucha, respeto y consentimiento a una pregunta en un grupo adolescente.',
 'Traslada lo aprendido al diseño y la revisión de una actividad educativa.'
 ];
 const outcomes=[
 ['Identificar fuentes de información sobre sexualidad y justificar cómo valorar su fiabilidad.'],
 ['Distinguir un mensaje representado de una expectativa trasladada a una relación.'],
 ['Identificar señales de presión o falta de acuerdo y formular preguntas para abordar la situación.'],
 ['Formular una primera respuesta que acoja la pregunta sin exponer a nadie.','Distinguir una representación de una relación basada en consentimiento y respeto.','Redactar una intervención educativa breve con una pregunta abierta y un ejemplo ficticio.'],
 ['Diseñar una actividad breve y revisar si las instrucciones, recursos y evaluación responden a su objetivo.']
 ];
 example.modules.forEach((unit,index)=>{
  unit.description=descriptions[index];
  unit.outcomes=outcomes[index];
 });
 example.modules[3].appliedTitle='Cómo responder cuando aparece la pornografía en una conversación educativa';
 // Add a separate example; never replace a course with an official source.
 window.schoolData.courses.push(example);
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const list=items=>`<ul class="course-bullet-list">${items.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`;
 function render(c){
 const facts=[['Estado','Ejemplo demostrativo'],['Público','Educación, ámbito socioeducativo y familias']];
 if(c.modality)facts.push(['Modalidad',c.modality]);if(c.duration)facts.push(['Duración',c.duration]);if(c.price?.confirmed)facts.push(['Precio',c.price.label]);
 document.getElementById('ficha').classList.add('complete-course');
 document.getElementById('ficha').innerHTML=`
 <nav class="breadcrumb" aria-label="Ruta de navegación"><a href="#/">Inicio</a><span aria-hidden="true"> / </span><a href="#/formacion">Formación</a><span aria-hidden="true"> / </span><span aria-current="page">Ficha de ejemplo</span></nav>
 <header class="course-intro"><span class="course-demo-label">Ejemplo demostrativo · No publicado</span><h1>${esc(c.title)}</h1><p class="course-lead">${esc(c.description)}</p><p class="course-for"><strong>Dirigido a</strong> ${esc(c.audience)}.</p><p class="course-editorial-note">Propuesta pedagógica orientativa. Programa, actividades y materiales pendientes de validación; sin inscripción real.</p></header>
 <div class="complete-course-layout"><aside class="course-enrolment" aria-labelledby="course-enrolment-title"><div class="course-enrolment-image resource-photo" aria-hidden="true">${window.schoolPhotos.image(c.photo)}</div><div class="course-enrolment-content"><span class="eyebrow">Tu siguiente paso</span><h2 id="course-enrolment-title">Explora la experiencia</h2><dl>${facts.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl><p class="course-pending-commercial">Modalidad, duración y condiciones de acceso pendientes de definir.</p><a class="primary" href="#/inscripcion/resumen">Simular inscripción →</a><p class="course-simulation-note">Sin pago, cuenta ni envío de datos.</p><a class="course-back-link" href="#/formacion">← Volver al catálogo</a></div></aside>
 <div class="course-reading"><nav class="course-jump-nav" aria-label="En esta ficha"><button data-course-section="course-learning">Aprendizaje</button><button data-course-section="course-program">Programa</button><button data-course-section="course-method">Metodología</button><button data-course-section="course-faq">Preguntas</button></nav>
 <section class="course-content-panel" id="course-learning" tabindex="-1"><span class="eyebrow">El punto de partida</span><h2>Objetivos de aprendizaje</h2>${list(c.objectives)}<div class="course-outcomes"><h3>Resultados de aprendizaje esperados</h3><p>Al completar esta propuesta, se buscaría que pudieras:</p><ol>${c.outcomes.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></div></section>
 <section class="course-content-panel" id="course-program" tabindex="-1"><div class="course-section-heading"><div><span class="eyebrow">Un recorrido progresivo</span><h2>Programa por unidades didácticas</h2></div><span class="course-outline-label">Programa de ejemplo</span></div><p>Del análisis del entorno a la elaboración de una respuesta educativa. Abre cada unidad para explorar la propuesta.</p><div class="course-modules">${c.modules.map((m,i)=>`<details ${i===0?'open':''}><summary><span class="course-module-number">${String(i+1).padStart(2,'0')}</span><span>Unidad ${i+1} · ${esc(m.appliedTitle||m.title)}</span></summary><div class="course-module-body"><p>${esc(m.description)}</p>${m.appliedTitle?`<p>Eje del programa: ${esc(m.title)}</p>`:""}<h3>Resultados de aprendizaje</h3>${list(m.outcomes)}<h3>Temas previstos</h3>${list(m.topics)}<p class="course-module-activity"><strong>Actividad propuesta</strong>${esc(m.activity)}</p></div></details>`).join('')}</div></section>
 <section class="course-content-panel" id="course-method" tabindex="-1"><span class="eyebrow">Aprender y aplicar</span><h2>Metodología y actividades</h2><p>Un diseño de aprendizaje centrado en la reflexión y en situaciones educativas. Su implementación y el acompañamiento docente se definirían antes de publicar una oferta.</p><div class="course-method-grid"><article><span>01 · Comprender</span><h3>Lectura crítica</h3><p>Análisis guiado de conceptos y mensajes en situaciones ficticias, sin contenido explícito.</p></article><article><span>02 · Practicar</span><h3>Casos y diálogo</h3><p>Preguntas de reflexión y elaboración de un guion adaptado a tu contexto.</p></article><article><span>03 · Aplicar</span><h3>Una propuesta educativa</h3><p>Diseño de una actividad y revisión con criterios de autoevaluación.</p></article></div></section>
 <section class="course-content-panel" aria-labelledby="course-materials-title"><span class="eyebrow">Para trabajar los contenidos</span><h2 id="course-materials-title">Materiales y recursos</h2><p>Esta propuesta contempla los siguientes materiales. Son marcadores de contenido, pendientes de elaboración y validación.</p>${list(c.materials)}<a href="#/recursos" class="course-inline-link">Explorar los recursos educativos de la escuela →</a></section>
 <section class="course-content-panel course-faculty" aria-labelledby="course-faculty-title"><div class="course-faculty-placeholder" aria-hidden="true">Equipo<span>Docente</span></div><div><span class="eyebrow">Contenido pendiente</span><h2 id="course-faculty-title">Equipo docente por confirmar</h2><p>Aquí se incorporarán la identidad, la trayectoria verificada y el papel de cada docente. Esta ficha no atribuye la formación a una persona ni a Dale Una Vuelta.</p></div></section>
 <section class="course-content-panel" id="course-faq" tabindex="-1"><span class="eyebrow">Antes de continuar</span><h2>Preguntas frecuentes</h2><div class="course-faq-list">${c.faq.map(([q,a],i)=>`<details><summary>${esc(q)}</summary><p>${esc(a)}${i===6?' <a href="#/centros-y-entidades">Explorar formación para centros →</a>':''}</p></details>`).join('')}</div></section>
 <section class="course-bottom-cta"><div><h2>Prueba el siguiente paso</h2><p>Explora cómo sería inscribirte, sin formalizar una matrícula.</p></div><a class="primary" href="#/inscripcion/resumen">Simular inscripción →</a></section></div></div>`;
 }
 document.addEventListener('click',e=>{
 const button=e.target.closest('button');if(!button)return;
 if(button.dataset.courseSection){const section=document.getElementById(button.dataset.courseSection);section.scrollIntoView({behavior:'instant',block:'start'});section.focus({preventScroll:true});}
 });
 window.coursePage={render};
})();
