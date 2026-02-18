import { motion } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../Icon';
import ActItem from './ActItem';
import ProgressRing from './ProgressRing';

const toBengali = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
};

export default function DayCard() {
  const { state, getDayData, getCompletedActivitiesCount, setCurrentDay, getAllActivities } = useRamadan();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const currentDay = state.currentDay;
  const dayData = getDayData(currentDay);
  const completedCount = getCompletedActivitiesCount(currentDay);
  const acts = getAllActivities();
  const progress = acts.length > 0 ? Math.round((completedCount / acts.length) * 100) : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
        className={`backdrop-blur-sm rounded-2xl p-6 border ${
          isDark 
            ? 'bg-white/10 border-white/10' 
            : 'bg-white/80 border-emerald-100 shadow-lg'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
              disabled={currentDay === 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700'
              }`}
            >
              <Icon name="chevronLeft" />
            </button>
            <div>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-emerald-900'}`}>
                রমজানের {toBengali(currentDay)}তম দিন
              </h2>
              <p className={`text-sm ${isDark ? 'text-emerald-200' : 'text-emerald-600'}`}>
                {dayData?.date}
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentDay(Math.min(30, currentDay + 1))}
            disabled={currentDay === 30}
            className={`w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${
              isDark 
                ? 'bg-white/10 hover:bg-white/20 text-white' 
                : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700'
            }`}
          >
            <Icon name="chevronRight" />
          </button>
        </div>

        <div className={`flex items-center gap-6 p-4 rounded-xl ${
          isDark ? 'bg-white/5' : 'bg-emerald-50'
        }`}>
          <ProgressRing progress={progress} size={70} />
          <div className="flex-1">
            <p className={`text-sm mb-1 ${isDark ? 'text-white/70' : 'text-emerald-700'}`}>আজকের অগ্রগতি</p>
            <p className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-emerald-900'}`}>
              {toBengali(completedCount)} / {toBengali(acts.length)} ইবাদত সম্পন্ন
            </p>
            <div className={`mt-2 h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-emerald-200'}`}>
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
        className="space-y-3"
      >
        <h3 className={`font-medium mb-4 px-1 ${isDark ? 'text-white/80' : 'text-emerald-800'}`}>আজকের ইবাদতসমূহ</h3>
        {acts.map((act) => (
          <ActItem
            key={act.id}
            act={act}
            day={currentDay}
            isCompleted={dayData?.acts[act.id] || false}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
