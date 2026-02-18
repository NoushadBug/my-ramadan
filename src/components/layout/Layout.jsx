import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import TabNav from './TabNav';
import Settings from '../settings/Settings';
import Icon from '../Icon';

export default function Layout({ children, activeTab, setActiveTab }) {
  const [showSettings, setShowSettings] = useState(false);
  
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
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-emerald-900/90 backdrop-blur-sm p-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">সেটিংস</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
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
