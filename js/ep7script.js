/* ============================================
   SINERG.ia — ¿Quién creó qué?
   Datos de los 8 casos
   ============================================ */
const CASES = [
  {
    label: "Caso 01",
    title: "El primer resultado",
    scenario: `<p>Sofía escribe: <strong>“Crea una ilustración de un gato amarillo tomando café.”</strong></p>
                <p>La IA genera cuatro imágenes. Sofía escoge la primera, la descarga y la publica sin modificarla diciendo: <strong>“Esta ilustración la hice yo.”</strong></p>`,
    prompt: "¿Cómo describirías mejor este proceso?",
    options: [
      { text: "🧠 Creación humana — la idea fue de Sofía, así que toda la imagen es suya.", correct: false },
      { text: "🤝 Creación híbrida — Sofía y la IA aportaron exactamente lo mismo.", correct: false },
      { text: "🤖 Predomina la generación de IA — hubo una idea y una selección humana, pero muy poca intervención sobre el resultado final.", correct: true }
    ],
    verdict: `<p>La idea humana importa, pero no necesariamente convierte automáticamente todo el resultado generado en una obra humana.</p>`,
    note: "La pregunta clave es: ¿qué decisiones creativas humanas existen en la pieza final?"
  },
  {
    label: "Caso 02",
    title: "Muchas manos en una sola obra",
    scenario: `<p>Valentina dibuja un personaje desde cero. Después: utiliza IA para explorar posibles fondos, escoge uno, redibuja varias partes, cambia la composición, modifica colores, agrega texturas propias y corrige luces y sombras.</p>`,
    prompt: "¿Qué ocurrió aquí?",
    options: [
      { text: "🤖 Todo lo hizo la IA.", correct: false },
      { text: "🤝 Existe una creación híbrida con un aporte humano importante.", correct: true },
      { text: "🧠 La IA no participó realmente porque Valentina editó el resultado.", correct: false }
    ],
    verdict: `<p>Usar IA no elimina automáticamente la creatividad humana. Aquí existen decisiones, modificaciones y elementos creados directamente por la ilustradora.</p>`,
    note: "✦ Por eso también importa guardar bocetos, versiones y archivos del proceso."
  },
  {
    label: "Caso 03",
    title: "“Solo las subí un momento”",
    scenario: `<p>Una agencia recibe fotografías privadas de un cliente. Uno de los diseñadores las sube a una herramienta de IA para generar una campaña. No revisó qué hace la plataforma con los archivos, si utiliza esos datos para entrenamiento, qué condiciones aceptó, ni pidió autorización al cliente.</p>`,
    prompt: "¿Cuál es el verdadero problema?",
    options: [
      { text: "🤖 Que utilizó inteligencia artificial.", correct: false },
      { text: "⚠️ Que utilizó información del cliente sin conocer las condiciones de la herramienta.", correct: true },
      { text: "🎨 Que las imágenes podrían quedar menos originales.", correct: false }
    ],
    verdict: `<p>El problema no es simplemente usar IA. Cuando trabajas con información de terceros también importan: privacidad, consentimiento, contratos y términos de uso.</p>`,
    note: ""
  },
  {
    label: "Caso 04",
    title: "“Hazlo exactamente como ella”",
    scenario: `<p>Tomás encuentra a una ilustradora que admira y escribe: <strong>“Genera esta imagen exactamente en el estilo de [artista viva]. Quiero que parezca una obra hecha por ella.”</strong></p>`,
    prompt: "¿Qué pensarías?",
    options: [
      { text: "✅ Si la herramienta lo permite, no hay nada más que analizar.", correct: false },
      { text: "⚠️ No todo se reduce a si técnicamente puede hacerse.", correct: true },
      { text: "❌ Mencionar cualquier referencia artística siempre es ilegal.", correct: false }
    ],
    verdict: `<p>Estilo, obra concreta, personaje y marca no son jurídicamente lo mismo. Por eso no todo uso de una referencia constituye automáticamente una infracción.</p>`,
    note: "Pero también existe una pregunta ética: ¿estás inspirándote… o intentando sustituir deliberadamente la identidad creativa de otra persona?"
  },
  {
    label: "Caso 05",
    title: "“Pero el prompt lo hice yo”",
    scenario: `<p>Daniel pasó dos horas perfeccionando un prompt. Incluyó referencias, composición, iluminación, intención, encuadre, materiales y detalles técnicos. Finalmente la IA genera la imagen perfecta.</p>`,
    prompt: "¿Eso significa automáticamente que Daniel es autor de absolutamente todo lo que aparece?",
    options: [
      { text: "✅ Sí, porque escribió el prompt.", correct: false },
      { text: "❌ No. El prompt no tiene ningún valor creativo.", correct: false },
      { text: "🧐 No necesariamente. Hay que analizar el control y aporte humano sobre el resultado.", correct: true }
    ],
    verdict: `<p>Un buen prompt puede requerir criterio, intención y muchísimo trabajo. Pero una cosa es reconocer ese aporte… y otra afirmar automáticamente que quien escribió el prompt creó cada elemento producido por el sistema.</p>`,
    note: "✦ No preguntes solamente quién presionó el botón. Pregunta quién aportó qué."
  },
  {
    label: "Caso 06",
    title: "La IA dejó una huella",
    scenario: `<p>Un detector encuentra una señal de procedencia compatible con contenido generado por IA dentro de un documento.</p>`,
    prompt: "¿Qué demuestra?",
    options: [
      { text: "🤖 Que la IA escribió absolutamente todo.", correct: false },
      { text: "🔎 Que probablemente una IA participó en el proceso.", correct: true },
      { text: "❌ Que la persona que publicó el documento mintió.", correct: false }
    ],
    verdict: `<p>Procedencia no es lo mismo que autoría. Una persona pudo escribir todo el documento y usar IA únicamente para corregir algunos párrafos. Otra pudo pedirle a la IA que escribiera prácticamente todo. En ambos casos existe participación de IA, pero el aporte humano es completamente diferente.</p>`,
    note: ""
  },
  {
    label: "Caso 07",
    title: "La campaña del cliente",
    scenario: `<p>Laura crea una campaña comercial. Primero desarrolla concepto, estrategia, dirección visual, referencias y textos principales. Después usa IA para explorar algunas fotografías, interviene los resultados y termina las piezas manualmente. Además revisó las condiciones comerciales de la herramienta y explicó al cliente cómo utilizó IA.</p>`,
    prompt: "¿Cómo describirías el proceso?",
    options: [
      { text: "🤖 Es una campaña hecha por IA.", correct: false },
      { text: "🤝 Es un proceso híbrido con dirección creativa humana.", correct: true },
      { text: "🧠 Si hubo IA, el trabajo humano deja de importar.", correct: false }
    ],
    verdict: `<p>La herramienta participó. La dirección creativa también. Y existe algo especialmente importante: transparencia. Utilizar IA profesionalmente no significa esconderla.</p>`,
    note: "Significa saber para qué la usaste, qué aportaste tú y qué puedes prometerle realmente a tu cliente."
  },
  {
    label: "Caso 08",
    title: "No encontramos la marca",
    scenario: `<p>Una imagen pasó por diferentes aplicaciones, redes sociales, capturas de pantalla y ediciones. Cuando alguien analiza el archivo final no encuentra metadatos ni una marca detectable de IA.</p>`,
    prompt: "¿Podemos concluir que nunca se utilizó inteligencia artificial?",
    options: [
      { text: "✅ Sí. Si no hay marca, no hubo IA.", correct: false },
      { text: "❌ No necesariamente.", correct: true },
      { text: "🤖 Significa que alguien borró la marca intencionalmente.", correct: false }
    ],
    verdict: `<p>La ausencia de una señal no cuenta toda la historia. Los metadatos pueden perderse al editar, exportar o compartir archivos. Algunas señales también pueden debilitarse con modificaciones profundas.</p>`,
    note: "Estas tecnologías pueden aportar información sobre la procedencia, pero no deberían convertirse automáticamente en una sentencia sobre quién creó una obra."
  }
];

