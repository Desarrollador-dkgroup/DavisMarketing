import { useEffect, useState } from "react";
import CinematicHeroScene from "../components/CinematicHeroScene";

function HeroCinematic() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(motionPreference.matches);

    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);
    return () => motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  return (
    <section
      id="inicio"
      aria-label="Davis Marketing: desarrollo y producción"
      className={`cinematic-hero relative min-h-screen overflow-hidden bg-transparent font-sans text-white ${reducedMotion ? "cinematic-reduced-motion" : ""}`}
    >
      <div aria-hidden="true" className="absolute inset-0" />
      <div className="absolute inset-0 [filter:drop-shadow(0px_20px_30px_rgba(0,0,0,0.2))_drop-shadow(0px_8px_12px_rgba(0,0,0,0.75))]">
        <CinematicHeroScene reducedMotion={reducedMotion} />
      </div>

      <div aria-hidden="true" className=" pointer-events-none absolute inset-0 z-10" />

      <div className="cinematic-brand-copy pointer-events-none absolute inset-x-0 top-[64%] z-20 px-5 text-center sm:top-[66%]">
        <p className="cinematic-brand-name text-[clamp(3rem,5vw,4.6rem)] font-extrabold leading-none tracking-[0.035em] text-[#1C3D72]">
          DAVIS MARKETING
        </p>
        <p className="cinematic-brand-subtitle  mt-2 text-[clamp(2rem,2.9vw,2.9rem)] font-normal leading-none tracking-[0.08em] text-[#1C3D72]">
          DESARROLLO &amp; PRODUCCIÓN
        </p>
      </div>


    </section>
  );
}

export default HeroCinematic;
