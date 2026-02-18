import { motion } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../Icon';

export default function ActItem({ act, day, isCompleted }) {
  const { toggleAct } = useRamadan();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => toggleAct(day, act.id)}
      className={`
        group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border
        ${isCompleted 
          ? isDark 
            ? 'bg-emerald-500/30 border-emerald-400/50' 
            : 'bg-emerald-100 border-emerald-200'
          : isDark
            ? 'bg-white/10 border-white/10 hover:bg-white/15'
            : 'bg-white border-emerald-100 hover:bg-emerald-50'
        }
      `}
    >
      <motion.div
        className={`
          w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
          ${isCompleted 
            ? 'bg-emerald-400' 
            : isDark 
              ? 'bg-white/20' 
              : 'bg-emerald-100'
          }
        `}
        animate={isCompleted ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {isCompleted ? (
          <Icon name="check" className="text-emerald-900 text-lg" />
        ) : (
          <Icon name={act.icon} className={isDark ? 'text-white text-lg' : 'text-emerald-700 text-lg'} />
        )}
      </motion.div>
      
      <span className={`
        flex-1 font-medium text-base transition-colors duration-200
        ${isCompleted 
          ? isDark ? 'text-white' : 'text-emerald-900'
          : isDark ? 'text-white/90' : 'text-emerald-800'
        }
      `}>
        {act.name}
      </span>
      
      <motion.div
        className={`
          w-6 h-6 rounded-md border-2 flex items-center justify-center
          ${isCompleted 
            ? 'bg-emerald-400 border-emerald-400' 
            : isDark 
              ? 'border-white/40 group-hover:border-white/60'
              : 'border-emerald-300 group-hover:border-emerald-400'
          }
        `}
      >
        {isCompleted && (
          <motion.svg
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="w-4 h-4 text-emerald-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        )}
      </motion.div>
    </motion.div>
  );
}
