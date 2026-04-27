import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';

const skillCategories = [
  { key: 'product', icon: 'fa-chess-queen', color: 'blue' },
  { key: 'ba', icon: 'fa-sitemap', color: 'cyan' },
  { key: 'tools', icon: 'fa-tools', color: 'purple' }
];

function Skills() {
  const { t } = useLanguage();
  const { ref: sectionRef, isInView } = useScrollAnimation();

  const categories = [
    { icon: 'fa-chess-queen', title: t.catProduct, skills: t.skillsProduct, color: 'blue' },
    { icon: 'fa-sitemap', title: t.catBA, skills: t.skillsBA, color: 'cyan' },
    { icon: 'fa-tools', title: t.catTools, skills: t.skillsTools, color: 'purple' }
  ];

  const getColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-500/15 text-blue-500',
      cyan: 'bg-cyan-500/15 text-cyan-500',
      purple: 'bg-purple-500/15 text-purple-400'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="skills" className="px-6 md:px-12 lg:px-20 py-24" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-2">{t.skillsTitle}</h2>
          <p className="text-sm opacity-50">{t.skillsSubtitle}</p>
        </motion.div>

        <motion.div 
          className="glass-card p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                <h4 className="font-display font-semibold mb-4 flex items-center text-sm opacity-80">
                  <i className={`fas ${category.icon} ${getColorClass(category.color).split(' ')[1]} mr-2`}></i>
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span 
                      key={i} 
                      className={`text-xs px-3 py-1.5 rounded-full ${getColorClass(category.color).split(' ')[0]} bg-opacity-50 backdrop-blur-sm border border-current border-opacity-10`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.03 }}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.15 }
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
