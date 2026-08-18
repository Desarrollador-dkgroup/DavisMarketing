import { useState } from "react";
import PanamaViajero from "./proyects/PanamaViajero";
import ExpoEducate from './proyects/Expoeducate'
/* import PalaU from './proyects/PalaU' */



const projects = [
    {
        id: "panama-viajero",
        name: "Panamá Viajero",
        Component: PanamaViajero,
    },
    {
        id: "expo-educate",
        name: "Expo Edúcate Superior",
        Component: ExpoEducate,
    },
    /* {
        id: "pa-la-u",
        name: "Pa' la U",
        Component: PalaU,
    }, */
];

function Proyects() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState("right");
    const [animationKey, setAnimationKey] = useState(0);

    const selectProject = (nextIndex) => {
        setDirection(nextIndex < activeIndex ? "left" : "right");
        setActiveIndex(nextIndex);
        setAnimationKey((currentKey) => currentKey + 1);
    };

    const activeProject = projects[activeIndex];
    const ActiveProject = activeProject.Component;

    return (
        <section
            id="proyectos"
            aria-labelledby="projects-title"
            className="relative isolate min-h-screen scroll-mt-[-90px] overflow-hidden bg-transparent px-6 py-24 font-sans text-white sm:px-10 lg:px-16 xl:px-24"
        >
            <div aria-hidden="true" className="projects-grid absolute inset-0 -z-10" />
            <div aria-hidden="true" className="absolute -right-24 top-24 -z-10 h-72 w-72 rounded-full bg-[#1C3D72]/20 blur-[120px]" />

            <div className="mx-auto max-w-[1440px]">
                <header className="max-w-3xl">
                    <p className="mb-2 flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-[#AAC551] sm:text-sm">
                        <span aria-hidden="true" className="h-px w-10 bg-[#AAC551]" />
                        NUESTRO TRABAJO
                    </p>
                    <h2
                        id="projects-title"
                        className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl xl:text-6xl "
                    >
                        Proyectos que <br /> <span className="text-[#AAC551] font-sans">inspiran</span>
                    </h2>
                    <p className="mt-2 text-base leading-7 text-white/90 sm:text-lg font-sans">
                        Creamos experiencias que conectan marcas transformando ideas con proposito.
                    </p>
                </header>

                <nav aria-label="Seleccionar proyecto" className="mt-5 border-b border-white/15">
                    <div className="flex min-w-max gap-8 sm:gap-14 lg:gap-15">
                        {projects.map((project, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <button
                                    key={project.id}
                                    type="button"
                                    aria-pressed={isActive}
                                    onClick={() => selectProject(index)}
                                    className={`group relative flex cursor-pointer items-center gap-3 pb-5 text-left transition-colors duration-300 ${isActive ? "text-[#AAC551]" : "text-white/70 hover:text-white"
                                        }`}
                                >

                                    <span className="text-sm font-bold uppercase tracking-[0.08em] sm:text-base">
                                        {project.name}
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className={`absolute inset-x-0 bottom-0 h-[3px] origin-left bg-[#AAC551] transition-transform duration-500 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-75"
                                            }`}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </nav>

                <div
                    key={`${activeProject.id}-${animationKey}`}
                    className={`mt-10 flex gap-5 ${direction === "left" ? "project-enter-left" : "project-enter-right"}`}
                >
                    <ActiveProject />
                </div>
            </div>
        </section>
    );
}

export default Proyects;
