import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../Icon';
import { useTheme } from '../../context/ThemeContext';
import { useRamadan } from '../../context/RamadanContext';
import { QURAN_PARAH, formatQuranProgress } from '../../data/quranTracker';

const toBengali = (num) => {
  if (!num && num !== 0) return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
};

export default function QuranTracker({ tracker, onUpdate }) {
  const { theme } = useTheme();
  const { quranLogs, addQuranLog } = useRamadan();
  const isDark = theme === 'dark';

  const [todayPages, setTodayPages] = useState(0);
  const [showLogForm, setShowLogForm] = useState(false);
  const [logForm, setLogForm] = useState({ surah: '', startAyah: '', endAyah: '', notes: '' });
  
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

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!logForm.surah) return;

    addQuranLog({
      date: today,
      timestamp: Date.now(),
      ...logForm
    });

    setLogForm({ surah: '', startAyah: '', endAyah: '', notes: '' });
    setShowLogForm(false);
  };

  const todaysLogs = quranLogs.filter(log => log.date === today);

  return (
    <div className={`space-y-4 rounded-xl p-4 border ${isDark ? 'bg-purple-500/10 border-purple-500/20' : 'bg-purple-50 border-purple-200'}`}>

      {/* Simple Tracker Header */}
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

      {/* Pages Control */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => handlePagesChange(-1)}
          className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
            isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-purple-100 hover:bg-purple-200'
          }`}
        >
          -
        </button>
        
        <div className="text-center flex-1">
          <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-purple-700'}`}>
            {toBengali(todayPages)}
          </span>
          <span className={`text-xs block ${isDark ? 'text-white/50' : 'text-purple-500'}`}>
            পাতা আজ
          </span>
        </div>
        
        <button
          onClick={() => handlePagesChange(1)}
          className="w-10 h-10 rounded-lg bg-purple-500 hover:bg-purple-600 flex items-center justify-center font-bold text-white"
        >
          +
        </button>
      </div>

      {/* Detailed Log Section */}
      <div className="mt-4 pt-4 border-t border-purple-200/20">
        <div className="flex justify-between items-center mb-3">
          <h4 className={`text-sm font-semibold ${isDark ? 'text-white/80' : 'text-purple-800'}`}>
            বিস্তারিত লগ
          </h4>
          <button
            onClick={() => setShowLogForm(!showLogForm)}
            className={`text-xs px-2 py-1 rounded border ${
              isDark
                ? 'border-purple-400 text-purple-300 hover:bg-purple-900/30'
                : 'border-purple-300 text-purple-600 hover:bg-purple-100'
            }`}
          >
            {showLogForm ? 'বাতিল' : '+ যোগ করুন'}
          </button>
        </div>

        {showLogForm && (
          <form onSubmit={handleAddLog} className="space-y-3 mb-4 animate-in fade-in slide-in-from-top-2">
            <input
              type="text"
              placeholder="সূরা বা পারার নাম"
              value={logForm.surah}
              onChange={e => setLogForm({...logForm, surah: e.target.value})}
              className={`w-full p-2 rounded text-sm ${
                isDark ? 'bg-black/30 text-white border-white/10' : 'bg-white text-gray-800 border-purple-200'
              } border`}
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="শুরু আয়াত"
                value={logForm.startAyah}
                onChange={e => setLogForm({...logForm, startAyah: e.target.value})}
                className={`w-1/2 p-2 rounded text-sm ${
                  isDark ? 'bg-black/30 text-white border-white/10' : 'bg-white text-gray-800 border-purple-200'
                } border`}
              />
              <input
                type="text"
                placeholder="শেষ আয়াত"
                value={logForm.endAyah}
                onChange={e => setLogForm({...logForm, endAyah: e.target.value})}
                className={`w-1/2 p-2 rounded text-sm ${
                  isDark ? 'bg-black/30 text-white border-white/10' : 'bg-white text-gray-800 border-purple-200'
                } border`}
              />
            </div>
            <textarea
              placeholder="নোট বা শিক্ষা..."
              value={logForm.notes}
              onChange={e => setLogForm({...logForm, notes: e.target.value})}
              className={`w-full p-2 rounded text-sm ${
                isDark ? 'bg-black/30 text-white border-white/10' : 'bg-white text-gray-800 border-purple-200'
              } border h-16`}
            />
            <button
              type="submit"
              className="w-full py-2 bg-purple-500 text-white rounded text-sm font-medium hover:bg-purple-600"
            >
              সেভ করুন
            </button>
          </form>
        )}

        <div className="space-y-2">
          {todaysLogs.length === 0 ? (
            <p className={`text-xs text-center italic ${isDark ? 'text-white/30' : 'text-purple-300'}`}>
              আজ কোনো বিস্তারিত লগ নেই
            </p>
          ) : (
            todaysLogs.map((log) => (
              <div
                key={log.timestamp}
                className={`p-2 rounded text-sm ${isDark ? 'bg-black/20' : 'bg-white/50'}`}
              >
                <div className={`font-medium ${isDark ? 'text-purple-300' : 'text-purple-800'}`}>
                  {log.surah}
                </div>
                {(log.startAyah || log.endAyah) && (
                  <div className={`text-xs ${isDark ? 'text-white/50' : 'text-purple-600'}`}>
                    আয়াত: {toBengali(log.startAyah)} - {toBengali(log.endAyah)}
                  </div>
                )}
                {log.notes && (
                  <div className={`text-xs mt-1 italic ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                    "{log.notes}"
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
