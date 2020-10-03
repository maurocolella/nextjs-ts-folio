import Head     from 'next/head';
import React, { Component, ReactNode } from 'react';

type Props = {
  children?: ReactNode
  title?: string
};

export class Layout extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { title, children } = this.props;

    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <main>
          {children}
        </main>
      </div>
    );
  }
}
