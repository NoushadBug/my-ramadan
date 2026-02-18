import { motion } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import Icon from '../Icon';

export default function StreakCounter() {
  const { state, getTotalCompleted, getTotalActs, getProgress, getActs, getDailyProgress } = useRamadan();
  
  const totalCompleted = getTotalCompleted();
  const totalActs = getTotalActs();
  const progress = getProgress();
  const acts = getActs();
  
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
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="relative w-40 h-40 mx-auto mb-6"
        >
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="70"
              cy="70"
              r="60"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="12"
              fill="none"
            />
            <motion.circle
              cx="70"
              cy="70"
              r="60"
              stroke="url(#statsGradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={377}
              initial={{ strokeDashoffset: 377 }}
              animate={{ strokeDashoffset: 377 - (progress / 100) * 377 }}
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
              className="text-4xl font-bold text-white"
            >
              {progress}%
            </motion.span>
            <span className="text-white/60 text-sm">মোট</span>
          </div>
        </motion.div>
        
        <h2 className="text-2xl font-bold text-white mb-2">আপনার অগ্রগতি</h2>
        <p className="text-white/60">
          {totalCompleted} / {totalActs} ইবাদত সম্পন্ন
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-amber-500/20 backdrop-blur-sm rounded-2xl p-6 border border-amber-400/30 text-center"
        >
          <Icon name="fire" className="text-3xl text-amber-400 mb-2 mx-auto" />
          <p className="text-white/60 text-sm">বর্তমান স্ট্রিক</p>
          <p className="text-2xl font-bold text-white">
            {state.streak} দিন
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-emerald-500/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/30 text-center"
        >
          <Icon name="calendar" className="text-3xl text-emerald-400 mb-2 mx-auto" />
          <p className="text-white/60 text-sm">সক্রিয় দিন</p>
          <p className="text-2xl font-bold text-white">
            {daysWithProgress} / ৩০
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
      >
        <h3 className="text-lg font-bold text-white mb-4">দৈনিক অগ্রগতি</h3>
        <div className="flex gap-1 h-24 items-end">
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
                      : 'bg-white/20'
                  }
                `}
                title={`দিন ${day}: ${completed}/${acts.length}`}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-xs text-white/40">
          <span>দিন ১</span>
          <span>দিন ৩০</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
