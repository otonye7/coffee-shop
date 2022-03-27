import Document, { Html, Main, Head, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return <Html lang='en'>
            <Head>
                <link rel="preload" href="/fonts/IBMPlexSansThai-Bold.ttf" as="font" crossOrigin="anonymous"></link>
                <link rel="preload" href="/fonts/IBMPlexSansThai-Medium.ttf" as="font" crossOrigin="anonymous"></link>
                <link rel="preload" href="/fonts/IBMPlexSansThai-SemiBold.ttf" as="font" crossOrigin="anonymous"></link>
            </Head>
            <body>
                <Main></Main>
                <NextScript />
            </body>
        </Html>
    }
}

export default MyDocument