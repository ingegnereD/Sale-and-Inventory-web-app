import React from 'react'
import Nav from '../../components/nav'
import SaleHeader from '../../components/saleHeader'
import RightPos from '../../components/rightPos'
import '../pages/adminHome.css'
import './pos.css'
import { useState, useEffect } from 'react'
import Aside from '../../components/aside'


const Pos = ({}) => {
  const [clickedProduct, setClickedProduct] = useState([])
  const [fetchedData, setFetchedData] = useState([])
  const [text, setText] = useState('')
  const [showSuggested, setShowSuggested] = useState(false)
  const [test, setTest] = useState(false)
  const [not, setNot] = useState(false)



  useEffect(()=>{
        let shopDB
        let warehouse
        if (localStorage.getItem('shopDB') !== null) {
            shopDB = JSON.parse(localStorage.getItem('shopDB'))
            warehouse = shopDB.warehouse
        }
        else{
            console.log('No previously stored data');
        }
        setFetchedData(warehouse)
        hanldeTotSales()
    },[not])

    function hanldeTotSales() {
      let shopDB;
      let warehouse;
      let offlineShop;
      let allLocation;
      if (localStorage.getItem('shopDB') !== null) {
        shopDB = JSON.parse(localStorage.getItem('shopDB'))
        warehouse = shopDB.offlineShop.offSaleInfo
        offlineShop = shopDB.offlineShop
        allLocation = shopDB.allLocation
      }
      let priceCont = []
      warehouse.forEach((data, ind) => {
        if (isNaN(data.totAmount)) {
          data.totAmount = Number(data.totAmount.replace(/,/g,''))
        }
        priceCont.push(data.totAmount)
      });
      let grossPrice = priceCont.reduce((a,b)=> a+b,0)
      offlineShop.sale = grossPrice.toLocaleString()
      allLocation.sale = grossPrice.toLocaleString()

      localStorage.setItem('shopDB', JSON.stringify(shopDB))
    }

  return (
        <section className="admin-home pos-page">
          <Aside />
          <div className="main-body">
            <Nav />
            <header>
              <SaleHeader fetchedData={fetchedData} setFetchedData={setFetchedData} clickedProduct={clickedProduct} setClickedProduct={setClickedProduct} text={text} setText={setText} showSuggested={showSuggested} setShowSuggested={setShowSuggested} test={test} setTest={setTest} not={not} setNot={setNot} /> 
              
              <RightPos fetchedData={fetchedData} setFetchedData={setFetchedData} clickedProduct={clickedProduct} setClickedProduct={setClickedProduct} text={text} setText={setText} showSuggested={showSuggested} setShowSuggested={setShowSuggested} test={test} setTest={setTest} />
            </header>
          </div>
      </section>
    )
}

export default Pos