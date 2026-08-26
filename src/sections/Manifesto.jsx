import { useEffect, useRef, useState } from "react";
import { Sparkles, Zap, Flame, Rocket } from "lucide-react";

const PILLARS = [
    {
        id: "01",
        title: "INNOVACIÓN",
        subtitle: "ROMPEMOS MOLDES",
        desc: "No seguimos tendencias, las creamos. Tu marca merece estar a la vanguardia visual.",
        Icon: Sparkles,
        accent: "#AAC551",
    },
    {
        id: "02",
        title: "VELOCIDAD",
        subtitle: "IMPACTO INMEDIATO",
        desc: "Capturamos la atención en los primeros 3 segundos. Diseños optimizados para la era del scroll.",
        Icon: Zap,
        accent: "#1C3D72",
    },
    {
        id: "03",
        title: "PASIÓN",
        subtitle: "ENERGÍA CREATIVA",
        desc: "Cada pixel y cada frame están cargados de intención, fuerza y estrategia pura.",
        Icon: Flame,
        accent: "#1C3D72",
    },
    {
        id: "04",
        title: "CONVERSIÓN",
        subtitle: "RESULTADOS REALES",
        desc: "No solo creamos arte visual, construimos motores estéticos que generan ventas reales.",
        Icon: Rocket,
        accent: "#AAC551",
    },
];

