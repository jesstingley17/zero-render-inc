export function Expertise() {
  return (
    <section id="expertise" className="bg-black text-white py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 text-center">Our Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-white/10 p-8">
            <h3 className="text-2xl font-bold mb-4">Web Development</h3>
            <p className="text-zinc-400">Fast, responsive websites built with modern frameworks</p>
          </div>
          <div className="border border-white/10 p-8">
            <h3 className="text-2xl font-bold mb-4">AI Integration</h3>
            <p className="text-zinc-400">Smart automation and intelligent user experiences</p>
          </div>
          <div className="border border-white/10 p-8">
            <h3 className="text-2xl font-bold mb-4">Brand Identity</h3>
            <p className="text-zinc-400">Sleek design systems that scale with your business</p>
          </div>
        </div>
      </div>
    </section>
  )
}
