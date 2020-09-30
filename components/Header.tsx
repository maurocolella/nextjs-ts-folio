import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <h1>Mauro Colella</h1>
      <nav>
        <Link href="/">
          <a>About</a>
        </Link>{' '}
        |{' '}
        <Link href="/resume">
          <a>Resume</a>
        </Link>
      </nav>
    </header>
  )
}
