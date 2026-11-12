import { Train, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto mt-6 flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-xl">

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-400/15 p-3">
            <Train className="text-cyan-300" />
          </div>

          <div>
            <h1 className="text-xl font-bold">RailMind AI</h1>
            <p className="text-xs text-slate-400">
              Intelligent Railway Prediction
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm">
          <Cpu size={16} />
          AI Powered
        </div>

      </div>
    </motion.nav>
  );
}