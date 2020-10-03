import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
        <script type="text/javascript" src="https://documentcloud.adobe.com/view-sdk/main.js"></script>
      </Html>
    );
  }
}

// tslint:disable-next-line: no-default-export
export default CustomDocument;
