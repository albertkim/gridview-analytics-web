import React, { useState, useEffect, useRef } from 'react'
import { Layout, Image } from 'antd'
import { createTheme, MantineProvider } from '@mantine/core'
import Script from 'next/script'
import logoImage from '../public/logo.png'
import footerImage from '../public/city-blue-background.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css'
import '@mantine/core/styles.css'
import '@mantine/tiptap/styles.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export default function({ Component, pageProps }: AppProps) {

  const [menuExpanded, setMenuExpanded] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  const handleMenuExpanded = () => setMenuExpanded(!menuExpanded)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navRef])

  const router = useRouter()

  return (
    <>

      {/* Google Analytics in production only */}
      {
        (process.env.NODE_ENV === 'production') && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=G-J4VG9YGE6L`} 
              strategy="afterInteractive"
              async
            />
            <Script id='google-analytics' strategy='afterInteractive'>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
      
                gtag('config', 'G-J4VG9YGE6L');
              `}
            </Script>
          </>
        )
      }

      <Layout>

        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 99,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#001529'
        }}>

          <nav
            className='container navbar navbar-expand-md navbar-dark'
            style={{ color: 'white' }}
            ref={navRef}>

            <a className='navbar-brand' style={{ marginLeft: 15 }} href='/'>
              <Image
                preview={false}
                src={logoImage.src}
                width={35}
                height={35}
                style={{ marginBottom: 8 }} />
              GRIDVIEW
            </a>

            <button
              className='navbar-toggler ml-auto'
              type='button'
              onClick={handleMenuExpanded}
              style={{ marginRight: 15 }}>
              <span className='navbar-toggler-icon'></span>
            </button>

            <div className={`${menuExpanded ? '' : 'collapse'} navbar-collapse`}>
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <a className='nav-link' href='/news'>City news</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/premium'>Premium</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/about'>About</a>
                </li>
              </ul>
            </div>

          </nav>

        </div>

        <Layout.Content style={{ backgroundColor: 'white' }}>

          {/** Required for Mantine Tiptap component: https://mantine.dev/guides/next/ */}
          <MantineProvider theme={createTheme({})}>
            <Component {...pageProps} />
          </MantineProvider>

        </Layout.Content>

        {
          // Don't show the footer on select routes, namely anything with an interactable map
          (!['/rezonings/map'].includes(router.pathname)) && (

            <Layout.Footer className='p-0 m-0'>

              <div className='text-white dark-img' style={{
                backgroundImage: `url(${footerImage.src})`,
                backgroundPosition: 'center',
                paddingTop: 200,
                paddingBottom: 200
              }}>
                <div className='container'>
                  <div className='row'>
                    <div className='col-md-3'>
                      <p className='lead'>Company</p>
                      <div><a className='text-white' href='/'>Home</a></div>
                      <div><a className='text-white' href='/about'>About</a></div>
                    </div>
                    <div className='col-md-3'>
                      <p className='lead'>Products</p>
                      <div><a className='text-white' href='/news'>City news</a></div>
                      <div><a className='text-white' href='/premium'>Gridview Premium</a></div>
                    </div>
                    <div className='col-md-3'>
                      <p className='lead'>Contact</p>
                      <div className='text-white'>albert@gridviewanalytics.com</div>
                      <div>
                        <a  className='text-white' href='mailto:albert@gridviewanalytics.com'>[Email link]</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </Layout.Footer>

          )
        }

      </Layout>

    </>
  )
}
