import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, useReducedMotion } from "../lib/motion";

/**
 * Scroll suave con Lenis, sincronizado con ScrollTrigger.
 * También hace que los enlaces "#seccion" se deslicen con la misma suavidad.
 */
function SmoothScroll() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    document.documentElement.classList.add("lenis-active");
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Enlaces internos: deslizar con Lenis y compensar la barra de navegación.
    const handleClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -64 });
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      gsap.ticker.remove(tick);
      document.documentElement.classList.remove("lenis-active");
      lenis.destroy();
    };
  }, [reducedMotion]);

  return null;
}

export default SmoothScroll;
