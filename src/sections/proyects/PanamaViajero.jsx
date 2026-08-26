import { Globe2, Palette, Smartphone } from "lucide-react";

const services = [
    { name: "Sitio web", Icon: Globe2 },
    { name: "App móvil", Icon: Smartphone },
    
];

function PanamaViajero() {
    return (
        <article className="relative overflow-hidden ">
            

            <div className="grid min-h-[350px] lg:grid-cols-[0.78fr_1.22fr]">
                <div className="relative z-10 flex flex-col px-6 py-10 sm:px-10 lg:px-12 xl:px-16">
                    <span aria-hidden="true" className="ml-1 text-md font-bold leading-none text-[#AAC551] sm:text-md">
                        TURISMO DIGITAL
                    </span>
                    <h3 className="text-4xl font-bold tracking-tight  sm:text-5xl mt-2">
                        Panamá Viajero
                    </h3>
                    <span aria-hidden="true" className="mb-7 mt-4 h-0.5 w-20 bg-[#AAC551]" />

                    <p className="max-w-lg text-sm leading-7 text-white/90 sm:text-base">
                        Una plataforma digital que conecta a viajeros nacionales e internacionales
                        con experiencias turísticas de todo Panamá de una forma clara, visual y cercana.
                    </p>

                    <ul className="mt-5 flex flex-col gap-3" aria-label="Servicios desarrollados">
                        <div className="flex gap-3">
                            {services.map(({ name, Icon }) => (
                            <li
                                key={name}
                                className="flex items-center gap-2 hover:scale-103 rounded-full border 
                                border-[#AAC551]/55 px-4 py-2 text-[11px] font-bold uppercase 
                                tracking-[0.08em] text-white/75 transition duration-300"
                            >
                                <Icon aria-hidden="true" className="h-4 w-4 text-[#AAC551]" strokeWidth={1.6} />
                                {name}
                            </li>
                        ))}
                        </div>
                        <div className="mt-15">
                            <a href="https://panamaviajero.app/" target="blank" className="rounded-full bg-[#AAC551]/90 py-3 px-4 text-white 
                            hover:bg-transparent hover:border-2 hover:border-[#AAC551] hover:text-white/90 border-2 border-[#AAC551]
                            transition-all duration-300">
                                Visitar página
                            </a>
                        </div>
                    </ul>
    
                </div>

                <div className="project-visual relative flex min-h-[360px] items-center justify-center  p-6 sm:p-10 lg:min-h-full ">
                    
                    <img
                        src="/proyects/panamaViajero/PanamaViajero.svg"
                        alt="Presentación visual del proyecto Panamá Viajero"
                        className="relative z-10 w-full max-w-[760px] object-contain drop-shadow-[0_24px_55px_rgba(0,0,0,0.65)] transition-transform duration-700 hover:scale-[1.025]"
                    />
                    <div aria-hidden="true" className="absolute bottom-5 right-5 grid grid-cols-6 gap-2 opacity-55">
                        {Array.from({ length: 18 }, (_, index) => (
                            <span
                                key={index}
                                className={`h-1.5 w-1.5 rounded-full ${index % 3 === 0 ? "bg-[#1C3D72]" : "bg-[#AAC551]"}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}

export default PanamaViajero;
