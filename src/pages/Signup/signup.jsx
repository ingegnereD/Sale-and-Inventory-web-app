import React from 'react'
import {  useNavigate, Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {FcGoogle} from 'react-icons/fc'
import Background from '../../components/img/bg1.jpg'
// import './tempWel.css'

const Signup = () => {
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '' })
    const [accessInfo, setAccessInfo] = useState([])

    function handleChange(e) {
        let name = e.target.name
        let value = e.target.value
        // console.log(name, value);
        setFormData({...formData, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (formData.fullName && formData.email && formData.password) {
            setAccessInfo([formData])
            setFormData({fullName: '', email:'', password:''})
        }
        else{
            // highlight field with warning
        }
    }

    function handleStoreInfo() {
        let credentials = {};
        if (localStorage.getItem('credentials') === null) {
            localStorage.setItem('credentials',JSON.stringify(credentials))
        }
        credentials = accessInfo[0]
        localStorage.setItem('credentials',JSON.stringify(credentials))
        console.log(accessInfo[0]);
        console.log('User created');
    }
    useEffect(() => {
        if (accessInfo.length !== 0) {
            handleStoreInfo()
        }
    }, [accessInfo])

    return (
        <section className="section background" style={{background: `url(${Background})`, backgroundPosition: 'center',backgroundSize:'cover', backgroundRepeat: 'no-repeat'}}>
            <div className="sign-door door card">
                <section className="top">
                    <h1>Franco Multipurpose</h1>
                    <h2>Welcome...</h2>
                    <h3>Create account to get started</h3>
                    <button className="btn google clear-btn">
                        <span id="icon"><FcGoogle /></span>
                        Sign Up with Google
                    </button>
                    <section className="option">
                        <span className="line"></span>
                        <small>or Sign up with Email</small>
                    </section>
                </section>

                <form className="access">
                    <section className = "fullName form-group" >
                        <label htmlFor = "fullName" > Full Name </label> 
                        <input type = "text"
                        name = "fullName"
                        id = "fullName"
                        placeholder = 'Full Name'
                        onChange = { handleChange }
                        value = { formData.fullName }/> 
                    </section>

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

                    <button className="unClear-btn" type='submit' onClick={handleSubmit}>
                        Sign Up
                    </button>
                    
                    <section className = "login form-link" >
                        <h4 > Already have an account <Link to={'/login'} style={{textDecoration: 'none'}}> <span> Login </span></Link> </h4>
                    </section>
                    
                </form>
            
            </div>
        </section>
    )
}

export default Signup
