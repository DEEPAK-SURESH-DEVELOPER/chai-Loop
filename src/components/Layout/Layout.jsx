
import React from 'react'
import Header from '../Header/Header'
import Home from '../../pages/Home/Home'
import ChaiPoster from '../../pages/ChaiPoster/ChaiPoster'
import Menu from '../../pages/Menu/Menu'
import About from '../../pages/About/About'
import Gallery from '../../pages/Gallery/Gallery'
import Visit from '../../pages/Visit/Visit'
import Footer from '../Footer/Footer'

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Home />
        <ChaiPoster />
        <Menu />
        <About />
        <Gallery />
        <Visit />
      </main>
      <Footer />
    </>
  )
}

export default Layout