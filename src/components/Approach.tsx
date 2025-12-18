import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

export const Approach = () => {
  return (
    <section id="approach" className="py-32 bg-zinc-950 text-white px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-zinc-900/50 to-transparent pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-4 block">
              The Philosophy
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-8">
              Enterprise Tools.<br />
              <span className="text-zinc-500">Zero Complexity.</span>
            </h2>
            <div className="space-y-6 text-lg text-zinc-400">
              <p>
                Small businesses deserve the same technological advantages as global corporations. 
                We bridge the gap by demystifying AI and automation.
              </p>
              <p>
                Our platform integrates cutting-edge design principles with robust backend logic, 
                giving you a powerful digital foundation that scales with your ambition.
              </p>
            </div>
            <div className="mt-10">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none uppercase tracking-wider px-8 py-6 text-sm transition-all">
                Learn About Our Process
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-zinc-800 to-black border border-zinc-800 p-8 flex flex-col justify-between">
              <div className="text-6xl font-light text-zinc-700">ZR</div>
              <div className="space-y-4">
                <div className="h-px w-full bg-zinc-800" />
                <div className="flex justify-between text-zinc-500 text-sm uppercase tracking-wider">
                  <span>Speed</span>
                  <span>99/100</span>
                </div>
                 <div className="h-px w-full bg-zinc-800" />
                <div className="flex justify-between text-zinc-500 text-sm uppercase tracking-wider">
                  <span>Access</span>
                  <span>100%</span>
                </div>
                 <div className="h-px w-full bg-zinc-800" />
                <div className="flex justify-between text-zinc-500 text-sm uppercase tracking-wider">
                  <span>Scale</span>
                  <span>Infinite</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
