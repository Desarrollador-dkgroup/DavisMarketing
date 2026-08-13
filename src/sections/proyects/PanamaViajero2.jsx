import { ArrowRight } from "lucide-react";
function PanamaViajero2(){
    return(
        <div className="rounded-2xl max-w-md bg-gradient-to-r from-[#4956A2] to-[#4956A2]">
            <div className="p-3 rounded-t-xl hover:scale-103 transition-all duration-300">
                <a href="https://panamaviajero.app" target="_blank" className="flex items-center justify-center gap-2 cursor-pointer">
                    {/* LOGO */}
                    <img src="\proyects\panamaViajero\LogoRectangular.svg" alt="Captura de la pagina" className="h-15 md:h-25 w-auto my-10" />
                </a>
            </div>
            <div className="bg-[#000000] py-2 rounded-b-xl px-3">
                <div className="flex gap-3">
                    <div>
                        <h1 className="font-bold text-2xl text-[#AAC551]">Panamá Viajero</h1>
                        <p className="font-inter text-[#EAE9E9]/75 text-sm">Una plataforma digital que conecta a viajeros nacionales e internacionales
                        con experiencias turísticas de todo Panamá de una forma clara, visual y cercana.</p>
                    </div>
                </div>
                <a href="https://panamaviajero.app" target="_blank" className="flex gap-2 font-inter text-sm items-center mt-2 cursor-pointer hover:bg-[#AAC551]/15 
                text-[#AAC551] hover:text-[#EAE9E9] rounded-md max-w-[150px] pl-2 py-1 transition-all duration-300">
                    Visitar página <ArrowRight />
                </a>
            </div>
        </div>
    )
}export default PanamaViajero2