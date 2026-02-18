import { useRamadan } from '../../context/RamadanContext';
import { SORTED_ACTIVITIES_LIST } from '../../data/activities';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../Icon';

const toBengali = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
};

export default function MonthView() {
  const { state, setActivityValue } = useRamadan();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-emerald-100'}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className={`p-3 sticky left-0 z-10 text-left min-w-[200px] border-b border-r ${
                isDark ? 'bg-gray-900 border-white/10 text-white' : 'bg-emerald-50 border-emerald-100 text-emerald-900'
              }`}>
                আমল
              </th>
              {days.map(day => (
                <th key={day} className={`p-2 text-center min-w-[40px] border-b border-r last:border-r-0 ${
                   isDark ? 'border-white/10 text-white/70' : 'border-emerald-100 text-emerald-600'
                }`}>
                  {toBengali(day)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SORTED_ACTIVITIES_LIST.map((activity, idx) => (
              <tr key={activity.id} className={isDark ? 'hover:bg-white/5' : 'hover:bg-emerald-50/50'}>
                <td className={`p-3 sticky left-0 z-10 font-medium border-b border-r flex items-center gap-2 ${
                  isDark ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-emerald-100 text-emerald-800'
                }`}>
                  <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs ${
                    isDark ? 'bg-white/10' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {toBengali(idx + 1)}
                  </div>
                  <span className="truncate" title={activity.name}>{activity.name}</span>
                </td>
                {days.map(day => {
                  const dayData = state.days[day];
                  const value = dayData?.activities?.[activity.id];
                  const isActive = !!value;

                  return (
                    <td key={day} className={`p-2 text-center border-b border-r last:border-r-0 ${
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
