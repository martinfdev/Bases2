import { Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import Sidebar from '../components/shared/Sidebar'
import Header from '../components/shared/Header'

const Layout = ({menuItems}) => {
   return (
    <div className="flex h-screen">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 flex flex-col">
       
          <Header />
       
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Outlet />
        </main>
        <footer className="w-full">
          {/* <Footer /> */}
        </footer>
      </div>
    </div>

  )
}

Layout.propTypes = {
  menuItems: PropTypes.array.isRequired
}
export default Layout