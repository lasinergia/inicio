const usuario = 'lasinergia';
const repositorio = 'laSinergia';
const rama = 'main';

const codigoSecreto = '44489347';
let secuenciaEscrita = '';
let datosCommit = null;

fetch(`https://api.github.com/repos/${usuario}/${repositorio}/commits/${rama}`)
  .then(response => {
    if (response.ok) return response.json();
    throw new Error('API Limit o Error');
  })
  .then(data => {
    datosCommit = data;
  })
  .catch(err => console.log('Info de producción lista en modo local.'));


window.addEventListener('keydown', (e) => {
  if (e.key.length !== 1) return;

  secuenciaEscrita += e.key;

  if (codigoSecreto.startsWith(secuenciaEscrita)) {

    if (secuenciaEscrita === codigoSecreto) {
      abrirPopupCommit();
      secuenciaEscrita = '';
    }
  } else {
    secuenciaEscrita = (e.key === codigoSecreto[0]) ? codigoSecreto[0] : '';
  }
});


function abrirPopupCommit() {
  const modal = document.getElementById('commit-modal');
  const infoContainer = document.getElementById('modal-commit-info');

  if (datosCommit) {
    const shortSha = datosCommit.sha.substring(0, 7);
    const mensajeCompleto = datosCommit.commit.message.split('\n')[0];
    const fechaCommit = new Date(datosCommit.commit.author.date).toLocaleDateString('es-ES', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });

    infoContainer.innerHTML = `
      <p style="margin: 0.5rem 0;"><strong>Código SHA:</strong> <a href="${datosCommit.html_url}" target="_blank">${shortSha}</a></p>
      <p style="margin: 0.5rem 0;"><strong>Cambios:</strong> <span>${mensajeCompleto}</span></p>
      <p style="margin: 0.5rem 0; opacity: 0.7; font-size: 0.9rem;"><strong>Último despliegue:</strong> ${fechaCommit}</p>
    `;
  } else {
    infoContainer.innerHTML = `<p>Modo producción activo. No se pudo conectar dinámicamente con la API de GitHub.</p>`;
  }

  modal.style.display = 'flex';
}

document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('commit-modal').style.display = 'none';
});

window.addEventListener('click', (e) => {
  const modal = document.getElementById('commit-modal');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});