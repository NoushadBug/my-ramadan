import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../Icon';

export default function Settings() {
  const {
    resetAll,
    getAllActivities,
    CATEGORIES,
    checklistConfig,
    addChecklistItem,
    removeChecklistItem,
    moveChecklistItem
  } = useRamadan();

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const acts = getAllActivities();

  // Filter activities that are NOT in the checklist
  const availableActivities = acts.filter(a => !checklistConfig.includes(a.id));

  const [selectedToAdd, setSelectedToAdd] = useState('');

  const handleAdd = () => {
    if (selectedToAdd) {
      addChecklistItem(selectedToAdd);
      setSelectedToAdd('');
    }
  };

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
      {/* Checklist Customization Section */}
      <div className={`backdrop-blur-sm rounded-2xl p-6 border ${
        isDark ? 'bg-white/10 border-white/10' : 'bg-white/80 border-emerald-100 shadow-lg'
      }`}>
        <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-emerald-900'}`}>
          <Icon name="listCheck" className="text-emerald-400" />
          চেকলিস্ট কাস্টমাইজেশন
        </h2>
        <p className={`text-sm mb-4 ${isDark ? 'text-white/60' : 'text-emerald-600'}`}>
          এখানে আপনি আপনার দৈনিক চেকলিস্ট সাজাতে পারেন।
        </p>

        {/* Current List */}
        <div className="space-y-2 mb-6">
          <AnimatePresence>
            {checklistConfig.map((itemId, index) => {
              const activity = acts.find(a => a.id === itemId);
              if (!activity) return null;

              return (
                <motion.div
                  key={itemId}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`flex items-center justify-between p-3 rounded-xl border ${
                    isDark ? 'bg-black/20 border-white/5' : 'bg-white border-emerald-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-white/10 text-white/50' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      {index + 1}
                    </span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {activity.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveChecklistItem(index, -1)}
                      disabled={index === 0}
                      className={`p-2 rounded hover:bg-white/10 disabled:opacity-30 ${
                        isDark ? 'text-white/70' : 'text-emerald-600'
                      }`}
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveChecklistItem(index, 1)}
                      disabled={index === checklistConfig.length - 1}
                      className={`p-2 rounded hover:bg-white/10 disabled:opacity-30 ${
                        isDark ? 'text-white/70' : 'text-emerald-600'
                      }`}
                    >
                      ▼
                    </button>
                    <button
                      onClick={() => removeChecklistItem(itemId)}
                      className="p-2 rounded hover:bg-red-500/20 text-red-400 ml-2"
                    >
                      <Icon name="trash" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Add New Item */}
        <div className="flex gap-2">
          <select
            value={selectedToAdd}
            onChange={(e) => setSelectedToAdd(e.target.value)}
            className={`flex-1 p-3 rounded-xl border appearance-none ${
              isDark
                ? 'bg-black/30 border-white/10 text-white'
                : 'bg-white border-emerald-200 text-gray-800'
            }`}
          >
            <option value="">নতুন ইবাদত যোগ করুন...</option>
            {Object.values(CATEGORIES).map(cat => (
              <optgroup key={cat.id} label={cat.name}>
                {availableActivities
                  .filter(a => a.category?.id === cat.id)
                  .map(a => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))
                }
              </optgroup>
            ))}
          </select>
          <button
            onClick={handleAdd}
            disabled={!selectedToAdd}
            className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            যোগ করুন
          </button>
        </div>
      </div>

      {/* Account Settings (Existing) */}
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

      {/* All Activities Summary (Existing but pushed down) */}
      <div className={`backdrop-blur-sm rounded-2xl p-6 border opacity-70 ${
        isDark ? 'bg-white/5 border-white/5' : 'bg-white/60 border-emerald-50'
      }`}>
        <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white/80' : 'text-emerald-800'}`}>
          <Icon name="cog" className="text-amber-400/70" />
          সকল ইবাদত তালিকা (রেফারেন্স)
        </h2>
        <div className="space-y-4">
          {Object.values(CATEGORIES).map((cat) => {
            const catActs = acts.filter(a => a.category === cat.id);
            if (catActs.length === 0) return null;

            return (
              <div key={cat.id} className={`rounded-xl p-3 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-emerald-50 border-emerald-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name={cat.icon} className="text-sm" style={{ color: cat.color }} />
                  <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-emerald-900'}`}>
                    {cat.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {catActs.map((act) => (
                    <span key={act.id} className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-white/10 text-white/60' : 'bg-white text-emerald-600 border border-emerald-100'}`}>
                      {act.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
