/* ============================================
   SINERG.ia — quiz.js
   ============================================ */

// DATOS DEL QUIZ
// ──────────────────────────────────────────────
const preguntas = [
  {
    texto: "Cuando escuchas por primera vez que la IA puede hacer casi cualquier cosa, ¿qué es lo primero que haces?",
    opciones: [
      { texto: "Empiezo a imaginar todo lo que podría hacer con eso para mis proyectos.", perfil: "AC" },
      { texto: "Me da curiosidad. Me cuestiono ¿Cómo funciona? y comienzo a probarla.", perfil: "ACU" },
      { texto: "¿Hace cualquier cosa? Espera... eso necesita una aclaración.", perfil: "MC" },
      { texto: "Me pregunto: ¿Y para qué sirve en la práctica o en el trabajo real?", perfil: "MP" }
    ]
  },
  {
    texto: "Si pudieras usar una herramienta de IA hoy, ¿para qué la usarías primero?",
    opciones: [
      { texto: "Para organizar todas las ideas que tengo en mi cabeza y darles forma.", perfil: "AC" },
      { texto: "Para explorar qué puede hacer y ver qué pasa.", perfil: "ACU" },
      { texto: "Para verificar información y revisar que lo que genera sea confiable.", perfil: "MC" },
      { texto: "Para resolver algo concreto: un resumen, un plan, un análisis.", perfil: "MP" }
    ]
  },
  {
    texto: "¿Qué te frena o te da miedo a la hora de usar Inteligencia Artificial?",
    opciones: [
      { texto: "Que lo que crea no capture realmente mi voz o mi estilo.", perfil: "AC" },
      { texto: "No saber por dónde empezar ni qué herramienta elegir.", perfil: "ACU" },
      { texto: "Que genere información incorrecta y yo no me dé cuenta.", perfil: "MC" },
      { texto: "No tener claro si realmente me va a ahorrar tiempo.", perfil: "MP" }
    ]
  },
  {
    texto: "Para aprender algo nuevo, ¿qué tipo de ejemplo necesitas?",
    opciones: [
      { texto: "Uno visual, creativo, que me muestre posibilidades y me inspire.", perfil: "AC" },
      { texto: "Uno práctico que pueda replicar yo mismo/a para ver qué pasa.", perfil: "ACU" },
      { texto: "Uno con fuentes claras, contexto y explicación verificable.", perfil: "MC" },
      { texto: "Uno que resuelva un problema real que yo ya tengo.", perfil: "MP" }
    ]
  },
  {
    texto: "¿Cuál de estas frases te suena más familiar?",
    opciones: [
      { texto: "Tengo mil ideas en la cabeza, pero me cuesta aterrizarlas.", perfil: "AC" },
      { texto: "Siento que me estoy perdiendo algo y quiero entender de qué va esto.", perfil: "ACU" },
      { texto: "No confío fácilmente. Prefiero revisar antes de creerle a la IA.", perfil: "MC" },
      { texto: "No necesito teoría, necesito herramientas que funcionen.", perfil: "MP" }
    ]
  },
  {
    texto: "Si la IA te da una respuesta, ¿cuál es tu primer reacción?",
    opciones: [
      { texto: "La tomo como punto de partida y le agrego mi toque personal.", perfil: "AC" },
      { texto: "Me pregunto si puedo pedirle algo más interesante o funcional.", perfil: "ACU" },
      { texto: "La reviso, la comparo y busco confirmarla antes de usar la respuesta.", perfil: "MC" },
      { texto: "Evalúo si realmente me sirve para lo que necesito.", perfil: "MP" }
    ]
  },
  {
    texto: "¿Qué rol le darías a la IA en tu vida?",
    opciones: [
      { texto: "Asistente creativa: me ayuda a desarrollar y organizar mis ideas.", perfil: "AC" },
      { texto: "Compañera de exploración: me muestra nuevos caminos.", perfil: "ACU" },
      { texto: "Herramienta de análisis: me ayuda a pensar mejor pero no a pensar por mí.", perfil: "MC" },
      { texto: "Herramienta de productividad: hace lo que me lleva mucho tiempo.", perfil: "MP" }
    ]
  },
  {
    texto: "¿Qué es lo que más te gustaría lograr usando IA en los próximos meses?",
    opciones: [
      { texto: "Crear más contenido, proyectos y materiales con menos dificultad.", perfil: "AC" },
      { texto: "Entender qué es la IA de verdad y perderle el miedo.", perfil: "ACU" },
      { texto: "Aprender a usarla de forma crítica, sin depender de ella.", perfil: "MC" },
      { texto: "Aplicarla a mi trabajo o estudio de forma concreta y eficiente.", perfil: "MP" }
    ]
  },
  {
    texto: "Cuando la IA se equivoca o da una respuesta rara, ¿qué piensas?",
    opciones: [
      { texto: "Wow, qué interesante. A veces los errores me llevan a ideas inesperadas.", perfil: "AC" },
      { texto: "Normal, todavía está aprendiendo, reviso y veo qué pasó.", perfil: "ACU" },
      { texto: "Exactamente por eso hay que verificar siempre las respuestas.", perfil: "MC" },
      { texto: "Si falla así, no me sirve. Necesito algo realmente confiable.", perfil: "MP" }
    ]
  }
];

