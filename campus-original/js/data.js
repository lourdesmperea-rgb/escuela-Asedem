(() => {
 'use strict';
 const example={
 title:'Pornografía, adolescencia y educación sexual digital',
 audience:'Profesionales de la educación y del ámbito socioeducativo, y familias con adolescentes',
 description:'Una propuesta para comprender los mensajes sobre sexualidad en el entorno digital y diseñar respuestas educativas basadas en el diálogo, el pensamiento crítico y la prevención.',
 objectives:['Comprender el entorno de socialización sexual digital de la adolescencia.','Explorar cómo abordar expectativas, consentimiento y límites desde la educación.','Desarrollar criterios para seleccionar recursos y preparar conversaciones educativas.'],
 outcomes:['Distinguir mensajes del contenido pornográfico y contrastarlos con criterios de respeto, consentimiento y reciprocidad.','Elaborar un guion de conversación ajustado a un contexto familiar o educativo.','Analizar una situación ficticia y justificar una respuesta educativa sin recurrir al juicio ni al alarmismo.','Diseñar una actividad breve de alfabetización sexual digital con objetivos y recursos adecuados.'],
 modules:[
 {title:'Adolescencia y socialización digital',topics:['Preguntas y necesidades educativas en la adolescencia.','Agentes de socialización y fuentes de información sobre sexualidad.','Criterios para analizar contenidos y mensajes digitales.'],activity:'Mapa de fuentes: reconocer dónde se construyen las ideas sobre sexualidad.'},
 {title:'Pornografía y expectativas sobre las relaciones',topics:['Representaciones, guiones y expectativas.','Lectura crítica de los mensajes, sin exposición a contenido explícito.','Diferencias entre representación, intimidad y relaciones compartidas.'],activity:'Análisis de un caso ficticio y contraste de sus expectativas.'},
 {title:'Consentimiento, intimidad y convivencia',topics:['Respeto, reciprocidad y autonomía.','Límites personales y comunicación.','Privacidad y circulación de imágenes en contextos digitales.'],activity:'Propuesta de preguntas para trabajar límites y consentimiento.'},
 {title:'Conversaciones que abren el diálogo',topics:['Escucha y preguntas abiertas.','Cómo responder desde el ámbito familiar y educativo.','Adaptación del lenguaje al contexto y a las necesidades del grupo.'],activity:'Diseño de un guion para una conversación educativa.'},
 {title:'Del análisis a una propuesta educativa',topics:['Selección crítica de materiales.','Objetivos, secuencia y actividades de prevención.','Revisión de la propuesta y criterios de autoevaluación.'],activity:'Borrador de una actividad para el aula, un grupo o la familia.'}
 ]
 };
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
 window.campusCourse=example;
})();
