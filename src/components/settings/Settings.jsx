import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../Icon';

const AVAILABLE_ICONS = [
  'cloudSun', 'utensils', 'bookQuran', 'mosque', 'moon', 
  'handsPraying', 'handHoldingHeart', 'sunset', 'target', 'trophy'
];

export default function Settings() {
  const { addAct, removeAct, updateAct, resetAll, getActs } = useRamadan();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const acts = getActs();
  
  const [newActName, setNewActName] = useState('');
  const [newActIcon, setNewActIcon] = useState('target');
  const [editingAct, setEditingAct] = useState(null);
  const [editName, setEditName] = useState('');
  const [editIcon, setEditIcon] = useState('');

  const handleAddAct = () => {
    if (!newActName.trim()) return;
    const id = newActName.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    addAct({ id, name: newActName.trim(), icon: newActIcon });
    setNewActName('');
    setNewActIcon('target');
  };

  const handleRemoveAct = (id) => {
    if (acts.length <= 1) {
      alert('অন্তত একটি ইবাদত রাখতে হবে!');
      return;
    }
    removeAct(id);
  };

  const handleStartEdit = (act) => {
    setEditingAct(act.id);
    setEditName(act.name);
    setEditIcon(act.icon);
  };

  const handleSaveEdit = () => {
    if (!editName.trim() || !editingAct) return;
    updateAct(editingAct, editName.trim(), editIcon);
    setEditingAct(null);
    setEditName('');
    setEditIcon('');
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
      <div className={`backdrop-blur-sm rounded-2xl p-6 border ${
        isDark ? 'bg-white/10 border-white/10' : 'bg-white/80 border-emerald-100 shadow-lg'
      }`}>
        <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-emerald-900'}`}>
          <Icon name="cog" className="text-amber-400" />
          ইবাদত সেটিংস
        </h2>
        <p className={`text-sm mb-6 ${isDark ? 'text-white/60' : 'text-emerald-600'}`}>
          আপনার নিজস্ব ইবাদত তালিকা তৈরি করুন। আপনি যোগ করতে পারবেন, সম্পাদনা করতে পারবেন এবং অপ্রয়োজনীয় মুছে ফেলতে পারবেন।
        </p>

        <div className="space-y-4 mb-6">
          <AnimatePresence>
            {acts.map((act) => (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`rounded-xl p-4 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-emerald-50 border-emerald-100'}`}
              >
                {editingAct === act.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className={`w-full rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 ${
                        isDark ? 'bg-white/10 border border-white/20 text-white placeholder-white/40' : 'bg-white border border-emerald-200 text-emerald-900 placeholder-emerald-400'
                      }`}
                      placeholder="ইবাদতের নাম"
                    />
                    <div className="flex gap-2 flex-wrap">
                      {AVAILABLE_ICONS.map((icon) => (
                        <button
                          key={icon}
                          onClick={() => setEditIcon(icon)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            editIcon === icon 
                              ? 'bg-amber-400 text-emerald-900' 
                              : isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          }`}
                        >
                          <Icon name={icon} className="text-sm" />
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600 transition-colors"
                      >
                        সংরক্ষণ
                      </button>
                      <button
                        onClick={() => setEditingAct(null)}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                          isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        }`}
                      >
                        বাতিল
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isDark ? 'bg-white/10' : 'bg-emerald-100'
                      }`}>
                        <Icon name={act.icon} className={isDark ? 'text-white' : 'text-emerald-700'} />
                      </div>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-emerald-900'}`}>{act.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartEdit(act)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        }`}
                      >
                        <Icon name="edit" className="text-xs" />
                      </button>
                      <button
                        onClick={() => handleRemoveAct(act.id)}
                        className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors"
                      >
                        <Icon name="trash" className="text-xs" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className={`rounded-xl p-4 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-emerald-50 border-emerald-100'}`}>
          <h3 className={`font-medium mb-3 ${isDark ? 'text-white' : 'text-emerald-900'}`}>নতুন ইবাদত যোগ করুন</h3>
          <div className="space-y-3">
            <input
              type="text"
              value={newActName}
              onChange={(e) => setNewActName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddAct()}
              className={`w-full rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 ${
                isDark ? 'bg-white/10 border border-white/20 text-white placeholder-white/40' : 'bg-white border border-emerald-200 text-emerald-900 placeholder-emerald-400'
              }`}
              placeholder="ইবাদতের নাম লিখুন..."
            />
            <div className="flex gap-2 flex-wrap">
              {AVAILABLE_ICONS.map((icon) => (
                <button
                  key={icon}
                  onClick={() => setNewActIcon(icon)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    newActIcon === icon 
                      ? 'bg-amber-400 text-emerald-900' 
                      : isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  }`}
                >
                  <Icon name={icon} className="text-sm" />
                </button>
              ))}
            </div>
            <button
              onClick={handleAddAct}
              disabled={!newActName.trim()}
              className="w-full px-4 py-2 bg-amber-400 text-emerald-900 rounded-lg font-medium hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Icon name="plus" className="text-sm" />
              যোগ করুন
            </button>
          </div>
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
