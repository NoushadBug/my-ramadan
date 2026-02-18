import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../Icon';

const toBengali = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
};

export default function ActivityItem({ activity, value, onChange, isLast10Days = false }) {
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
              w-6 h-6 rounded border-2 flex items-center justify-center text-xs transition-all
              ${localValue 
                ? 'bg-emerald-500 border-emerald-500 text-white' 
                : 'border-white/30 hover:border-white/50'
              }
            `}
          >
            {localValue ? '✓' : ''}
          </button>
        );

      case 'counter':
      case 'number':
        return (
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleCounterChange(-(activity.min || 1))}
              className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-xs"
            >
              -
            </button>
            <span className="w-8 text-center text-sm font-bold">
              {toBengali(localValue || 0)}
            </span>
            <button
              onClick={() => handleCounterChange(activity.min || 1)}
              className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center text-xs text-white"
            >
              +
            </button>
          </div>
        );

      case 'scale':
        return (
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => handleScaleChange(level)}
                className={`
                  w-5 h-5 rounded text-xs font-bold transition-all
                  ${localValue >= level 
                    ? level <= 2 ? 'bg-red-400 text-white' : level <= 3 ? 'bg-amber-400 text-emerald-900' : 'bg-emerald-400 text-emerald-900'
                    : 'bg-white/20'
                  }
                `}
              />
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
            className="w-full px-2 py-1 text-xs bg-white/10 rounded border-0"
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
        flex items-center justify-between gap-2 p-2 rounded-lg border transition-all
        ${isCompleted() 
          ? 'bg-emerald-500/20 border-emerald-400/30' 
          : 'bg-white/5 border-white/10 hover:bg-white/10'
        }
      `}
    >
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-medium truncate ${isCompleted() ? 'text-emerald-300' : 'text-white/80'}`}>
          {activity.name}
        </p>
        {activity.tip && (
          <p className="text-[10px] text-white/40 truncate">{activity.tip}</p>
        )}
      </div>
      <div className="flex-shrink-0">
        {renderInput()}
      </div>
    </motion.div>
  );
}
