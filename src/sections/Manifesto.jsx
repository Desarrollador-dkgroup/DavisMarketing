import { useRef, useEffect } from "react";
import { Sparkles, Zap, Flame, Rocket } from "lucide-react";

const PILLARS = [
  {
    id: "01",
    title: "INNOVACIÓN",
    subtitle: "Rompemos moldes",
    desc: "No seguimos tendencias, las creamos. Tu marca merece estar a la vanguardia visual.",
    Icon: Sparkles,
    color: "from-[#AAC551] to-[#6b8129]",
    shadow: "rgba(170, 197, 81, 0.4)",
  },
  {
    id: "02",
    title: "VELOCIDAD",
    subtitle: "Impacto inmediato",
    desc: "Capturamos la atención en los primeros 3 segundos. Diseños optimizados para la era del scroll.",
    Icon: Zap,
    color: "from-[#1C3D72] to-[#112444]",
    shadow: "rgba(170, 197, 81, 0.4)",
  },
  {
    id: "03",
    title: "PASIÓN",
    subtitle: "Energía creativa",
    desc: "Cada pixel y cada frame están cargados de intención, fuerza y estrategia pura.",
    Icon: Flame,
    color: "from-[#FF4500] to-[#8b2500]",
    shadow: "rgba(170, 197, 81, 0.4)",
  },
  {
    id: "04",
    title: "CONVERSIÓN",
    subtitle: "Resultados reales",
    desc: "No solo creamos arte visual, construimos motores estéticos que generan ventas reales.",
    Icon: Rocket,
    color: "from-[#9D4EDD] to-[#4c1d7a]",
    shadow: "rgba(170, 197, 81, 0.4)",
  },
];

export default function Manifesto() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const cards = containerRef.current.querySelectorAll(".manifesto-card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen bg-transparent py-15 px-6 sm:px-12 lg:px-24 overflow-hidden font-sans">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#AAC551]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-24 text-center">
          <h2 className="text-5xl sm:text-7xl lg:text-[7rem] font-extrabold leading-[0.85] 
          tracking-tighter text-white uppercase group cursor-default">
            <span className="block pt-4 text-transparent bg-clip-text bg-gradient-to-r 
            from-white via-white/90 to-white/30 transition-all duration-500 group-hover:scale-[1.02]">
              Diseñamos
            </span>
            <span className="block mt-2 italic font-sans text-[#AAC551] tracking-normal 
            transition-all duration-500 group-hover:-rotate-2 group-hover:scale-[1.05]">
              el futuro
            </span>
          </h2>
        </div>

        {/* Interactive Glowing Cards Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 group/container"
        >
          {PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="manifesto-card relative overflow-hidden bg-black/40 border border-white/10 rounded-3xl p-8 lg:p-12 transition-all duration-500 hover:border-white/30 hover:scale-[1.02] hover:-translate-y-2"
              style={{
                boxShadow: `0 0 0 rgba(0,0,0,0)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 60px ${pillar.shadow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 rgba(0,0,0,0)`;
              }}
            >

              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/container:opacity-100 pointer-events-none -z-10"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)`
                }}
              />

              <div className="relative z-10 flex  h-full justify-between">
                <div className="flex justify-between items-start mb-16 mr-5">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${pillar.color} shadow-lg`}>
                    <pillar.Icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                </div>

                <div>
                  <h4 className="text-[#AAC551] font-sans text-sm tracking-widest uppercase mb-3">
                    {pillar.subtitle}
                  </h4>
                  <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 uppercase tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-white/60 text-lg leading-relaxed font-medium">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section >
  );
}
