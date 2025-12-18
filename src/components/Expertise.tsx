import { motion } from "motion/react"
import { Monitor, Cpu, Fingerprint, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const services = [
  {
    icon: Monitor,
    title: "Digital Experiences",
    description:
      "Lightning-fast, accessible websites designed to convert. We prioritize performance and aesthetics in equal measure.",
  },
  {
    icon: Cpu,
    title: "Automated Workflows",
    description: "Streamline operations with AI-driven automation. We build systems that work while you sleep.",
  },
  {
    icon: Fingerprint,
    title: "Brand Identity",
    description:
      "Distinctive, sleek branding that tells your story. Stand out in a crowded marketplace with confidence.",
  },
]

export const Expertise = () => {
  return (
    <section id="expertise" className="py-24 bg-black text-white px-6 border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Our Expertise</h2>
            <p className="text-white/60 text-lg">
              We blend creative design with AI and emerging technology to deliver scalable, modern solutions for small
              businesses.
            </p>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-white/30 text-sm tracking-widest uppercase">01 — Services</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <Card className="bg-zinc-900/50 border-zinc-800 hover:border-white hover:bg-zinc-800/80 transition-all duration-500 h-full relative overflow-hidden cursor-pointer">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                  <ArrowUpRight className="text-white" size={20} />
                </div>
                <CardHeader>
                  <service.icon
                    className="text-white mb-4 group-hover:scale-110 transition-transform duration-300"
                    size={32}
                  />
                  <CardTitle className="text-xl text-white font-medium tracking-tight group-hover:text-zinc-100 transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
