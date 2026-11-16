(() => {
 'use strict';
 const courseId='pornografia-adolescencia-educacion-sexual-digital';
 const course=window.schoolData.courses.find(item=>item.id===courseId);
 const courseLink='#/curso/'+courseId;
 const steps=['resumen','identificacion','pedido','confirmacion'];
 const labels=['Formación','Identificación','Pedido','Confirmación'];
 const page=document.getElementById('inscripcion');
 const price=new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(39);
 let identity=null;
 let confirmed=false;
 const link=step=>'#/inscripcion/'+step;
 const back=(href,label)=>'<a class="secondary" href="'+href+'">'+label+'</a>';
 const notice='<p class="checkout-notice">Demostración · Sin cobro ni envío de datos</p>';
 const courseSummary='<div class="checkout-course"><div class="resource-photo" aria-hidden="true">'+window.schoolPhotos.image(course.photo)+'</div><div><span class="course-demo-label">Formación de ejemplo</span><h2>'+course.title+'</h2><p>'+course.audience+'</p></div></div>';

 function render(step){
  if(!steps.includes(step))return 'not-found';
  if(step==='confirmacion'&&!confirmed){location.replace(link('resumen'));return null;}
  if(step==='pedido'&&!identity){location.replace(link('identificacion'));return null;}
  const index=steps.indexOf(step);
  let body;
  if(step==='resumen'){
   body='<h1>Tu formación elegida</h1>'+courseSummary+'<p>'+course.description+'</p><p>La inscripción permite probar el recorrido y abrir el curso de ejemplo en el campus.</p><div class="actions"><a class="primary" href="'+link('identificacion')+'">Continuar a identificación →</a>'+back(courseLink,'Volver a la ficha')+'</div>';
  }else if(step==='identificacion'){
   body='<h1>Identificación del alumnado</h1><p>Prueba el acceso o el registro con el perfil ficticio <strong>Alumna Demo</strong>.</p><form data-checkout-form="identity" novalidate><fieldset aria-describedby="checkout-error"><legend>Elige cómo continuar</legend><label><input type="radio" name="identity" value="acceso" required '+(identity==='acceso'?'checked':'')+'> Acceder con el perfil de demo</label><label><input type="radio" name="identity" value="registro" required '+(identity==='registro'?'checked':'')+'> Simular un registro con el perfil de demo</label></fieldset><p id="checkout-error" class="checkout-error" role="alert"></p><div class="actions"><button class="primary">Continuar al pedido →</button>'+back(link('resumen'),'Volver al resumen')+'</div></form>';
  }else if(step==='pedido'){
   body='<h1>Revisa tu pedido</h1>'+courseSummary+'<dl class="checkout-totals"><div><dt>Alumnado</dt><dd>Alumna Demo · '+(identity==='registro'?'Registro simulado':'Acceso simulado')+'</dd></div><div><dt>Precio ilustrativo</dt><dd>'+price+'</dd></div><div><dt>Cobro real</dt><dd>Ninguno</dd></div></dl><p>El importe es ficticio y sirve para mostrar el resumen de compra.</p><form data-checkout-form="order" novalidate><label class="checkout-consent"><input type="checkbox" required aria-describedby="checkout-error"> Entiendo que esta inscripción es simulada y que no se realizará ningún cobro.</label><p id="checkout-error" class="checkout-error" role="alert"></p><div class="actions"><button class="primary">Confirmar inscripción simulada →</button>'+back(link('identificacion'),'Volver a identificación')+'</div></form>';
  }else{
   body='<h1>Inscripción simulada confirmada</h1><p>Alumna Demo ya puede abrir esta formación en el campus de demostración durante esta visita.</p>'+courseSummary+'<div class="actions"><button class="primary" data-checkout-campus>Acceder al curso en el campus →</button>'+back('#/formacion','Volver al catálogo')+'</div>';
  }
  page.innerHTML=notice+'<ol class="checkout-steps" aria-label="Pasos de inscripción">'+labels.map((label,i)=>'<li '+(index===i?'aria-current="step"':'')+'><span>'+(i+1)+'</span> '+label+'</li>').join('')+'</ol><div class="white-panel checkout-panel">'+body+'</div>';
  return 'inscripcion';
 }

 page.addEventListener('submit',event=>{
  const form=event.target;
  event.preventDefault();
  const invalid=form.querySelector(':invalid');
  if(invalid){
   form.querySelector('[role="alert"]').textContent=form.dataset.checkoutForm==='identity'?'Selecciona una forma de identificación para continuar.':'Marca la casilla para confirmar que entiendes la simulación.';
   invalid.focus();
   return;
  }
  if(form.dataset.checkoutForm==='identity'){
   identity=form.querySelector('input:checked').value;
   confirmed=false;
   location.hash=link('pedido');
  }else if(identity){
   confirmed=true;
   location.hash=link('confirmacion');
  }
 });
 page.addEventListener('click',event=>{
  if(event.target.closest('[data-checkout-campus]')&&confirmed)window.campusExperience.enterCourse();
 });
 window.enrolmentExperience={render};
})();
