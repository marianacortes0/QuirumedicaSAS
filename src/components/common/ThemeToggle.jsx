import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

// Alterna modo claro/oscuro. El tema se aplica con la clase `dark` en <html>
// y se guarda en localStorage. El tema inicial lo fija un script en index.html
// (antes de pintar) para evitar el parpadeo.
export function ThemeToggle() {
  const [dark, setDark] = useState(
    () =>
      typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark'),
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {
      /* almacenamiento no disponible */
    }
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((v) => !v)}
      aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={dark ? 'Modo claro' : 'Modo oscuro'}
      className="grid size-10 place-items-center rounded-lg border border-line bg-surface text-primary transition-colors hover:border-accent hover:text-accent-dark"
    >
      {dark ? (
        <Sun className="size-5" aria-hidden="true" />
      ) : (
        <Moon className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}
