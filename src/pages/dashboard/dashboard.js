import React from 'react'
import { useState, useEffect } from 'react'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { BsDashCircleFill, BsFillFilterSquareFill } from 'react-icons/bs'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { MdClose, MdNoteAlt } from 'react-icons/md'
import { RiShoppingCart2Line } from 'react-icons/ri'
import { TbCurrencyNaira } from 'react-icons/tb'
import Aside from '../../components/aside'
import Nav from '../../components/nav'
import ResentSale from '../../components/resentSale'
import TopSelling from '../../components/topSeller'
import './dash.css'
// import '../../index.css'
const DashBoard = () => {
    const [presentDay, setPresentDay] = useState('')
    const [presentDate, setPresentDate] = useState('')
    const [userName, setUserName] = useState('')
    const [location, setLocation] = useState('Select Location')
    const [showBizLoc, setShowBizLoc] = useState(false)
    const [filteredDate, setFilteredDate] = useState('Filter by date')
    const [dateFilter, setDateFilter] = useState(false)
    const [storeDate, setStoreDate] = useState('')
    const [filterCaret, setFilterCaret] = useState(false)
    const [totPurchaseValue, setTotPurchaseValue] = useState({purchase: 0, sale: 0, expensis: 0, creditDue: 0})


    useEffect(()=>{
        let date = new Date()
        let day = date.getDate()
        let month = Number(date.getUTCMonth()) + 1
        let year = date.getUTCFullYear()
        let newDate = day+'/'+month+'/'+year
        setPresentDay(day)
        setPresentDate(newDate)

        let shopDB = []
        let allLocation;
        if (localStorage.getItem('shopDB') !== null) {
            shopDB = JSON.parse(localStorage.getItem('shopDB'))
            allLocation = shopDB.allLocation
            let purchase = allLocation.purchase
            let sale = allLocation.sale
            let expenses =  allLocation.expensis
            let creditDue = allLocation.creditDue
            setTotPurchaseValue({...totPurchaseValue, purchase: purchase, sale: sale, expensis: expenses, creditDue: creditDue})
        }
        let credentials;
        let name;
        if (localStorage.getItem('credentials') !== null) {
            credentials = JSON.parse(localStorage.getItem('credentials'))
            name = credentials.fullName

        }
        else if (localStorage.getItem('credentials') !== null) {
            name = 'David'
        }
        setUserName(name)
    },[])

    function handleShowBizLoc() {
        if (showBizLoc) {
            setShowBizLoc(false)
        }
        if (!showBizLoc) {
            setShowBizLoc(true)
        }
    }

    function handleFilter(e) {
        let value = e.target.value
        setLocation(value)
    }

    function handleDateFilter() {
        if (dateFilter) {
        }
        if (!dateFilter) {
            setFilterCaret(true)
            setDateFilter(true)
        }
    }

    function handleSetDay(e) {
        let id = e.target.id
        if (id === 'today') {
            console.log('today\'s date is ', presentDay);
            setStoreDate('Today')
        }
        if (id === 'yesterday') {
            console.log('today\'s date is ', presentDay - 1);
            setStoreDate('Yesterday')
        }
        if (id === 'seven-days') {
            let ind = 7
            setStoreDate('Last 7 days')
            if (presentDay > 7 ) {
                for (let index = 1; index <= 7 ; index++) {
                    console.log('days', presentDay - index);
                }
            }
            else if (presentDay <= 7) {
                
            }
        }
        // setStoreDate('Last 7 days')
        if (id === 'one-month') {
            setStoreDate('Last 30 days')
        }
    }

    function handleDateChange(e) {
        setStoreDate(e.target.value.replace(/-/g,'/'))
    }

    function handleApplyDate() {
        if (dateFilter) {
            setDateFilter(false)
        }
        setFilteredDate(storeDate)
        if (filterCaret) {
            setFilterCaret(false)
        }
    }
    
    return (
    <section className="admin-home">
        <Aside />
        <section className="main-body">
            <Nav />
            <head>
                <section className="top-header">
                    <section className="upper">
                        <span className="welcome-msg"><h2>Welcome {userName}</h2></span>
                        <section className="right">
                            <button className="unClear-btn form-group location filter" onClick={handleShowBizLoc} type='button' > <span id='icon'><BsFillFilterSquareFill/></span>
                                    {location} <span id="icon">{showBizLoc ? <AiFillCaretUp /> : <AiFillCaretDown />}</span>
                                    {showBizLoc && 
                                    <ul className="option">
                                        <li >
                                            <label htmlFor="ore">Ore, Ondo State</label>
                                            <input type="radio" name="location" id="ore" onChange={handleFilter }  value={'Ore, Ondo State'} />
                                        </li>
                                        <li>
                                            <label htmlFor="ife">Ile-Ife, Osun State</label>
                                            <input type="radio" name="location" id="ife" onChange={handleFilter} value={'Ile-Ife, Osun State'} />
                                        </li>
                                        <li>
                                            <label htmlFor="enugu">Enugu State</label>
                                            <input type="radio" name="location" id="enugu" onChange={handleFilter} value={'Enugu State'} />
                                        </li>
                                </ul>}
                            </button>
                                

                            <button className="unClear-btn filter date-filter" onClick={handleDateFilter}>
                                <span id='icon'><BsFillFilterSquareFill/></span>
                                {filteredDate}
                                <span id='caret'> {filterCaret ?<AiFillCaretUp />:<AiFillCaretDown />}</span>
                                {dateFilter && <ul  className="option" onClick={handleSetDay}>
                                    <li id="today" >Today</li>
                                    <li id="yesterday" >YesterDay</li>
                                    <li id="seven-days" >Last 7 days</li>
                                    <li id="one-month" >Last 30 days</li>
                                    <input type="date" name="date" id="date" onChange={handleDateChange} />
                                    <li className='apply-li'>
                                        <button className="unClear-btn close-filter" onClick={handleApplyDate}>close <span id="icon"><MdClose /></span> </button>
                                        <button className="unClear-btn apply" onClick={handleApplyDate}>Apply</button>
                                    </li>
                                </ul>}
                            </button>
                        </section>
                    </section>
                    
                    <section className="lower">
                        <article className="purchase card" >
                            <span id='big-icon'><span className='primary-color'><FaMoneyBillAlt /> </span>  </span>
                            <section className="info">
                                <h4>TOTAL PURCHASE</h4>
                                <h3>
                                    <span id="icon"><TbCurrencyNaira/></span>
                                    {totPurchaseValue.purchase}
                                </h3>
                            </section>
                        </article>

                        <article className="sale card" >
                            <span id='big-icon'><span className='success-color'> <RiShoppingCart2Line /></span>  </span>
                            <section className="info">
                                <h4>TOTAL SALES</h4>
                                <h3>
                                    <span id="icon"><TbCurrencyNaira/></span>
                                    {totPurchaseValue.sale}
                                </h3>
                            </section>
                        </article>

                        <article className="credit card" >
                            <span id='big-icon' ><span className='warning-color'><MdNoteAlt /> </span> </span>
                            <section className="info">
                                <h4>CREDIT DUES</h4>
                                <h3>
                                    <span id="icon"><TbCurrencyNaira/></span>
                                    {totPurchaseValue.creditDue}
                                </h3>
                            </section>
                        </article>

                        <article className="expensis card" >
                            <span id='big-icon' ><span className='danger-color'><BsDashCircleFill />
                            </span> </span>
                            <section className="info">
                                <h4>TOTAL EXPENSIS</h4>
                                <h3>
                                    <span id="icon"><TbCurrencyNaira/></span>
                                    {totPurchaseValue.expensis}
                                </h3>
                            </section>
                        </article>
                    </section>
                </section>

                <section className="bottom-header">
                    <ResentSale saleLength={10}/>
                    <TopSelling />
                </section>
            </head>
        </section>

    </section>
    )
}

export default DashBoard