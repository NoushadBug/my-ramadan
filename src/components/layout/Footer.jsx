import { useTheme } from '../../context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`py-6 text-sm mt-auto border-t ${
      theme === 'dark'
        ? 'border-white/10 text-emerald-200/60'
        : 'border-emerald-100 text-emerald-800/60'
    }`}>
      <div className="max-w-3xl mx-auto px-4 flex items-center justify-between">
        <p className="font-medium">Ramadan Companion</p>
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
            <span className="font-semibold">Activight</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
