export function Packages() {
  return (
    <section id="packages" className="bg-black text-white py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 text-center">Our Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-white/10 p-8">
            <h3 className="text-2xl font-bold mb-4">Starter</h3>
            <p className="text-4xl font-bold mb-4">$2,999</p>
            <p className="text-zinc-400 mb-6">Perfect for small businesses launching their first site</p>
            <ul className="space-y-2 text-zinc-300">
              <li>5 Page Website</li>
              <li>Mobile Responsive</li>
              <li>SEO Optimized</li>
              <li>1 Month Support</li>
            </ul>
          </div>
          <div className="border border-white/10 p-8 bg-white/5">
            <h3 className="text-2xl font-bold mb-4">Professional</h3>
            <p className="text-4xl font-bold mb-4">$5,999</p>
            <p className="text-zinc-400 mb-6">For growing businesses needing advanced features</p>
            <ul className="space-y-2 text-zinc-300">
              <li>10 Page Website</li>
              <li>Custom Design</li>
              <li>AI Integration</li>
              <li>3 Months Support</li>
            </ul>
          </div>
          <div className="border border-white/10 p-8">
            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
            <p className="text-4xl font-bold mb-4">Custom</p>
            <p className="text-zinc-400 mb-6">Tailored solutions for established businesses</p>
            <ul className="space-y-2 text-zinc-300">
              <li>Unlimited Pages</li>
              <li>Full Customization</li>
              <li>Priority Support</li>
              <li>6 Months Support</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
