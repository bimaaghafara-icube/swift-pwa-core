/* eslint-disable max-len */
/* eslint-disable react/no-danger */
import React from 'react';
import Document, { Html, Main } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '@theme_theme';
import { features } from '@config';
import HeadCustom from '@next_headcustom';
import NextScriptCustom from '@next_nextscriptcustom';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <HeadCustom>
                    {/* PWA primary color */}
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="apple-touch-icon" href="/assets/img/swiftpwa_apple_touch.png" />
                    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,500i,600,700,900&display=swap" rel="stylesheet" />
                    <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                    {features.customInstallApp.enabled ? <script src="/static/install.js" /> : ''}
                </HeadCustom>
                <body className="loading">
                    <Main />
                    <NextScriptCustom />
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};
