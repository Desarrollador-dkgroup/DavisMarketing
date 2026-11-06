import { useEffect, useRef, useState } from "react";
import { gsap, useFinePointer, useReducedMotion } from "../lib/motion";

/**
 * Cursor propio: un punto que sigue al ratón y un anillo que lo persigue con retraso.
 * - Crece sobre enlaces y botones.
 * - Muestra un texto si el elemento tiene data-cursor="Texto".
 * - Atrae los elementos con data-magnetic (efecto magnético).
 * Solo se activa con ratón; en pantallas táctiles no se muestra.
 */
function Cursor() {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState("");
  const enabled = finePointer && !reducedMotion;

  useEffect(() => {
    if (!enabled) return undefined;
    const dot = dotRef.current;
    const ring = ringRef.current;
    document.documentElement.classList.add("has-custom-cursor");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
    let magnetic = null;

    const releaseMagnetic = () => {
      if (!magnetic) return;
      gsap.to(magnetic, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      magnetic = null;
    };

    const handleMove = (event) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });

      const target = event.target instanceof Element ? event.target : null;
      const labelled = target?.closest("[data-cursor]");
      const interactive = target?.closest("a, button, label, input, textarea, [data-cursor]");
      setLabel(labelled?.getAttribute("data-cursor") ?? "");
      ring.dataset.state = labelled ? "label" : interactive ? "hover" : "idle";

      const nextMagnetic = target?.closest("[data-magnetic]");
      if (nextMagnetic !== magnetic) releaseMagnetic();
      if (nextMagnetic) {
        magnetic = nextMagnetic;
        const bounds = nextMagnetic.getBoundingClientRect();
        const offsetX = event.clientX - (bounds.left + bounds.width / 2);
        const offsetY = event.clientY - (bounds.top + bounds.height / 2);
        gsap.to(nextMagnetic, { x: offsetX * 0.3, y: offsetY * 0.35, duration: 0.4 });
      }
    };

    const handleLeave = () => {
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
      releaseMagnetic();
    };
    const handleDown = () => gsap.to(ring, { scale: 0.8, duration: 0.15 });
    const handleUp = () => gsap.to(ring, { scale: 1, duration: 0.3 });

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerleave", handleLeave);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" data-state="idle">
        <span className="cursor-label">{label}</span>
      </div>
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" />
    </>
  );
}

export default Cursor;
