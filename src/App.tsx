import { useState, useEffect, useRef } from 'react'
import { Layout } from 'antd'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { HomeFooter } from './pages/HomeFooter'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { DemoPage } from './pages/DemoPage'
import { NewsPage } from './pages/NewsPage'
const { Header, Content, Footer } = Layout

function App() {

  const [menuExpanded, setMenuExpanded] = useState(false)
  const navRef = useRef<HTMLDivElement>(null);

  const handleMenuExpanded = () => setMenuExpanded(!menuExpanded)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuExpanded(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navRef]);

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

            <a className='navbar-brand' style={{marginLeft: 15}} href='/'>GRIDVIEW</a>

            <button
              className='navbar-toggler ml-auto'
              type='button'
              data-toggle='collapse' 
              ata-target='#navbarNav'
              onClick={handleMenuExpanded}
              style={{marginRight: 15}}>
              <span className='navbar-toggler-icon'></span>
            </button>

            <div className={`${menuExpanded ? '' : 'collapse'} navbar-collapse`}>
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <a className='nav-link' href='/'>Home</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/news'>News</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/about'>About</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/demo'>Waitlist</a>
                </li>
              </ul>
            </div>

          </nav>
          
        </div>

        <Content style={{backgroundColor: 'white'}}>

          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/news' element={<NewsPage />} />
            <Route path='/demo' element={<DemoPage />} />
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
