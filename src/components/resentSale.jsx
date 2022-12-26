import React from 'react'
import { useState, useEffect } from 'react'
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai'
import {table} from '../dataArray'
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

const ResentSale = ({saleLength}) => {
    const [recentSale, setRecentSale] = useState({all: [],ore: [], ife: [], enugu: []})
    const [selectedLocation, setSelectedLocation] = useState([])

    function handleRecentSale(list, nam) {
        let drum = []
        for (let index = 0; index > -saleLength; index--) {
            drum.push(list.at(index))
        }
        setRecentSale({...recentSale, [nam]: drum})
        setSelectedLocation(recentSale.ife)
    }
    useEffect(()=>{
        let shopDB;
        let allLocation;
        let oreLocation;
        let ifeLocation;
        if (localStorage.getItem('shopDB') !== null) {
            shopDB = JSON.parse(localStorage.getItem('shopDB'))
            allLocation = shopDB.allLocation.saleInfo
            oreLocation = shopDB.onlineShop.onSaleInfo
            ifeLocation = shopDB.offlineShop.offSaleInfo
            
            if (allLocation.length !== 0 && allLocation.length >= 10) {
                handleRecentSale(allLocation, 'all')
            }
            else if (allLocation.length < 10) {
                handleRecentSale(allLocation, 'all')
            }
            else if (allLocation.length === 0) {
                setRecentSale({...recentSale, all: []})
            }
            // 
            if (oreLocation.length !== 0 && oreLocation.length >= 10) {
                handleRecentSale(oreLocation, 'ore')
            }
            else if (oreLocation.length < 10) {
                handleRecentSale(oreLocation, 'ore')
            }
            else if (oreLocation.length === 0) {
                setRecentSale({...recentSale, ore: []})
            }
            // //
            if (ifeLocation.length !== 0 && ifeLocation.length >= 10) {
                handleRecentSale(ifeLocation, 'ife')
            }
            else if (ifeLocation.length < 10) {
                handleRecentSale(ifeLocation, 'ife')
            }
            else if (ifeLocation.length === 0) {
                setRecentSale({...recentSale, ife: []})
            }
            
        }
    },[])
    return (
    <section className="card recent-sale">
        <article className="nav">
            <h2>Recent Orders</h2>
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
                    {recentSale.ife.map((data, index)=>{
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
  )
}

export default ResentSale
