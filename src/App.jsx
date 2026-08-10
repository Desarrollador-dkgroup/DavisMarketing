import NavBar from "./components/Navbar";
import HERO from "./sections/Hero";
import US from "./sections/Us";

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden ">
      <div className="">
        <NavBar />
        <HERO />
        <US />
      </div>
    </main>
  );
}

export default App;