import { ArrowDown } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-sm md:text-base uppercase tracking-[0.3em] text-white/50 mb-6">
          Future-Proof Digital Solutions
        </h2>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight">
          Design. Intelligence.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Perfection.</span>
        </h1>

        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-12">
          ZeroRender is a design-tech startup building modern, AI-powered digital experiences for small businesses.
          Enterprise-level tools without the complexity or cost.
        </p>
      </div>

      <div className="absolute bottom-12">
        <ArrowDown className="text-white/30 animate-bounce" size={24} />
      </div>
    </section>
  )
}
