import React, { Component, ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Noscript from './Noscript'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = class extends Component<Props, { jsActive: boolean }> {
  constructor(props: Props) {
    super(props)

    this.state = {
      jsActive: false,
    }
  }

  componentDidMount () {
    this.setState({
      jsActive: true,
    })
  }

  render() {
    const { title, children } = this.props
    const { jsActive } = this.state

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
            { jsActive ? <Link href="/resume"><a>Resume</a></Link> : null}
            <Noscript>
              <a
                href="Mauro Colella_Resume_2020.pdf"
                download="Mauro Colella_Resume_2020.pdf"
              >
              Resume
              </a>
            </Noscript>
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
