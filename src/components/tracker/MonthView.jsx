import { useState, useEffect, useRef } from 'react';
import { useRamadan } from '../../context/RamadanContext';
import { SORTED_ACTIVITIES_LIST } from '../../data/activities';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../Icon';

const toBengali = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
};

export default function MonthView({ defaultTab }) {
  const { state, setActivityValue } = useRamadan();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const currentDay = state.currentDay;

  // Initial state based on currentDay
  const getInitialTab = () => {
    if (defaultTab) return defaultTab;
    if (currentDay <= 10) return 'first';
    if (currentDay <= 20) return 'second';
    return 'third';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);

  // Update tab when currentDay changes, unless user selected 'all'
  useEffect(() => {
    if (activeTab === 'all') return;

    if (currentDay <= 10 && activeTab !== 'first') setActiveTab('first');
    else if (currentDay > 10 && currentDay <= 20 && activeTab !== 'second') setActiveTab('second');
    else if (currentDay > 20 && activeTab !== 'third') setActiveTab('third');
  }, [currentDay]);

  const getDays = () => {
    switch (activeTab) {
      case 'first': return Array.from({ length: 10 }, (_, i) => i + 1);
      case 'second': return Array.from({ length: 10 }, (_, i) => i + 11);
      case 'third': return Array.from({ length: 10 }, (_, i) => i + 21);
      default: return Array.from({ length: 30 }, (_, i) => i + 1);
    }
  };

  const days = getDays();

  const tabs = [
    { id: 'first', label: '১ম ১০ দিন' },
    { id: 'second', label: '২য় ১০ দিন' },
    { id: 'third', label: '৩য় ১০ দিন' },
    { id: 'all', label: 'পুরো মাস' },
  ];

  const topScrollRef = useRef(null);
  const bottomScrollRef = useRef(null);
  const isSyncing = useRef(false);

  useEffect(() => {
    if (!bottomScrollRef.current) return;

    // Set initial spacer width
    const updateSpacer = () => {
        if (bottomScrollRef.current && topScrollRef.current) {
            const width = bottomScrollRef.current.scrollWidth;
            // Only update if significantly different to avoid loops/jitters,
            // but setting style width is cheap
            const spacer = topScrollRef.current.firstChild;
            if (spacer) spacer.style.width = `${width}px`;
        }
    };

    updateSpacer();

    // Optional: Update on window resize
    window.addEventListener('resize', updateSpacer);
    return () => window.removeEventListener('resize', updateSpacer);
  }, [activeTab, days]); // Re-measure when content changes

  useEffect(() => {
    const top = topScrollRef.current;
    const bottom = bottomScrollRef.current;

    if (!top || !bottom) return;

    const handleScroll = (source) => (e) => {
        if (isSyncing.current) return;
        isSyncing.current = true;

        if (source === 'top') {
            bottom.scrollLeft = e.target.scrollLeft;
        } else {
            top.scrollLeft = e.target.scrollLeft;
        }

        // Reset syncing flag after a short delay (or next frame)
        requestAnimationFrame(() => {
            isSyncing.current = false;
        });
    };

    const onTopScroll = handleScroll('top');
    const onBottomScroll = handleScroll('bottom');

    top.addEventListener('scroll', onTopScroll);
    bottom.addEventListener('scroll', onBottomScroll);

    return () => {
        top.removeEventListener('scroll', onTopScroll);
        bottom.removeEventListener('scroll', onBottomScroll);
    };
  }, []);

  return (
    <div className={`rounded-2xl border overflow-hidden flex flex-col h-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-emerald-100'}`}>
      {/* Tabs */}
      <div className={`p-2 border-b overflow-x-auto flex gap-2 shrink-0 ${isDark ? 'border-white/10' : 'border-emerald-100'}`}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? isDark
                  ? 'bg-emerald-500 text-white'
                  : 'bg-emerald-100 text-emerald-700'
                : isDark
                  ? 'text-white/50 hover:bg-white/10'
                  : 'text-emerald-600/60 hover:bg-emerald-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Top Scrollbar */}
      <div
        ref={topScrollRef}
        className={`overflow-x-auto border-b sticky top-0 z-30 ${isDark ? 'border-white/10 bg-emerald-900' : 'border-emerald-100 bg-emerald-50'}`}
        style={{ height: '16px' }} // Explicit height for scrollbar
      >
        <div style={{ height: '1px' }}></div>
      </div>

      <div ref={bottomScrollRef} className="flex-1 overflow-auto">
        <table className="w-full text-xs sm:text-sm border-collapse">
          <thead>
            <tr>
              <th className={`p-2 sticky left-0 top-0 z-20 text-left min-w-[140px] sm:min-w-[250px] border-b border-r ${
                isDark ? 'bg-gray-900 border-white/10 text-white' : 'bg-emerald-50 border-emerald-100 text-emerald-900'
              }`}>
                আমল
              </th>
              {days.map(day => (
                <th key={day} className={`p-1 sm:p-2 sticky top-0 z-10 text-center min-w-[30px] sm:min-w-[40px] border-b border-r last:border-r-0 ${
                   isDark ? 'bg-gray-900 border-white/10 text-white/70' : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                }`}>
                  {toBengali(day)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SORTED_ACTIVITIES_LIST.map((activity, idx) => (
              <tr key={activity.id} className={isDark ? 'hover:bg-white/5' : 'hover:bg-emerald-50/50'}>
                <td className={`p-1 sm:p-2 sticky left-0 z-10 font-medium border-b border-r flex items-center gap-2 ${
                  isDark ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-emerald-100 text-emerald-800'
                }`}>
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 rounded-full flex items-center justify-center text-[10px] sm:text-xs ${
                    isDark ? 'bg-white/10' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {toBengali(idx + 1)}
                  </div>
                  <span className="truncate max-w-[100px] sm:max-w-full" title={activity.name}>{activity.name}</span>
                </td>
                {days.map(day => {
                  const dayData = state.days[day];
                  const value = dayData?.activities?.[activity.id];
                  const isActive = !!value;

                  return (
                    <td key={day} className={`p-1 sm:p-2 text-center border-b border-r last:border-r-0 ${
                       isDark ? 'border-white/10' : 'border-emerald-100'
                    }`}>
                      <button
                        onClick={() => setActivityValue(day, activity.id, !isActive)}
                        className={`w-5 h-5 rounded flex items-center justify-center transition-colors mx-auto ${
                          isActive
                            ? 'bg-emerald-500 text-white'
                            : isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {isActive && <Icon name="check" className="text-xs" />}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