export default function Manifesto() {
    const containerRef = useRef(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
        const updateTouchState = () => setIsTouchDevice(mediaQuery.matches);
        updateTouchState();

        const container = containerRef.current;
        if (!container) {
            mediaQuery.addEventListener("change", updateTouchState);
            return () => mediaQuery.removeEventListener("change", updateTouchState);
        }

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            container.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
            container.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        };

        container.addEventListener("mousemove", handleMouseMove);
        mediaQuery.addEventListener("change", updateTouchState);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            mediaQuery.removeEventListener("change", updateTouchState);
        };
    }, []);

    return (
        <section id="manifesto" className="relative isolate overflow-hidden bg-white px-6 py-24 font-sans sm:px-10 lg:px-16 xl:px-24">
            <style>
                {`
                    @keyframes lineMove {
                        0% { transform: translateX(-120%); }
                        100% { transform: translateX(320%); }
                    }
                    @keyframes manifesto-float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-6px); }
                    }
                `}
            </style>
            {/* Background */}
            <div aria-hidden="true" className="absolute inset-0 -z-20 opacity-[0.45] bg-[linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:80px_80px]" />
            <div aria-hidden="true" className="absolute left-1/2 top-[42%] -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#AAC551]/10 blur-[160px]" />
            <div className="mx-auto max-w-[1450px]">
                {/* Title */}
                <div className="mb-10 flex justify-center text-center">
                    <h2 className="group cursor-default text-5xl font-black uppercase leading-[0.85] tracking-[-0.06em] sm:text-6xl lg:text-[5.4rem]">

                        <span className="block text-black transition-transform duration-500 group-hover:scale-[1.02]">
                            Diseñamos
                        </span>

                        <span className={`mt-3 block italic tracking-[-0.03em] text-[#AAC551] transition-transform duration-500 ${isTouchDevice ? "-rotate-2 scale-[1.04]" : "group-hover:-rotate-2 group-hover:scale-[1.04]"}`}>
                            el futuro
                        </span>

                    </h2>
                </div>

                {/* Board */}
                <div ref={containerRef} className="group/board relative overflow-hidden bg-[#101010] shadow-[0_40px_100px_rgba(0,0,0,0.18)]"
                    style={{ clipPath: "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)" }}>

                    {/* Mouse glow */}
                    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${isTouchDevice ? "opacity-100" : "opacity-0 group-hover/board:opacity-100"}`}
                        style={{ background: "radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.07), transparent 45%)" }}
                    />

                    {/* Board header */}
                    <div className="relative z-20 flex items-center justify-center border-b border-white/10 px-8 py-5 sm:px-10">

                        <div className="flex items-center gap-3 ">
                            <span className="h-2 w-2 rounded-full bg-[#AAC551]" />

                            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45 sm:text-xs">
                                Davis Marketing
                            </span>
                        </div>

                      

                    </div>

                    {/* Pillars */}
                    <div className="relative z-10 grid md:grid-cols-2">

                        {PILLARS.map((pillar, index) => {
                            const Icon = pillar.Icon;

                            return (
                                <article
                                    key={pillar.id}
                                    className={`group/item relative min-h-[30px] overflow-hidden border-white/10 p-8 transition-all duration-500 sm:p-5 lg:h-[280px] lg:p-5 ${index === 0 ? "border-b md:border-r" : ""} ${index === 1 ? "border-b" : ""} ${index === 2 ? "border-b md:border-b-0 md:border-r" : ""}`}
                                    style={{ "--accent": pillar.accent }}
                                >

                                    {/* Accent glow */}
                                    <div
                                        aria-hidden="true"
                                        className={`absolute -right-32 -top-32 h-[320px] w-[320px] rounded-full blur-[100px] transition-all duration-700 ${isTouchDevice ? "scale-110 opacity-25" : "scale-75 opacity-0 group-hover/item:scale-110 group-hover/item:opacity-25"}`}
                                        style={{ backgroundColor: pillar.accent }}
                                    />

                                    {/* Left line */}
                                    <span
                                        className={`absolute left-0 top-1/2 w-[3px] -translate-y-1/2 transition-all duration-500 ${isTouchDevice ? "h-[55%]" : "h-0 group-hover/item:h-[55%]"}`}
                                        style={{ backgroundColor: pillar.accent, boxShadow: `0 0 25px ${pillar.accent}` }}
                                    />

                                    {/* Big number */}
                                    <span
                                        aria-hidden="true"
                                        className={`absolute -right-2 -top-8 select-none text-[10rem] font-black leading-none tracking-tighter text-white/[0.025] transition-all duration-700 lg:text-[13rem] ${isTouchDevice ? "-translate-x-4 translate-y-3 text-white/[0.06]" : "group-hover/item:-translate-x-4 group-hover/item:translate-y-3 group-hover/item:text-white/[0.06]"}`}
                                    >
                                        {pillar.id}
                                    </span>

                                    {/* Content */}
                                    <div className="relative z-10 flex h-full flex-col">

                                        <div className="flex items-start justify-between">

                                            {/* Icon */}
                                            <div
                                                className={`relative flex h-[68px] w-[68px] items-center justify-center overflow-hidden border border-white/10 bg-white/[0.04] transition-all duration-500 ${isTouchDevice ? "border-transparent" : "group-hover/item:border-transparent"}`}
                                                style={{ clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" }}
                                            >
                                                <div
                                                    className={`absolute inset-0 transition-transform duration-500 ${isTouchDevice ? "translate-y-0" : "translate-y-full group-hover/item:translate-y-0"}`}
                                                    style={{ backgroundColor: pillar.accent }}
                                                />

                                                <Icon
                                                    className={`relative z-10 h-7 w-7 text-white transition-transform duration-500 ${isTouchDevice ? "rotate-[-10deg] scale-110" : "group-hover/item:rotate-[-10deg] group-hover/item:scale-110"}`}
                                                    strokeWidth={1.8}
                                                />
                                            </div>
                                        </div>
                                        {/* Text */}
                                        <div className="">
                                            <h3 className={`mb-4 text-3xl font-black uppercase tracking-[-0.04em] text-white transition-transform duration-500 sm:text-4xl ${isTouchDevice ? "translate-x-1" : "group-hover/item:translate-x-1"}`}>
                                                {pillar.title}
                                            </h3>
                                            <p className={`max-w-[460px] text-sm font-medium leading-7 text-white/45 transition-colors duration-500 sm:text-base ${isTouchDevice ? "text-white/70" : "group-hover/item:text-white/70"}`}>
                                                {pillar.desc}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Bottom animated line */}
                                    <div
                                        className={`absolute bottom-0 left-0 h-[2px] w-full transition-transform duration-500 ${isTouchDevice ? "scale-x-100" : "scale-x-0 group-hover/item:scale-x-100"}`}
                                        style={{
                                            background: `linear-gradient(90deg, transparent, ${pillar.accent}, transparent)`,
                                            transformOrigin: "center",
                                        }}
                                    >
                                        <span
                                            className="absolute inset-y-0 left-0 w-[25%]"
                                            style={{
                                                background: "linear-gradient(90deg, transparent, white, transparent)",
                                                animation: "lineMove 2.5s linear infinite",
                                            }}
                                        />
                                    </div>

                                </article>
                            );
                        })}

                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-9 flex justify-center gap-6 sm:flex-row sm:items-center">

                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                        style={{ animation: "manifesto-float 3s ease-in-out infinite" }}
                    >
                        <Zap className="h-5 w-5 fill-[#AAC551] text-[#AAC551]" strokeWidth={2} />
                    </div>

                    <p className="text-xs font-medium uppercase tracking-[0.23em] text-black/70 sm:text-sm">
                        Ideas que impactan. Diseños que convierten.
                    </p>

                </div>
            </div>
        </section>
    );
}
