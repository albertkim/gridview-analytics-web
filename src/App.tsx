import { useState } from 'react'
import { Layout, Menu, Button } from 'antd'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { HomeFooter } from './pages/HomeFooter'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { DemoPage } from './pages/DemoPage'
import { NewsPage } from './pages/NewsPage'
import { MenuOutlined } from '@ant-design/icons'
const { Header, Content, Footer } = Layout

function App() {

  const [expanded, setExpanded] = useState(false)

  const toggleMenu = () => {
    setExpanded(!expanded);
    console.log(expanded)
  };

  const menu = (
    <Menu mode='horizontal' theme='dark' style={{ display: 'flex', alignItems: 'center' }}>
      <Menu.Item key='home'>
        <Link to='/'>GRIDVIEW ANALYTICS</Link>
      </Menu.Item>
      <Menu.Item key='about'>
        <Link to='/about'>ABOUT</Link>
      </Menu.Item>
      <Menu.Item key='news'>
        <Link to='/news'>NEWS</Link>
      </Menu.Item>
      <Menu.Item key='demo'>
        <Link to='/demo'>WAITLIST</Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <BrowserRouter>
      <Layout>

        <Header style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center'
        }}>

          <div className='menu-large'>
            {menu}
          </div>
          <div className={`menu-small ${expanded ? 'visible' : ''}`}>
            {menu}
          </div>

          <Button className='hamburger-button' onClick={toggleMenu} icon={<MenuOutlined />} />
          
        </Header>
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
