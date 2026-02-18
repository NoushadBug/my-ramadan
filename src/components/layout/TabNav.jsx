import { motion } from 'framer-motion';
import Icon from '../Icon';
import { useTheme } from '../../context/ThemeContext';

const tabs = [
  { id: 'tracker', label: 'ট্র্যাকার', icon: 'listCheck' },
  { id: 'planner', label: 'প্ল্যানার', icon: 'calendar' },
  { id: 'stats', label: 'পরিসংখ্যান', icon: 'chartBar' },
  { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: 'chartLine' },
];

export default function TabNav({ activeTab, setActiveTab }) {
  const { theme } = useTheme();

  return (
    <motion.nav 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex justify-center gap-2 py-4 flex-wrap px-2"
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            relative px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2
            ${activeTab === tab.id 
              ? theme === 'dark'
                ? 'text-emerald-900 bg-white shadow-lg' 
                : 'text-white bg-emerald-700 shadow-md'
              : theme === 'dark'
                ? 'text-white/80 bg-white/10 hover:bg-white/20'
                : 'text-emerald-800/70 bg-emerald-100 hover:bg-emerald-200'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className={`absolute inset-0 rounded-xl ${
                theme === 'dark' ? 'bg-white' : 'bg-emerald-700'
              }`}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <Icon name={tab.icon} className="text-sm" />
            <span>{tab.label}</span>
          </span>
        </motion.button>
      ))}
    </motion.nav>
  );
}
