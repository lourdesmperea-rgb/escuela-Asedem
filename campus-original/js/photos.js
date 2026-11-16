(() => {
 'use strict';
 function image(index){const n=Number(index),x=(n%3)*2048/3,y=Math.floor(n/3)*384;return `<svg viewBox="${x} ${y} ${2048/3} 384" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><image href="assets/course-photos.webp" width="2048" height="768"/></svg>`;}
 window.schoolPhotos={image};
 document.querySelectorAll('[data-resource-photo]').forEach(el=>el.innerHTML=image(el.dataset.resourcePhoto));
})();
