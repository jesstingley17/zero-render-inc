import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Expertise } from "./components/Expertise"
import { Approach } from "./components/Approach"
import { Packages } from "./components/Packages"
import { Team } from "./components/Team"
import { Vision } from "./components/Vision"
import { Footer } from "./components/Footer"

function App() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black">
      <Header />
      <main>
        <Hero />
        <Expertise />
        <Approach />
        <Packages />
        <Team />
        <Vision />
      </main>
      <Footer />
    </div>
  )
}

export default App
