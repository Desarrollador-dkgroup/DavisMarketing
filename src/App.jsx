import NavBar from "./components/Navbar";
import HERO_CINEMATIC from "./sections/HeroCinematic";
import US from "./sections/Us";
import CREATIVEBRIDGE from "./sections/CreativeBridge";
import PROYECTS from "./sections/Proyects";
import MANIFESTO from "./sections/Manifesto";
import CONTACT from "./sections/Contact";
import BackgroundVideo from "./components/BackgroundVideo";

function App() {
  return (
    <main className="relative min-h-screen">

      <BackgroundVideo
        src="/video2_smooth.webm"
        height="113vh"
        speed={2}
        startTime={0}
        endTime={5}
        easeDuration={0}
        mode="forward"
        opacity={1}
      />
      <NavBar />
      <div className="relative z-0 bg-black/10 backdrop-blur-sm">
        <HERO_CINEMATIC />
        <US />
        <CREATIVEBRIDGE />
        <MANIFESTO />
        <PROYECTS />
        <CONTACT />
      </div>

    </main>
  );
}

export default App;