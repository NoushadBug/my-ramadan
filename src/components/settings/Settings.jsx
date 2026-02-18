import { motion } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../Icon';

export default function Settings() {
  const { resetAll, getAllActivities, CATEGORIES } = useRamadan();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const acts = getAllActivities();

  const handleReset = () => {
    if (confirm('আপনি কি সব ডেটা রিসেট করতে চান? এটি পূর্ববর্তী সব ডেটা মুছে ফেলবে।')) {
      resetAll();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className={`backdrop-blur-sm rounded-2xl p-6 border ${
        isDark ? 'bg-white/10 border-white/10' : 'bg-white/80 border-emerald-100 shadow-lg'
      }`}>
        <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-emerald-900'}`}>
          <Icon name="cog" className="text-amber-400" />
          ইবাদত তালিকা
        </h2>
        <p className={`text-sm mb-6 ${isDark ? 'text-white/60' : 'text-emerald-600'}`}>
          মোট {acts.length}টি ইবাদত ট্র্যাক করা হচ্ছে।
        </p>

        <div className="space-y-4">
          {Object.values(CATEGORIES).map((cat) => {
            const catActs = acts.filter(a => a.category === cat.id);
            if (catActs.length === 0) return null;
            
            return (
              <div key={cat.id} className={`rounded-xl p-4 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-emerald-50 border-emerald-100'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon name={cat.icon} className="text-lg" style={{ color: cat.color }} />
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-emerald-900'}`}>
                    {cat.name}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-white/50' : 'text-emerald-500'}`}>
                    ({catActs.length}টি)
                  </span>
                </div>
                <div className="space-y-2">
                  {catActs.map((act) => (
                    <div key={act.id} className={`text-sm ${isDark ? 'text-white/70' : 'text-emerald-700'}`}>
                      • {act.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`backdrop-blur-sm rounded-2xl p-6 border ${
        isDark ? 'bg-white/10 border-white/10' : 'bg-white/80 border-emerald-100 shadow-lg'
      }`}>
        <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-emerald-900'}`}>
          <Icon name="user" className="text-amber-400" />
          অ্যাকাউন্ট সেটিংস
        </h2>
        <button
          onClick={handleReset}
          className="w-full px-4 py-3 bg-red-500/20 text-red-400 rounded-xl font-medium hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
        >
          <Icon name="trash" />
          সব ডেটা রিসেট করুন
        </button>
      </div>
    </motion.div>
  );
}
