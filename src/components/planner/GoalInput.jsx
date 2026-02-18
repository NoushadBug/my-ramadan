import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import { useTheme } from '../../context/ThemeContext';

export default function GoalInput() {
  const { state, setCustomGoal, setNotes, getDayData, getBengaliNumber } = useRamadan();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const currentDay = state.currentDay;
  const dayData = getDayData(currentDay);

  const [goal, setGoal] = useState('');
  const [notes, setNotesLocal] = useState('');

  useEffect(() => {
    setGoal(dayData?.customGoal || '');
    setNotesLocal(dayData?.notes || '');
  }, [currentDay, dayData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (goal !== (dayData?.customGoal || '')) {
        setCustomGoal(currentDay, goal);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [goal, currentDay]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (notes !== (dayData?.notes || '')) {
        setNotes(currentDay, notes);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [notes, currentDay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`backdrop-blur-sm rounded-2xl p-6 border space-y-6 ${
        isDark 
          ? 'bg-white/10 border-white/10' 
          : 'bg-white/80 border-emerald-100 shadow-lg'
      }`}
    >
      <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-emerald-900'}`}>
        দিন {getBengaliNumber(currentDay)} - লক্ষ্য ও নোট
      </h2>

      <div className="space-y-4">
        <div>
          <label className={`block text-sm mb-2 ${isDark ? 'text-white/70' : 'text-emerald-700'}`}>আজকের লক্ষ্য</label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="আজকের জন্য একটি লক্ষ্য নির্ধারণ করুন..."
            className={`w-full rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all ${
              isDark 
                ? 'bg-white/10 border border-white/20 text-white placeholder-white/40' 
                : 'bg-white border border-emerald-200 text-emerald-900 placeholder-emerald-400'
            }`}
          />
        </div>

        <div>
          <label className={`block text-sm mb-2 ${isDark ? 'text-white/70' : 'text-emerald-700'}`}>নোটস</label>
          <textarea
            value={notes}
            onChange={(e) => setNotesLocal(e.target.value)}
            placeholder="আজকের অভিজ্ঞতা লিখুন..."
            rows={4}
            className={`w-full rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all resize-none ${
              isDark 
                ? 'bg-white/10 border border-white/20 text-white placeholder-white/40' 
                : 'bg-white border border-emerald-200 text-emerald-900 placeholder-emerald-400'
            }`}
          />
        </div>
      </div>

      {dayData?.customGoal && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`pt-4 border-t ${isDark ? 'border-white/10' : 'border-emerald-100'}`}
        >
          <p className={`text-xs mb-1 ${isDark ? 'text-white/50' : 'text-emerald-500'}`}>বর্তমান লক্ষ্য:</p>
          <p className={`font-medium ${isDark ? 'text-white' : 'text-emerald-900'}`}>{dayData.customGoal}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
