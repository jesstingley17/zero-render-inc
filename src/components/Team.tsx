"use client"

import { motion } from "motion/react"
import { JobApplicationForm } from "./JobApplicationForm"
import { Linkedin, Mail } from "lucide-react"

const teamMembers = [
  {
    name: "Jessica-Lee Tingley",
    role: "Founder & Web Developer",
    bio: "Co-founder of ZeroRender, Jessica-Lee brings creative vision and technical expertise to build modern, AI-powered digital experiences for small businesses.",
    image: "/jessica-lee-tingley.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/jessica-lee-tingley-a25068190",
      email: "jtingley@zero-render.com",
    },
  },
  {
    name: "Tyler Plymale",
    role: "Founder & Web Developer",
    image: "/tyler-plymale.jpg",
    bio: "Co-founder of ZeroRender, Tyler combines innovative development skills with emerging technology to help entrepreneurs launch and scale with confidence.",
    social: {
      email: "tplymale@zero-render.com",
    },
  },
]

export const Team = () => {
  return (
    <section id="team" className="py-32 bg-black">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <h2 className="text-6xl md:text-8xl font-light tracking-tight text-white mb-6 text-balance">Meet The Team</h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto text-pretty">
            The founders behind ZeroRender's design-tech platform for small business
          </p>
        </motion.div>

        {/* Team Grid - Centered with 2 columns max */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 max-w-5xl">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-zinc-900">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 grayscale"
                  />

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                      >
                        <Linkedin className="w-5 h-5 text-white" />
                      </a>
                    )}
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                      >
                        <Mail className="w-5 h-5 text-white" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-2xl font-light text-white mb-1 tracking-tight">{member.name}</h3>
                  <p className="text-sm uppercase tracking-widest text-white/50 mb-4">{member.role}</p>
                  <p className="text-white/70 leading-relaxed text-pretty">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Job Application Form */}
        <JobApplicationForm />
      </div>
    </section>
  )
}
