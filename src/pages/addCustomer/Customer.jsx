import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import Aside from '../../components/aside'
import Nav from '../../components/nav'
import './customer.css'

const Customer = () => {
    const [custInfo, setCustInfo]= useState({name: '',phone: '', address: '', location: 'Choose Location' })
    const [custDrop, setCustDrop] = useState(false)
    const [showLocations, setShowLocations] = useState(false)
    const [showBizLoc, setShowBizLoc] = useState(false)
    const [filterLocation, setFilterLocation] = useState('All Location')
    const [locCaretDrop, setLocCaretDrop] = useState(false)
    const [fetchedCust, setFetchedCust] = useState([])
    const [fetchedCust2, setFetchedCust2]= useState([])
    const [clickedIndex, setClickedIndex]= useState('')
    const [showBiz, setShowBiz] = useState(false)
    const [runState, setRunState] =  useState(true)
    const [filteringText, setFilteringText] = useState('')

    useEffect(()=>{
        let users;
        let customer = [];        
        if (localStorage.getItem('users') === null) {
            users =  {staff: {admin:{name: 'Iroegbu David',phone:'0704907610', address: '5, Ifewara Rd. Ile-Ife' },nonAdmin: []},
                    customers: [] } 
            localStorage.setItem('users', JSON.stringify(users))
        }
        if (localStorage.getItem('users') !== null) {
            users = JSON.parse(localStorage.getItem('users'))
            customer = users.customers; 
        } 
        setFetchedCust(customer)
        setFetchedCust2(customer)
        localStorage.setItem('users', JSON.stringify(users))
    },[])

    function handleChange(e) {
        let name= e.target.name
        let value = e.target.value
        setCustInfo({...custInfo, [name]: value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (custInfo.name && custInfo.phone && custInfo.location !== 'Choose Location' ) {
            setFetchedCust2([...fetchedCust2, custInfo]) 
            let users;
            let customer = []
            if (localStorage.getItem('users') !== null) {
                users = JSON.parse(localStorage.getItem('users'))
                customer = users.customers
            }
            customer.push(custInfo)
            localStorage.setItem('users', JSON.stringify(users))
            setCustInfo({name: '', phone: '', address: '', location: 'Choose Location'})
        }
        else{
            // highlight field
            console.log('complete field');
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

    function handleLocation() {
        if (showLocations) {
            setShowLocations(false)
            setLocCaretDrop(false)
        }
        if (!showLocations) {
            setShowLocations(true)
            setLocCaretDrop(true)
        }
    }
    function handleUpdate() {
        if (window.confirm('are you sure')) {
            fetchedCust2[clickedIndex] = custInfo;    
            let users;
            let customer = [] 
            if (localStorage.getItem('users') !== null) {
                users = JSON.parse(localStorage.getItem('users'))
                customer = users.customers
            }
            customer[clickedIndex] = custInfo;
            localStorage.setItem('users', JSON.stringify(users))
            setCustInfo({name: "", phone: '', address: '', location: 'Choose Location'})
        }
        if (runState) {
            setRunState(false)
        }
        if (!runState) {
            setRunState(true)
        }
    }
    function handleClear() {
        setCustInfo({name: "", phone: '', address: '', location: 'Choose Location'})
        if (runState) {
            setRunState(false)
        }
        if (!runState) {
            setRunState(true)
        }
    }
    function handleDelete() {
        if (window.confirm('are you sure')) {
            fetchedCust2.splice(clickedIndex, 1)

            let users;
            let customer = [] 
            if (localStorage.getItem('users') !== null) {
                users = JSON.parse(localStorage.getItem('users'))
                customer = users.customers
            }
            customer.splice(clickedIndex, 1)
            localStorage.setItem('users', JSON.stringify(users))
            if (runState) {
                setRunState(false)
            }
            if (!runState) {
                setRunState(true)
            }
         setCustInfo({name: '', address: '', phone: '', location: 'Choose Location'})   
        }
    }
    function handleShowBizLoc() {
        setFetchedCust2(fetchedCust)
        setFilterLocation('All Location')
        if (showBizLoc) {
            setTimeout(() => {
                setShowBizLoc(false)
                
            }, 100);
        }
        if (!showBizLoc) {
            setTimeout(() => {
                
                setShowBizLoc(true)
            }, 100);
        }
    }

    function handleFilter(e) {
        let value = e.target.value
        setFilterLocation(e.target.value)
        
        let filteredLoc = []
        fetchedCust2.forEach((data, index)=>{
            if (data.location === value) {
                filteredLoc.push(data)
            }
            setFetchedCust2(filteredLoc)
        })

    }

    function handleFilterCust(e) {
        let value = e.target.value
        setFilteringText(value)

        let filteredCust = []
        fetchedCust2.forEach((data, index)=>{
            if (data.name.toLowerCase().includes(value.toLowerCase())) {
                filteredCust.push(data)

            }
        })
        setFetchedCust2(filteredCust)


        if (value === '' || value === ' ') {
            setFetchedCust2(fetchedCust)
        }

        if (runState) {
            setRunState(false)
        }
        if (!runState) {
            setRunState(true)
        }
    }
    return (
        <section className="admin-home customer-page">
            <Aside />
            <section className="main-body">
                <Nav />
                <header>
                    <section className="main-header form-area" style={{width: '35%'}}>
                        <form>
                            <div className="input-area">
                                <div className="form-group">
                                    <label htmlFor="name">Customer / Company Name</label>
                                    <input type="text" 
                                    placeholder='Enter Cutomer Name/Company....'
                                    name="name" 
                                    id="name"
                                    onChange={handleChange}
                                    value={custInfo.name}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Customer's / Company's Phone No.</label>
                                    <input type="text" 
                                    placeholder='Enter Cutomer Phone No.'
                                    name="phone" 
                                    id="phone"
                                    onChange={handleChange}
                                    value={custInfo.phone}
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="address">Customer / Company's Address</label>
                                    <input type="text" 
                                    placeholder='Enter Address.'
                                    name="address" 
                                    id="address"
                                    onChange={handleChange}
                                    value={custInfo.address}
                                    />
                                </div>
                                
                                <button className="unClear-btn form-group location" onClick={handleBizLoc} type='button' >
                                    {custInfo.location} <span id="care-icon">{custDrop ? <AiFillCaretUp /> : <AiFillCaretDown />}</span>
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
                            </div>

                            <div className="event-area">
                                <div className="cont">
                                    <button className="unClear-btn add-cust" type='submit' onClick={handleSubmit}>Add</button>
                                    <button className="unClear-btn add-cust" type='button' onClick={handleUpdate}>Update</button>
                                    <button className="unClear-btn add-cust" type='button' onClick={handleClear}>Clear</button>
                                    <button className="unClear-btn add-cust" type='button' onClick={handleDelete}>Delete</button>
                                </div>
                            </div>
                        </form>
                    </section>

                    <section className="customers-area" style={{width: '65%'}}>
                        <section className="top">
                            <div className="form-group filter-group">
                                <input type="text" name="filter" id="filter" placeholder='Search For Customer'
                                onChange={handleFilterCust} value={filteringText} />
                            </div>
                            <div className='date-filter'></div> 
                            {/* the above div is meant for spacing... */}
                            <button className="unClear-btn form-group location" onClick={handleShowBizLoc} type='button' >
                                    {filterLocation} <span id="care-icon">{showBizLoc ? <AiFillCaretUp /> : <AiFillCaretDown />}</span>
                                     {showBizLoc && 
                                    <ul className="biz-location">
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
                        </section>
                        <section className="customer-list table-holder">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Contact</th>
                                        <th>Address</th>
                                        <th>Buz. Location</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {fetchedCust2.map((data, index) => {
                                        const {name, phone, address, location}= data

                                        return(
                                                <tr key={index}>
                                                    <td><ActionBtn data={data} custInfo={custInfo} setCustInfo={setCustInfo} ind = {index} setClickedIndex={setClickedIndex} /></td>
                                                    <td>{name}</td>
                                                    <td>{phone}</td>
                                                    <td>{address}</td>
                                                    <td>{location}</td>
                                                </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </section>
                    </section>
                </header>
            </section>
        </section>
    )
}

export default Customer


const ActionBtn =({data, custInfo, setCustInfo, ind, setClickedIndex})=>{
    const {name, phone, address, location} = data

    function handleAction() {
        setCustInfo({name: name, phone: phone, address: address, location: location})
        setClickedIndex(ind)
    }
    return(
        <button className="unClear-btn action" onClick={handleAction}>
            action
        </button>
    )
}