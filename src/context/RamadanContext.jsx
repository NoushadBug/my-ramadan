import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { getRamadanDates } from '../utils/dateUtils';
import { RAMADAN_ACTIVITIES, CATEGORIES, INPUT_TYPES, calculateScore, getAllActivities, getDefaultValue } from '../data/activities';
import { QURAN_TRACKER, getInitialQuranTracker, QURAN_TRACKING_STORAGE_KEY } from '../data/quranTracker';

const RamadanContext = createContext(null);

const STORAGE_KEY = 'my-ramadan-data';

const DEFAULT_CHECKLIST = [
  'fajr_jamat',
  'dhuhr_jamat',
  'asr_jamat',
  'maghrib_jamat',
  'isha_jamat',
  'tarawih',
  'quran_daily',
  'morning_dhikr',
  'evening_dhikr',
  'tahajjud'
];

const getInitialDayData = () => {
  const allActivities = getAllActivities();
  const activitiesData = {};
  
  allActivities.forEach(activity => {
    activitiesData[activity.id] = getDefaultValue(activity.inputType);
  });
  
  return {
    activities: activitiesData,
    reflection: '',
    customGoal: '',
    notes: ''
  };
};

const getInitialData = () => {
  const year = 2026;
  const days = {};
  const ramadanDates = getRamadanDates(year);
  
  ramadanDates.forEach(({ day, date }) => {
    days[day] = {
      date,
      ...getInitialDayData()
    };
  });

  return {
    year,
    currentDay: 1,
    days,
    streak: 0,
    longestStreak: 0,
    badges: [],
    quranTracker: getInitialQuranTracker(),
    quranLogs: [],
    checklistConfig: DEFAULT_CHECKLIST // Initialize with default list
  };
};

function ramadanReducer(state, action) {
  switch (action.type) {
    case 'SET_ACTIVITY_VALUE': {
      const { day, actId, value } = action.payload;
      const dayData = state.days[day];
      
      return {
        ...state,
        days: {
          ...state.days,
          [day]: {
            ...dayData,
            activities: {
              ...dayData.activities,
              [actId]: value
            }
          }
        }
      };
    }

    case 'SET_REFLECTION': {
      const { day, reflection } = action.payload;
      return {
        ...state,
        days: {
          ...state.days,
          [day]: {
            ...state.days[day],
            reflection
          }
        }
      };
    }

    case 'SET_CURRENT_DAY':
      return { ...state, currentDay: action.payload };

    case 'SET_CUSTOM_GOAL': {
      const { day, goal } = action.payload;
      return {
        ...state,
        days: {
          ...state.days,
          [day]: { ...state.days[day], customGoal: goal }
        }
      };
    }

    case 'SET_NOTES': {
      const { day, notes } = action.payload;
      return {
        ...state,
        days: {
          ...state.days,
          [day]: { ...state.days[day], notes }
        }
      };
    }

    case 'UPDATE_QURAN_TRACKER': {
      return {
        ...state,
        quranTracker: action.payload
      };
    }

    case 'ADD_QURAN_LOG': {
      const { log } = action.payload;
      return {
        ...state,
        quranLogs: [log, ...(state.quranLogs || [])]
      };
    }

    case 'UPDATE_CHECKLIST_CONFIG': {
      const { config } = action.payload;
      return {
        ...state,
        checklistConfig: config
      };
    }

    case 'ADD_CHECKLIST_ITEM': {
      const { activityId } = action.payload;
      if (state.checklistConfig.includes(activityId)) return state;
      return {
        ...state,
        checklistConfig: [...state.checklistConfig, activityId]
      };
    }

    case 'REMOVE_CHECKLIST_ITEM': {
      const { activityId } = action.payload;
      return {
        ...state,
        checklistConfig: state.checklistConfig.filter(id => id !== activityId)
      };
    }

    case 'MOVE_CHECKLIST_ITEM': {
      const { index, direction } = action.payload; // direction: -1 (up) or 1 (down)
      const newConfig = [...state.checklistConfig];
      const newIndex = index + direction;

      if (newIndex < 0 || newIndex >= newConfig.length) return state;

      const item = newConfig[index];
      newConfig.splice(index, 1);
      newConfig.splice(newIndex, 0, item);

      return {
        ...state,
        checklistConfig: newConfig
      };
    }

    case 'ADD_BADGE': {
      const badge = action.payload;
      if (state.badges?.includes(badge)) return state;
      return {
        ...state,
        badges: [...(state.badges || []), badge]
      };
    }

    case 'RESET_DAY': {
      const { day } = action.payload;
      return {
        ...state,
        days: {
          ...state.days,
          [day]: {
            ...state.days[day],
            ...getInitialDayData()
          }
        }
      };
    }

    case 'RESET_ALL':
      return getInitialData();

    default:
      return state;
  }
}

