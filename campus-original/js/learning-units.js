(() => {
 const panel=document.getElementById('unidad-multiformato');
 const storageKey='duv-learning-units-v1';
 const data=window.learningContent;
 let records={};
 let active;
 try{
  const saved=JSON.parse(localStorage.getItem(storageKey));
  if(saved&&typeof saved==='object'&&!Array.isArray(saved))records=saved;
 }catch{}
 const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 const record=number=>records[number]??={};
 function persist(){
  try{localStorage.setItem(storageKey,JSON.stringify(records));return true;}catch{return false;}
 }
 function progress(number){
  const state=record(number);
  return {done:Number(Boolean(state.finished)),total:1,finished:Boolean(state.finished),started:Boolean(state.started),criterion:data[number].criterion};
 }
 function activity(title,body,open=false){
  return `<details class="course-activity" ${open?'open':''}><summary>${title}</summary><div class="unit-content">${body}</div></details>`;
 }
 function quiz(unit,state){
  const answers=state.answers||[];
  return `<form data-learning-quiz>${unit.questions.map(([question,options,correct,feedback],i)=>`<fieldset><legend>${question}</legend>${options.map((option,j)=>`<label><input type="radio" name="q${i}" value="${j}" required ${answers[i]===j?'checked':''}> ${option}</label>`).join('')}${answers[i]!==undefined?`<p><strong>${answers[i]===correct?'Criterio aplicado.':'Revisa este criterio.'}</strong> ${feedback}</p>`:''}</fieldset>`).join('')}<button class="primary">Comprobar respuestas</button></form>`;
 }
 function project(unit,state){
  return `<form data-learning-project><p>El borrador se guarda en este navegador. Completa los diez apartados y guarda el proyecto para finalizar la unidad.</p>${unit.fields.map(([key,label,hint])=>`<div class="learning-field"><label for="learning-${key}">${label}</label><small id="learning-hint-${key}">${hint}</small><textarea id="learning-${key}" name="${key}" rows="2" maxlength="1200" aria-describedby="learning-hint-${key}" required>${escape(state.draft?.[key])}</textarea></div>`).join('')}<div class="actions"><button class="primary">Guardar proyecto completo</button>${state.saved?'<button class="secondary" type="button" data-learning-export>Descargar proyecto guardado ↓</button>':''}</div></form>`;
 }
 function savedProject(unit,state){
  if(!state.saved)return '';
  const draftChanged=unit.fields.some(([key])=>(state.draft?.[key]??state.saved[key])!==state.saved[key]);
  return activity('Ver proyecto guardado',`<article class="learning-document"><h3>Última versión guardada</h3><p>${draftChanged?'El editor contiene cambios de borrador posteriores a esta versión.':'Esta es la versión registrada al guardar el proyecto completo.'}</p><dl>${unit.fields.map(([key,label])=>`<div><dt>${label}</dt><dd>${escape(state.saved[key])}</dd></div>`).join('')}</dl></article>`);
 }
 function furtherReading(number){
  return activity('Para profundizar',`<p>Recursos opcionales.</p>${window.learningSources[number].map(([group,title,author,access,description,url])=>`<section class="learning-reference"><h3>${group}</h3><p class="small">${access} · ${author}</p><p><a href="${url}" target="_blank" rel="noopener noreferrer">${title} ↗</a></p><p>${description}</p></section>`).join('')}`);
 }
 function render(number,path,message=''){
  active={number,path};
  const state=record(number),unit=data[number];
  const openSection=message?panel.querySelector('[data-learning-action]')?.open:false;
  state.started=true;
  persist();
  const blocks=unit.blocks.map(([title,body],i)=>activity(title,body,i===0));
  const assessment=activity(unit.criterion,unit.questions?quiz(unit,state):project(unit,state),openSection).replace('<details ','<details data-learning-action ');
  blocks.splice(unit.blocks.length-(number===3?0:1),0,assessment);
  if(number===5&&state.saved)blocks.splice(blocks.length-1,0,savedProject(unit,state));
  blocks.push(furtherReading(number));
  panel.innerHTML=window.campusExperience.courseLayout(`<p class="small">Material de demostración para revisión pedagógica. Trabaja con ejemplos ficticios y evita introducir datos personales.</p><div class="course-activity-list">${blocks.join('')}</div><p id="learning-status" role="status" tabindex="-1">${message}</p>${state.finished?'<a class="secondary" href="#/campus/curso">Volver al itinerario →</a>':''}`,path);
  if(message)panel.querySelector('#learning-status').focus();
 }
 panel.addEventListener('input',event=>{
  if(!event.target.matches('[data-learning-project] textarea'))return;
  event.target.setCustomValidity('');
  const state=record(active.number);
  (state.draft??={})[event.target.name]=event.target.value;
  const notice=panel.querySelector('.learning-document > p');
  if(notice&&state.saved)notice.textContent=data[active.number].fields.some(([key])=>(state.draft[key]??state.saved[key])!==state.saved[key])?'El editor contiene cambios de borrador posteriores a esta versión.':'Esta es la versión registrada al guardar el proyecto completo.';
  if(!persist())panel.querySelector('#learning-status').textContent='Borrador disponible solo mientras esta página siga abierta.';
 });
 panel.addEventListener('submit',event=>{
  event.preventDefault();
  const form=event.target,unit=data[active.number],state=record(active.number),values=new FormData(form);
  let message;
  if(form.matches('[data-learning-quiz]')){
   state.answers=unit.questions.map((_,i)=>Number(values.get('q'+i)));
   const passed=unit.questions.every((question,i)=>state.answers[i]===question[2]);
   if(passed)state.finished=true;
   message=passed?'Unidad completada. Puedes continuar desde el menú del curso.':'Respuestas registradas. Revisa el feedback y vuelve a intentarlo.';
  }else{
   const blank=unit.fields.find(([key])=>!values.get(key)?.trim());
   if(blank){
    const field=form.elements.namedItem(blank[0]);
    field.setCustomValidity('Completa este apartado con una propuesta concreta.');
    field.reportValidity();
    return;
   }
   state.saved=Object.fromEntries(unit.fields.map(([key])=>[key,values.get(key).trim()]));
   state.draft={...state.saved};
   state.finished=true;
   message='Proyecto completo. Ya puedes descargar la versión guardada.';
  }
  if(!persist())message+=' El navegador no permite conservar este cambio al recargar.';
  render(active.number,active.path,message);
 });
 panel.addEventListener('click',event=>{
  if(!event.target.closest('[data-learning-export]'))return;
  const saved=record(active.number).saved;
  const lines=data[active.number].fields.map(([key,label])=>label+'\n'+saved[key]);
  const blob=new Blob(['Proyecto educativo · Escuela Dale Una Vuelta\nBorrador de demostración · Sin revisión docente\n\n'+lines.join('\n\n')],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const link=document.createElement('a');
  link.href=url;
  link.download='proyecto-educativo.txt';
  link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
 });
 window.learningUnits={render,progress};
})();
