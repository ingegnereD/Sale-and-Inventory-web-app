import React from 'react'
import { useState } from 'react'
import {IoMdAdd, IoIosListBox} from 'react-icons/io'
import {MdClear} from 'react-icons/md'
import {AiFillCaretDown, AiFillCaretUp, AiOutlineMinusSquare} from 'react-icons/ai'
import { useEffect } from 'react'
import  {AiFillCloseCircle} from 'react-icons/ai'
import Aside from '../../components/aside'
import Nav from '../../components/nav'
import '../addCustomer/customer.css'
import { TbCurrencyNaira } from 'react-icons/tb'

const ReStock = () => {
    const [presentDay, setPresentDay] = useState('')
    const [presentDate, setPresentDate] = useState('')
    const [goodData, setGoodData] = useState({modDate: '',product: '', quantity: '', unitPrice: '', totPrice: ''})
    const [filter, setFilter]= useState('')
    const [totalPrice, setTotalPrice] = useState(0)
    const [dropStockList, setDropStockList] = useState(true)
    const [stock, setStock] = useState([])
    const [stock2, setStock2] = useState([])
    const [clickedIndex, setClickedIndex={setClickedIndex}] = useState(null)
    const [display, setDisplay]  = useState(true)
    const [actionBtn, setActionBtn] = useState(true)
    const [filteringProduct, setFilteringProduct] = useState([])
    const [showFilteringDropDown, setShowFilteringDropDown] = useState(true)
    const [updateProduct, setUpdateProduct] = useState('')
    const [filterLocation, setFilterLocation] = useState('All Location')
    const [showBizLoc, setShowBizLoc] = useState(false)
    const [dateFilter, setDateFilter] = useState(false)
    const [storeDate, setStoreDate] = useState('')
    const [filteredDate, setFilteredDate] = useState('Filter by date')

    const [not, setNot] = useState(false)



    useEffect(()=>{
        let date = new Date()
        let day = date.getDate()
        let month = Number(date.getUTCMonth()) + 1
        let year = date.getUTCFullYear()
        let newDate = day+'/'+month+'/'+year
        setPresentDay(day)
        setPresentDate(newDate)
        let list;
        if (localStorage.getItem('shopDB') !== null) {
            list = JSON.parse(localStorage.getItem('shopDB')).warehouse
            setStock(list)
            setStock2(list)
        }
    },[])

    function handleNewStock(data) {
        let shopDB;
        if (localStorage.getItem('shopDB') !== null) {
            shopDB = JSON.parse(localStorage.getItem('shopDB'))
            shopDB.warehouse.push(data)
        }
        else{
            // shit then
        }
        localStorage.setItem('shopDB', JSON.stringify(shopDB))
    }

    function handleKeyDown(e) {
        
    }
    
    function handleChange(e) {
        
        let data= stock
        let name = e.target.name
        let value = e.target.value.toLocaleString()
        setGoodData({...goodData, [name]:value.toLocaleString()})
        handleCalcTot()
        let val = goodData.product
        if (value !== '' || value !== ' ') {    
            setShowFilteringDropDown(true)
            let filtered= []
            data.forEach((a,i) => {
                if (name === 'product' && a.product.toLowerCase().includes(value.toLowerCase())) {
                    filtered.push(a.product)
                }
            });
            setFilteringProduct(filtered)
        }
        if (value === '' || value === ' ' || value.length === 0) {
            setFilteringProduct([])
            setShowFilteringDropDown(false)
        }
    }

    function handleCalcTot() {
        let qty = goodData.quantity
        let price= goodData.unitPrice
        if (qty === '') {
            qty = 0
        }
        if (price=== '') {
            price=0
        }
        if (isNaN(qty)) {
            qty = Number(qty.replace(/,/g,''))
        }
        if (isNaN(price)) {
            price = Number(price.replace(/,/g,''))
        }
        let total= (qty*price).toLocaleString()
        setTotalPrice(total)
        console.log('total is ',total);
        if (not) {
            setNot(false)
        }if (!not) {
            setNot(true)
        }
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        
        let enteredProduct = goodData.product
        let enteredQuantity = goodData.quantity
        let enteredUnitPrice = goodData.unitPrice

        if (enteredProduct && enteredQuantity && enteredUnitPrice) {
            
            stock.forEach((data, ind) => {
                let fetchedProduct;
                fetchedProduct = data.product.replace(/ /g,'').toLowerCase()
                if (fetchedProduct.includes(enteredProduct.replace(/ /g,'').toLowerCase())) {
                    let oldQuantity = data.quantity
                    if (isNaN(oldQuantity)) {
                        oldQuantity = Number(oldQuantity.replace(/,/g,''))
                    }
                    if (isNaN(enteredQuantity)) {
                        enteredQuantity = Number(enteredQuantity.replace(/,/g,''))
                        
                    }
                    if (isNaN(enteredUnitPrice)) {
                        enteredUnitPrice = Number(enteredUnitPrice.replace(/,/g,''))
                        
                    }
                    
                    let newQuantity = Number(oldQuantity) + Number(enteredQuantity)
                    let newTotPrice = Number(newQuantity) * Number(enteredUnitPrice)
                    stock.at(ind).modDate = presentDate
                    stock.at(ind).product = enteredProduct
                    stock.at(ind).quantity = newQuantity.toLocaleString()
                    stock.at(ind).unitPrice = Number(enteredUnitPrice).toLocaleString()
                    stock.at(ind).totPrice = newTotPrice.toLocaleString()
                    
                    let shopDB;
                    let warehouse
                    if (localStorage.getItem('shopDB') !== null) {
                        shopDB = JSON.parse(localStorage.getItem('shopDB'))
                        warehouse = shopDB.warehouse
                        
                        warehouse.at(ind).modDate = presentDate
                        warehouse.at(ind).product = enteredProduct
                        warehouse.at(ind).quantity = newQuantity.toLocaleString()
                        warehouse.at(ind).unitPrice = Number(enteredUnitPrice).toLocaleString()
                        warehouse.at(ind).totPrice = newTotPrice.toLocaleString()
                    }
                    localStorage.setItem('shopDB', JSON.stringify(shopDB))
                
                }
                else{
                    // console.log('Stock not avialable in the inventory');
                    // console.log('to add stock click here');
                }
            });
            setShowFilteringDropDown(false)
            setGoodData({modDate:'', product:'', quantity:'', totPrice: '', unitPrice: ''})

        }
        else{
            console.log('fill the form');
        }
    }
    function handleCheck() {
        if (display) {
            setDisplay(false)
        }
        if (!display){
            setDisplay(true)
        }
    }
    
    function handleStockList() {
        if (dropStockList) {
            setDropStockList(false)
            
        }
        if (!dropStockList) {
            setDropStockList(true)
        }
    }
    function handleBlurClose() {
        // setDisplay(false)
    }

    function handleFilter(e) {
        let value = e.target.value
        setFilterLocation(value)
        // the below funtion cannot work since their is no location object in the array
        // let filtLocation = stock2.filter((data)=> data.filter === value)
        // setStock2(filtLocation)
        if (value === 'All Locations') {
            setStock2(stock)
        }
    }
    function handleUpdate(e) {
        e.preventDefault()
        console.log('..........',goodData.product);
        if (goodData.product && goodData.quantity && goodData.unitPrice) {
            let updatedProduct = goodData.product    
            let enteredQuantity = goodData.quantity
            let enteredUnitPrice = goodData.unitPrice

            stock.forEach((data,ind) => {
                let fetchedProduct = data.product.replace(/ /g,'').toLowerCase()
                if (fetchedProduct.includes(updatedProduct.replace(/ /g,'').toLowerCase())) {

                    console.log('present');
                    if (isNaN(enteredQuantity)) {
                        enteredQuantity = Number(enteredQuantity.replace(/,/g,''))
                    }
                    if (isNaN(enteredUnitPrice)) {
                        enteredUnitPrice = Number(enteredUnitPrice.replace(/,/g,''))
                    }
                    let updatedTotPrice = enteredQuantity * enteredUnitPrice
                    stock.at(clickedIndex).modDate = presentDate
                    stock.at(clickedIndex).product = updateProduct
                    stock.at(clickedIndex).quantity = Number(enteredQuantity).toLocaleString()
                    stock.at(clickedIndex).unitPrice  = Number(enteredUnitPrice).toLocaleString()
                    stock.at(clickedIndex).totPrice = updatedTotPrice.toLocaleString()
                    
        
                    let shopDB;
        
                    if (localStorage.getItem('shopDB') !== null) {
                        shopDB = JSON.parse(localStorage.getItem('shopDB'))
                        let warehouse = shopDB.warehouse
                        warehouse.at(clickedIndex).modDate = presentDate
                        warehouse.at(clickedIndex).product = updatedProduct
                        warehouse.at(clickedIndex).quantity = Number(enteredQuantity).toLocaleString()
                        warehouse.at(clickedIndex).unitPrice  = Number(enteredUnitPrice).toLocaleString()
                        let totPrice = updatedTotPrice
                        warehouse.at(clickedIndex).totPrice = updatedTotPrice.toLocaleString()
                    }
                    localStorage.setItem('shopDB', JSON.stringify(shopDB))
                    setActionBtn(true)
                }
            });
            //.......

        }
        setShowFilteringDropDown(false)
        setGoodData({product:'', modDate: '', quantity: '',totPrice: '', unitPrice: ''})
        
        // '''
    }
    
    function handleDelete(e) {
        e.preventDefault()
        
        let newStock = stock
        newStock.splice(clickedIndex, 1)
        setStock(newStock)
        setStock2(newStock)
        let shopDB
        let warehouse
        if (localStorage.getItem('shopDB') !== null) {
            shopDB = JSON.parse(localStorage.getItem('shopDB'))
            warehouse= shopDB.warehouse
            // warehouse.splice(clickedIndex, 1)
        }
        // localStorage.setItem('shopDB', JSON.stringify(shopDB))
    }
    function handleBack(e) {
        e.preventDefault()
        setActionBtn(true)
        setGoodData({product:'', modDate: '', quantity: '',totPrice: '', unitPrice: ''})

    }

    function handleFilterProd(e) {
        let value = e.target.value.toLowerCase()
        setFilter(value)
        let filtered= stock2.filter((data)=> data.product.toLowerCase().includes(value))
        setStock2(filtered)
        if (value === '' ||value === ' ') {
            setStock2(stock)
        }
    }

    function handleShowBizLoc() {
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

    function handleDateFilter() {
        if (dateFilter) {
            setDateFilter(false)
        }if (!dateFilter) {
            setDateFilter(true)
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
    return (
    <section className="admin-home restock-page customer-page">
        <Aside />
        <section className="main-body">
            <Nav />
            <header>
                <section className="main-header form-area" style={{width: '35%'}}>
                    <form>
                        <div className="input-area">
                            <section className = "product form-group add-update-stock" >
                                <label htmlFor = "product" > Product </label> 
                                <input type = "text"
                                autoComplete='off'
                                name = "product"
                                id = "product"
                                placeholder = 'Enter Product Name...'
                                onChange = { handleChange }
                                onKeyDown = {handleKeyDown}
                                value = { goodData.product }/>

                                {showFilteringDropDown && 
                                <ul className="filtered-stock" style={{width: '100%'}}>
                                    {filteringProduct.map((data, ind)=>{
                                        return(
                                            <FilteredInput key={ind} goodData={goodData} hideDropDown={setShowFilteringDropDown} data={data} ind={ind}/>
                                        )
                                    })}
                                </ul>}
                            </section>

                            <section className = "quantity form-group" >
                                <label htmlFor = "quantity" > Quantity </label> 
                                <input type = 'text'
                                name = "quantity"
                                id = "quantity"
                                placeholder = '0'
                                onChange = { handleChange }
                                value = { (goodData.quantity).toLocaleString() }/> 
                            </section>

                            <section className = "unitPrice form-group" >
                                <label htmlFor = "unitPrice" > Unit Price </label> 
                                <input type = 'text'
                                name = "unitPrice"
                                id = "unitPrice"
                                placeholder = '0'
                                onChange = { handleChange }
                                value = { goodData.unitPrice.toLocaleString() }/> 
                            </section>
                            
                            <button className="unClear-btn totPrice" type='button' style={{display: 'flex', flexDirection: 'row', gap: '0rem', justifyContent: 'center', alignItems: 'center' }}>
                                <span id="icon"><TbCurrencyNaira/></span>
                                {totalPrice}
                            </button>
                        </div>
                        <div className="event-area">
                            <section className="cont `buttons`">
                                {actionBtn && <button className="unClear-btn clear-btn" type='submit' onClick={handleSubmit}><span id="icon"><IoMdAdd /> </span> Add</button>}

                                {!actionBtn && <button className="warning-color unClear-btn" id="update-btn" type='submit' onClick={handleUpdate}>Update</button>}

                                <button className="unClear-btn clear-btn" onClick={handleBack}><span id="icon"><MdClear /> </span> Clear</button>
                                    {!actionBtn && <button className="unClear-btn " id="delete-btn" type='button'  >Delete</button>}
                            </section>
                        </div>
                    </form>
                </section>

                <section className="customers-area product-area" style={{width: '65%'}}>
                    <section className="top">
                        <div className="form-group filter-group">
                                <input type="text" name="filter" id="filter" placeholder='Find product by name'
                                onChange={handleFilterProd} value={filter} />
                        </div>

                        <button className="unClear-btn date-filter ">
                            <h4  onClick={handleDateFilter}> {filteredDate}</h4>
                            {dateFilter && <ul  className="option" onClick={handleSetDay}>
                                <li id="today" >Today</li>
                                <li id="yesterday" >YesterDay</li>
                                <li id="seven-days" >Last 7 days</li>
                                <li id="one-month" >Last 30 days</li>
                                <input type="date" name="date" id="date" onChange={handleDateChange} />
                                <li>
                                    <button className="unClear-btn apply" onClick={handleApplyDate}>Apply</button>
                                </li>
                            </ul>}
                        </button>

                        <button className="unClear-btn form-group location" onClick={handleShowBizLoc} type='button' >
                            {filterLocation} <span id="care-icon">{showBizLoc ? <AiFillCaretUp /> : <AiFillCaretDown />}</span>
                                {showBizLoc && 
                            <ul className="biz-location">
                                <li >
                                    <label htmlFor="ore" style={{fontWeight: '400'}}>All Locations</label>
                                    <input type="radio" name="location" id="ore" onChange={handleFilter }  value={'All Locations'} />
                                </li>
                                <li >
                                    <label htmlFor="ore" style={{fontWeight: '400'}}>Ore, Ondo State</label>
                                    <input type="radio" name="location" id="ore" onChange={handleFilter }  value={'Ore, Ondo State'} />
                                </li>
                                <li>
                                    <label htmlFor="ife" style={{fontWeight: '400'}}>Ile-Ife, Osun State</label>
                                    <input type="radio" name="location" id="ife" onChange={handleFilter} value={'Ile-Ife, Osun State'} />
                                </li>
                                <li>
                                    <label htmlFor="enugu" style={{fontWeight: '400'}}>Enugu State</label>
                                    <input type="radio" name="location" id="enugu" onChange={handleFilter} value={'Enugu State'} />
                                </li>
                            </ul>}
                        </button>
                    </section>

                    <section className="restock-list customer-list table-holder" >
                        <table>
                            <thead>
                                <tr>
                                    <th style={{width: '7rem'}}>Actions</th>
                                    <th style={{width: '6rem'}}>Date Mod.</th>
                                    <th style={{width: '8rem'}}>Product</th>
                                    <th style={{width: '6rem'}}>Quantity</th>
                                    <th style={{width: '6rem'}}>Unit Price</th>
                                    <th style={{width: '6rem'}}>Total Price</th>
                                    <th style={{width: '7rem'}}>Location</th>
                                </tr>
                            </thead>
                            <tbody>                            
                                {stock2.map((data, index)=>{
                                    const {product, quantity, unitPrice, totPrice, modDate} = data

                                    return(
                                        <tr key={index}>
                                            <td><ActionBox index={index} product={data.product} quantity={data.quantity} unitPrice={data.unitPrice} goodData={goodData} setGoodData={setGoodData} setActionBtn={setActionBtn} setClickedIndex={setClickedIndex} stock={stock} setUpdateProduct={setUpdateProduct}/>  </td>
                                            <td>{modDate}</td>
                                            <td>{product}</td>
                                            <td>{quantity}</td>
                                            <td>{unitPrice}</td>
                                            <td>{totPrice}</td>
                                            <td></td>
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

export default ReStock


const FilteredInput = ({ind,data,goodData, hideDropDown})=>{
    
    function handleFiltInput(e){
        goodData.product = e.target.textContent
        hideDropDown(false)
    }

    return(
        <li onClick={handleFiltInput} style={{width: '100%'}}>{data}</li>
    )
}



const ActionBox = ({index, unitPrice, product, quantity, goodDatad, goodData, setGoodData, setActionBtn, setClickedIndex, stock, setUpdateProduct})=>{

    const [dropDown,  setDropDown] = useState(false)

    function handleEdit() {

        setGoodData({product: product, unitPrice: unitPrice, quantity: quantity })
        setUpdateProduct(product)
        setActionBtn(false)
        setClickedIndex(index)
        let shopDB;
        if (localStorage.getItem('shopDB') !== null) {
            shopDB = JSON.parse(localStorage.getItem('shopDB')).warehouse
        }else{
            console.log('You are on your own');
        }
    }

    return(
        <button className="unClear-btn" onClick={handleEdit}>
            action
        </button>
    )
}
