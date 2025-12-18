"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export const Vision = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"])

  return (
    <section
      id="vision"
      ref={containerRef}
      className="py-32 bg-black text-white overflow-hidden border-t border-white/10 relative"
    >
      <div className="container mx-auto px-6 mb-24 relative z-10">
        <span className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-12 block">Our Purpose</span>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-white tracking-tight">Vision</h3>
            <p className="text-lg md:text-xl leading-relaxed text-zinc-400">
              To empower small businesses with enterprise-level digital tools that are fast, accessible, and
              intelligent. ZeroRender exists to democratize world-class design and technology, helping founders launch
              boldly and scale with confidence in an AI-powered future.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-white tracking-tight">Mission</h3>
            <p className="text-lg md:text-xl leading-relaxed text-zinc-400">
              We create fast, accessible websites, automated workflows, and sleek brand identities for small businesses
              ready to grow. Our platform blends creative design with emerging technology, giving entrepreneurs
              enterprise-level tools without the complexity or cost — so they can focus on what matters most.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full whitespace-nowrap opacity-30 pointer-events-none select-none">
        <motion.div style={{ x }} className="flex whitespace-nowrap">
          <h2 className="text-[10vw] md:text-[8vw] font-bold tracking-tighter leading-none text-zinc-800 uppercase">
            Alive • Intentional • Future-Focused • Bold • Polished •
          </h2>
          <h2 className="text-[10vw] md:text-[8vw] font-bold tracking-tighter leading-none text-zinc-800 uppercase">
            Alive • Intentional • Future-Focused • Bold • Polished •
          </h2>
        </motion.div>
      </div>
    </section>
  )
}
