import { useState, useEffect } from 'react';
import { RamadanProvider } from './context/RamadanContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import DayTracker from './components/tracker/DayTracker';
import Calendar from './components/planner/Calendar';
import StreakCounter from './components/stats/StreakCounter';
import Dashboard from './components/dashboard/Dashboard';
import './components/Icons';

function ThemeInitializer({ children }) {
  const [ready, setReady] = useState(false);
  
  useEffect(() => {
    const theme = localStorage.getItem('my-ramadan-theme') || 'dark';
    document.documentElement.classList.add(theme);
    setReady(true);
  }, []);

  if (!ready) return null;
  return children;
}

function App() {
  const [activeTab, setActiveTab] = useState('tracker');

  return (
    <ThemeInitializer>
      <ThemeProvider>
        <RamadanProvider>
          <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
            {activeTab === 'tracker' && <DayTracker />}
            {activeTab === 'planner' && <Calendar />}
            {activeTab === 'stats' && <StreakCounter />}
            {activeTab === 'dashboard' && <Dashboard />}
          </Layout>
        </RamadanProvider>
      </ThemeProvider>
    </ThemeInitializer>
  );
}

export default App;
