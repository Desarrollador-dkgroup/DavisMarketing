import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import ParticleTitle from "../components/ParticleTitle";
import { useReducedMotion } from "../lib/motion";

// three.js pesa mucho: se descarga aparte, en paralelo a la pantalla de carga.
const CinematicHeroScene = lazy(() => import("../components/CinematicHeroScene"));

/** Espera a que la pantalla de carga termine para arrancar la animación del hero. */
function usePreloaderDone() {
  const [done, setDone] = useState(
    () => typeof document !== "undefined" && !document.documentElement.classList.contains("is-loading"),
  );

  useEffect(() => {
    const handleDone = () => setDone(true);
    window.addEventListener("preloader:done", handleDone);
    // Si la pantalla de carga ya terminó antes de montar este componente.
    const timer = window.setTimeout(() => {
      if (!document.documentElement.classList.contains("is-loading")) setDone(true);
    }, 0);
    return () => {
      window.removeEventListener("preloader:done", handleDone);
      window.clearTimeout(timer);
    };
  }, []);

  return done;
}

function HeroCinematic() {
  const reducedMotion = useReducedMotion();
  const ready = usePreloaderDone();
  const nameClass =
    "block text-[clamp(2rem,9vw,4rem)] md:text-[clamp(3rem,5vw,4.6rem)] font-extrabold " +
    "leading-none tracking-[0.035em]";

  return (
    <section
      id="inicio"
      aria-label="Davis Marketing: desarrollo y producción"
      className={`cinematic-hero relative min-h-screen overflow-hidden bg-black/10 backdrop-blur-sm font-sans
      text-white ${reducedMotion ? "cinematic-reduced-motion" : ""} ${ready ? "hero-ready" : ""}`}
    >
      <div className="absolute inset-0">
        {ready && (
          <Suspense fallback={null}>
            <CinematicHeroScene reducedMotion={reducedMotion} />
          </Suspense>
        )}
      </div>

      <div
        className="cinematic-brand-copy pointer-events-none absolute inset-x-0 mt-[-30px] md:mt-0
        md:top-[64%] z-20 px-5 text-center"
      >
        <h1 className="m-0 text-[#F4F4F4]">
          {reducedMotion ? (
            <span className={`cinematic-brand-name ${nameClass}`}>DAVIS MARKETING</span>
          ) : (
            <ParticleTitle text="DAVIS MARKETING" className={nameClass} delay={6.2} start={ready} />
          )}
          <span
            className="cinematic-brand-subtitle mt-2 block text-[clamp(1.3rem,5vw,6rem)]
            md:text-[clamp(2rem,2.9vw,2.9rem)] font-normal leading-none tracking-[0.08em]"
          >
            DESARROLLO &amp; PRODUCCIÓN
          </span>
        </h1>
      </div>

      <a
        href="#nosotros"
        data-cursor="Bajar"
        aria-label="Bajar a la siguiente sección"
        className="hero-scroll-cue absolute bottom-8 left-1/2 z-20 grid h-12 w-12 -translate-x-1/2
        place-items-center rounded-full border border-white/30 text-white/80 backdrop-blur-sm
        transition-colors hover:border-[#AAC551] hover:text-[#AAC551]"
      >
        <ArrowDown className="h-5 w-5" strokeWidth={1.6} />
      </a>
    </section>
  );
}

export default HeroCinematic;
