
import Link from 'next/link';

import styles from './styles/Navbar.module.scss'

export const Navbar = function() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar__nav}>
        <li className={styles.navbar__item}>
          <Link href="/">
            <a className={styles.navbar__link}>About</a>
          </Link>{' '}
        </li>
        <li className={styles.navbar__item}>
          <Link href="/resume">
            <a className={styles.navbar__link}>Resume</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
