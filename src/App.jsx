import NavBar from "./components/Navbar";
import HERO from "./sections/Hero";
import US from "./sections/Us";
import PROYECTS from "./sections/Proyects"
import CONTACT from './sections/Contact'

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden ">
      <div className="">
        <NavBar />
        <HERO />
        <US />
        <PROYECTS/>
        <CONTACT/>
      </div>
    </main>
  );
}

export default App;