import { motion } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../Icon';
import { getAllActivities } from '../../data/activities';

export default function SimpleChecklist() {
  const { state, setActivityValue, getActivityValue, checklistConfig } = useRamadan();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const currentDay = state.currentDay;
  const allActs = getAllActivities();

  const handleToggle = (id) => {
    const currentValue = getActivityValue(currentDay, id);
    setActivityValue(currentDay, id, !currentValue);
  };

  // Filter activities that are in the config
  const displayItems = checklistConfig.map(id => {
    const act = allActs.find(a => a.id === id);
    if (!act) return null;
    return {
      id: act.id,
      label: act.name,
      icon: act.category?.icon || 'check', // Use category icon if specific icon not mapped
      color: act.category?.color || '#10B981',
      description: act.description
    };
  }).filter(Boolean);

  if (displayItems.length === 0) {
    return (
      <div className={`text-center py-6 ${isDark ? 'text-white/50' : 'text-gray-400'}`}>
        সেটিংসে গিয়ে চেকলিস্ট আইটেম যোগ করুন
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {displayItems.map((item) => {
        const isCompleted = getActivityValue(currentDay, item.id);

        return (
          <motion.button
            key={item.id}
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleToggle(item.id)}
            className={`
              w-full flex items-center p-3 rounded-xl border transition-all duration-200 group
              ${isCompleted
                ? isDark
                  ? 'bg-emerald-500/10 border-emerald-500/50'
                  : 'bg-emerald-50 border-emerald-200'
                : isDark
                  ? 'bg-white/5 border-white/10 hover:bg-white/10'
                  : 'bg-white border-gray-100 hover:bg-gray-50'
              }
            `}
          >
            {/* Checkbox / Icon Area */}
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full mr-3 border-2 transition-colors
              ${isCompleted
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : isDark ? 'border-white/20 text-transparent' : 'border-gray-300 text-transparent'
              }
            `}>
              <Icon name="check" className="text-sm" />
            </div>

            {/* Text Content */}
            <div className="flex-1 text-left">
              <h4 className={`font-medium text-sm ${
                isCompleted
                  ? isDark ? 'text-emerald-400 line-through opacity-70' : 'text-emerald-800 line-through opacity-70'
                  : isDark ? 'text-white' : 'text-gray-800'
              }`}>
                {item.label}
              </h4>
              {item.description && (
                 <p className={`text-xs mt-0.5 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                   {item.description}
                 </p>
              )}
            </div>

            {/* Category Icon (Right side hint) */}
            <div className={`text-lg opacity-20 group-hover:opacity-40 transition-opacity`} style={{ color: item.color }}>
              <Icon name={item.icon} />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
