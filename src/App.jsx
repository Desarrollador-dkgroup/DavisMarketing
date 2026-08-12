import NavBar from "./components/Navbar";
import HERO from "./sections/Hero";
import US from "./sections/Us";
import PROYECTS from "./sections/Proyects"

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden ">
      <div className="">
        <NavBar />
        <HERO />
        <US />
        <PROYECTS/>
      </div>
    </main>
  );
}

export default App;