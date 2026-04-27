import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';

const methodsData = [
  { key: 'discovery', icon: 'fa-lightbulb', color: 'blue' },
  { key: 'backlog', icon: 'fa-layer-group', color: 'blue' },
  { key: 'roadmap', icon: 'fa-map-marked-alt', color: 'orange' },
  { key: 'data', icon: 'fa-chart-line', color: 'orange' }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

function Methodology() {
  const { t } = useLanguage();
  const { ref: sectionRef, isInView } = useScrollAnimation();

  const methods = [
    { icon: 'fa-lightbulb', color: 'blue', title: t.discoveryTitle, desc: t.discoveryDesc, tags: ['Research', 'Strategy'] },
    { icon: 'fa-layer-group', color: 'blue', title: t.backlogTitle, desc: t.backlogDesc, tags: ['Agile', 'Scrum'] },
    { icon: 'fa-map-marked-alt', color: 'orange', title: t.roadmapTitle, desc: t.roadmapDesc, tags: ['Planning', 'OKRs'] },
    { icon: 'fa-chart-line', color: 'orange', title: t.dataTitle, desc: t.dataDesc, tags: ['Analytics', 'KPIs'] }
  ];

  const getColorClass = (color) => {
    return color === 'blue' 
      ? { bg: 'bg-blue-500/15', text: 'text-blue-500' }
      : { bg: 'bg-orange-500/15', text: 'text-orange-500' };
  };

  return (
    <section id="methodology" className="px-6 md:px-12 lg:px-20 py-24" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">{t.methodologyTitle}</h2>
          <p className="text-sm opacity-50">{t.methodologySubtitle}</p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {methods.map((method, index) => {
            const colors = getColorClass(method.color);
            return (
              <motion.div 
                key={index} 
                className="glass-card p-6"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02, 
                  y: -4,
                  transition: { duration: 0.25 }
                }}
              >
                <motion.div 
                  className={`w-12 h-12 rounded-2xl ${colors.bg} flex items-center justify-center mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <i className={`fas ${method.icon} ${colors.text} text-xl`}></i>
                </motion.div>
                
                <h3 className="font-display font-bold text-base mb-2">{method.title}</h3>
                <p className="text-xs opacity-50 mb-4 leading-relaxed">{method.desc}</p>
                
                <div className="flex flex-wrap gap-1.5">
                  {method.tags.map((tag, i) => (
                    <span key={i} className={`text-[10px] px-2 py-1 rounded ${colors.bg} opacity-80`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Connecting line - desktop only */}
        <motion.div 
          className="hidden lg:block h-0.5 mt-8 mx-12"
          style={{
            background: 'linear-gradient(90deg, rgba(0,123,255,0.2), rgba(0,212,255,0.4), rgba(0,123,255,0.2))'
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </div>
    </section>
  );
}

export default Methodology;
