import { motion } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../Icon';
import GoalInput from './GoalInput';

export default function Calendar() {
  const { state, setCurrentDay, getDailyProgress } = useRamadan();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const getDayStatus = (day) => {
    const progress = getDailyProgress(day);
    if (progress === 0) return 'empty';
    if (progress === 100) return 'complete';
    return 'partial';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className={`backdrop-blur-sm rounded-2xl p-6 border ${
        isDark 
          ? 'bg-white/10 border-white/10' 
          : 'bg-white/80 border-emerald-100 shadow-lg'
      }`}>
        <h2 className={`text-xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-emerald-900'}`}>রমজান ক্যালেন্ডার</h2>
        
        <div className="grid grid-cols-6 sm:grid-cols-7 gap-2">
          {['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র', 'শনি'].map((day) => (
            <div key={day} className={`text-center text-xs py-2 ${isDark ? 'text-white/50' : 'text-emerald-600'}`}>
              {day}
            </div>
          ))}
          
          {days.map((day) => {
            const status = getDayStatus(day);
            const isActive = state.currentDay === day;
            
            return (
              <motion.button
                key={day}
                onClick={() => setCurrentDay(day)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  aspect-square rounded-xl font-medium text-sm flex flex-col items-center justify-center gap-1
                  transition-all duration-200 border
                  ${isActive 
                    ? 'bg-amber-400 text-emerald-900 border-amber-400 shadow-lg shadow-amber-400/30' 
                    : status === 'complete'
                      ? isDark
                        ? 'bg-emerald-500/50 text-white border-emerald-400/50'
                        : 'bg-emerald-200 text-emerald-800 border-emerald-300'
                      : status === 'partial'
                        ? isDark
                          ? 'bg-amber-500/30 text-white border-amber-400/30'
                          : 'bg-amber-100 text-emerald-800 border-amber-200'
                        : isDark
                          ? 'bg-white/10 text-white/70 border-white/10 hover:bg-white/20'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100'
                  }
                `}
              >
                <span>{day}</span>
                {status === 'complete' && <Icon name="check" className="text-xs" />}
                {status === 'partial' && <span className="text-xs">.</span>}
              </motion.button>
            );
          })}
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-emerald-500/50' : 'bg-emerald-400'}`}></div>
            <span className={`text-xs ${isDark ? 'text-white/60' : 'text-emerald-600'}`}>সম্পূর্ণ</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-amber-500/30' : 'bg-amber-300'}`}></div>
            <span className={`text-xs ${isDark ? 'text-white/60' : 'text-emerald-600'}`}>আংশিক</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-white/10' : 'bg-emerald-200'}`}></div>
            <span className={`text-xs ${isDark ? 'text-white/60' : 'text-emerald-600'}`}>খালি</span>
          </div>
        </div>
      </div>

      <GoalInput />
    </motion.div>
  );
}
