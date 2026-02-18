import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import TabNav from './TabNav';
import Icon from '../Icon';
import { useTheme } from '../../context/ThemeContext';

export default function Layout({ children, activeTab, setActiveTab }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
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
    </div>
  );
}
