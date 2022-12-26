import React from 'react'
import { useEffect, useState } from 'react'
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai'
import { TbCurrencyNaira} from 'react-icons/tb'
import { FaMoneyBillAlt } from 'react-icons/fa'
import {RiShoppingCart2Line} from 'react-icons/ri'
import {MdNoteAlt} from 'react-icons/md'
import { IoMdAdd } from 'react-icons/io'
import {BsFillFilterSquareFill,BsDashCircleFill} from 'react-icons/bs'
import { Account} from '../dataArray'
import NewAdded from './NewAdded'
import SupplyList from './SupplyList'
import RecentSale from './resentSale'

export const Accoun = [
    {icon: <FaMoneyBillAlt />, heading: 'purchase' },
    {icon: <RiShoppingCart2Line />, heading: 'sale',  },
    {icon: <MdNoteAlt />, heading: 'creditDue', },
    {icon: <BsDashCircleFill />, heading: 'expenses', },
]

const Header = () => {
    const [dropArrow, setDropArrow] = useState(false)
    const [filterCaret, setFilterCaret] = useState(false)
    const [shop, setShop] =  useState(false)
    const [location, setLocation] = useState({totLocation: '', onLine: '', offLine:''})
    const [activeLocation, setActiveLocation] = useState(location)
    const [dateOpt, setDateOpt] = useState(false)
    const [userInfo, setUserInfo]= useState('')
    const [addStock, setAddStock] = useState(false)
    const [totPurchase, setTotPurchase] = useState([])
    const [totPurchaseValue, setTotPurchaseValue] = useState({purchase: 0, sale: 0, expensis: 0, creditDue: 0})
    const [accountInfo, setAccountInfo] = useState({})


    useEffect(()=>{
        let credentials;
        let shopDB;
        let drawer = []
        if (localStorage.getItem('shopDB')!== null) {
            shopDB = JSON.parse(localStorage.getItem('shopDB'))
            setTotPurchaseValue({...totPurchaseValue, purchase: shopDB.allLocation.purchase, sale: shopDB.allLocation.sale, expensis: shopDB.allLocation.expensis, creditDue: shopDB.allLocation.creditDue })
        }
    },[])

    function handleShopDrops() {
        if (dropArrow ) {
            setDropArrow(false)
            setShop(false)
        }
        if (!dropArrow) {
            setDropArrow(true)
            setShop(true)
        }
    }
    function handleDayDrop(){
        if (dateOpt) {
            setDateOpt(false)
            setFilterCaret(false)
        }
        if (!dateOpt) {
            setDateOpt(true)
            setFilterCaret(true)
        }
    }

    function handleSetLocation(e) {
        let setting = e.target.id
        if (setting === 'all') {
            setActiveLocation(location.totLocation)
        }
        if (setting ==='on') {
            setActiveLocation(location.onLine)
        }
        if (setting === 'off'){
            setActiveLocation(location.offLine)
        }
    }

    function handleAddStock() {        
        if (addStock) {
            setAddStock(false)
        }
        if(!addStock){
            setAddStock(true)
        }

    }
    return (
    <header>
        <section className="main-header">
            <section className='head'>
                <section className="top">
                    <div className="welcome">
                        <h2>Welcome David</h2>
                    </div>
                    <section className="filtering">
                        <div className="shops" onClick={handleShopDrops}>
                                <h4>Select Location</h4> {dropArrow ? <span><AiFillCaretUp/></span> : <span><AiFillCaretDown /> </span> }
                                {shop && <ul onClick={handleSetLocation}>
                                    <li id='all'>Select Locatioin</li>
                                    <li id='on'>Online Shop</li>
                                    <li id='off'>Physical Shop</li>
                                </ul>}
                            </div>
                            <div className="filter-date" onClick={handleDayDrop}>
                                <span id='filter-icon'><BsFillFilterSquareFill/></span>  <h4>Filter by date</h4> {filterCaret ? <span id='caret'><AiFillCaretUp /></span> : <span  id='caret'><AiFillCaretDown /></span> }
                                {dateOpt && <ul className="date-option">
                                    <li>Today</li>
                                    <li>Yesterday</li>
                                    <li>Last 7 days</li>
                                    <li>Last 1 Month</li>
                                </ul>}
                            </div>
                        </section>
                </section>
                
                <section className="account">
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
            <section className="recent-sales">
                <RecentSale />
            </section>
        </section>
        {/* this section houses the right section of the custormer goos and the newly added products */}

        <section className="right-header">
            <SupplyList />
            <NewAdded />
            <section className="add-btn">
                <button className="unClear-btn add-stock" onClick={handleAddStock}>
                    <span><IoMdAdd /> Add Stock</span>
                </button>
            </section>
        </section>

        
    </header>
    )
}

export default Header
