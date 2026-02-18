import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../Icon';
import { useTheme } from '../../context/ThemeContext';

const toBengali = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
};

export default function ActivityItem({ activity, value, onChange, isLast10Days = false }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [localValue, setLocalValue] = useState(value);
  
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  if (activity.onlyLast10 && !isLast10Days) {
    return null;
  }

  const isCompleted = () => {
    if (activity.inputType === 'boolean') return localValue;
    if (activity.inputType === 'text') return localValue?.length > 10;
    if (activity.inputType === 'scale') return localValue >= 3;
    if (activity.inputType === 'counter' || activity.inputType === 'number') return localValue > 0;
    return false;
  };

  const handleBooleanChange = () => onChange(!localValue);

  const handleCounterChange = (increment) => {
    const newValue = Math.max(activity.min || 0, Math.min(activity.max || 999, (localValue || 0) + increment));
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleScaleChange = (val) => {
    setLocalValue(val);
    onChange(val);
  };

  const handleTextChange = (e) => {
    setLocalValue(e.target.value);
  };

  useEffect(() => {
    if (activity.inputType === 'text') {
      const timer = setTimeout(() => {
        if (localValue !== value) onChange(localValue);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [localValue]);

  const renderInput = () => {
    switch (activity.inputType) {
      case 'boolean':
        return (
          <button
            onClick={handleBooleanChange}
            className={`
              w-8 h-8 rounded-lg border-2 flex items-center justify-center text-sm font-bold transition-all
              ${localValue 
                ? 'bg-emerald-500 border-emerald-500 text-white' 
                : isDark
                  ? 'border-white/40 hover:border-white/60 bg-white/10'
                  : 'border-emerald-300 hover:border-emerald-400 bg-emerald-50'
              }
            `}
          >
            {localValue ? '✓' : ''}
          </button>
        );

      case 'counter':
      case 'number':
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCounterChange(-(activity.min || 1))}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${
                isDark ? 'bg-white/10' : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              -
            </button>
            <span className={`w-12 text-center text-base font-bold ${isDark ? 'text-white' : 'text-emerald-900'}`}>
              {toBengali(localValue || 0)}
            </span>
            <button
              onClick={() => handleCounterChange(activity.min || 1)}
              className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-lg font-bold text-white"
            >
              +
            </button>
          </div>
        );

      case 'scale':
        return (
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => handleScaleChange(level)}
                className={`
                  w-8 h-8 rounded-lg text-base font-bold transition-all
                  ${localValue >= level 
                    ? level <= 2 ? 'bg-red-400 text-white' : level <= 3 ? 'bg-amber-400 text-emerald-900' : 'bg-emerald-400 text-emerald-900'
                    : isDark ? 'bg-white/20' : 'bg-emerald-100 text-emerald-700'
                  }
                `}
              >
                {level}
              </button>
            ))}
          </div>
        );

      case 'text':
        return (
          <input
            type="text"
            value={localValue || ''}
            onChange={handleTextChange}
            placeholder="✍️"
            className={`w-full px-3 py-2 text-sm rounded-lg border ${
              isDark
                ? 'bg-white/10 border-white/20 text-white placeholder-white/40'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900 placeholder-emerald-400'
            }`}
          />
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`
        flex items-center justify-between gap-3 p-3 rounded-xl border transition-all
        ${isCompleted() 
          ? isDark ? 'bg-emerald-500/20 border-emerald-400/30' : 'bg-emerald-100 border-emerald-200'
          : isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-emerald-100 hover:bg-emerald-50'
        }
      `}
    >
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${
          isCompleted()
            ? isDark ? 'text-emerald-300' : 'text-emerald-700'
            : isDark ? 'text-white/90' : 'text-emerald-900'
        }`}>
          {activity.name}
        </p>
        {activity.tip && (
          <p className={`text-xs truncate mt-0.5 ${isDark ? 'text-white/50' : 'text-emerald-600/70'}`}>{activity.tip}</p>
        )}
      </div>
      <div className="flex-shrink-0">
        {renderInput()}
      </div>
    </motion.div>
  );
}
