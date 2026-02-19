import { useTheme } from '../../context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`py-8 text-base font-semibold mt-auto border-t ${
      theme === 'dark'
        ? 'border-white/10 text-emerald-200/80 bg-black/20'
        : 'border-emerald-100 text-emerald-800/80 bg-emerald-50'
    }`}>
      <div className="max-w-3xl mx-auto px-4 flex items-center justify-between">
        <p>Ramadan Companion</p>
        <div className="flex items-center gap-2">
          <span>Powered by</span>
          <a
            href="https://activight.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80 flex items-center gap-2"
          >
            <img
              src="https://activight.com/assets/logo_transparent.png"
              alt="Activight"
              className="h-8 w-8 bg-white rounded-full p-1 shadow-sm"
            />
            <span>Activight</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
