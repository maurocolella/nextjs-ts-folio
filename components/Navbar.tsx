import Link from 'next/link';
import { PureComponent, RefObject, createRef } from 'react';

import styles from './styles/Navbar.module.scss';

type State = {
  currentOffset: number
  navbarSticky: boolean
  startOffset: number
};

export class Navbar extends PureComponent<{}, State> {
  navbarRef: RefObject<HTMLElement>;

  constructor(props: any) {
    super(props);

    this.navbarRef = createRef();
    this.state = {
      currentOffset: 0,
      navbarSticky: false,
      startOffset: 0,
    };
  }

  componentDidMount() {
    this.setState({
      startOffset: this.navbarRef.current!.offsetTop,
    });
    this.checkScrollOffset();
  }

  checkScrollOffset = () => {
    const { currentOffset, navbarSticky, startOffset } = this.state;

    const currentState = window.pageYOffset > startOffset;

    if (currentState !== navbarSticky ) {
      this.setState({
        navbarSticky: currentState,
      });
    }

    const body = document.body;
    const htmlEl = document.documentElement;

    const documentHeight = Math.max( body.scrollHeight, body.offsetHeight,
                     htmlEl.clientHeight, htmlEl.scrollHeight, htmlEl.offsetHeight ) - window.innerHeight;

    const scrollOffset = Number(((window.pageYOffset * 100) / documentHeight).toFixed(0));

    if (scrollOffset !== currentOffset) {
      this.setState({
        currentOffset: (currentOffset + scrollOffset) / 2,
      });
    }

    window.requestAnimationFrame(this.checkScrollOffset);
  }

  render() {
    const { currentOffset, navbarSticky } = this.state;

    const deco = [styles.navbar, navbarSticky && styles['navbar--sticky']].filter(Boolean).join(' ');

    return (
      <nav
        className={deco}
        ref={this.navbarRef}
      >
        <div className={styles.navbar__wrapper}>
          <div className={styles.navbar__progress} style={{ width: `${currentOffset}%` }} />
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
        </div>
      </nav>
    );
  }
}
