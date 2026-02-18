import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import TabNav from './TabNav';
import Settings from '../settings/Settings';
import Icon from '../Icon';
import { useTheme } from '../../context/ThemeContext';

export default function Layout({ children, activeTab, setActiveTab }) {
  const [showSettings, setShowSettings] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header onSettingsClick={() => setShowSettings(true)} />
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-3xl mx-auto px-4"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
                isDark 
                  ? 'bg-gradient-to-br from-emerald-900 to-emerald-800' 
                  : 'bg-gradient-to-br from-emerald-50 to-white'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`sticky top-0 backdrop-blur-sm p-4 border-b flex items-center justify-between ${
                isDark 
                  ? 'bg-emerald-900/90 border-white/10' 
                  : 'bg-white/90 border-emerald-100'
              }`}>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-emerald-900'}`}>সেটিংস</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isDark 
                      ? 'bg-white/10 hover:bg-white/20 text-white' 
                      : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700'
                  }`}
                >
                  <Icon name="chevronRight" className="rotate-90" />
                </button>
              </div>
              <div className="p-4">
                <Settings />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
