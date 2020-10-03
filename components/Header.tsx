
import { Component, createRef } from 'react';
import { Logo } from './Logo';
import { SunIcon } from './icons/SunIcon';

import { FPSCounter, setupSwirl } from '../utils';

import styles from './styles/Header.module.scss';

type State = {
  FPSCounter: any
  measures: Array<number>
  effectVisible: boolean
};

const NUM_SAMPLES = 15;
const SAMPLING_INTERVAL = 150;

export class Header extends Component<{}, State> {
  effectCanvasRef: any;

  timer: any;

  constructor(props: Readonly<{}>) {
    super(props);
    this.effectCanvasRef = createRef();
    this.state = {
      FPSCounter,
      'effectVisible': false,
      'measures': [],
    };
  }

  instrument = () => {
    const { measures, FPSCounter } = this.state;

    if (measures.length < NUM_SAMPLES) {
      const measure = FPSCounter.getFps();

      measures.push(measure);

      this.setState({ measures });
    } else {
      clearInterval(this.timer);

      const average = measures.reduce((a: number, b: number) => (a + b) / 2, 0);

      if (average > 50) this.setState({ 'effectVisible': true });
    }
  }

  componentDidMount() {
    setupSwirl(this.effectCanvasRef.current);
    FPSCounter.play();
    this.timer = setInterval(this.instrument, SAMPLING_INTERVAL);
  }

  componentWillUnmount() {
    FPSCounter.pause();
  }

  render() {
    const { effectVisible } = this.state;

    return (
      <header className={styles.header}>
        <section className={styles.hero}>
          <a href="/">
            <h1 className={styles.hero__title}><Logo /></h1>
          </a>
          <a href="/" className={styles['hero-button']} style={{ 'alignSelf': 'flex-end' }}>
            Hire Me
            <SunIcon className={styles['hero-button__icon']}/>
          </a>
        </section>
        <picture className={styles.header__cover}>
          <source srcSet="images/bg-header.webp" type="image/webp" />
          <source srcSet="images/bg-header.png" type="image/png" />
          <img src="images/bg-header.png" alt="" width="0" />
        </picture>
        <div
          ref={this.effectCanvasRef}
          className={styles.header__cover}
          style={{
            'opacity': effectVisible ? 1 : 0,
            'transition': 'opacity ease 1s',
          }} />
      </header>
    );
  }
}
