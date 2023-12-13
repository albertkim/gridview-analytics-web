import { useState, useEffect, useRef } from 'react'
import { Layout, Image } from 'antd'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HomeFooter } from './pages/HomeFooter'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { PremiumPage } from './pages/PremiumPage'
import { AdminPage } from './pages/AdminPage'
import { MetroCityPage } from './pages/MetroNewsPage/MetroCityPage'
import { CityPage } from './pages/CityPage'
import { NewsPage } from './pages/NewsPage/NewsPage'
const { Content, Footer } = Layout

function App() {

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

  return (
    <BrowserRouter>
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
            style={{color: 'white'}}
            ref={navRef}>

            <a className='navbar-brand' style={{marginLeft: 15}} href='/'>
              <Image
                preview={false}
                src={`${process.env.PUBLIC_URL}/logo.png`}
                width={35}
                height={35}
                style={{marginBottom: 8}} />
              GRIDVIEW
            </a>

            <button
              className='navbar-toggler ml-auto'
              type='button'
              onClick={handleMenuExpanded}
              style={{marginRight: 15}}>
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

        <Content style={{backgroundColor: 'white'}}>

          <Routes>

            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/premium' element={<PremiumPage />} />
            <Route path='/admin' element={<AdminPage />} />

            {/* News URLs */}
            <Route path='/news/id/:newsId' element={<NewsPage />} />
            <Route path='/news/:metroCityParam' element={<MetroCityPage />} />
            <Route path='/news' element={<Navigate to='/news/metro_vancouver' replace />} />
            <Route path='/news/:metroCityShortCode/city/:cityParam' element={<CityPage />} />

            {/* 404 Route */}
            <Route path='*' element={
              <div className='container my-4'>
                404
              </div>
            } />

          </Routes>

        </Content>

        <Footer className='p-0 m-0'>

          <HomeFooter />

        </Footer>

      </Layout>
    </BrowserRouter>
  )

}

export default App
