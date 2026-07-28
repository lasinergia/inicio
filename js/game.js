const GOOGLE_SCRIPT_URL = "TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI";

class CableMatchingGame {
  constructor(config) {
    this.episodeId = config.episodeId || "T1E4";
    this.pairs = config.pairs || [];
    
    // Asignar el contenedor específico de este juego
    this.container = document.getElementById(config.containerId) || document;

    this.userData = { nombre: "", pais: "", correo: "" };
    this.connections = [];
    this.selectedQCard = null;
    this.attempts = 0;
    this.matches = 0;
    this.timerSeconds = 0;
    this.timerInterval = null;

    // Estado Drag & Drop
    this.isDragging = false;
    this.hasMovedDistance = false;
    this.pointerStartX = 0;
    this.pointerStartY = 0;
    this.activeDragDot = null;
    this.activeDragQuestionCard = null;

    // Buscar elementos EXCLUSIVAMENTE dentro del contenedor de este episodio
    this.regScreen = this.container.querySelector(".reg-screen");
    this.gameScreen = this.container.querySelector(".game-screen");
    this.regForm = this.container.querySelector(".reg-form");
    
    this.boardEl = this.container.querySelector(".cable-board");
    this.svgEl = this.container.querySelector(".cable-svg-layer");
    this.tempCable = this.container.querySelector(".temp-cable");
    this.colQ = this.container.querySelector(".col-questions");
    this.colA = this.container.querySelector(".col-answers");
    this.modalEl = this.container.querySelector(".cable-modal-overlay");

    this.init();
  }

  init() {
    if (this.regForm) {
      // e.preventDefault() evita el refresco de pantalla al enviar el form
      this.regForm.addEventListener("submit", (e) => this.handleRegistration(e));
    }

    const btnRestart = this.container.querySelector(".btn-restart");
    if (btnRestart) {
      btnRestart.addEventListener("click", () => this.restartGame());
    }

    window.addEventListener("pointermove", (e) => this.onPointerMove(e));
    window.addEventListener("pointerup", (e) => this.onPointerUp(e));

    window.addEventListener("resize", () => this.updateAllCablePositions());
    window.addEventListener("scroll", () => this.updateAllCablePositions());
  }

  handleRegistration(e) {
    // ⚠️ CLAVE: Evita la recarga de página por envío de formulario HTML
    e.preventDefault();

    const nameInput = this.container.querySelector(".user-name");
    const countryInput = this.container.querySelector(".user-country");
    const emailInput = this.container.querySelector(".user-email");

    const nombre = nameInput ? nameInput.value.trim() : "";
    const pais = countryInput ? countryInput.value.trim() : "";
    const correo = emailInput ? emailInput.value.trim() : "";

    if (!nombre || !pais) return;

    this.userData = { nombre, pais, correo: correo || "No especificado" };
    
    const playerDisplay = this.container.querySelector(".player-display");
    if (playerDisplay) playerDisplay.textContent = nombre;

    this.regScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    // Forzar ajuste de posiciones SVG
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 50);

