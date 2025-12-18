"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ContactDialog } from "./ContactDialog"

const webPackages = [
  {
    title: "Starter Website",
    subtitle: "1–3 Pages • Domain Setup",
    features: [
      "Custom 1–3 page website",
      "Fully mobile-optimized design",
      "Domain purchase + full setup",
      "Clean, modern branded color palette",
      "Contact form + navigation setup",
      "1 revision round",
      "7 days post-launch support",
      "Full ownership transferred to client",
    ],
  },
  {
    title: "Business Branding",
    subtitle: "Logo + 5-Page Site",
    features: [
      "Everything in Starter Package",
      "Professional logo design (2 concepts)",
      "Full brand kit (colors, fonts, logo vars)",
      "Custom 5-page website",
      "Copywriting assistance",
      "Social media profile image + banner",
      "10 branded social templates",
      "14 days of support",
      "2 revision rounds",
    ],
  },
  {
    title: "Complete Startup",
    subtitle: "Branding + Automations",
    highlight: true,
    features: [
      "Everything in Branding Package",
      "AI chatbot installation",
      "Smart inquiry form (auto-sorting)",
      "Full website copywriting",
      "3 launch-ready blog posts",
      "Email newsletter template",
      "Appointment booking system setup",
      "Custom thank-you page + invoice",
      "30 days of maintenance",
    ],
  },
  {
    title: "Premium Launch Suite",
    subtitle: "The All-In-One Solution",
    features: [
      "Everything in AI Integration Package",
      "Custom 10–12 page website",
      "AI-powered CRM setup",
      "Automated sales funnel",
      "Merch & Packaging designs",
      "Full Brand Handbook (PDF)",
      "30 branded social templates",
      "Google Business Profile setup",
      "2 months of maintenance",
      "VIP Support & Unlimited revisions",
    ],
  },
]

const designPackages = [
  {
    title: "Logo & Mini Brand Kit",
    subtitle: "Essential Identity",
    features: [
      "Custom logo (2 concepts → 1 final)",
      "Mini brand kit (color palette + fonts)",
      "High-resolution files (PNG/JPG/SVG)",
      "Transparent background versions",
      "Social media profile image",
      "Full ownership + commercial rights",
    ],
  },
  {
    title: "Graphics Creation Pack",
    subtitle: "Social & Marketing Assets",
    features: [
      "10 custom branded social templates",
      "Facebook/Instagram header banner",
      "Up to 6 story highlight covers",
      "Promotional flyer or menu design",
      "Matching color palette + font pairing",
      "Delivered in editable formats",
      "Full rights for business use",
    ],
  },
]

export const Packages = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const handleInquire = (pkgTitle: string) => {
    setSelectedPackage(pkgTitle)
    setIsDialogOpen(true)
  }

  return (
    <section id="packages" className="py-24 bg-zinc-950 text-white border-t border-white/10">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-4 block">Transparent Pricing</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Choose Your Tier</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            From essential branding to full-scale AI integration. We have a package designed for your growth stage.
          </p>
        </div>

        <Tabs defaultValue="web" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-zinc-900 border border-zinc-800 p-1">
              <TabsTrigger
                value="web"
                className="px-8 py-2 text-sm uppercase tracking-wider data-[state=active]:bg-white data-[state=active]:text-black transition-all"
              >
                Web & Automation
              </TabsTrigger>
              <TabsTrigger
                value="design"
                className="px-8 py-2 text-sm uppercase tracking-wider data-[state=active]:bg-white data-[state=active]:text-black transition-all"
              >
                Design Only
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="web">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {webPackages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="h-full"
                >
                  <Card
                    className={`h-full flex flex-col bg-zinc-900/30 border-zinc-800 hover:border-white hover:bg-zinc-800/50 hover:scale-105 transition-all duration-500 relative group cursor-pointer ${pkg.highlight ? "border-white/40 bg-zinc-900/60" : ""}`}
                  >
                    {pkg.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full flex items-center gap-1">
                        <Star size={10} fill="black" /> Recommended
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl text-white font-bold tracking-tight group-hover:text-zinc-100 transition-colors duration-300">
                        {pkg.title}
                      </CardTitle>
                      <CardDescription className="text-zinc-500 uppercase tracking-wider text-xs font-medium group-hover:text-zinc-400 transition-colors duration-300">
                        {pkg.subtitle}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-4">
                        {pkg.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300"
                          >
                            <Check className="w-4 h-4 text-white mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="pt-6">
                      <Button
                        onClick={() => handleInquire(pkg.title)}
                        className={`w-full rounded-none uppercase tracking-widest text-xs h-12 transition-all duration-300 ${pkg.highlight ? "bg-white text-black hover:bg-zinc-900 hover:text-white hover:border-white border border-transparent" : "bg-transparent border border-white/20 hover:bg-white hover:text-black text-white"}`}
                      >
                        Inquire Now
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="design">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {designPackages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full flex flex-col bg-zinc-900/30 border-zinc-800 hover:border-white hover:bg-zinc-800/50 hover:scale-105 transition-all duration-500 group cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-2xl text-white font-bold tracking-tight group-hover:text-zinc-100 transition-colors duration-300">
                        {pkg.title}
                      </CardTitle>
                      <CardDescription className="text-zinc-500 uppercase tracking-wider text-xs font-medium group-hover:text-zinc-400 transition-colors duration-300">
                        {pkg.subtitle}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-4">
                        {pkg.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300"
                          >
                            <Check className="w-4 h-4 text-white mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="pt-6">
                      <Button
                        onClick={() => handleInquire(pkg.title)}
                        className="w-full bg-transparent border border-white/20 hover:bg-white hover:text-black text-white rounded-none uppercase tracking-widest text-xs h-12 transition-all duration-300"
                      >
                        Get Started
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        <ContactDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} packageTitle={selectedPackage} />
      </div>
    </section>
  )
}
