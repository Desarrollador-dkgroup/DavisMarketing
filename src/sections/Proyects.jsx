import { useState } from "react";
import { ArrowRight, FolderOpen } from "lucide-react";

import PanamaViajero from "./proyects/PanamaViajero";
import ExpoEducate from "./proyects/Expoeducate";
import PalaU from "./proyects/PalaU";

const projects = [
    {
        id: "panama-viajero",
        name: "Panamá Viajero",
        category: "Turismo digital",
        Component: PanamaViajero,
    },
    {
        id: "expo-educate",
        name: "Expo Edúcate",
        category: "Educación superior",
        Component: ExpoEducate,
    },
    {
        id: "pa-la-u",
        name: "Pa' la U",
        category: "Educación",
        Component: PalaU,
    },
];

function Proyects() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState("right");
    const [animationKey, setAnimationKey] = useState(0);

    const selectProject = (nextIndex) => {
        if (nextIndex === activeIndex) return;

        setDirection(nextIndex < activeIndex ? "left" : "right");
        setActiveIndex(nextIndex);
        setAnimationKey((currentKey) => currentKey + 1);
    };

    const activeProject = projects[activeIndex];
    const ActiveProject = activeProject.Component;

    return (
        <section id="proyectos" aria-labelledby="projects-title" className="relative isolate min-h-screen
        scroll-mt-[-90px] overflow-hidden bg-black px-6 py-24 font-sans text-white
        sm:px-10 lg:px-16 xl:px-24">
            <div aria-hidden="true" className="absolute inset-0 -z-20
            bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]
            bg-[size:72px_72px]" />
            <div aria-hidden="true" className="absolute -right-24 top-24 -z-10 h-[450px] w-[450px] rounded-full bg-[#1C3D72]/20 blur-[140px]" />
            <div aria-hidden="true" className="absolute -left-40 top-[400px] -z-10
            h-[400px] w-[400px] rounded-full bg-[#AAC551]/10 blur-[160px]" />
            <div className="mx-auto max-w-[1440px]">
                <header className="max-w-[670px]">
                    <p className="mb-3 flex items-center gap-3 text-xs font-bold tracking-[0.2em]
                    text-[#AAC551] sm:text-sm">
                        <span aria-hidden="true" className="h-px w-10 bg-[#AAC551]" />
                        NUESTRO TRABAJO
                    </p>
                    <div>
                        <h2 id="projects-title" className="text-4xl font-bold leading-[1.05]
                        tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                            Proyectos que <br /> <span className="text-[#AAC551]">inspiran</span>
                        </h2>
                        <span aria-hidden="true" className="mb-6 mt-5 block h-[3px]
                        w-20 bg-[#AAC551]" />
                    </div>
                    <p className="max-w-[620px] text-base leading-8 text-white/75
                    sm:text-lg lg:text-xl">
                        Diseñamos estrategias de marketing que convierten atención
                        en conexión, y conexión en resultados para tu marca.
                    </p>
                </header>
                {/* Selector de proyectos */}
                <div className="mt-10">
                    <div className="mb-5 flex items-center gap-3">
                        <FolderOpen size={18} strokeWidth={1.8} className="text-[#AAC551]" />
                        <span className="whitespace-nowrap text-xs font-bold uppercase
                        tracking-[0.18em] text-[#AAC551] sm:text-sm">
                            Conoce nuestros proyectos
                        </span>
                        <span aria-hidden="true" className="h-px w-full max-w-40
                        bg-[#AAC551]/40" />
                    </div>
                    <nav aria-label="Seleccionar proyecto">
                        <div className="grid max-w-8xl grid-cols-1 gap-4 sm:grid-cols-3">
                            {projects.map((project, index) => {
                                const isActive = index === activeIndex;
                                return (
                                    <button
                                        key={project.id}
                                        type="button"
                                        aria-pressed={isActive}
                                        onClick={() => selectProject(index)}
                                        className={`group relative min-h-[100px] cursor-pointer overflow-hidden
                                        rounded-[24px] border p-6 text-left transition-all duration-500
                                        ${isActive
                                            ? "border-[#AAC551] bg-[#AAC551]/10 shadow-[0_0_35px_rgba(170,197,81,0.08)]"
                                            : "border-white/15 bg-white/[0.025] hover:-translate-y-1 hover:border-[#AAC551]/50 hover:bg-white/[0.05]"
                                        }`}
                                    >
                                        <div aria-hidden="true" className={`pointer-events-none absolute
                                        -left-20 -top-20 h-52 w-52 rounded-full blur-[70px]
                                        transition-opacity duration-500
                                        ${isActive
                                            ? "bg-[#AAC551]/20 opacity-100"
                                            : "bg-[#AAC551]/10 opacity-0 group-hover:opacity-100"
                                        }`} />
                                        {/* Textp */}
                                        <div className="relative z-10 flex h-full items-start
                                        justify-between gap-5">
                                            <div>
                                                <h3 className="max-w-[220px] text-xl font-bold
                                                leading-tight text-white sm:text-2xl">
                                                    {project.name}
                                                </h3>
                                                <p className={`mt-3 text-xs font-bold uppercase
                                                tracking-[0.1em] transition-colors duration-300
                                                ${isActive
                                                    ? "text-[#AAC551]"
                                                    : "text-white/45 group-hover:text-white/70"
                                                }`}>
                                                    {project.category}
                                                </p>
                                            </div>
                                            {/* Flecha */}
                                            <div className={`flex h-11 w-11 shrink-0 items-center
                                            justify-center self-end rounded-full border
                                            transition-all duration-300
                                            ${isActive
                                                ? "border-[#AAC551] bg-[#AAC551] text-black"
                                                : "border-white/15 bg-white/5 text-white/60 group-hover:border-[#AAC551] group-hover:bg-[#AAC551] group-hover:text-black"
                                            }`}>
                                                <ArrowRight size={20} strokeWidth={2}
                                                    className="transition-transform duration-300
                                                    group-hover:translate-x-0.5"
                                                />
                                            </div>
                                        </div>
                                        <span aria-hidden="true" className={`absolute bottom-0
                                        left-0 h-[3px] bg-[#AAC551] transition-all duration-500
                                        ${isActive
                                            ? "w-full"
                                            : "w-0 group-hover:w-full"
                                        }`} />
                                    </button>
                                );
                            })}
                        </div>
                    </nav>
                </div>
                <div
                    key={`${activeProject.id}-${animationKey}`}
                    className={`mt-10 ${direction === "left"
                        ? "project-enter-left"
                        : "project-enter-right"
                    }`}
                >
                    <ActiveProject />
                </div>

            </div>
        </section>
    );
}

export default Proyects;