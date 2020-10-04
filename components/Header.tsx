
import { Component, RefObject, createRef } from 'react';
import { Logo } from './Logo';
import { SunIcon } from './icons/SunIcon';

import { FPSCounter, SwirlEffect } from '../utils';

import styles from './styles/Header.module.scss';

type State = {
  fpsCounter?: typeof FPSCounter
  effect?: SwirlEffect
  effectVisible: boolean
  measures: Array<number>
};

const NUM_SAMPLES = 15;
const SAMPLING_INTERVAL = 120;

export class Header extends Component<{}, State> {
  effectCanvasRef: RefObject<HTMLDivElement>;

  timer = 0;

  constructor(props: Readonly<{}>) {
    super(props);
    this.effectCanvasRef = createRef();
    this.state = {
      effect: undefined,
      effectVisible: false,
      fpsCounter: FPSCounter,
      measures: [],
    };
  }

  instrument = () => {
    const { effect, fpsCounter, measures } = this.state;

    if (measures.length < NUM_SAMPLES) {
      const measure = fpsCounter!.getFps();

      measures.push(measure);

      this.setState({ measures });
    } else {
      window.clearInterval(this.timer);

      const average = measures.reduce((a: number, b: number) => (a + b) / 2, 0);

      if (average > 50) {
        return this.setState({ 'effectVisible': true });
      }
      fpsCounter!.pause();
      effect!.destroy();
    }
  }

  componentDidMount() {
    const { fpsCounter } = this.state;
    if (this.effectCanvasRef.current) this.setState({ effect: new SwirlEffect(this.effectCanvasRef.current) });
    fpsCounter!.play();
    this.timer = window.setInterval(this.instrument, SAMPLING_INTERVAL);
  }

  componentWillUnmount() {
    const { effect, fpsCounter } = this.state;
    fpsCounter!.pause();
    effect!.destroy();
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
