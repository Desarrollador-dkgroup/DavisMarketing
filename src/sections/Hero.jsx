import HeroScene from "../components/HeroScene";

function Hero() {
  return (
    <section
      id="inicio"
      aria-label="Davis Marketing: desarrollo y producción"
      className="hero-interactive relative min-h-screen overflow-hidden bg-[#050606]"
    >
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      <div className="hero-brand-copy pointer-events-none absolute inset-x-0 bottom-[7vh] z-10 px-6 text-center font-sans">
        <p className="pl-2 text-[clamp(4.3rem,3vw,9rem)] font-extrabold tracking-[0.13em] text-[#AAC551] mb-[-20px]">
          DAVIS MARKETING
        </p>
        <p className=" text-[clamp(2rem,2vw,3rem)] font-light tracking-[0.4em] text-white">
          DESARROLLO &amp; PRODUCCIÓN
        </p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/65 to-transparent" />
    </section>
  );
}

export default Hero;
