import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedCounter({ value, suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * easeOut);
      
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span>
      {displayValue}{suffix}
    </span>
  );
}

export function StatsCard({ title, value, suffix = '', icon, color = 'emerald' }) {
  const colorClasses = {
    emerald: 'from-emerald-500/30 to-emerald-600/20 border-emerald-400/30',
    amber: 'from-amber-500/30 to-amber-600/20 border-amber-400/30',
    blue: 'from-blue-500/30 to-blue-600/20 border-blue-400/30',
  };

  const iconBgClasses = {
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    blue: 'bg-blue-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`
        relative overflow-hidden rounded-2xl p-6 border backdrop-blur-sm
        bg-gradient-to-br ${colorClasses[color]}
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/60 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">
            <AnimatedCounter value={value} suffix={suffix} />
          </p>
        </div>
        <div className={`w-12 h-12 rounded-xl ${iconBgClasses[color]} flex items-center justify-center text-xl`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
