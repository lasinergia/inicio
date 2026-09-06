(function () {
  var DATA = [
    {
      q: "Que una app diga “con IA” significa que automáticamente funciona mejor.",
      answer: false,
      explanation: "La palabra IA no demuestra por sí sola que un producto sea mejor. Lo importante es qué función cumple realmente y si la empresa puede respaldar lo que promete con evidencia. Reguladores como la FTC en Estados Unidos ya han abierto casos contra empresas por exagerar o inventar capacidades de IA que sus productos no tenían.",
      fun: "La etiqueta no hace la magia ✨ Primero: ¿qué hace realmente esa IA?"
    },
    {
      q: "Una IA puede analizar muchos datos y encontrar patrones, pero no puede garantizar qué hará un mercado mañana.",
      answer: true,
      explanation: "Puede ayudar a analizar información y hacer predicciones, pero una predicción no es una certeza. La IA tampoco puede anticipar todos los cambios inesperados de un mercado, ni sucesos imprevistos como una crisis o una noticia de último momento. Por eso organismos financieros advierten que ningún algoritmo garantiza retornos.",
      fun: "Análisis sí. Bola de cristal… todavía no. 🔮😂"
    },
    {
      q: "Si un curso enseña a ganar dinero con IA, puede garantizar que todos sus estudiantes obtendrán los mismos ingresos.",
      answer: false,
      explanation: "Un curso puede enseñar habilidades, herramientas o modelos de negocio. Lo que no puede garantizar es un resultado económico específico para todas las personas, porque los resultados dependen de cada quien: su esfuerzo, su mercado, su tiempo disponible. Autoridades de protección al consumidor han sancionado negocios que prometían ingresos iguales para todos usando IA como gancho.",
      fun: "Aprender una habilidad ≠ comprar un sueldo garantizado."
    },
    {
      q: "Blockchain y criptomoneda son exactamente lo mismo.",
      answer: false,
      explanation: "Blockchain es una tecnología de registro distribuido: un libro contable compartido donde la información queda registrada de forma que es muy difícil de alterar. Muchas criptomonedas funcionan usando blockchain, pero blockchain también puede utilizarse para otras aplicaciones que no tienen nada que ver con el dinero, como trazabilidad de productos, contratos o certificados.",
      fun: "Se conocen mucho, pero no son gemelas. 😌"
    },
    {
      q: "Una memecoin puede existir de verdad y aun así depender muchísimo de la especulación.",
      answer: true,
      explanation: "Que la moneda exista no garantiza su valor futuro. Las memecoins suelen nacer de un chiste, un meme o una tendencia viral, y su valor depende casi por completo de la demanda y la especulación del momento, no de un negocio o producto detrás. Eso las hace especialmente volátiles: pueden subir y bajar drásticamente en horas.",
      fun: "Real no significa estable. Y viral tampoco significa rentable. 👀"
    },
    {
      q: "Si un bot con IA automatiza una inversión, el riesgo desaparece.",
      answer: false,
      explanation: "Automatizar una operación cambia cómo se ejecuta, no elimina el riesgo. Un algoritmo también puede tomar decisiones que terminen produciendo pérdidas, sobre todo en momentos de alta volatilidad donde el mercado se mueve más rápido de lo que cualquier sistema puede reaccionar.",
      fun: "Automático ≠ seguro. Puede equivocarse rapidísimo también. 😭"
    },
    {
      q: "Si una app muestra que ganaste dinero, eso demuestra que podrás retirarlo.",
      answer: false,
      explanation: "Una pantalla puede mostrar un balance que parece real. Se han documentado estafas donde las personas ven supuestas ganancias creciendo día a día, pero cuando intentan retirar el dinero, la plataforma pone excusas, pide más pagos o simplemente desaparece.",
      fun: "Antes del screenshot para mejores amigos… intenta retirar. 😂"
    },
    {
      q: "Si una oportunidad te presiona con “entra ahora”, “últimos cupos” o “no te quedes por fuera”, vale la pena frenar y verificar.",
      answer: true,
      explanation: "Crear urgencia para que alguien actúe antes de investigar es una señal de alerta común en fraudes de inversión. Cuando algo es realmente sólido, sigue siendo una buena opción mañana también; la prisa está diseñada para que no tengas tiempo de comparar, preguntar o buscar opiniones.",
      fun: "Si no quieren darte tiempo para pensar… piensa el doble. 🔎"
    }
  ];

  var PROFILES = {
    low: {
      emoji: '🙈',
      title: 'Detector en calibración',
      desc: 'La palabra IA todavía logra distraerte un poquito. La próxima vez: pregunta, busca y verifica.',
      reflection: 'No pasa nada por dejarte llevar por el brillo de una promesa: le pasa a casi todo el mundo. La clave está en tomarte un minuto antes de decidir. La próxima vez que veas “con IA” en una oferta, pregúntate qué hace exactamente y quién respalda esa promesa. Y si tienes un amigo o familiar que se emociona rápido con este tipo de anuncios, cuéntale lo que aprendiste hoy: a veces basta una pregunta a tiempo para evitar un mal rato.'
    },
    mid: {
      emoji: '🔎',
      title: 'Radar activado',
      desc: 'Ya detectas varias señales de humo. Un poquito más de investigación y no te venden cualquier promesa.',
      reflection: 'Vas por buen camino: ya reconoces varias de las señales clásicas de una promesa exagerada. Sigue el hábito de investigar antes de creer, sobre todo cuando de por medio hay dinero o datos personales. Comparte esto con tu círculo cercano: entre más personas sepan detectar la presión, las palabras vacías y los “resultados garantizados”, menos gente cae en estas trampas.'
    },
    high: {
      emoji: '🌟',
      title: 'Detector SINERG.ia activado',
      desc: 'No te impresiona que diga IA: quieres saber qué hace, quién está detrás y cómo puedes comprobarlo.',
      reflection: '¡Felicitaciones! Ya piensas como alguien que entiende la tecnología en vez de dejarse deslumbrar por ella. Ese criterio es justo lo que necesitamos multiplicar. Conviértete en la persona de tu grupo que pregunta “¿y eso quién lo dice?” antes de reenviar o invertir en algo. Enseñar a verificar es tan valioso como saber verificar.'
    }
  };

  var root = document.getElementById('sng8-widget');

  // Registro
  var registerCard = root.querySelector('#sng8-register');
  var quizWrap = root.querySelector('#sng8-quiz-wrap');
  var inputName = root.querySelector('#sng8-input-name');
  var inputEmail = root.querySelector('#sng8-input-email');
  var inputCountry = root.querySelector('#sng8-input-country');
  var fieldName = root.querySelector('#sng8-field-name');
  var fieldEmail = root.querySelector('#sng8-field-email');
  var fieldCountry = root.querySelector('#sng8-field-country');
  var startBtn = root.querySelector('#sng8-start-btn');

  var user = { name: '', email: '', country: '' };

  // Quiz
  var qEl = root.querySelector('#sng8-question');
  var counterEl = root.querySelector('#sng8-counter');
  var progressEl = root.querySelector('#sng8-progress');
  var btnTrue = root.querySelector('#sng8-btn-true');
  var btnFalse = root.querySelector('#sng8-btn-false');
  var feedbackEl = root.querySelector('#sng8-feedback');
  var verdictEl = root.querySelector('#sng8-verdict');
  var explanationEl = root.querySelector('#sng8-explanation');
  var funEl = root.querySelector('#sng8-fun');
  var nextBtn = root.querySelector('#sng8-next');
  var quizArea = root.querySelector('#sng8-quiz-area');
  var resultArea = root.querySelector('#sng8-result');
  var restartBtn = root.querySelector('#sng8-restart');
  var downloadBtn = root.querySelector('#sng8-download');

  var current = 0;
  var score = 0;
  var answered = false;
  var currentProfileKey = 'low';

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function validateField(field, input, valid) {
    if (valid) {
      field.classList.remove('sng8-invalid');
    } else {
      field.classList.add('sng8-invalid');
    }
    return valid;
  }

  startBtn.addEventListener('click', function () {
    var nameVal = inputName.value.trim();
    var emailVal = inputEmail.value.trim();
    var countryVal = inputCountry.value.trim();

    var okName = validateField(fieldName, inputName, nameVal.length > 0);
    var okEmail = validateField(fieldEmail, inputEmail, isValidEmail(emailVal));
    var okCountry = validateField(fieldCountry, inputCountry, countryVal.length > 0);

    if (!(okName && okEmail && okCountry)) return;

    user.name = nameVal;
    user.email = emailVal;
    user.country = countryVal;

    registerCard.style.display = 'none';
    quizWrap.style.display = 'block';
    renderQuestion();
  });

  function renderQuestion() {
    answered = false;
    var item = DATA[current];
    qEl.textContent = item.q;
    counterEl.textContent = 'Pregunta ' + (current + 1) + ' de ' + DATA.length;
    progressEl.style.width = ((current) / DATA.length * 100) + '%';

    [btnTrue, btnFalse].forEach(function (b) {
      b.disabled = false;
      b.classList.remove('sng8-correct', 'sng8-incorrect');
    });
    feedbackEl.classList.remove('sng8-show', 'sng8-ok', 'sng8-bad');
    nextBtn.classList.remove('sng8-show');
  }

  function handleAnswer(chosen) {
    if (answered) return;
    answered = true;
    var item = DATA[current];
    var correct = (chosen === item.answer);
    if (correct) score++;

    var chosenBtn = chosen ? btnTrue : btnFalse;
    var otherBtn = chosen ? btnFalse : btnTrue;
    chosenBtn.classList.add(correct ? 'sng8-correct' : 'sng8-incorrect');
    if (!correct) {
      otherBtn.classList.add('sng8-correct');
    }
    btnTrue.disabled = true;
    btnFalse.disabled = true;

    verdictEl.textContent = correct ? '¡Correcto! ✅' : 'No exactamente ❌';
    explanationEl.textContent = item.explanation;
    funEl.textContent = item.fun;

    feedbackEl.classList.add('sng8-show', correct ? 'sng8-ok' : 'sng8-bad');
    nextBtn.classList.add('sng8-show');
    nextBtn.textContent = (current === DATA.length - 1) ? 'Ver resultado →' : 'Siguiente →';
  }

  function getProfileKey() {
    if (score <= 3) return 'low';
    if (score <= 6) return 'mid';
    return 'high';
  }

  function showResult() {
    quizWrap.style.display = 'none';
    resultArea.style.display = 'block';

    currentProfileKey = getProfileKey();
    var p = PROFILES[currentProfileKey];

    root.querySelector('#sng8-badge').textContent = p.emoji;
    root.querySelector('#sng8-result-greeting').textContent = '¡Hola, ' + user.name + '! Tu perfil es:';
    root.querySelector('#sng8-result-title').textContent = p.title;
    root.querySelector('#sng8-result-score').textContent = score + ' / ' + DATA.length + ' correctas';
    root.querySelector('#sng8-result-desc').textContent = p.desc;
    root.querySelector('#sng8-reflection-text').textContent = p.reflection;
  }

  btnTrue.addEventListener('click', function () { handleAnswer(true); });
  btnFalse.addEventListener('click', function () { handleAnswer(false); });

  nextBtn.addEventListener('click', function () {
    current++;
    if (current >= DATA.length) {
      showResult();
    } else {
      renderQuestion();
    }
  });

  restartBtn.addEventListener('click', function () {
    current = 0;
    score = 0;
    resultArea.style.display = 'none';
    registerCard.style.display = 'block';
    inputName.value = '';
    inputEmail.value = '';
    inputCountry.value = '';
    [fieldName, fieldEmail, fieldCountry].forEach(function (f) { f.classList.remove('sng8-invalid'); });
  });

  /* ---------------- Generar imagen de resultado 1080x1920 ---------------- */

  function wrapAndDraw(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';
    var lines = [];
    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        lines.push(line.trim());
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());
    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x, y + i * lineHeight);
    }
    return lines.length * lineHeight;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // Emoji reales embebidos como imágenes (Twemoji) para que se vean igual en
  // cualquier navegador, sin depender de la fuente de emoji del sistema.
  var EMOJI_DATA = {
    low: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAwFBMVEVHcEy/aVK/aVK/aVK/aVK/aVK/aVK/aVK/aVK/aVK/aVK/aVK/aVK/aVK/aVK/aVKbPAeuVC+lSBu/aVLXnoSbPAfWm4HBbFXEc1vTlHvCcFjQjXTFdl/Ul37LhGvIfWXRkXikRxmtUy1kIRbNh27HemKzWzjOinGnTB+2Xj/KgGifQQ6rUybMjG2BQDKeYE2PUD+3YkHIhmXQln2+dE7Bh2+9ZUysb1trKR25bUbJjna6f2mWWEZyMSTQkXauWy78bXS2AAAAE3RSTlMAUCCvgECfvxDvcM8wYN+PgO/vDFkiRQAABI1JREFUeF6ll+d6o0oQBWUJCVDce08POSkH57x53/+tlgmwCBjJoX7Yn2VT6u7T4FHnPOOZCY496HY+wcUUkp71GY01QOHpfAoTiqn1KY+BAnPY/7BlPBuhij24+IhmMkKTqWG9VzNFO/bwXU2Z0DMav9kztHES452ro8e03uIZ4Tyj7qc9Cnv8xlU+bzrT3QxvZXTSdIG30zsVWDX3IApQI4g8lGBy7h592TG2OxDHX0VQRFufOAf+2xc5ptMF3V8ytgESkvhCFfkkSYDNJbu8R85Au9HKc/mUeXAdUmxdd0sKx4WXRYWpsU3dfp+XOeJ95Z5rohjIwiSRdfjqW5KEGRATXecm3t2Mt9Hvlz5D3tVd5MwZeyAhEnM9UMlBJCBE9MDYHICt7kvjKHNjAmDB2BPlrJDjuUDZ1BZwhXvFrU+MLQD0DQjkE28Kz3E8YADsGftDnABASk4EjxQRIodSAAFx/jC255fIa6diQEAoprjhA5rH6u2RysJIIYtLoYqM53xMG5FJKMfeB2SuO+wYuxbZBNJDKaKyouIVBCLPa8byC+SWAP1/ohjz3POtWBZPvoY0CZ3cHCapHDN5xYp9y01zxEci8RZeHtiOpFO9awSOG4YuOJGsVhkpr3/uiZekqANkIt4r1RglcMXmhEIDuC4gVKFYJxcJqebmYj0yoFMRJQvVGPnrUG0x3JBfyMUhtznCv/ZJNXeVVEW2XA1/IxMrWXOBbDCSlWBNVeL5QihXsIXIVKX+PvaEgCfMgdqd2APCY9NvlY0pRD2sqYVATWqLnK2aTkAtrNVDzoBHLSSRr1KKIpWiHyXUggejuNdIzwHIMuBAeop7bQz4pCPkDm4LSYcPjDtlbBp8Fx7fbI8HqEGGpp+2XCUl8F25RLpZS4aA0+5Rgatl0PwRMFSiLrDVeCoPNp1pW3l2m/D0nnMmD2b1H2zY6jkQPT+T4tBqCmX4ChOB0+JJie6Wyzui2+XylihtMTmBLEjRRz04PxB9PS5ziORXWgGBX48M/dqBOqrWtHKFpypSc3JX1XqixkFwAATlnLIIcMVP1dY4oQtEGSnCABi0HWi8VebEWeIBiGISqGGXxBGAIMliJ1sFgGys1luJKE5LGJw84g5Q8rLZ0Ek2mxeUDPRnxz27opNcsT1KzJrI/qjIPvZYqIp27xDhWNRHZUaM0UkuGRTN2CaoIESvX5ctfH0lIsagPZMaDZH0NE1CpM+/Vxc9LzU8cpH+vD1ChTk/A/xq9/ziFc0BXf44Fj0QvbaLXokeuEgTW7cpors2zx01RV1N+oXo8abpuXlUIl3+Q1S5EiKin3XPTyIhWqDKUPvpqjwo/Tgq6uYHCdZcpMnfrInuSfH9Vrlubr+T4p6LNLFNa6LF2iENznpRE0116WPPFgh8asUPsGB7aPIf10U7AGlMDeIUaIrGuk+g5pf/wUlrVfkpOP99MaHJ36iJOpZhgxOkq0wUFmerNADHNqyOCU1sAzSatiY9tNCbWI2RYqBJv5iedTEzbZTY5uzCKrLR5G83RXqaIrv5wFZYZ0XNDv4CDFBGy3i+GHgAAAAASUVORK5CYII=',
    mid: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAolBMVEVHcEyImaaImaaImaaImaaImaaImaZmdX9mdX+ImaaImaaImaaImaaImaaImaZmdX9mdX+ImaZmdX9mdX+aqrSImaZmdX9mdX+TpK9mdX+ImaZmdX9mdX9mdX+Imaa73fWuzOGiu86SprWx0OaoxNeVqrqet8mLnau42fCOorCaqrSlv9K11eubs8SYrr9mdX+Roq2JmqeTpK+QoKppeIKPn6tleVTkAAAAHnRSTlMA788wvyAQ7zCAn2BA36+fz1Agv2CPj9+AEHCvYEDbxs89AAACRklEQVR4Xs3X95KbMBDAYWEwPsC4+2qyohe3K0ne/9Xi88AsuUG7UqI/8nuAb9aogIVe03UQep8tgsgVf5u7j2GYs4h8YV6ECuaEU1PGAUVGlDsBdU6g7QRA5+kN5S+Ay3F1nAloFJk67SVNPjtWmaE0dOpzLrGmaIeSSzshYGkjv5QMKId84hEy5UmOlKI0IZwpbsNKjpfX0EfsJ1z4QkpC4n7cHPqOCBBSqIK83jlLqhz6FCO5vdM2kizFkeilTyRT1kv+KNQvWSm5EnJ/r7UHwpEWY9C+czLJV0AXdcqOkq/pofkIBF251KjsoGdi8SXG74C9eluXEuMfkqdYNG0oQUh146f/HVSZQcTDtgVlWtBRfUamRvuoIq5bB88sX0scf8/gaZ/w7aZettrghMTkTVuwTlOTd23cQa32QLCmP4uOugPFYjS/h+qchi7cuzbspazR2Yzg+MSrn5cKjZd/ACjxTuzrfGZlOXE28OJX9fgOffXY2uUZOnvC2R0+AGuLL8zpDNx31tP9drvc7A6HwxsMqSpBpShh6Iyu2N3D67XZj8O1X/Bn5SVN06psATSc2eutnzfpDah4B6WPd85ZkA5KjxPaeRaUg9JOiMCh/tKQDkq722kJFUy8FqSDze66gxfEIw9nLjgHW+KdGXiAxWHkC97BHsQwdx4F1+Y4CuNgK0HEO9jSkjPbGDpPCudOGLa15Hy35IilJUesLDnCliNsOWJryRH3lhyxseLgSLzDt+Ic85lWtMO3WV6nmr18+xfjNwIbZG8aSnjVAAAAAElFTkSuQmCC',
    high: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAY1BMVEVHcEz/2YP/2YP/rDP/rDP/rDP/rDP/rDP/2YP/rDP/rDP/2YP/2YP/2YP/rDP/2YP/2YP/2YP/rDP/2YP/2YP/2YP/rDP/rDP/rDP/rDP/2YP/2YP/rDP/2YP/rDP/2YP/rDNN5vrUAAAAH3RSTlMAIO8g70Bgv4CfEL/PYI8QjzBwUK/f34BQr0Cfz3Awq2JpyAAAAmVJREFUeF7N2NuS6iAQhtEfEkLO5xiP0/3+T7mnqKgMZQayuZl1Hb+0oq0l/FrmFgeJPG/gGPnbCEeT5wK7BklEywBbmfK3tIRtWIhIDtgzE7kXYGVjdW/4bcYeSUb9cyAjTfBWkyHhcC+gHC8Fbwq85GRQhT39FpIdNgm/JNh0cgv12CPIHangF+0ORALBIyVsUSEDua9SA0OzRcNoyDqSXV1tX6X4h7N9r7pDUElsA9lOACDCOkBXmdBkBnJkACbTqTr49c9zO7EjLbcz6xHkupjQyi6+mNByRagmF8j4gwIib3BIyx9dShyi7rwjzRAsyTT/4tQq/1hfWatT9kt1myl8VKqxuPMx98uqEtjU5cT/K21LPJ05SoGnC0fR7nsmfqIk5Qj298JXTOcLlowPctddfCmDI4vt+Ev+TnxpxEcjH1RgRxHfcUvhnfjSBb+6c6BT6VmRxw4+/smd4HPmIC0+6aZ8rhYiqm8DOIgabjURLdWcTx0MXCt6q6A5BH486AoAN7JNYesyxUS2G9CTrQFWDnAHGrL1IIucgo8NwCTJYocq62eaTwJAVHbolV0mGCmHUACAaaGNRENG3WBzbBM19evFFfncP4ajn5EVT8Ojn3MBF9Txz37UmtTwWTkMfDSHKY+H7lrrlF0KHk5Fn2Eka3pssZVsK5SpXAWAcjw55/8rZWcSGA1JYYKZlSq8ITcDSLMmnJT2hdzMti86bM46LJS4GWDeFtWTMqkRHmet2wQ26f5ZANXqEYddtzUR7UGGQKyejCtiVWTkfyck/8pEbujxd46/k9uXe7RhIZo7ePwD13Mw4CPmUAAAAAAASUVORK5CYII='
  };

  var EMOJI_IMAGES = {};
  var emojiImagesReady = Promise.all(Object.keys(EMOJI_DATA).map(function (key) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () { EMOJI_IMAGES[key] = img; resolve(); };
      img.onerror = function () { resolve(); };
      img.src = EMOJI_DATA[key];
    });
  }));

  function drawBadgeEmoji(ctx, key, cx, cy, r) {
    var img = EMOJI_IMAGES[key];
    if (!img) return;
    var size = r * 1.3;
    ctx.drawImage(img, cx - size / 2, cy - size / 2, size, size);
  }

  function generateResultImage() {
    var W = 1080, H = 1920;
    var canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    var ctx = canvas.getContext('2d');
    var p = PROFILES[currentProfileKey];
    var cardX = 70, cardW = W - 140;

    // ---------- Pasada de medición (sin dibujar) para saber cuánto ocupa el contenido ----------
    function layoutContent(startY) {
      var centerX = W / 2;
      var y = startY;
      var badgeR = 105;
      y += badgeR; // centro de la insignia
      y += badgeR + 90; // después de la insignia
      y += 66; // saludo
      ctx.font = '800 54px Poppins, Segoe UI, sans-serif';
      y += measureWrapHeight(ctx, p.title, cardW - 140, 62) + 70;
      y += 90; // píldora de puntaje
      ctx.font = '400 32px Poppins, Segoe UI, sans-serif';
      y += measureWrapHeight(ctx, p.desc, cardW - 160, 44) + 30;

      var boxPadding = 40;
      var boxW = cardW - 120;
      ctx.font = '400 28px Poppins, Segoe UI, sans-serif';
      var reflectionH = measureWrapHeight(ctx, p.reflection, boxW - boxPadding * 2, 40);
      var boxH = 70 + reflectionH;
      y += boxH + 60;

      ctx.font = 'italic 400 26px Poppins, Segoe UI, sans-serif';
      y += measureWrapHeight(ctx, 'Que tenga IA no es una garantía. Entender, verificar y preguntar también es parte de usar tecnología.', cardW - 160, 36);

      return y;
    }

    function measureWrapHeight(ctx, text, maxWidth, lineHeight) {
      var words = text.split(' ');
      var line = '';
      var lines = 0;
      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        if (ctx.measureText(testLine).width > maxWidth && n > 0) {
          lines++;
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines++;
      return lines * lineHeight;
    }

    // Medimos con un cardY de referencia para saber la altura total del contenido
    var probeCardY = 220;
    var probeContentEndY = layoutContent(probeCardY + 150);
    var neededCardH = (probeContentEndY - probeCardY) + 100;
    var minCardH = 900;
    var cardH = Math.max(neededCardH, minCardH);
    if (cardH > H - 340) cardH = H - 340;
    var cardY = Math.round((H - cardH) / 2) + 20;

    // Fondo degradado
    var bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#5B3E9E');
    bg.addColorStop(1, '#E6398B');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Círculos decorativos
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(140, 190, 220, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(960, H - 170, 260, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;

    // Eyebrow
    ctx.textAlign = 'center';
    ctx.font = '700 26px Poppins, Segoe UI, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('SINERG.IA  ·  EPISODIO 8', W / 2, 130);

    // Tarjeta blanca
    roundRect(ctx, cardX, cardY, cardW, cardH, 50);
    ctx.fillStyle = '#FFF7EF';
    ctx.fill();

    var centerX = W / 2;
    var cursorY = cardY + 150;

    // Insignia (círculo con ícono vectorial — no depende de fuentes de emoji)
    var badgeR = 105;
    ctx.beginPath();
    ctx.arc(centerX, cursorY, badgeR, 0, Math.PI * 2);
    var badgeGrad = ctx.createRadialGradient(centerX - 30, cursorY - 30, 10, centerX, cursorY, badgeR);
    badgeGrad.addColorStop(0, '#ffffff');
    badgeGrad.addColorStop(1, '#FFF7EF');
    ctx.fillStyle = badgeGrad;
    ctx.fill();
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#E6398B';
    ctx.stroke();

    drawBadgeEmoji(ctx, currentProfileKey, centerX, cursorY, badgeR);

    cursorY += badgeR + 90;

    // Saludo
    ctx.font = '600 34px Poppins, Segoe UI, sans-serif';
    ctx.fillStyle = '#5B3E9E';
    ctx.fillText('¡Hola, ' + user.name + '! Tu perfil es:', centerX, cursorY);

    cursorY += 66;

    // Título de perfil
    ctx.font = '800 54px Poppins, Segoe UI, sans-serif';
    ctx.fillStyle = '#E6398B';
    cursorY += wrapAndDraw(ctx, p.title, centerX, cursorY, cardW - 140, 62) + 70;

    // Puntaje (píldora)
    var scoreText = score + ' / ' + DATA.length + ' correctas';
    ctx.font = '700 30px Poppins, Segoe UI, sans-serif';
    var scoreWidth = ctx.measureText(scoreText).width + 70;
    roundRect(ctx, centerX - scoreWidth / 2, cursorY - 42, scoreWidth, 64, 32);
    ctx.fillStyle = '#5B3E9E';
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText(scoreText, centerX, cursorY + 2);

    cursorY += 90;

    // Descripción
    ctx.font = '400 32px Poppins, Segoe UI, sans-serif';
    ctx.fillStyle = '#221C2B';
    cursorY += wrapAndDraw(ctx, p.desc, centerX, cursorY, cardW - 160, 44) + 30;

    // Caja de reflexión
    var reflectionLabel = 'PARA TI Y PARA QUIEN QUIERAS CONTARLE';
    var boxPadding = 40;
    var boxX = cardX + 60;
    var boxW = cardW - 120;

    ctx.font = '400 28px Poppins, Segoe UI, sans-serif';
    var reflectionTextHeight = measureWrapHeight(ctx, p.reflection, boxW - boxPadding * 2, 40);
    var boxH = 70 + reflectionTextHeight;
    var boxY = cursorY;

    roundRect(ctx, boxX, boxY, boxW, boxH, 24);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.fillStyle = '#E6398B';
    ctx.fillRect(boxX, boxY, 8, boxH);

    ctx.textAlign = 'left';
    ctx.font = '700 22px Poppins, Segoe UI, sans-serif';
    ctx.fillStyle = '#5B3E9E';
    ctx.fillText(reflectionLabel, boxX + boxPadding, boxY + 44);

    ctx.font = '400 28px Poppins, Segoe UI, sans-serif';
    ctx.fillStyle = '#221C2B';
    wrapAndDraw(ctx, p.reflection, boxX + boxPadding, boxY + 88, boxW - boxPadding * 2, 40);

    ctx.textAlign = 'center';
    cursorY = boxY + boxH + 60;

    // Cierre
    ctx.font = 'italic 400 26px Poppins, Segoe UI, sans-serif';
    ctx.fillStyle = '#5B3E9E';
    wrapAndDraw(ctx, 'Que tenga IA no es una garantía. Entender, verificar y preguntar también es parte de usar tecnología.', centerX, cursorY, cardW - 160, 36);

    // Footer con ícono de Instagram + sitio web
    var footerY = cardY + cardH + 86;
    var handleText = '@lasinerg.ia';
    ctx.font = '700 30px Poppins, Segoe UI, sans-serif';
    var handleWidth = ctx.measureText(handleText).width;
    var iconSize = 42;
    var gap = 14;
    var totalW = iconSize + gap + handleWidth;
    var startX = centerX - totalW / 2;

    drawInstagramIcon(ctx, startX, footerY - iconSize / 2 - 6, iconSize);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(handleText, startX + iconSize + gap, footerY);
    ctx.textAlign = 'center';

    ctx.font = '600 22px Poppins, Segoe UI, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillText('lasinergia.com.co/actividades/', centerX, footerY + 42);

    return canvas;
  }

  function drawInstagramIcon(ctx, x, y, size) {
    var r = size * 0.28;
    ctx.save();

    // Fondo degradado (estilo Instagram)
    var grad = ctx.createLinearGradient(x, y + size, x + size, y);
    grad.addColorStop(0, '#FEE440');
    grad.addColorStop(0.35, '#E6398B');
    grad.addColorStop(0.7, '#B729D9');
    grad.addColorStop(1, '#5B3E9E');
    roundRect(ctx, x, y, size, size, r);
    ctx.fillStyle = grad;
    ctx.fill();

    // Lente (círculo central)
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size * 0.26, 0, Math.PI * 2);
    ctx.lineWidth = size * 0.08;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // Punto superior derecho
    ctx.beginPath();
    ctx.arc(x + size * 0.76, y + size * 0.24, size * 0.06, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.restore();
  }

  downloadBtn.addEventListener('click', function () {
    downloadBtn.disabled = true;
    var originalLabel = downloadBtn.textContent;
    downloadBtn.textContent = 'Generando…';
    emojiImagesReady.then(function () {
      try {
        var canvas = generateResultImage();
        canvas.toBlob(function (blob) {
          downloadBtn.disabled = false;
          downloadBtn.textContent = originalLabel;
          if (!blob) return;
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = 'sinergia-ep8-resultado-' + user.name.replace(/\s+/g, '-').toLowerCase() + '.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
        }, 'image/png');
      } catch (e) {
        downloadBtn.disabled = false;
        downloadBtn.textContent = originalLabel;
        alert('No se pudo generar la imagen. Intenta de nuevo.');
      }
    });
  });

})();