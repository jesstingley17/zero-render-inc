export function Team() {
  return (
    <section id="team" className="bg-black text-white py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 text-center">Meet The Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="text-center">
            <img
              src="/jessica-lee-tingley.jpg"
              alt="Jessica-Lee Tingley"
              className="w-64 h-64 object-cover mx-auto mb-6 grayscale"
            />
            <h3 className="text-2xl font-bold mb-2">Jessica-Lee Tingley</h3>
            <p className="text-zinc-400 mb-4">Founder & Web Developer</p>
            <a href="mailto:jtingley@zero-render.com" className="text-white/70 hover:text-white transition-colors">
              jtingley@zero-render.com
            </a>
          </div>
          <div className="text-center">
            <img
              src="/tyler-plymale.jpg"
              alt="Tyler Plymale"
              className="w-64 h-64 object-cover mx-auto mb-6 grayscale"
            />
            <h3 className="text-2xl font-bold mb-2">Tyler Plymale</h3>
            <p className="text-zinc-400 mb-4">Founder & Web Developer</p>
            <a href="mailto:tplymale@zero-render.com" className="text-white/70 hover:text-white transition-colors">
              tplymale@zero-render.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
