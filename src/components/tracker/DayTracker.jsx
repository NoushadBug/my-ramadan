import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../Icon';
import ActivityItem from './ActivityItem';
import QuranTracker from './QuranTracker';
import GoalInput from '../planner/GoalInput';
import PrayerTimesWidget from '../dashboard/PrayerTimesWidget';
import SimpleChecklist from './SimpleChecklist';

const toBengali = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
};

export default function DayTracker() {
  const { 
    state, 
    getDayData, 
    setActivityValue, 
    getDailyScore, 
    getDailyProgress, 
    getCategoryActivities,
    isLast10Days,
    updateQuranTracker,
    CATEGORIES,
    quranTracker,
    setCurrentDay
  } = useRamadan();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [viewMode, setViewMode] = useState('simple'); // 'simple' | 'detailed'
  const [activeCategory, setActiveCategory] = useState('all');
  const [showQuran, setShowQuran] = useState(false);

  const currentDay = state.currentDay;
  const dayData = getDayData(currentDay);
  const isLast10 = isLast10Days(currentDay);
  const dailyScore = getDailyScore(currentDay);
  const dailyProgress = getDailyProgress(currentDay);

  const categories = Object.values(CATEGORIES);

  const getCategoryProgress = (catId) => {
    const activities = getCategoryActivities(catId);
    const completed = activities.filter(a => {
      if (a.onlyLast10 && !isLast10 && currentDay < 21) return false;
      const value = dayData?.activities?.[a.id];
      if (a.inputType === 'boolean') return value;
      if (a.inputType === 'text') return value?.length > 10;
      if (a.inputType === 'scale') return value >= 3;
      if (a.inputType === 'counter' || a.inputType === 'number') return value > 0;
      return false;
    }).length;
    
    const total = activities.filter(a => !a.onlyLast10 || isLast10 || currentDay >= 21).length;
    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  const overallProgress = () => {
    let completed = 0, total = 0;
    categories.forEach(cat => {
      const p = getCategoryProgress(cat.id);
      completed += p.completed;
      total += p.total;
    });
    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  const progress = overallProgress();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className={`rounded-2xl p-4 border sticky top-16 z-30 ${
        isDark ? 'bg-emerald-900/90 backdrop-blur-sm border-white/10' : 'bg-white/90 backdrop-blur-sm border-emerald-100'
      }`}>
        {/* Day Navigation */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
            disabled={currentDay === 1}
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
              isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-emerald-100 hover:bg-emerald-200'
            } ${currentDay === 1 ? 'opacity-30' : ''}`}
          >
            <Icon name="chevronLeft" />
          </button>
          
          <div className="text-center">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-emerald-900'}`}>
              রমজান {toBengali(currentDay)}
            </h2>
            {isLast10 && (
              <span className="text-sm text-amber-400 font-medium">শেষ ১০ দিন</span>
            )}
          </div>
          
          <button
            onClick={() => setCurrentDay(Math.min(30, currentDay + 1))}
            disabled={currentDay === 30}
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
              isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-emerald-100 hover:bg-emerald-200'
            } ${currentDay === 30 ? 'opacity-30' : ''}`}
          >
            <Icon name="chevronRight" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3">
          <div className={`flex-1 h-3 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-emerald-100'}`}>
            <motion.div 
              className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress.percentage}%` }}
            />
          </div>
          <span className={`text-base font-bold whitespace-nowrap ${isDark ? 'text-white' : 'text-emerald-700'}`}>
            {toBengali(progress.completed)}/{toBengali(progress.total)}
          </span>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className={`p-1 rounded-xl flex gap-1 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-emerald-50 border-emerald-100'}`}>
        <button
          onClick={() => setViewMode('simple')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
            viewMode === 'simple'
              ? isDark ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-700 shadow-sm'
              : isDark ? 'text-white/50 hover:text-white' : 'text-emerald-600/50 hover:text-emerald-700'
          }`}
        >
          <Icon name="listCheck" className="mr-2" />
          সারসংক্ষেপ
        </button>
        <button
          onClick={() => setViewMode('detailed')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
            viewMode === 'detailed'
              ? isDark ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-700 shadow-sm'
              : isDark ? 'text-white/50 hover:text-white' : 'text-emerald-600/50 hover:text-emerald-700'
          }`}
        >
          <Icon name="chartBar" className="mr-2" />
          বিস্তারিত
        </button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'simple' ? (
          <motion.div
            key="simple"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Prayer Times Widget */}
            <PrayerTimesWidget />

            {/* Simple Checklist */}
            <div className={`rounded-2xl p-4 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-emerald-100'}`}>
              <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-emerald-900'}`}>দৈনিক আমল</h3>
              <SimpleChecklist />
            </div>

            {/* Quran Tracker */}
            <div className={`rounded-2xl p-4 border ${isDark ? 'bg-purple-500/10 border-purple-500/20' : 'bg-purple-50 border-purple-200'}`}>
              <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-purple-900'}`}>কুরআন তিলাওয়াত</h3>
              <QuranTracker tracker={quranTracker} onUpdate={updateQuranTracker} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detailed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Quran Toggle */}
            <button
              onClick={() => setShowQuran(!showQuran)}
              className={`w-full rounded-xl p-4 border flex items-center justify-between ${
                isDark ? 'bg-purple-500/20 border-purple-500/30' : 'bg-purple-50 border-purple-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon name="bookQuran" className="text-purple-400 text-xl" />
                <span className={`font-medium text-base ${isDark ? 'text-white' : 'text-purple-900'}`}>
                  📖 কুরআন পড়ার ট্র্যাকার
                </span>
              </div>
              <Icon name={showQuran ? 'chevronLeft' : 'chevronRight'} className={`text-lg ${isDark ? 'text-white/50' : 'text-purple-400'}`} />
            </button>

            <AnimatePresence>
              {showQuran && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <QuranTracker tracker={quranTracker} onUpdate={updateQuranTracker} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Category Tabs */}
            <div className={`rounded-xl p-3 border flex gap-2 overflow-x-auto ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-emerald-50 border-emerald-100'
            }`}>
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === 'all'
                    ? isDark ? 'bg-white text-emerald-900' : 'bg-emerald-600 text-white'
                    : isDark ? 'text-white/70 hover:bg-white/10' : 'text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                সব
              </button>
              {categories.map(cat => {
                const p = getCategoryProgress(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-colors ${
                      activeCategory === cat.id
                        ? isDark ? 'bg-white text-emerald-900' : 'bg-emerald-600 text-white'
                        : isDark ? 'text-white/70 hover:bg-white/10' : 'text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    <Icon name={cat.icon} className="text-base" style={{ color: activeCategory === cat.id ? 'inherit' : cat.color }} />
                    {p.completed}/{p.total}
                  </button>
                );
              })}
            </div>

            {/* Activity List */}
            <div className="space-y-3">
              {activeCategory === 'all' ? (
                categories.map(cat => {
                  const activities = getCategoryActivities(cat.id).filter(a => !a.onlyLast10 || isLast10 || currentDay >= 21);
                  if (activities.length === 0) return null;

                  const p = getCategoryProgress(cat.id);

                  return (
                    <div key={cat.id} className={`rounded-2xl border overflow-hidden ${
                      isDark ? 'bg-white/5 border-white/10' : 'bg-white border-emerald-100'
                    }`}>
                      <div
                        className="px-4 py-3 flex items-center justify-between"
                        style={{ backgroundColor: `${cat.color}15` }}
                      >
                        <div className="flex items-center gap-2">
                          <Icon name={cat.icon} className="text-lg" style={{ color: cat.color }} />
                          <span className={`font-semibold text-base ${isDark ? 'text-white' : 'text-emerald-900'}`}>
                            {cat.name}
                          </span>
                        </div>
                        <span className={`text-sm ${isDark ? 'text-white/50' : 'text-emerald-500'}`}>
                          {p.completed}/{p.total}
                        </span>
                      </div>
                      <div className="p-3 space-y-2">
                        {activities.map(activity => (
                          <ActivityItem
                            key={activity.id}
                            activity={activity}
                            value={dayData?.activities?.[activity.id]}
                            onChange={(value) => setActivityValue(currentDay, activity.id, value)}
                            dayNumber={currentDay}
                            isLast10Days={isLast10}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                getCategoryActivities(activeCategory)
                  .filter(a => !a.onlyLast10 || isLast10 || currentDay >= 21)
                  .map(activity => (
                    <ActivityItem
                      key={activity.id}
                      activity={activity}
                      value={dayData?.activities?.[activity.id]}
                      onChange={(value) => setActivityValue(currentDay, activity.id, value)}
                      dayNumber={currentDay}
                      isLast10Days={isLast10}
                    />
                  ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <GoalInput />
      
      <div className="h-4" />
    </div>
  );
}
