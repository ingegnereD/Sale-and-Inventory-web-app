import React from 'react'
import { useState,useEffect } from 'react'
import {FaBars, FaMoneyBillAlt} from 'react-icons/fa'
import {BsFillMoonFill, BsFillSunFill, BsFillCalendarEventFill} from 'react-icons/bs'
import {MdDashboard} from 'react-icons/md'
import {BiCalculator} from 'react-icons/bi'
import {GoDiffAdded} from 'react-icons/go'
import { IoMdAdd } from 'react-icons/io'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'


const Nav = () => {
    const [userInfo, setUserInfo] = useState('')
    const [date, setDate] = useState({day:'', month:'', year:''})
    const [navBtn, setNavBtn] = useState({calc: false, pos: false, profit: false, add: false})
    const [theme, setTheme] = useState(true)
    const [custDrop, setCustDrop] =  useState(false)
    const [location, setLocation] = useState('Ore, Ondo State')
    const [showBiz, setShowBiz] = useState(false)

    useEffect(()=>{
        let fetchedDate = new Date()
        let day = fetchedDate.getUTCDate()
        let month = fetchedDate.getUTCMonth()
        let year = fetchedDate.getUTCFullYear()
        setDate({day: day, month:month, year: year})

        let info;
        if (localStorage.getItem('credentials') !== null) {
            info = JSON.parse(localStorage.getItem('credentials'))
            setUserInfo(info)
        }
        else if (localStorage.getItem('credentials') === null) {
            localStorage.setItem('credentials')
        }
    },[])

    function handleTheme() {
        if (theme) {
            setTheme(false)
        }
        if (!theme) {
            setTheme(true)
        }
    }

    function handleBizLoc() {
        if (custDrop) {
            setTimeout(() => {
                setShowBiz(false)
                setCustDrop(false)
            }, 100);
        }
        if (!custDrop) {
            setTimeout(() => {
                setShowBiz(true)
                setCustDrop(true)
            }, 100);
        }
    }

    function handleChange(e) {
        let name= e.target.name
        let value = e.target.value
        setLocation(value)

    }

    return (
    <nav>
        <section className="left">
            <span id="icon"><FaBars /></span>
            <button className="unClear-btn form-group location" onClick={handleBizLoc} type='button' >
                {location} <span id="care-icon">{custDrop ? <AiFillCaretUp /> : <AiFillCaretDown />}</span>
                    {showBiz && 
                <ul className="biz-location">
                    <li >
                        <label htmlFor="ore">Ore, Ondo State</label>
                        <input type="radio" name="location" id="ore" onChange={handleChange }  value={'Ore, Ondo State'} />
                    </li>
                    <li>
                        <label htmlFor="ife">Ile-Ife, Osun State</label>
                        <input type="radio" name="location" id="ife" onChange={handleChange} value={'Ile-Ife, Osun State'} />
                    </li>
                    <li>
                        <label htmlFor="enugu">Enugu State</label>
                        <input type="radio" name="location" id="enugu" onChange={handleChange} value={'Enugu State'} />
                    </li>

                </ul>}
            </button>
        </section>

        <section className="right">
            <div className="right-cont">
                <article className="other-link">
                    <button className="unClear-btn add-stock"><span><IoMdAdd/></span> Add {navBtn.pos && <p>Add Stock</p>} </button>
                    <button className="unClear-btn pos"><span><MdDashboard/></span> POS {navBtn.pos && <p>POS</p>} </button>
                    <button className="unClear-btn calc"><span><BiCalculator /></span> Calc {navBtn.calc && <p>Calculator</p>} </button>
                    <button className="unClear-btn profit"><span><FaMoneyBillAlt />{ navBtn.profit &&
                    <p>Profit</p>}</span>Prof. </button>
                </article>
                <article className="date">
                    <div className="date-info">
                        <h4>{date.day}/{date.month}/{date.year}</h4>
                        <span id="icon"><BsFillCalendarEventFill/> </span>
                    </div>
                </article>
                <article className="lighting" onClick={handleTheme}>
                    <span id='light-icon' className={theme? "light-mode" : "dark-mode" }><BsFillSunFill /></span>
                    <span id='dark-icon' className={theme? "dark-mode" : "light-mode"}><BsFillMoonFill /></span>
                </article>
                <article className="admin">
                    <h4>{userInfo.fullName}</h4>
                    <small>Admin</small>
                </article>
            </div>
        </section>
    </nav>
    )
}

export default Nav
