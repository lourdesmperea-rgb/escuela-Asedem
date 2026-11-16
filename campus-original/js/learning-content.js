(() => {
 const explanation=(title,text)=>`<section><h3>${title}</h3><p>${text}</p></section>`;
 const summary=points=>`<h3>Síntesis</h3><ul>${points.map(point=>`<li>${point}</li>`).join('')}</ul>`;
 const resource=(path,label)=>`<p><a class="secondary" href="assets/${path}" download>${label} ↓</a></p>`;
 const video=`<figure class="learning-video"><strong>#DesinformaciónSexual · El consumo de pornografía en adolescentes</strong>
 <figcaption>Save the Children España · 2020 · Vídeo externo en español. Pieza de campaña que acompaña al informe de 2020.</figcaption>
 <iframe src="https://www.youtube-nocookie.com/embed/qL1nmnUQYb8" title="Vídeo de Save the Children España sobre pornografía y adolescencia" loading="lazy" width="640" height="360" style="display:block;width:100%;height:auto;aspect-ratio:16/9;margin:1rem 0;border:0" allowfullscreen></iframe>
 <p><a href="https://www.youtube.com/watch?v=qL1nmnUQYb8" target="_blank" rel="noopener noreferrer">Ver el vídeo en YouTube</a></p>
 <p>¿Qué vías de exposición presenta el vídeo? ¿Qué información sobre la muestra y el método del informe necesitarías para interpretar sus afirmaciones?</p></figure>`;
 const mapNodes=[
  ['Familia y referentes adultos','Ofrecen conversación y apoyo','Una persona adulta abre una conversación sobre qué hacer ante un mensaje incómodo.'],
  ['Grupo de iguales','Negocia pertenencia y normas','El grupo puede reforzar una broma o cuestionar que sea aceptable para todas las personas.'],
  ['Escuela y otros espacios educativos','Enseñan a contrastar y pedir ayuda','En tutoría se analiza quién habla en un mensaje y qué puntos de vista quedan fuera.'],
  ['Redes sociales','Amplifican mensajes y reacciones','Una frase repetida en el feed gana visibilidad sin representar a todo el grupo.'],
  ['Contenidos audiovisuales y cultura digital','Ofrecen relatos que se interpretan','Una escena editada presenta una forma de relacionarse. El grupo puede imaginar otras.']
 ];
 const socialMap=`<figure class="learning-map"><figcaption>Cómo se construyen referentes</figcaption><div class="learning-map-center">Adolescente</div><ul>${mapNodes.map(([node,relation,example])=>`<li><span class="learning-map-relation">${relation}</span><details><summary>${node}</summary><p>${example}</p></details></li>`).join('')}</ul></figure>
 <details><summary>Alternativa textual del mapa</summary><p>El adolescente interpreta mensajes de cinco ámbitos que pueden reforzarse o contradecirse.</p><ul>${mapNodes.map(([node,relation,example])=>`<li><strong>${node}.</strong> ${relation}. ${example}</li>`).join('')}</ul></details>
 <p>Mensaje ficticio: «Todo el mundo piensa así». ¿Quién habla y qué queda fuera? Otro ejemplo: «Si te importa alguien, tienes que responder enseguida». ¿Qué otras formas de cuidar una relación deja fuera esa frase?</p>`;
 const comparisons=[
  ['Comunicación','«Si me conoce, sabrá lo que quiero».','¿Qué da por supuesto sobre la comunicación?','Preguntar y escuchar sin darlo por hecho.'],
  ['Reciprocidad','«Una persona decide el ritmo».','¿Quién puede proponer una pausa o cambiar de opinión?','Compartir decisiones y respetar una pausa.'],
  ['Roles','«La iniciativa corresponde siempre a la misma persona».','¿Qué papel presenta como fijo y qué alternativas omite?','Separar las preferencias de las expectativas de género.'],
  ['Diversidad','«Todas las relaciones se parecen».','¿Qué experiencias y formas de relación quedan fuera?','Reconocer distintos ritmos, identidades y formas de relación.']
 ];
 const comparisonColumns=['Mensaje o representación','Pregunta de análisis crítico','Orientación educativa'];
 const comparison=`<div class="learning-table" role="region" aria-label="Tabla de mensajes y alternativas" tabindex="0"><table><thead><tr>${comparisonColumns.map(label=>`<th scope="col">${label}</th>`).join('')}</tr></thead><tbody>${comparisons.map(([topic,message,question,orientation])=>`<tr><th scope="row"><strong>${topic}</strong><br>${message}</th><td>${question}</td><td>${orientation}</td></tr>`).join('')}</tbody></table></div>
 <dl class="learning-comparison-mobile">${comparisons.map(([topic,...values])=>`<div><dt><strong>${topic}</strong></dt><dd><dl>${values.map((value,index)=>`<dt>${comparisonColumns[index]}</dt><dd>${value}</dd>`).join('')}</dl></dd></div>`).join('')}</dl><p>Los mensajes anteriores son ficticios y sirven para el análisis, sin reproducir material explícito.</p>`;
 const relationships=`<figure class="learning-relations"><figcaption>Relaciones que ayudan a cuidar los acuerdos</figcaption><ul>
 <li><strong>Comunicación</strong><span>permite expresar →</span><strong>Límites</strong></li>
 <li><strong>Límites</strong><span>orientan los acuerdos de →</span><strong>Consentimiento</strong></li>
 <li><strong>Consentimiento</strong><span>ayuda a respetar la →</span><strong>Intimidad</strong></li>
 <li><strong>Privacidad digital</strong><span>cuida la intimidad y contribuye a la →</span><strong>Protección</strong></li>
 </ul><p>Estas relaciones sirven para la prevención educativa. Ante una preocupación concreta, consulta el protocolo del centro y la vía de protección correspondiente.</p></figure>`;
 const sources={
  1:[['Artículos e informes','(Des)información sexual: pornografía y adolescencia','Save the Children España · 2020','Consulta gratuita','Informe histórico para analizar vías de exposición y leer los resultados en el contexto de su muestra.','https://www.savethechildren.es/desinformacionsexual']],
  2:[['Bibliografía complementaria','Pornografía y educación afectivosexual','Lluís Ballester Brage, Teresa Facal y Carlos Rosón Varela (coords.) · 2020','Ficha editorial o publicación comercial','Compilación de estudios y experiencias educativas para ampliar el análisis crítico.','https://octaedro.com/libro/pornografia-y-educacion-afectivosexual/'],
   ['Vídeos y documentales','Let’s Talk Porn','Maria Ahlin · TEDx Talks · 2019','Vídeo externo','Charla opcional en inglés. Elige una afirmación de la ponente: ¿qué evidencia aporta y qué información te faltaría para valorar su alcance?','https://www.youtube.com/watch?v=DBTb71UzPmY']],
  3:[['Guías y materiales descargables','Guía de uso seguro y responsable de Internet para profesionales de servicios de protección a la infancia','INCIBE · 2019','Descarga gratuita','El apartado de datos personales e identidad digital amplía el trabajo sobre privacidad.','https://www.incibe.es/sites/default/files/contenidos/guia_para_profesionales_de_servicios_de_proteccion_a_la_infancia.pdf']],
  5:[['Guías y materiales descargables','Orientaciones técnicas internacionales sobre educación en sexualidad','UNESCO, ONUSIDA, UNFPA, UNICEF, ONU Mujeres y OMS · 2018','Consulta gratuita','Marco para revisar la adecuación de los objetivos y la secuencia al grupo destinatario. La ficha oficial también ofrece la descarga.','https://www.who.int/es/publications/m/item/9789231002595']]
 };
 window.learningSources=sources;
 window.learningContent={
  1:{
   criterion:'Comprobación de comprensión',
   blocks:[
    ['Presentación y vídeo',`<p>Identifica referentes de socialización y explica por qué la repetición de un mensaje no lo convierte en una norma. Distingue quién produce un mensaje, quién lo comparte y cómo se interpreta.</p>${video}`],
    ['Adolescencia y referentes digitales',explanation('Construir referentes','Durante la adolescencia se ensayan maneras de pertenecer, relacionarse y definir la propia identidad. Las referencias pueden venir de la familia, las amistades, el centro educativo y los entornos digitales. Una misma persona puede encontrar mensajes contradictorios en esos espacios.')+explanation('Visibilidad y aceptación','Los entornos digitales facilitan que algunos mensajes se repitan. Su visibilidad no permite concluir que sean mayoritarios, deseables o compartidos por todo el grupo.')],
    ['Mapa de socialización y ejemplos',socialMap],
    ['Síntesis',summary(['Compara referentes de varios entornos.','Distingue exposición, aceptación y conducta.','Pregunta quién habla, qué omite y cómo se difunde el mensaje.'])]
   ],
   questions:[
    ['Si un mensaje aparece repetidamente, ¿qué puedes concluir?',['Que representa a todo el grupo.','Que tiene visibilidad en ese entorno.'],1,'La visibilidad no mide acuerdo ni práctica.'],
    ['¿Qué ayuda a comprender el origen de una expectativa?',['Comparar mensajes de distintos entornos y preguntar quién los difunde.','Atribuirla siempre a una sola plataforma.'],0,'La socialización combina referentes que pueden incluso contradecirse.']
   ]
  },
  2:{
   criterion:'Análisis de mensajes y estereotipos',
   blocks:[
    ['Objetivos y lectura crítica',explanation('Del mensaje a la expectativa','Identifica supuestos sobre las relaciones y formula interpretaciones alternativas. La pornografía ofrece representaciones seleccionadas y producidas para una audiencia. Un contenido puede circular como referencia sin que todas las personas lo interpreten igual ni lo conviertan en un modelo de conducta.')+explanation('Una lectura en tres pasos','Describe primero el mensaje observable. Después identifica lo que da por supuesto y lo que omite. Finalmente formula una alternativa que incluya comunicación, reciprocidad y diversidad.')],
    ['Mensajes, expectativas y alternativas educativas',comparison],
    ['Ficha de preguntas para el análisis crítico',`<p>Utiliza la ficha con un mensaje inventado. Distingue lo que muestra el ejemplo de la interpretación que haces de él.</p>${resource('preguntas-analisis-critico.txt','Descargar preguntas para el análisis crítico de los mensajes sobre sexualidad')}`],
    ['Síntesis',summary(['Una representación selecciona lo que se ve y lo que queda fuera.','Los ejemplos sirven para formular hipótesis de lectura, sin diagnosticar conductas.','Una alternativa educativa hace visible cómo se negocian límites y decisiones.'])]
   ],
   questions:[
    ['«Quien te quiere sabe qué quieres». ¿Qué supuesto transmite?',['Que preguntar ayuda a evitar malentendidos.','Que el afecto sustituye la comunicación.'],1,'La frase da por hecho que se pueden conocer los deseos de otra persona sin hablar.'],
    ['¿Qué alternativa desmonta mejor el estereotipo «solo una persona toma la iniciativa»?',['Cualquiera puede proponer y ambas personas pueden decidir, parar o cambiar de opinión.','Cambiar quién toma siempre la iniciativa.'],0,'Cambiar un papel fijo por otro conserva la expectativa de que alguien debe asumirlo siempre.']
   ]
  },
  3:{
   criterion:'Autoevaluación de la programación de aula',
   blocks:[
    ['Consentimiento, límites e intimidad',explanation('Objetivos','Distingue consentimiento, límites e intimidad. Diseña una actividad en la que el alumnado pueda practicar cómo pedir permiso, responder a una negativa y respetar decisiones que cambian.')+explanation('Acuerdos concretos','El consentimiento es libre, concreto y puede retirarse. Aceptar una acción no significa aceptar otra. Para trabajar la idea en el aula, utiliza decisiones cotidianas como participar en una foto de grupo o compartirla después.')],
    ['Privacidad y convivencia digital',relationships+explanation('Antes de compartir','Preguntar antes de publicar una foto y confirmar quién podrá verla ayuda a distinguir entre tomarla, guardarla y difundirla. Si alguien cambia de opinión, se puede detener la difusión y acordar cómo retirar el contenido.')+explanation('Prevención y respuesta','Una actividad educativa permite practicar límites y vías de ayuda. Ante una revelación o posible situación de violencia, evita investigar en grupo o pedir detalles. Escucha con calma, cuida la privacidad y activa el protocolo aplicable con la persona responsable de protección del centro.')],
    ['Propuesta de aula · Antes de compartir',`<div class="learning-lesson"><h3>Antes de compartir</h3><dl><div><dt>Destinatarios y tiempo</dt><dd>Grupo de 13 a 15 años. 45 minutos orientativos.</dd></div><div><dt>Objetivos y contenidos</dt><dd>Distinguir permiso para tomar y difundir una imagen, respetar un cambio de opinión e identificar una vía de ayuda. Consentimiento, privacidad y responsabilidad compartida.</dd></div><div><dt>Metodología y recursos</dt><dd>Trabajo en parejas y puesta en común con tarjetas ficticias, pizarra y ficha de salida. Ofrece participación escrita o como observador.</dd></div><div><dt>Secuencia</dt><dd>5 min de acuerdos de cuidado, 10 min para analizar una foto ficticia de grupo, 15 min para reformular un diálogo, 10 min de contraste y 5 min de ficha de salida.</dd></div><div><dt>Cuidado</dt><dd>Utiliza personajes inventados, sin pedir relatos personales ni mostrar imágenes privadas. Facilita una vía de consulta individual y una alternativa a la exposición oral.</dd></div><div><dt>Evaluación</dt><dd>La ficha de salida distingue dos permisos, propone una frase que respeta una negativa e identifica a quién pedir ayuda.</dd></div></dl></div>${resource('plantilla-actividad-aula.txt','Descargar plantilla de actividad de aula')}`]
   ],
   questions:[
    ['Si una persona acepta salir en una foto, ¿qué falta antes de publicarla?',['Confirmar si acepta la difusión y quién podrá verla.','Dar por incluido el permiso de publicación.'],0,'Tomar y publicar una imagen son decisiones distintas.'],
    ['Si aparece una revelación durante la actividad, ¿qué respuesta protege mejor al alumnado?',['Pedir al grupo que ayude a aclarar lo ocurrido.','Ofrecer escucha privada y seguir el protocolo del centro.'],1,'La actividad preventiva no sustituye la respuesta de protección.']
   ]
  },
  5:{
   criterion:'Proyecto completo guardado',
   blocks:[
    ['Del análisis a la programación',`<p>Diseña una propuesta breve y ajustada a tu contexto profesional. Usa un grupo ficticio o descríbelo de forma general, sin nombres ni datos identificativos.</p><p>Ejemplo: un grupo de 14 años necesita distinguir consentimiento y difusión de imágenes. Tras analizar un diálogo inventado, redacta dos respuestas respetuosas y explica cuándo pedir ayuda.</p>`],
    ['Criterios de revisión',`<ul><li>Formula objetivos que se puedan observar en una actividad o producto.</li><li>Conecta cada tarea con un objetivo y una evidencia de aprendizaje.</li><li>Incluye alternativas de participación y una vía de ayuda, sin pedir relatos íntimos.</li><li>Ajusta el tiempo a la secuencia e indica qué materiales necesitas.</li></ul>`],
    ['Cierre del curso',summary(['Identifica los referentes de socialización digital.','Lee críticamente las representaciones y las expectativas.','Aplica consentimiento, intimidad y cuidado a decisiones educativas.','Revisa el proyecto y descarga la ficha para adaptarla a tu contexto.'])+`<p>El proyecto es de autoelaboración. La demo no ofrece revisión docente.</p>`]
   ],
   fields:[
    ['group','Grupo destinatario','Ejemplo: grupo ficticio de 14 años, con niveles de participación variados.'],
    ['need','Necesidad educativa','¿Qué situación educativa quieres trabajar y por qué?'],
    ['goals','Objetivos de aprendizaje','Ejemplo: distinguir permiso para tomar una foto y permiso para difundirla.'],
    ['topics','Contenidos','Ejemplo: consentimiento, privacidad y responsabilidad compartida.'],
    ['method','Metodología','¿Cómo participarían las personas? Prevé una alternativa a la exposición oral.'],
    ['sequence','Secuencia de actividades','Ordena apertura, desarrollo, contraste y cierre.'],
    ['resources','Recursos','Enumera tarjetas, fichas, soportes y alternativas accesibles.'],
    ['timing','Temporalización','Reparte el tiempo entre las tareas. Indica si es orientativo.'],
    ['care','Medidas de cuidado','Usa ejemplos ficticios y define una vía de ayuda.'],
    ['assessment','Evaluación','¿Qué evidencia observable te permitirá comprobar cada objetivo?']
   ]
  }
 };
})();
