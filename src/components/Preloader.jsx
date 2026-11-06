import { useEffect, useRef, useState } from "react";
import { gsap, useReducedMotion } from "../lib/motion";

/**
 * Pantalla de carga con el logo: el contador sube mientras carga la página
 * y luego la cortina se abre hacia arriba.
 */
function Preloader() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef(null);
  const countRef = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    document.documentElement.classList.add("is-loading");

    const finish = () => {
      document.documentElement.classList.remove("is-loading");
      setDone(true);
      window.dispatchEvent(new Event("preloader:done"));
    };

    if (reducedMotion) {
      const timer = window.setTimeout(finish, 200);
      return () => window.clearTimeout(timer);
    }

    const counter = { value: 0 };
    const pageLoaded = new Promise((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", resolve, { once: true });
    });
    // Nunca esperar más de 3 s aunque el video siga cargando.
    const maxWait = new Promise((resolve) => window.setTimeout(resolve, 3000));

    const timeline = gsap.timeline({ paused: true, onComplete: finish });
    timeline
      .to(".preloader-mark", { scale: 0.9, autoAlpha: 0, duration: 0.45, ease: "power2.in" })
      .to(root, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.1");

    const intro = gsap.to(counter, {
      value: 100,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        if (countRef.current) countRef.current.textContent = String(Math.round(counter.value));
      },
    });

    let cancelled = false;
    Promise.all([Promise.race([pageLoaded, maxWait]), intro.then()]).then(() => {
      if (!cancelled) timeline.play();
    });

    return () => {
      cancelled = true;
      intro.kill();
      timeline.kill();
      document.documentElement.classList.remove("is-loading");
    };
  }, [reducedMotion]);

  if (done) return null;

  return (
    <div ref={rootRef} className="preloader" role="status" aria-label="Cargando">
      <div className="preloader-mark">
        <img src="/navbar/LogoBlanco.svg" alt="" className="h-16 w-auto sm:h-20" />
        <div className="preloader-bar">
          <span />
        </div>
        <p className="mt-4 text-xs font-semibold tracking-[0.4em] text-white/60">
          <span ref={countRef}>0</span>%
        </p>
      </div>
    </div>
  );
}

export default Preloader;
