(() => {
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const routes={"campus":"campus-login","campus/mis-cursos":"campus","campus/curso":"campus-curso","campus/materiales":"campus-materiales"};
function route(){
 const path=location.hash.replace(/^#\/?/,'').replace(/\/$/,'')||'campus';
 if(path==='main')return;
 if(path.startsWith('campus/')&&!window.campusExperience.hasAccess()){window.campusExperience.requireDemoAccess(path);return;}
 const serviceTitles={'progreso':'Mi progreso','certificados':'Certificados','buzon':'Buzón','anuncios':'Anuncios','eventos':'Eventos','calendario':'Calendario','perfil':'Mi perfil','preferencias':'Preferencias','ayuda':'Ayuda y soporte','gestion':'Gestión formativa'};
 const service=path.startsWith('campus/')&&Object.hasOwn(serviceTitles,path.slice(7))?serviceTitles[path.slice(7)]:null;
 const example=path.match(/^campus\/ejemplo\/([a-z]+)(\/continuar)?$/);
 let view=service?'campus-services':routes[path];let title=service||'';
 if(example&&window.campusExperience.renderExample(example[1],Boolean(example[2]))){view='campus-services';title='Curso de ejemplo';}
 const momentRoute=path.match(/^(.+)\/momento\/([1-6])$/);
 const unit=window.campusExperience.unitFor(momentRoute?.[1]||path);
 if(unit&&!window.campusExperience.canOpen(unit)){location.replace('#/campus/curso');return;}
 if(unit){
  if(momentRoute)history.replaceState(null,'','#/'+unit.path);
  view=unit.view;title=unit.title;
 }
 if(view==='campus-login'&&window.campusExperience.hasAccess()){location.replace('#/campus/mis-cursos');return;}
 if(view==='campus'||view==='campus-curso')window.campusExperience.render(view);
 if(view==='campus-curso')title='Mi curso';

 if(!view){location.replace('#/campus');return;}
 $$('.view').forEach(el=>el.hidden=el.id!==view);
 const privateCampus=['campus','campus-curso','campus-materiales','unidad','unidad-multiformato','campus-services'].includes(view);
 $('.shell').classList.toggle('private-campus',privateCampus);
 $('.shell').classList.toggle('professional-campus',privateCampus&&path==='campus/gestion');
 const courseView=view==='campus-curso'||view==='unidad'||view==='unidad-multiformato';
 $('.shell').classList.toggle('course-mode',courseView);
 $('.shell').classList.remove('course-campus-open');
 $('#campus-sidebar').hidden=!privateCampus||courseView;
 if(unit)unit.render(momentRoute?Number(momentRoute[2])-1:undefined);
 $('#campus-user').hidden=!privateCampus;
 if(privateCampus){window.campusDashboard.render(path);window.campusServices.render(path);}
 if(courseView)$('#campus-sidebar').insertAdjacentHTML('afterbegin','<button type="button" class="secondary campus-collapse" data-campus-menu aria-controls="campus-sidebar" aria-label="Plegar menú del campus">‹ Plegar</button>');

 document.title=(title||'Mi campus')+' · Escuela Asedem';
 window.scrollTo(0,0);$('#main').focus({preventScroll:true});
}
window.addEventListener('hashchange',route);
const header=$('.site-header');
new ResizeObserver(()=>document.documentElement.style.setProperty('--header-height',header.getBoundingClientRect().height+'px')).observe(header);
$('.dialog-close').addEventListener('click',()=>$('#demo-dialog').close());
$('.menu-toggle').addEventListener('click',e=>e.currentTarget.setAttribute('aria-expanded',String($('.site-nav').classList.toggle('open'))));
document.addEventListener('click',e=>{
 const el=e.target.closest('[data-campus-menu]');if(!el)return;
 const sidebar=$('#campus-sidebar');
 sidebar.hidden=!sidebar.hidden;
 $('.shell').classList.toggle('course-campus-open',!sidebar.hidden);
 (sidebar.hidden?$('.view:not([hidden]) [data-campus-menu]'):sidebar.querySelector('[data-campus-menu]'))?.focus();
});
route();
})();