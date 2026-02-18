import { motion } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../Icon';
import { SORTED_ACTIVITIES_LIST } from '../../data/activities';

export default function SimpleChecklist() {
  const { state, setActivityValue, getActivityValue } = useRamadan();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const currentDay = state.currentDay;

  const handleToggle = (id) => {
    const currentValue = getActivityValue(currentDay, id);
    setActivityValue(currentDay, id, !currentValue);
  };

  return (
    <div className="flex flex-col gap-2">
      {SORTED_ACTIVITIES_LIST.map((item) => {
        const isCompleted = getActivityValue(currentDay, item.id);

        return (
          <motion.div
            key={item.id}
            initial={false}
            animate={{
              backgroundColor: isCompleted
                ? isDark ? 'rgba(16, 185, 129, 0.2)' : '#ECFDF5'
                : isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
              borderColor: isCompleted
                ? '#10B981'
                : isDark ? 'rgba(255, 255, 255, 0.1)' : '#F3F4F6'
            }}
            onClick={() => handleToggle(item.id)}
            className={`
              flex items-center p-3 rounded-xl border cursor-pointer transition-colors relative overflow-hidden group
              ${isCompleted ? '' : 'hover:border-emerald-200 dark:hover:border-white/20'}
            `}
          >
            {/* Checkbox */}
            <div className={`
              w-6 h-6 rounded-md border flex items-center justify-center transition-colors mr-3 shrink-0
              ${isCompleted
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : isDark ? 'border-white/30 group-hover:border-emerald-400' : 'border-gray-300 group-hover:border-emerald-400'
              }
            `}>
              {isCompleted && <Icon name="check" className="text-xs" />}
            </div>

            {/* Text */}
            <span className={`
              flex-1 font-medium text-sm sm:text-base transition-colors
              ${isCompleted
                ? isDark ? 'text-emerald-400' : 'text-emerald-800'
                : isDark ? 'text-white/90' : 'text-gray-700'
              }
            `}>
              {item.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
