import { createContext, useContext, useReducer, useEffect } from 'react';
import { getRamadanDates } from '../utils/dateUtils';
import { DEFAULT_ACTS, getEmptyActs } from '../data/acts';

const RamadanContext = createContext(null);

const STORAGE_KEY = 'my-ramadan-data';

const getInitialData = () => {
  const year = 2026;
  const days = {};
  const ramadanDates = getRamadanDates(year);
  
  const defaultActIds = DEFAULT_ACTS.map(act => act.id);
  
  ramadanDates.forEach(({ day, date }) => {
    days[day] = {
      date,
      acts: getEmptyActs(defaultActIds),
      customGoal: '',
      notes: ''
    };
  });

  return {
    year,
    currentDay: 1,
    days,
    streak: 0,
    longestStreak: 0,
    acts: DEFAULT_ACTS
  };
};

function ramadanReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_ACT': {
      const { day, actId } = action.payload;
      const dayData = state.days[day];
      const newActs = { ...dayData.acts, [actId]: !dayData.acts[actId] };
      
      const completedCount = Object.values(newActs).filter(Boolean).length;
      const streak = completedCount > 0 ? state.streak + 1 : state.streak;
      const longestStreak = Math.max(state.longestStreak, streak);

      return {
        ...state,
        days: {
          ...state.days,
          [day]: { ...dayData, acts: newActs }
        },
        streak,
        longestStreak
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

    case 'ADD_ACT': {
      const newAct = action.payload;
      const newActs = [...(state.acts || DEFAULT_ACTS), newAct];
      
      const newDays = {};
      Object.keys(state.days).forEach(day => {
        newDays[day] = {
          ...state.days[day],
          acts: {
            ...state.days[day].acts,
            [newAct.id]: false
          }
        };
      });

      return {
        ...state,
        acts: newActs,
        days: newDays
      };
    }

    case 'REMOVE_ACT': {
      const actId = action.payload;
      const newActs = (state.acts || DEFAULT_ACTS).filter(act => act.id !== actId);
      
      const newDays = {};
      Object.keys(state.days).forEach(day => {
        const { [actId]: removed, ...remainingActs } = state.days[day].acts;
        newDays[day] = {
          ...state.days[day],
          acts: remainingActs
        };
      });

      return {
        ...state,
        acts: newActs,
        days: newDays
      };
    }

    case 'UPDATE_ACT': {
      const { id, name, icon } = action.payload;
      const newActs = (state.acts || DEFAULT_ACTS).map(act => 
        act.id === id ? { ...act, name, icon } : act
      );
      return { ...state, acts: newActs };
    }

    case 'RESET_DAY': {
      const { day } = action.payload;
      const actIds = (state.acts || DEFAULT_ACTS).map(act => act.id);
      return {
        ...state,
        days: {
          ...state.days,
          [day]: { ...state.days[day], acts: getEmptyActs(actIds), customGoal: '', notes: '' }
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
  const [state, dispatch] = useReducer(ramadanReducer, null, () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.year === 2026) {
          if (!parsed.acts) {
            parsed.acts = DEFAULT_ACTS;
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return getInitialData();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const toggleAct = (day, actId) => dispatch({ type: 'TOGGLE_ACT', payload: { day, actId } });
  const setCurrentDay = (day) => dispatch({ type: 'SET_CURRENT_DAY', payload: day });
  const setCustomGoal = (day, goal) => dispatch({ type: 'SET_CUSTOM_GOAL', payload: { day, goal } });
  const setNotes = (day, notes) => dispatch({ type: 'SET_NOTES', payload: { day, notes } });
  const addAct = (act) => dispatch({ type: 'ADD_ACT', payload: act });
  const removeAct = (actId) => dispatch({ type: 'REMOVE_ACT', payload: actId });
  const updateAct = (id, name, icon) => dispatch({ type: 'UPDATE_ACT', payload: { id, name, icon } });
  const resetDay = (day) => dispatch({ type: 'RESET_DAY', payload: { day } });
  const resetAll = () => dispatch({ type: 'RESET_ALL' });

  const getDayData = (day) => state.days[day];
  const getActs = () => state.acts || DEFAULT_ACTS;
  const getCompletedActs = (day) => {
    const acts = state.days[day]?.acts || {};
    return Object.values(acts).filter(Boolean).length;
  };

  const getTotalCompleted = () => {
    let total = 0;
    for (let i = 1; i <= 30; i++) {
      total += getCompletedActs(i);
    }
    return total;
  };

  const getTotalActs = () => {
    const actsCount = (state.acts || DEFAULT_ACTS).length;
    return 30 * actsCount;
  };

  const getProgress = () => {
    const total = getTotalCompleted();
    const max = getTotalActs();
    return max > 0 ? Math.round((total / max) * 100) : 0;
  };

  const getDailyProgress = (day) => {
    const acts = getActs();
    const completed = getCompletedActs(day);
    return acts.length > 0 ? Math.round((completed / acts.length) * 100) : 0;
  };

  const getDayStats = (day) => {
    const acts = getActs();
    const dayActs = state.days[day]?.acts || {};
    const completed = acts.filter(act => dayActs[act.id]).length;
    const missed = acts.filter(act => !dayActs[act.id]).length;
    return { completed, missed, total: acts.length };
  };

  return (
    <RamadanContext.Provider value={{
      state,
      toggleAct,
      setCurrentDay,
      setCustomGoal,
      setNotes,
      addAct,
      removeAct,
      updateAct,
      resetDay,
      resetAll,
      getDayData,
      getActs,
      getCompletedActs,
      getTotalCompleted,
      getTotalActs,
      getProgress,
      getDailyProgress,
      getDayStats,
      getBengaliNumber: (num) => {
        const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return num.toString().split('').map(d => bengaliDigits[parseInt(d)]).join('');
      },
      getRamadanDates
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
