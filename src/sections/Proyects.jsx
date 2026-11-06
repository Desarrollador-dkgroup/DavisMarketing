import { useEffect, useRef } from "react";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { projects } from "../data/projects";
import { gsap, revealOnScroll, useFinePointer, useReducedMotion } from "../lib/motion";

/** Tarjeta de proyecto: se inclina con el ratón y la imagen se mueve en profundidad. */
function ProjectCard({ project, index, total, tilt }) {
    const cardRef = useRef(null);
    const { name, category, description, image, services, link, accent } = project;

    const handleMove = (event) => {
        const card = cardRef.current;
        if (!tilt || !card) return;
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        gsap.to(card, { rotateY: x * 8, rotateX: y * -8, duration: 0.6, ease: "power3.out" });
        gsap.to(card.querySelector(".project-image"), { x: x * 40, y: y * 30, duration: 0.6 });
        card.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
        card.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
    };

    const handleLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" });
        gsap.to(card.querySelector(".project-image"), { x: 0, y: 0, duration: 0.9 });
    };

    return (
        <article
            className="project-slide shrink-0 snap-center [perspective:1400px]
            w-[86vw] sm:w-[78vw] lg:w-[min(1100px,72vw)]"
        >
            <div
                ref={cardRef}
                onPointerMove={handleMove}
                onPointerLeave={handleLeave}
                data-cursor={link ? "Ver" : undefined}
                style={{ "--accent": accent }}
                className="project-card group relative grid overflow-hidden rounded-[28px] border
                border-white/12 bg-[#0B0D10] [transform-style:preserve-3d] lg:min-h-[560px]
                lg:grid-cols-[0.85fr_1.15fr]"
            >
                <div aria-hidden="true" className="project-card-glow pointer-events-none absolute inset-0" />

                <div className="relative z-10 flex flex-col p-7 sm:p-10 lg:p-12">
                    <div className="flex items-center justify-between text-xs font-bold tracking-[0.2em]">
                        <span className="text-[#AAC551]">{category.toUpperCase()}</span>
                        <span className="text-white/35">
                            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </span>
                    </div>

                    <h3 className="mt-6 text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
                        {name}
                    </h3>
                    <span aria-hidden="true" className="mb-6 mt-5 h-0.5 w-20 bg-[#AAC551]
                    transition-[width] duration-700 group-hover:w-40" />
                    <p className="max-w-md text-sm leading-7 text-white/75 sm:text-base">{description}</p>

                    <ul className="mt-6 flex flex-wrap gap-3" aria-label="Servicios desarrollados">
                        {services.map(({ name: serviceName, Icon }) => (
                            <li
                                key={serviceName}
                                className="flex items-center gap-2 rounded-full border border-[#AAC551]/55 px-4 py-2
                                text-[11px] font-bold uppercase tracking-[0.08em] text-white/80"
                            >
                                <Icon aria-hidden="true" className="h-4 w-4 text-[#AAC551]" strokeWidth={1.6} />
                                {serviceName}
                            </li>
                        ))}
                    </ul>

                    {link && (
                        <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-magnetic
                            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border-2 border-[#AAC551]
                            bg-[#AAC551] px-5 py-3 text-sm font-bold text-black transition-colors duration-300
                            hover:bg-transparent hover:text-white lg:mt-auto"
                        >
                            {link.label}
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                    )}
                </div>

                <div className="project-visual relative flex min-h-[260px] items-center justify-center
                overflow-hidden p-6 sm:min-h-[340px] sm:p-10 [transform:translateZ(40px)]">
                    <span
                        aria-hidden="true"
                        className="absolute h-[70%] w-[70%] rounded-full opacity-30 blur-[90px]"
                        style={{ backgroundColor: accent }}
                    />
                    <img
                        src={image}
                        alt={`Presentación visual del proyecto ${name}`}
                        loading="lazy"
                        className="project-image relative z-10 w-full max-w-[640px] object-contain
                        drop-shadow-[0_24px_55px_rgba(0,0,0,0.65)] transition-[scale] duration-700
                        group-hover:scale-[1.04]"
                    />
                </div>
            </div>
        </article>
    );
}

function Proyects() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const reducedMotion = useReducedMotion();
    const finePointer = useFinePointer();

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track || reducedMotion) return undefined;

        const context = gsap.context(() => {
            const media = gsap.matchMedia();

            // Escritorio: el scroll vertical mueve la galería en horizontal.
            media.add("(min-width: 1024px)", () => {
                const distance = () => track.scrollWidth - window.innerWidth;
                const horizontal = gsap.to(track, {
                    x: () => -distance(),
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: () => `+=${distance()}`,
                        pin: true,
                        scrub: 0.8,
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                    },
                });

                gsap.to(".projects-progress", {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: () => `+=${distance()}`,
                        scrub: true,
                    },
                });

                // Cada tarjeta crece un poco al llegar al centro.
                gsap.utils.toArray(".project-slide", track).forEach((slide) => {
                    gsap.fromTo(
                        slide,
                        { scale: 0.88, opacity: 0.5 },
                        {
                            scale: 1,
                            opacity: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: slide,
                                containerAnimation: horizontal,
                                start: "left right",
                                end: "center center",
                                scrub: true,
                            },
                        },
                    );
                });
            });

            return revealOnScroll(".projects-heading > *", { trigger: section, start: "top 75%" });
        }, section);

        return () => context.revert();
    }, [reducedMotion]);

    return (
        <section
            ref={sectionRef}
            id="proyectos"
            aria-labelledby="projects-title"
            className="relative isolate overflow-hidden bg-black py-24 font-sans text-white
            lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0"
        >
            <div aria-hidden="true" className="absolute inset-0 -z-20
            bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]
            bg-[size:72px_72px]" />
            <div aria-hidden="true" className="absolute -right-24 top-24 -z-10 h-[450px] w-[450px] rounded-full bg-[#1C3D72]/25 blur-[140px]" />
            <div aria-hidden="true" className="absolute -left-40 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-[#AAC551]/10 blur-[160px]" />

            <div className="projects-heading mx-auto flex w-full max-w-[1440px] flex-wrap items-end
            justify-between gap-6 px-6 sm:px-10 lg:px-16 xl:px-24">
                <div>
                    <p className="mb-3 flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-[#AAC551] sm:text-sm">
                        <span aria-hidden="true" className="h-px w-10 bg-[#AAC551]" />
                        NUESTRO TRABAJO
                    </p>
                    <h2 id="projects-title" className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                        Proyectos que <span className="text-[#AAC551]">inspiran</span>
                    </h2>
                </div>
                <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-white/50">
                    <span className="lg:hidden">DESLIZA</span>
                    <span className="hidden lg:inline">SIGUE BAJANDO</span>
                    <MoveRight className="h-4 w-4 text-[#AAC551]" aria-hidden="true" />
                </p>
            </div>

            <div
                className="mt-10 overflow-x-auto overscroll-x-contain [scrollbar-width:none] lg:mt-12
                lg:overflow-visible [&::-webkit-scrollbar]:hidden snap-x snap-mandatory lg:snap-none"
            >
                <div
                    ref={trackRef}
                    className="flex w-max gap-5 px-6 sm:gap-8 sm:px-10 lg:gap-12 lg:px-[14vw]"
                >
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            total={projects.length}
                            tilt={finePointer && !reducedMotion}
                        />
                    ))}
                </div>
            </div>

            <div aria-hidden="true" className="mx-auto mt-10 hidden h-px w-full max-w-[1440px] bg-white/10 lg:block">
                <span className="projects-progress block h-full origin-left scale-x-0 bg-[#AAC551]" />
            </div>
        </section>
    );
}

export default Proyects;