const perfiles = {
  AC: {
    nombre: "Alma Creativa",
    emoji: "🎨",
    tagline: "La IA es tu pincel. Ya tenías el cuadro en la mente.",
    color: "#665a9c",
    colorLight: "#eeeaf8",
    desc: "Llegaste a la IA desde la intuición y el deseo de crear. No la usas para reemplazar tu voz — la usas para amplificarla. Ves posibilidades donde otros ven herramientas, y tienes el don de hacer que lo tecnológico se sienta humano. Tu mayor fortaleza es la visión. Tu próximo paso es la consistencia.",
    traits: ["Intuitiva", "Visionaria", "Expresiva", "Experimental"],
    tools: "ChatGPT · Midjourney · Adobe Firefly · Canva IA · Notion AI",
    quote: '"La IA no crea en tu lugar. Crea contigo — si sabés lo que querés decir." — SINERG.ia',
    tip: "Tu superpoder es la visión creativa. Úsalo para dirigir a la IA como si fuera tu asistente de estudio: dile tu estilo, tu tono, tu estética. Cuanto más específica seas, más tuyo se siente el resultado. No le pidas que cree — pedile que te ayude a dar forma a lo que ya está en tu cabeza.",
    prompt: `Actúa como mi asistente creativo personal. Mi estilo es [describe tu estilo: minimalista, colorido, emocional, etc.] y mi audiencia es [describe a quién va dirigido tu trabajo]. Tengo esta idea: [describe tu idea en una o dos frases]. Ayúdame a desarrollarla con opciones concretas: un concepto, un título, una estructura y un primer párrafo o descripción. Quiero que suene a mí, no a una IA.`
  },
  MC: {
    nombre: "Mente Crítica",
    emoji: "🔍",
    tagline: "Antes de usar, entendés. Eso es poder.",
    color: "#4a3d8a",
    colorLight: "#e8e4f5",
    desc: "Tu relación con la IA está mediada por el pensamiento. No te conformas con que algo funcione — querés saber por qué funciona, quién lo entrenó y qué intereses hay detrás. Esa mirada crítica no te frena: te protege. Y en este mundo de IA sin filtros, esa habilidad vale oro.",
    traits: ["Analítica", "Rigurosa", "Investigadora", "Cautelosa"],
    tools: "NotebookLM · Perplexity · ChatGPT con prompts avanzados · Elicit",
    quote: '"Entender la IA no es opcional. Es la diferencia entre usarla y ser usada por ella." — SINERG.ia',
    tip: "Tu fortaleza está en hacer las preguntas correctas — y eso es exactamente lo que la IA necesita para darte respuestas útiles. En lugar de pedirle que te dé información, pedile que te ayude a analizarla, cuestionarla y compararla. Usá la IA como interlocutora intelectual, no como fuente de verdad.",
    prompt: `Quiero analizar el siguiente tema desde múltiples perspectivas: [escribe el tema]. Primero dame un resumen objetivo. Luego identifica los principales argumentos a favor y en contra. Señala qué información debería verificar por fuentes externas antes de usarla. Y finalmente, haceme tres preguntas críticas que yo debería hacerme antes de sacar conclusiones.`
  },
  MP: {
    nombre: "Mente Práctica",
    emoji: "⚡",
    tagline: "Si algo te ahorra tiempo, ya lo querés entender.",
    color: "#7c5cbf",
    colorLight: "#f0ecfc",
    desc: "Para vos, la IA es una aliada de productividad. No te perdés en el debate filosófico — vas directo al resultado. Ya estás usando herramientas o estás a punto de hacerlo, y cuando algo funciona, lo integrás a tu rutina sin pensarlo dos veces. Tu desafío: ir un poco más profundo para sacarle el máximo.",
    traits: ["Eficiente", "Orientada a resultados", "Adaptable", "Pragmática"],
    tools: "ChatGPT · Gemini · Zapier IA · Make · Notion AI · Otter.ai",
    quote: '"La mejor herramienta no es la más sofisticada. Es la que realmente usás." — SINERG.ia',
    tip: "Ya sabés que la IA ahorra tiempo — el siguiente nivel es usarla para pensar mejor, no solo para hacer más rápido. Empezá a pedirle que te anticipe problemas, que te dé opciones y que te ayude a tomar decisiones, no solo a ejecutarlas. Ahí es donde la productividad se convierte en estrategia.",
    prompt: `Soy [tu profesión o rol] y necesito resolver esto de la forma más eficiente posible: [describe la tarea o problema]. Dame un plan de acción paso a paso con los recursos o herramientas que usarías. Luego dime qué pasos podría automatizar o delegar a una IA, y cuáles requieren mi criterio humano obligatoriamente.`
  },
  ACU: {
    nombre: "Alma Curiosa",
    emoji: "✨",
    tagline: "Estás al principio de algo muy grande. Y eso es exactamente el lugar correcto.",
    color: "#9b6eb5",
    colorLight: "#f8f0fc",
    desc: "Todavía estás encontrando tu lugar en el mundo de la IA — y eso no es una debilidad, es honestidad. Tu curiosidad es el motor. No llegaste con certezas: llegaste con ganas de entender. Eso te hace perfecta para aprender sin los vicios de quien cree que ya sabe todo. Estás en el inicio del camino más emocionante.",
    traits: ["Curiosa", "Abierta", "Honesta", "En proceso"],
    tools: "ChatGPT · Gemini · NotebookLM · Podcast SINERG.ia 🎙️",
    quote: '"No hace falta entender todo de golpe. De hecho, este podcast nació para eso." — SINERG.ia',
    tip: "El mejor punto de partida no es aprender todo sobre IA — es empezar con una sola pregunta que ya tenés. Abrí ChatGPT o Gemini, escribile algo que te interesa o te preocupa, y observá cómo responde. No hay forma de hacerlo mal cuando el objetivo es explorar. La curiosidad ya es tu habilidad más valiosa.",
    prompt: `Soy nueva en el uso de inteligencia artificial y quiero entender cómo funciona de manera simple y sin tecnicismos. Explicame qué es una IA generativa como si me lo explicaras a una persona curiosa pero sin experiencia técnica. Luego dime tres cosas concretas que podría hacer con una herramienta como esta en mi día a día como [escribe tu profesión u ocupación].`
  }
};

