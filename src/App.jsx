import { useEffect } from "react";
import NavBar from "./components/Navbar";
import HERO_CINEMATIC from "./sections/HeroCinematic";
import US from "./sections/Us";
import CREATIVEBRIDGE from "./sections/CreativeBridge";
import PROYECTS from "./sections/Proyects";
import MANIFESTO from "./sections/Manifesto";
import CONTACT from "./sections/Contact";
import BackgroundVideo from "./components/BackgroundVideo";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import { gsap, ScrollTrigger, useReducedMotion } from "./lib/motion";

/**
 * Transición entre secciones: cada una entra como una "cortina" que se abre
 * (bordes redondeados y recorte que se expanden hasta ocupar toda la pantalla).
 */
function useSectionCurtains() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;
    const context = gsap.context(() => {
      gsap.utils.toArray("[data-curtain]").forEach((section) => {
        gsap.fromTo(
          section,
          { clipPath: "inset(6% 5% 0% 5% round 48px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "top 25%", scrub: true },
          },
        );
      });
    });

    // Recalcular posiciones cuando terminen de cargar imágenes y fuentes.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("preloader:done", refresh);
    document.fonts.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("preloader:done", refresh);
      context.revert();
    };
  }, [reducedMotion]);
}

function App() {
  useSectionCurtains();

  return (
    <main className="relative min-h-screen">
      <Preloader />
      <SmoothScroll />
      <Cursor />
      <div aria-hidden="true" className="grain-overlay" />

      <BackgroundVideo
        src="/video2.mp4"
        height="113vh"
        speed={2}
        startTime={0}
        endTime={5}
        easeDuration={0}
        mode="forward"
        opacity={1}
      />
      <NavBar />
      {/* Sin backdrop-filter aquí: rompería las secciones fijadas con ScrollTrigger. */}
      <div className="relative z-0">
        <HERO_CINEMATIC />
        <div data-curtain><US /></div>
        <div data-curtain><CREATIVEBRIDGE /></div>
        <div data-curtain><MANIFESTO /></div>
        <div data-curtain><PROYECTS /></div>
        <div data-curtain><CONTACT /></div>
      </div>
    </main>
  );
}

export default App;
