// Visor a pantalla completa: toca una foto para abrir; toca izquierda/derecha, desliza o usa flechas para navegar.
window.abrirVisor = (function () {
  const d = document.createElement("dialog");
  d.className = "visor";
  d.innerHTML = '<img alt=""><button class="ant" aria-label="Anterior">‹</button><button class="sig" aria-label="Siguiente">›</button>' +
    '<button class="cerrar" aria-label="Cerrar" autofocus>×</button><div class="pie"><b></b><span></span></div>';
  document.body.appendChild(d);
  const img = d.querySelector("img"), b = d.querySelector(".pie b"), s = d.querySelector(".pie span");
  let lista = [], i = 0;
  const pintar = () => {
    const p = lista[i];
    img.src = RUTA + p.f; img.alt = p.alt;
    b.textContent = CATS[p.cat]; s.textContent = String(i + 1).padStart(2, "0") + " / " + String(lista.length).padStart(2, "0");
  };
  const mover = (n) => { i = (i + n + lista.length) % lista.length; pintar(); };
  d.querySelector(".ant").onclick = () => mover(-1);
  d.querySelector(".sig").onclick = () => mover(1);
  d.querySelector(".cerrar").onclick = () => d.close();
  d.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") mover(-1); if (e.key === "ArrowRight") mover(1); });
  let x0 = null;
  d.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
  d.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1);
  });
  return (l, idx) => { lista = l; i = idx; pintar(); d.showModal(); };
})();
