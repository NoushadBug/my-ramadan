import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../Icon';
import { useTheme } from '../../context/ThemeContext';
import { QURAN_PARAH, formatQuranProgress } from '../../data/quranTracker';

const toBengali = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
};

export default function QuranTracker({ tracker, onUpdate }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [todayPages, setTodayPages] = useState(0);
  
  const today = new Date().toISOString().split('T')[0];
  const progress = formatQuranProgress(tracker);
  
  useEffect(() => {
    if (tracker.dailyLog && tracker.dailyLog[today]) {
      setTodayPages(tracker.dailyLog[today]);
    } else {
      setTodayPages(0);
    }
  }, [tracker, today]);

  const handlePagesChange = (increment) => {
    const newValue = Math.max(0, todayPages + increment);
    setTodayPages(newValue);
    
    const prevTodayValue = tracker.dailyLog[today] || 0;
    const newTotal = tracker.totalPagesRead + (newValue - prevTodayValue);
    
    const newCurrentPage = (tracker.currentPage + increment);
    const currentParahData = QURAN_PARAH[tracker.currentParah - 1];
    
    let newCurrentParah = tracker.currentParah;
    let newCurrentPageInParah = newCurrentPage;
    let newCompletedParahs = [...(tracker.completedParahs || [])];
    
    if (currentParahData && newCurrentPageInParah >= currentParahData.verses) {
      if (!newCompletedParahs.includes(tracker.currentParah)) {
        newCompletedParahs.push(tracker.currentParah);
      }
      newCurrentParah = Math.min(30, tracker.currentParah + 1);
      newCurrentPageInParah = newCurrentPageInParah % currentParahData.verses;
    }
    
    onUpdate({
      ...tracker,
      dailyLog: { ...tracker.dailyLog, [today]: newValue },
      totalPagesRead: newTotal,
      currentPage: newCurrentPageInParah,
      currentParah: newCurrentParah,
      completedParahs: newCompletedParahs,
      lastReadDate: today
    });
  };

  return (
    <div className={`rounded-xl p-3 border ${isDark ? 'bg-purple-500/10 border-purple-500/20' : 'bg-purple-50 border-purple-200'}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon name="bookQuran" className="text-purple-400" />
          <span className={`font-medium text-sm ${isDark ? 'text-white' : 'text-purple-900'}`}>
            কুরআন: পারা {toBengali(progress.currentParah)}
          </span>
        </div>
        <span className={`text-xs ${isDark ? 'text-white/50' : 'text-purple-600'}`}>
          {toBengali(progress.completedParahs)}/৩০ সম্পন্ন
        </span>
      </div>

      {/* Quick Controls */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => handlePagesChange(-1)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
            isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-purple-100 hover:bg-purple-200'
          }`}
        >
          -
        </button>
        
        <div className="text-center flex-1">
          <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-purple-700'}`}>
            {toBengali(todayPages)}
          </span>
          <span className={`text-xs block ${isDark ? 'text-white/50' : 'text-purple-500'}`}>
            পাতা আজ
          </span>
        </div>
        
        <button
          onClick={() => handlePagesChange(1)}
          className="w-8 h-8 rounded-lg bg-purple-500 hover:bg-purple-600 flex items-center justify-center font-bold text-white"
        >
          +
        </button>
      </div>

      {/* Parah Grid - Compact */}
      <div className="mt-2 flex gap-1 flex-wrap justify-center">
        {QURAN_PARAH.slice(0, 10).map((parah) => {
          const isCompleted = progress.completedParahs >= parah.parah;
          const isCurrent = progress.currentParah === parah.parah;
          
          return (
            <button
              key={parah.parah}
              onClick={() => onUpdate({ ...tracker, currentParah: parah.parah, currentPage: 0 })}
              className={`
                w-6 h-6 rounded text-xs font-medium transition-all
                ${isCompleted 
                  ? 'bg-purple-500 text-white' 
                  : isCurrent
                    ? 'bg-amber-400 text-emerald-900'
                    : isDark 
                      ? 'bg-white/10 text-white/50 hover:bg-white/20' 
                      : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                }
              `}
            >
              {toBengali(parah.parah)}
            </button>
          );
        })}
        <span className={`text-xs self-center ${isDark ? 'text-white/30' : 'text-purple-300'}`}>...</span>
      </div>
    </div>
  );
}
