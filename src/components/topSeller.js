import React from 'react'
import { useState, useEffect } from 'react'
import { TbCurrencyNaira } from 'react-icons/tb'

const TopSelling = () => {
    const [lessAvailProd, setLessAvailProd] = useState([])
    const [topSellProd, setTopSellProd] = useState([])



    // function createArray(arr) {
    // // Create an empty object to store the counts of each element
    // const counts = {};

    // // Iterate through the input array and count the occurrences of each element
    // for (const element of arr) {
    //     counts[element] = (counts[element] || 0) + 1;
    // }

    // // Create a new array of dictionaries, each containing an element and its count
    // const result = [];
    // for (const element in counts) {
    //     result.push({ element: element, count: counts[element] });
    // }
    // // console.log('result is',result);
    // console.log( result.sort(function(a,b) {
    //     return b.count - a.count
    // }))
    
    // return result;

    // }


    function countDictOccur(array) {
        const result = [];
        for (let element of array) {
            let found = false;
            for (let item of result) {
            if (isEqual(element, item.dictionary)) {
                item.count++;
                found = true;
                break;
            }
            }
            if (!found) {
            result.push({dictionary: element, count: 1});
            }
        }
        // return result;
        let sortedResult = result.sort(function(a,b) {
            return b.count - a.count
        })
        console.log('returning ', sortedResult);
        setTopSellProd(sortedResult)
        }

        function isEqual(a, b) {
        // Get the keys for both objects
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);

        // Check that the objects have the same number of keys
        if (aKeys.length !== bKeys.length) {
            return false;
        }

        // Check that all keys and their corresponding values are equal
        for (let key of aKeys) {
            if (a[key] !== b[key]) {
            return false;
            }
        }
        return true;
    }


    useEffect(()=>{
        let shopDB;
        let warehouse;
        let offlineShopSales
        if (localStorage.getItem('shopDB') !== null) {
            shopDB = JSON.parse(localStorage.getItem('shopDB'))
            offlineShopSales = shopDB.offlineShop.offSaleInfo

            warehouse = shopDB.warehouse
            // storing the invoices in an array
            let invoiceBox = []
            
            offlineShopSales.forEach((res, ind) => {
                invoiceBox.push(res.invoice)
            });
            let product2 = [];
            invoiceBox.forEach((res, ind)=>{
                res.forEach((gen, indd)=>{
                    product2.push({product: gen.product, unitPrice: gen.unitPrice})
                })
            })

            countDictOccur(product2)

            let tempStore = []
            if (warehouse.length > 0) {
                warehouse.forEach((res, ind) => {
                    if (isNaN(res.quantity)) {
                        res.quantity = Number(res.quantity.replace(/,/g,''))
                    }
                    if (res.quantity < 50) {
                        tempStore.push(warehouse[ind])
                        console.log('yes', res.product);
                    }
                    if (res.quantity > 50) {
                        // console.log('greater');
                        tempStore.push(warehouse[ind])
                    }
                });
                // console.log('.............', tempStore);
                setLessAvailProd(tempStore)
            }
            else{
                setLessAvailProd([{product: 'Emperor 25 lit', unitPrice: '30,500', quantity: '25'},{product: 'Emperor 5 lit', unitPrice: '22,500', quantity: '35'}, {product: 'Emperor 2.5 lit', unitPrice: '18,500', quantity: '45'}])
            }
        }
        else if (localStorage.getItem('shopDB') === null) {
            setLessAvailProd([{product: 'Emperor 25 lit', unitPrice: '30,500', quantity: '25'},{product: 'Emperor 5 lit', unitPrice: '22,500', quantity: '35'}, {product: 'Emperor 2.5 lit', unitPrice: '18,500', quantity: '45'}])
        }
    },[])

    return (
    <section className="top-selling">
        <div className="nav">
            <h2>Top Selling Products</h2>
        </div>
        <section className="cont">
            {topSellProd.map((data, index)=>{
                const {dictionary, count} = data;
                return(
                    <div className="goods" key={index} style={{height: '2.5rem'}} {...data}>
                        <span className="product-name"><h4>{dictionary.product}</h4></span>
                        <span className="product-price"><span id="icon"><TbCurrencyNaira/></span><h4>{dictionary.unitPrice}</h4></span>
                        <span className="product-qty"><h4>{count}</h4></span>
                    </div>
                )
            })}
        </section>
    </section>
    )
}

export default TopSelling