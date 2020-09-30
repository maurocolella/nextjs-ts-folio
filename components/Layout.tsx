import React, { Component, ReactNode } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

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
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </div>
    )
  }
}

export default Layout
