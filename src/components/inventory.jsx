import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useState, useEffect } from 'react'

const Inventory = () => {
    const [filterText, setFilterText] = useState('')
    const [inventory, setInventory] = useState([])
    const [filInventory, setFilInventory] = useState([])
    const [totalPrice, setTotalPrice] = useState('')
    const [display, setDisplay] = useState(true)
    const [showTotal, setShowTotal] = useState(true) 
    
    useEffect(()=>{
        let shopDB;
        let shop = [];
        let warehouse;
        let allLocation
        if (localStorage.getItem('shopDB') !== null) {
            shopDB = JSON.parse(localStorage.getItem('shopDB'))
            warehouse = shopDB.warehouse
            allLocation = shopDB.allLocation
            setInventory(warehouse)
            setFilInventory(warehouse)
            warehouse.forEach(a => {
                shop.push(Number(a.totPrice.replace(/,/g,'')))
            });
            let sum = shop.reduce((a,b) => a + b,0)
            shopDB.allLocation.purchase= sum.toLocaleString()
            setTotalPrice(sum.toLocaleString())
            localStorage.setItem('shopDB', JSON.stringify(shopDB))
        }


    },[ ])

    function handleCheck() {
        if (display) {
            setDisplay(false)
        }
        if (!display){
            setDisplay(true)
        }
    }

    function handleFilterText(e) {
        let fText = e.target.value
        setFilterText(fText)
        filInventory.forEach((a,i)=>{
            if (fText !== "" && a.product.toLowerCase().includes(fText.toLowerCase())) {
                let newS = filInventory.at(i)
                const filtered = filInventory.filter((inventory)=> inventory.product.toLowerCase().includes(fText.toLowerCase()))
                setFilInventory(filtered)
                setShowTotal(false)
            }
            if (fText === "" || fText === " ") {
                setFilInventory(inventory)
                setShowTotal(true)
            }
        })
    }

    return (
        <>
            {display && 
    <section className="add-stock-cont" >
        <div className="addition" style={{height: '95vh', marginTop: '2.5vh'}}>
            <div className="nav">
                <div className="title">
                    <h2>Warehouse Inventory</h2>
                </div>
                <span id="close-icon" onClick={handleCheck}>
                    <AiFillCloseCircle />
                </span>
            </div>

            <section className="invenroy-cont" style={{marginBottom: '.75rem'}}>
                <form>
                    <section className = "product form-group" > 
                        <input type = "text"
                        name = "filter"
                        id = "filter"
                        placeholder = 'Enter Product name to find...'
                        onChange = {handleFilterText  }
                        value = { filterText }/> 
                    </section>
                </form>
                <section className="table-holder inventory-table-holder" >
                    <table className='inventory-table' >
                        <thead>
                            <tr>
                                <th>Date Mod.</th>
                                <th>Stock</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filInventory.map((data, index)=>{
                                const {modDate, product, quantity, totPrice, unitPrice} = data
                                return(
                                    <tr key={index} className ={!showTotal ? 'active-table' : ''}>
                                        <td>{modDate}</td>
                                        <td>{product}</td>
                                        <td>{quantity}</td>
                                        <td>{unitPrice}</td>
                                        <td>{totPrice}</td>
                                    </tr>
                                )
                            })}

                            {showTotal && 
                            <tr>
                                <td style={{fontWeight: 'bold'}}>Totol</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td style={{fontWeight: 'bold'}}>{totalPrice}</td>
                            </tr>}
                        </tbody>
                    </table>
                </section>
            </section>
        </div>
    </section>
  }
        </>)
}

export default Inventory