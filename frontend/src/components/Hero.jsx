import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-44 pb-20 text-center">

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .7 }}
        className="text-6xl md:text-8xl font-black leading-tight"
      >
        Railway
        <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-amber-300 bg-clip-text text-transparent">
          Intelligence
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:.4 }}
        className="mx-auto mt-8 max-w-2xl text-lg text-slate-300"
      >
        AI powered railway delay prediction using Machine Learning,
        weather intelligence and operational analytics.
      </motion.p>

    </section>
  );
}