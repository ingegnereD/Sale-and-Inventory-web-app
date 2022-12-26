import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {TbCurrencyNaira} from 'react-icons/tb'
import {MdOutlineCancel} from 'react-icons/md'
import {IoMdCash} from 'react-icons/io'
import {AiFillCaretUp, AiFillCaretDown} from 'react-icons/ai'
import {BsPlusLg} from 'react-icons/bs'
import {RiSearchLine} from 'react-icons/ri'
import {BsPersonFill} from 'react-icons/bs'


const SaleHeader = ({fetchedData, setFetchedData, clickedProduct, setClickedProduct, text, setText, showSuggested, setShowSuggested, test, setTest , not, setNot}) => {

    const [seller, setSeller] = useState('')
    const [saleDetail, setSaleDetail] = useState({payMtd: '', payStatus: '', invoiceId: '', custContact: '', custName:'Walk-In Custmer', saleLocation: '', sellerName: seller, id: '' })
    const [filteredData, setFilteredData] = useState([])
    const [cartHolder, setCartHolder] = useState({product: '', quantity: 1, unitPrice: '', totPrice: ''})
    const [qtyValue, setQtyValue] = useState(1)
    const [gross, setGross] = useState(0)
    const [dateTime, setDateTime] = useState({date: '', time: ''})
    const [custText, setCustText] = useState('')
    const [custDrop, setCustDrop] = useState(false)
    const [customer, setCustomer] = useState('Walk-In Customer')
    const [custList, setCustList] = useState([])
    const [custList2, setCustList2] = useState([])
    // const [not, setNot] = useState(false)
    const [showCustInfo, setShowCustInfo] = useState([])

    useEffect(()=>{
        let d =new Date()
        let day = d.getDate()
        let month = d.getMonth() + 1
        let year = d.getFullYear()
        let hr = d.getHours()
        let min = d.getMinutes()

        let date = `${day}/${month}/${year}`
        let time = `${hr}:${min}`
        setDateTime({date: date, time: time})

        let users; 
        let customer = []
        if (localStorage.getItem('users') !== null) {
            users = JSON.parse(localStorage.getItem('users'))
            customer = users.customers
            setCustList(customer)
        }

        let cred;
        let named;
        if (localStorage.getItem('credentials') !== null) {
            cred = JSON.parse(localStorage.getItem('credentials'))
            named = cred.fullName
        }
        setSeller(named)

        let shopDB;
        let offlineShop;
        let offSaleInfo;
        let lastID;
        if (localStorage.getItem('shopDB') !== null) {
            shopDB= JSON.parse(localStorage.getItem('shopDB'))
            offlineShop = shopDB.offlineShop
            offSaleInfo = offlineShop.offSaleInfo
            if (offSaleInfo.length > 0 && isNaN(offSaleInfo.at(-1).id)) {
                lastID = offSaleInfo.at(-1 ).id
                setSaleDetail({...saleDetail, id: lastID})
            }
            if (offSaleInfo.length > 0 && isNaN(offSaleInfo.at(-1).id) === false) {
                lastID = offSaleInfo.at(-1 ).id
                setSaleDetail({...saleDetail, id: lastID})
            }

            else if (offSaleInfo === 0) {
                setSaleDetail({...saleDetail, id: 1001})
            }
        }
    },[gross])

    function handleChange(e) {
        setShowSuggested(true)
        let value = e.target.value
        setText(value)
        let typed = value.toLowerCase()
        let list = []
        fetchedData.forEach((res, index) => {
                let stored = res.product 
                let newStored = stored.toLowerCase()
                if (newStored.includes(typed)) {
                    list.push(res)
                }
                else{
                    // console.log('failure');
                }
            });
        if (value !== '' || value !== ' ' || value !== '  ') {
            setFilteredData(list)
        }
        if (value === '' || value === ' ' || value === '  '){
            setFilteredData([])
        }
    }

    function handleSale(value) {
        let shopDB;
        let allLocation
        let offlineShop
        if (localStorage.getItem('shopDB')!== null) {
            shopDB = JSON.parse(localStorage.getItem('shopDB'))
            allLocation = shopDB.allLocation.saleInfo
            offlineShop = shopDB.offlineShop.offSaleInfo
        }
        offlineShop.push({date: dateTime.date,time: dateTime.time, id: Number(saleDetail.id) + 1 , cutomer: saleDetail.custName, contact:saleDetail.custContact,location: saleDetail.saleLocation, payMtd: value, payStatus: 'paid', totAmount: gross, totPaid: gross, creditBal: 0, totItem: clickedProduct.length , seller: seller, invoice: clickedProduct})

        localStorage.setItem('shopDB', JSON.stringify(shopDB))
        handleStockSub(clickedProduct)
        setClickedProduct([])        

        setSaleDetail({payMtd: '', payStatus: '', invoiceId: '', custContact: '', custName:'Walk-In Custmer', saleLocation: '', sellerName: seller, id: '' })
        setGross(0)


    }

    function handleStockSub(clickedProduct) {
        let shopDB;
        let warehouse;
        if (localStorage.getItem('shopDB') !== null) {
            shopDB = JSON.parse(localStorage.getItem('shopDB'))
            warehouse = shopDB.warehouse
        }
        
        let fetchedStockInfo = []
        warehouse.forEach((data, ind)=>{
            if (isNaN(data.quantity)) {
                data.quantity = Number(data.quantity.replace(/,/g, ''))
            }
            fetchedStockInfo.push({product: data.product.replace(/ /g,'').toLowerCase(), quantity: data.quantity})
        })

        let soldStockInfo = []
        clickedProduct.forEach((data, ind)=>{
            soldStockInfo.push({product: data.product.replace(/ /g,'').toLowerCase(), quantity: data.quantity})
        })

        // comparing the two list and subtracting
        let newStockInfo = []
        soldStockInfo.forEach((data, ind)=>{
            fetchedStockInfo.forEach((res, index)=>{
                if (data.product === res.product) {
                    newStockInfo.push({product: res.product, quantity: res.quantity - data.quantity })
                }
            })
        })
        newStockInfo.forEach(data=>{
            warehouse.forEach((res)=>{
                if (res.product.replace(/ /g,'').toLowerCase() === data.product ) {
                    res.quantity = (data.quantity).toLocaleString()
                }
            })
        })
        localStorage.setItem('shopDB', JSON.stringify(shopDB))
        if (not) {
            setNot(false)
        }
        if (!not) {
            setNot(true)
        }
    }
    
    function handleCustChange(e) {
        let value = e.target.value
        setCustText(value)

        let filteredCust = []
        custList.forEach((data, index)=>{
            if (data.name.toLowerCase().includes(value.toLowerCase())) {
                filteredCust.push(data)
            }
        })
        
        setCustList2(filteredCust)
        if (filteredCust.length === 0) {
            setShowCustInfo(false)
        }
        if (filteredCust.length >  0) {
            setShowCustInfo(true)
        }
        
        if (value === '' || value === ' ') {
            setCustList2([])
            setShowCustInfo(false)
        }

        if (not) {
            setNot(false)
        }
        if (!not) {
            setNot(true)
        }
        
    }
    
    function handleCustDrop() {
        if (custDrop) {
            setCustDrop(false)
        }
        if (!custDrop) {
            setCustDrop(true)
        }
    }
    
    function handleCustList(e) {
        let value = e.target.textContent
        custList.forEach((data, index)=>{
            if (data.name === value) {
                setSaleDetail({...saleDetail, custName: value, custContact: data.phone,saleLocation: data.location,})

            }
        })
        if (not) {
            setNot(false)
        }
        if (!not) {
            setNot(true)
        }
        setCustDrop(false)
    }
    return (
        <section className="main-header">
            <section className="nav">
                <section className="cust-group">
                    <span className='customer' id="icon"><BsPersonFill /> </span>
                    <div className="title" onClick={handleCustDrop}>
                        <h4>{saleDetail.custName}</h4>
                        <span id="icon" className="caret">{custDrop ? <AiFillCaretUp /> : <AiFillCaretDown />}</span>
                    </div>
                    {custDrop && 
                    <form className='cust-form'>
                        {/* <span id="icon"></span> */}
                        <input type="text" 
                        placeholder='Find Customer by name....'
                        name="customer" 
                        id="customer"
                        onChange={handleCustChange}
                        value={custText}
                        />
                        <ul className="drop-cust-list">
                        {showCustInfo ?   
                            <>
                            {custList2.map((data, index)=>{
                                return(
                                <li key={index} onClick={handleCustList}>{data.name}</li>
                                )
                            })}</> :
                        <h5>Enter Text to search for customer / company name...</h5>  }
                        </ul>

                    </form>

                    }
                    <span className="add-customer" id="icon" style={{cursor: 'pointer'}}> <BsPlusLg /></span> 
                </section>

                <section className="product-group">
                    <form>
                        <span className="search lens" id="icon"><RiSearchLine /> </span>
                        <input type="text" 
                        name="sale" 
                        id="sale"
                        placeholder='Enter Porduct to sell....'
                        onChange={handleChange}
                        value={text} />
                        {showSuggested &&
                        <ul className='filtered-stock'>
                            {filteredData.map((data, index)=>{
                                const {product, quantity, unitPrice} = data
                                return(
                                    <SugestedProduct key={index} data={data} setText={setText} setShowSuggested={setShowSuggested} setClickedProduct={setClickedProduct} clickedProduct={clickedProduct}  cartHolder={cartHolder}  setCartHolder={setCartHolder} qtyValue = {qtyValue}/>
                                )
                            })}

                        </ul>
                        }
                        <span className="add-stock" id="icon"><BsPlusLg /></span>
                    </form>
                </section>
                
            </section>
            
            <section className="list-sell">
                <article className='sell-list-heading'>
                    <span className="product">Products</span>
                    <span className="qty">Quantity</span>
                    <span className="unit-price">Unit Price</span>
                    <span className="tot-price">Total Cost</span>
                    <span className="action"></span>
                </article>
                
                <section className="selling-list">
                    {clickedProduct.map((res, index)=>{
                        return(
                            <ShowSellingList key={index} index={index} res={res} clickedProduct={clickedProduct} setClickedProduct={setClickedProduct} qtyValue={qtyValue} setQtyValue={setQtyValue} setGross={setGross} showSuggested={showSuggested} test={test} setTest={setTest}/>
                        )
                    })}
                </section>
                <article className="total-sold">
                    <span className="name">Items: {clickedProduct.length}</span>
                    <span className="amount">Total: <span id="icon"><TbCurrencyNaira/></span>{gross}</span>
                </article>
            </section>

            <section className="payments">
                <section className="methods">
                    {/* <button className="draft unClear-btn">Draft</button> */}
                    <button className="cash  success-color" onClick={()=>handleSale('cash')}>Cash</button>
                    <button className="transfer money  primary-color" onClick={()=>handleSale('transfer')} >Transfer</button>
                    <button className="card money warning-color" onClick={()=>handleSale('card')}>Card</button>
                    <button className="multiple unClear-btn">Par. Payment</button>
                    <span className="payable">Total Payable <span id="icon"><TbCurrencyNaira/></span> {gross}</span>
                    <button className="cancel  danger-color" >Cancel</button>
                </section>
            </section>

        </section>

)
}

