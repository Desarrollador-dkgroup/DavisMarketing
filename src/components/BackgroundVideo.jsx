import { useEffect, useRef } from "react";

/**
 * Componente BackgroundVideo con soporte para:
 * - Modo "reverse" (solo retrocede de endTime a startTime y se repite)
 * - Modo "boomerang" (ida y vuelta con desaceleración)
 * - Modo "forward" (avance normal en bucle con startTime y endTime)
 *
 * @param {string} src - Ruta del video
 * @param {string} height - Alto del contenedor (ej. "113vh", "100vh")
 * @param {number} speed - Velocidad de reproducción (ej. 1, 0.8)
 * @param {number} startTime - Segundo donde termina de retroceder (ej. 0.5)
 * @param {number|null} endTime - Segundo donde empieza a retroceder (ej. 3.5)
 * @param {number} easeDuration - Segundos de desaceleración suave antes del final
 * @param {string} mode - "reverse" | "boomerang" | "forward" (por defecto "reverse")
 * @param {number} opacity - Opacidad (0 a 1)
 * @param {string} objectFit - Ajuste del video ("cover", "contain", etc.)
 * @param {string} className - Clases CSS adicionales
 */
function BackgroundVideo({
  src = "/video2_smooth.mp4",
  height = "113vh",
  speed = 1.0,
  startTime = 0.5,
  endTime = 3.5,
  easeDuration = 0.8,
  mode = "reverse",
  opacity = 1,
  objectFit = "cover",
  className = "",
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId;
    let lastTime = performance.now();
    let direction = mode === "reverse" ? -1 : 1;

    video.muted = true;
    video.playsInline = true;

    const getEnd = () => {
      if (endTime !== null && endTime > startTime) {
        return endTime;
      }
      return video.duration || 5;
    };

    const initialEnd = getEnd();
    if (mode === "reverse") {
      video.currentTime = initialEnd;
      if (!video.paused) video.pause();
    } else {
      video.currentTime = startTime;
      video.play().catch(() => {});
    }

    const animate = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.08);
      lastTime = now;

      const targetEnd = getEnd();
      const current = video.currentTime;

      if (mode === "reverse") {
        // --- MODO SOLO RETROCESO (REVERSE LOOP) ---
        if (!video.paused) {
          video.pause();
        }

        let currentSpeed = speed;
        if (easeDuration > 0) {
          const distToStart = Math.max(0, current - startTime);
          const easeWindow = easeDuration;
          const easeFactor = distToStart < easeWindow
            ? 0.5 - 0.5 * Math.cos((distToStart / easeWindow) * Math.PI)
            : 1;
          currentSpeed = Math.max(0.12, speed * Math.max(0.08, easeFactor));
        }

        const nextTime = current - dt * currentSpeed;

        if (nextTime <= startTime) {
          // Al llegar al inicio, reinicia desde atrás (targetEnd)
          video.currentTime = targetEnd;
        } else {
          video.currentTime = nextTime;
        }
      } else if (mode === "forward") {
        // --- MODO SOLO AVANCE (FORWARD LOOP CON INICIO Y FIN) ---
        let currentSpeed = speed;
        if (easeDuration > 0) {
          const distToEnd = Math.max(0, targetEnd - current);
          const easeWindow = easeDuration;
          const easeFactor = distToEnd < easeWindow
            ? 0.5 - 0.5 * Math.cos((distToEnd / easeWindow) * Math.PI)
            : 1;
          currentSpeed = Math.max(0.1, speed * Math.max(0.1, easeFactor));
        }

        if (video.paused) {
          video.play().catch(() => {});
        }
        video.playbackRate = currentSpeed;

        if (current >= targetEnd) {
          video.currentTime = startTime;
        }
      } else {
        // --- MODO BOOMERANG (IDA Y VUELTA) ---
        const distToStart = Math.max(0, current - startTime);
        const distToEnd = Math.max(0, targetEnd - current);
        const nearestDist = Math.min(distToStart, distToEnd);

        const easeWindow = Math.max(0.2, easeDuration);
        const easeFactor = nearestDist < easeWindow
          ? 0.5 - 0.5 * Math.cos((nearestDist / easeWindow) * Math.PI)
          : 1;

        const currentSpeed = Math.max(0.12, speed * Math.max(0.08, easeFactor));

        if (direction === 1) {
          if (video.paused) video.play().catch(() => {});
          video.playbackRate = Math.min(Math.max(currentSpeed, 0.0625), 16);

          if (current >= targetEnd) {
            direction = -1;
            video.pause();
            video.currentTime = targetEnd;
          }
        } else {
          if (!video.paused) video.pause();
          const nextTime = current - dt * currentSpeed;
          if (nextTime <= startTime) {
            video.currentTime = startTime;
            direction = 1;
            video.playbackRate = 0.12;
            video.play().catch(() => {});
          } else {
            video.currentTime = nextTime;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleLoadedMetadata = () => {
      const targetEnd = getEnd();
      video.currentTime = mode === "reverse" ? targetEnd : startTime;
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(animate);
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [src, speed, startTime, endTime, easeDuration, mode]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 -z-50 pointer-events-none overflow-hidden ${className}`}
      style={{ height }}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        loop={false}
        className="w-full h-full"
        style={{
          objectFit,
          opacity,
        }}
      />
    </div>
  );
}

export default BackgroundVideo;
