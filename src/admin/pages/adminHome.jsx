import React from 'react'
import Nav from '../../components/nav'
import Header from '../../components/mainHeader'
import Aside from '../../components/aside'
import './adminHome.css'
const AdminH = () => {
  return (
  <section className="admin-home">
    <Aside />
    <div className="main-body">
      <Nav />
      <Header />
    
    </div>
  </section>

  )
}

export default AdminH