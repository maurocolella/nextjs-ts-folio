import styles from './styles/Header.module.scss'

import Logo from './Logo'
import SunIcon from './icons/SunIcon'

export default function Header() {
  return (
    <header className={styles.header}>
      <picture className={styles.header__cover}>
        <source srcSet="images/bg-header.webp" type="image/webp" />
        <source srcSet="images/bg-header.png" type="image/png" />
        <img src="images/bg-header.png" alt="" />
      </picture>
      <section className={styles.hero}>
        <a href="/">
          <h1 className={styles.hero__title}><Logo /></h1>
        </a>
        <a href="/" className={styles['hero-button']} style={{ alignSelf: 'flex-end' }}>
          Hire Me
          <SunIcon className={styles['hero-button__icon']}/>
        </a>
      </section>
    </header>
  )
}
