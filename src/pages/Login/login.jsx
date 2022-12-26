import React from 'react'
import Background from '../../components/img/bg1.jpg'
import AdminH from '../../admin/pages/adminHome'
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Login = () => {
  const [formData, setFormData] = useState({email:'',password:''})
  const [loginInfo, setLoginInfo] = useState([])

  const navigate = useNavigate()
  
    function handleChange(e) {
        let name = e.target.name
        let value = e.target.value
        setFormData({...formData, [name]: value })
    }

  function handleSubmit(e) {
    e.preventDefault()

    if (formData.email && formData.password) {
      if (formData.email === loginInfo.email && formData.password === loginInfo.password) {
        console.log('access granted') // then create a validation in the <ls></ls>

        //creating a storage for the works
        
        let shopDB;
        if (localStorage.getItem('shopDB') === null) {
          shopDB = {
            warehouse: [],
            allLocation: {
              saleInfo: [], purchase : 0.00, sale: 0.00, creditDue: 0.00, expensis: 0.00
            }, 
            onlineShop: {
              onSaleInfo: [], purchase : 0.00, sale: 0.00, creditDue: 0.00, expensis: 0.00
            }, 
            offlineShop: {
                  offSaleInfo: [], purchase : 0.00, sale: 0.00, creditDue: 0.00, expensis: 0.00
                } 
              }
            localStorage.setItem('shopDB',JSON.stringify(shopDB))
            } else if(localStorage.getItem('shopDB')!== null){
              console.log('......');
            }
            return navigate('/adminDash')

      }
      else{
        //highligh error under with Incorrect password or username
        console.log('incorrect credentials!');
        
      }
    }
  }

  function handleAccessVer() {
    let credentials = {}
    if (localStorage.getItem('credentials') === null) {
      localStorage.setItem('credentials', JSON.stringify(credentials))
    } else if (localStorage.getItem('credentials') !== null) {
      credentials = JSON.parse(localStorage.getItem('credentials'))
      setLoginInfo(credentials)
      console.log('data fetched');
    }
  }
    useEffect(()=>{
      if (formData.password.length >= 5) {
        handleAccessVer()
      }
  },[formData.password])

  return (
    <section className="section background" style={{background: `url(${Background})`, backgroundPosition: 'center',backgroundSize:'cover', backgroundRepeat: 'no-repeat'}}>
        <div className="login-door door card">
            <section className="top">
              <h1>Franco Multipurpose</h1>
              <h2>Welcome Back...</h2>
              
              <h3>Sign In</h3>
            </section>

            <section className="main">
              <form className="access login-access">
                <section className = "email form-group" >
                  <label htmlFor = "email" > Email </label> 
                  <input type = "email"
                  name = "email"
                  id = "email"
                  placeholder = 'mail@website.com'
                  onChange = { handleChange }
                  value = { formData.email }/> 
                </section>

                <section className = "password form-group" >
                  <label htmlFor = "password" > Password </label> 
                  <input type = "password"
                  name = "password"
                  id = "password"
                  placeholder = 'min 6 characters'
                  onChange = { handleChange }
                  value = { formData.password }/> 
                </section>

                <button className="unClear-btn" type='submit' onClick={handleSubmit}>Login</button>

                <section className="sign-in form-link">
                  <h4>Don't hanve an account? <Link to={'/'} style={{textDecoration: 'none'}} ><span>Sign Up</span></Link> </h4>
                </section>
              </form>
            </section>
        </div>
    </section>
  )
}

export default Login