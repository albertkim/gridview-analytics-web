import { Layout } from 'antd'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { HomeFooter } from './pages/HomeFooter'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
const { Header, Content, Footer } = Layout

function App() {

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

          <div className='container'>
            <Link className='text-white' to='/' style={{marginRight: 30}}>Home</Link>
            <Link className='text-white' to='/about'>About</Link>
          </div>
          
        </Header>
        <Content style={{backgroundColor: 'white'}}>

            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
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
