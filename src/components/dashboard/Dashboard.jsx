import { motion } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../Icon';

const toBengali = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
};

export default function Dashboard() {
  const { state, getAllActivities, getDailyProgress, getCompletedActivitiesCount, getProgress } = useRamadan();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const acts = getAllActivities();
  
  const totalCompleted = getCompletedActivitiesCount(state.currentDay);
  const progress = getProgress();
  
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  
  const getWeeklyProgress = () => {
    const week1 = days.slice(0, 7).reduce((sum, d) => sum + getDailyProgress(d), 0) / 7;
    const week2 = days.slice(7, 14).reduce((sum, d) => sum + getDailyProgress(d), 0) / 7;
    const week3 = days.slice(14, 21).reduce((sum, d) => sum + getDailyProgress(d), 0) / 7;
    const week4 = days.slice(21, 30).reduce((sum, d) => sum + getDailyProgress(d), 0) / 9;
    return [week1, week2, week3, week4];
  };

  const weeklyProgress = getWeeklyProgress();
  
  const getBestDay = () => {
    let bestDay = 1;
    let bestProgress = 0;
    days.forEach(day => {
      const p = getDailyProgress(day);
      if (p > bestProgress) {
        bestProgress = p;
        bestDay = day;
      }
    });
    return { day: bestDay, progress: bestProgress };
  };

  const bestDay = getBestDay();

  const getConsistencyScore = () => {
    const daysWithProgress = days.filter(d => getDailyProgress(d) > 0).length;
    return Math.round((daysWithProgress / 30) * 100);
  };

  const getTrend = () => {
    const recent5 = days.slice(-5).map(d => getDailyProgress(d));
    const avgRecent = recent5.reduce((a, b) => a + b, 0) / 5;
    if (avgRecent > 50) return 'up';
    if (avgRecent > 25) return 'stable';
    return 'down';
  };

  const trend = getTrend();
  const consistency = getConsistencyScore();

  const weekLabels = ['১য়', '২য়', '৩য়', '৪র্থ'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className={`backdrop-blur-sm rounded-2xl p-6 border ${
        isDark ? 'bg-white/10 border-white/10' : 'bg-white/80 border-emerald-100 shadow-lg'
      }`}>
        <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-emerald-900'}`}>
          <Icon name="chartLine" className="text-amber-400" />
          সামগ্রিক ড্যাশবোর্ড
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: 'trophy', value: progress, suffix: '%', label: 'মোট অগ্রগতি', color: 'amber' },
            { icon: 'check', value: totalCompleted, suffix: '', label: 'সম্পন্ন ইবাদত', color: 'emerald' },
            { icon: 'fire', value: state.streak, suffix: '', label: 'স্ট্রিক', color: 'orange' },
            { icon: 'target', value: consistency, suffix: '%', label: 'ধারাবাহিকতা', color: 'blue' }
          ].map((item, idx) => (
            <div key={idx} className={`rounded-xl p-4 text-center ${
              isDark ? 'bg-white/5' : 'bg-emerald-50'
            }`}>
              <Icon name={item.icon} className={`text-2xl mx-auto mb-2 ${
                item.color === 'amber' ? 'text-amber-400' : 
                item.color === 'emerald' ? 'text-emerald-400' :
                item.color === 'orange' ? 'text-orange-400' : 'text-blue-400'
              }`} />
              <p className={`text-xs ${isDark ? 'text-white/60' : 'text-emerald-600'}`}>{item.label}</p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-emerald-900'}`}>
                {toBengali(item.value)}{item.suffix}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-emerald-900'}`}>সাপ্তাহিক অগ্রগতি</h3>
          <div className="grid grid-cols-4 gap-3">
            {weeklyProgress.map((p, i) => (
              <div key={i} className="space-y-2">
                <div className={`h-32 rounded-xl relative overflow-hidden ${isDark ? 'bg-white/5' : 'bg-emerald-50'}`}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${p}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-500 to-amber-500 rounded-xl"
                  />
                </div>
                <p className={`text-xs text-center ${isDark ? 'text-white/60' : 'text-emerald-600'}`}>সপ্তাহ {weekLabels[i]}</p>
                <p className={`text-sm font-medium text-center ${isDark ? 'text-white' : 'text-emerald-900'}`}>{toBengali(Math.round(p))}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`backdrop-blur-sm rounded-2xl p-6 border ${
          isDark ? 'bg-white/10 border-white/10' : 'bg-white/80 border-emerald-100 shadow-lg'
        }`}>
          <h3 className={`font-medium mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-emerald-900'}`}>
            <Icon name="trophy" className="text-amber-400" />
            সেরা দিন
          </h3>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-amber-400">{toBengali(bestDay.day)}</p>
            <p className={isDark ? 'text-white/60' : 'text-emerald-600'}>রমজানের দিন</p>
            <p className={`mt-2 ${isDark ? 'text-white' : 'text-emerald-900'}`}>{toBengali(bestDay.progress)}% সম্পন্ন</p>
          </div>
        </div>

        <div className={`backdrop-blur-sm rounded-2xl p-6 border ${
          isDark ? 'bg-white/10 border-white/10' : 'bg-white/80 border-emerald-100 shadow-lg'
        }`}>
          <h3 className={`font-medium mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-emerald-900'}`}>
            <Icon name="chartBar" className="text-emerald-400" />
            উন্নতির ট্রেন্ড
          </h3>
          <div className="text-center py-4">
            {trend === 'up' ? (
              <>
                <Icon name="chartLine" className="text-4xl mx-auto text-emerald-400" />
                <p className="text-emerald-400 font-medium mt-2">উর্ধ্বমুখী</p>
              </>
            ) : trend === 'stable' ? (
              <>
                <Icon name="chartLine" className="text-4xl mx-auto text-amber-400" />
                <p className="text-amber-400 font-medium mt-2">স্থিতিশীল</p>
              </>
            ) : (
              <>
                <Icon name="chartLine" className="text-4xl mx-auto text-red-400 rotate-180" />
                <p className="text-red-400 font-medium mt-2">নিম্নমুখী</p>
              </>
            )}
            <p className={`text-sm mt-2 ${isDark ? 'text-white/60' : 'text-emerald-600'}`}>শেষ ৫ দিনের গড়</p>
          </div>
        </div>
      </div>

      <div className={`backdrop-blur-sm rounded-2xl p-6 border ${
        isDark ? 'bg-white/10 border-white/10' : 'bg-white/80 border-emerald-100 shadow-lg'
      }`}>
        <h3 className={`font-medium mb-4 ${isDark ? 'text-white' : 'text-emerald-900'}`}>দৈনিক ইবাদত চার্ট</h3>
        <div className="flex gap-1 h-32 items-end">
          {days.map((day) => {
            const p = getDailyProgress(day);
            const dayData = state.days[day];
            const completed = getCompletedActivitiesCount(day);
            const total = acts.length;
            
            return (
              <motion.div
                key={day}
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(p, 4)}%` }}
                transition={{ duration: 0.2, delay: day * 0.01 }}
                className={`
                  flex-1 rounded-t-sm cursor-pointer transition-colors relative group
                  ${completed === total 
                    ? 'bg-emerald-400' 
                    : completed > 0 
                      ? 'bg-amber-400' 
                      : isDark ? 'bg-white/20' : 'bg-emerald-200'
                  }
                `}
              >
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 ${
                  isDark ? 'bg-gray-900 text-white' : 'bg-emerald-900 text-white'
                }`}>
                  দিন {toBengali(day)}: {toBengali(completed)}/{toBengali(total)}
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className={`flex justify-between mt-2 text-xs ${isDark ? 'text-white/40' : 'text-emerald-400'}`}>
          <span>দিন ১</span>
          <span>দিন ১৫</span>
          <span>দিন ৩০</span>
        </div>
      </div>

      <div className={`backdrop-blur-sm rounded-2xl p-6 border ${
        isDark ? 'bg-white/10 border-white/10' : 'bg-white/80 border-emerald-100 shadow-lg'
      }`}>
        <h3 className={`font-medium mb-4 ${isDark ? 'text-white' : 'text-emerald-900'}`}>প্রতিটি ইবাদতের অগ্রগতি</h3>
        <div className="space-y-3">
          {acts.map((act) => {
            const totalForAct = days.filter(d => {
              const dayActivities = state.days[d]?.activities || {};
              const value = dayActivities[act.id];
              if (act.inputType === 'boolean') return value;
              if (act.inputType === 'text') return value?.length > 10;
              if (act.inputType === 'scale') return value >= 3;
              if (act.inputType === 'counter' || act.inputType === 'number') return value > 0;
              return false;
            }).length;
            const percentage = Math.round((totalForAct / 30) * 100);
            
            return (
              <div key={act.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Icon name={act.icon} className={`text-sm ${isDark ? 'text-white/70' : 'text-emerald-600'}`} />
                    <span className={`text-sm ${isDark ? 'text-white/90' : 'text-emerald-800'}`}>{act.name}</span>
                  </div>
                  <span className={`text-xs ${isDark ? 'text-white/60' : 'text-emerald-600'}`}>{toBengali(totalForAct)}/৩০ দিন</span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-emerald-100'}`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full rounded-full ${
                      percentage >= 70 ? 'bg-emerald-400' : percentage >= 30 ? 'bg-amber-400' : isDark ? 'bg-white/30' : 'bg-emerald-300'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
