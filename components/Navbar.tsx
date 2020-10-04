import Link from 'next/link';
import { PureComponent, RefObject, createRef } from 'react';

import styles from './styles/Navbar.module.scss';

type State = {
  navbarSticky: boolean
  startOffset: number
};

export class Navbar extends PureComponent<{}, State> {
  navbarRef: RefObject<HTMLElement>;

  constructor(props: any) {
    super(props);

    this.navbarRef = createRef();
    this.state = {
      navbarSticky: false,
      startOffset: 0,
    };
  }

  componentDidMount() {
    this.setState({
      startOffset: this.navbarRef.current!.offsetTop,
    })
    this.checkScrollOffset();
  }

  checkScrollOffset = () => {
    const { navbarSticky, startOffset } = this.state;

    const currentState = window.pageYOffset > startOffset;

    if (currentState !== navbarSticky ) {
      this.setState({
        navbarSticky: currentState,
      });
    }

    window.requestAnimationFrame(this.checkScrollOffset);
  }

  render() {
    const { navbarSticky } = this.state;

    const deco = [styles.navbar, navbarSticky && styles['navbar--sticky']].filter(Boolean).join(' ');

    return (
      <nav
        className={deco}
        ref={this.navbarRef}
      >
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
  }
}
