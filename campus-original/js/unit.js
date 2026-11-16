(() => {
 const panel = document.querySelector('#unidad');
 const stages = ['Situación inicial','Microcontenido','Caso con decisiones','Feedback','Aplicación práctica','Evaluación'];
 const unit = window.campusCourse.modules[3];
 const title = unit.appliedTitle;
 const scene = 'Durante una actividad educativa con adolescentes, una persona cuenta que ha visto pornografía en internet y pregunta si las relaciones sexuales son como aparecen en esos vídeos. El grupo reacciona con risas y comentarios.';
 const criteria = [
  ['Acoger sin exponer','Agradece la pregunta, frena las burlas y habla en general. No pidas detalles sobre quién vio qué.'],
  ['Distinguir representación y relación','Un vídeo presenta una escena construida. En una relación, las personas hablan de lo que desean, acuerdan límites y pueden cambiar de opinión.'],
  ['Abrir una conversación crítica','Pregunta qué información falta en una escena ficticia para saber si hay respeto, acuerdo y libertad para decidir.']
 ];
 const choices = [
  ['Aplazar la conversación','Agradeces la pregunta y propones retomarla en una sesión preparada.','El grupo recupera el orden, pero la pregunta queda sin respuesta y las risas pueden marcar el tono.','Aplazar puede ser útil si falta tiempo. Antes, corta la burla y ofrece una respuesta breve que distinga ficción y relaciones.'],
  ['Responder y abrir el diálogo','Frenas las burlas, agradeces la pregunta y propones hablar de cómo se acuerdan los límites en una escena ficticia.','El grupo tiene una pauta para hablar sin convertir a quien preguntó en el centro de atención.','Acoges la duda y proteges a quien la plantea. La escena ficticia permite hablar de consentimiento y pensamiento crítico sin pedir experiencias personales.'],
  ['Explicar primero qué muestran esos vídeos','Das una explicación general sobre cómo se construyen esas escenas y dejas las preguntas para el final.','La explicación aclara que hay una representación, pero puede dejar intactas las burlas y la duda sobre cómo actuar en una relación.','La lectura crítica es útil. Combínala con una norma de respeto y una pregunta sobre consentimiento para que el grupo pueda aplicar la distinción.']
 ];
 const questions = [
  ['Al día siguiente alguien repite la pregunta y el grupo se ríe. ¿Cómo empiezas?', ['Pides a quien preguntó que explique mejor lo que vio.','Paras las burlas y agradeces la pregunta sin pedir detalles.'],1,'Acoger la pregunta y poner un límite a la burla protege la participación sin exponer a nadie.'],
  ['En un diálogo ficticio, alguien dice «si no protesta, está de acuerdo». ¿Qué criterio trabajas?', ['El silencio no basta. Se necesita un acuerdo libre que puede cambiar.','El contexto permite interpretar el silencio como acuerdo.'],0,'El consentimiento exige poder elegir y comunicar el acuerdo. También debe ser posible parar o cambiar de opinión.'],
  ['Tienes cinco minutos para retomar el tema con el grupo. ¿Qué actividad propones?', ['Enumerar riesgos y pedir que los recuerden.','Leer un diálogo ficticio y reescribirlo para incluir una pregunta y una respuesta respetuosa.'],1,'Reescribir el diálogo convierte el criterio de respeto y consentimiento en una actuación observable.']
 ];
 let step = 0, reached = 0, finished = false, reflection = '', decision = -1, draft = '', reviewed = false, results = null;
 const answers = [];
 const scores = [];
 const visited = new Set();
 const activities = new Set();
 const key = 'duv-conversacion-educativa-v1';
 let immediate = false;
 try {
  const saved = JSON.parse(localStorage.getItem(key));
  if(saved && Array.isArray(saved.visited) && Array.isArray(saved.activities)){
   ({step,reached,finished,reflection,decision,reviewed,results}=saved);
   saved.visited.forEach(value=>visited.add(value));
   saved.activities.forEach(value=>activities.add(value));
   answers.push(...saved.answers);
   if(Array.isArray(saved.scores))scores.push(...saved.scores.filter(score=>Number.isInteger(score)&&score>=0&&score<=3).slice(0,2));
   else if(results)scores.push(results.filter(Boolean).length);
   immediate=saved.immediate;
   draft=typeof saved.draft==='string'?saved.draft:'';
  }
 }catch{}
 function save(){
  try {
   localStorage.setItem(key,JSON.stringify({step,reached,finished,reflection,decision,draft,reviewed,results,answers,scores,immediate,visited:[...visited],activities:[...activities]}));
  }catch{}
 }
 const summary=()=>`${visited.size} de 6 momentos visitados · ${activities.size} de 4 actividades realizadas`;
 function consequence(choice){
  return `<div class="unit-callout" role="status"><strong>Una consecuencia posible</strong><p>${choice[2]}</p><p>${choice[3]}</p></div>`;
 }
 const radio = (name, options, value) => options.map((option,i)=>`<label class="unit-choice"><input type="radio" name="${name}" value="${i}" ${i===value?'checked':''}><span>${option}</span></label>`).join('');
 const form = (content,label) => `<form data-unit-form>${content}<p class="unit-error" role="alert"></p><button class="primary">${label}</button></form>`;
 function screen(){
  switch(step){
   case 0:return `<blockquote>${scene}</blockquote><p>Antes de responder, identifica qué necesita atención en ese momento.</p>`+form(radio('reflection',['La seguridad para hacer preguntas','La diferencia entre ficción y realidad','La dinámica del grupo'],reflection===''?-1:Number(reflection)),'Explorar los criterios →');
   case 1:return '<p>Vuelve a la escena inicial con tres criterios de actuación.</p>'+criteria.map(([name,body])=>`<details class="unit-concept"><summary>${name}</summary><p>${body}</p></details>`).join('')+form('','Aplicar los criterios al caso →');
   case 2:return `<blockquote>${scene}</blockquote><p>Quedan unos minutos de actividad. ¿Cómo intervendrías ahora?</p>`+form(radio('decision',choices.map(([name,body])=>`<strong>${name}</strong><br>${body}`),decision)+(immediate&&decision>=0?consequence(choices[decision]):''),immediate?'Comparar alternativas →':'Ver qué puede ocurrir →');
   case 3:return `<h3>${choices[decision][0]}</h3><div class="unit-callout"><strong>Una consecuencia posible</strong><p>${choices[decision][2]}</p></div><p>${choices[decision][3]}</p><h3>Compara las alternativas</h3>${choices.map(choice=>`<details class="unit-concept"><summary>${choice[0]}</summary>${consequence(choice)}</details>`).join('')}<button class="secondary" data-unit-step="2">Revisar mi decisión</button>`+form('','Preparar mi intervención →');
   case 4:return `<p>Escribe una intervención de tres frases para la escena ficticia. Acoge la pregunta, distingue representación y relación, y plantea una pregunta abierta al grupo.</p><ul><li>Frena la burla sin señalar a nadie.</li><li>Incluye el acuerdo libre y la posibilidad de cambiar de opinión.</li><li>Trabaja con un ejemplo ficticio sin pedir vivencias personales.</li></ul>`+form(`<label for="unit-draft">Mi intervención</label><textarea id="unit-draft" rows="5" maxlength="1200" placeholder="Escribe para la escena ficticia"></textarea><p class="small">Usa solo la situación ficticia. El borrador se guarda en este navegador. Evita introducir datos personales.</p>${reviewed?'<div class="unit-callout"><strong>Ejemplo orientativo</strong><p>Gracias por preguntar. Aquí podemos hablar sin burlas y sin contar experiencias personales. Un vídeo muestra una escena construida, mientras que en una relación hace falta un acuerdo libre que puede cambiar. En un diálogo inventado, ¿cómo preguntarías si la otra persona quiere seguir?</p><p>Contrasta tu texto con los tres criterios y edítalo antes de continuar.</p></div>':''}`,reviewed?'Ir a la evaluación →':'Contrastar con un ejemplo →');
   case 5:return results ? `<p><strong>${results.filter(Boolean).length} de 3 decisiones alineadas con los criterios.</strong></p>`+questions.map(([q,options,best,feedback],i)=>`<div class="unit-callout"><strong>${q}</strong><p>Elegiste: ${options[answers[i]]}</p><p>${results[i]?'Criterio aplicado.':'Revisa este criterio.'} ${feedback}</p></div>`).join('')+`<button class="secondary" data-unit-retry>Revisar evaluación</button>`+form('','Cerrar unidad →') : form(questions.map(([q,options],i)=>`<fieldset><legend>${q}</legend>${radio('question'+i,options,answers[i])}</fieldset>`).join(''),'Ver mi retroalimentación →');
   default:return `<p>Has completado los seis momentos y revisado tus decisiones.</p><ul>${criteria.map(([name,body])=>`<li><strong>${name}.</strong> ${body}</li>`).join('')}</ul><p>La unidad cuenta como una unidad finalizada en el progreso del curso.</p><a class="primary" href="#/campus/curso">Volver al índice de unidades →</a>`;
  }
 }
 function momentList(expanded){
  return `<div class="course-activity-list" aria-label="Momentos de aprendizaje">${stages.map((name,i)=>{
   const label=`<span class="course-activity-marker" role="img" aria-label="Visitado" ${visited.has(i)?'':'hidden'}>✓</span>${name}`;
   if(i===step)return `<details class="course-activity course-activity-current" ${expanded?'open':''}><summary>${label}</summary><article class="unit-content"><h3 tabindex="-1">${name}</h3>${screen()}</article></details>`;
   if(i>reached)return `<div class="course-activity course-moment-locked">${label} · Bloqueado</div>`;
   return `<button type="button" class="course-activity" data-unit-step="${i}">${label}</button>`;
  }).join('')}</div>`;
 }
 function open(moment){
  if(Number.isInteger(moment)&&moment>=0&&moment<=reached)step=moment;
  render();
 }
 function render(focus=false,expanded=true){
  if(step<6&&expanded)visited.add(step);
  save();
  panel.innerHTML = window.campusExperience.courseLayout(`<nav class="breadcrumb" aria-label="Ruta de navegación"><a href="#/campus/mis-cursos">Mi campus</a> / <a href="#/campus/curso">Mi curso</a> / <span aria-current="page">Unidad 4</span></nav><p>Material pedagógico ilustrativo, pendiente de revisión por Dale Una Vuelta.</p><p><strong>${summary()} · ${finished?'Unidad finalizada':'Unidad sin finalizar'}</strong></p><p id="unit-navigation-status" role="status"></p>${momentList(expanded)}${step===6?`<article class="white-panel unit-content"><h3 tabindex="-1">Unidad completada</h3>${screen()}</article>`:''}<details class="unit-concept course-unit-results"><summary>Resultados de aprendizaje y evidencias</summary><ol><li>Formular una primera respuesta que acoja la pregunta sin exponer a nadie. Se practica en el caso y se comprueba en la primera decisión de la evaluación.</li><li>Distinguir una representación de una relación basada en consentimiento y respeto. Se aplica en el caso y en la segunda decisión de la evaluación.</li><li>Redactar una intervención educativa breve con una pregunta abierta y un ejemplo ficticio. El texto se revisa con criterios y un ejemplo. La tercera pregunta valora la elección de una actividad de transferencia.</li></ol></details>`,'campus/unidad/conversacion-educativa');
  const field = panel.querySelector('textarea');
  if(field)field.value=draft;
  if(focus){
   const target=panel.querySelector(expanded?'.unit-content h3':'.course-activity > summary');
   target?.focus();
  }
 }
 panel.addEventListener('toggle',event=>{
  if(!event.target.matches('details.course-activity')||!event.target.open||step>=6||visited.has(step))return;
  visited.add(step);
  save();
  const summary=event.target.querySelector('summary');
  const marker=summary.querySelector('.course-activity-marker');
  marker.hidden=false;
 },true);
 panel.addEventListener('input',event=>{if(event.target.id==='unit-draft'){draft=event.target.value;save();}});
 panel.addEventListener('click',event=>{
  const button=event.target.closest('button');
  if(!button)return;
  if(button.hasAttribute('data-unit-step')){const target=Number(button.dataset.unitStep);if(target>=0&&target<=reached){
   if(panel.querySelector('details.course-activity[open]')&&target>step){panel.querySelector('#unit-navigation-status').textContent='Pliega el contenido actual antes de abrir el siguiente.';return;}
   step=target;render(true);
  }}
  if(button.hasAttribute('data-unit-retry')){results=null;render(true);}
 });
 panel.addEventListener('submit',event=>{
  event.preventDefault();
  const data=new FormData(event.target);
  const error=message=>{event.target.querySelector('.unit-error').textContent=message;};
  if(step===0){if(!data.has('reflection'))return error('Selecciona qué atenderías primero.');reflection=data.get('reflection');activities.add('reflexion');}
  if(step===2){if(!data.has('decision'))return error('Selecciona una actuación para ver sus consecuencias.');const selected=Number(data.get('decision'));
   activities.add('caso');
   if(!immediate||decision!==selected){decision=selected;immediate=true;render(true);return;}
  }
  if(step===4){
   if(!draft.trim())return error('Escribe una intervención para la situación ficticia antes de continuar.');
   if(!reviewed){reviewed=true;render(true);return;}
   activities.add('aplicacion');
  }
  if(step===5&&!results){
   if(questions.some((_,i)=>!data.has('question'+i)))return error('Responde a las tres situaciones para recibir retroalimentación.');
   questions.forEach((_,i)=>{answers[i]=Number(data.get('question'+i));});
   activities.add('evaluacion');results=questions.map((q,i)=>answers[i]===q[2]);
   scores[Math.min(scores.length,1)]=results.filter(Boolean).length;
   render(true);return;
  }
  step++;
  reached=Math.max(reached,Math.min(step,5));
  if(step===6)finished=true;
  render(true,step===6);
 });
 function reset(){
  step=0;reached=0;finished=false;reflection='';decision=-1;draft='';reviewed=false;results=null;immediate=false;
  visited.clear();activities.clear();answers.length=0;scores.length=0;panel.replaceChildren();
  try{localStorage.removeItem(key);}catch{}
 }
 window.unitExperience={render,open,momentList,stages,reset,progress:()=>({finished,started:visited.size>0,visitedCount:visited.size,activityCount:activities.size,scores:[...scores],score:scores.at(-1)??null,summary:summary(),moment:step<6?`Momento ${step+1} de 6 · ${stages[step]}`:'Cierre de la unidad'})};
})();
