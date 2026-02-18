import { motion } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../Icon';

const toBengali = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
};

export default function StreakCounter() {
  const { state, getCompletedActivitiesCount, getTotalActivities, getProgress, getAllActivities, getDailyProgress } = useRamadan();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const totalCompleted = getCompletedActivitiesCount(state.currentDay);
  const totalActs = getTotalActivities();
  const progress = getProgress();
  const acts = getAllActivities();
  
  const daysWithProgress = Object.keys(state.days).filter(day => {
    const actsData = state.days[day]?.acts;
    return actsData && Object.values(actsData).some(v => v);
  }).length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className={`backdrop-blur-sm rounded-2xl p-8 border text-center ${
        isDark ? 'bg-white/10 border-white/10' : 'bg-white/80 border-emerald-100 shadow-lg'
      }`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="relative w-48 h-48 mx-auto mb-6"
        >
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
              strokeWidth="14"
              fill="none"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              stroke="url(#statsGradient)"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={440}
              initial={{ strokeDashoffset: 440 }}
              animate={{ strokeDashoffset: 440 - (progress / 100) * 440 }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            />
            <defs>
              <linearGradient id="statsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-emerald-900'}`}
            >
              {toBengali(progress)}%
            </motion.span>
            <span className={`text-base ${isDark ? 'text-white/60' : 'text-emerald-600'}`}>মোট</span>
          </div>
        </motion.div>
        
        <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-emerald-900'}`}>আপনার অগ্রগতি</h2>
        <p className={`text-lg ${isDark ? 'text-white/60' : 'text-emerald-600'}`}>
          {toBengali(totalCompleted)} / {toBengali(totalActs)} ইবাদত সম্পন্ন
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className={`backdrop-blur-sm rounded-2xl p-6 border text-center ${
            isDark ? 'bg-amber-500/20 border-amber-400/30' : 'bg-amber-50 border-amber-200'
          }`}
        >
          <Icon name="fire" className={`text-4xl mb-3 mx-auto ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
          <p className={`text-base mb-1 ${isDark ? 'text-white/60' : 'text-emerald-600'}`}>বর্তমান স্ট্রিক</p>
          <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-emerald-900'}`}>
            {toBengali(state.streak)} দিন
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className={`backdrop-blur-sm rounded-2xl p-6 border text-center ${
            isDark ? 'bg-emerald-500/20 border-emerald-400/30' : 'bg-emerald-50 border-emerald-200'
          }`}
        >
          <Icon name="calendar" className={`text-4xl mb-3 mx-auto ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
          <p className={`text-base mb-1 ${isDark ? 'text-white/60' : 'text-emerald-600'}`}>সক্রিয় দিন</p>
          <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-emerald-900'}`}>
            {toBengali(daysWithProgress)} / ৩০
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={`backdrop-blur-sm rounded-2xl p-6 border ${
          isDark ? 'bg-white/10 border-white/10' : 'bg-white/80 border-emerald-100 shadow-lg'
        }`}
      >
        <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-emerald-900'}`}>দৈনিক অগ্রগতি</h3>
        <div className="flex gap-1 h-28 items-end">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const dailyProgress = getDailyProgress(day);
            const completed = Math.round((dailyProgress / 100) * acts.length);
            const height = (completed / acts.length) * 100;
            
            return (
              <motion.div
                key={day}
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(height, 8)}%` }}
                transition={{ duration: 0.3, delay: 0.7 + (day * 0.02) }}
                className={`
                  flex-1 rounded-t-sm transition-colors
                  ${completed === acts.length 
                    ? 'bg-emerald-400' 
                    : completed > 0 
                      ? 'bg-amber-400' 
                      : isDark ? 'bg-white/20' : 'bg-emerald-200'
                  }
                `}
                title={`দিন ${toBengali(day)}: ${toBengali(completed)}/${toBengali(acts.length)}`}
              />
            );
          })}
        </div>
        <div className={`flex justify-between mt-3 text-sm ${isDark ? 'text-white/40' : 'text-emerald-400'}`}>
          <span>দিন ১</span>
          <span>দিন ৩০</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
