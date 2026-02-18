import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRamadan } from '../../context/RamadanContext';
import Icon from '../Icon';

const AVAILABLE_ICONS = [
  'sunrise', 'utensils', 'bookQuran', 'mosque', 'moon', 
  'handsPraying', 'handHoldingHeart', 'sunset', 'target', 'trophy'
];

export default function Settings() {
  const { state, addAct, removeAct, updateAct, resetAll, getActs, getBengaliNumber } = useRamadan();
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
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Icon name="cog" className="text-amber-400" />
          ইবাদত সেটিংস
        </h2>
        <p className="text-white/60 text-sm mb-6">
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
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                {editingAct === act.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-amber-400/50"
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
                              : 'bg-white/10 text-white hover:bg-white/20'
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
                        className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20 transition-colors"
                      >
                        বাতিল
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Icon name={act.icon} className="text-white" />
                      </div>
                      <span className="text-white font-medium">{act.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartEdit(act)}
                        className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
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

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="text-white font-medium mb-3">নতুন ইবাদত যোগ করুন</h3>
          <div className="space-y-3">
            <input
              type="text"
              value={newActName}
              onChange={(e) => setNewActName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddAct()}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-amber-400/50"
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
                      : 'bg-white/10 text-white hover:bg-white/20'
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

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
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
