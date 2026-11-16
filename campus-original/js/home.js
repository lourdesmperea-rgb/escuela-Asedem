(() => {
 'use strict';
 const verified=new Set(['educacion-afectiva-sexual','educacion-sexual-digital-educadores']);
 const ids=['educacion-afectiva-sexual','educacion-sexual-digital-educadores','habitos-digitales'];
 document.getElementById('home-featured-courses').innerHTML=ids.map(id=>{
 const c=window.schoolData.courses.find(course=>course.id===id),official=verified.has(id)&&!c.demo;
 return `<article class="market-course-card home-course-card ${official?'home-official-course':'home-demo-course'}"><div class="resource-photo" aria-hidden="true">${window.schoolPhotos.image(c.photo)}</div><div class="market-course-body"><span class="home-course-label ${official?'official-label':'example-label'}">${official?'Curso con referencia oficial':'Propuesta de ejemplo · Demo'}</span><h3><a href="#/curso/${c.id}">${c.title}</a></h3><p class="home-course-audience">${c.audience}</p><p class="home-course-description">${official?c.description:'Propuesta ilustrativa para esta demo. No es una formación oficial publicada ni admite matrícula real.'}</p><a class="primary" href="#/curso/${c.id}">${official?'Ver formación':'Ver ejemplo'} →</a>${official?`<a class="home-official-source" href="${c.source}" target="_blank" rel="noopener noreferrer">Fuente oficial ↗</a>`:''}</div></article>`;
 }).join('');
})();
