import NavBar from "./components/Navbar";
// import HERO from "./sections/Hero";
// import HERO_V2 from "./sections/HeroV2";
import HERO_CINEMATIC from "./sections/HeroCinematic";
import US from "./sections/Us";
import CREATIVEBRIDGE from "./sections/CreativeBridge";
import PROYECTS from "./sections/Proyects"
import CONTACT from './sections/Contact'
import BackgroundVideo from './components/BackgroundVideo'

function App() {
  return (
    <main className="relative min-h-screen">
      {/* Video de fondo ultra-fluido que reproduce en reversa continua (de endTime a startTime) */}
      <BackgroundVideo
        src="/video2_smooth.mp4" // Video optimizado para retroceso continuo a 60fps sin cortes
        height="113vh"           // Alto del video
        speed={1}                // Velocidad del video
        startTime={0.35}          // Segundo exacto donde termina de retroceder
        endTime={7.8}            // Segundo exacto donde inicia el retroceso
        easeDuration={0}         // 0 = Velocidad 100% constante (sin ralentizar al inicio ni al final)
        mode="reverse"           // "reverse" (solo hacia atrás) | "boomerang" (ida y vuelta) | "forward" (hacia adelante)
        opacity={1}              // Opacidad
      />

      <div className="relative z-0">
        <NavBar />
        <HERO_CINEMATIC />
        <US />
        <CREATIVEBRIDGE />
        <PROYECTS />
        <CONTACT />
      </div>
    </main>
  );
}


export default App;
