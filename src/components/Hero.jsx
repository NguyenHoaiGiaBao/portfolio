import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

function Hero() {
  const { t, lang } = useLanguage();
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const text = t.typingText;
    
    const type = () => {
      const currentIndex = indexRef.current;
      
      if (isDeleting) {
        setDisplayText(text.substring(0, currentIndex - 1));
        indexRef.current = currentIndex - 1;
      } else {
        setDisplayText(text.substring(0, currentIndex + 1));
        indexRef.current = currentIndex + 1;
      }

      let speed = isDeleting ? 30 : 70;

      if (!isDeleting && indexRef.current === text.length) {
        speed = 2500;
        setIsDeleting(true);
      } else if (isDeleting && indexRef.current === 0) {
        setIsDeleting(false);
        speed = 500;
      }

      timeoutRef.current = setTimeout(type, speed);
    };

    indexRef.current = 0;
    setDisplayText('');
    setIsDeleting(false);
    timeoutRef.current = setTimeout(type, 500);

    return () => clearTimeout(timeoutRef.current);
  }, [t.typingText, lang]);

  return (
    <header id="hero" className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-20 lg:py-16 relative overflow-hidden">
      {/* Animated gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-40 pointer-events-none">
        <motion.div 
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,123,255,0.15) 0%, rgba(0,212,255,0.08) 40%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Profile & Intro */}
          <motion.div 
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Profile Image */}
            <motion.div variants={itemVariants} className="relative mb-8">
              <motion.div 
                className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-[3px] border-white/20 shadow-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="/1bao2.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/160'}
                />
              </motion.div>
              <motion.div 
                className="absolute -bottom-1 -right-1 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
              >
                <i className="fas fa-check text-white text-sm"></i>
              </motion.div>
            </motion.div>

            {/* Name & Role */}
            <motion.p variants={itemVariants} className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-3">
              {t.role}
            </motion.p>
            
            <motion.h1 variants={itemVariants} className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-4">
              {t.heroGreeting}<br />
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                {t.heroName}
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg font-medium mb-3 opacity-90">
              {t.heroTitle}
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-sm opacity-60 max-w-md leading-relaxed">
              {t.heroDesc}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex gap-3 mt-8">
              <motion.a 
                href="#contact" 
                className="px-6 py-3 bg-blue-500 text-white rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/25"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                {t.contactBtn}
                <i className="fas fa-arrow-right text-xs"></i>
              </motion.a>
              <motion.button 
                className="px-6 py-3 bg-black/5 dark:bg-white/10 rounded-full text-sm font-semibold flex items-center gap-2 backdrop-blur-sm border border-black/10 dark:border-white/10"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <i className="fas fa-download text-xs"></i>
                {t.cvBtn}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right: Evolution Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="glass-card p-8">
              <h3 className="font-display font-bold text-xl mb-8 opacity-90">{t.evolutionTitle}</h3>

              {/* Timeline */}
              <div className="space-y-6">
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="w-3 h-3 rounded-full bg-gray-500 shrink-0"></div>
                  <span className="text-sm opacity-60">{t.roleIntern}</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="w-3 h-3 rounded-full bg-blue-500/60 shrink-0"></div>
                  <span className="text-sm opacity-80">{t.roleBA}</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="w-4 h-4 rounded-full bg-blue-500 shrink-0 shadow-lg shadow-blue-500/40"></div>
                  <span className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    {t.rolePO}
                  </span>
                </motion.div>
              </div>

              {/* Metrics */}
              <motion.div 
                className="mt-8 pt-6 border-t border-current border-opacity-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-500">4</p>
                    <p className="text-[11px] opacity-60 mt-1">{t.metricTeam}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">4+</p>
                    <p className="text-[11px] opacity-60 mt-1">{t.metricVision}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-500">-25%</p>
                    <p className="text-[11px] opacity-60 mt-1">{t.metricRework}</p>
                  </div>
                </div>
              </motion.div>

              {/* Company */}
              <div className="mt-6 pt-4 border-t border-current border-opacity-10 flex justify-between items-center text-xs opacity-50">
                <span>Sea Dragon Technology Co., Ltd</span>
                <span>06/2025 - Present</span>
              </div>
            </div>

            {/* Typing text below card */}
            <motion.p 
              className="mt-6 text-sm opacity-70 pl-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.9 }}
            >
              {displayText}
              <span className="inline-block w-0.5 h-4 bg-blue-500 ml-1 animate-pulse"></span>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </header>
  );
}

export default Hero;
