import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import { useTheme } from '../../context/ThemeContext';
import useMediaQuery from '../../hooks/useMediaQuery';
import Icon from '../Icon';
import MonthView from './MonthView';
import MobileMonthView from './MobileMonthView';
import SimpleChecklist from './SimpleChecklist';
import PrayerTimesWidget from '../dashboard/PrayerTimesWidget';
import Calendar from '../planner/Calendar';

const toBengali = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
};

export default function DayTracker() {
  const { state, setCurrentDay, isLast10Days } = useRamadan();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const [viewMode, setViewMode] = useState('today'); // 'today' | 'month'
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false);

  const currentDay = state.currentDay;
  const isLast10 = isLast10Days(currentDay);

  const handleMonthViewClick = () => {
    if (isDesktop) {
      setShowMonthModal(true);
    } else {
      setViewMode('month');
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className={`rounded-2xl p-4 border sticky top-16 z-30 transition-colors ${
        isDark ? 'bg-emerald-900/90 backdrop-blur-sm border-white/10' : 'bg-white/90 backdrop-blur-sm border-emerald-100'
      }`}>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
            disabled={currentDay === 1}
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-colors ${
              isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-emerald-100 hover:bg-emerald-200'
            } ${currentDay === 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            <Icon name="chevronLeft" />
          </button>
          
          <button
            onClick={() => setShowCalendar(true)}
            className="text-center group"
          >
            <h2 className={`text-xl sm:text-2xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-emerald-900'}`}>
              রমজান {toBengali(currentDay)}
              <Icon name="calendar" className="text-sm opacity-50 group-hover:opacity-100 transition-opacity" />
            </h2>
            {isLast10 && (
              <span className="text-xs sm:text-sm text-amber-400 font-medium block">শেষ ১০ দিন</span>
            )}
          </button>
          
          <button
            onClick={() => setCurrentDay(Math.min(30, currentDay + 1))}
            disabled={currentDay === 30}
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-colors ${
              isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-emerald-100 hover:bg-emerald-200'
            } ${currentDay === 30 ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            <Icon name="chevronRight" />
          </button>
        </div>
      </div>

      <PrayerTimesWidget />

      {/* Calendar Modal */}
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCalendar(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg"
              onClick={e => e.stopPropagation()}
            >
                <div className="relative">
                    <button
                        onClick={() => setShowCalendar(false)}
                        className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
                    >
                        ✕
                    </button>
                    <Calendar onSelect={() => setShowCalendar(false)} />
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Month View Modal (Desktop) */}
      <AnimatePresence>
        {showMonthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowMonthModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full h-full overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
                <div className={`relative w-full h-full p-6 flex flex-col shadow-2xl overflow-hidden ${isDark ? 'bg-emerald-900' : 'bg-white'}`}>
                    <div className="flex items-center justify-between mb-6 shrink-0">
                        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-emerald-900'}`}>পুরো মাসের আমল</h2>
                        <button
                            onClick={() => setShowMonthModal(false)}
                            className="w-10 h-10 rounded-full bg-black/5 text-black/50 dark:text-white dark:bg-white/10 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto -mx-6 px-6">
                        <MonthView defaultTab="all" />
                    </div>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Mode Toggle */}
      <div className={`p-1 rounded-xl flex gap-1 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-emerald-50 border-emerald-100'}`}>
        <button
          onClick={() => setViewMode('today')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
            viewMode === 'today'
              ? isDark ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-700 shadow-sm'
              : isDark ? 'text-white/50 hover:text-white' : 'text-emerald-600/50 hover:text-emerald-700'
          }`}
        >
          <Icon name="listCheck" className="mr-2" />
          আজকের আমল
        </button>
        <button
          onClick={handleMonthViewClick}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
            viewMode === 'month' || (showMonthModal && isDesktop)
              ? isDark ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-700 shadow-sm'
              : isDark ? 'text-white/50 hover:text-white' : 'text-emerald-600/50 hover:text-emerald-700'
          }`}
        >
          <Icon name="calendar" className="mr-2" />
          পুরো মাস
        </button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'today' ? (
          <motion.div
            key="today"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className={`rounded-2xl p-4 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-emerald-100'}`}>
              <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-emerald-900'}`}>দৈনিক আমল</h3>
              <SimpleChecklist />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="month"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className={`rounded-2xl p-4 border overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-emerald-100'}`}>
                <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-emerald-900'}`}>পুরো মাসের আমল</h3>
                <MobileMonthView />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="h-4" />
    </div>
  );
}
