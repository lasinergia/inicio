// ==========================================
// PREGUNTAS Y RESPUESTAS (CONFIGURABLE)
// ==========================================
const CABLE_PAIRS = [
  { id: 1, q: "🧠 Algoritmo de IA", a: "Instrucciones lógicas para procesar datos." },
  { id: 2, q: "🎙️ Podcast Sinerg.ia", a: "Espacio de divulgación creado por Yani y Mari." },
  { id: 3, q: "🤖 Prompting", a: "Técnica para darle indicaciones precisas a la IA." },
  { id: 4, q: "🌐 GitHub Pages", a: "Servidor gratuito donde se aloja esta página." },
  { id: 5, q: "🔮 Alucinación", a: "Respuesta inventada que la IA afirma con seguridad." }
];

class CableMatchingGame {
  constructor(pairs) {
    this.pairs = pairs;
    this.connections = []; // Almacena cables guardados
    this.selectedQCard = null; // Pregunta seleccionada por clic
    this.attempts = 0;
    this.matches = 0;
    this.timerSeconds = 0;
    this.timerInterval = null;

    // Estado para Drag & Drop y diferenciación de Clics
    this.isDragging = false;
    this.hasMovedDistance = false;
    this.pointerStartX = 0;
    this.pointerStartY = 0;
    this.activeDragDot = null;
    this.activeDragQuestionCard = null;

    // DOM Elements
    this.boardEl = document.getElementById("cable-board");
    this.svgEl = document.getElementById("cable-svg");
    this.tempCable = document.getElementById("temp-cable");
    this.colQ = document.getElementById("col-questions");
    this.colA = document.getElementById("col-answers");
    this.modalEl = document.getElementById("cable-modal");

    this.init();
  }

  init() {
    document.getElementById("btn-restart").addEventListener("click", () => this.restartGame());

    // Eventos globales de puntero (Ratón y Pantallas Táctiles unificados)
    window.addEventListener("pointermove", (e) => this.onPointerMove(e));
    window.addEventListener("pointerup", (e) => this.onPointerUp(e));

    // Persistencia adaptativa al redimensionar o hacer scroll
    window.addEventListener("resize", () => this.updateAllCablePositions());
    window.addEventListener("scroll", () => this.updateAllCablePositions());

    this.startGame();
  }

  startGame() {
    // Limpiar capa SVG conservando la guía temporal
    this.svgEl.querySelectorAll("path:not(#temp-cable)").forEach(p => p.remove());
    this.colQ.innerHTML = "";
    this.colA.innerHTML = "";
    this.connections = [];
    this.selectedQCard = null;
    this.attempts = 0;
    this.matches = 0;
    this.timerSeconds = 0;
    this.isDragging = false;

    document.getElementById("cable-attempts").textContent = "0";
    document.getElementById("cable-matches").textContent = `0 / ${this.pairs.length}`;
    document.getElementById("cable-timer").textContent = "00:00";
    this.modalEl.classList.remove("active");

    clearInterval(this.timerInterval);
    this.startTimer();

    // ── ALEATORIZACIÓN DE AMBAS COLUMNAS ──
    const shuffledQuestions = this.shuffle([...this.pairs]);
    const shuffledAnswers = this.shuffle([...this.pairs]);

    // Renderizado
    shuffledQuestions.forEach((pair) => {
      this.colQ.appendChild(this.createCard(pair.q, pair.id, "q"));
    });

    shuffledAnswers.forEach((pair) => {
      this.colA.appendChild(this.createCard(pair.a, pair.id, "a"));
    });
  }

  createCard(text, pairId, type) {
    const card = document.createElement("div");
    card.className = "cable-card";
    card.dataset.id = pairId;
    card.dataset.type = type;
    card.innerHTML = `<span>${text}</span><div class="port-dot"></div>`;

    const dot = card.querySelector(".port-dot");

    // Escuchador de eventos del puntero en las tarjetas de preguntas
    if (type === "q") {
      card.addEventListener("pointerdown", (e) => this.onPointerDownQuestion(e, card, dot));
    } else {
      card.addEventListener("pointerdown", (e) => this.onPointerDownAnswer(e, card));
    }

    return card;
  }

  // ── MANEJO EN PREGUNTAS (INICIO DRAG O PRE-SELECCIÓN CLIC) ──
  onPointerDownQuestion(e, card, dot) {
    if (card.classList.contains("matched")) return;

    this.isDragging = true;
    this.hasMovedDistance = false;
    this.pointerStartX = e.clientX;
    this.pointerStartY = e.clientY;
    this.activeDragQuestionCard = card;
    this.activeDragDot = dot;

    // Iniciar trazo temporal
    const startPos = this.getDotCenter(dot);
    this.updateBezierPath(this.tempCable, startPos.x, startPos.y, startPos.x, startPos.y);
  }

  // ── MANEJO EN RESPUESTAS (POR CLIC DIRECTO) ──
  onPointerDownAnswer(e, answerCard) {
    if (answerCard.classList.contains("matched")) return;

    // Si ya había una pregunta seleccionada por Clic
    if (this.selectedQCard && !this.isDragging) {
      this.attemptConnection(this.selectedQCard, answerCard);
    }
  }

