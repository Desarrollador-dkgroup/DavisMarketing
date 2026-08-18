import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, BadgeCheck, Play, Target, Waypoints } from "lucide-react";

const creativeCards = [
  {
    name: "ESTRATEGIA",
    caption: "Dirección clara",
    Icon: Target,
    rotation: "-7deg",
    position: "lg:left-[4%] lg:top-[17%]",
  },
  {
    name: "IDENTIDAD",
    caption: "Una marca propia",
    Icon: BadgeCheck,
    rotation: "2deg",
    position: "lg:left-1/2 lg:top-[27%] lg:-translate-x-1/2",
  },
  {
    name: "CONTENIDO",
    caption: "Ideas que conectan",
    Icon: Play,
    rotation: "-4deg",
    position: "lg:right-[3%] lg:top-[15%]",
  },
];

function CreativeBridge() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (event) => {
    if (event.pointerType !== "mouse" || !stageRef.current) return;

    const bounds = stageRef.current.getBoundingClientRect();
    const horizontalPosition = (event.clientX - bounds.left) / bounds.width - 0.5;
    const verticalPosition = (event.clientY - bounds.top) / bounds.height - 0.5;

    stageRef.current.style.setProperty("--bridge-tilt-x", `${verticalPosition * -7}deg`);
    stageRef.current.style.setProperty("--bridge-tilt-y", `${horizontalPosition * 9}deg`);
  };

  const resetPointerTilt = () => {
    stageRef.current?.style.setProperty("--bridge-tilt-x", "0deg");
    stageRef.current?.style.setProperty("--bridge-tilt-y", "0deg");
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="creative-bridge-title"
      className={`creative-bridge relative isolate min-h-screen overflow-hidden bg-transparent px-6 py-24 font-sans text-white sm:px-10 lg:px-16 xl:px-24 ${isVisible ? "creative-bridge-visible" : ""}`}
    >
      <div aria-hidden="true" className="creative-bridge-grid absolute inset-0 -z-20" />
      <div aria-hidden="true" className="absolute left-[8%] top-[18%] -z-10 h-48 w-48 rounded-full bg-[#AAC551]/10 blur-[100px]" />
      <div aria-hidden="true" className="absolute bottom-[15%] right-[9%] -z-10 h-56 w-56 rounded-full bg-[#1C3D72]/25 blur-[110px]" />

      <div className="relative mx-auto max-w-[1440px]">
        <div className="creative-bridge-eyebrow inline-flex items-center gap-3 border border-[#AAC551]/45 px-4 py-2 text-[11px] font-bold tracking-[0.28em] text-[#AAC551] sm:text-xs">
          <Waypoints aria-hidden="true" className="h-4 w-4" strokeWidth={1.7} />
          IMPULSAMOS MARCAS
        </div>

        <h2
          id="creative-bridge-title"
          className="creative-bridge-title pointer-events-none mt-6 text-[16vw] font-extrabold leading-[0.72] tracking-[-0.075em] sm:text-[14vw] lg:text-[10.7rem] xl:text-[12rem]"
        >
          <span className="block">IDEAS QUE</span>
          <span className="creative-bridge-outline block text-right">SE MUEVEN</span>
        </h2>

        <div
          ref={stageRef}
          className="creative-bridge-stage relative z-10 mt-10 grid gap-5 lg:-mt-14 lg:h-[460px] lg:block"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointerTilt}
        >
          <div aria-hidden="true" className="creative-signal absolute left-0 right-0 top-1/2 hidden lg:block">
            <span className="creative-signal-node creative-signal-node-one" />
            <span className="creative-signal-node creative-signal-node-two" />
            <span className="creative-signal-node creative-signal-node-three" />
          </div>

          {creativeCards.map(({ name, caption, Icon, rotation, position }, index) => (
            <article
              key={name}
              className={`creative-card ${position} relative z-10 min-h-52 overflow-hidden border border-white/25 bg-[#070808]/95 p-5 shadow-[0_26px_70px_rgba(0,0,0,0.75)] backdrop-blur-md lg:absolute lg:w-[31%] lg:min-h-64 ${index === 1 ? "creative-card-blue" : ""}`}
              style={{ "--creative-card-rotation": rotation, animationDelay: `${index * 140}ms` }}
            >
              <div className="flex items-center justify-between border-b border-white/12 pb-4">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#AAC551]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#AAC551]/60" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-white/35">0{index + 1}</span>
              </div>

              <div className="relative grid min-h-32 place-items-center">
                <div aria-hidden="true" className="creative-card-orbit absolute h-28 w-28 rounded-full border border-[#AAC551]/50" />
                <div className="relative grid h-14 w-14 place-items-center border border-[#AAC551]/70 bg-[#AAC551]/10 text-[#AAC551]">
                  <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={1.5} />
                </div>
              </div>

              <div className="flex items-end justify-between gap-4">
                <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{name}</h3>
                <p className="max-w-24 text-right text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">{caption}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="creative-bridge-footer mt-10 flex flex-col gap-6 border-t border-white/12 pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-0">

          <a
            href="#proyectos"
            className="group inline-flex w-fit items-center gap-3 text-sm font-bold tracking-[0.14em] text-[#AAC551] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#AAC551]"
          >
            VER PROYECTOS
            <ArrowDownRight aria-hidden="true" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default CreativeBridge;
