import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';

const projectsData = [
  { key: 1, icon: 'fa-tasks', iconColor: 'blue' },
  { key: 2, icon: 'fa-users-cog', iconColor: 'orange' },
  { key: 3, icon: 'fa-chart-pie', iconColor: 'purple' }
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

function Projects() {
  const { t } = useLanguage();
  const { ref: sectionRef, isInView } = useScrollAnimation();

  const projects = [
    {
      id: 1,
      icon: 'fa-tasks',
      iconColor: 'blue',
      title: t.project1Title,
      badge: t.project1Badge,
      desc: t.project1Desc,
      tags: ['Workflow Design', 'Task Management', 'Single Source of Truth']
    },
    {
      id: 2,
      icon: 'fa-users-cog',
      iconColor: 'orange',
      title: t.project2Title,
      badge: t.project2Badge,
      desc: t.project2Desc,
      tags: ['GPS + 2FA Check-in', 'Multi-level Department', '-20% Rework Rate'],
      features: [
        { icon: 'fa-paint-brush', text: 'Spatial UI + Dark Mode' },
        { icon: 'fa-route', text: 'Dynamic Approval Flow' },
        { icon: 'fa-cut', text: 'Scope Management' }
      ]
    },
    {
      id: 3,
      icon: 'fa-chart-pie',
      iconColor: 'purple',
      title: t.project3Title,
      badge: t.project3Badge,
      desc: t.project3Desc,
      tags: ['ROI Tracking', 'Affiliate Analytics', 'MVP Mindset']
    }
  ];

  const getColorClass = (color) => {
    const colors = {
      blue: { bg: 'bg-blue-500/15', text: 'text-blue-500', border: 'border-blue-500/20' },
      orange: { bg: 'bg-orange-500/15', text: 'text-orange-500', border: 'border-orange-500/20' },
      purple: { bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-500/20' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="projects" className="px-6 md:px-12 lg:px-20 py-24" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-2">{t.projectsTitle}</h2>
          <p className="text-sm opacity-50">{t.projectsSubtitle}</p>
        </motion.div>

        <motion.div 
          className="space-y-5"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 }
            }
          }}
        >
          {projects.map((project) => {
            const colors = getColorClass(project.iconColor);
            return (
              <motion.div 
                key={project.id} 
                className="glass-card p-6 md:p-8"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.01, 
                  y: -4,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                  <motion.div 
                    className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center shrink-0`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <i className={`fas ${project.icon} ${colors.text} text-2xl`}></i>
                  </motion.div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="font-display font-bold text-lg md:text-xl">{project.title}</h3>
                      <span className={`text-[11px] px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                        {project.badge}
                      </span>
                    </div>
                    
                    <p className="text-sm opacity-60 mb-5 leading-relaxed">{project.desc}</p>
                    
                    {project.features && (
                      <div className="grid md:grid-cols-3 gap-3 mb-5">
                        {project.features.map((feature, i) => (
                          <motion.div 
                            key={i} 
                            className="text-xs p-3 rounded-xl bg-blue-500/5 border border-blue-500/10"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i }}
                          >
                            <i className={`fas ${feature.icon} ${colors.text} mr-2`}></i>
                            <span className="opacity-70">{feature.text}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className={`text-[11px] px-2.5 py-1 rounded-full ${colors.bg} opacity-80`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
