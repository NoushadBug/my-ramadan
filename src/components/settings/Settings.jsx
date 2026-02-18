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
    addActivity,
    updateActivity,
    deleteActivity,
    INPUT_TYPES
  } = useRamadan();

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const acts = getAllActivities();

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const [addingCategory, setAddingCategory] = useState(null);
  const [newActivityName, setNewActivityName] = useState('');

  const handleReset = () => {
    if (confirm('আপনি কি সব ডেটা রিসেট করতে চান? এটি পূর্ববর্তী সব ডেটা মুছে ফেলবে।')) {
      resetAll();
    }
  };

  const handleAdd = (categoryId) => {
    if (!newActivityName.trim()) return;

    const newActivity = {
      id: `custom_${Date.now()}`,
      name: newActivityName,
      nameEn: newActivityName,
      categoryId: categoryId,
      category: CATEGORIES[categoryId.toUpperCase()],
      inputType: INPUT_TYPES.BOOLEAN,
      weight: 10,
      description: 'Custom activity',
    };

    addActivity(newActivity);
    setNewActivityName('');
    setAddingCategory(null);
  };

  const startEditing = (act) => {
    setEditingId(act.id);
    setEditName(act.name);
  };

  const handleUpdate = (id) => {
    if (!editName.trim()) return;
    updateActivity(id, { name: editName });
    setEditingId(null);
    setEditName('');
  };

  const handleDelete = (id) => {
    if (confirm('আপনি কি এই ইবাদতটি মুছে ফেলতে চান?')) {
      deleteActivity(id);
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
          ইবাদত তালিকা ও সেটিংস
        </h2>
        <p className={`text-sm mb-6 ${isDark ? 'text-white/60' : 'text-emerald-600'}`}>
          এখানে আপনি আপনার চেকলিস্ট কাস্টমাইজ করতে পারেন। মোট {acts.length}টি ইবাদত ট্র্যাক করা হচ্ছে।
        </p>

        <div className="space-y-4">
          {Object.values(CATEGORIES).map((cat) => {
            const catActs = acts.filter(a => a.categoryId === cat.id);
            
            return (
              <div key={cat.id} className={`rounded-xl p-4 border transition-colors ${
                isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-emerald-50 border-emerald-100 hover:bg-emerald-100/50'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon name={cat.icon} className="text-lg" style={{ color: cat.color }} />
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-emerald-900'}`}>
                      {cat.name}
                    </span>
                    <span className={`text-xs ${isDark ? 'text-white/50' : 'text-emerald-500'}`}>
                      ({catActs.length})
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <AnimatePresence>
                    {catActs.map((act) => (
                      <motion.div
                        key={act.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`group flex items-center justify-between p-2 rounded-lg ${
                          isDark ? 'hover:bg-white/5' : 'hover:bg-white/50'
                        }`}
                      >
                        {editingId === act.id ? (
                          <div className="flex items-center gap-2 w-full">
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className={`flex-1 bg-transparent border-b px-2 py-1 outline-none ${
                                isDark ? 'border-white/20 text-white' : 'border-emerald-200 text-emerald-900'
                              }`}
                              autoFocus
                              onKeyDown={(e) => e.key === 'Enter' && handleUpdate(act.id)}
                            />
                            <button
                              onClick={() => handleUpdate(act.id)}
                              className="p-1 text-emerald-500 hover:bg-emerald-500/10 rounded"
                              title="সংরক্ষণ"
                            >
                              <Icon name="check" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1 text-red-400 hover:bg-red-400/10 rounded text-xs"
                            >
                              বাতিল
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className={`flex items-center gap-2 text-sm ${
                              isDark ? 'text-white/70' : 'text-emerald-700'
                            }`}>
                              <Icon name="listCheck" className="text-xs opacity-50" />
                              {act.name}
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => startEditing(act)}
                                className={`p-1.5 rounded transition-colors ${
                                  isDark ? 'hover:bg-white/10 text-white/60' : 'hover:bg-emerald-200 text-emerald-600'
                                }`}
                                title="এডিট"
                              >
                                <Icon name="edit" className="text-xs" />
                              </button>
                              <button
                                onClick={() => handleDelete(act.id)}
                                className={`p-1.5 rounded transition-colors ${
                                  isDark ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-100 text-red-500'
                                }`}
                                title="মুছে ফেলুন"
                              >
                                <Icon name="trash" className="text-xs" />
                              </button>
                            </div>
                          </>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Add New Input */}
                  {addingCategory === cat.id ? (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-2"
                    >
                      <input
                        type="text"
                        value={newActivityName}
                        onChange={(e) => setNewActivityName(e.target.value)}
                        placeholder="নতুন ইবাদতের নাম..."
                        className={`flex-1 bg-transparent border-b px-2 py-1 outline-none text-sm ${
                          isDark ? 'border-white/20 text-white placeholder-white/30' : 'border-emerald-200 text-emerald-900 placeholder-emerald-300'
                        }`}
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleAdd(cat.id)}
                      />
                      <button
                        onClick={() => handleAdd(cat.id)}
                        className="p-1 text-emerald-500 hover:bg-emerald-500/10 rounded"
                        title="যোগ করুন"
                      >
                        <Icon name="check" />
                      </button>
                      <button
                        onClick={() => setAddingCategory(null)}
                        className="p-1 text-red-400 hover:bg-red-400/10 rounded text-xs"
                      >
                        বাতিল
                      </button>
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => {
                        setAddingCategory(cat.id);
                        setNewActivityName('');
                      }}
                      className={`w-full text-left text-xs py-2 px-2 rounded-lg transition-colors flex items-center gap-2 ${
                        isDark ? 'text-white/40 hover:bg-white/5 hover:text-white/60' : 'text-emerald-500 hover:bg-emerald-100/50 hover:text-emerald-700'
                      }`}
                    >
                      <Icon name="plus" /> নতুন ইবাদত যোগ করুন
                    </button>
                  )}
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
