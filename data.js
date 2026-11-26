/* ============================================================
   ENTRE EL RITO Y EL REFUGIO · Capa de datos
   Todo el contenido académico vive aquí, separado de la interfaz.
   Para cambiar una fotografía: reemplace img/fNN.jpg y th/fNN.jpg
   (NN = número de página en IMG_1849.pdf).
   ============================================================ */
window.DATA = (function () {

/* ---------- Fuentes ---------- */
const SOURCES = {
  E1: { id:'E1', short:'Entrada 1', title:'Primera entrada de campo (Bitácora Isabella)', date:'14 de octubre de 2026 · día 14', who:'Isabella Tobón', kind:'primaria · antecedente', note:'Día de la celebración mensual del Señor de los Milagros. Recorrido, observación y entrevistas.' },
  E2: { id:'E2', short:'Entrada 2', title:'Segunda entrada de campo (Bitácora Isabella)', date:'22 de octubre de 2026 · jueves, 11:30 a. m.–1:15 p. m.', who:'Isabella Tobón', kind:'primaria · antecedente', note:'Día entre semana. Se define la pregunta sobre la oración colectiva, la fe y la esperanza.' },
  E3: { id:'E3', short:'Entrada 3', title:'Tercera entrada de campo', date:'17 de noviembre de 2026 · martes, 4:00–5:15 p. m.', who:'Isabella Tobón', kind:'primaria · prioritaria', note:'Nuevo enfoque: ritualidad y afrontamiento de la angustia, la enfermedad y la incertidumbre.' },
  E4: { id:'E4', short:'Entrada 4', title:'Cuarta entrada de campo', date:'22 de noviembre de 2026 · domingo, 5:30–6:30 p. m.', who:'Isabella Tobón', kind:'primaria · prioritaria', note:'Primera visita en domingo. Solo registra lo nuevo o diferente respecto a la entrada 3.' },
  BV: { id:'BV', short:'Bitácora Vanessa', title:'Bitácora de campo de Vanessa González', date:'13, 14, 25 y 27 de octubre de 2026', who:'Vanessa González', kind:'primaria · antecedente', note:'Investigación documental previa, recorrido del 14 de octubre, visita dominical del 25 de octubre y entrevistas del 27 de octubre.' },
  PRE: { id:'PRE', short:'Entrevistas previas', title:'Ejercicio previo a la visita (Bitácora Isabella)', date:'Antes de la primera visita', who:'Isabella Tobón', kind:'primaria · fuera del territorio', note:'Dos entrevistas a creyentes del entorno familiar de la investigadora, realizadas fuera de la parroquia.' },
  INF: { id:'INF', short:'Marco teórico', title:'Marco teórico y documental', date:'2026', who:'Lecturas de antropología del ritual, etnohistoria, geografía social, psicología de la religión y doctrina católica', kind:'secundaria · teórica', note:'Reúne a los autores con los que dialogamos —Gómez García, Echeverry Pérez, Restrepo, Guber, Fernández, Lyshon— y los artículos del Catecismo que usamos para el nivel de «lo que se debería hacer». Cuando una afirmación teórica no coincidía con lo que vimos en campo, le dimos prioridad a las bitácoras (ver «Contraste entre fuentes»).' },
  FOTO: { id:'FOTO', short:'Evidencia fotográfica', title:'Evidencia fotográfica del equipo', date:'Tomadas durante las visitas de campo; la fecha exacta de cada imagen no quedó registrada', who:'Equipo de investigación', kind:'primaria · visual', note:'Las fotografías funcionan como prueba de lo que describimos en las bitácoras: muestran el espacio, los objetos y la forma en que se ocupa el templo. Por respeto a las personas, no les atribuimos emociones ni las vinculamos con ningún testimonio.' }
};

/* ---------- Archivo fotográfico (n = página del PDF) ---------- */
const P = (n, cap, space, tags) => ({ n, cap, space, tags });
const PHOTOS = [
  P(1,'Nave central llena: la asamblea de pie frente al retablo dorado del altar mayor.','nave',['ritual','ocupacion']),
  P(2,'Ingreso a la nave bajo el letrero «Entrada»: la asamblea de pie desde el fondo del templo.','entrada',['recorrido']),
  P(3,'Bancas delanteras: unas personas de pie y otras arrodilladas durante la celebración.','nave',['ritual','cuerpo']),
  P(4,'Manos levantadas hacia el altar mayor durante la eucaristía.','nave',['ritual','cuerpo']),
  P(5,'Pantalla con una oración que evoca la «admirable caridad de una indígena sencilla».','nave',['historia']),
  P(6,'Buzón de ofrendas en la reja verde de un altar.','senor',['objetos','economia']),
  P(7,'Pantalla con una oración al Señor de los Milagros; manos alzadas en primer plano.','nave',['historia','ritual']),
  P(8,'Asamblea de pie con brazos levantados, vista desde la entrada.','nave',['ritual','recorrido']),
  P(9,'Pasillo interior con una fila larga de personas en espera.','confesionario',['recorrido']),
  P(10,'Altar lateral con pintura enmarcada en dorado y arreglo de flores blancas.','laterales',['objetos']),
  P(11,'Altar lateral (otra toma de la fotografía 10).','laterales',['objetos']),
  P(12,'Acceso a la capilla del Santísimo bajo el lema redentorista «Copiosa apud eum redemptio».','santisimo',['recorrido']),
  P(13,'Placa informativa «Capilla del Santísimo Sacramento».','santisimo',['historia']),
  P(14,'Persona arrodillada frente a un altar con reja verde, velas y ofrendas.','senor',['cuerpo','objetos']),
  P(15,'Persona con ramos de flores en una bolsa, dentro del templo.','nave',['objetos']),
  P(16,'Nave lateral llena; asamblea de pie.','nave',['ritual','ocupacion']),
  P(17,'Interior de la capilla del Santísimo.','santisimo',['espacio']),
  P(18,'Figuras de cera amarillas y estampas depositadas junto a la base del Cristo; flores envueltas.','cristo',['objetos']),
  P(19,'Pantalla con el «Himno al Señor de los Milagros» durante la misa.','nave',['historia','ritual']),
  P(20,'Ministra con vestidura blanca recorre la nave con un recipiente (la bitácora 1 registra una imagen similar como reparto de la comunión).','nave',['recorrido','actores']),
  P(21,'Nave llena con manos alzadas, vista lateral.','nave',['ritual','ocupacion']),
  P(22,'Una mano toca los pies del Cristo crucificado; al lado, figuras de cera y flores.','cristo',['cuerpo','objetos']),
  P(23,'Altar lateral de La Piedad con hileras de velas.','laterales',['objetos']),
  P(24,'Reja verde con flores y velas de pila.','senor',['objetos']),
  P(25,'Arco de piedra con la inscripción «Señor de los Milagros de Buga»: personas de pie frente al altar.','senor',['historia','recorrido']),
  P(26,'Altar del Señor de los Milagros: placa metálica en el muro y vela encendida.','senor',['objetos','historia']),
  P(27,'Una persona deja una lámina del Sagrado Corazón sobre una caja de ofrendas.','senor',['objetos']),
  P(28,'Lámina sobre la caja de ofrendas (otra toma de la fotografía 27).','senor',['objetos']),
  P(29,'Exterior: plazoleta con vendedores bajo sombrillas y flujo de transeúntes.','entrada',['economia','recorrido']),
  P(30,'Altar mayor: retablo dorado y pantallas, con la asamblea reunida.','altar',['ritual']),
  P(31,'Manos levantadas frente al altar mayor desde las bancas.','nave',['ritual','cuerpo']),
  P(32,'Figuras de cera amarillas, estampas y oraciones impresas dejadas en un altar.','cristo',['objetos']),
  P(33,'Venta de flores en baldes sobre la acera.','entrada',['economia','objetos']),
  P(34,'Una persona sola en una banca, frente a un altar lateral.','laterales',['cuerpo']),
  P(35,'Dos personas sentadas en una banca cerca del letrero de salida.','nave',['ocupacion']),
  P(36,'Bancas con pocas personas frente a altares laterales y celosías.','laterales',['ocupacion']),
  P(37,'Nave con baja ocupación.','nave',['ocupacion']),
  P(38,'Nave central con baja ocupación hacia el altar mayor.','nave',['ocupacion']),
  P(39,'Dos personas de pie frente a la reja del altar del Señor de los Milagros.','senor',['cuerpo']),
  P(40,'Hileras de velas encendidas bajo una imagen de La Piedad.','laterales',['objetos']),
  P(41,'Caja de ofrendas con el letrero «Dios bendiga su ofrenda».','nave',['objetos','economia']),
  P(42,'Pies del Cristo con un ramo de girasoles.','cristo',['objetos']),
  P(43,'Fila de personas frente al arco del Señor de los Milagros de Buga.','senor',['recorrido']),
  P(44,'Grupo de personas reunido ante el Cristo crucificado sobre muro blanco.','cristo',['cuerpo','recorrido']),
  P(45,'Nave con ocupación media: personas de pie y sentadas, circulación por el pasillo.','nave',['ocupacion','recorrido']),
  P(46,'Confesionario de vidrio transparente.','confesionario',['espacio']),
  P(47,'Acceso al Santísimo en horario nocturno.','santisimo',['recorrido']),
  P(48,'Persona sentada en una banca con la mirada hacia arriba.','laterales',['cuerpo']),
  P(49,'Personas sentadas en bancas, cabezas inclinadas.','laterales',['cuerpo']),
  P(50,'Altar lateral del Sagrado Corazón.','laterales',['objetos']),
  P(51,'Altar lateral con imagen mariana.','laterales',['objetos']),
  P(52,'Persona arrodillada en el piso junto al muro, con las manos juntas.','laterales',['cuerpo']),
  P(53,'Camarín del Señor de los Milagros tras la reja, con flores y letrero de limosna.','senor',['objetos','historia'])
];

/* ---------- Voces (anonimizadas) ---------- */
const VOICES = {
  A:{ code:'Voz A', who:'Entrevistada', src:'E3' },
  B:{ code:'Voz B', who:'Entrevistada', src:'E3' },
  C:{ code:'Voz C', who:'Entrevistada', src:'E4' },
  D:{ code:'Voz D', who:'Entrevistado', src:'E4' },
  E:{ code:'Voz E', who:'Persona entrevistada', src:'E1' },
  F:{ code:'Voz F', who:'Entrevistada', src:'E1' },
  G:{ code:'Voz G', who:'Religiosa misionera', src:'E2' },
  H:{ code:'Voz H', who:'Entrevistada', src:'E2' },
  I:{ code:'Voz I', who:'Creyente (entrevista previa)', src:'PRE' },
  J:{ code:'Voz J', who:'Creyente (entrevista previa)', src:'PRE' },
  K:{ code:'Voz K', who:'Entrevistada (síntesis)', src:'BV' },
  L:{ code:'Voz L', who:'Entrevistado (síntesis)', src:'BV' }
};

/* ---------- Testimonios ----------
   literal:true = cita textual transcrita en la bitácora.
   literal:false = síntesis escrita por la investigadora. */
const TESTIMONIES = [
 { id:'t1', voice:'B', title:'Buscar en el templo la calma que falta en casa', literal:true,
   quotes:['Yo vengo a la iglesia cuando tengo muchas preocupaciones, porque siento que aquí puedo encontrar la tranquilidad que a veces me falta en mi casa.',
           'A veces llego aquí con muchas preocupaciones, pero después de rezar siento que puedo salir más tranquila y enfrentar las cosas con otra mirada.'],
   context:'Entrevista en la tercera entrada (martes, 4:00 p. m.).', situations:['preocupaciones'], practices:['oracion-altar'], emotions:['tranquilidad'], spaces:['laterales','senor'], gestures:['silencio'],
   interp:'La persona no describe la desaparición del problema, sino un cambio en la manera de afrontarlo («otra mirada»). Es una lectura de afrontamiento, no de solución.', axis:'psi', ref:'Tercera entrada, «Registrar las voces del territorio», entrevistada 2.' },
 { id:'t2', voice:'B', title:'Hablar con Dios de manera más personal', literal:true,
   quotes:['A mí me gusta acercarme a los altares porque siento que ahí puedo hablar con Dios de una manera más personal y contarle mis problemas.',
           'Yo acostumbro a prender una vela cuando tengo una petición especial, y cuando siento que Dios me ha escuchado, vuelvo para darle las gracias.'],
   context:'Misma entrevistada. Relaciona un lugar (los altares) y un objeto (la vela) con un ciclo de petición y agradecimiento.', situations:['preocupaciones','gratitud'], practices:['velas','oracion-altar'], emotions:['esperanza','gratitud'], spaces:['laterales','senor'], gestures:['tocar'],
   interp:'La vela funciona como mediador material: hace visible una petición y marca el regreso para agradecer. El altar ofrece una escala íntima dentro del espacio compartido.', axis:'con', ref:'Tercera entrada, entrevistada 2.' },
 { id:'t3', voice:'B', title:'No ser la única persona en momentos difíciles', literal:true,
   quotes:['Muchas veces uno viene solo, pero al ver a tantas personas rezando siente que no es el único que está pasando por momentos difíciles.',
           'Cuando uno está pasando por una situación difícil, se aferra mucho más a la fe, porque hay cosas que uno no puede solucionar por su propia cuenta.'],
   context:'Misma entrevistada. Asistencia individual dentro de una asamblea.', situations:['preocupaciones'], practices:['misa'], emotions:['acompanamiento'], spaces:['nave'], gestures:['silencio'],
   interp:'La copresencia funciona como acompañamiento aunque no haya interacción directa: coincide con la conjetura B de la tercera entrada («la compañía a través de la fe»).', axis:'con', ref:'Tercera entrada, entrevistada 2; conjetura B.' },
 { id:'t4', voice:'A', title:'Del vacío a sentirse «llena de la palabra»', literal:true,
   quotes:['Antes de entrar a la parroquia siento un vacío, necesidad de que la palabra llegue y ya cuando sale uno, pues ya está pues como llena de la palabra y con mucha fe.',
           'La iglesia me ayuda a afrontar los problemas de mi vida, ya que me afianza la fe y me recuerda que hay un Dios delante, atrás, a un lado y al otro.'],
   context:'Entrevista en la tercera entrada.', situations:['vacio'], practices:['misa'], emotions:['fortaleza','acompanamiento'], spaces:['entrada','nave'], gestures:['persignarse'],
   interp:'El umbral del templo organiza un antes y un después en el relato. La imagen de un Dios «delante, atrás, a un lado y al otro» expresa una sensación de amparo espacial.', axis:'psi', ref:'Tercera entrada, entrevistada 1.' },
 { id:'t5', voice:'A', title:'La luz que lleva la petición', literal:true,
   quotes:['Para mí dejar una vela encendida en un altar, es pedir con devoción y que llegue hasta los cielos, por medio de la luz, las oraciones y las plegarias.',
           'Algo que encuentro aquí que no encuentro en otros lugares, es la devoción ante el Señor de los milagros, porque a él uno le pide con fe y devoción y le presenta ante el altar nuestras súplicas y así son concedidas.'],
   context:'Misma entrevistada. Vincula la vela con la petición y el altar con la devoción al Señor de los Milagros.', situations:['peticion'], practices:['velas','oracion-altar'], emotions:['esperanza'], spaces:['senor'], gestures:['tocar'],
   interp:'La entrevistada otorga a la vela una función de traslado de la súplica. Es un significado expresado por ella, no una interpretación del equipo.', axis:'antro', ref:'Tercera entrada, entrevistada 1.' },
 { id:'t6', voice:'C', title:'Desahogarse y encontrar «un poquito de paz»', literal:true,
   quotes:['Yo trato de venir todos los domingos a misa, pero cuando estoy pasando por algún problema vengo también entre semana, porque siento que aquí puedo desahogarme y encontrar un poquito de paz.',
           'Hay veces que uno llega con tantas preocupaciones que ni siquiera sabe qué pedir, entonces uno simplemente se arrodilla y le entrega todo a Dios.'],
   context:'Entrevista en la cuarta entrada (domingo).', situations:['preocupaciones'], practices:['misa','arrodillarse'], emotions:['desahogo','paz'], spaces:['nave','laterales'], gestures:['arrodillarse'],
   interp:'Cuando faltan las palabras, el gesto toma su lugar: arrodillarse «entrega» lo que no se sabe nombrar. Es un ejemplo explícito de paralenguaje actuado en voz de la creyente.', axis:'con', ref:'Cuarta entrada, entrevistada 1.' },
 { id:'t7', voice:'C', title:'Quedarse cuando la mayoría se ha ido', literal:true,
   quotes:['A mí me gusta mucho quedarme después de misa en la iglesia, cuando ya se ha ido la mayoría de la gente, porque puedo acercarme a rezar y pedirle al señor de los Milagros por las cosas que yo y mi familia necesitamos o darle las gracias por los milagros que ya me ha concedido.',
           'Yo siempre me acerco al Señor de los Milagros, porque le tengo mucha fe y siento que me ha acompañado en momentos muy difíciles de mi vida.'],
   context:'Misma entrevistada. Elige el momento posterior a la eucaristía para la oración individual.', situations:['peticion','gratitud'], practices:['despues-misa','oracion-altar'], emotions:['acompanamiento','gratitud'], spaces:['senor'], gestures:['desplazarse'],
   interp:'El tiempo se usa como recurso de intimidad: después de la misa, el mismo espacio se vuelve más personal.', axis:'con', ref:'Cuarta entrada, entrevistada 1.' },
 { id:'t8', voice:'C', title:'Fuerza para enfrentar, no solución', literal:true,
   quotes:['Yo creo que la iglesia no le soluciona a uno todos los problemas, pero sí le da la fuerza para enfrentarlos. Es como que uno sale de aquí con otra actitud.',
           'A veces prefiero venir sola porque hay cosas que uno no quiere contarle a nadie, pero que sí siente la necesidad de hablarlas con Dios.'],
   context:'Misma entrevistada.', situations:['preocupaciones'], practices:['oracion-individual'], emotions:['fortaleza','desahogo'], spaces:['nave','senor'], gestures:['silencio'],
   interp:'La propia creyente separa la fe de la resolución de los problemas. La investigadora retoma esta idea en su interpretación 3 de la cuarta entrada.', axis:'psi', ref:'Cuarta entrada, entrevistada 1.' },
 { id:'t9', voice:'D', title:'La enfermedad de su esposa y la duda', literal:true,
   quotes:['Cuando mi esposa se enfermó, yo venía casi diario a pedir por ella. Al principio me daba mucha rabia porque no entendía por qué nos estaba pasando esto y hasta cuestioné mi fe.',
           'Algo que aprendí fue a tener paciencia. Cuando mi esposa estuvo hospitalizada, había días en los que no recibíamos buenas noticias, pero al final del día rezar me ayudaba a no desesperarme tanto.'],
   context:'Entrevista en la cuarta entrada. Enfermedad grave y hospitalización de un familiar.', situations:['enfermedad','dudas'], practices:['asistencia-frecuente','oracion-individual'], emotions:['rabia-duda','paciencia'], spaces:['nave'], gestures:[],
   interp:'La fe aparece atravesada por la rabia y el cuestionamiento, no como certeza estable. La oración se describe como algo que modera el desespero, no como algo que lo elimina.', axis:'psi', ref:'Cuarta entrada, entrevistado 2.' },
 { id:'t10', voice:'D', title:'¿Una fe de intercambio?', literal:true,
   quotes:['Yo tenía la costumbre de hacer promesas cada vez que necesitaba algo, pero después empecé a cuestionarme si estaba viviendo mi fe como una especie de intercambio, como si Dios tuviera que darme algo a cambio por mis cambios.'],
   context:'Mismo entrevistado.', situations:['dudas'], practices:['promesas'], emotions:['rabia-duda'], spaces:[], gestures:[],
   interp:'La promesa (manda) es puesta en duda desde dentro. Esto matiza una lectura frecuente en la literatura, que entiende las promesas como una forma de recuperar el control frente a la crisis: aquí la persona misma se pregunta si esa lógica de intercambio tiene sentido.', axis:'con', ref:'Cuarta entrada, entrevistado 2.' },
 { id:'t11', voice:'E', title:'Una promesa materna y un viaje a Buga', literal:true,
   quotes:['Yo era muy enfermo y mi mamá le prometió al Señor de los Milagros ir a Buga y con mis manitos ponerle una caja de miel y ella me hizo ir allá y ella era muy devota al Señor de los Milagros (…) y Dios sí está vivo y sí está con nosotros.',
           'Nosotros a veces somos incrédulos porque pedimos una cosa y queremos que ya se haga la voluntad de nosotros y no la de Dios. Pero Dios sí está con nosotros.'],
   context:'Entrevista en la primera entrada (día 14). Devoción heredada en la familia.', situations:['enfermedad','gratitud'], practices:['promesas'], emotions:['gratitud','fortaleza'], spaces:['senor'], gestures:[],
   interp:'La devoción se transmite por vía familiar y se ancla en una promesa cumplida. Conecta la memoria de Buga con la asistencia actual a San Alfonso.', axis:'antro', ref:'Primera entrada, entrevistado 1.' },
 { id:'t12', voice:'F', title:'La salud, «el principal milagro»', literal:true,
   quotes:['Para mí un milagro es lo que Dios le envía a uno, lo que le dé a uno. La salud ante todo, ese es el principal milagro.',
           'Porque siempre nos gusta venir acá, porque es el día del Señor de los Milagros, pero porque mi esposo más que todo es el que me dice vamos allá.'],
   context:'Entrevista en la primera entrada (día 14).', situations:['enfermedad'], practices:['dia-14'], emotions:['acompanamiento'], spaces:['nave'], gestures:[],
   interp:'La asistencia del día 14 se sostiene en la pareja: la compañía familiar también organiza la práctica.', axis:'antro', ref:'Primera entrada, entrevistada 2; Bitácora Vanessa (27 oct.).' },
 { id:'t13', voice:'G', title:'La fe se fortalece en el encuentro', literal:true,
   quotes:['El don de la fe siempre está en nosotros presente, pero así como una amistad se fortalece en el compartir, en el encuentro, en el conocimiento, así también la fe se fortalece en la comunidad.',
           'La oración de intercesión es poderosísima. Cuando todos estamos orando por las mismas intenciones y caminando por el mismo camino, pues se hace mucho más fácil.'],
   context:'Entrevista en la segunda entrada (jueves).', situations:['comunidad'], practices:['oracion-colectiva'], emotions:['acompanamiento'], spaces:['nave'], gestures:['cantar','manos'],
   interp:'Desde una voz religiosa, la comunidad no crea la fe sino que la fortalece.', axis:'con', ref:'Segunda entrada, entrevistada 1.' },
 { id:'t14', voice:'H', title:'«Así no oren por el mismo milagro, se siente la fuerza»', literal:true,
   quotes:['La oración en comunidad tiene muchísimo más fuerza que la oración individual.',
           'Pero sí, la oración en colectivo cuando hay alguna necesidad se siente la fuerza, así no oren por el mismo milagro se siente la fuerza.'],
   context:'Entrevista en la segunda entrada. Participa además en un rosario diario virtual (6:00 a. m.).', situations:['comunidad','peticion'], practices:['oracion-colectiva'], emotions:['fortaleza','acompanamiento'], spaces:['nave'], gestures:['cantar'],
   interp:'Según la síntesis de la bitácora de Vanessa, la misma persona aclara que sentir la presencia de Dios depende de la fe personal: lo colectivo respalda, pero no sustituye.', axis:'con', ref:'Segunda entrada, entrevistada 2; Bitácora Vanessa (27 oct.).' },
 { id:'t15', voice:'K', title:'Rezar acompañada en un problema familiar', literal:false,
   quotes:['Recuerda que rezar acompañada la tranquilizó cuando estaba preocupada por un problema familiar. Rezar con otras personas le produce calma y le ayuda a sentir que no está sola en sus creencias.'],
   context:'Síntesis escrita por la investigadora (no es cita textual). Suele venir con un familiar.', situations:['preocupaciones','comunidad'], practices:['oracion-colectiva'], emotions:['tranquilidad','acompanamiento'], spaces:['nave'], gestures:[],
   interp:'Asistir con un familiar significa también compartir tiempo en familia: la compañía tiene varias capas.', axis:'con', ref:'Bitácora Vanessa, visita del 27 de octubre (4:00–5:00 p. m.).' },
 { id:'t16', voice:'L', title:'Cuando todos comenzaron a cantar', literal:false,
   quotes:['Recuerda una ocasión en que todos comenzaron a cantar y vivió el momento con intensidad. Orar en comunidad puede animarlo, pero depende de cómo se sienta ese día.'],
   context:'Síntesis escrita por la investigadora (no es cita textual). Suele venir solo.', situations:['comunidad'], practices:['canto'], emotions:['fortaleza'], spaces:['nave'], gestures:['cantar'],
   interp:'El efecto de lo colectivo es variable: «a veces» acompaña y otras veces la persona está concentrada en sus pensamientos.', axis:'con', ref:'Bitácora Vanessa, visita del 27 de octubre.' },
 { id:'t17', voice:'I', title:'Impotencia ante la adicción de un familiar', literal:true,
   quotes:['Sí, me sentí muy impotente frente a la drogadicción de un familiar; recurrí a Dios. Le entregué el problema a él, teniendo la certeza de que las cosas iban a salir bien.',
           'Aún así sentí mucho miedo, desespero y angustia, pero ahí fue cuando tuve que fortalecer mi fe.'],
   context:'Entrevista previa realizada fuera de la parroquia, como ejercicio preparatorio.', situations:['adiccion'], practices:['oracion-individual'], emotions:['esperanza','rabia-duda'], spaces:[], gestures:[],
   interp:'Antecedente: muestra la vulnerabilidad que el nuevo enfoque buscó observar en el territorio. No describe prácticas en San Alfonso.', axis:'psi', ref:'Bitácora Isabella, ejercicio previo, entrevista 1.' },
 { id:'t18', voice:'I', title:'Quince días en cuidados intensivos', literal:true,
   quotes:['Cuando tuve a mi hija, que recién nacida quedó en cuidados intensivos 15 días y en la clínica nos dijeron que no iba a sobrevivir; mi esposo y yo nos dedicamos a rezar, a orar y pudimos ver cómo nuestra hija fue evolucionando, para mí eso es un milagro.'],
   context:'Entrevista previa fuera de la parroquia. Se omite el nombre de la menor.', situations:['enfermedad'], practices:['oracion-individual'], emotions:['esperanza','gratitud'], spaces:[], gestures:[],
   interp:'El milagro se define desde la experiencia: «cuando uno piensa que las cosas no van a suceder». La interpretación causal pertenece a la creyente.', axis:'psi', ref:'Bitácora Isabella, ejercicio previo, entrevista 1.' },
 { id:'t19', voice:'J', title:'Descargarlo todo', literal:true,
   quotes:['Yo en todo momento de mi vida he tenido muy presentes a Dios y a la virgen, sea en momentos alegres (…) o en momentos difíciles en donde les he puesto todas mis preocupaciones en manos de ellos.'],
   context:'Entrevista previa fuera de la parroquia. Para esta persona no es necesario un lugar especial: «si se me pasa ir a misa yo rezo desde mi casa».', situations:['preocupaciones'], practices:['oracion-individual'], emotions:['paz'], spaces:[], gestures:[],
   interp:'Contrapunto: no todas las personas creyentes necesitan el templo para afrontar la vulnerabilidad.', axis:'psi', ref:'Bitácora Isabella, ejercicio previo, entrevista 2.' }
];

const FILTERS = {
  situations:{ preocupaciones:'Preocupaciones y angustia', enfermedad:'Enfermedad propia o familiar', adiccion:'Adicción de un familiar', vacio:'Sensación de vacío', dudas:'Dudas de fe', peticion:'Peticiones', gratitud:'Agradecimiento', comunidad:'Vida comunitaria' },
  practices:{ velas:'Encender velas', 'oracion-altar':'Orar en los altares', 'oracion-individual':'Oración individual', 'oracion-colectiva':'Oración colectiva', canto:'Canto colectivo', misa:'Asistir a misa', 'despues-misa':'Quedarse después de misa', arrodillarse:'Arrodillarse', promesas:'Promesas', 'asistencia-frecuente':'Asistencia frecuente', 'dia-14':'Celebración del día 14' },
  emotions:{ tranquilidad:'Tranquilidad', desahogo:'Desahogo', paz:'Paz', esperanza:'Esperanza', fortaleza:'Fortaleza', acompanamiento:'Acompañamiento', gratitud:'Gratitud', paciencia:'Paciencia', 'rabia-duda':'Rabia, miedo o duda' }
};

/* ---------- Espacios del territorio ---------- */
const SPACES = [
 { id:'entrada', name:'Entrada y entorno exterior', short:'Entrada', x:470, y:612, photo:29, photos:[29,2,33],
   lead:'Umbral entre la Avenida Carrera 28 y el templo: venta, saludo, bendición.',
   moments:{ antes:'Llegada y bendición al entrar; ventas y flujo constante.', durante:'Flujo constante; el día 14 hay personas escuchando la misa desde afuera (E1).', despues:'Bendición al salir; compra de flores, rosarios e imágenes en la calle (E1).' },
   occupancy:{ antes:2, durante:1, despues:3 },
   observed:['Las personas se dan la bendición al entrar y al salir (E3, E4).','Vendedores ambulantes reciben a quien llega; venden plantas, ojos turcos, manillas, crucifijos, veladoras y, hacia la Transversal 28A, aromática, maíz, obleas y café (Bitácora Vanessa).','Policías en las esquinas, personas que orientan sobre movilidad y grupos que reparten volantes y predican (Bitácora Vanessa, 14 oct.).','El día 14 la misa se escucha desde afuera porque no cabe la gente (E1).'],
   actors:['Feligreses y visitantes','Vendedores ambulantes','Colaboradores de orientación y seguridad','Transeúntes'],
   gestures:['persignarse','desplazarse'], objects:['flores','velas','imagenes'], told:['t4'],
   interpreted:['El umbral organiza un «antes» y un «después» en los relatos (vacío al entrar, plenitud al salir).','La economía devocional de la calle provee los objetos que después aparecen en los altares.'],
   doctrine:[], emotions:[{k:'Transición',ev:'t4'}],
   layers:{ ritual:'Bendición al entrar y salir', vuln:'Umbral del «vacío» al «estar llena» (Voz A)', actores:'Vendedores, colaboradores, feligreses', objetos:'Flores, veladoras, crucifijos a la venta' },
   dims:['economica','social','espacial'], refs:['E3','E4','E1','BV'] },
 { id:'nave', name:'Nave central y bancas', short:'Nave', x:530, y:400, photo:1, photos:[1,16,21,3,4,31,45,37,38],
   lead:'Escenario del rito colectivo: la asamblea se pone de pie, canta, reza y se toma de las manos.',
   moments:{ antes:'Ruido y movimiento mientras se organizan en las bancas (E4).', durante:'Domingo 22 nov.: bancas del frente y de la mitad al 100 %, traseras al 90 % (estimación de E4). Martes 17 nov.: cerca del 30 % (E3).', despues:'Saludos y conversación; algunas personas se quedan sentadas con los ojos cerrados o mirando hacia arriba (E4).' },
   occupancy:{ antes:3, durante:5, despues:2 },
   observed:['Durante la misa predomina la oración colectiva (E3).','En el Padre Nuestro casi todas las personas acompañadas se toman de las manos; algunos desconocidos también (E1, E2).','«Cuando la primera persona se paraba, todos se paraban como un dominó» (E2).','En los momentos de oración individual que da el padre, casi todos se arrodillan o agachan la cabeza y juntan las manos (E3).','El 14 de octubre el sacerdote pidió no arrodillarse para evitar accidentes por la cantidad de gente; aun así muchos lo hicieron (E1).','Pantallas transmiten oraciones e himnos (E1; fotos 5, 7, 19).'],
   actors:['Asamblea de creyentes','Sacerdote','Monaguillos y ministros','Familias, parejas y personas solas'],
   gestures:['de-pie','arrodillarse','manos','tomarse-manos','cantar','silencio'], objects:['imagenes'], told:['t3','t6','t13','t14','t16','t15','t12'],
   interpreted:['El rito sincroniza los cuerpos y produce sentido de comunidad (como plantea Pedro Gómez García al hablar del rito como paralenguaje actuado).','La copresencia acompaña aunque no haya interacción directa (E3 conjetura B; E4 interpretación 5).','La fuerza atribuida a lo colectivo depende de la fe personal y del ánimo del día (Voces H y L).'],
   doctrine:['El Catecismo entiende la Eucaristía como una celebración de toda la comunidad, presidida por el sacerdote (arts. 1132 y 1140): por eso la nave está organizada para mirar hacia el altar.','La Iglesia se piensa a sí misma como «Pueblo de Dios» (art. 781) y «Cuerpo de Cristo» (arts. 787-789); en la nave, esa idea se vuelve visible cuando la asamblea se mueve al mismo tiempo.'],
   emotions:[{k:'Compañía',ev:'t3'},{k:'Fortaleza compartida',ev:'t14'},{k:'Intensidad en el canto',ev:'t16'}],
   layers:{ ritual:'De pie, rodillas, manos alzadas, canto', vuln:'Compañía en la asamblea', actores:'Asamblea, sacerdote, ministros', objetos:'Objetos elevados para la bendición (E1)' },
   dims:['social','cultural','espacial'], refs:['E1','E2','E3','E4','INF'] },
 { id:'altar', name:'Altar mayor', short:'Altar mayor', x:530, y:110, photo:30, photos:[30,1,4],
   lead:'Centro litúrgico hacia el que se orientan las bancas y los cuerpos.',
   moments:{ antes:'Preparación de la celebración.', durante:'El sacerdote preside; la comunión se reparte también por la nave cuando hay mucha gente (E1).', despues:'Algunas personas se acercan a hablar con el padre con naturalidad (E3).' },
   occupancy:{ antes:1, durante:3, despues:2 },
   observed:['El párroco preside la eucaristía desde el altar mayor (E4, distribución de personas).','El 22 de octubre la comunión se dio en fila en el altar mayor; el 14 de octubre se repartió en las bancas por la multitud (E1, E2).','Al finalizar, algunas personas se acercan a hablar con el padre «como si ya se conocieran» (E3).','En un momento de la misa el sacerdote pide alzar los objetos que se quieren bendecir (E1, E2).'],
   actors:['Sacerdote','Monaguillos'], gestures:['de-pie','manos'], objects:['imagenes'], told:[],
   interpreted:['La disposición del mobiliario orienta los cuerpos hacia el altar, aunque las personas también se desplazan lateralmente (Bitácora Vanessa, 25 oct.).','La relación sacerdote–creyentes es de dependencia mutua: unos presencian, otros celebran (E1).'],
   doctrine:['La liturgia la preside el sacerdote (arts. 1132 y 1140), pero alrededor del altar los creyentes construyen su propia ofrenda con flores, velas y objetos: dos formas de celebrar que conviven en el mismo templo.'],
   emotions:[], layers:{ ritual:'Bendición de objetos, comunión', vuln:'—', actores:'Sacerdote, monaguillos', objetos:'Retablo, pantallas' },
   dims:['cultural','espacial'], refs:['E1','E2','E3','E4','BV'] },
 { id:'senor', name:'Altares externos del Señor de los Milagros', short:'Señor de los Milagros', x:300, y:520, photo:25, photos:[25,43,26,39,53,14,24,6],
   lead:'Arcos de piedra y rejas: la imagen se mira y se le habla, pero no se toca.',
   moments:{ antes:'Algunas personas oran antes de la misa (E3).', durante:'Hay personas en los altares externos mientras otras participan en la celebración (E4).', despues:'Se llenan: muchas personas se quedan orando (E1, E4).' },
   occupancy:{ antes:2, durante:2, despues:4 },
   observed:['Alrededor de cuatro altares están dedicados al Señor de los Milagros; es la imagen que más atención recibe (E3).','Las personas nunca tocan el altar: hay una «barrera de seguridad» (E3, E4).','Todas las personas observadas en los altares externos cierran los ojos; algunas además se arrodillan o juntan las manos (E4).','Más calma, más silencio y menos movimiento que en el altar interno (E4).','Se dejan algunas ofrendas: velas, rosarios, estampas, imágenes y flores (E4).'],
   actors:['Creyentes individuales','Parejas que oran juntas (E4)'], gestures:['silencio','arrodillarse','desplazarse'], objects:['velas','flores','estampas','placas','dinero'], told:['t5','t7','t2','t11'],
   interpreted:['Entre más apartado el lugar, más se usa para la oración individual (E4).','La elección del altar no es aleatoria: se relaciona con preferencias y experiencias personales (E4, interpretación 4).'],
   doctrine:['Para la doctrina, las imágenes deben conducir a Dios y no quedarse en sí mismas (art. 2502). La devoción popular, en cambio, deja huellas materiales —placas, flores, velas— para agradecer o pedir ante una imagen concreta.'],
   emotions:[{k:'Intimidad',ev:'t7'},{k:'Esperanza',ev:'t5'},{k:'Gratitud',ev:'t2'}],
   layers:{ ritual:'Ojos cerrados, rodillas, manos juntas', vuln:'Peticiones personales y agradecimiento', actores:'Creyentes solos y parejas', objetos:'Velas, flores, estampas, placa' },
   dims:['cultural','espacial','economica'], refs:['E3','E4','E1','INF'] },
 { id:'cristo', name:'Altar interno: el Cristo y el contacto físico', short:'Cristo · contacto', x:150, y:480, photo:44, photos:[44,22,42,18,32],
   lead:'Un crucifijo sobre muro blanco, en la zona interior: aquí sí se toca.',
   moments:{ antes:'Poca afluencia registrada.', durante:'Movimiento menor.', despues:'Se llena: la gente hace fila para tocar el crucifijo y dejarle ofrendas (E4).' },
   occupancy:{ antes:1, durante:1, despues:5 },
   observed:['Al finalizar la eucaristía varias personas entran al altar interno a tocar al Cristo y orarle (E3).','Es el único altar que se toca: los externos «no están a su alcance» (E3).','No todas las personas cierran los ojos; hay más movimiento, fila y ruido (E4).','Se dejan muchas ofrendas: velas, imágenes religiosas, estampas con oraciones, figuras de cera (E1, E4; fotos 18, 32).','Las personas oran, rezan, lloran, tocan el crucifijo o dejan ofrendas (E1).'],
   actors:['Creyentes en fila','Familias'], gestures:['tocar','desplazarse'], objects:['cera','velas','flores','estampas','imagenes'], told:[],
   interpreted:['El objetivo de este altar es que las personas toquen el crucifijo (E4): la mediación es táctil.','En algunos textos este altar se confunde con el del Señor de los Milagros; en nuestras visitas comprobamos que son lugares distintos: aquí está el crucifijo que se toca, y la imagen del Señor de los Milagros está en los altares externos, detrás de una reja.'],
   doctrine:['La doctrina recuerda que Dios es espíritu (art. 370) y advierte contra la idolatría (art. 2112). Sin embargo, para muchos creyentes tocar la imagen es una forma necesaria de acercarse: aquí la fe pasa por las manos.'],
   emotions:[{k:'Llanto (observado)',ev:null},{k:'Petición',ev:null}],
   layers:{ ritual:'Tocar el crucifijo', vuln:'Llanto observado (E1)', actores:'Fila de creyentes', objetos:'Figuras de cera, flores, estampas' },
   dims:['cultural','espacial','economica'], refs:['E1','E3','E4','INF'] },
 { id:'laterales', name:'Altares laterales', short:'Altares laterales', x:760, y:330, photo:23, photos:[23,10,50,51,40,34,48,52,49],
   lead:'La Virgen, el Sagrado Corazón, La Piedad: escalas íntimas a lo largo de la nave.',
   moments:{ antes:'Se visitan antes de empezar la eucaristía (E3).', durante:'Pocas personas (E2: solo dos personas durante la misa).', despues:'Muchas personas se quedan orando (E1, E3).' },
   occupancy:{ antes:2, durante:1, despues:3 },
   observed:['El segundo altar o imagen con más atención es el de la Virgen María (E3).','Las personas se detienen mucho en los altares a rezar; «casi siempre muestran un momento de mayor intimidad aquí (lloran mucho)» (E3).','Velas de pila que las personas pueden prender en los diferentes altares (E1).','Algunas personas que llegan acompañadas se separan para ir a orar solas; otras van juntas, sobre todo parejas (E4).'],
   actors:['Creyentes individuales','Parejas'], gestures:['arrodillarse','silencio'], objects:['velas','flores','fotos','estampas'], told:['t1','t2','t6'],
   interpreted:['Los altares permiten momentos más personales e individuales, mientras la nave reúne en una experiencia colectiva (E3).','Esquema de la E3: Altares → esperanza → peticiones personales.'],
   doctrine:['Según el Catecismo, las imágenes sagradas no son un fin en sí mismas: deben llevar a quien las mira hacia Dios (art. 2502). En la práctica, muchas personas establecen con cada imagen una relación muy personal.'],
   emotions:[{k:'Esperanza',ev:'t2'},{k:'Tranquilidad',ev:'t1'},{k:'Desahogo',ev:'t6'}],
   layers:{ ritual:'Rodillas, manos juntas, ojos cerrados', vuln:'Intimidad, llanto (E3)', actores:'Personas solas, parejas', objetos:'Velas de pila, flores' },
   dims:['cultural','social','espacial'], refs:['E1','E2','E3','E4'] },
 { id:'santisimo', name:'Capilla del Santísimo', short:'Santísimo', x:150, y:270, photo:17, photos:[17,12,47,13],
   lead:'Recinto interior de oración silenciosa, al que muchos van después de comulgar.',
   moments:{ antes:'Casi vacío (E3).', durante:'No se llena, pero hay algunas personas; tras la comunión muchos van a orar allí (E4).', despues:'Muchas personas van a orar; se observaron personas llorando (E1).' },
   occupancy:{ antes:1, durante:2, despues:3 },
   observed:['Después de la comunión muchas personas van al Santísimo (E3, E4).','«Aquí también pude observar a demasiadas personas llorando» (E1).','Es uno de los lugares más aislados del templo (E3).','En la pirámide de la E4 es el espacio de oración individual menos usado, después de los altares externos y el altar interno.'],
   actors:['Orantes individuales'], gestures:['silencio','arrodillarse'], objects:['imagenes'], told:[],
   interpreted:['Esquema de la E3: Santísimo → tranquilidad → oración individual.','La conjetura A de la E3 plantea que quienes atraviesan momentos difíciles buscan los espacios más aislados.'],
   doctrine:['El Catecismo recomienda la adoración silenciosa ante el Santísimo como forma de oración contemplativa (art. 2691), y eso coincide con el silencio que encontramos.'],
   emotions:[{k:'Tranquilidad (esquema E3)',ev:null},{k:'Llanto (observado)',ev:null}],
   layers:{ ritual:'Silencio, oración tras la comunión', vuln:'Llanto observado (E1)', actores:'Orantes individuales', objetos:'Sagrario' },
   dims:['cultural','espacial'], refs:['E1','E3','E4','INF'] },
 { id:'confesionario', name:'Confesionario de vidrio', short:'Confesionario', x:150, y:375, photo:46, photos:[46,9],
   lead:'Una oficina de vidrio: la confesión se ve, aunque no se escuche.',
   moments:{ antes:'Fila larga para confesarse (E1).', durante:'El 22 de octubre nadie se confesaba durante la misa (E2).', despues:'Varias personas hacen fila para confesarse (E4).' },
   occupancy:{ antes:3, durante:1, despues:3 },
   observed:['«El confesionario no es tapado; al contrario, es una oficina de vidrio» (E1).','Antes y después de la misa se mantiene una fila larga para confesarse con un padre auxiliar (E1).','El 17 de noviembre no había nadie en los confesionarios (E3).','Los espacios de los confesores tienen sillas contra la pared para no bloquear la movilidad (Bitácora Vanessa).'],
   actors:['Sacerdote confesor','Penitentes en fila'], gestures:['desplazarse'], objects:[], told:[],
   interpreted:['La investigadora lo lee como «volver transparentes los pecados»: mostrarse vulnerable ante Dios y ante los demás como acto de fe (E1, interpretación 6).'],
   doctrine:['Para la doctrina, la confesión es un sacramento de arrepentimiento y reconciliación (Catecismo, arts. 1440-1442): un encuentro privado que aquí, curiosamente, ocurre a la vista de todos.'],
   emotions:[{k:'Vulnerabilidad visible (interpretación)',ev:null}],
   layers:{ ritual:'Fila y confesión', vuln:'Vulnerabilidad expuesta (interpretación E1)', actores:'Sacerdote, penitentes', objetos:'Vidrio, sillas' },
   dims:['cultural','espacial','social'], refs:['E1','E2','E3','E4','BV'] }
];

/* ---------- Recorridos registrados ---------- */
const PATHS = [
 { id:'p1', from:'entrada', to:'nave', label:'Llegan, se dan la bendición y buscan asiento', when:['antes'], ref:'E4' },
 { id:'p2', from:'nave', to:'santisimo', label:'Tras la comunión, a orar al Santísimo', when:['durante','despues'], ref:'E3, E4' },
 { id:'p3', from:'nave', to:'cristo', label:'Fila para tocar el crucifijo', when:['despues'], ref:'E4' },
 { id:'p4', from:'nave', to:'senor', label:'A los altares externos', when:['antes','durante','despues'], ref:'E3, E4' },
 { id:'p5', from:'nave', to:'laterales', label:'A los altares laterales', when:['antes','despues'], ref:'E3' },
 { id:'p6', from:'nave', to:'confesionario', label:'Fila para confesarse', when:['antes','despues'], ref:'E1, E4' },
 { id:'p7', from:'nave', to:'entrada', label:'Bendición al salir', when:['despues'], ref:'E4' }
];

const MOMENTS = {
 antes:{ label:'Antes', text:'«Antes de la eucaristía hay mucho ruido y movimiento», mientras las personas se organizan en las bancas o van a los lugares de oración individual (E4).' },
 durante:{ label:'Durante', text:'El movimiento disminuye; casi todo el ruido lo genera la misma eucaristía. En los silencios «hay como un sentimiento de conexión profunda» y en los cantos, una conexión «entre la comunidad» (E4).' },
 despues:{ label:'Después', text:'«El ambiente cambia cuando termina la celebración»: saludos, conversaciones, filas al altar interno y al confesionario, oración en los lugares individuales (E4).' }
};

const VISITS = [
 { id:'E1', date:'14 oct. 2026', day:'Miércoles · día 14', time:'Mañana', occ:'Desbordada: gente escuchando desde afuera', occN:5, company:'Mayoría acompañada', notes:'Mucho movimiento; actividades individuales y colectivas a la vez; llanto en comunión y Santísimo.' },
 { id:'E2', date:'22 oct. 2026', day:'Jueves', time:'11:30 a. m.–1:15 p. m.', occ:'Iglesia «mucho más vacía»', occN:1, company:'60 % acompañados / 40 % solos (estimación)', notes:'Movimientos grupales; más adultos mayores; ambiente tranquilo; llanto a pesar de pocas personas.' },
 { id:'E3', date:'17 nov. 2026', day:'Martes', time:'4:00–5:15 p. m.', occ:'≈ 30 % de capacidad (inferido por observación)', occN:2, company:'Más personas solas que en visitas previas', notes:'Adultos que salen del trabajo; pocos mayores y un niño; silencio y tranquilidad.' },
 { id:'E4', date:'22 nov. 2026', day:'Domingo', time:'5:30–6:30 p. m.', occ:'Frente y mitad 100 %, traseras 90 % (estimación)', occN:4, company:'Casi todos acompañados: familias y parejas', notes:'Muchas familias con niños; altar interno lleno después de misa; fila para confesarse.' }
];

/* ---------- Gestos ---------- */
const GESTURES = [
 { id:'de-pie', name:'Ponerse de pie', cat:['colectivo'], photos:[1,16,2], space:'nave',
   seen:'«En el momento en que la primera persona se paraba, todos se paraban como un dominó, en conjunto» (E2). En los días llenos hay creyentes de pie al fondo (E1).', scale:'Colectivo',
   meaning:'Para Pedro Gómez García, ponerse de pie en masa afirma la asamblea y genera sincronía y orden colectivo.', community:'Sincroniza cuerpos que no se conocen.', ref:'Lo registramos en la segunda y la primera entrada; la lectura teórica viene de Pedro Gómez García' },
 { id:'arrodillarse', name:'Arrodillarse', cat:['individual','colectivo'], photos:[3,52,14], space:'laterales',
   seen:'En los momentos de oración individual «casi todos los creyentes se arrodillan o por lo menos agachan la cabeza» (E3). En los altares externos algunos se arrodillan (E4).', scale:'Individual y colectivo',
   meaning:'Para la antropología del ritual, inclinarse o doblar la rodilla es reconocer con el cuerpo que se está ante algo sagrado. Para una creyente, arrodillarse es «entregar todo» cuando no sabe qué pedir (Voz C).', community:'Gesto compartido durante la misa; gesto íntimo en los altares.', ref:'E3, E4, Voz C', testimony:'t6' },
 { id:'manos', name:'Levantar y extender las manos', cat:['colectivo'], photos:[4,31,8,21], space:'nave',
   seen:'En el Padre Nuestro las personas extienden sus manos (E1). En la bendición de objetos todos los elevan mientras el sacerdote extiende las manos (E1). Registrado como «extender las manos hacia arriba» (E3).', scale:'Colectivo',
   meaning:'Gesto de petición y disposición a recibir; hace visible la oración sin palabras.', community:'La asamblea entera repite el mismo gesto.', ref:'E1, E3' },
 { id:'tomarse-manos', name:'Tomarse de las manos', cat:['colectivo'], photos:[], space:'nave',
   seen:'En el Padre Nuestro casi todas las personas acompañadas se toman de las manos; algunos desconocidos también (E1, E2).', scale:'Colectivo',
   meaning:'Vivencia de fraternidad visible y construcción de una «comunidad de sentido», una idea que N. S. Fernández (2017) desarrolla al estudiar parroquias en Buenos Aires.', community:'La fe puede formar vínculos entre desconocidos (E1).', ref:'Primera y segunda entrada; teoría de Gómez García y Fernández (2017)' },
 { id:'persignarse', name:'Darse la bendición', cat:['individual','desplazamiento'], photos:[2], space:'entrada',
   seen:'Muchas personas se dan la bendición al entrar y al salir de la parroquia (E3). Es el primer y el último paso de la secuencia de actividades (E4).', scale:'Individual',
   meaning:'Marca el paso de la calle al espacio sagrado y de vuelta.', community:'Gesto repetido por casi todos, aunque se hace en solitario.', ref:'E3, E4' },
 { id:'cantar', name:'Cantar y rezar en voz alta', cat:['vocal','colectivo'], photos:[19,7], space:'nave',
   seen:'Cantos de alabanza en comunidad y rezos colectivos (E4). «El canto en conjunto se escuchaba más fuerte» (E2). En el canto «se siente una conexión, pero más que todo entre la comunidad» (E4).', scale:'Colectivo · vocal',
   meaning:'La sonoridad compartida introduce una atmósfera común; Gómez García incluye los cantos en el paralenguaje actuado.', community:'Una persona entrevistada recuerda haber vivido con intensidad el momento en que todos cantaron (Voz L).', ref:'E2, E4; Voz L', testimony:'t16' },
 { id:'tocar', name:'Tocar imágenes religiosas', cat:['individual','desplazamiento'], photos:[22,44,18], space:'cristo',
   seen:'Después de la misa la gente hace fila para tocar el crucifijo del altar interno y dejarle ofrendas (E4). Los altares externos no se tocan (E3, E4).', scale:'Individual, en fila',
   meaning:'Mediación táctil propia de la religiosidad popular, que convive —no sin tensión— con la doctrina católica sobre las imágenes (Catecismo, arts. 370 y 2112).', community:'Se espera turno con otros: la intimidad ocurre en fila.', ref:'Tercera y cuarta entrada; Catecismo, arts. 370 y 2112' },
 { id:'desplazarse', name:'Desplazarse y hacer fila', cat:['desplazamiento'], photos:[43,9,20], space:'senor',
   seen:'Secuencia: llegan y se bendicen, buscan asiento, escuchan la eucaristía, van a los altares, se bendicen al salir (E4). Algunas personas se separan de su grupo para orar solas (E4).', scale:'Individual y grupal',
   meaning:'El recorrido distribuye necesidades distintas en espacios distintos.', community:'Ministros y monaguillos también circulan para la comunión y las ofrendas (E1).', ref:'E1, E4' },
 { id:'silencio', name:'Silencio y ojos cerrados', cat:['individual'], photos:[34,48,49], space:'laterales',
   seen:'En muchos momentos de la misa los creyentes cierran los ojos (E3). Todas las personas observadas en los altares externos cerraban los ojos (E4). Después de misa algunos se quedan sentados mirando hacia arriba o con los ojos cerrados (E4).', scale:'Individual',
   meaning:'Gestos que «expresan devoción sin necesidad de utilizar palabras» (E3, interpretación 4).', community:'En los silencios colectivos se percibe «conexión profunda entre los creyentes y Dios» (E4).', ref:'E3, E4' }
];

const GOMEZ = [
 'El rito es un «paralenguaje actuado»: un sistema de comunicación simbólica que opera sobre todo con gestos, posturas, silencios, cantos, miradas y desplazamientos en tiempos y espacios normados.',
 'Al sincronizar las corporalidades, el rito materializa lo invisible y produce orden social y adhesión emocional.',
 'El rito tiene una dualidad: un rostro conservador que perpetúa el orden instituido y una capacidad de renovación cuando la vivencia popular se apropia del espacio sagrado.'
];

/* ---------- Línea del tiempo ---------- */
const TIMELINE = [
 { id:'h1', when:'Hacia 1580', kind:'leyenda', title:'Una lavandera indígena a orillas del río Guadalajara', text:'En Guadalajara de Buga, una anciana indígena lava ropa ajena y ahorra 70 reales para encargar en Quito una imagen del Santo Cristo.', ref:'Tradición oral sobre el Señor de los Milagros de Buga, recogida por Echeverry Pérez (2008)', photos:[5] },
 { id:'h2', when:'Sin fecha', kind:'leyenda', title:'El acto de caridad', text:'Al ver que un vecino, padre de familia, iba a ser encarcelado por una deuda, entrega todos sus ahorros para liberarlo.', ref:'Tradición popular; una persona entrevistada nos contó esta misma parte en la primera entrada', photos:[5] },
 { id:'h3', when:'Sin fecha', kind:'leyenda', title:'El crucifijo que llega por el río y crece', text:'Un pequeño crucifijo de madera flota hasta sus manos. Lo guarda en una cajita; tras golpeteos nocturnos, descubre que crece hasta el tamaño de un niño de 8 a 10 años.', ref:'Tradición oral recogida por Echeverry Pérez (2008)', photos:[25] },
 { id:'h4', when:'1601–1605 (según la tradición)', kind:'historiografia', title:'La prueba del fuego', text:'En visita pastoral, el obispo de Popayán, Juan de la Roca, ordena quemar la imagen por «plebeya superstición». Según el relato, no se consume y suda durante dos días, embelleciéndose. Una creciente desvía después el río y libera el terreno para la primera ermita.', ref:'Relato tradicional sobre el origen de la devoción, trabajado por el etnohistoriador Antonio José Echeverry Pérez (2008). Las fechas pertenecen a esa tradición historiográfica; no consultamos el documento colonial original.', photos:[26] },
 { id:'h5', when:'Recogido el 14 oct. 2026', kind:'oral', title:'La memoria oral en la parroquia', text:'Una persona entrevistada narra la historia de la lavandera, el hombre encarcelado y el Cristo que crece; en su versión, la gente quiso quemarlo porque «no era Jesús» y por eso, dice, «es negrito».', ref:'Primera entrada (Voz E)', photos:[43] },
 { id:'h6', when:'Echeverry Pérez (2008)', kind:'interpretacion', title:'Un «Cristo rebelde»', text:'El etnohistoriador interpreta la devoción como un culto subalterno, indígena y mestizo, no impuesto por la jerarquía: el fuego no logra erradicar la imagen. Habla de una «indianización» del milagro. La historia se parece a la de la Virgen de Guadalupe y Juan Diego en México, y a la del santo popular Domingo Vidal en Chimá (Córdoba): en los tres casos la comunidad defiende su devoción frente a la autoridad eclesiástica.', ref:'Antonio José Echeverry Pérez (2008), etnohistoria de la devoción', photos:[] },
 { id:'h7', when:'Sin fecha en las fuentes', kind:'historiografia', title:'Institucionalización redentorista', text:'Con el tiempo, la congregación redentorista asumió el cuidado del santuario y llevó la devoción a Bogotá. Es el paso de una fe nacida en el pueblo a una devoción organizada por la Iglesia. No encontramos la fecha precisa de este proceso.', ref:'Historia de la congregación redentorista', photos:[12] },
 { id:'h8', when:'1930', kind:'documentado', title:'Los redentoristas en el templo de Santa Inés', text:'Los redentoristas se establecen en el templo de Santa Inés, en Bogotá, que luego es demolido durante la transformación de la Carrera Décima.', ref:'Bitácora Vanessa, investigación documental previa', photos:[] },
 { id:'h9', when:'1954–1959', kind:'documentado', title:'Un nuevo templo en la Avenida Carrera 28', text:'En 1954 se aprueba la compra del lote en la Av. 28 con calle 39; el templo se construye entre 1955 y 1959 y se inaugura el 17 de noviembre de 1959.', ref:'Bitácora Vanessa, investigación documental previa', photos:[30] },
 { id:'h10', when:'14 de marzo de 1982', kind:'documentado', title:'La devoción llega a Bogotá', text:'Desde entonces, cada 14 del mes señala una celebración especial del Señor de los Milagros en San Alfonso.', ref:'Bitácora Vanessa, investigación documental previa', photos:[19] },
 { id:'h11', when:'2026', kind:'campo', title:'La tradición hoy: los días 14', text:'La bitácora registra 10 eucaristías durante la jornada del 14, con colaboradores de apoyo sanitario y de seguridad; el cartel fotografiado en la misma bitácora lista doce horarios. Las pantallas proyectan oraciones que evocan la caridad de «una indígena sencilla» (foto 5) y el himno al Señor de los Milagros (foto 19).', ref:'Bitácora Vanessa; E1; fotos 5, 7, 19', photos:[5,7,19] },
 { id:'h12', when:'Oct.–nov. 2026', kind:'campo', title:'Devoción heredada y promesas', text:'Las entrevistas muestran la devoción transmitida en la familia, la promesa de una madre de viajar a Buga y la asistencia en pareja los días 14.', ref:'Primera entrada (Voces E y F)', photos:[53] }
];
const KINDS = { leyenda:'Leyenda popular', historiografia:'Relato historiográfico', documentado:'Hecho documentado', interpretacion:'Interpretación académica', oral:'Memoria oral de campo', campo:'Registro de campo' };

/* ---------- Objetos ---------- */
const OBJECTS = [
 { id:'velas', name:'Velas y velones', photos:[40,23,24], spaces:['laterales','senor','cristo'], use:'Se encienden en los altares; «velas de pila que las personas pueden prender» (E1). El 14 de octubre se dejaban velones apagados (E1).', meaning:'Para una creyente, la luz lleva la petición «hasta los cielos» (Voz A); otra enciende una vela cuando tiene una petición especial y vuelve a agradecer (Voz B).', econ:'Se venden veladoras en la calle (Bitácora Vanessa).', testimonies:['t5','t2'] },
 { id:'flores', name:'Flores', photos:[42,15,24,33], spaces:['cristo','senor','laterales'], use:'Muchas flores en los altares, como estrellas de Belén y rosas (E1). Personas llegan con ramos (foto 15).', meaning:'Ofrenda de entrega: «queriendo dejarle algo al santo del altar» (E4).', econ:'Venta de flores en baldes en la acera (foto 33).', testimonies:[] },
 { id:'cera', name:'Figuras de cera', photos:[32,18,22], spaces:['cristo'], use:'Figuras amarillas depositadas junto al crucifijo del altar interno, junto con estampas y oraciones impresas.', meaning:'Las bitácoras las registran como ofrendas; su significado específico no fue preguntado a los creyentes (pendiente de investigar).', econ:'No hay registro de su compra.', testimonies:[] },
 { id:'estampas', name:'Estampas, láminas e imágenes', photos:[27,28,32], spaces:['senor','cristo'], use:'Estampas con oraciones, imágenes religiosas y láminas que se dejan en los altares (E1, E3, E4).', meaning:'Objetos que acompañan a los creyentes y se dejan «como símbolo de fe» para expresar peticiones (E3).', econ:'Se venden imágenes y estampas en el entorno (E1).', testimonies:[] },
 { id:'placas', name:'Placas en los muros', photos:[26], spaces:['senor'], use:'Placa metálica junto al altar del Señor de los Milagros (foto 26). La E3 incluye «placas» entre los objetos para expresar peticiones.', meaning:'Tradicionalmente, estas placas agradecen un favor recibido —una curación, un trabajo—. No transcribimos el texto de la placa fotografiada, así que no afirmamos qué agradece.', econ:'—', testimonies:[] },
 { id:'dinero', name:'Dinero y limosna', photos:[6,41,53], spaces:['senor','nave'], use:'Buzones y cajas de ofrendas; en la colecta del 22 de octubre «todos dieron algo, así fueran solo monedas» (E2).', meaning:'Ofrenda material que acompaña la petición (E3).', econ:'Sostenimiento de la parroquia; letreros «Ofrendas», «Limosna», «Dios bendiga su ofrenda».', testimonies:[] },
 { id:'rosarios', name:'Rosarios y escapularios', photos:[], spaces:['senor','laterales'], use:'Objetos que acompañan a los creyentes en los altares (E4) y que se elevan para recibir la bendición (E1).', meaning:'Pueden ayudar a expresar preocupaciones, peticiones y agradecimientos (conjetura C, E3).', econ:'Se venden rosarios en la calle (E1).', testimonies:[] },
 { id:'fotos', name:'Fotografías y cartas', photos:[], spaces:['senor','laterales'], use:'Incluidas entre los objetos que se dejan para expresar peticiones (E3).', meaning:'Hacen presente a alguien ausente ante la imagen (interpretación del equipo).', econ:'—', testimonies:[] },
 { id:'imagenes', name:'Objetos para bendecir', photos:[], spaces:['nave'], use:'Flores, agua en botellas, rosarios, escapularios, imágenes, velones, biblias (E1).', meaning:'Quizás bendecir objetos sirve para llevar la presencia de Dios a la casa (E1, interpretación 1).', econ:'—', testimonies:[] }
];

/* ---------- Red de relaciones ---------- */
const NODES = [
 { id:'cuerpo', label:'Cuerpo', axis:'antro', x:.18, y:.22 }, { id:'ritual', label:'Ritual', axis:'antro', x:.42, y:.12 },
 { id:'comunidad', label:'Comunidad', axis:'antro', x:.70, y:.18 }, { id:'tradicion', label:'Tradición', axis:'antro', x:.88, y:.42 },
 { id:'espacios', label:'Espacios', axis:'con', x:.12, y:.55 }, { id:'objetos', label:'Objetos', axis:'con', x:.50, y:.45 },
 { id:'oracion', label:'Oración', axis:'con', x:.30, y:.80 }, { id:'vulnerabilidad', label:'Vulnerabilidad', axis:'psi', x:.58, y:.88 },
 { id:'esperanza', label:'Esperanza', axis:'psi', x:.84, y:.76 }, { id:'acompanamiento', label:'Acompañamiento', axis:'psi', x:.74, y:.58 }
];
const EDGES = [
 { a:'cuerpo', b:'ritual', t:'El rito se expresa en posturas, gestos y cantos sincronizados.', ev:'Entradas 2 y 3; Gómez García' },
 { a:'ritual', b:'comunidad', t:'Ponerse de pie, cantar y tomarse de las manos producen sentido de comunidad.', ev:'E1, E2, E4' },
 { a:'cuerpo', b:'oracion', t:'Cerrar los ojos, arrodillarse y juntar las manos expresan la oración sin palabras.', ev:'E3 interp. 4; Voz C' },
 { a:'espacios', b:'oracion', t:'Entre más apartado el lugar, más se usa para la oración individual.', ev:'E4' },
 { a:'objetos', b:'vulnerabilidad', t:'Velas, flores y estampas permiten mostrar peticiones, agradecimientos o promesas.', ev:'E3 interp. 5; Voces A y B' },
 { a:'objetos', b:'espacios', t:'Cada altar acumula ofrendas distintas; el altar interno recibe más.', ev:'E4' },
 { a:'tradicion', b:'objetos', t:'La devoción heredada se materializa en promesas y ofrendas.', ev:'Voz E' },
 { a:'tradicion', b:'comunidad', t:'El día 14 convoca multitudes en torno al Señor de los Milagros.', ev:'E1; Bitácora Vanessa' },
 { a:'vulnerabilidad', b:'oracion', t:'Ante la enfermedad o las preocupaciones, la oración ayuda «a no desesperarse tanto».', ev:'Voces B, C, D' },
 { a:'oracion', b:'esperanza', t:'La fe no soluciona, pero da fuerza para enfrentar.', ev:'Voz C; E4 interp. 3' },
 { a:'comunidad', b:'acompanamiento', t:'Ver a otros rezar hace sentir que no se es el único.', ev:'Voz B; E4 interp. 5' },
 { a:'acompanamiento', b:'esperanza', t:'La oración colectiva respalda las peticiones, sin reemplazar la fe personal.', ev:'Voces G, H' },
 { a:'vulnerabilidad', b:'acompanamiento', t:'Algunas personas prefieren la soledad para hablar de lo que no cuentan a nadie.', ev:'Voz C; E4' },
 { a:'espacios', b:'vulnerabilidad', t:'Los altares concentran momentos de mayor intimidad y llanto.', ev:'E3' },
 { a:'ritual', b:'tradicion', t:'La liturgia actual evoca la leyenda de Buga en himnos y oraciones.', ev:'Fotos 5, 7, 19' },
 { a:'cuerpo', b:'espacios', t:'El altar interno se toca; los externos solo se miran.', ev:'E3, E4' }
];

/* ---------- Hallazgos ---------- */
const FINDINGS = [
 { id:'h1', title:'Intimidad dentro de un territorio compartido', tension:'Individual / colectivo', axis:'con', status:'Observado en E3 y E4',
   evidence:'Durante la misa predomina la oración colectiva; al terminar, las personas van a los altares a rezar solas. Algunas que llegan acompañadas se separan para orar a solas.', interp:'La parroquia ofrece espacios para encontrar intimidad «incluso dentro de un espacio de comunidad» (E4, interp. 2).', space:'nave, altares laterales, altares externos', dims:['espacial','social'], refs:'E3, E4; Voces B y C' },
 { id:'h2', title:'Los cuerpos se sincronizan', tension:'Sincronización / cohesión', axis:'antro', status:'Observado en E1, E2, E3',
   evidence:'La asamblea se pone de pie «como un dominó», canta, extiende las manos y se toma de las manos en el Padre Nuestro, incluso entre desconocidos.', interp:'Coincide con el «paralenguaje actuado» de Gómez García; la cohesión que produce no se midió.', space:'nave', dims:['cultural','social'], refs:'Entradas 1, 2 y 3; Pedro Gómez García' },
 { id:'h3', title:'Dos silencios', tension:'Silencio / expresión colectiva', axis:'con', status:'Observado en E4',
   evidence:'En los silencios de la misa la investigadora percibe una conexión con Dios; en los cantos, una conexión entre la comunidad.', interp:'Silencio y canto parecen organizar dos tipos de vínculo; es una percepción de la observadora, no de los creyentes.', space:'nave', dims:['cultural'], refs:'E4, observaciones de tiempo y experiencia sensorial' },
 { id:'h4', title:'Fuerza para enfrentar, no solución', tension:'Vulnerabilidad / esperanza', axis:'psi', status:'Expresado por creyentes',
   evidence:'«La iglesia no le soluciona a uno todos los problemas, pero sí le da la fuerza para enfrentarlos» (Voz C). «Salir más tranquila y enfrentar las cosas con otra mirada» (Voz B).', interp:'Lo que cambia según las voces es la manera de afrontar, no el problema. La pregunta 5 de la E4 queda abierta.', space:'nave, altares', dims:['social'], refs:'E3, E4' },
 { id:'h5', title:'La fe también duda', tension:'Dudas de fe / permanencia del rito', axis:'psi', status:'Expresado por un creyente',
   evidence:'Un entrevistado cuestionó su fe durante la enfermedad de su esposa y luego cuestionó sus promesas como «una especie de intercambio», sin dejar de asistir.', interp:'La práctica ritual puede sostenerse mientras se revisa su sentido. Pone en duda la idea de que las promesas sirvan sobre todo para sentir control frente a lo incierto.', space:'—', dims:['cultural'], refs:'E4, Voz D' },
 { id:'h6', title:'Tocar o solo mirar', tension:'Proximidad / distancia de las imágenes', axis:'antro', status:'Observado en E3 y E4',
   evidence:'El crucifijo del altar interno se toca, en fila y con ruido; los altares externos del Señor de los Milagros tienen barrera, no se tocan y concentran silencio y ojos cerrados.', interp:'La distancia física parece asociarse a formas distintas de oración (táctil y en movimiento / contemplativa y quieta).', space:'altar interno, altares externos', dims:['espacial','cultural'], refs:'E3, E4' },
 { id:'h7', title:'Una devoción popular dentro de la institución', tension:'Tradición popular / institucionalización', axis:'antro', status:'Interpretación con base historiográfica',
   evidence:'Leyenda de una lavandera indígena y de un Cristo que el obispo quiso quemar; hoy la liturgia proyecta oraciones que la evocan y los días 14 se organizan con 10 a 12 eucaristías.', interp:'Echeverry Pérez lee un culto subalterno apropiado luego por la institución redentorista. La negociación actual entre ambas no fue observada directamente.', space:'altares externos, nave', dims:['cultural'], refs:'Echeverry Pérez (2008); investigación documental de la bitácora de Vanessa; evidencias fotográficas 5 y 19' },
 { id:'h8', title:'Permanecer o circular', tension:'Permanencia / circulación', axis:'con', status:'Observado en E1, E2, E4',
   evidence:'El 14 de octubre había actividades simultáneas y mucha circulación; el 22 de octubre casi todos permanecieron en su lugar; el domingo 22 de noviembre la circulación se concentró después de misa.', interp:'La cantidad de personas y el día parecen condicionar la movilidad (E2); cuando hay menos gente, la misa se vive de forma más colectiva y centrada.', space:'todo el templo', dims:['espacial','social'], refs:'E1, E2, E4' },
 { id:'h9', title:'Objetos que hablan por quien los deja', tension:'Objetos / dinámicas materiales', axis:'con', status:'Observado; significado parcialmente expresado',
   evidence:'Velas, flores, estampas, figuras de cera, rosarios, fotografías y dinero en los altares; la calle provee muchos de ellos.', interp:'Los objetos son medios para mostrar peticiones, agradecimientos o promesas (E3, interp. 5). Su significado personal sigue pendiente de preguntar.', space:'altares, entorno exterior', dims:['economica','cultural'], refs:'E1, E3, E4; Bitácora Vanessa' },
 { id:'h10', title:'Compañía sin conversación', tension:'Soledad / acompañamiento', axis:'psi', status:'Expresado y observado',
   evidence:'«Al ver a tantas personas rezando siente que no es el único» (Voz B). Pero también: «a veces prefiero venir sola» (Voz C).', interp:'La copresencia acompaña a algunas personas; otras buscan la soledad. Ambas formas conviven en el mismo espacio.', space:'nave, altares', dims:['social'], refs:'E3, E4; Bitácora Vanessa' },
 { id:'h11', title:'El horario cambia quién llega', tension:'Tiempo / composición social', axis:'antro', status:'Inferido por observación',
   evidence:'Martes a las 4 p. m.: adultos que parecen salir del trabajo, pocos mayores. Jueves al mediodía: muchos adultos mayores. Domingo: familias con niños.', interp:'Los horarios influyen en quién asiste y en cómo se vive el espacio (E3, interp. 6). La ocupación laboral se infirió por la vestimenta.', space:'nave', dims:['social','economica'], refs:'E2, E3, E4' }
];

/* ---------- Contraste entre fuentes ---------- */
const CONTRAST = [
 { claim:'La síntesis teórica atribuía a «Andrés» la frase «me da la fuerza para enfrentarlos… sale uno de aquí con otra actitud».', check:'En la cuarta entrada esa frase pertenece a la entrevistada 1 (Voz C), no al entrevistado 2.', verdict:'Corregido en la aplicación' },
 { claim:'La síntesis teórica decía que «Andrés» se integró al canto masivo y «se sintió fuerte».', check:'La bitácora de Vanessa resume que recordó una ocasión en que todos cantaron y «vivió el momento con intensidad». No hay cita textual de «se sintió fuerte».', verdict:'Se usa la síntesis de la bitácora' },
 { claim:'En la síntesis teórica, «Rosa» asiste todos los días 14 con su esposo al «Altar de la Réplica».', check:'Las bitácoras atribuyen la promesa a Buga a una persona entrevistada y la asistencia con el esposo a otra. El nombre «Altar de la Réplica» no aparece.', verdict:'Se separan como Voces E y F' },
 { claim:'Ocupación de 100 % y 90 % «los domingos y días 14».', check:'Esa estimación corresponde solo al domingo 22 de noviembre a las 5:30 p. m. (E4). Para el día 14 hay descripción cualitativa, no porcentajes.', verdict:'Se limita a E4' },
 { claim:'El Señor de los Milagros está en un «altar interno» del «crucero izquierdo», con cristal protector que se toca.', check:'Las bitácoras distinguen un altar interno con un crucifijo que se toca y varios altares externos del Señor de los Milagros con barrera. «Crucero izquierdo» no aparece.', verdict:'Se representan como espacios distintos' },
 { claim:'Reclinatorios de terciopelo, insonorización del confesionario, absolución con manos alzadas, placas por milagros de «sanación y empleo».', check:'No aparecen en las bitácoras ni se pueden verificar en las fotografías.', verdict:'Se tratan como no verificados' },
 { claim:'Referencias como «Bitácora 4, p. 65» o «p. 68».', check:'La cuarta entrada tiene 10 páginas.', verdict:'Se citan las bitácoras por entrada y apartado' },
 { claim:'Número de eucaristías el día 14.', check:'La bitácora de Vanessa anota 10; el cartel fotografiado en la misma bitácora parece listar 12 horarios.', verdict:'Se presentan ambos datos' },
 { claim:'Nombres de las entrevistadas en la segunda entrada.', check:'Varían entre las bitácoras («Elsa»/«Elena»; la religiosa aparece con dos nombres).', verdict:'Se anonimizan como Voces G y H' }
];

const BIBLIO = [
 { a:'Restrepo, Eduardo', t:'Antropólogo colombiano. De él tomamos la idea de que la etnografía trabaja en tres niveles: lo que la gente hace, lo que dice que hace y lo que debería hacer según las normas. Esa división organiza las pestañas de cada ficha del mapa. También nos guió su llamado a «saber estar» en el campo y a no actuar como un «etnógrafo-asaltante» que extrae datos sin cuidar a las personas.', via:'Metodología' },
 { a:'Guber, Rosana', t:'Antropóloga argentina, referente en trabajo de campo. Su noción de reflexividad nos llevó a escribir, en cada entrada, una sección sobre nuestra propia mirada: qué dábamos por sentado y qué cambió después de cada visita.', via:'Metodología' },
 { a:'Gómez García, Pedro', t:'Filósofo y antropólogo. Propone entender el rito como un «paralenguaje actuado»: una forma de comunicar con el cuerpo —posturas, gestos, silencios, cantos— más que con palabras. Es la base de la sección «El cuerpo que reza».', via:'Eje antropológico' },
 { a:'Echeverry Pérez, Antonio José (2008)', t:'Etnohistoriador que estudia el origen del Señor de los Milagros de Buga. Lee la devoción como un culto nacido entre los sectores populares e indígenas, que resistió la desconfianza de la Iglesia colonial: el «Cristo rebelde».', via:'Memoria de la fe' },
 { a:'Fernández, N. S. (2017)', t:'Estudia parroquias renovadas en Buenos Aires y habla de «comunidades de sentido». Nos sirvió para pensar qué une a personas que rezan juntas sin conocerse.', via:'Comunidad' },
 { a:'Lyshon (1995), en Cuadernos de Geografía, vol. VII (1998)', t:'Geografía social: explica cómo un lugar atrae gente de lejos (convergencia), cómo los objetos dejados en un altar prolongan la presencia de alguien (distanciamiento) y cómo una hora de misa concentra la experiencia (compresión).', via:'Dimensión espacial' },
 { a:'Rivas y Jiménez', t:'Analizan marchas de oración en Minatitlán (Veracruz, México) en contextos de violencia. Muestran cómo rezar en grupo puede ayudar a ordenar emociones difíciles; lo usamos como referencia, no como algo comprobado en San Alfonso.', via:'Eje psicológico' },
 { a:'Catecismo de la Iglesia Católica', t:'Es la voz de la doctrina, el nivel de «lo que se debería hacer». Consultamos los artículos sobre la fe (155-156), la esperanza (1817), las imágenes (370, 2112, 2502), la liturgia (1132, 1140), la Iglesia como comunidad (781, 787-789), la confesión (1440-1442) y la oración (2691).', via:'Doctrina' },
 { a:'Alducin, Armando; Enciclopedia Wikitólica', t:'Definiciones divulgativas de la fe; de Alducin viene la idea de «creer para ver», que contrasta con pedir pruebas antes de confiar.', via:'Eje psicológico' }
];

const DIMS = { social:'Social', cultural:'Cultural', economica:'Económica', espacial:'Espacial' };

return { SOURCES, PHOTOS, VOICES, TESTIMONIES, FILTERS, SPACES, PATHS, MOMENTS, VISITS, GESTURES, GOMEZ, TIMELINE, KINDS, OBJECTS, NODES, EDGES, FINDINGS, CONTRAST, BIBLIO, DIMS };
})();
