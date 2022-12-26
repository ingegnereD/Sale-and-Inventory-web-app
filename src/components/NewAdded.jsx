import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {goods} from '../dataArray'

const NewAdded = () => {

    const [newStock, setNewStock] = useState([{product: 'Semo 1kg', quantity: 2, unitPrice: '21,250'}])


    useEffect(()=>{
        let shopDB; 
        let newS = []
        let warehouse;
        if (localStorage.getItem('shopDB') !== null) {
            shopDB=JSON.parse(localStorage.getItem('shopDB'))
            warehouse = shopDB.warehouse
            for (let index = -7; index < 0; index++) {
                newS.push(warehouse.at(index))            
            }
    
            setNewStock(newS)
        }else{
            setNewStock([...newStock,{product: 'Semo 1kg', quantity: 2, unitPrice: '21,250'}])
        }
        
    },[])
    return (
    <section className="new-stock">
        <div className="nav">
            <h2>New Stocks</h2>
        </div>
        <section className="cont">
            <table>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {newStock.map((data, index)=>{
                        const {product, unitPrice, quantity} = data
                        return(
                            <tr key={index}>

                                <td>{index + 1}</td>
                                <td>{product}</td>
                                <td>{unitPrice}</td>
                                <td>{quantity}</td>
                            </tr>
                        ) 
                    })} */}
                </tbody>
            </table>
        </section>
    </section>
  )
}

export default NewAdded