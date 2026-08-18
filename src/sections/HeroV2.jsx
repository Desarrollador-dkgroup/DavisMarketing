import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import HeroScene from "../components/HeroScene";

const changingWords = ["CONECTAN", "INSPIRAN", "CRECEN", "MEJORAN"];
const services = ["ESTRATEGIA", "IDENTIDAD", "CONTENIDO", "DESARROLLO"];

function HeroV2() {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  useEffect(() => {
    const wordInterval = window.setInterval(() => {
      setActiveWordIndex((currentIndex) => (currentIndex + 1) % changingWords.length);
      setActiveServiceIndex((currentIndex) => (currentIndex + 1) % services.length);
    }, 2600);

    return () => window.clearInterval(wordInterval);
  }, []);

  return (
    <section
      id="inicio"
      aria-labelledby="hero-v2-title"
      className="hero-v2 hero-interactive relative min-h-screen overflow-hidden bg-[#050606] font-sans text-white"
    >
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      <div aria-hidden="true" className="hero-v2-vignette pointer-events-none absolute inset-0 z-10" />
      <div aria-hidden="true" className="hero-v2-grid pointer-events-none absolute inset-0 z-10" />

      <div className="pointer-events-none relative z-20 mx-auto min-h-screen max-w-[1600px] px-6 pb-10 pt-24 sm:px-10 lg:px-16 xl:px-24">
        <div className="hero-v2-copy max-w-[650px] pt-[4vh] sm:pt-[7vh] lg:pt-[9vh]">
          <p className="mb-5 flex items-center gap-3 text-[10px] font-bold tracking-[0.23em] text-[#AAC551] sm:text-xs">
            <span aria-hidden="true" className="h-px w-10 bg-[#AAC551]" />
            DAVIS MARKETING · IDEAS EN MOVIMIENTO
          </p>

          <h1
            id="hero-v2-title"
            className="text-[clamp(2.4rem,5.2vw,5.4rem)] font-extrabold leading-[0.9] tracking-[-0.055em]"
          >
            <span className="block text-white/92">CREAMOS</span>
            <span className="block text-white/92">MARCAS QUE</span>
            <span
              key={changingWords[activeWordIndex]}
              aria-live="polite"
              className="hero-v2-changing-word mt-2 block text-[#AAC551]"
            >
              {changingWords[activeWordIndex]}
            </span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-6 text-white/58 sm:text-base sm:leading-7">
            Estrategia, diseño y desarrollo para convertir una buena idea en una marca imposible de ignorar.
          </p>

          <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
            <a
              href="#proyectos"
              className="group inline-flex items-center gap-3 bg-[#AAC551] px-5 
              py-3 text-xs font-extrabold tracking-[0.1em] text-black transition 
              duration-300 hover:bg-white focus:outline-none focus-visible:ring-2 
              focus-visible:ring-[#AAC551] focus-visible:ring-offset-2 focus-visible:ring-offset-black 
              sm:px-6 sm:py-4 sm:text-sm"
            >
              VER PROYECTOS
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contacto"
              className="group inline-flex items-center gap-3 border border-white/35 bg-black/20 px-5 py-3 text-xs font-bold tracking-[0.1em] text-white backdrop-blur-sm transition duration-300 hover:border-[#AAC551] hover:text-[#AAC551] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#AAC551] sm:px-6 sm:py-4 sm:text-sm"
            >
              HABLEMOS
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <div className="hero-v2-services absolute right-6 top-1/2 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-end lg:gap-5 xl:right-24">
          {services.map((service, index) => (
            <div key={service} className="flex items-center gap-3">
              <span className="text-[15px] font-bold tracking-[0.2em] text-white/45">{service}</span>
              <span
                aria-hidden="true"
                className={`h-px bg-[#AAC551] transition-all duration-500 ${index === activeServiceIndex ? "w-14 opacity-100" : "w-7 opacity-35"}`}
              />
            </div>
          ))}
        </div>

        <div className="hero-v2-footer absolute inset-x-6 bottom-7 flex items-end justify-between sm:inset-x-10 lg:inset-x-16 xl:inset-x-24">
          <a
            href="#nosotros"
            className="pointer-events-auto group flex items-center gap-3 text-[9px] font-bold tracking-[0.2em] text-white/45 transition hover:text-[#AAC551] focus:outline-none focus-visible:text-[#AAC551] sm:text-[10px]"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition group-hover:border-[#AAC551]">
              <ArrowDown aria-hidden="true" className="h-4 w-4 animate-bounce" />
            </span>
            DESLIZA PARA DESCUBRIR
          </a>

          <div className="hidden text-right sm:block">
            <p className="text-lg font-extrabold tracking-[0.2em] text-[#AAC551]">DAVIS MARKETING</p>
            <p className="mt-1 text-[13px] font-light tracking-[0.32em] text-white/55">DESARROLLO &amp; PRODUCCIÓN</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroV2;
