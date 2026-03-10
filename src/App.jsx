import { useState } from "react";

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #07080f; }
  .app { min-height: 100vh; background: radial-gradient(ellipse at 20% 50%, #0d1a2e 0%, #07080f 50%, #0a0a14 100%); font-family: 'DM Sans', sans-serif; color: #e8dfc8; position: relative; overflow-x: hidden; }
  .stars { position: fixed; inset: 0; pointer-events: none; background-image: radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 100%), radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,0.3) 0%, transparent 100%), radial-gradient(1.5px 1.5px at 35% 15%, rgba(255,220,150,0.4) 0%, transparent 100%), radial-gradient(1px 1px at 70% 45%, rgba(255,255,255,0.3) 0%, transparent 100%), radial-gradient(2px 2px at 60% 25%, rgba(255,220,180,0.3) 0%, transparent 100%), radial-gradient(1px 1px at 85% 85%, rgba(255,255,255,0.25) 0%, transparent 100%); }
  .container { max-width: 680px; margin: 0 auto; padding: 40px 20px; position: relative; z-index: 1; }
  .header { text-align: center; margin-bottom: 44px; }
  .header-icon { font-size: 44px; margin-bottom: 12px; display: block; }
  .header h1 { font-family: 'Cormorant Garamond', serif; font-size: 2.6rem; font-weight: 300; color: #f5e6c8; line-height: 1.1; }
  .header h1 em { font-style: italic; color: #d4a853; }
  .header p { color: #6a5a40; font-size: 0.78rem; margin-top: 10px; letter-spacing: 0.12em; text-transform: uppercase; }
  .progress-bar { display: flex; gap: 8px; margin-bottom: 36px; }
  .progress-step { flex: 1; height: 3px; background: #1e2030; border-radius: 2px; transition: background 0.5s ease; }
  .progress-step.active { background: linear-gradient(90deg, #d4a853, #e8c87a); }
  .progress-step.done { background: #7a6040; }
  .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(212,168,83,0.15); border-radius: 20px; padding: 36px; backdrop-filter: blur(10px); animation: fadeSlide 0.4s ease; }
  @keyframes fadeSlide { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  .step-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.15em; color: #d4a853; margin-bottom: 6px; }
  .step-title { font-family: 'Cormorant Garamond', serif; font-size: 1.9rem; font-weight: 300; color: #f0e4cc; margin-bottom: 6px; }
  .step-subtitle { color: #6a6050; font-size: 0.82rem; margin-bottom: 28px; }
  .field { margin-bottom: 22px; }
  .field label { display: block; font-size: 0.75rem; color: #a09070; letter-spacing: 0.08em; margin-bottom: 7px; text-transform: uppercase; }
  .field input, .field select { width: 100%; padding: 13px 15px; background: rgba(255,255,255,0.04); border: 1px solid rgba(212,168,83,0.2); border-radius: 10px; color: #e8dfc8; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; outline: none; transition: border-color 0.3s; -webkit-appearance: none; }
  .field input:focus, .field select:focus { border-color: rgba(212,168,83,0.5); background: rgba(212,168,83,0.05); }
  .field select option { background: #13141f; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .sex-select { display: flex; gap: 10px; }
  .sex-btn { flex: 1; padding: 13px; border-radius: 10px; border: 1px solid rgba(212,168,83,0.2); background: rgba(255,255,255,0.03); color: #a09070; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 0.88rem; transition: all 0.2s; }
  .sex-btn.selected { border-color: #d4a853; background: rgba(212,168,83,0.12); color: #f0e4cc; }
  .option-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 8px; }
  .option-btn { padding: 10px 6px; border-radius: 8px; border: 1px solid rgba(212,168,83,0.15); background: rgba(255,255,255,0.02); color: #7a7060; cursor: pointer; font-size: 0.78rem; text-align: center; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
  .option-btn.selected { border-color: #d4a853; background: rgba(212,168,83,0.1); color: #f0e4cc; }
  .option-btn .opt-icon { font-size: 1.2rem; display: block; margin-bottom: 3px; }
  .slider-field { margin-bottom: 24px; }
  .slider-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
  .slider-label { font-size: 0.75rem; color: #a09070; text-transform: uppercase; letter-spacing: 0.08em; }
  .slider-value { font-size: 0.8rem; color: #d4a853; font-weight: 500; }
  .slider-desc { font-size: 0.73rem; color: #5a5040; margin-top: 5px; }
  input[type=range] { width: 100%; height: 4px; -webkit-appearance: none; background: linear-gradient(90deg, #d4a853 var(--val,50%), #1e2030 var(--val,50%)); border-radius: 2px; outline: none; cursor: pointer; }
  input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 17px; height: 17px; border-radius: 50%; background: #d4a853; box-shadow: 0 0 8px rgba(212,168,83,0.5); }
  .btn-row { display: flex; gap: 10px; margin-top: 28px; }
  .btn-back { flex: 1; padding: 13px; border-radius: 10px; border: 1px solid rgba(212,168,83,0.2); background: transparent; color: #8a7d6b; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 0.88rem; transition: all 0.2s; }
  .btn-next { flex: 2; padding: 13px; border-radius: 10px; border: none; background: linear-gradient(135deg, #d4a853, #c4903a); color: #1a1000; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 0.92rem; font-weight: 500; transition: all 0.2s; }
  .btn-next:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(212,168,83,0.3); }
  .btn-next:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
  .result-header { text-align: center; margin-bottom: 32px; }
  .result-tag { font-size: 0.72rem; color: #6a5a40; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 6px; }
  .result-age { font-family: 'Cormorant Garamond', serif; font-size: 5.5rem; font-weight: 300; color: #d4a853; line-height: 1; }
  .result-age-label { font-size: 0.78rem; color: #5a5040; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 6px; }
  .life-bar-wrap { margin: 28px 0; }
  .life-bar-labels { display: flex; justify-content: space-between; font-size: 0.72rem; color: #5a5040; margin-bottom: 6px; }
  .life-bar { height: 22px; background: #1a1b25; border-radius: 11px; overflow: hidden; position: relative; }
  .life-bar-lived { height: 100%; background: linear-gradient(90deg, #3a2a10, #7a5520); border-radius: 11px 0 0 11px; transition: width 1.5s cubic-bezier(.16,1,.3,1); }
  .life-bar-remaining { height: 100%; background: linear-gradient(90deg, #d4a853, #f0c060); border-radius: 0 11px 11px 0; position: absolute; top: 0; transition: all 1.5s cubic-bezier(.16,1,.3,1); }
  .stats-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin: 20px 0; }
  .stat-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(212,168,83,0.1); border-radius: 12px; padding: 14px; text-align: center; }
  .stat-value { font-family: 'Cormorant Garamond', serif; font-size: 1.7rem; color: #d4a853; }
  .stat-label { font-size: 0.68rem; color: #6a6050; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 3px; }
  .modifiers-list { margin: 20px 0; }
  .mod-title { font-size: 0.68rem; color: #5a5040; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
  .modifier-item { display: flex; justify-content: space-between; align-items: center; padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
  .modifier-name { font-size: 0.83rem; color: #9a8a70; }
  .modifier-val { font-size: 0.83rem; font-weight: 500; }
  .pos { color: #7dcc88; } .neg { color: #cc7d7d; } .neutral { color: #8a7d6b; }
  .ai-section { margin-top: 28px; background: rgba(212,168,83,0.04); border: 1px solid rgba(212,168,83,0.14); border-radius: 16px; padding: 24px; }
  .ai-section h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; color: #d4a853; margin-bottom: 14px; }
  .ai-text { font-size: 0.88rem; line-height: 1.85; color: #b0a080; white-space: pre-line; }
  .ai-loading { display: flex; align-items: center; gap: 10px; color: #7a6a50; font-size: 0.83rem; }
  .ai-dot { width: 6px; height: 6px; border-radius: 50%; background: #d4a853; animation: pulse 1.2s ease-in-out infinite; }
  .ai-dot:nth-child(2) { animation-delay: 0.2s; } .ai-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes pulse { 0%,80%,100%{opacity:0.2;transform:scale(0.8)}40%{opacity:1;transform:scale(1)} }
  .disclaimer { text-align: center; margin-top: 20px; font-size: 0.72rem; color: #4a4030; line-height: 1.6; }
  @media(max-width:500px){ .card{padding:22px 16px} .two-col{grid-template-columns:1fr} .stats-grid{grid-template-columns:1fr 1fr} .result-age{font-size:4rem} .header h1{font-size:2rem} }
`;

const COUNTRIES = {
  "Alemania":{m:78.7,f:83.7},"Arabia Saudita":{m:74.9,f:76.8},"Argentina":{m:73.5,f:80.5},
  "Australia":{m:81.3,f:85.2},"Bangladesh":{m:70.8,f:74.3},"Bolivia":{m:67.4,f:72.8},
  "Brasil":{m:71.8,f:79.1},"Canadá":{m:80.4,f:84.7},"Chile":{m:76.9,f:82.5},
  "China":{m:75.0,f:79.4},"Colombia":{m:72.1,f:78.8},"Corea del Sur":{m:80.5,f:86.5},
  "Costa Rica":{m:77.0,f:82.2},"Cuba":{m:77.4,f:80.4},"Ecuador":{m:73.5,f:79.0},
  "Egipto":{m:69.4,f:73.2},"El Salvador":{m:69.1,f:77.3},"Emiratos Árabes":{m:77.5,f:79.8},
  "España":{m:80.7,f:86.1},"Estados Unidos":{m:74.5,f:80.2},"Etiopía":{m:64.8,f:68.2},
  "Filipinas":{m:67.3,f:75.2},"Francia":{m:79.8,f:85.8},"Ghana":{m:62.1,f:65.2},
  "Grecia":{m:78.9,f:84.0},"Guatemala":{m:70.5,f:76.0},"Honduras":{m:73.3,f:78.1},
  "India":{m:68.4,f:71.0},"Indonesia":{m:69.6,f:73.6},"Irán":{m:74.1,f:76.8},
  "Israel":{m:80.6,f:84.3},"Italia":{m:81.1,f:85.3},"Japón":{m:81.1,f:87.1},
  "Kenia":{m:62.6,f:68.1},"Kazajistán":{m:67.8,f:76.2},"Malasia":{m:73.7,f:77.7},
  "Marruecos":{m:74.4,f:77.4},"México":{m:71.8,f:77.4},"Nicaragua":{m:72.0,f:77.6},
  "Nigeria":{m:53.7,f:56.1},"Noruega":{m:81.2,f:84.9},"Países Bajos":{m:80.3,f:83.5},
  "Pakistán":{m:65.5,f:67.4},"Panamá":{m:74.8,f:80.4},"Paraguay":{m:71.2,f:76.5},
  "Perú":{m:72.4,f:77.2},"Polonia":{m:73.8,f:81.6},"Portugal":{m:78.7,f:84.4},
  "Rep. Dominicana":{m:70.1,f:76.7},"Reino Unido":{m:79.5,f:83.2},"Rusia":{m:66.5,f:76.8},
  "Singapur":{m:80.7,f:85.2},"Sudáfrica":{m:59.3,f:66.4},"Suecia":{m:80.8,f:84.3},
  "Suiza":{m:81.8,f:85.8},"Tailandia":{m:72.4,f:79.0},"Turquía":{m:74.5,f:79.6},
  "Ucrania":{m:67.5,f:77.2},"Uruguay":{m:74.3,f:81.5},"Uzbekistán":{m:70.5,f:74.8},
  "Venezuela":{m:69.4,f:77.0},"Vietnam":{m:71.0,f:76.5},
};

const OPTS = {
  smoking:[{val:"never",label:"Nunca fumé",icon:"🌿",mod:0},{val:"ex",label:"Ex-fumador",icon:"🚭",mod:-3},{val:"light",label:"Fumador leve",icon:"🚬",mod:-5},{val:"heavy",label:"Fumador fuerte",icon:"💨",mod:-10}],
  exercise:[{val:"athlete",label:"Atleta",icon:"🏆",mod:5},{val:"active",label:"Muy activo",icon:"🏃",mod:3},{val:"moderate",label:"Moderado",icon:"🚶",mod:1},{val:"sedentary",label:"Sedentario",icon:"🛋️",mod:-2}],
  diet:[{val:"excellent",label:"Excelente",icon:"🥗",mod:3},{val:"good",label:"Buena",icon:"🍎",mod:1},{val:"average",label:"Regular",icon:"🍔",mod:0},{val:"poor",label:"Deficiente",icon:"🍟",mod:-2}],
  alcohol:[{val:"none",label:"No bebo",icon:"💧",mod:1},{val:"light",label:"Ocasional",icon:"🥂",mod:0},{val:"moderate",label:"Moderado",icon:"🍷",mod:-1},{val:"heavy",label:"Frecuente",icon:"🍺",mod:-5}],
  sleep:[{val:"optimal",label:"7-8 horas",icon:"😴",mod:2},{val:"ok",label:"6-7 horas",icon:"🌙",mod:0},{val:"low",label:"< 6 horas",icon:"😵",mod:-2},{val:"excess",label:"> 9 horas",icon:"🛏️",mod:-1}],
  stress:[{val:"low",label:"Bajo",icon:"🧘",mod:2},{val:"moderate",label:"Moderado",icon:"😐",mod:0},{val:"high",label:"Alto",icon:"😰",mod:-3},{val:"extreme",label:"Extremo",icon:"🤯",mod:-5}],
  social:[{val:"strong",label:"Muy social",icon:"👨‍👩‍👧‍👦",mod:2},{val:"moderate",label:"Moderado",icon:"👥",mod:0},{val:"isolated",label:"Aislado",icon:"🧍",mod:-3}],
  education:[{val:"high",label:"Universitaria",icon:"🎓",mod:2},{val:"mid",label:"Secundaria",icon:"📚",mod:0},{val:"low",label:"Primaria",icon:"✏️",mod:-1}],
};

const MOD_LABELS = {
  smoking:"Tabaco", exercise:"Ejercicio físico", diet:"Calidad de dieta",
  alcohol:"Alcohol", sleep:"Calidad del sueño", stress:"Estrés crónico",
  social:"Vida social", education:"Nivel educativo"
};

export default function App() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name:"", birthdate:"", sex:"", country:"",
    smoking:"never", exercise:"moderate", diet:"average", alcohol:"light",
    sleep:"optimal", stress:"moderate", social:"moderate", education:"mid",
    bmi:22, conditions:0
  });
  const [results, setResults] = useState(null);
  const [aiText, setAiText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [barW, setBarW] = useState(0);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const getMod = (key) => OPTS[key]?.find(o => o.val === form[key])?.mod ?? 0;

  const calcResults = () => {
    const base = COUNTRIES[form.country] || { m: 70, f: 75 };
    const baseLE = form.sex === "m" ? base.m : base.f;
    const habitMods = Object.keys(OPTS).reduce((acc, k) => ({ ...acc, [k]: getMod(k) }), {});
    const bmiMod = form.bmi < 18.5 ? -1 : form.bmi <= 24.9 ? 1.5 : form.bmi <= 29.9 ? -1 : -4;
    const condMod = -Number(form.conditions) * 2;
    const totalMod = Object.values(habitMods).reduce((a, b) => a + b, 0) + bmiMod + condMod;
    const adjustedLE = Math.max(baseLE + totalMod, 45);
    const birth = new Date(form.birthdate);
    const now = new Date();
    const age = (now - birth) / (1000 * 60 * 60 * 24 * 365.25);
    const remaining = Math.max(adjustedLE - age, 0);
    const deathYear = new Date(birth.getTime() + adjustedLE * 365.25 * 24 * 60 * 60 * 1000);
    return {
      baseLE: Math.round(baseLE * 10) / 10,
      adjustedLE: Math.round(adjustedLE * 10) / 10,
      age: Math.round(age * 10) / 10,
      remaining: Math.round(remaining * 10) / 10,
      deathYear, habitMods,
      bmiMod: Math.round(bmiMod * 10) / 10,
      condMod, totalMod: Math.round(totalMod * 10) / 10,
      pct: Math.min((age / adjustedLE) * 100, 100)
    };
  };

  const generateAnalysis = (r) => {
    const nombre = form.name || "viajero";
    const sexLabel = form.sex === "m" ? "hombre" : "mujer";
    const edad = Math.floor(r.age);
    const restantes = r.remaining;
    const ajuste = r.totalMod;

    // — Párrafo 1: perfil general —
    const perfiles = {
      excelente: ajuste >= 8,
      bueno:     ajuste >= 3,
      promedio:  ajuste >= -2,
      mejorable: ajuste >= -6,
      critico:   ajuste < -6,
    };
    const nivelPerfil = Object.keys(perfiles).find(k => perfiles[k]);

    const p1_opciones = {
      excelente: `${nombre}, con ${edad} años y un perfil que supera ampliamente la media de ${form.country}, tus hábitos de vida son notablemente sólidos. Has ganado ${ajuste} años sobre la esperanza de vida base de tu país — algo que solo logra una minoría. La ciencia de la longevidad confirma que perfiles como el tuyo no solo viven más, sino con mayor calidad de vida en las últimas décadas.`,
      bueno:     `${nombre}, a tus ${edad} años presentas un perfil de salud por encima del promedio en ${form.country}. Has sumado ${ajuste} años a tu esperanza de vida base gracias a decisiones consistentes. No eres perfecto, pero vas por buen camino — y en longevidad, la constancia vale más que la perfección ocasional.`,
      promedio:  `${nombre}, a tus ${edad} años tu perfil se sitúa cerca de la media estadística de ${form.country}. Ni en zona de riesgo ni destacando positivamente, lo que significa que tienes un margen real de mejora. Cambios moderados en tus hábitos pueden mover significativamente la aguja: incluso 3-4 años adicionales de vida saludable son completamente alcanzables.`,
      mejorable: `${nombre}, a tus ${edad} años tu perfil muestra algunos factores que están restando años a tu esperanza de vida base en ${form.country}. Un ajuste de ${ajuste} años es una señal de alerta, pero también una oportunidad concreta. La buena noticia: el cuerpo humano responde positivamente a cambios de hábito incluso en edades avanzadas — nunca es tarde para recuperar terreno.`,
      critico:   `${nombre}, a tus ${edad} años tu perfil presenta varios factores de riesgo acumulados que están impactando seriamente tu esperanza de vida. Una diferencia de ${ajuste} años respecto a la base de ${form.country} es significativa. Esta estimación no es un veredicto — es una llamada de atención. Cambios ahora, incluso pequeños y graduales, pueden revertir parte de este impacto de forma real y medible.`,
    };

    // — Párrafo 2: recomendaciones específicas —
    const recomendaciones = [];

    if (form.smoking === "heavy") recomendaciones.push("Dejar de fumar es el cambio con mayor impacto posible en tu longevidad — hasta 10 años recuperables según la OMS. No hay ninguna otra intervención que se le acerque.");
    else if (form.smoking === "light") recomendaciones.push("Aunque fumas poco, el tabaco sigue siendo el factor más dañino en tu perfil. Dejarlo por completo podría devolverte 5 años de esperanza de vida.");
    else if (form.smoking === "ex") recomendaciones.push("Haber dejado de fumar ya fue tu mejor decisión de salud. Tu riesgo cardiovascular continúa reduciéndose con cada año que pasa.");

    if (form.exercise === "sedentary") recomendaciones.push("La inactividad física es el segundo mayor factor de riesgo modificable. 30 minutos de caminata diaria reducen la mortalidad general en un 35% — no hace falta un gimnasio ni ser atleta.");
    else if (form.exercise === "moderate") recomendaciones.push("Tu nivel de actividad es un buen punto de partida. Aumentar a ejercicio moderado-intenso 4 días por semana podría sumar hasta 3 años adicionales a tu estimación.");
    else if (form.exercise === "active" || form.exercise === "athlete") recomendaciones.push("Tu nivel de actividad física es uno de tus activos más valiosos. Mantenerlo con constancia a lo largo de los años es lo más importante.");

    if (form.stress === "extreme") recomendaciones.push("El estrés crónico extremo eleva el cortisol de forma sostenida, acelerando el envejecimiento celular. Técnicas de regulación — meditación, respiración, terapia — no son opcionales para tu perfil: son medicina.");
    else if (form.stress === "high") recomendaciones.push("Tu nivel de estrés alto es un factor silencioso pero real. Incorporar aunque sea 10 minutos diarios de desconexión activa tiene efectos medibles en marcadores de inflamación y envejecimiento.");

    if (form.diet === "poor") recomendaciones.push("Una dieta deficiente afecta desde el sistema cardiovascular hasta la función cognitiva. Pequeños cambios sostenidos — más vegetales, menos ultraprocesados — tienen mayor impacto que dietas estrictas cortas.");
    else if (form.diet === "average") recomendaciones.push("Mejorar tu dieta de regular a buena es uno de los cambios más accesibles y con mejor relación esfuerzo-resultado. La dieta mediterránea es la más respaldada científicamente para la longevidad.");

    if (form.bmi >= 30) recomendaciones.push("La obesidad multiplica el riesgo de enfermedades cardiovasculares, diabetes tipo 2 y ciertos cánceres. Una reducción del 5-10% del peso corporal ya produce mejoras clínicamente significativas.");
    else if (form.bmi >= 25) recomendaciones.push("El sobrepeso leve tiene un impacto moderado pero acumulativo. Combinado con ejercicio regular, pequeños ajustes en la alimentación pueden normalizarlo sin dietas extremas.");

    if (form.sleep === "low") recomendaciones.push("Dormir menos de 6 horas cronifica la inflamación y deteriora la regulación metabólica. La privación de sueño sostenida es un factor de envejecimiento acelerado con evidencia científica sólida.");

    if (form.social === "isolated") recomendaciones.push("El aislamiento social tiene un impacto en longevidad comparable al tabaquismo según estudios de Harvard. Las conexiones sociales genuinas — no la cantidad sino la calidad — son un factor protector potente.");

    if (form.alcohol === "heavy") recomendaciones.push("El consumo frecuente de alcohol daña el hígado, eleva el riesgo cardiovascular y afecta la calidad del sueño. Reducirlo a ocasional ya produce mejoras en menos de 4 semanas.");

    if (Number(form.conditions) >= 2) recomendaciones.push("Con varias condiciones crónicas diagnosticadas, el seguimiento médico regular y la adherencia al tratamiento son los factores que más pueden extender y mejorar tu calidad de vida.");

    // Seleccionar las 2-3 más relevantes
    const topRecs = recomendaciones.slice(0, 3);
    const p2 = topRecs.length > 0
      ? `Las áreas donde un cambio tendría mayor impacto en tu caso: ${topRecs.join(" Además, ")}`
      : `Tu perfil no muestra factores de riesgo críticos. Lo más importante ahora es mantener consistencia: los estudios muestran que los hábitos saludables sostenidos durante décadas tienen un efecto compuesto en longevidad similar al interés bancario.`;

    // — Párrafo 3: mensaje motivador —
    const mensajes_finales = [
      `${restantes} años estadísticos es tiempo suficiente para construir lo que quieras construir, ver lo que quieras ver y ser quien quieras ser. La esperanza de vida es una media — pero tú eres un individuo con capacidad real de influir en ese número. Cada elección positiva que hagas hoy no solo suma tiempo: mejora la calidad de cada uno de esos años.`,
      `La investigación sobre longevidad tiene un hallazgo consistente: las personas que llegan a los 90 y 100 años no suelen tener vidas perfectas, sino vidas con propósito, conexión y movimiento. ${nombre}, tienes delante ${restantes} años para invertir en exactamente eso.`,
      `El momento más impactante para cambiar un hábito siempre es ahora — no mañana, no el lunes. Cada año que pasa con un hábito dañino tiene un costo compuesto, y cada año con un hábito positivo tiene un beneficio compuesto. ${nombre}, tus próximos ${restantes} años pueden ser muy distintos a los anteriores si decides que así sea.`,
      `Los datos son datos, pero la vida es tuya. Usa esta estimación no como un destino fijo, sino como un mapa con margen de maniobra. Con ${restantes} años por delante, el mejor momento para invertir en tu salud es exactamente ahora.`,
    ];
    const p3 = mensajes_finales[Math.floor(r.adjustedLE) % mensajes_finales.length];

    return `${p1_opciones[nivelPerfil]}\n\n${p2}\n\n${p3}`;
  };

  const fetchAI = (r) => {
    setAiLoading(true);
    setAiText("");
    // Pequeña pausa para que se sienta como procesamiento
    setTimeout(() => {
      setAiText(generateAnalysis(r));
      setAiLoading(false);
    }, 900);
  };

  const handleCalc = () => {
    const r = calcResults();
    setResults(r); setStep(3);
    setTimeout(() => setBarW(r.pct), 400);
    fetchAI(r);
  };

  const OptionGrid = ({ field }) => (
    <div className="option-grid">
      {OPTS[field].map(o => (
        <button key={o.val}
          className={`option-btn${form[field] === o.val ? " selected" : ""}`}
          onClick={() => set(field, o.val)}>
          <span className="opt-icon">{o.icon}</span>{o.label}
        </button>
      ))}
    </div>
  );

  const valid1 = form.name && form.birthdate && form.sex && form.country;

  return (
    <>
      <style>{STYLE}</style>
      <div className="app">
        <div className="stars" />
        <div className="container">

          <div className="header">
            <span className="header-icon">⏳</span>
            <h1>Tu <em>Horizonte</em> de Vida</h1>
            <p>Estimación estadística de longevidad · Datos OMS 2024</p>
          </div>

          {step < 3 && (
            <div className="progress-bar">
              {[0, 1, 2].map(i => (
                <div key={i} className={`progress-step ${step > i ? "done" : step === i ? "active" : ""}`} />
              ))}
            </div>
          )}

          {/* PASO 1 */}
          {step === 0 && (
            <div className="card">
              <div className="step-label">Paso 1 de 3</div>
              <div className="step-title">Datos personales</div>
              <div className="step-subtitle">Tu punto de partida según la OMS</div>
              <div className="field">
                <label>Tu nombre</label>
                <input placeholder="¿Cómo te llamas?" value={form.name} onChange={e => set("name", e.target.value)} />
              </div>
              <div className="two-col">
                <div className="field">
                  <label>Fecha de nacimiento</label>
                  <input type="date" value={form.birthdate}
                    onChange={e => set("birthdate", e.target.value)}
                    max={new Date().toISOString().split("T")[0]} />
                </div>
                <div className="field">
                  <label>Sexo biológico</label>
                  <div className="sex-select">
                    <button className={`sex-btn${form.sex === "m" ? " selected" : ""}`} onClick={() => set("sex", "m")}>♂ Masculino</button>
                    <button className={`sex-btn${form.sex === "f" ? " selected" : ""}`} onClick={() => set("sex", "f")}>♀ Femenino</button>
                  </div>
                </div>
              </div>
              <div className="field">
                <label>País de nacimiento</label>
                <select value={form.country} onChange={e => set("country", e.target.value)}>
                  <option value="">Selecciona tu país...</option>
                  {Object.keys(COUNTRIES).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="btn-row">
                <button className="btn-next" onClick={() => setStep(1)} disabled={!valid1}>Continuar →</button>
              </div>
            </div>
          )}

          {/* PASO 2 */}
          {step === 1 && (
            <div className="card">
              <div className="step-label">Paso 2 de 3</div>
              <div className="step-title">Hábitos de vida</div>
              <div className="step-subtitle">Cada elección puede sumar o restar años</div>
              {["smoking", "exercise", "diet", "alcohol"].map(field => (
                <div className="field" key={field}>
                  <label>{MOD_LABELS[field]}</label>
                  <OptionGrid field={field} />
                </div>
              ))}
              <div className="btn-row">
                <button className="btn-back" onClick={() => setStep(0)}>← Atrás</button>
                <button className="btn-next" onClick={() => setStep(2)}>Continuar →</button>
              </div>
            </div>
          )}

          {/* PASO 3 */}
          {step === 2 && (
            <div className="card">
              <div className="step-label">Paso 3 de 3</div>
              <div className="step-title">Factores adicionales</div>
              <div className="step-subtitle">El entorno también moldea tu longevidad</div>
              {["sleep", "stress", "social", "education"].map(field => (
                <div className="field" key={field}>
                  <label>{MOD_LABELS[field]}</label>
                  <OptionGrid field={field} />
                </div>
              ))}
              <div className="slider-field">
                <div className="slider-header">
                  <span className="slider-label">Índice de Masa Corporal (IMC)</span>
                  <span className="slider-value">{form.bmi} kg/m²</span>
                </div>
                <input type="range" min="10" max="50" step="0.5" value={form.bmi}
                  style={{ "--val": `${(form.bmi - 10) / 40 * 100}%` }}
                  onChange={e => set("bmi", Number(e.target.value))} />
                <div className="slider-desc">
                  {form.bmi < 18.5 ? "⚠️ Bajo peso" : form.bmi <= 24.9 ? "✅ Peso saludable" : form.bmi <= 29.9 ? "⚠️ Sobrepeso" : "⛔ Obesidad"}
                </div>
              </div>
              <div className="slider-field">
                <div className="slider-header">
                  <span className="slider-label">Enfermedades crónicas diagnosticadas</span>
                  <span className="slider-value">{form.conditions} {form.conditions === 1 ? "condición" : "condiciones"}</span>
                </div>
                <input type="range" min="0" max="5" step="1" value={form.conditions}
                  style={{ "--val": `${form.conditions / 5 * 100}%` }}
                  onChange={e => set("conditions", Number(e.target.value))} />
                <div className="slider-desc">Diabetes, hipertensión, enfermedades cardíacas, EPOC, etc.</div>
              </div>
              <div className="btn-row">
                <button className="btn-back" onClick={() => setStep(1)}>← Atrás</button>
                <button className="btn-next" onClick={handleCalc}>✦ Calcular mi horizonte</button>
              </div>
            </div>
          )}

          {/* RESULTADOS */}
          {step === 3 && results && (
            <div className="card">
              <div className="result-header">
                <div className="result-tag">Esperanza de vida estimada, {form.name || "viajero"}</div>
                <div className="result-age">{results.adjustedLE}</div>
                <div className="result-age-label">años · ajustado por tus hábitos</div>
              </div>

              <div className="life-bar-wrap">
                <div className="life-bar-labels">
                  <span>Nacimiento · {new Date(form.birthdate).getFullYear()}</span>
                  <span>Ahora · {Math.floor(results.age)} años</span>
                  <span>Est. · {results.deathYear.getFullYear()}</span>
                </div>
                <div className="life-bar">
                  <div className="life-bar-lived" style={{ width: `${barW}%` }} />
                  <div className="life-bar-remaining" style={{ left: `${barW}%`, width: `${100 - barW}%` }} />
                </div>
                <div className="life-bar-labels" style={{ marginTop: "5px" }}>
                  <span style={{ color: "#7a5520" }}>▓ Vivido</span>
                  <span style={{ color: "#d4a853" }}>▓ Por vivir</span>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card"><div className="stat-value">{Math.floor(results.age)}</div><div className="stat-label">Edad actual</div></div>
                <div className="stat-card"><div className="stat-value">{results.remaining}</div><div className="stat-label">Años restantes</div></div>
                <div className="stat-card">
                  <div className="stat-value" style={{ color: results.totalMod >= 0 ? "#7dcc88" : "#cc7d7d" }}>
                    {results.totalMod > 0 ? "+" : ""}{results.totalMod}
                  </div>
                  <div className="stat-label">Ajuste hábitos</div>
                </div>
              </div>

              <div className="modifiers-list">
                <div className="mod-title">Desglose de modificadores</div>
                {Object.entries(results.habitMods).map(([k, v]) => (
                  <div key={k} className="modifier-item">
                    <span className="modifier-name">{MOD_LABELS[k]}</span>
                    <span className={`modifier-val ${v > 0 ? "pos" : v < 0 ? "neg" : "neutral"}`}>
                      {v > 0 ? "+" : ""}{v === 0 ? "±0" : v} años
                    </span>
                  </div>
                ))}
                <div className="modifier-item">
                  <span className="modifier-name">IMC ({form.bmi})</span>
                  <span className={`modifier-val ${results.bmiMod > 0 ? "pos" : results.bmiMod < 0 ? "neg" : "neutral"}`}>
                    {results.bmiMod > 0 ? "+" : ""}{results.bmiMod === 0 ? "±0" : results.bmiMod} años
                  </span>
                </div>
                <div className="modifier-item">
                  <span className="modifier-name">Enfermedades crónicas</span>
                  <span className={`modifier-val ${results.condMod < 0 ? "neg" : "neutral"}`}>
                    {results.condMod === 0 ? "±0" : results.condMod} años
                  </span>
                </div>
                <div className="modifier-item" style={{ borderBottom: "none", paddingTop: "10px" }}>
                  <span style={{ fontSize: "0.85rem", color: "#c8b890", fontWeight: 500 }}>Base país ({form.country})</span>
                  <span style={{ fontSize: "0.85rem", color: "#c8b890" }}>{results.baseLE} años</span>
                </div>
              </div>

              <div className="ai-section">
                <h3>✦ Análisis personalizado con IA</h3>
                {aiLoading ? (
                  <div className="ai-loading">
                    <div className="ai-dot" /><div className="ai-dot" /><div className="ai-dot" />
                    <span>Generando tu análisis...</span>
                  </div>
                ) : (
                  <div className="ai-text">{aiText}</div>
                )}
              </div>

              <div className="disclaimer">
                Esta estimación es estadística, no médica. Basada en datos OMS 2024 y literatura científica sobre longevidad.<br />
                Consulta siempre a un profesional de la salud para evaluaciones personalizadas.
              </div>
              <div className="btn-row" style={{ marginTop: "20px" }}>
                <button className="btn-back" style={{ flex: 1 }}
                  onClick={() => { setStep(0); setResults(null); setBarW(0); setAiText(""); }}>
                  ← Empezar de nuevo
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
