import { useState } from "react";
import LOGO from "/navbar/LogoBlanco.svg";
import { Menu, X } from "lucide-react";

function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const links = [
        { name: "Inicio", href: "#inicio" },
        { name: "Nosotros", href: "#nosotros" },
        { name: "Proyectos", href: "#proyectos" },
        { name: "Contáctanos", href: "#contacto" },
    ];

    return (
        <div
            className={`fixed left-0 top-0 z-50 w-full overflow-hidden
            bg-black/15 backdrop-blur-lg text-white font-sans
            transition-[height] duration-500 ease-in-out
            ${
                menuAbierto
                    ? "h-[100dvh]"
                    : "h-16"
            }
            md:h-16`}
        >
            {/* Navbar */}
            <nav className="relative z-10 w-full">
                <div className="mx-auto flex h-16 items-center justify-between px-6">

                    {/* Logo */}
                    <a href="#inicio" aria-label="Ir al inicio">
                        <img
                            src={LOGO}
                            alt="Logo blanco"
                            className="h-10 cursor-pointer transition-transform duration-300 hover:scale-105"
                        />
                    </a>

                    {/* Menú escritorio */}
                    <div className="hidden gap-10 text-xl md:flex">
                        {links.map((link) => (
                            <div
                                key={link.href}
                                className="group transition-colors duration-300 hover:text-[#AAC551]"
                            >
                                <a
                                    href={link.href}
                                    className="cursor-pointer"
                                >
                                    {link.name}
                                </a>

                                <div className="mt-1 h-[2px] w-0 bg-[#AAC551] transition-all duration-300 group-hover:w-full" />
                            </div>
                        ))}
                    </div>

                    {/* Botón móvil */}
                    <button
                        type="button"
                        aria-label={
                            menuAbierto
                                ? "Cerrar menú"
                                : "Abrir menú"
                        }
                        aria-expanded={menuAbierto}
                        onClick={() =>
                            setMenuAbierto(
                                (estadoActual) => !estadoActual
                            )
                        }
                        className="relative h-10 w-10 md:hidden"
                    >
                        <Menu
                            className={`absolute inset-0 h-10 w-10
                            transition-all duration-300
                            ${
                                menuAbierto
                                    ? "-rotate-90 opacity-0"
                                    : "rotate-0 opacity-100"
                            }`}
                        />

                        <X
                            className={`absolute inset-0 h-10 w-10
                            transition-all duration-300
                            ${
                                menuAbierto
                                    ? "rotate-0 opacity-100"
                                    : "rotate-90 opacity-0"
                            }`}
                        />
                    </button>
                </div>
            </nav>

            {/* Menú móvil */}
            <div
                className={`h-[calc(100dvh-64px)] md:hidden
                transition-opacity duration-300
                ${
                    menuAbierto
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                }`}
            >
                <div className="flex flex-col gap-8 px-8 pt-12 text-2xl">
                    {links.map((link, index) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuAbierto(false)}
                            style={{
                                transitionDelay: menuAbierto
                                    ? `${150 + index * 90}ms`
                                    : "0ms",
                            }}
                            className={`cursor-pointer text-left
                            transition-[transform,opacity,color]
                            duration-300
                            hover:text-[#AAC551]
                            ${
                                menuAbierto
                                    ? "translate-y-0 opacity-100"
                                    : "-translate-y-3 opacity-0"
                            }`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Navbar;