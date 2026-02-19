import { useTheme } from '../../context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`py-6 text-center text-sm mt-auto ${
      theme === 'dark' ? 'text-emerald-200/60' : 'text-emerald-800/60'
    }`}>
      <p className="mb-2">Ramadan Companion</p>
      <div className="flex items-center justify-center gap-2">
        <span>Powered by</span>
        <a
          href="https://activight.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-80"
        >
          <img
            src="https://activight.com/assets/logo_transparent.png"
            alt="Activight"
            className="h-6 w-auto"
          />
        </a>
      </div>
    </footer>
  );
}
