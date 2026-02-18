import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import { useTheme } from '../../context/ThemeContext';
import { SORTED_ACTIVITIES_LIST } from '../../data/activities';
import Icon from '../Icon';

const toBengali = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
};

export default function MobileMonthView() {
  const { state, setActivityValue } = useRamadan();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [expandedActivity, setExpandedActivity] = useState(null);

  const toggleExpand = (id) => {
    setExpandedActivity(expandedActivity === id ? null : id);
  };

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-3">
      {SORTED_ACTIVITIES_LIST.map((activity) => {
        // Calculate completion stats
        const completedCount = days.reduce((count, day) => {
          const dayData = state.days[day];
          return count + (dayData?.activities?.[activity.id] ? 1 : 0);
        }, 0);

        const isExpanded = expandedActivity === activity.id;

        return (
          <div
            key={activity.id}
            className={`rounded-xl border overflow-hidden transition-colors ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-white border-emerald-100'
            }`}
          >
            {/* Header / Summary Row */}
            <button
              onClick={() => toggleExpand(activity.id)}
              className={`w-full p-4 flex items-center justify-between gap-3 ${
                isExpanded
                  ? isDark ? 'bg-white/5' : 'bg-emerald-50/50'
                  : ''
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-white/10 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  <Icon name={activity.icon} className="text-xl" />
                </div>
                <div className="text-left min-w-0">
                  <h4 className={`font-medium truncate ${isDark ? 'text-white' : 'text-emerald-900'}`}>
                    {activity.name}
                  </h4>
                  <p className={`text-xs ${isDark ? 'text-white/50' : 'text-emerald-600/60'}`}>
                    {toBengali(completedCount)} / {toBengali(30)} দিন
                  </p>
                </div>
              </div>

              <Icon
                name="chevronDown"
                className={`transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                } ${isDark ? 'text-white/50' : 'text-emerald-400'}`}
              />
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`p-4 border-t ${isDark ? 'border-white/10' : 'border-emerald-100'}`}>
                    <div className="grid grid-cols-6 gap-2 sm:gap-3">
                      {days.map((day) => {
                        const dayData = state.days[day];
                        const isActive = !!dayData?.activities?.[activity.id];

                        return (
                          <button
                            key={day}
                            onClick={() => setActivityValue(day, activity.id, !isActive)}
                            className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all relative ${
                              isActive
                                ? 'bg-emerald-500 text-white shadow-sm'
                                : isDark
                                  ? 'bg-white/5 text-white/50 hover:bg-white/10'
                                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                            }`}
                          >
                            {toBengali(day)}
                            {isActive && (
                                <motion.div
                                    layoutId={`check-${activity.id}-${day}`}
                                    className="absolute inset-0 rounded-lg border-2 border-white/20"
                                />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
