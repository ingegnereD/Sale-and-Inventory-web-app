import React, { useEffect, useState } from 'react'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { BsDashCircleFill, BsFillFilterSquareFill } from 'react-icons/bs'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { MdClose, MdNoteAlt } from 'react-icons/md'
import { RiShoppingCart2Line } from 'react-icons/ri'
import { TbCurrencyNaira } from 'react-icons/tb'

import Aside from '../../components/aside'
import Nav from '../../components/nav'
import ResentSale from '../../components/resentSale'
// import '../dashboard/dash.css'
import './listSale.css'

const ActionBox = ()=>{
    const [dropDown,  setDropDown] = useState(false)

    function handleEdit() {
        if (dropDown) {
        setDropDown(false)
        
        }
        else if(!dropDown){
            setDropDown(true)
        }
    }

    function closeDrop(){
        setDropDown(false)
    }
    
    return(
        <button className='unClear-btn' onBlur={closeDrop} onClick={handleEdit}>
            action 
            {!dropDown ? <span id='icon'><AiFillCaretDown /></span> :<span id='icon'><AiFillCaretUp /></span> }
            
            {dropDown && <ul >
                <li>Update Invoice</li>
                <li>Edit Invoice</li>
                <li>Invoice Info</li>
                <li>Print Receipt</li>
                <li>Delete Invoice</li>
            </ul> }
        </button>)
}


const ListSale = () => {
    const [presentDay, setPresentDay] = useState('')
    const [presentDate, setPresentDate] = useState('')    
    const [customer, setCustomer] = useState('All Customers')
    const [showCustList, setShowCustList] = useState(false)
    const [custName, setCustName] = useState('')
    const [custList, setCustList] = useState([])
    const [custList2, setCustList2] = useState([])
    const [location, setLocation] = useState('Select Location')
    const [showBizLoc, setShowBizLoc] = useState(false)
    const [filteredDate, setFilteredDate] = useState('Filter by date')
    const [dateFilter, setDateFilter] = useState(false)
    const [storeDate, setStoreDate] = useState('')
    const [filterCaret, setFilterCaret] = useState(false)
    const [input, setInput] = useState({stock: '', filtCustomer: '', filtSeller: ''})
    const [saleLength, setSaleLength] = useState()
    const [recentSale, setRecentSale] = useState([])
    const [seller, setSeller] =  useState([])
    
    useEffect(()=>{
        let date = new Date()
        let day = date.getDate()
        let month = Number(date.getUTCMonth()) + 1
        let year = date.getUTCFullYear()
        let newDate = day+'/'+month+'/'+year
        setPresentDay(day)
        setPresentDate(newDate)

        let users;
        let customers = []
        let shopDB;
        let count;

        if (localStorage.getItem('shopDB') !== null) {
            shopDB = JSON.parse(localStorage.getItem('shopDB'))
            count = shopDB.offlineShop.offSaleInfo
            setSaleLength(count.length)
            console.log('saleLength',count.length);
            setRecentSale(count)
            users = JSON.parse(localStorage.getItem('users'))
            customers = users.customers
            setCustList(customers)
            setCustList2(customers)
        }else {
            setCustList([{name: 'No customer 1'},{name: 'No customer 2'},{name: 'No customer 3'},])
        }
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
            setStoreDate('Last 30 dayss')
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
    
    function handleCust() {
        if (showCustList) {
            setShowCustList(false)
        }if (!showCustList) {
            setShowCustList(true)
        }
    }

    function handleFindCust(e) {
        let value = e.target.value
        setCustName(value)
    }

    function handleInputChange(e) {
        let name = e.target.name
        let value = e.target.value
        setInput({...input, [name]: value})
        console.log(name, value);
    }

    return (
        <section className="admin-home">
            <Aside />
            <div className="main-body">
                <Nav />
                <head>
                    <div className="top-header list-sale">
                        <section className="upper">
                            <div className="left"><h2>Sale Inventory</h2></div>
                            <div className="right"><h2>Filter Invoices</h2></div>
                        </section>                        
                        <section className="middle">
                            <button className="unClear-btn form-group filter" onClick={handleCust}>
                                <span id='icon'><BsFillFilterSquareFill/></span>
                                {customer}<span id="icon">{showCustList ? <AiFillCaretUp /> : <AiFillCaretDown />}</span>
                                {showCustList && <ul className="option">
                                    <li><input type="text" name="findCust" id="findCust"  onChange={handleFindCust} value={custName}/></li>
                                    {custList2.map((data,index)=>{
                                        const {name} = data
                                        return(
                                            <li key={index}>{name}</li>
                                        )
                                    })}
                                </ul>}
                            </button>

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
                                

                            <button className="unClear-btn form-group filter date-filter" onClick={handleDateFilter}>
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
                        <section className="lower">
                            <input type="text" name="filtCustomer" id="filtCustomer" placeholder='Find Customers Invoice by name' onChange={handleInputChange} value={input.filtCustomer}/>
                            <input type="text" name="stock" id="stock" placeholder='Find Invoice by product Id or amount' onChange={handleInputChange} value={input.stock}/>
                            <input type="text" name="filtSeller" id="filtSeller" placeholder='Find By Seller' onChange={handleInputChange} value={input.filtSeller} />
                        </section>
                    </div>
                    <div className="bottom-header">
                        {/* <ResentSale saleLength={saleLength}/> */}
                        <section className="card recent-sale" style={{width: '100%'}}>
                            <article className="nav">
                                <h2>All Sales</h2>
                            </article>
                            <section className="invoice table-holder">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Action</th>
                                            <th>Date</th>
                                            <th>Product Id</th>
                                            <th>Customer</th>
                                            <th>Pay. Mtd</th>
                                            <th>Total Amt.</th>
                                            <th>Total Paid</th>
                                            <th>Credit Due</th>
                                            <th>Pay. Status</th>
                                            <th>Added By</th>
                                            <th>Location</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentSale.map((data, index)=>{
                                            const {date, time,  id,invoice, location, payMtd, payStatus, seller, totAmount, totPaid, creditBal, customer,  }= data
                                            return(
                                                <tr key={index} {...data}>
                                                    <td><ActionBox /> </td>
                                                    <td>{date} {time}</td>
                                                    <td>{id}</td>
                                                    <td>{customer}</td>
                                                    <td>{payMtd}</td>
                                                    <td>{totAmount}</td>
                                                    <td>{totPaid}</td>
                                                    <td>{creditBal}</td>
                                                    <td>{payStatus}</td>
                                                    <td>{seller}</td>
                                                    <td>{location}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </section>
                        </section>
                    
                    </div>
                </head>
            </div>
        </section>
    )
}

export default ListSale