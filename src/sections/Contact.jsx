import { useEffect, useRef, useState } from "react";
import {
    ArrowRight,
    Building2,
    Mail,
    MessageSquareText,
    Phone,
    TrendingUp,
    UserRound,
} from "lucide-react";

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

const fieldClass = `w-full rounded-lg border border-[#0B1730]/15 bg-white py-3.5 pl-12 pr-4
text-sm text-[#0B1730] outline-none transition-all duration-300 placeholder:text-[#0B1730]/40
hover:border-[#0B1730]/25 focus:border-[#AAC551] focus:shadow-[0_0_0_3px_rgba(170,197,81,0.12)]`;

function countWords(value) {
    const cleanValue = value.trim();
    return cleanValue ? cleanValue.split(/\s+/).length : 0;
}

function Contact() {
    const formRef = useRef(null);
    const iframeRef = useRef(null);
    const [reason, setReason] = useState("");
    const [status, setStatus] = useState("idle");
    const [submissionAttempted, setSubmissionAttempted] = useState(false);
    const wordCount = countWords(reason);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const handleLoad = () => {
            if (!submissionAttempted) return;
            setStatus("success");
            setSubmissionAttempted(false);
        };

        iframe.addEventListener("load", handleLoad);
        return () => iframe.removeEventListener("load", handleLoad);
    }, [submissionAttempted]);

    const handleReasonChange = (event) => {
        const nextReason = event.target.value;
        if (countWords(nextReason) <= 300) setReason(nextReason);
        if (status !== "sending") setStatus("idle");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!APPS_SCRIPT_URL) {
            setStatus("error");
            return;
        }

        setStatus("sending");
        setSubmissionAttempted(true);

        const form = formRef.current;
        if (!form) {
            setStatus("error");
            setSubmissionAttempted(false);
            return;
        }

        form.action = APPS_SCRIPT_URL;
        form.target = iframeRef.current?.name || "contact-submit-frame";
        form.method = "POST";
        form.submit();

        event.currentTarget.reset();
        setReason("");
    };

    return (
        <section id="contacto" aria-labelledby="contact-title" className="relative isolate min-h-screen
        scroll-mt-[-90px] overflow-hidden bg-[#F9FAF8] px-6 py-24 font-sans text-[#0B1730]
        sm:px-10 lg:px-16 xl:px-24">

            {/* Fondo grid */}
            <div aria-hidden="true" className="absolute inset-0 -z-20
            bg-[linear-gradient(rgba(11,23,48,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(11,23,48,0.035)_1px,transparent_1px)]
            bg-[size:72px_72px]" />

            {/* Glow verde */}
            <div aria-hidden="true" className="absolute -left-40 top-[300px] -z-10
            h-[420px] w-[420px] rounded-full bg-[#AAC551]/10 blur-[150px]" />

            {/* Glow azul */}
            <div aria-hidden="true" className="absolute -right-40 top-20 -z-10
            h-[450px] w-[450px] rounded-full bg-[#1C3D72]/8 blur-[160px]" />


            <div className="mx-auto grid max-w-[1440px] gap-14
            lg:grid-cols-[0.92fr_1.08fr] lg:items-center xl:gap-24">

                {/* ========================================= */}
                {/* COLUMNA IZQUIERDA */}
                {/* ========================================= */}

                <div>

                    {/* Label */}
                    <div className="mb-5 flex items-center gap-3 text-xs font-bold
                    tracking-[0.18em] text-[#84A318] sm:text-sm">

                        <span className="h-px w-11 bg-[#AAC551]" aria-hidden="true" />

                        HABLEMOS DE TU PROYECTO
                    </div>


                    {/* Título */}
                    <h2 id="contact-title" className="max-w-[620px] text-4xl font-bold
                    leading-[1.05] tracking-tight text-[#0B1730] sm:text-5xl xl:text-6xl">
                        Sabemos lo importante que es iniciar tu proyecto
                    </h2>


                    {/* Descripción */}
                    <p className="mt-5 max-w-[620px] text-base leading-7 text-[#0B1730]/60 sm:text-lg">
                        Por eso nos comprometemos contigo desde el primer contacto
                    </p>


                    {/* ========================================= */}
                    {/* FORMULARIO */}
                    {/* ========================================= */}

                    <form ref={formRef} className="mt-9 rounded-2xl border border-[#0B1730]/10 bg-white/90
                    p-5 shadow-[0_20px_60px_rgba(11,23,48,0.08)] backdrop-blur-sm sm:p-7"
                        onSubmit={handleSubmit}>

                        {/* Encabezado formulario */}
                        <div className="mb-5 flex items-center gap-3 border-b
                        border-[#0B1730]/10 pb-5">

                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full
                            border border-[#AAC551] bg-[#AAC551]/5 text-[#8AAA1B]">

                                <TrendingUp aria-hidden="true" className="h-5 w-5" />
                            </span>

                            <p className="text-base font-bold text-[#0B1730] sm:text-lg">
                                ¡Elevemos tu marca al siguiente nivel!
                            </p>
                        </div>


                        <div className="space-y-3">

                            {/* Nombre */}
                            <label className="relative block">
                                <span className="sr-only">Nombre completo</span>

                                <UserRound aria-hidden="true" strokeWidth={1.7}
                                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5
                                    -translate-y-1/2 text-[#91B51E]" />

                                <input
                                    className={fieldClass}
                                    type="text"
                                    name="fullName"
                                    placeholder="Nombre completo"
                                    autoComplete="name"
                                    required
                                />
                            </label>


                            {/* Teléfono */}
                            <div className="grid gap-3 sm:grid-cols-[0.92fr_1.08fr]">

                                <label className="relative block">
                                    <span className="sr-only">Código de país</span>

                                    <Phone aria-hidden="true" strokeWidth={1.7}
                                        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5
                                        -translate-y-1/2 text-[#91B51E]" />

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

                                    <Phone aria-hidden="true" strokeWidth={1.7}
                                        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5
                                        -translate-y-1/2 text-[#91B51E]" />

                                    <input
                                        className={fieldClass}
                                        type="tel"
                                        name="phone"
                                        placeholder="Teléfono"
                                        autoComplete="tel-national"
                                        inputMode="tel"
                                        required
                                    />
                                </label>

                            </div>


                            {/* Empresa */}
                            <label className="relative block">
                                <span className="sr-only">Nombre de la empresa</span>

                                <Building2 aria-hidden="true" strokeWidth={1.7}
                                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5
                                    -translate-y-1/2 text-[#91B51E]" />

                                <input
                                    className={fieldClass}
                                    type="text"
                                    name="company"
                                    placeholder="Nombre de la empresa"
                                    autoComplete="organization"
                                    required
                                />
                            </label>


                            {/* Correo */}
                            <label className="relative block">
                                <span className="sr-only">Correo electrónico</span>

                                <Mail aria-hidden="true" strokeWidth={1.7}
                                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5
                                    -translate-y-1/2 text-[#91B51E]" />

                                <input
                                    className={fieldClass}
                                    type="email"
                                    name="email"
                                    placeholder="Correo electrónico"
                                    autoComplete="email"
                                    required
                                />
                            </label>


                            {/* Razón de contacto */}
                            <label className="relative block rounded-lg border border-[#0B1730]/15
                            bg-white p-4 transition-all duration-300 hover:border-[#0B1730]/25
                            focus-within:border-[#AAC551]
                            focus-within:shadow-[0_0_0_3px_rgba(170,197,81,0.12)]">

                                <span className="flex items-center gap-2 text-sm font-semibold text-[#0B1730]">

                                    <MessageSquareText aria-hidden="true" strokeWidth={1.7}
                                        className="h-5 w-5 text-[#91B51E]" />

                                    Razón de contacto
                                </span>

                                <textarea
                                    className="mt-3 min-h-[80px] w-full resize-y bg-transparent text-sm
                                    leading-6 text-[#0B1730] outline-none placeholder:text-[#0B1730]/40"
                                    name="contactReason"
                                    value={reason}
                                    onChange={handleReasonChange}
                                    placeholder="Cuéntanos sobre tu proyecto, objetivo o necesidad..."
                                    aria-describedby="contact-word-count"
                                    required
                                />

                                <span id="contact-word-count" aria-live="polite"
                                    className={`mt-2 block text-right text-xs
                                    ${wordCount >= 280
                                            ? "font-semibold text-[#86A51D]"
                                            : "text-[#0B1730]/40"
                                        }`}>
                                    {wordCount} / 300 palabras
                                </span>

                            </label>

                        </div>


                        {/* Términos */}
                        <label className="mt-4 flex cursor-pointer items-start gap-3
                        text-xs text-[#0B1730]/60 sm:text-sm">

                            <input type="checkbox" name="terms" required
                                className="mt-0.5 h-4 w-4 accent-[#AAC551]" />

                            <span>
                                Acepto los{" "}
                                <span className="font-medium text-[#7F9D16] hover:underline">
                                    términos y condiciones
                                </span>.
                            </span>
                        </label>


                        {/* Botón */}
                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="group mt-6 flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#B4D643] px-6 py-4
                        text-sm font-extrabold tracking-[0.08em] text-[#0B1730]
                        shadow-[0_10px_25px_rgba(170,197,81,0.25)] transition-all duration-300
                        hover:-translate-y-0.5 hover:bg-[#0B1730] hover:text-white
                        hover:shadow-[0_15px_30px_rgba(11,23,48,0.18)]
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#AAC551]
                        focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-75">

                            {status === "sending" ? "ENVIANDO..." : "ENVIAR MENSAJE"}

                            <ArrowRight
                                aria-hidden="true"
                                className={`h-5 w-5 transition-transform duration-300 ${status === "sending" ? "translate-x-0" : "group-hover:translate-x-1"}`}
                            />
                        </button>

                        {status === "sending" && (
                            <p className="mt-4 text-sm font-medium text-[#000000]">
                                Enviando tu información...
                            </p>
                        )}

                        {status === "success" && (
                            <p className="mt-4 text-md font-bold text-[#000000]">
                                Tu mensaje fue enviado correctamente.
                            </p>
                        )}

                        {status === "error" && (
                            <p className="mt-4 text-md font-bold text-[#000000]">
                                No se pudo enviar el mensaje. Revisa la URL de Apps Script.
                            </p>
                        )}

                    </form>

                    <iframe
                        ref={iframeRef}
                        name="contact-submit-frame"
                        title="contact-submit-frame"
                        className="hidden"
                    />
                </div>
                {/* ========================================= */}
                {/* COLUMNA DERECHA / LOGO */}
                {/* ========================================= */}
                <div className="relative hidden min-h-[720px] items-center justify-center lg:flex"
                    aria-hidden="true">
                    {/* Tarjeta */}
                    <div className="relative flex h-[650px] w-full max-w-[680px]
                    items-center justify-center overflow-hidden rounded-[34px]
                    border border-[#1C3D72]/20 bg-white/70
                    shadow-[0_25px_80px_rgba(11,23,48,0.08)] backdrop-blur-sm">
                        {/* Luz verde superior */}
                        <div className="absolute left-[20%] top-0 h-px w-[35%]
                        bg-gradient-to-r from-transparent via-[#AAC551] to-transparent" />
                        <div className="absolute left-[42%] top-0 h-24 w-px
                        bg-gradient-to-b from-[#AAC551] to-transparent" />
                        <span className="absolute left-[42%] top-0 h-3 w-3 -translate-x-1/2
                        -translate-y-1/2 rounded-full bg-[#C8EA50]
                        shadow-[0_0_20px_8px_rgba(200,234,80,0.45)]" />
                        {/* Luz azul derecha */}
                        <div className="absolute right-0 top-[20%] h-[40%] w-px
                        bg-gradient-to-b from-transparent via-[#1C3D72]/40 to-transparent" />
                        {/* Anillos */}
                        <div className="absolute h-[500px] w-[500px] rounded-full
                        border border-[#AAC551]/25" />
                        <div className="absolute h-[420px] w-[420px] rounded-full
                        border border-[#1C3D72]/25" />
                        <div className="absolute h-[340px] w-[340px] rounded-full
                        border border-[#0B1730]/10" />
                        {/* Puntos decorativos */}
                        <span className="absolute left-[8%] top-[23%] h-2 w-2 rounded-full
                        bg-[#3278D7] shadow-[0_0_12px_rgba(50,120,215,0.5)]" />
                        <span className="absolute right-[13%] top-[18%] h-2.5 w-2.5 rounded-full
                        bg-[#AAC551] shadow-[0_0_15px_rgba(170,197,81,0.5)]" />
                        <span className="absolute right-[8%] top-[48%] h-1.5 w-1.5 rounded-full
                        bg-[#AAC551]" />
                        <span className="absolute right-[8%] bottom-[27%] h-2 w-2 rounded-full
                        bg-[#3278D7]" />
                        {/* Logo */}
                        <div className="relative z-10 flex w-full flex-col items-center">
                            <div className="contact-logo-stage relative h-[300px] w-full max-w-[570px]">
                                <div className="contact-mark contact-mark-letters absolute inset-0
                                bg-[#B4D643]" />
                                <span className="contact-logo-sphere absolute left-[42%] top-[15%]
                                h-14 w-14 rounded-full bg-[#1C3D72]
                                " />
                            </div>
                            <div className="-mt-3 text-center">
                                <p className="text-2xl font-semibold tracking-[0.55em]
                                text-[#0B1730] xl:text-3xl">
                                    DAVIS MARKETING
                                </p>
                                <p className="mt-1 text-base font-semibold tracking-[0.52em]
                                text-[#0B1730]/75 xl:text-lg">
                                    DESARROLLO <span className="text-[#1C5DB2]">&</span> PRODUCCIÓN
                                </p>


                                <span className="mx-auto mt-7 block h-px w-24
                                bg-gradient-to-r from-transparent via-[#AAC551] to-transparent" />


                                <p className="mt-6 text-lg font-light tracking-[0.28em]
                                text-[#0B1730]/80 xl:text-xl">

                                    Ideas que se{" "}

                                    <span className="text-[#86A51D]">
                                        mueven contigo.
                                    </span>
                                </p>

                            </div>

                        </div>
                        {/* Esquina inferior */}
                        <div className="absolute bottom-0 right-0 h-px w-[30%]
                        bg-gradient-to-r from-transparent via-[#AAC551] to-transparent" />

                        <span className="absolute bottom-0 right-[7%] h-3 w-3 translate-y-1/2
                        rounded-full bg-[#C8EA50]
                        shadow-[0_0_18px_7px_rgba(200,234,80,0.4)]" />

                    </div>

                </div>

            </div>
        </section>
    );
}

export default Contact;