    this.startGame();
  }

  startGame() {
    this.svgEl.querySelectorAll("path:not(.temp-cable)").forEach(p => p.remove());
    this.colQ.innerHTML = "";
    this.colA.innerHTML = "";
    this.connections = [];
    this.selectedQCard = null;
    this.attempts = 0;
    this.matches = 0;
    this.timerSeconds = 0;
    this.isDragging = false;

    const attemptsEl = this.container.querySelector(".cable-attempts");
    const matchesEl = this.container.querySelector(".cable-matches");
    const timerEl = this.container.querySelector(".cable-timer");

    if (attemptsEl) attemptsEl.textContent = "0";
    if (matchesEl) matchesEl.textContent = `0 / ${this.pairs.length}`;
    if (timerEl) timerEl.textContent = "00:00";

    this.modalEl.classList.remove("active");

    clearInterval(this.timerInterval);
    this.startTimer();

    const shuffledQuestions = this.shuffle([...this.pairs]);
    const shuffledAnswers = this.shuffle([...this.pairs]);

    shuffledQuestions.forEach((pair) => {
      this.colQ.appendChild(this.createCard(pair.q, pair.id, "q"));
    });

    shuffledAnswers.forEach((pair) => {
      this.colA.appendChild(this.createCard(pair.a, pair.id, "a", pair.ai));
    });
  }

  createCard(text, pairId, type, aiTag) {
    const card = document.createElement("div");
    card.className = "cable-card";
    card.dataset.id = pairId;
    card.dataset.type = type;

    const pillHtml = (type === "a" && aiTag) ? `<span class="ai-pill">${aiTag}</span>` : "";
    card.innerHTML = `${pillHtml}<span>${text}</span><div class="port-dot"></div>`;

    const dot = card.querySelector(".port-dot");

    if (type === "q") {
      card.addEventListener("pointerdown", (e) => this.onPointerDownQuestion(e, card, dot));
    } else {
      card.addEventListener("pointerdown", (e) => this.onPointerDownAnswer(e, card));
    }

    return card;
  }

  onPointerDownQuestion(e, card, dot) {
    if (card.classList.contains("matched")) return;

    this.isDragging = true;
    this.hasMovedDistance = false;
    this.pointerStartX = e.clientX;
    this.pointerStartY = e.clientY;
    this.activeDragQuestionCard = card;
    this.activeDragDot = dot;

    const startPos = this.getDotCenter(dot);
    this.updateBezierPath(this.tempCable, startPos.x, startPos.y, startPos.x, startPos.y);
  }

  onPointerDownAnswer(e, answerCard) {
    if (answerCard.classList.contains("matched")) return;

    if (this.selectedQCard && !this.isDragging) {
      this.attemptConnection(this.selectedQCard, answerCard);
    }
  }

  onPointerMove(e) {
    if (!this.isDragging || !this.activeDragDot) return;

    const dist = Math.hypot(e.clientX - this.pointerStartX, e.clientY - this.pointerStartY);
    if (dist > 6) {
      this.hasMovedDistance = true;
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

  onPointerUp(e) {
    if (!this.isDragging) return;

    this.tempCable.style.display = "none";

    if (!this.hasMovedDistance) {
      if (this.selectedQCard) {
        this.selectedQCard.classList.remove("selected");
      }
      
      if (this.selectedQCard === this.activeDragQuestionCard) {
        this.selectedQCard = null;
      } else {
        this.selectedQCard = this.activeDragQuestionCard;
        this.selectedQCard.classList.add("selected");
      }
    } else {
      const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
      const answerCard = dropTarget ? dropTarget.closest('.col-answers .cable-card') : null;

      if (answerCard && !answerCard.classList.contains("matched")) {
        this.attemptConnection(this.activeDragQuestionCard, answerCard);
      }
    }

    this.isDragging = false;
    this.activeDragDot = null;
    this.activeDragQuestionCard = null;
  }

  attemptConnection(qCard, aCard) {
    this.attempts++;
    const attemptsEl = this.container.querySelector(".cable-attempts");
    if (attemptsEl) attemptsEl.textContent = this.attempts;

    const qId = parseInt(qCard.dataset.id);
    const aId = parseInt(aCard.dataset.id);

    const qDot = qCard.querySelector(".port-dot");
    const aDot = aCard.querySelector(".port-dot");

    if (qId === aId) {
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
      const matchesEl = this.container.querySelector(".cable-matches");
      if (matchesEl) matchesEl.textContent = `${this.matches} / ${this.pairs.length}`;
      this.selectedQCard = null;

      if (this.matches === this.pairs.length) {
        this.endGame();
      }
    } else {
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
      const timerEl = this.container.querySelector(".cable-timer");
      if (timerEl) timerEl.textContent = `${m}:${s}`;
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
    const timeFormatted = `${m}:${s}`;

    const scoreEl = this.container.querySelector(".final-score");
    const accuracyEl = this.container.querySelector(".final-accuracy");
    const timeEl = this.container.querySelector(".final-time");
    const attemptsEl = this.container.querySelector(".final-attempts");

    if (scoreEl) scoreEl.textContent = `${score} PTS`;
    if (accuracyEl) accuracyEl.textContent = `${accuracy}%`;
    if (timeEl) timeEl.textContent = timeFormatted;
    if (attemptsEl) attemptsEl.textContent = this.attempts;

    setTimeout(() => this.modalEl.classList.add("active"), 400);

    this.sendToGoogleSheets({
      episodio: this.episodeId,
      nombre: this.userData.nombre,
      pais: this.userData.pais,
      correo: this.userData.correo,
      puntaje: score,
      precision: `${accuracy}%`,
      tiempo: timeFormatted,
      intentos: this.attempts,
      fecha: new Date().toLocaleString()
    });
  }

  sendToGoogleSheets(payload) {
    const statusText = this.container.querySelector(".sheets-status-text");

    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("TU_URL")) {
      if (statusText) statusText.textContent = "¡Juego completado con éxito!";
      return;
    }

    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    .then(() => {
      if (statusText) statusText.textContent = "¡Resultados guardados correctamente!";
    })
    .catch(() => {
      if (statusText) statusText.textContent = "¡Juego completado!";
    });
  }

  restartGame() {
    this.startGame();
  }
}