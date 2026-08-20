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
      <div className="absolute inset-0 ">

        <CinematicHeroScene reducedMotion={reducedMotion} />
      </div>

      <div aria-hidden="true" className=" pointer-events-none absolute inset-0 z-10" />

      <div className="cinematic-brand-copy pointer-events-none absolute inset-x-0 mt-[-30px] 
      md:mt-0 md:t-[-30px] md:top-[64%] z-20 px-5 text-center "> {/* cinematic-brand-copy */}
        <p className="cinematic-brand-name text-[clamp(2rem,9vw,4rem)] md:text-[clamp(3rem,5vw,4.6rem)] 
        font-extrabold leading-none tracking-[0.035em] text-F4F4F4"> {/* cinematic-brand-name */}
          DAVIS MARKETING
        </p>
        <p className="cinematic-brand-subtitle  mt-2 text-[clamp(1.3rem,5vw,6rem)] 
        md:text-[clamp(2rem,2.9vw,2.9rem)] font-normal leading-none tracking-[0.08em] text-F4F4F4"> {/* cinematic-brand-subtitle */}
          DESARROLLO &amp; PRODUCCIÓN
        </p>
      </div>


    </section>
  );
}

export default HeroCinematic;
