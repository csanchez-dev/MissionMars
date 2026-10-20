// Catálogo inspirado en operaciones reales de Perseverance (cráter Jezero, Marte 2020).
export const MISSIONS = [
 {id:'pano',title:'Panorámica del delta',instrument:'mastcam',x:900,duration:4,points:100,minLevel:1,
  brief:'Mastcam-Z: mosaico estéreo en color para planificar la ruta hacia el delta.'},
 {id:'libs',title:'Disparo láser a roca',instrument:'supercam',x:1400,duration:5,points:120,minLevel:1,
  brief:'SuperCam: el láser LIBS vaporiza una mota de roca y analiza el plasma. Composición a 7 metros.'},
 {id:'meda',title:'Lectura meteorológica',instrument:'meda',x:1800,duration:4,points:100,minLevel:1,
  brief:'MEDA: presión, temperatura, viento y polvo. Datos vitales para el futuro ascenso desde Marte.'},
 {id:'abrade',title:'Abrasión de roca',instrument:'abrasion',x:2200,duration:6,points:150,minLevel:2,
  brief:'Abrasión: retira la capa de polvo para exponer roca fresca.'},
 {id:'scan',title:'Escaneo de biofirmas',instrument:'pixl',x:2350,duration:7,points:180,minLevel:2,
  brief:'PIXL y SHERLOC: mapas de rayos X y UV sobre la roca abrasionada, buscando compuestos orgánicos.'},
 {id:'radar',title:'Radar del subsuelo',instrument:'rimfax',x:2750,duration:6,points:150,minLevel:3,
  brief:'RIMFAX: radar de penetración que revela los estratos enterrados del delta.'},
 {id:'core',title:'Muestra de núcleo',instrument:'coring',x:3150,duration:9,points:250,minLevel:3,
  brief:'Perfora un núcleo y séllalo en un tubo para la futura misión de retorno de muestras.'},
 {id:'depot',title:'Depósito Three Forks',instrument:'depot',x:3600,duration:8,points:300,minLevel:4,
  brief:'Deja tubos de muestra sobre la superficie como respaldo para su recogida futura.'},
 {id:'monolith',title:'Anomalía prismática',instrument:'supercam',x:3900,duration:8,points:500,minLevel:4,
  brief:'Columna oscura y perfecta... ¿un monolito? Analízala: probablemente fracturación columnar en basalto.'}
];
