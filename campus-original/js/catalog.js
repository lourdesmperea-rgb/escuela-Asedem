(() => {
 'use strict';
 const data=window.schoolData, $=s=>document.querySelector(s);
 const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const online='Cursos online', workshop='Talleres', seminar='Seminarios';
 const affective='Educación afectivo-sexual',porn='Prevención del consumo de pornografía',violence='Prevención de violencias',digital='Bienestar digital',family='Acompañamiento familiar',educational='Práctica profesional y educativa';
 const existing=[{audiences:['Familias','Profesionales','Centros educativos'],areas:[affective,family],photo:0},{audiences:['Profesionales','Centros educativos','Familias'],areas:[porn,digital],photo:1},{audiences:['Profesionales'],areas:[educational,porn],photo:3}];
 // Publication identifies the source, not ownership or intellectual property.
 const confirmed={
  'educacion-afectiva-sexual':{modality:'Online',duration:'10 vídeos de 10 min'},
  'educacion-sexual-digital-educadores':{modality:'Online',duration:'Más de 11 h de vídeo'},
  'educacion-sexual-digital-salud':{modality:'Online'}
 };
 const initialIds=['educacion-afectiva-sexual','educacion-sexual-digital-educadores','educacion-sexual-digital-salud'];
 data.courses.forEach(c=>{const i=initialIds.indexOf(c.id);if(i>=0)Object.assign(c,existing[i],confirmed[c.id],{format:online,recognition:[],featured:true,publication:'Publicado en Dale Una Vuelta'});});
 const examples=[
 ['educacion-emocional-familias','Educación emocional y vínculos en familia',online,['Familias'],[family,affective],0,[]],
 ['prevencion-pornografia-aula','Prevención del consumo de pornografía en el aula',online,['Profesionales','Centros educativos'],[porn,digital],1,[]],
 ['deteccion-violencias','Detección y prevención de violencias sexuales',online,['Profesionales','Centros educativos'],[violence,educational],3,[]],
 ['habitos-digitales','Hábitos digitales saludables y pensamiento crítico',online,['Familias','Centros educativos'],[digital,porn],4,[]],
 ['acompanamiento-familiar','Acompañamiento familiar en la adolescencia',online,['Familias','Profesionales'],[family,affective],0,[]],
 ['intervencion-consumo','Prevención educativa del consumo problemático',online,['Profesionales'],[educational,porn],3,[]],
 ['conversaciones-casa','Cómo abrir conversaciones sobre sexualidad en casa',workshop,['Familias'],[family,affective],0,[]],
 ['intimidad-consentimiento','Intimidad, límites y consentimiento',workshop,['Familias','Centros educativos'],[affective,violence],3,[]],
 ['prevencion-centros','Prevención de violencias en centros educativos',workshop,['Centros educativos','Profesionales'],[violence],1,[]],
 ['redes-sociales-familia','Redes sociales: acuerdos y límites en familia',workshop,['Familias'],[digital,family],4,[]],
 ['educar-afectividad','Educar la afectividad en el aula',workshop,['Profesionales','Centros educativos'],[affective],3,[]],
 ['escucha-acompanamiento','Escucha y diálogo en contextos educativos',workshop,['Familias','Profesionales'],[family,educational],0,[]],
 ['entorno-digital-adolescencia','Adolescencia y entorno digital: retos educativos',seminar,['Profesionales','Centros educativos'],[digital,porn],1,[]],
 ['trabajo-red-educativa','Trabajo en red y coordinación educativa',seminar,['Profesionales'],[educational],5,[]],
 ['prevencion-violencia-digital','Prevención de la violencia en entornos digitales',seminar,['Profesionales','Centros educativos'],[violence,digital],5,[]]
 ];
 examples.forEach(([id,title,format,audiences,areas,photo,recognition])=>data.courses.push({id,title,format,audiences,areas,photo,recognition:[],demo:true,audience:audiences.join(' · '),topic:areas[0],meta:format===online?'Online · A tu ritmo (ejemplo)':format===workshop?'Taller práctico · Ejemplo':'Seminario · Ejemplo',description:'Propuesta ilustrativa para explorar '+title.toLowerCase()+'. Programa y condiciones ilustrativos; no pertenece a la oferta publicada de Dale Una Vuelta.',facts:['Propuesta de ejemplo',format,'Modalidad y condiciones por definir'],objectives:['Explorar conceptos y situaciones relacionados con esta temática.','Reflexionar sobre herramientas de prevención y acompañamiento.','Conectar el aprendizaje con el contexto personal o profesional.'],program:[['01. Comprender el contexto',['Conceptos y retos de la temática. Programa orientativo.']],['02. Reflexionar sobre situaciones',['Análisis de casos y preguntas para el diálogo.']],['03. Aplicar lo aprendido',['Orientaciones y recursos de ejemplo.']]]}));
 // Only expose options present in the data. Authorship is optional and must be confirmed.
 const groupDefinitions=[['areas','Temática'],['audiences','Público destinatario'],['modality','Modalidad'],['format','Tipo de formación']];
 const valuesFor=key=>[...new Set(data.courses.flatMap(c=>Array.isArray(c[key])?c[key]:c[key]?[c[key]]:[]))];
 const groups=groupDefinitions.map(([key,title])=>[key,title,valuesFor(key)]).filter(([, ,values])=>values.length);
 const filters=Object.fromEntries(groups.map(([key])=>[key,new Set()]));
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 $('#catalog-filter-groups').innerHTML=groups.map(([key,title,values])=>`<fieldset class="catalog-filter-group"><legend>${title}</legend>${values.map(value=>`<label><input type="checkbox" data-catalog-filter="${key}" value="${escape(value)}"><span>${escape(value)}</span></label>`).join('')}</fieldset>`).join('');
 function photo(c){return `<div class="catalog-photo catalog-photo-${c.photo}" role="img" aria-label="Fotografía ilustrativa generada con IA sobre aprendizaje y acompañamiento"></div>`;}
 function card(c){
 const example=!!c.demo;
 const origin=example?'Ejemplo · Demo':c.publication||'Procedencia por confirmar';
 const authorship=c.authorship?.confirmed?c.authorship.label:'';
 return `<article class="market-course-card catalog-result-card"><a class="market-photo-link" href="#/curso/${escape(c.id)}" tabindex="-1" aria-hidden="true">${photo(c)}</a><div class="market-course-body"><span class="catalog-source-label ${example?'example-label':'official-label'}">${escape(origin)}</span><h3><a href="#/curso/${escape(c.id)}">${escape(c.title)}</a></h3><p class="catalog-card-description">${escape(example?'Propuesta de ejemplo sobre '+c.title.toLowerCase()+'. No es una oferta publicada de Dale Una Vuelta.':c.description)}</p><p class="market-audience"><span>Para</span> ${escape(example?c.audiences.join(' · '):c.audience)}</p>${authorship?`<p class="catalog-authorship">${escape(authorship)}</p>`:''}<dl class="catalog-card-facts"><div><dt>Tipo</dt><dd>${escape(c.format)}</dd></div><div><dt>Modalidad</dt><dd>${escape(c.modality||'Por definir')}</dd></div><div><dt>Duración</dt><dd>${escape(c.duration||'Por confirmar')}</dd></div>${c.price?.confirmed?`<div><dt>Precio</dt><dd>${escape(c.price.label)}</dd></div>`:''}</dl><a class="primary" href="#/curso/${escape(c.id)}" aria-label="${example?'Ver ejemplo':'Ver ficha'}: ${escape(c.title)}">${example?'Ver ejemplo':'Ver ficha'} →</a></div></article>`;
 }
 function render(){
 const rawQuery=$('#catalog-search').value.trim(), terms=normalize(rawQuery).split(/\s+/).filter(Boolean);
 let found=data.courses.filter(c=>{
 const haystack=normalize([c.title,c.description,c.audience,...(c.areas||[]),c.format,c.modality||''].join(' '));
 return terms.every(term=>haystack.includes(term))&&groups.every(([key])=>!filters[key].size||[...(Array.isArray(c[key])?c[key]:[c[key]])].some(v=>filters[key].has(v)));
 });
 if($('#catalog-sort').value==='title')found=found.slice().sort((a,b)=>a.title.localeCompare(b.title,'es'));
 else found=found.slice().sort((a,b)=>Number(!!a.demo)-Number(!!b.demo));
 const examples=found.filter(c=>c.demo).length, published=found.length-examples;
 $('#catalog-count').textContent=found.length+' '+(found.length===1?'resultado':'resultados')+' · '+published+' '+(published===1?'referencia publicada':'referencias publicadas')+' · '+examples+' '+(examples===1?'ejemplo':'ejemplos');
 document.querySelectorAll('[data-catalog-filter]').forEach(input=>input.checked=filters[input.dataset.catalogFilter].has(input.value));
 const selected=Object.values(filters).reduce((sum,set)=>sum+set.size,0);
 $('#catalog-filter-summary').textContent='Filtros'+(selected?' ('+selected+')':'');
 $('#catalog-active-filters').innerHTML=(rawQuery?`<button data-clear-catalog-query aria-label="Quitar búsqueda">Búsqueda: ${escape(rawQuery)} ×</button>`:'')+groups.flatMap(([key])=>[...filters[key]].map(v=>`<button data-remove-catalog="${key}" data-filter-value="${escape(v)}" aria-label="Quitar filtro ${escape(v)}">${escape(v)} ×</button>`)).join('');
 $('#catalog-sections').innerHTML=!found.length?'<div class="empty catalog-empty"><h2>No encontramos formaciones</h2><p>Prueba palabras más generales o elimina algún filtro. Puedes restablecer la búsqueda para ver todo el catálogo.</p><button class="secondary" data-clear-catalog>Restablecer búsqueda y filtros</button></div>':`<section class="catalog-shelf"><div class="catalog-shelf-heading"><h2>${terms.length||selected?'Resultados de tu búsqueda':'Todas las formaciones'}</h2></div><div class="market-course-grid">${found.map(card).join('')}</div></section>`;
 }
 function clear(){Object.values(filters).forEach(set=>set.clear());$('#catalog-search').value='';$('#catalog-sort').value='recommended';render();}
 document.addEventListener('change',e=>{if(e.target.matches('[data-catalog-filter]')){const key=e.target.dataset.catalogFilter,value=e.target.value;if(e.target.checked)filters[key].add(value);else filters[key].delete(value);render();}});
 document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-clear-catalog')){clear();$('#catalog-search').focus();}if(b.hasAttribute('data-clear-catalog-query')){$('#catalog-search').value='';render();$('#catalog-search').focus();}if(b.dataset.removeCatalog){filters[b.dataset.removeCatalog].delete(b.dataset.filterValue);render();$('#catalog-search').focus();}if(b.dataset.catalogType){filters.format.clear();filters.format.add(b.dataset.catalogType);render();document.querySelector('.marketplace-heading').scrollIntoView({block:'start'});}});
 $('#catalog-search').addEventListener('input',render);$('#catalog-sort').addEventListener('change',render);
 const media=matchMedia('(max-width:700px)');function resize(){document.getElementById('catalog-sidebar-details').open=!media.matches;}media.addEventListener('change',resize);resize();
 window.catalogExperience={photo,render,selectAudience(value){clear();filters.audiences.add(value);render();},selectArea(value){clear();filters.areas.add(value);render();}};render();
})();