  // ── ARRASTRE ACTIVO (MOVE) ──
  onPointerMove(e) {
    if (!this.isDragging || !this.activeDragDot) return;

    const dist = Math.hypot(e.clientX - this.pointerStartX, e.clientY - this.pointerStartY);
    if (dist > 6) {
      this.hasMovedDistance = true; // Se confirma que es un Arrastre (Drag) y no un Clic
      this.tempCable.style.display = "block";
    }

    if (this.hasMovedDistance) {
      const startPos = this.getDotCenter(this.activeDragDot);
      const boardRect = this.boardEl.getBoundingClientRect();

      const currentX = e.clientX - boardRect.left;
      const currentY = e.clientY - boardRect.top;

      this.updateBezierPath(this.tempCable, startPos.x, startPos.y, currentX, currentY);
    }
  }

  // ── SOLTAR O FINALIZAR CLIC (UP) ──
  onPointerUp(e) {
    if (!this.isDragging) return;

    this.tempCable.style.display = "none";

    if (!this.hasMovedDistance) {
      // ── FUE UN CLIC SIMPLE ──
      if (this.selectedQCard) {
        this.selectedQCard.classList.remove("selected");
      }
      
      if (this.selectedQCard === this.activeDragQuestionCard) {
        this.selectedQCard = null; // Deseleccionar si vuelve a tocar la misma
      } else {
        this.selectedQCard = this.activeDragQuestionCard;
        this.selectedQCard.classList.add("selected");
      }
    } else {
      // ── FUE UN DRAG & DROP ──
      const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
      const answerCard = dropTarget ? dropTarget.closest('#col-answers .cable-card') : null;

      if (answerCard && !answerCard.classList.contains("matched")) {
        this.attemptConnection(this.activeDragQuestionCard, answerCard);
      }
    }

    this.isDragging = false;
    this.activeDragDot = null;
    this.activeDragQuestionCard = null;
  }

  // ── LÓGICA DE CONEXIÓN Y VERIFICACIÓN ──
  attemptConnection(qCard, aCard) {
    this.attempts++;
    document.getElementById("cable-attempts").textContent = this.attempts;

    const qId = parseInt(qCard.dataset.id);
    const aId = parseInt(aCard.dataset.id);

    const qDot = qCard.querySelector(".port-dot");
    const aDot = aCard.querySelector(".port-dot");

    if (qId === aId) {
      // ── CORRECTO ──
      qCard.classList.remove("selected");
      qCard.classList.add("matched");
      aCard.classList.add("matched");

      const permanentPath = this.drawPermanentCable(qDot, aDot, "#22c55e");

      this.connections.push({
        qEl: qCard,
        aEl: aCard,
        pathEl: permanentPath
      });

      this.matches++;
      document.getElementById("cable-matches").textContent = `${this.matches} / ${this.pairs.length}`;
      this.selectedQCard = null;

      if (this.matches === this.pairs.length) {
        this.endGame();
      }
    } else {
      // ── INCORRECTO ──
      const errorPath = this.drawPermanentCable(qDot, aDot, "#ef4444");

      if (this.selectedQCard) {
        this.selectedQCard.classList.remove("selected");
        this.selectedQCard = null;
      }

      setTimeout(() => {
        if (errorPath) errorPath.remove();
      }, 500);
    }
  }

  // ── AUXILIARES DIBUJO BEZIER ──
  getDotCenter(dotEl) {
    const boardRect = this.boardEl.getBoundingClientRect();
    const dotRect = dotEl.getBoundingClientRect();

    return {
      x: dotRect.left + dotRect.width / 2 - boardRect.left,
      y: dotRect.top + dotRect.height / 2 - boardRect.top
    };
  }

  updateBezierPath(pathEl, x1, y1, x2, y2) {
    const dx = Math.abs(x2 - x1) * 0.5;
    const dStr = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
    pathEl.setAttribute("d", dStr);
  }

  drawPermanentCable(dot1, dot2, color) {
    const p1 = this.getDotCenter(dot1);
    const p2 = this.getDotCenter(dot2);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", color);
    path.setAttribute("stroke-width", "4");
    path.setAttribute("stroke-linecap", "round");

    this.updateBezierPath(path, p1.x, p1.y, p2.x, p2.y);
    this.svgEl.appendChild(path);
    return path;
  }

  updateAllCablePositions() {
    this.connections.forEach(conn => {
      const dot1 = conn.qEl.querySelector(".port-dot");
      const dot2 = conn.aEl.querySelector(".port-dot");

      const p1 = this.getDotCenter(dot1);
      const p2 = this.getDotCenter(dot2);

      this.updateBezierPath(conn.pathEl, p1.x, p1.y, p2.x, p2.y);
    });
  }

  shuffle(arr) {
    let array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timerSeconds++;
      const m = String(Math.floor(this.timerSeconds / 60)).padStart(2, "0");
      const s = String(this.timerSeconds % 60).padStart(2, "0");
      document.getElementById("cable-timer").textContent = `${m}:${s}`;
    }, 1000);
  }

  endGame() {
    clearInterval(this.timerInterval);

    const total = this.pairs.length;
    const accuracy = Math.round((total / this.attempts) * 100);
    const extraAttempts = Math.max(0, this.attempts - total);
    
    const score = Math.max(100, 1000 - (extraAttempts * 50) - (this.timerSeconds * 2));

    const m = String(Math.floor(this.timerSeconds / 60)).padStart(2, "0");
    const s = String(this.timerSeconds % 60).padStart(2, "0");

    document.getElementById("final-score").textContent = `${score} PTS`;
    document.getElementById("final-accuracy").textContent = `${accuracy}%`;
    document.getElementById("final-time").textContent = `${m}:${s}`;
    document.getElementById("final-attempts").textContent = this.attempts;

    setTimeout(() => this.modalEl.classList.add("active"), 400);
  }

  restartGame() {
    this.startGame();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CableMatchingGame(CABLE_PAIRS);
});