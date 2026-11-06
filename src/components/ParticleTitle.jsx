import { useEffect, useRef } from "react";

const COLORS = ["#F4F4F4", "#F4F4F4", "#F4F4F4", "#AAC551", "#5C86C9"];

/**
 * Dibuja un texto con partículas sobre un canvas que cubre exactamente al elemento.
 * Las partículas llegan dispersas, se juntan para formar las letras y se apartan del ratón.
 * El texto real queda en el HTML (transparente) para lectores de pantalla y buscadores.
 *
 * @param {string} text - Texto a dibujar
 * @param {string} className - Clases del elemento de texto (tamaño, peso, espaciado)
 * @param {number} delay - Segundos antes de que las partículas empiecen a juntarse
 * @param {boolean} start - Cuando pasa a true arranca la animación
 */
function ParticleTitle({ text, className = "", delay = 0, start = true }) {
  const textRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!start) return undefined;
    const textElement = textRef.current;
    const canvas = canvasRef.current;
    if (!textElement || !canvas) return undefined;

    const context = canvas.getContext("2d");
    const pointer = { x: -9999, y: -9999 };
    // Margen alrededor del texto para que las partículas puedan dispersarse.
    const margin = 80;
    let particles = [];
    let frame = 0;
    let startTime = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const build = () => {
      const bounds = textElement.getBoundingClientRect();
      const style = window.getComputedStyle(textElement);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width + margin * 2;
      height = bounds.height + margin * 2;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Dibujar el texto en un canvas oculto y leer qué píxeles quedaron pintados.
      const sampler = document.createElement("canvas");
      sampler.width = Math.round(width);
      sampler.height = Math.round(height);
      const sample = sampler.getContext("2d", { willReadFrequently: true });
      sample.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      sample.textAlign = "center";
      sample.textBaseline = "middle";
      if ("letterSpacing" in sample) sample.letterSpacing = style.letterSpacing;
      sample.fillStyle = "#fff";
      sample.fillText(text, width / 2, height / 2);

      const fontSize = parseFloat(style.fontSize);
      const gap = Math.max(2, Math.round(fontSize / 22));
      const pixels = sample.getImageData(0, 0, sampler.width, sampler.height).data;
      const previous = particles;
      particles = [];

      for (let y = 0; y < sampler.height; y += gap) {
        for (let x = 0; x < sampler.width; x += gap) {
          if (pixels[(y * sampler.width + x) * 4 + 3] < 128) continue;
          const angle = Math.random() * Math.PI * 2;
          const distance = 120 + Math.random() * Math.max(width, 400) * 0.6;
          const old = previous[particles.length];
          particles.push({
            homeX: x,
            homeY: y,
            x: old ? old.x : width / 2 + Math.cos(angle) * distance,
            y: old ? old.y : height / 2 + Math.sin(angle) * distance * 0.5,
            vx: 0,
            vy: 0,
            size: gap * (0.6 + Math.random() * 0.25),
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
          });
        }
      }
    };

    const draw = (now) => {
      if (!startTime) startTime = now;
      const elapsed = (now - startTime) / 1000 - delay;
      // Fuerza de atracción hacia la letra: crece en el primer segundo y medio.
      const pull = elapsed <= 0 ? 0 : Math.min(1, elapsed / 1.5) * 0.06;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      context.globalAlpha = elapsed <= 0 ? 0 : Math.min(1, elapsed * 2);

      for (const particle of particles) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distanceSq = dx * dx + dy * dy;
        if (distanceSq < 4900) {
          // Repeler dentro de un radio de 70 px.
          const force = (4900 - distanceSq) / 4900;
          const distance = Math.sqrt(distanceSq) || 1;
          particle.vx += (dx / distance) * force * 3.2;
          particle.vy += (dy / distance) * force * 3.2;
        }
        particle.vx += (particle.homeX - particle.x) * pull;
        particle.vy += (particle.homeY - particle.y) * pull;
        particle.vx *= 0.84;
        particle.vy *= 0.84;
        particle.x += particle.vx;
        particle.y += particle.vy;

        context.fillStyle = particle.color;
        context.fillRect(particle.x, particle.y, particle.size, particle.size);
      }

      frame = window.requestAnimationFrame(draw);
    };

    const handlePointer = (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    };
    const resetPointer = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    let resizeTimer = 0;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 150);
    };

    // Pausar cuando el hero no está en pantalla para no gastar batería.
    const observer = new IntersectionObserver(([entry]) => {
      window.cancelAnimationFrame(frame);
      if (entry.isIntersecting) frame = window.requestAnimationFrame(draw);
    });

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      build();
      observer.observe(canvas);
    });

    window.addEventListener("pointermove", handlePointer);
    document.addEventListener("pointerleave", resetPointer);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointer);
      document.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("resize", handleResize);
    };
  }, [text, delay, start]);

  return (
    <span className="relative inline-block">
      <span ref={textRef} className={`${className} text-transparent`}>
        {text}
      </span>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </span>
  );
}

export default ParticleTitle;
