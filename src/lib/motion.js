import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Lee una media query y se actualiza cuando cambia. */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** true si el usuario pidió reducir el movimiento en su sistema. */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** true en dispositivos con ratón (sin pantalla táctil como entrada principal). */
export function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/**
 * Aparición al hacer scroll con clases CSS (.reveal → .is-revealed).
 * Es más robusto que gsap.from: si ScrollTrigger recalcula posiciones, el estado no se pierde.
 * Llamar dentro de gsap.context; devuelve una función que deshace los cambios.
 */
export function revealOnScroll(targets, { trigger, start = "top 82%", stagger = 0.1 } = {}) {
  const elements = gsap.utils.toArray(targets);
  if (!elements.length) return () => {};
  elements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.transitionDelay = `${index * stagger}s`;
  });
  const reveal = () => elements.forEach((element) => element.classList.add("is-revealed"));
  const scrollTrigger = ScrollTrigger.create({
    trigger: trigger ?? elements[0],
    start,
    once: true,
    onEnter: reveal,
  });
  return () => {
    scrollTrigger.kill();
    elements.forEach((element) => {
      element.classList.remove("reveal", "is-revealed");
      element.style.transitionDelay = "";
    });
  };
}