// ──────────────────────────────────────────────
// ESTADO
// ──────────────────────────────────────────────
let qActual = 0;
let respuestas = [];
let userData = {};
let perfilFinal = null;
let nombreUsuario = "";

// ──────────────────────────────────────────────
// NAVEGACIÓN
// ──────────────────────────────────────────────
function irA(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const targetScreen = document.getElementById(id);
  targetScreen.classList.add("active");
  
  // Hace scroll suave solo hacia el contenedor del quiz, sin ir al techo
  targetScreen.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

const SHEET_URL = "https://script.google.com/macros/s/AKfycbwjpjie-ig1fRr3Z6UHc3wwIJEzWRMjzPeUaAf-EVmJWdCG_waYTcd56N9YWqn-rftL/exec";

function enviarASheet(payload) {
  fetch(SHEET_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).catch(() => { });
}

function validarDatos() {
  const n = document.getElementById("f-nombre").value.trim();
  const p = document.getElementById("f-pais").value.trim();
  const e = document.getElementById("f-email").value.trim();
  const err = document.getElementById("datos-error");
  if (!n || !p || !e || !e.includes("@")) {
    err.style.display = "block";
    return;
  }
  err.style.display = "none";
  userData = { nombre: n, pais: p, email: e, tel: document.getElementById("f-tel").value.trim() };
  nombreUsuario = n.split(" ")[0];
  qActual = 0;
  respuestas = [];
  renderPregunta();
  irA("screen-quiz");
}

// ──────────────────────────────────────────────
// QUIZ
// ──────────────────────────────────────────────
function renderPregunta() {
  const q = preguntas[qActual];
  const pct = Math.round(((qActual + 1) / preguntas.length) * 100);
  document.getElementById("prog-label").textContent = `Pregunta ${qActual + 1} de ${preguntas.length}`;
  document.getElementById("prog-num").textContent = `${qActual + 1} / ${preguntas.length}`;
  document.getElementById("prog-fill").style.width = pct + "%";

  const sel = respuestas[qActual] ?? null;
  let html = `
    <p class="q-num">Pregunta ${qActual + 1}</p>
    <p class="q-text">${q.texto}</p>
    <div class="opciones">`;

  const letras = ["A", "B", "C", "D"];

  q.opciones.forEach((op, i) => {
    const isSel = sel === i ? " selected" : "";
    // Calculamos el delay: 0.1s para la A, 0.2s para la B, etc.
    const delayS = (i + 1) * 0.12;

    html += `<button class="opcion${isSel}" style="--delay: ${delayS}s;" onclick="seleccionar(${i})">
      <span class="opcion-letter">${letras[i]}</span>
      <span class="opcion-text">${op.texto}</span>
    </button>`;
  });

  html += `</div>
    <div class="q-nav">
      ${qActual > 0 ? `<button class="btn secondary" onclick="anterior()">← Anterior</button>` : ""}
      <p style="font-size:12px;color:var(--mu);text-align:center;margin:auto;padding-top:4px;">
        ${sel !== null ? "✦ Cargando siguiente…" : "Selecciona una opción para continuar"}
      </p>
    </div>`;

  document.getElementById("q-container").innerHTML = html;
}

function seleccionar(i) {
  respuestas[qActual] = i;

  const botones = document.querySelectorAll(".opciones .opcion");

  botones.forEach((btn, index) => {
    btn.style.animation = "none";

    if (index === i) {
      btn.classList.add("selected");
    } else {
      btn.classList.add("fade-out");
    }
  });

  setTimeout(() => {
    const container = document.getElementById("q-container");
    if (container) container.classList.add("anim-salir");

    setTimeout(() => {
      siguiente();
    }, 250);
  }, 1000);
}

function siguiente() {
  if (respuestas[qActual] === undefined) return;

  if (qActual < preguntas.length - 1) {
    qActual++;

    renderPregunta();
    
    const container = document.getElementById("q-container");
    if (container) {
      // Hace scroll suave hacia la pregunta en lugar de subir al techo
      container.scrollIntoView({ behavior: "smooth", block: "nearest" });
      
      container.classList.remove("anim-salir");
      container.classList.add("anim-entrar");

      container.offsetHeight;

      container.classList.remove("anim-entrar");
    }
  } else {
    mostrarResultado();
  }
}

function anterior() {
  if (qActual > 0) { 
    qActual--; 
    renderPregunta(); 
    
    const container = document.getElementById("q-container");
    if (container) {
      // Hace scroll suave hacia la pregunta anterior
      container.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }
}

// ──────────────────────────────────────────────
// RESULTADO
// ──────────────────────────────────────────────
function calcularPerfil() {
  const votos = { AC: 0, MC: 0, MP: 0, ACU: 0 };
  respuestas.forEach((ri, qi) => {
    const p = preguntas[qi].opciones[ri].perfil;
    votos[p]++;
  });
  return Object.entries(votos).sort((a, b) => b[1] - a[1])[0][0];
}

function mostrarResultado() {
  perfilFinal = calcularPerfil();
  const p = perfiles[perfilFinal];

  // Enviar a Google Sheets
  enviarASheet({
    nombre: userData.nombre,
    pais: userData.pais,
    email: userData.email,
    tel: userData.tel || "",
    perfil: p.nombre,
    emoji: p.emoji
  });

  document.getElementById("res-nombre-perfil").textContent = p.emoji + " " + p.nombre;
  document.getElementById("res-nombre-perfil").style.color = p.color;
  document.getElementById("res-tagline").textContent = p.tagline;

  const card = document.getElementById("res-card");
  card.style.background = p.colorLight;
  card.style.borderLeft = `4px solid ${p.color}`;

  const inner = document.getElementById("res-inner");
  inner.style.color = "#2d2d2d";

  document.getElementById("res-desc").innerHTML =
    `<strong style="color:${p.color}">${nombreUsuario}, ${p.desc.split(".")[0]}.</strong> ${p.desc.split(".").slice(1).join(".")}`;

  const traits = document.getElementById("res-traits");
  traits.innerHTML = p.traits.map(t =>
    `<span class="trait" style="background:${p.color}20;color:${p.color}">${t}</span>`
  ).join("");

  document.getElementById("res-tools").textContent = p.tools;
  document.getElementById("res-tools").parentElement.style.color = p.color;
  document.getElementById("res-quote").textContent = p.quote;
  document.getElementById("res-quote").style.color = p.color;
  document.getElementById("res-quote").style.borderLeft = `2px solid ${p.color}40`;
  document.getElementById("res-quote").style.paddingLeft = "1rem";

  // Tip + Prompt
  const tipSection = document.getElementById("res-tip-section");
  tipSection.style.background = p.colorLight;
  tipSection.style.borderColor = p.color + "40";

  const tipIcon = document.getElementById("res-tip-icon");
  tipIcon.style.background = p.color + "18";
  tipIcon.textContent = "💡";

  document.getElementById("res-tip-label").textContent = "Tu tip SINERG.ia";
  document.getElementById("res-tip-label").style.color = p.color;
  document.getElementById("res-tip-title").textContent = "Por dónde empezar, " + nombreUsuario;
  document.getElementById("res-tip-title").style.color = p.color;
  document.getElementById("res-tip-text").textContent = p.tip;

  // Formatear prompt resaltando los corchetes
  const promptEl = document.getElementById("res-prompt-text");
  promptEl.innerHTML = p.prompt.replace(/\[([^\]]+)\]/g, '<em>[$1]</em>');

  irA("screen-resultado");
  generarImagenShare(p);
}

function copiarPrompt() {
  const p = perfiles[perfilFinal];
  navigator.clipboard.writeText(p.prompt).then(() => {
    const btn = document.getElementById("copy-btn");
    btn.classList.add("copied");
    btn.innerHTML = "<span>✓</span> ¡Copiado!";
    setTimeout(() => {
      btn.classList.remove("copied");
      btn.innerHTML = "<span>📋</span> Copiar prompt";
    }, 2500);
  });
}

// ──────────────────────────────────────────────
// CANVAS SHARE (Story 9:16)
// ──────────────────────────────────────────────
function generarImagenShare(p) {
  const canvas = document.getElementById("share-canvas");
  const ctx = canvas.getContext("2d");
  const W = 1080, H = 1920;

  // Fondo degradado
  const grad = ctx.createLinearGradient(0, 0, W, H);
  if (perfilFinal === "AC") {
    grad.addColorStop(0, "#f0ecfc"); grad.addColorStop(0.5, "#fce8f6"); grad.addColorStop(1, "#fbdad2");
  } else if (perfilFinal === "MC") {
    grad.addColorStop(0, "#e8e4f5"); grad.addColorStop(0.5, "#d8d0f0"); grad.addColorStop(1, "#e8e4f5");
  } else if (perfilFinal === "MP") {
    grad.addColorStop(0, "#f0ecfc"); grad.addColorStop(0.5, "#e8e0f8"); grad.addColorStop(1, "#f7c4e9");
  } else {
    grad.addColorStop(0, "#fce8f6"); grad.addColorStop(0.5, "#f8f0fc"); grad.addColorStop(1, "#fbdad2");
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Círculo decorativo fondo
  ctx.save();
  ctx.globalAlpha = 0.07;
  ctx.beginPath();
  ctx.arc(W * 0.85, H * 0.15, 420, 0, Math.PI * 2);
  ctx.fillStyle = p.color;
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.05;
  ctx.beginPath();
  ctx.arc(W * 0.1, H * 0.8, 320, 0, Math.PI * 2);
  ctx.fillStyle = p.color;
  ctx.fill();
  ctx.restore();

  // Diamante decorativo
  const drawDiamond = (cx, cy, size, alpha) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.moveTo(cx, cy - size);
    ctx.lineTo(cx + size * 0.6, cy);
    ctx.lineTo(cx, cy + size);
    ctx.lineTo(cx - size * 0.6, cy);
    ctx.closePath();
    const dg = ctx.createLinearGradient(cx - size, cy - size, cx + size, cy + size);
    dg.addColorStop(0, "#928ac2"); dg.addColorStop(0.5, "#e8b4da"); dg.addColorStop(1, "#fbdad2");
    ctx.fillStyle = dg;
    ctx.fill();
    ctx.restore();
  };
  drawDiamond(W / 2, 280, 80, 0.7);
  drawDiamond(120, 420, 28, 0.3);
  drawDiamond(W - 130, 500, 22, 0.25);

  // Logo SINERG.ia
  ctx.fillStyle = "#665a9c";
  ctx.font = "600 52px \"Source Serif 4\", Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("SINERG", W / 2 - 55, 420);
  ctx.fillStyle = "#928ac2";
  ctx.font = "700 64px \"Dancing Script\", cursive";
  ctx.fillText(".ia", W / 2 + 95, 425);

  // Etiqueta QUIZ
  ctx.fillStyle = p.color + "22";
  roundRect(ctx, W / 2 - 130, 455, 260, 52, 26);
  ctx.fillStyle = p.color;
  ctx.font = "500 26px Inter, system-ui, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("MI PERFIL DE IA", W / 2, 488);
  ctx.letterSpacing = "0px";

  // Nombre usuario
  ctx.fillStyle = "#2d2d2d";
  ctx.font = "300 44px \"Source Serif 4\", Georgia, serif";
  ctx.fillText(nombreUsuario + ",", W / 2, 600);

  // Nombre perfil (grande)
  ctx.font = "700 130px \"Dancing Script\", cursive";
  ctx.fillStyle = p.color;
  // Si el nombre es muy largo, reducir fuente
  let fn = 130;
  while (ctx.measureText(p.nombre).width > W - 120 && fn > 70) {
    fn -= 6;
    ctx.font = `700 ${fn}px "Dancing Script", cursive`;
  }
  ctx.fillText(p.nombre, W / 2, 730);

  // Emoji
  ctx.font = "100px serif";
  ctx.fillText(p.emoji, W / 2, 860);

  // Línea divisoria
  ctx.strokeStyle = p.color + "40";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(120, 910); ctx.lineTo(W - 120, 910);
  ctx.stroke();

  // Tagline
  ctx.fillStyle = "#4a4460";
  ctx.font = "italic 300 46px \"Source Serif 4\", Georgia, serif";
  wrapText(ctx, `"${p.tagline}"`, W / 2, 990, W - 200, 62);

  // Traits
  const traits = p.traits;
  const traitY = 1220;
  const traitH = 64;
  let tx = 120;
  ctx.font = "500 28px Inter, system-ui, sans-serif";
  traits.forEach(t => {
    const tw = ctx.measureText(t).width + 48;
    ctx.fillStyle = p.color + "18";
    roundRect(ctx, tx, traitY, tw, traitH, 32);
    ctx.fillStyle = p.color;
    ctx.textAlign = "left";
    ctx.fillText(t, tx + 24, traitY + 41);
    ctx.textAlign = "center";
    tx += tw + 18;
  });

  // Descripción (primeras líneas)
  ctx.fillStyle = "#4a4460";
  ctx.font = "300 36px \"Source Serif 4\", Georgia, serif";
  const shortDesc = p.desc.split(".")[0] + ".";
  wrapText(ctx, shortDesc, W / 2, 1360, W - 180, 52);

  // Separador
  ctx.strokeStyle = p.color + "30";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(120, 1580); ctx.lineTo(W - 120, 1580);
  ctx.stroke();

  // CTA
  ctx.fillStyle = p.color;
  ctx.font = "600 34px Inter, system-ui, sans-serif";
  ctx.fillText("Descubrí tu perfil en", W / 2, 1640);
  ctx.font = "700 46px \"Dancing Script\", cursive";
  ctx.fillText("@lasinerg.ia", W / 2, 1700);

  ctx.fillStyle = "#9a93b8";
  ctx.font = "300 30px Inter, system-ui, sans-serif";
  ctx.fillText("lasinergia.ia@gmail.com", W / 2, 1780);

  // Estrellas decorativas
  ctx.fillStyle = p.color;
  ctx.font = "40px serif";
  ctx.fillText("✦ ✦ ✦", W / 2, 1860);

  // Mostrar preview
  const preview = document.getElementById("share-img-preview");
  preview.src = canvas.toDataURL("image/png");
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

function wrapText(ctx, text, x, y, maxW, lineH) {
  const words = text.split(" ");
  let line = "";
  let cy = y;
  words.forEach((w, i) => {
    const test = line + w + " ";
    if (ctx.measureText(test).width > maxW && i > 0) {
      ctx.fillText(line.trim(), x, cy);
      line = w + " "; cy += lineH;
    } else { line = test; }
  });
  ctx.fillText(line.trim(), x, cy);
}

function descargarImagen() {
  const canvas = document.getElementById("share-canvas");
  const link = document.createElement("a");
  const perfil = perfiles[perfilFinal];
  link.download = `mi-perfil-sinergia-${perfil.nombre.toLowerCase().replace(/ /g, "-")}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function abrirInstagram() {
  descargarImagen();
  setTimeout(() => {
    window.open("https://www.instagram.com/lasinerg.ia/", "_blank");
  }, 800);
}

function reiniciar() {
  qActual = 0; respuestas = []; userData = {}; perfilFinal = null; nombreUsuario = "";
  document.getElementById("f-nombre").value = "";
  document.getElementById("f-pais").value = "";
  document.getElementById("f-email").value = "";
  document.getElementById("f-tel").value = "";
  irA("screen-intro");
}

/* Deshabilitar Click Derecho en Imagenes */
document.addEventListener('DOMContentLoaded', () => {
  const imagenes = document.querySelectorAll('img');
  imagenes.forEach(img => {
    img.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  });
});

// ──────────────────────────────────────────────
//        PAGINA DE ACTIVIDADES
// ──────────────────────────────────────────────

// Toggle Episode Func
function toggleEpisode(btn) {
  const item = btn.closest('.episode-item');
  if (item.classList.contains('disabled')) return;
  const wasOpen = item.classList.contains('open');
  item.closest('.episode-list').querySelectorAll('.episode-item.open').forEach(el => el.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

// Copy Prompt Func
function copyPrompt(id, btn) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.textContent;
    btn.textContent = "¡Copiado!";
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('copied');
    }, 1800);
  });
}

// Lock Episode Func

document.addEventListener('DOMContentLoaded', () => {
  checkEpisodeLocks();
});

function checkEpisodeLocks() {
  const now = new Date();

  document.querySelectorAll('.episode-item[data-release]').forEach((ep) => {
    const releaseDateStr = ep.getAttribute('data-release');
    if (!releaseDateStr) return;

    // Convertir a objeto Date
    const releaseDate = new Date(releaseDateStr);

    // Validación: Comprobar si la fecha es inválida
    if (isNaN(releaseDate.getTime())) {
      console.error('Fecha inválida en el elemento:', releaseDateStr, ep);
      return;
    }

    const dateTextSpan = ep.querySelector('.release-date-text');
    const badge = ep.querySelector('.badge-status');

    if (now >= releaseDate) {
      // YA SE CUMPLIÓ O SOBREPASÓ LA FECHA -> Desbloquear
      ep.classList.remove('locked');

      if (badge) {
        badge.textContent = '⌄';
        badge.style.color = '#2d2d2d';
      }
    } else {
      // AÚN NO LLEGA LA FECHA -> Bloquear
      badge.textContent = '🔒';
      ep.classList.add('locked');

      if (dateTextSpan) {
        const options = {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        };
        dateTextSpan.textContent = releaseDate.toLocaleDateString('es-ES', options);
      }
    }
  });
}

// ...