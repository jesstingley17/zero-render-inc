export function Footer() {
  return (
    <footer className="bg-black text-white pt-24 border-t border-white/10">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
              Let's Build the
              <br />
              Future Together.
            </h2>
            <p className="text-zinc-400 text-lg max-w-md">
              Ready to launch or scale your business? Connect with our team.
            </p>
          </div>

          <div className="md:pl-10">
            <h4 className="text-sm uppercase tracking-widest text-zinc-500 mb-6">Sitemap</h4>
            <ul className="space-y-4 text-zinc-300">
              {["Expertise", "Approach", "Packages", "Vision"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-8 text-zinc-500 text-sm text-center">
          <p>© {new Date().getFullYear()} ZeroRender, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
