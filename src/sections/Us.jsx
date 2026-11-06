import { useEffect, useRef } from "react";
import { BarChart3, Megaphone, MessageSquareText, UsersRound } from "lucide-react";
import { gsap, revealOnScroll, useReducedMotion } from "../lib/motion";

const marketingStages = [
  {
    number: "01",
    name: "AUDIENCIA",
    title: "Entender",
    description: "Descubrimos a quién debe hablarle tu marca y qué necesita escuchar.",
    Icon: UsersRound,
  },
  {
    number: "02",
    name: "CONTENIDO",
    title: "Conectar",
    description: "Convertimos la estrategia en mensajes y experiencias con identidad.",
    Icon: MessageSquareText,
  },
  {
    number: "03",
    name: "CAMPAÑAS",
    title: "Activar",
    description: "Llevamos cada idea a los canales correctos con una ejecución coherente.",
    Icon: Megaphone,
  },
  {
    number: "04",
    name: "RESULTADOS",
    title: "Crecer",
    description: "Medimos lo que funciona, aprendemos y optimizamos el siguiente movimiento.",
    Icon: BarChart3,
  },
];

function Us() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return undefined;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      // Escritorio: la sección se queda fija y el scroll recorre las cuatro etapas.
      media.add("(min-width: 1024px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=1600",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });
        timeline.fromTo(".us-progress", { scaleY: 0 }, { scaleY: 1, ease: "none", duration: 4 }, 0);
        gsap.utils.toArray(".marketing-stage", section).forEach((stage, index) => {
          timeline
            .fromTo(stage, { autoAlpha: 0.18, x: 40 }, { autoAlpha: 1, x: 0, duration: 0.6 }, index)
            .add(() => stage.classList.toggle("is-active", timeline.scrollTrigger.direction > 0), index + 0.3)
            .fromTo(
              `.us-chip-${index}`,
              { backgroundColor: "rgba(0,0,0,0)", color: "rgba(0,0,0,0.9)" },
              { backgroundColor: "#AAC551", color: "#000", duration: 0.4 },
              index + 0.2,
            );
        });
      });

      // Móvil: cada etapa entra al aparecer en pantalla.
      media.add("(max-width: 1023px)", () => {
        const undo = gsap.utils
          .toArray(".marketing-stage", section)
          .map((stage) => revealOnScroll(stage, { start: "top 90%" }));
        return () => undo.forEach((callback) => callback());
      });

      return revealOnScroll(".us-title-line", { trigger: section, start: "top 70%", stagger: 0.12 });
    }, section);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      aria-labelledby="nosotros-title"
      className="relative isolate overflow-hidden bg-[#F4F4F4] px-6 py-20 font-sans text-white
      sm:px-10 lg:flex lg:min-h-screen lg:items-center lg:px-16 lg:py-10 xl:px-24"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute left-[6%] top-20 h-44 w-44 rounded-full bg-[#1C3D72]/20 blur-[90px]" />
        <div className="absolute bottom-10 right-[8%] h-52 w-52 rounded-full bg-[#AAC551]/15 blur-[100px]" />
        <div className="marketing-grid absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px]">
        <div className="grid gap-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-20">
          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-[#7E9A22]">
              <span className="h-px w-11 bg-[#AAC551]" aria-hidden="true" />
              NUESTRA FORMA DE TRABAJAR
            </div>
            <h2
              id="nosotros-title"
              className="text-4xl font-bold leading-[1.08] tracking-tight text-black/90 sm:text-5xl xl:text-6xl"
            >
              <span className="block overflow-hidden pb-1">
                <span className="us-title-line block">No hacemos ruido</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="us-title-line block text-[#8DAA2F]">Creamos impacto</span>
              </span>
            </h2>

            <span aria-hidden="true" className="my-8 block h-px w-16 bg-black/90" />
            <p className="text-base leading-8 text-black/80 sm:text-lg">
              Diseñamos estrategias de marketing que convierten atención en conexión,
              y conexión en resultados para tu marca.
            </p>

            <div className="mt-10 flex flex-wrap gap-y-2 text-[10px] font-bold tracking-[0.16em] md:gap-2 md:text-[11px]">
              {marketingStages.map((stage, index) => (
                <div key={stage.name} className="flex items-center md:gap-2">
                  <span className={`us-chip-${index} rounded-full border border-black/90 px-3 py-2 text-black/90`}>
                    {stage.title.toUpperCase()}
                  </span>
                  {index < marketingStages.length - 1 && (
                    <span aria-hidden="true" className="px-1 text-black/90">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative p-4 sm:p-7">
            <div className="flex items-center justify-between border-b border-black/10 pb-5">
              <p className="text-[20px] font-bold text-black/90">De una idea a una marca que avanza</p>
              <span className="hidden text-[11px] font-semibold tracking-[0.2em] text-black/40 lg:block">
                SIGUE BAJANDO ↓
              </span>
            </div>

            <ol className="relative mt-5 space-y-3">
              <span
                aria-hidden="true"
                className="absolute bottom-3 left-[15px] top-3 w-px bg-black/10 sm:left-[19px]"
              />
              <span
                aria-hidden="true"
                className="us-progress absolute bottom-3 left-[15px] top-3 w-[3px] -translate-x-px
                origin-top bg-gradient-to-b from-[#AAC551] via-[#3B82F6] to-[#AAC551]
                shadow-[0_0_14px_rgba(170,197,81,0.7)] sm:left-[19px]"
              />
              {marketingStages.map(({ number, name, title, description, Icon }, index) => (
                <li
                  key={name}
                  className={`marketing-stage group relative z-10 ml-10 rounded-md border border-white/15
                  bg-black/85 px-4 py-4 transition-[border-color,box-shadow] duration-500
                  hover:border-[#AAC551]/70 sm:ml-14 sm:px-5 ${index % 2 === 1 ? "sm:ml-[5.25rem]" : ""}`}
                >
                  <span
                    className="stage-number absolute -left-10 top-1/2 grid h-8 w-8 -translate-y-1/2
                    place-items-center rounded-full border border-[#AAC551] bg-black text-[10px]
                    font-bold text-[#AAC551] transition-colors duration-500 sm:-left-14"
                  >
                    {number}
                  </span>
                  <div className="flex items-start gap-4">
                    <div
                      className="stage-icon grid h-11 w-11 shrink-0 place-items-center rounded border
                      border-[#1C3D72] bg-[#1C3D72]/20 text-[#AAC551] transition-colors duration-500
                      group-hover:bg-[#AAC551] group-hover:text-black"
                    >
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-lg font-bold">{title}</h3>
                        <span className="text-[10px] font-bold tracking-[0.18em] text-[#AAC551]">{name}</span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-white/60">{description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Us;
