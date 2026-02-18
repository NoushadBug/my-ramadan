import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { getRamadanDates } from '../utils/dateUtils';
import { RAMADAN_ACTIVITIES, CATEGORIES, INPUT_TYPES, calculateScore, getAllActivities as getDefaultActivities, getDefaultValue } from '../data/activities';
import { QURAN_TRACKER, getInitialQuranTracker, QURAN_TRACKING_STORAGE_KEY } from '../data/quranTracker';

const RamadanContext = createContext(null);

const STORAGE_KEY = 'my-ramadan-data';

const getInitialDayData = () => {
  const allActivities = getDefaultActivities();
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
    quranLogs: [], // New state for detailed logs
    customActivities: getDefaultActivities() // Initialize with default activities
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

    case 'ADD_ACTIVITY': {
      const { activity } = action.payload;
      return {
        ...state,
        customActivities: [...state.customActivities, activity]
      };
    }

    case 'UPDATE_ACTIVITY': {
      const { id, updates } = action.payload;
      return {
        ...state,
        customActivities: state.customActivities.map(act =>
          act.id === id ? { ...act, ...updates } : act
        )
      };
    }

    case 'DELETE_ACTIVITY': {
      const { id } = action.payload;
      return {
        ...state,
        customActivities: state.customActivities.filter(act => act.id !== id)
      };
    }

    case 'REORDER_ACTIVITIES': {
      const { activities } = action.payload;
      return {
        ...state,
        customActivities: activities
      };
    }

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
          if (!parsed.customActivities) {
            parsed.customActivities = getDefaultActivities();
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

    // For testing/demo purposes, if we are not in 2026, we might want to simulate
    // But adhering to strict logic first:
    const diffTime = now - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays >= 1 && diffDays <= 30) {
      dispatch({ type: 'SET_CURRENT_DAY', payload: diffDays });
    }
    // If not in range, we keep default (1) or user selected day
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
  const resetDay = (day) => dispatch({ type: 'RESET_DAY', payload: { day } });
  const resetAll = () => dispatch({ type: 'RESET_ALL' });

  // New actions
  const addActivity = (activity) => dispatch({ type: 'ADD_ACTIVITY', payload: { activity } });
  const updateActivity = (id, updates) => dispatch({ type: 'UPDATE_ACTIVITY', payload: { id, updates } });
  const deleteActivity = (id) => dispatch({ type: 'DELETE_ACTIVITY', payload: { id } });
  const reorderActivities = (activities) => dispatch({ type: 'REORDER_ACTIVITIES', payload: { activities } });

  const getDayData = (day) => state.days[day];
  
  const getActivityValue = (day, actId) => {
    return state.days[day]?.activities?.[actId] || false;
  };

  // Get dynamic activities
  const getAllActivities = () => state.customActivities || getDefaultActivities();

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
    return getAllActivities().filter(a => a.categoryId === categoryId);
  };

  // Helpers for Schedule
  const getTodayRamadanDay = () => {
    const startDate = new Date('2026-02-19T00:00:00');
    const now = new Date();
    const diffTime = now - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const getEffectiveRamadanDay = () => {
    const day = getTodayRamadanDay();
    if (day < 1) return 1;
    if (day > 30) return 30;
    return day;
  };

  const currentRamadanDay = getTodayRamadanDay();
  const effectiveDay = getEffectiveRamadanDay();
  const todaySchedule = schedule?.ramadan_schedule?.find(d => d.day === effectiveDay);
  const isActualRamadanDay = currentRamadanDay >= 1 && currentRamadanDay <= 30;

  return (
    <RamadanContext.Provider value={{
      state,
      schedule,
      todaySchedule,
      isActualRamadanDay,
      setActivityValue,
      setReflection,
      setCurrentDay,
      setCustomGoal,
      setNotes,
      updateQuranTracker,
      addQuranLog,
      resetDay,
      resetAll,
      addActivity,
      updateActivity,
      deleteActivity,
      reorderActivities,
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