export default SaleHeader

const SugestedProduct = ({data, setShowSuggested, clickedProduct, setClickedProduct, setCartHolder, cartHolder, qtyValue, setText })=>{

    function handleDropListClick() {
        if (clickedProduct.length === 0) {
            setClickedProduct([...clickedProduct,{product: data.product, quantity: 1, unitPrice: data.unitPrice, totPrice: data.unitPrice}])
            setShowSuggested(false)
            setText('')
        }
        let ind;
        clickedProduct.forEach((a,i)=>{
            if(a.product === data.product){
                ind = i
            }
        })

        if (clickedProduct.length > 0) {
            if (clickedProduct.at(ind).product === data.product) {
                console.log('no');
                setShowSuggested(false)
                setText('')
                clickedProduct[ind].quantity += 1
                let total = clickedProduct[ind].quantity * Number(clickedProduct[ind].unitPrice.replace(/,/g,'')) 
                clickedProduct[ind].totPrice = total.toLocaleString()
            }
            if (clickedProduct.at(ind).product !== data.product) {
                // setCartHolder({...cartHolder, product: data.product,unitPrice: data.unitPrice })
                setClickedProduct([...clickedProduct,{product: data.product, quantity: 1, unitPrice: data.unitPrice, totPrice: data.unitPrice}])
                setShowSuggested(false)
                setText('')
            }
        }
    }
    return(
        <li className="carted-stock fitered-stock"  onClick={handleDropListClick}>
            <span className="name">{data.product}</span>
            <span className="quantity">{data.quantity}</span>
            <span className="price"><span id="sug-icon"><TbCurrencyNaira/></span>{data.unitPrice}</span>
        </li>
    )
}

