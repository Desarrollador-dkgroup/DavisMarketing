import NavBar from "./components/Navbar";
// import HERO from "./sections/Hero";
// import HERO_V2 from "./sections/HeroV2";
import HERO_CINEMATIC from "./sections/HeroCinematic";
import US from "./sections/Us";
import CREATIVEBRIDGE from "./sections/CreativeBridge";
import PROYECTS from "./sections/Proyects"
import CONTACT from './sections/Contact'

function App() {
  return (
    <main className="relative min-h-screen">
      {/* Fondo estático fijo que permanece inmutable mientras el contenido scrollea */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-50 pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/fondo.png')" }}
      />
      <div className="relative z-0">
        <NavBar />
        {/* <HERO /> */}
        {/* <HERO_V2 /> */}
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