const RESULTS = [
  {
    min: 0, max: 3,
    emoji: "🔍",
    title: "Detective en entrenamiento",
    body: `<p>La IA acaba de meterte en varios grises 😅. Y justamente de eso se trata.</p>
           <p>Cuando hablamos de creatividad e inteligencia artificial, pocas veces basta con preguntar “¿tiene IA?”. Empieza a mirar el proceso.</p>`
  },
  {
    min: 4, max: 6,
    emoji: "🧠",
    title: "Jurado creativo",
    body: `<p>Ya detectas algo fundamental: la herramienta utilizada no cuenta toda la historia.</p>
           <p>Estás mirando intención, decisiones, transformación, privacidad y contexto. Eso cambia completamente la conversación.</p>`
  },
  {
    min: 7, max: 8,
    emoji: "✦",
    title: "Detector de aporte humano",
    body: `<p>Ya entendiste el corazón de este episodio. No se trata de dividir el mundo entre “hecho por humanos” vs. “hecho por IA”.</p>
           <p>Se trata de aprender a preguntar: ¿quién aportó qué?</p>`
  }
];

/* ============================================
   Estado
   ============================================ */
let currentIndex = 0;
let score = 0;
let answered = false;

/* ============================================
   Referencias DOM
   ============================================ */
const screenIntro = document.getElementById("screen-intro");
const screenQuiz = document.getElementById("screen-quiz");
const screenResult = document.getElementById("screen-result");