const ShowSellingList = ({res,index, clickedProduct, setClickedProduct, qtyValue, setQtyValue, setGross, showSuggested, test, setTest})=>{
    const {product, quantity, unitPrice, totPrice} = res

    useEffect(()=>{
        let price = clickedProduct[index].unitPrice
        let qty = clickedProduct[index].quantity
        if (isNaN(price)) {
            price = Number(price.replace(/,/g,''))
        }
        let total =  price * qty
        clickedProduct[index].totPrice = Number(total).toLocaleString()
        setClickedProduct(clickedProduct)
        
        let totPriceList = []
        clickedProduct.forEach((a,i)=>{
            totPriceList.push(Number((a.totPrice).replace(/,/g,'')))
        })
        let grossT = totPriceList.reduce((a,b)=> a + b, 0)
        setGross(grossT.toLocaleString())
    },[clickedProduct, showSuggested, test])

    function handleQtyChange(e) {
        let value = e.target.value
        setQtyValue(value)
        clickedProduct[index].quantity = value
    }
    
    function handleAddQty(e) {
        e.preventDefault()
        clickedProduct[index].quantity += 1
        
        let price = Number(clickedProduct[index].unitPrice.replace(/,/g,''))
        let newTotPrice = clickedProduct[index].quantity * price
        clickedProduct[index].totPrice = newTotPrice.toLocaleString()
        if (test) {
            setTest(false)
        }
        if (!test) {
            setTest(true)
        }
    }

    function handleSubQty(e) {
        e.preventDefault()
        clickedProduct[index].quantity -= 1
        if (clickedProduct[index].quantity < 1 ) {
            clickedProduct[index].quantity = 1
        }
        let price = Number(clickedProduct[index].unitPrice.replace(/,/g,''))
        let newTotPrice = clickedProduct[index].quantity * price
        clickedProduct[index].totPrice = newTotPrice.toLocaleString()
        if (test) {
            setTest(false)
        }
        if (!test) {
            setTest(true)
        }
    }
    function handleRemove(e) {
        e.preventDefault()
        clickedProduct.splice(index, 1)
        if (test) {
            setTest(false)
        }
        if (!test) {
            setTest(true)
        }

    }
    return( 
        <div className="list">
            <span className="product-name">{product}</span>
            <article>
                <span className="unClear-btn remove-qty" onClick={handleSubQty}>-</span>
                <input type="number" name="quantity" id="quantity"
                onChange={handleQtyChange}
                value={quantity}
                />
                <span className="unClear-btn add-qty" onClick={handleAddQty}>+</span>
            </article>
            <span className="unit-price"><span id="icon"><TbCurrencyNaira/></span>{unitPrice}</span>
            <span className="tot-price"><span id="icon"><TbCurrencyNaira/></span>{totPrice}</span>
            <span className="remove" onClick={handleRemove}>x</span>
        </div>
    
    )
}