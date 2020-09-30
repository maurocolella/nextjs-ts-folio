import Document, { Html, Head, Main, NextScript } from 'next/document'

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
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
    )
  }
}

export default CustomDocument
