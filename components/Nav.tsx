
import Link from 'next/link';

export const Nav = function() {
  return (
    <nav>
      <Link href="/">
        <a>About</a>
      </Link>{' '}
      |{' '}
      <Link href="/resume">
        <a>Resume</a>
      </Link>
    </nav>
  );
};
