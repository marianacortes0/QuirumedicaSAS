// Quirumédica logo — the full brand mark (símbolo + palabra).
// Height is passed in so the navbar can run it large and the footer smaller.
export function Brandmark({ className = 'h-12 w-auto' }) {
  return (
    <img
      src="/images/logo/logo_sinsas.png"
      alt="Quirumédica SAS"
      className={className}
    />
  );
}
