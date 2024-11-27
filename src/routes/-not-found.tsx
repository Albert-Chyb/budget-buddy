import { Link } from '@tanstack/react-router';

export function NotFound() {
  return (
    <>
      <h1>Strona nie została znaleziona !</h1>
      <Link to='/'>Wróć do strony głównej</Link>
    </>
  );
}
