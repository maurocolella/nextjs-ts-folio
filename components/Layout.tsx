import React, { Component, ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = class extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const { title, children } = this.props

    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <header>
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
        {children}
        <footer>
          <hr />
          <span>(Footer)</span>
        </footer>
      </div>
    )
  }
}

export default Layout
