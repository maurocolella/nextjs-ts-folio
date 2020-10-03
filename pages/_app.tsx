import App from 'next/app';
import { Footer, Header, Navbar } from '../components';

import 'normalize.css/normalize.css';
import './global.scss';

if (typeof window !== 'undefined') {
  require('@webcomponents/shadydom');
}

export class Main extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Header />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </>
    );
  }
}

// tslint:disable-next-line: no-default-export
export default Main;
