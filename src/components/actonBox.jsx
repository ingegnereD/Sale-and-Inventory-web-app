import React from 'react'
import { useState, useEffect } from 'react';



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

export default ActionBox