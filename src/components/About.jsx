import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

function About() {
  const { t } = useLanguage();
  const { ref: sectionRef, isInView } = useScrollAnimation();

  return (
    <section id="about" className="px-6 md:px-12 lg:px-20 py-24" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="grid lg:grid-cols-2 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {/* About Card */}
          <motion.div variants={cardVariants}>
            <div className="glass-card p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <motion.div 
                  className="w-12 h-12 rounded-2xl bg-blue-500/15 flex items-center justify-center"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <i className="fas fa-user text-blue-500 text-lg"></i>
                </motion.div>
                <h2 className="font-display font-bold text-2xl">{t.aboutTitle}</h2>
              </div>
              <div className="space-y-4 text-sm leading-relaxed opacity-80">
                <p>{t.aboutContent1}</p>
                <p>{t.aboutContent2}</p>
              </div>
            </div>
          </motion.div>

          {/* Goals Card */}
          <motion.div variants={cardVariants}>
            <div className="glass-card p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <motion.div 
                  className="w-12 h-12 rounded-2xl bg-orange-500/15 flex items-center justify-center"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <i className="fas fa-bullseye text-orange-500 text-lg"></i>
                </motion.div>
                <h2 className="font-display font-bold text-2xl">{t.goalsTitle}</h2>
              </div>

              <div className="space-y-6">
                <motion.div 
                  className="relative pl-5 border-l-2 border-blue-500/30"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  <h3 className="font-semibold text-sm mb-1">{t.shortTermTitle}</h3>
                  <p className="text-xs opacity-60 leading-relaxed">{t.shortTermDesc}</p>
                </motion.div>

                <motion.div 
                  className="relative pl-5 border-l-2 border-orange-500/30"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                  <h3 className="font-semibold text-sm mb-1">{t.longTermTitle}</h3>
                  <p className="text-xs opacity-60 leading-relaxed">{t.longTermDesc}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
