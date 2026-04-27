import { motion } from 'framer-motion';

function AuroraBackground() {
  return (
    <>
      {/* Animated gradient orbs */}
      <div className="aurora-container">
        <motion.div 
          className="aurora-blob aurora-blue"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="aurora-blob aurora-cyan"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="aurora-blob aurora-orange"
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
            scale: [1, 1.03, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>
      
      {/* Subtle grid pattern */}
      <div className="grid-pattern"></div>
    </>
  );
}

export default AuroraBackground;
