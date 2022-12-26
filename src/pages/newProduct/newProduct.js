import React from 'react'
import Aside from '../../components/aside'
import Nav from '../../components/nav'
import { useState } from 'react'
import {IoMdAdd, IoIosListBox} from 'react-icons/io'
import {MdClear} from 'react-icons/md'
import {AiFillCaretDown, AiFillCaretUp, AiOutlineMinusSquare} from 'react-icons/ai'
import { useEffect } from 'react'
import  {AiFillCloseCircle} from 'react-icons/ai'
import { TbCurrencyNaira } from 'react-icons/tb'



const NewProduct = () => {
    const [goodData, setGoodData] = useState({modDate:'',product: '', quantity: '', unitPrice: '', totPrice: ''})
    const [dropStockList, setDropStockList] = useState(true)
    const [stock, setStock] = useState([])
    const [stock2, setStock2] = useState([])
    const [shop, setShop] = useState([])
    const [display, setDisplay]  = useState(true)
    const [presentDate, setPresentDate] = useState('')
    const [filter, setFilter]= useState('')
    const [totalPrice, setTotalPrice] = useState(0)
    const [clickedIndex, setClickedIndex={setClickedIndex}] = useState(null)
    const [actionBtn, setActionBtn] = useState(true)
    const [filteringProduct, setFilteringProduct] = useState([])
    const [showFilteringDropDown, setShowFilteringDropDown] = useState(true)
    const [updateProduct, setUpdateProduct] = useState('')
    const [filterLocation, setFilterLocation] = useState('All Location')
    const [showBizLoc, setShowBizLoc] = useState(false)
    const [not, setNot] = useState(false)
    

    useEffect(()=>{
        let date = new Date()
        let day = date.getDate()
        let month = Number(date.getUTCMonth()) + 1
        let year = date.getUTCFullYear()
        let newDate = day+'/'+month+'/'+year
        
        let shopDB;
        let warehouse;
        setPresentDate(newDate)
        if (localStorage.getItem('shopDB') !== null) {
            shopDB= JSON.parse(localStorage.getItem('shopDB'))
            warehouse = shopDB.warehouse
        }
        setStock(warehouse)
        setStock2(warehouse)
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

    function handleChange(e) {
        let name = e.target.name
        let value = e.target.value
        setGoodData({...goodData, [name]: value})
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        let shopDB;
        let warehouse = []
        let count;
        if (localStorage.getItem('shopDB') !== 0) {
            shopDB = JSON.parse(localStorage.getItem('shopDB'))
            warehouse = shopDB.warehouse
        }

        let enteredProduct = goodData.product
        let entProd = enteredProduct.replace(/ /g, '').toLowerCase()

        console.log(warehouse.length);
        if (warehouse.length === 0 && goodData.product && goodData.quantity && goodData.unitPrice) {

            goodData.quantity = Number(goodData.quantity).toLocaleString()
            goodData.unitPrice = Number(goodData.unitPrice).toLocaleString()
            goodData.totPrice = (Number(goodData.quantity) * Number(goodData.unitPrice)).toLocaleString()
            goodData.modDate = presentDate
            setStock([...stock, goodData]) 
            handleNewStock(goodData)
            setGoodData({product:'',quantity:'',totPrice: '',unitPrice: ''})
            console.log(stock);
        }


        if (warehouse.length > 0 && goodData.product && goodData.quantity && goodData.unitPrice ) {
            
            // first we check to see if their is no previous occurance of the poduct
            let fish =  []
            warehouse.forEach((data, ind)=>{
                let warehouseProd  = data.product
                let fetchedProduct = warehouseProd.replace(/ /g,'').toLowerCase()
                fish.push(fetchedProduct)
            })

            let filter = fish.filter((data)=> data.includes(entProd))

            if (String(filter).includes(entProd) === true) {
                console.log('Do nothing', entProd, String(filter));
                setGoodData({product:'',quantity:'',totPrice: '',unitPrice: ''})
            }
            if (String(filter).includes(entProd) === false) {
                if (goodData.product && goodData.quantity && goodData.unitPrice ) {
                    goodData.totPrice = (Number(goodData.quantity) * Number(goodData.unitPrice)).toLocaleString()
                    goodData.quantity = Number(goodData.quantity).toLocaleString()
                    goodData.unitPrice = Number(goodData.unitPrice).toLocaleString()
                    goodData.modDate = presentDate
                    setStock([...stock, goodData]) 
                    handleNewStock(goodData)
                    setGoodData({product:'',quantity:'',totPrice: '',unitPrice: ''})
                    
                }else{
                    // highlight unfilled field
                }
            }
        }


    }

    function handleUpdate() {
        
    }
    function handleClear() {
        
    }
    function handleDelete() {
        
    }
    function handleFilter() {
        
    }
    function handleShowBizLoc() {
        
    }
    function handleFilterProd() {
        
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


    return (
    <section className="admin-home customer-page">
        <Aside />
        <div className="main-body">
            <Nav />
            <header>
                <section className="main-header form-area">
                    <form >
                        <div className="input-area">
                            <section className="product form-group">
                                <label htmlFor = "product" > Product </label> 
                                <input type = "text"
                                autoComplete='off'
                                name = "product"
                                id = "product"
                                placeholder = 'Enter Product Name...'
                                onChange = { handleChange }
                                value = { goodData.product }/>

                                {showFilteringDropDown && 
                                <ul className="filtered-stock">
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

                                <button className="unClear-btn clear-btn" onClick={handleClear}><span id="icon"><MdClear /> </span> Clear</button>
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
                        <div className='date-filter'></div> 
                            {/* the above div is meant for spacing... */}
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
        </div>
    </section>
  )
}

export default NewProduct



const ActionBox = (index, unitPrice, product, quantity, totPrice)=>{
    const [dropDown,  setDropDown] = useState(false)

    function handleEdit() {
        
    }

    return(
        <button className="unClear-btn" onClick={handleEdit}>
            action
        </button>
    )
}

const FilteredInput = ({ind,data,goodData, hideDropDown})=>{
    
    function handleFiltInput(e){
        goodData.product = e.target.textContent
        hideDropDown(false)
    }

    return(
        <li onClick={handleFiltInput} >{data}</li>
    )
}