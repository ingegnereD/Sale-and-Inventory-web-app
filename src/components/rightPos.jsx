import React, {useState, useEffect} from 'react'
import {MdAccessTime} from 'react-icons/md'
import {AiFillCaretDown,  AiFillCaretUp} from 'react-icons/ai'
import { TbCurrencyNaira } from 'react-icons/tb'


const RightPos = ({fetchedData, setFetchedData, setClickedProduct, clickedProduct, setShowSuggested, setText, test, setTest}) => {
  const [dropBrands, setDropBrands] = useState(false)

  function handleBrandsDrop() {
    if (dropBrands) {
      setDropBrands(false)
    }
    if (!dropBrands) {
      setDropBrands(true)
    }
  }
  return (
    <section className="right-header">
      <section className="nav">
        <div className="filter" onClick={handleBrandsDrop}><h4 >All Brands</h4> {!dropBrands ? <span id="icon"><AiFillCaretDown /></span> : <span id='icon'><AiFillCaretUp /></span> } </div>
      </section>
      <section className="product-img-area">
        
          {fetchedData.map((res, index)=>{
            return(
              <ProductCard key={index} data={res} ind={index} setClickedProduct={setClickedProduct} clickedProduct={clickedProduct} setShowSuggested={setShowSuggested} setText={setText} test={test} setTest={setTest}/>
              )
          })}
      </section>
      <section className="bottom">
        <button className="unClear-btn recent-sales">
          <span id="icon"><MdAccessTime  /></span> Recent Transactions
        </button>
      </section>
    </section>
  )
}

export default RightPos


const ProductCard = ({data, ind, setClickedProduct, clickedProduct, setText, setShowSuggested, test, setTest})=>{

  const {product, quantity, unitPrice} = data

  function handleCardInfo() {
    
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
                setShowSuggested(false)
                setText('')
                clickedProduct[ind].quantity += 1
                let total = clickedProduct[ind].quantity * Number(clickedProduct[ind].unitPrice.replace(/,/g,'')) 
                clickedProduct[ind].totPrice = total.toLocaleString()
                if (test) {
                  setTest(false)
                }
                if (!test) {
                  setTest(true)
                }
            }
            if (clickedProduct.at(ind).product !== data.product) {
                setClickedProduct([...clickedProduct,{product: data.product, quantity: 1, unitPrice: data.unitPrice, totPrice: data.unitPrice}])
                setShowSuggested(false)
                setText('')
            }
        }
  }
  return(
    <div className="cont">
      <article className="card product-card" onClick={handleCardInfo}>
        <section className="img" style={{background: 'white', backgroundPosition: 'center',backgroundSize:'cover', backgroundRepeat: 'no-repeat'}} ></section>
        <section className="info">
          <span className="product-name"><h5>{product}</h5></span>
          <section className="numbers">
            <h5>{quantity}</h5>
            <h5><span id="icon"><TbCurrencyNaira/></span>{unitPrice}</h5>
          </section>
        </section>
      </article>
    </div>
  )
}

// `url(${})`