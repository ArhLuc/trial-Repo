import { motion } from "framer-motion";

function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050816]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#22d3ee55,transparent_35%),radial-gradient(circle_at_bottom_right,#f59e0b44,transparent_35%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:70px_70px]" />

      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-24 left-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
      />

      <motion.div
        animate={{ x: [0, -90, 0], y: [0, 70, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl"
      />
    </div>
  );
}

export default Background;