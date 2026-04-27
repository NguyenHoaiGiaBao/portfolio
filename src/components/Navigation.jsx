import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

function Navigation({ activeSection }) {
  const { lang, setLang, t } = useLanguage();
  const { darkMode, toggleTheme } = useTheme();

  const navItems = [
    { id: 'hero', label: t.navHome },
    { id: 'about', label: t.navAbout },
    { id: 'projects', label: t.navProjects },
    { id: 'skills', label: t.navSkills },
    { id: 'contact', label: t.navContact },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav 
      className="nav-container fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex justify-between items-center px-6 md:px-12 lg:px-20 h-16 max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="font-display font-bold text-xl tracking-tight">
            Bảo<span className="text-blue-500">.</span>
          </span>
        </motion.div>

        {/* Desktop Nav Links */}
        <motion.div 
          className="hidden lg:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`nav-link relative ${activeSection === item.id ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  className="absolute inset-0 bg-current rounded-full -z-10"
                  layoutId="navIndicator"
                  style={{ opacity: 0.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Right Controls */}
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              <motion.i
                key={darkMode ? 'sun' : 'moon'}
                className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-sm`}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>
          </motion.button>

          {/* Language Toggle */}
          <div className="flex items-center gap-1 bg-black/5 dark:bg-white/10 rounded-full p-1 border border-black/10 dark:border-white/10">
            {['vie', 'eng'].map((l) => (
              <motion.button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 text-[11px] font-semibold uppercase rounded-full transition-colors ${
                  lang === l 
                    ? 'bg-blue-500 text-white' 
                    : 'opacity-60 hover:opacity-100'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                {l === 'vie' ? 'VI' : 'EN'}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navigation;
