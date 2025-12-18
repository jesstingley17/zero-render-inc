import { motion } from "motion/react"
import { ArrowDown } from "lucide-react"

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-[96px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-sm md:text-base uppercase tracking-[0.3em] text-white/50 mb-6">
            Future-Proof Digital Solutions
          </h2>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight"
        >
          Design. Intelligence.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
            Perfection.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          ZeroRender is a design-tech startup building modern, AI-powered digital experiences for small businesses.
          Enterprise-level tools without the complexity or cost.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="text-white/30 animate-bounce" size={24} />
      </motion.div>
    </section>
  )
}
