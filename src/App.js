import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from '../src/pages/Signup/signup' 
import Login from '../src/pages/Login/login' 
import AdminH from './admin/pages/adminHome'
import Pos from './admin/pages/pos'
import Customer from './pages/addCustomer/Customer'
import ReStock from './pages/reStock/reStock'
import NewProduct from './pages/newProduct/newProduct'
import DashBoard from './pages/dashboard/dashboard'
import ListSale from './pages/listSale/listSale'
import './index.css'
import './admin/pages/adminHome.css'

const App = () => {
  
  return (
    <section className="container">
      <section className="container-bucket">
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<SignUp />}/>
          <Route path='login' element={<Login />} />
          <Route path='adminDash' element={<AdminH/>} /> 
          <Route path='pos' element={<Pos />} />
          <Route path='customers' element={<Customer/>} />
          <Route path='restock' element={<ReStock />}/>
          <Route path='newproduct' element={<NewProduct />}/>
          <Route path='dashboard' element={<DashBoard />}/>
          <Route path='listsale' element={<ListSale />}/>
        </Routes>
      </BrowserRouter>
      </section>
    </section>
  )
}

export default App
