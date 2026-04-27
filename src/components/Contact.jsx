import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';

function Contact() {
  const { t } = useLanguage();
  const { ref: sectionRef, isInView } = useScrollAnimation();

  const socialLinks = [
    { icon: 'fa-linkedin-in', label: 'LinkedIn', href: '#' },
    { icon: 'fa-github', label: 'GitHub', href: '#' },
    { icon: 'fa-envelope', label: 'Email', href: 'mailto:nguyenhoaigiabao.bt@gmail.com' }
  ];

  return (
    <section id="contact" className="px-6 md:px-12 lg:px-20 py-24" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="glass-card p-8 md:p-10"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <motion.h3 
                className="font-display font-bold text-2xl mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                {t.contactTitle}
              </motion.h3>
              
              <motion.div 
                className="flex gap-3 mb-8"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
              >
                {socialLinks.map((link, i) => (
                  <motion.a 
                    key={i}
                    href={link.href}
                    className="w-11 h-11 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center border border-black/10 dark:border-white/10"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    aria-label={link.label}
                  >
                    <i className={`fab ${link.icon} text-sm opacity-70`}></i>
                  </motion.a>
                ))}
              </motion.div>

              <motion.div 
                className="space-y-3 text-sm"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                <p className="opacity-70 flex items-center">
                  <i className="fas fa-phone mr-3 text-blue-500/70 w-4 text-center"></i>
                  0387 227 939
                </p>
                <p className="opacity-70 flex items-center">
                  <i className="fas fa-map-marker-alt mr-3 text-blue-500/70 w-4 text-center"></i>
                  {t.location}
                </p>
              </motion.div>
            </div>

            {/* Right */}
            <motion.div 
              className="flex flex-col items-start md:items-end"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm opacity-50 mb-6 text-left md:text-right max-w-xs">
                {t.ctaDesc}
              </p>
              <motion.button 
                className="px-8 py-4 bg-blue-500 text-white rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/25"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <i className="fas fa-download"></i>
                {t.downloadCV}
              </motion.button>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div 
            className="mt-10 pt-6 border-t border-current border-opacity-10 flex flex-col md:flex-row justify-between items-center text-xs opacity-50"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.5 } : {}}
            transition={{ delay: 0.5 }}
          >
            <p>&copy; 2026 {t.name}. {t.roleShort}.</p>
            <p className="mt-2 md:mt-0">Sea Dragon Technology Co., Ltd | 06/2025 - Present</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