export function RamadanProvider({ children }) {
  const [schedule, setSchedule] = useState(null);
  const [state, dispatch] = useReducer(ramadanReducer, null, () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.year === 2026) {
          if (!parsed.quranTracker) {
            parsed.quranTracker = getInitialQuranTracker();
          }
          if (!parsed.quranLogs) {
            parsed.quranLogs = [];
          }
          if (!parsed.checklistConfig) {
            parsed.checklistConfig = DEFAULT_CHECKLIST;
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return getInitialData();
  });

  // Fetch Ramadan Data
  useEffect(() => {
    fetch('/ramadan_data_2026.json')
      .then(res => res.json())
      .then(data => setSchedule(data))
      .catch(err => console.error('Failed to load Ramadan data:', err));
  }, []);

  // Set Current Day based on Date
  useEffect(() => {
    // Start date is Feb 19, 2026
    const startDate = new Date('2026-02-19T00:00:00');
    const now = new Date();

    // Calculate difference in days
    const diffTime = now - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays >= 1 && diffDays <= 30) {
      dispatch({ type: 'SET_CURRENT_DAY', payload: diffDays });
    }
    // If we are testing/developing before 2026, we can stick to Day 1
    // or calculate based on a simulated start date for dev.
    // For now, adhere to the logic: if not in range, stay on default (1) or user choice.
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setActivityValue = (day, actId, value) => {
    dispatch({ type: 'SET_ACTIVITY_VALUE', payload: { day, actId, value } });
  };
  
  const setReflection = (day, reflection) => {
    dispatch({ type: 'SET_REFLECTION', payload: { day, reflection } });
  };

  const setCurrentDay = (day) => dispatch({ type: 'SET_CURRENT_DAY', payload: day });
  const setCustomGoal = (day, goal) => dispatch({ type: 'SET_CUSTOM_GOAL', payload: { day, goal } });
  const setNotes = (day, notes) => dispatch({ type: 'SET_NOTES', payload: { day, notes } });
  const updateQuranTracker = (tracker) => dispatch({ type: 'UPDATE_QURAN_TRACKER', payload: tracker });
  const addQuranLog = (log) => dispatch({ type: 'ADD_QURAN_LOG', payload: { log } });

  const updateChecklistConfig = (config) => dispatch({ type: 'UPDATE_CHECKLIST_CONFIG', payload: { config } });
  const addChecklistItem = (activityId) => dispatch({ type: 'ADD_CHECKLIST_ITEM', payload: { activityId } });
  const removeChecklistItem = (activityId) => dispatch({ type: 'REMOVE_CHECKLIST_ITEM', payload: { activityId } });
  const moveChecklistItem = (index, direction) => dispatch({ type: 'MOVE_CHECKLIST_ITEM', payload: { index, direction } });

  const resetDay = (day) => dispatch({ type: 'RESET_DAY', payload: { day } });
  const resetAll = () => dispatch({ type: 'RESET_ALL' });

  const getDayData = (day) => state.days[day];
  
  const getActivityValue = (day, actId) => {
    return state.days[day]?.activities?.[actId] || false;
  };

  const getCompletedActivitiesCount = (day) => {
    const dayData = state.days[day];
    if (!dayData?.activities) return 0;
    
    let count = 0;
    const allActivities = getAllActivities();
    
    allActivities.forEach(activity => {
      const value = dayData.activities[activity.id];
      if (activity.inputType === 'boolean') {
        if (value) count++;
      } else if (activity.inputType === 'text') {
        if (value && value.length > 10) count++;
      } else if (activity.inputType === 'scale') {
        if (value >= 3) count++;
      } else if (activity.inputType === 'counter' || activity.inputType === 'number') {
        if (value > 0) count++;
      }
    });
    
    return count;
  };

  const getTotalActivities = () => getAllActivities().length;

  const getDailyScore = (day) => {
    const dayData = state.days[day];
    if (!dayData?.activities) return 0;
    
    let score = 0;
    const allActivities = getAllActivities();
    
    allActivities.forEach(activity => {
      if (activity.onlyLast10 && day < 21) return;
      const value = dayData.activities[activity.id];
      score += calculateScore(activity, value);
    });
    
    return Math.round(score);
  };

  const getTotalScore = () => {
    let total = 0;
    for (let i = 1; i <= 30; i++) {
      total += getDailyScore(i);
    }
    return total;
  };

  const getProgress = () => {
    const totalMaxScore = getAllActivities().reduce((sum, a) => sum + a.weight * (a.inputType === 'scale' ? 5 : 1), 0);
    const totalScore = getTotalScore();
    return totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;
  };

  const getDailyProgress = (day) => {
    const dayActivities = getAllActivities().filter(a => !a.onlyLast10 || day >= 21);
    const maxScore = dayActivities.reduce((sum, a) => sum + a.weight * (a.inputType === 'scale' ? 5 : 1), 0);
    const dayScore = getDailyScore(day);
    return maxScore > 0 ? Math.round((dayScore / maxScore) * 100) : 0;
  };

  const getStreak = () => {
    let streak = 0;
    for (let i = 1; i <= 30; i++) {
      if (getDailyProgress(i) > 30) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const isLast10Days = (day) => day >= 21;

  const getCategories = () => CATEGORIES;

  const getCategoryActivities = (categoryId) => {
    return RAMADAN_ACTIVITIES[categoryId] || [];
  };

  // Helpers for Schedule
  const todaySchedule = schedule?.ramadan_schedule?.find(d => d.day === state.currentDay);

  return (
    <RamadanContext.Provider value={{
      state,
      schedule,
      todaySchedule,
      setActivityValue,
      setReflection,
      setCurrentDay,
      setCustomGoal,
      setNotes,
      updateQuranTracker,
      addQuranLog,
      updateChecklistConfig,
      addChecklistItem,
      removeChecklistItem,
      moveChecklistItem,
      resetDay,
      resetAll,
      getDayData,
      getActivityValue,
      getCompletedActivitiesCount,
      getTotalActivities,
      getDailyScore,
      getTotalScore,
      getProgress,
      getDailyProgress,
      getStreak,
      isLast10Days,
      getCategories,
      getCategoryActivities,
      getAllActivities,
      quranTracker: state.quranTracker,
      quranLogs: state.quranLogs || [],
      checklistConfig: state.checklistConfig || DEFAULT_CHECKLIST,
      CATEGORIES,
      INPUT_TYPES
    }}>
      {children}
    </RamadanContext.Provider>
  );
}

export function useRamadan() {
  const context = useContext(RamadanContext);
  if (!context) {
    throw new Error('useRamadan must be used within a RamadanProvider');
  }
  return context;
}
