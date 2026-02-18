import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../Icon';

const toBengali = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
};

const toEnglish = (str) => {
  if (!str) return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/[০-৯]/g, (d) => bengaliDigits.indexOf(d));
};

const parseTime = (timeStr) => {
  if (!timeStr) return null;
  const englishTime = toEnglish(timeStr);
  const [hours, minutes] = englishTime.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export default function PrayerTimesWidget() {
  const { schedule, state, currentRamadanDay } = useRamadan();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const selectedDay = state.currentDay;
  const selectedDaySchedule = schedule?.ramadan_schedule?.find(d => d.day === selectedDay);
  const isToday = selectedDay === currentRamadanDay;

  const [timeLeft, setTimeLeft] = useState('');
  const [nextEvent, setNextEvent] = useState('');

  useEffect(() => {
    if (!selectedDaySchedule) return;

    // Only run timer if it is today
    if (!isToday) {
      setTimeLeft('');
      setNextEvent('');
      return;
    }

    const timer = setInterval(() => {
      const now = new Date();

      // Parse times (Assuming Sehri is AM and Iftar is PM)
      let sehriTime = parseTime(selectedDaySchedule.sehri_end);
      let iftarTime = parseTime(selectedDaySchedule.iftar);

      // Adjust Iftar to PM (add 12 hours if it's afternoon/evening)
      // Standard practice: iftar is usually 5-7 PM.
      if (iftarTime.getHours() < 12) {
        iftarTime.setHours(iftarTime.getHours() + 12);
      }

      let targetTime;
      let eventName = '';

      if (now < sehriTime) {
        targetTime = sehriTime;
        eventName = 'সেহরির শেষ সময়';
      } else if (now < iftarTime) {
        targetTime = iftarTime;
        eventName = 'ইফতারের সময়';
      } else {
        // Next day Sehri
        // For simplicity, just show "Completed" or wait for next day load
        targetTime = null;
        eventName = 'আগামীকাল';
      }

      if (targetTime) {
        const diff = targetTime - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const pad = (n) => n.toString().padStart(2, '0');
        setTimeLeft(`${toBengali(pad(hours))}:${toBengali(pad(minutes))}:${toBengali(pad(seconds))}`);
        setNextEvent(eventName);
      } else {
        setTimeLeft('শেষ');
        setNextEvent('আজকের মত');
      }

    }, 1000);

    return () => clearInterval(timer);
  }, [selectedDaySchedule, isToday]);

  if (!selectedDaySchedule) {
    return (
      <div className={`rounded-2xl p-6 border text-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-emerald-100'}`}>
        <p className="opacity-50">লোডিং...</p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-6 border relative overflow-hidden ${
      isDark ? 'bg-emerald-900/50 border-emerald-500/30' : 'bg-gradient-to-br from-emerald-50 to-white border-emerald-200'
    }`}>
      <div className="flex justify-between items-start relative z-10">
        <div>
          <h3 className={`text-base sm:text-lg font-bold mb-1 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
            {isToday ? 'আজকের সময়সূচি' : selectedDaySchedule.date}
          </h3>
          <p className={`text-sm ${isDark ? 'text-white/70' : 'text-emerald-600'}`}>
            {isToday && `${selectedDaySchedule.date} | `}রমজান {toEnglish(selectedDaySchedule.day.toString())}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
        }`}>
          ঢাকা জেলা
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 relative z-10">
        <div className={`p-4 rounded-xl text-center border ${
          isDark ? 'bg-black/20 border-white/5' : 'bg-white/60 border-emerald-100'
        }`}>
          <div className={`text-xs font-medium mb-1 ${isDark ? 'text-white/50' : 'text-emerald-500'}`}>
            সেহরির শেষ সময়
          </div>
          <div className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-emerald-800'}`}>
            {selectedDaySchedule.sehri_end}
          </div>
        </div>

        <div className={`p-4 rounded-xl text-center border ${
          isDark ? 'bg-black/20 border-white/5' : 'bg-white/60 border-emerald-100'
        }`}>
          <div className={`text-xs font-medium mb-1 ${isDark ? 'text-white/50' : 'text-emerald-500'}`}>
            ইফতারের সময়
          </div>
          <div className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-emerald-800'}`}>
            {selectedDaySchedule.iftar}
          </div>
        </div>
      </div>

      {timeLeft && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-xl text-center border ${
            isDark ? 'bg-amber-500/10 border-amber-500/20' : 'bg-amber-50 border-amber-200'
          }`}
        >
          <div className={`text-xs font-medium mb-1 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
            {nextEvent} বাকি
          </div>
          <div className={`text-2xl sm:text-3xl font-bold tabular-nums ${isDark ? 'text-amber-300' : 'text-amber-600'}`}>
            {timeLeft}
          </div>
        </motion.div>
      )}

      {/* Background Decor */}
      <Icon
        name="mosque"
        className={`absolute -bottom-4 -right-4 text-9xl opacity-5 pointer-events-none ${
          isDark ? 'text-white' : 'text-emerald-900'
        }`}
      />
    </div>
  );
}
