
import { Component, createRef } from 'react'
import Logo from './Logo'
import SunIcon from './icons/SunIcon'

import { setupSwirl } from '../utils/swirl'

import styles from './styles/Header.module.scss'

class Header extends Component {
  effectCanvasRef: any

  constructor(props: Readonly<{}>) {
    super(props)
    this.effectCanvasRef = createRef()
  }

  componentDidMount() {
    if (window) setupSwirl(this.effectCanvasRef.current)
  }

  render() {
    return (
      <header className={styles.header}>
        <section className={styles.hero}>
          <a href="/">
            <h1 className={styles.hero__title}><Logo /></h1>
          </a>
          <a href="/" className={styles['hero-button']} style={{ alignSelf: 'flex-end' }}>
            Hire Me
            <SunIcon className={styles['hero-button__icon']}/>
          </a>
        </section>
        <picture className={styles.header__cover}>
          <source srcSet="images/bg-header.webp" type="image/webp" />
          <source srcSet="images/bg-header.png" type="image/png" />
          <img src="images/bg-header.png" alt="" width="0" />
        </picture>
        <div ref={this.effectCanvasRef} className={styles.header__cover} />
      </header>
    )
  }
}

export { Header }
export default Header
