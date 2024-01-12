import React from 'react'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ColorSchemeScript } from '@mantine/core'
import type { DocumentContext } from 'next/document'

const MyDocument = () => (
  <Html lang='en'>
    <Head>
      {/** Required for Mantine Tiptap component: https://mantine.dev/guides/next/ */}
      <ColorSchemeScript defaultColorScheme='auto' />
      <script
        type='text/javascript'
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache()
  const originalRenderPage = ctx.renderPage
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      )
    })

  const initialProps = await Document.getInitialProps(ctx)
  const style = extractStyle(cache, true)
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    )
  }
}

export default MyDocument
