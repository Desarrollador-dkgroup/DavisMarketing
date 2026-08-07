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

      <div className="hero-brand-copy pointer-events-none absolute inset-x-0 bottom-[8vh] z-10 px-6 text-center font-sans">
        <p className="text-[clamp(1.35rem,3vw,2.5rem)] font-extrabold tracking-[0.13em] text-[#AAC551]">
          DAVIS MARKETING
        </p>
        <p className="mt-1 text-[clamp(0.72rem,1.35vw,1.05rem)] font-light tracking-[0.28em] text-white">
          DESARROLLO &amp; PRODUCCIÓN
        </p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/65 to-transparent" />
    </section>
  );
}

export default Hero;
