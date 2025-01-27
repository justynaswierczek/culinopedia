import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pl">
        <Head>
            <link rel="icon" href="/favicon.ico" />
          {/* Manifest PWA */}
          <link rel="manifest" href="/manifest.json" />
          
          {/* Ikony dla Apple */}
          <link rel="apple-touch-icon" href="/icon512_maskable.png" />

          {/* Kolor motywu dla przeglądarek mobilnych */}
          <meta name="theme-color" content="#000000" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;