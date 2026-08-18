import { useState } from "react";
import {
    ArrowRight,
    Building2,
    Mail,
    MessageSquareText,
    Phone,
    TrendingUp,
    UserRound,
} from "lucide-react";

const fieldClass =
    "w-full border border-white/20 bg-black/35 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#AAC551] focus:shadow-[0_0_0_1px_#AAC55140]";

function countWords(value) {
    const cleanValue = value.trim();
    return cleanValue ? cleanValue.split(/\s+/).length : 0;
}

function Contact() {
    const [reason, setReason] = useState("");
    const wordCount = countWords(reason);

    const handleReasonChange = (event) => {
        const nextReason = event.target.value;
        if (countWords(nextReason) <= 300) setReason(nextReason);
    };

    return (
        <section
            id="contacto"
            aria-labelledby="contact-title"
            className="relative isolate min-h-screen scroll-mt-[-90px] overflow-hidden bg-transparent px-6 py-24 font-sans text-white sm:px-10 lg:px-16 xl:px-24"
        >
            <div aria-hidden="true" className="contact-grid absolute inset-0 -z-10" />
            <div aria-hidden="true" className="absolute -left-20 bottom-0 -z-10 h-64 w-64 rounded-full bg-[#AAC551]/10 blur-[110px]" />

            <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[0.96fr_1.04fr] lg:items-center xl:gap-24">
                <div>
                    <div className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-[#AAC551] sm:text-sm">
                        <span className="h-px w-11 bg-[#AAC551]" aria-hidden="true" />
                        HABLEMOS DE TU PROYECTO
                    </div>
                    <h2
                        id="contact-title"
                        className="text-3xl font-bold leading-[1.08] tracking-tight text-white/90 sm:text-5xl xl:text-6xl"
                    >
                        Sabemos lo importante que es iniciar tu proyecto
                    </h2>
                    <p className="mt-4 text-base leading-7 text-white/65 sm:text-lg">
                        Por eso nos comprometemos contigo desde el primer contacto
                    </p>
                    <form
                        className="contact-form mt-9 border border-[#AAC551]/55 bg-[#070808]/90 p-4 sm:p-6"
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-5">
                            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#AAC551]/60 text-[#AAC551]">
                                <TrendingUp aria-hidden="true" className="h-5 w-5" />
                            </span>
                            <p className="text-base font-bold sm:text-lg">¡Elevemos tu marca al siguiente nivel!</p>
                        </div>

                        <div className="space-y-3">
                            <label className="relative block">
                                <span className="sr-only">Nombre completo</span>
                                <UserRound aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#AAC551]" strokeWidth={1.6} />
                                <input className={fieldClass} type="text" name="fullName" placeholder="Nombre completo" autoComplete="name" required />
                            </label>

                            <div className="grid gap-3 sm:grid-cols-[0.92fr_1.08fr]">
                                <label className="relative block">
                                    <span className="sr-only">Código de país</span>
                                    <Phone aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#AAC551]" strokeWidth={1.6} />
                                    <input
                                        className={fieldClass}
                                        type="tel"
                                        name="countryCode"
                                        placeholder="Código de país: +507"
                                        autoComplete="tel-country-code"
                                        inputMode="tel"
                                        pattern="[+][0-9]{1,4}"
                                        maxLength={5}
                                        title="Escribe el signo + seguido de 1 a 4 números. Ejemplo: +507"
                                        required
                                    />
                                </label>

                                <label className="relative block">
                                    <span className="sr-only">Teléfono</span>
                                    <Phone aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#AAC551]" strokeWidth={1.6} />
                                    <input className={fieldClass} type="tel" name="phone" placeholder="Teléfono" autoComplete="tel-national" inputMode="tel" required />
                                </label>
                            </div>

                            <label className="relative block">
                                <span className="sr-only">Nombre de la empresa</span>
                                <Building2 aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#AAC551]" strokeWidth={1.6} />
                                <input className={fieldClass} type="text" name="company" placeholder="Nombre de la empresa" autoComplete="organization" required />
                            </label>

                            <label className="relative block">
                                <span className="sr-only">Correo electrónico</span>
                                <Mail aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#AAC551]" strokeWidth={1.6} />
                                <input className={fieldClass} type="email" name="email" placeholder="Correo electrónico" autoComplete="email" required />
                            </label>

                            <label className="relative block border border-white/20 bg-black/35 p-4 transition focus-within:border-[#AAC551] focus-within:shadow-[0_0_0_1px_#AAC55140]">
                                <span className="flex items-center gap-2 text-sm font-semibold text-white/85">
                                    <MessageSquareText aria-hidden="true" className="h-5 w-5 text-[#AAC551]" strokeWidth={1.6} />
                                    Razón de contacto
                                </span>
                                <textarea
                                    className="mt-3 min-h-10 w-full resize-y bg-transparent text-sm leading-6 text-white outline-none placeholder:text-white/35"
                                    name="contactReason"
                                    value={reason}
                                    onChange={handleReasonChange}
                                    placeholder="Cuéntanos sobre tu proyecto, objetivo o necesidad..."
                                    aria-describedby="contact-word-count"
                                    required
                                />
                                <span id="contact-word-count" aria-live="polite" className={`mt-2 block text-right text-xs ${wordCount >= 280 ? "text-[#AAC551]" : "text-white/45"}`}>
                                    {wordCount} / 300 palabras
                                </span>
                            </label>
                        </div>

                        <label className="mt-4 flex cursor-pointer items-start gap-3 text-xs text-white/65 sm:text-sm">
                            <input type="checkbox" name="terms" required className="mt-0.5 h-4 w-4 accent-[#AAC551]" />
                            <span>Acepto los <span className="text-[#AAC551]">términos y condiciones</span>.</span>
                        </label>

                        <button
                            type="submit"
                            className="group mt-6 flex w-full cursor-pointer items-center justify-center gap-3 bg-[#AAC551] px-6 py-4 text-sm font-extrabold tracking-[0.08em] text-black transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#AAC551] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                            ENVIAR MENSAJE
                            <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </button>
                    </form>
                </div>

                <div className="contact-brand-scene relative hidden min-h-[680px] items-center justify-center lg:flex" aria-hidden="true">
                    <div className="contact-ring contact-ring-one absolute h-[72%] w-[72%] rounded-full border border-[#AAC551]/35" />
                    <div className="contact-ring contact-ring-two absolute h-[60%] w-[60%] rounded-full border border-[#1C3D72]/70" />
                    <div className="contact-ring contact-ring-three absolute h-[48%] w-[48%] rounded-full border border-white/15" />

                    <div className="contact-logo-stage relative h-[340px] w-full max-w-[590px]">
                        <div className="contact-mark contact-mark-letters absolute inset-0 bg-[#AAC551]" />
                        <span className="contact-logo-sphere absolute left-[42%] top-[15%] h-14 w-14 rounded-full bg-[#1C3D72] 
                        shadow-[0_18px_35px_rgba(0,0,0,0.65)]" />
                    </div>

                    <div className="absolute bottom-[12%] text-center">
                        <p className="text-3xl font-semibold tracking-[0.55em] text-white/80">DAVIS MARKETING</p>
                        <p className="text-xl font-semibold tracking-[0.55em] text-white/80">DESARROLLO & PRODUCCIÓN</p>
                        <p className="mt-5 text-lg font-light tracking-[0.35em] text-white/90">
                            Ideas que se <span className="text-[#AAC551]">mueven contigo.</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
