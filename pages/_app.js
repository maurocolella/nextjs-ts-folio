import App from 'next/app'
import { Header, Nav, Footer } from '../components'

import 'normalize.css/normalize.css'
import './global.scss'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Header />
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </>
    );
  }
}

export default MyApp;
