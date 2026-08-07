import { useState } from "react";
import LOGO from "/navbar/LogoBlanco.svg";
import { Menu, X } from "lucide-react";

function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const links = [
        "Inicio",
        "Nosotros",
        "Proyectos",
        "Contáctanos",
    ];

    return (
        <>
            {/* Navbar */}
            <nav className="fixed left-0 top-0 z-50 w-full 
            text-white font-sans">
                <div className="mx-auto flex h-16 items-center justify-between px-6">
                    <img
                        src={LOGO}
                        alt="Logo blanco"
                        className="h-10 cursor-pointer transition-transform duration-300 hover:scale-105"
                    />

                    {/* Menú escritorio */}
                    <div className="hidden gap-10 text-xl md:flex">
                        {links.map((item) => (
                            <div
                                key={item}
                                className="group transition-colors duration-300 hover:text-[#AAC551]"
                            >
                                <button type="button" className="cursor-pointer ">
                                    {item}
                                </button>

                                <div className="mt-1 h-[2px] w-0 bg-[#AAC551] transition-all duration-300 group-hover:w-full" />
                            </div>
                        ))}
                    </div>
                    
                    {/* Botón móvil */}
                    <button
                        type="button"
                        aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={menuAbierto}
                        onClick={() => setMenuAbierto((estadoActual) => !estadoActual)}
                        className="relative h-10 w-10 md:invisible"
                    >
                        <Menu
                            className={`absolute inset-0 h-10 w-10 transition-all duration-300 ${menuAbierto
                                    ? "-rotate-90 opacity-0"
                                    : "rotate-0 opacity-100"
                                }`}
                        />
                        <X
                            className={`absolute inset-0 h-10 w-10 transition-all duration-300 ${menuAbierto
                                    ? "rotate-0 opacity-100"
                                    : "rotate-90 opacity-0"
                                }`}
                        />
                    </button>
                </div>
            </nav>

            {/* Menú móvil */}
            <div
                className={`fixed left-0 top-16 z-40 w-full overflow-hidden md:hidden text-white ${menuAbierto
                        ? "pointer-events-auto"
                        : "pointer-events-none"
                    }`}
            >
                <div
                    className={`h-[calc(100vh-64px)] origin-top bg-black/20 backdrop-blur-md transition-[transform,opacity] duration-500 ease-out ${menuAbierto
                            ? "scale-y-100 opacity-100"
                            : "scale-y-0 opacity-0"
                        }`}
                >
                    <div className="flex flex-col gap-8 px-8 pt-12 text-2xl font-sans">
                        {links.map((item, index) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setMenuAbierto(false)}
                                style={{
                                    transitionDelay: menuAbierto
                                        ? `${150 + index * 90}ms`
                                        : "0ms",
                                }}
                                className={`cursor-pointer text-left transition-[transform,opacity,color] duration-400 hover:text-[#AAC551] ${menuAbierto
                                        ? "translate-y-0 opacity-100"
                                        : "-translate-y-3 opacity-0"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;