const progressEl = document.getElementById("progress");
const caseLabelEl = document.getElementById("case-label");
const caseTitleEl = document.getElementById("case-title");
const caseScenarioEl = document.getElementById("case-scenario");
const casePromptEl = document.getElementById("case-prompt");
const optionsEl = document.getElementById("options");
const verdictEl = document.getElementById("verdict");
const verdictTextEl = document.getElementById("verdict-text");
const verdictNoteEl = document.getElementById("verdict-note");

const btnStart = document.getElementById("btn-start");
const btnNext = document.getElementById("btn-next");
const btnShare = document.getElementById("btn-share");
const btnRestart = document.getElementById("btn-restart");

const resultEmoji = document.getElementById("result-emoji");
const resultTitle = document.getElementById("result-title");
const resultScore = document.getElementById("result-score");
const resultBody = document.getElementById("result-body");

/* ============================================
   Navegación entre pantallas
   ============================================ */
function showScreen(el){
  [screenIntro, screenQuiz, screenResult].forEach(s => s.classList.remove("is-active"));
  el.classList.add("is-active");
  
  // Reemplazado window.scrollTo por scrollIntoView para anclar la cámara a la tarjeta
  el.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function buildProgress(){
  progressEl.innerHTML = "";
  CASES.forEach((_, i) => {
    const span = document.createElement("span");
    span.className = "pip";
    span.textContent = "◆";
    progressEl.appendChild(span);
  });
}

function updateProgress(){
  const pips = progressEl.querySelectorAll(".pip");
  pips.forEach((pip, i) => {
    pip.classList.toggle("is-done", i < currentIndex);
    pip.classList.toggle("is-current", i === currentIndex);
  });
}

/* ============================================
   Render de un caso
   ============================================ */
function renderCase(){
  answered = false;
  const c = CASES[currentIndex];

  caseLabelEl.textContent = `${c.label} ✦`;
  caseTitleEl.textContent = c.title;
  caseScenarioEl.innerHTML = c.scenario;
  casePromptEl.textContent = c.prompt;

  optionsEl.innerHTML = "";
  c.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opt.text;
    btn.addEventListener("click", () => selectOption(btn, opt));
    optionsEl.appendChild(btn);
  });

  verdictEl.classList.remove("is-visible");
  verdictTextEl.innerHTML = "";
  verdictNoteEl.textContent = "";

  updateProgress();
}

function selectOption(button, opt){
  if (answered) return;
  answered = true;

  if (opt.correct) score++;

  const allButtons = optionsEl.querySelectorAll(".option");
  allButtons.forEach(b => b.disabled = true);

  allButtons.forEach((b, i) => {
    const optionData = CASES[currentIndex].options[i];
    if (optionData.correct) {
      b.classList.add("is-correct");
    } else if (b === button) {
      b.classList.add("is-wrong");
    } else {
      b.classList.add("is-dim");
    }
  });

  const c = CASES[currentIndex];
  verdictTextEl.innerHTML = c.verdict;
  verdictNoteEl.textContent = c.note || "";
  verdictEl.classList.add("is-visible");

  btnNext.textContent = currentIndex === CASES.length - 1
    ? "Ver mi resultado →"
    : "Siguiente caso →";

  verdictEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ============================================
   Avanzar / resultado final
   ============================================ */
function goNext(){
  currentIndex++;
  if (currentIndex >= CASES.length) {
    showResult();
  } else {
    renderCase();
    // Asegura que al pasar al siguiente caso, el contenedor se encuadre suavemente
    screenQuiz.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function showResult(){
  const result = RESULTS.find(r => score >= r.min && score <= r.max);
  resultEmoji.textContent = result.emoji;
  resultTitle.textContent = result.title;
  resultScore.textContent = `${score} de ${CASES.length} respuestas`;
  resultBody.innerHTML = result.body;
  showScreen(screenResult);
}

function restart(){
  currentIndex = 0;
  score = 0;
  renderCase();
  showScreen(screenIntro); // Corregido para que vuelva al inicio limpiamente
}

/* ============================================
   Compartir
   ============================================ */
async function shareResult(){
  const result = RESULTS.find(r => score >= r.min && score <= r.max);
  const text = `${result.emoji} Soy "${result.title}" en el cuestionario de SINERG.ia — ¿Quién creó qué? Descúbrelo tú también.`;

  if (navigator.share) {
    try {
      await navigator.share({ text, url: window.location.href });
      return;
    } catch (e) { /* el usuario canceló, no pasa nada */ }
  }

  try {
    await navigator.clipboard.writeText(`${text} ${window.location.href}`);
    btnShare.textContent = "¡Copiado! ✦";
    setTimeout(() => { btnShare.textContent = "Compartir mi resultado"; }, 2200);
  } catch (e) {
    /* silencioso: el navegador no permitió copiar */
  }
}

/* ============================================
   Eventos
   ============================================ */
btnStart.addEventListener("click", () => {
  buildProgress();
  renderCase();
  showScreen(screenQuiz);
});

btnNext.addEventListener("click", goNext);
btnRestart.addEventListener("click", restart);
btnShare.addEventListener("click", shareResult);