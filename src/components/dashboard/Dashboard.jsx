import { motion } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import Icon from '../Icon';

export default function Dashboard() {
  const { state, getActs, getDailyProgress, getDayStats, getTotalCompleted, getTotalActs, getProgress } = useRamadan();
  const acts = getActs();
  
  const totalCompleted = getTotalCompleted();
  const totalActs = getTotalActs();
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

  const getWorstDay = () => {
    let worstDay = 1;
    let worstProgress = 100;
    days.forEach(day => {
      const p = getDailyProgress(day);
      if (p < worstProgress && p > 0) {
        worstProgress = p;
        worstDay = day;
      }
    });
    return { day: worstDay, progress: worstProgress };
  };

  const bestDay = getBestDay();
  const worstDay = getWorstDay();

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Icon name="chartLine" className="text-amber-400" />
          সামগ্রিক ড্যাশবোর্ড
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <Icon name="trophy" className="text-2xl text-amber-400 mx-auto mb-2" />
            <p className="text-white/60 text-xs">মোট অগ্রগতি</p>
            <p className="text-2xl font-bold text-white">{progress}%</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <Icon name="check" className="text-2xl text-emerald-400 mx-auto mb-2" />
            <p className="text-white/60 text-xs">সম্পন্ন ইবাদত</p>
            <p className="text-2xl font-bold text-white">{totalCompleted}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <Icon name="fire" className="text-2xl text-orange-400 mx-auto mb-2" />
            <p className="text-white/60 text-xs">স্ট্রিক</p>
            <p className="text-2xl font-bold text-white">{state.streak}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <Icon name="target" className="text-2xl text-blue-400 mx-auto mb-2" />
            <p className="text-white/60 text-xs">ধারাবাহিকতা</p>
            <p className="text-2xl font-bold text-white">{consistency}%</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-white font-medium">সাপ্তাহিক অগ্রগতি</h3>
          <div className="grid grid-cols-4 gap-3">
            {weeklyProgress.map((p, i) => (
              <div key={i} className="space-y-2">
                <div className="h-32 bg-white/5 rounded-xl relative overflow-hidden">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${p}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-500 to-amber-500 rounded-xl"
                  />
                </div>
                <p className="text-white/60 text-xs text-center">সপ্তাহ {i + 1}</p>
                <p className="text-white text-sm font-medium text-center">{Math.round(p)}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-white font-medium mb-4 flex items-center gap-2">
            <Icon name="trophy" className="text-amber-400" />
            সেরা দিন
          </h3>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-amber-400">{bestDay.day}</p>
            <p className="text-white/60">রমজানের দিন</p>
            <p className="text-white mt-2">{bestDay.progress}% সম্পন্ন</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-white font-medium mb-4 flex items-center gap-2">
            <Icon name="chartBar" className="text-emerald-400" />
            উন্নতির ট্রেন্ড
          </h3>
          <div className="text-center py-4">
            {trend === 'up' ? (
              <>
                <Icon name="chartLine" className="text-4xl text-emerald-400 mx-auto" />
                <p className="text-emerald-400 font-medium mt-2">উর্ধ্বমুখী</p>
              </>
            ) : trend === 'stable' ? (
              <>
                <Icon name="chartLine" className="text-4xl text-amber-400 mx-auto" />
                <p className="text-amber-400 font-medium mt-2">স্থিতিশীল</p>
              </>
            ) : (
              <>
                <Icon name="chartLine" className="text-4xl text-red-400 mx-auto rotate-180" />
                <p className="text-red-400 font-medium mt-2">নিম্নমুখী</p>
              </>
            )}
            <p className="text-white/60 text-sm mt-2">শেষ ৫ দিনের গড়</p>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-white font-medium mb-4">দৈনিক ইবাদত চার্ট</h3>
        <div className="flex gap-1 h-32 items-end">
          {days.map((day) => {
            const p = getDailyProgress(day);
            const height = p;
            const stats = getDayStats(day);
            
            return (
              <motion.div
                key={day}
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(height, 4)}%` }}
                transition={{ duration: 0.2, delay: day * 0.01 }}
                className={`
                  flex-1 rounded-t-sm cursor-pointer transition-colors relative group
                  ${stats.completed === stats.total 
                    ? 'bg-emerald-400' 
                    : stats.completed > 0 
                      ? 'bg-amber-400' 
                      : 'bg-white/20'
                  }
                `}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  দিন {day}: {stats.completed}/{stats.total}
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-xs text-white/40">
          <span>দিন ১</span>
          <span>দিন ১৫</span>
          <span>দিন ৩০</span>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-white font-medium mb-4">প্রতিটি ইবাদতের অগ্রগতি</h3>
        <div className="space-y-3">
          {acts.map((act) => {
            const totalForAct = days.filter(d => {
              const dayActs = state.days[d]?.acts || {};
              return dayActs[act.id];
            }).length;
            const percentage = Math.round((totalForAct / 30) * 100);
            
            return (
              <div key={act.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Icon name={act.icon} className="text-white/70 text-sm" />
                    <span className="text-white/90 text-sm">{act.name}</span>
                  </div>
                  <span className="text-white/60 text-xs">{totalForAct}/৩০ দিন</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full rounded-full ${
                      percentage >= 70 ? 'bg-emerald-400' : percentage >= 30 ? 'bg-amber-400' : 'bg-white/30'
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
