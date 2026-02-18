import { motion } from 'framer-motion';
import Icon from '../Icon';
import { useTheme } from '../../context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header 
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`sticky top-0 z-50 backdrop-blur-md border-b ${
        theme === 'dark' 
          ? 'bg-white/10 border-white/10' 
          : 'bg-black/5 border-black/10'
      }`}
    >
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/free-islamic-lantern-icon-svg-download-png-12100616.png"
            alt="Islamic Lantern"
            className="w-10 h-10"
          />
          <div>
            <h1 className={`text-xl font-bold tracking-wide ${theme === 'dark' ? 'text-white' : 'text-emerald-900'}`}>আমার রমজান</h1>
            <p className={`text-xs ${theme === 'dark' ? 'text-emerald-200' : 'text-emerald-700'}`}>রমজান ১৪৪৭</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className={`text-sm ${theme === 'dark' ? 'text-emerald-200' : 'text-emerald-700'}`}>৩০ দিনের</p>
            <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-emerald-900'}`}>ইবাদত ট্র্যাকার</p>
          </div>
          
          <button
            onClick={toggleTheme}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              theme === 'dark' 
                ? 'bg-white/10 hover:bg-white/20 text-white' 
                : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700'
            }`}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="text-sm" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
