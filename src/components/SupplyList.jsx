import React from 'react'
import { useState, useEffect } from 'react'
import cust1 from '../components/img/customerImg/pic-1.png'
function Order() {
    const [dropDown,  setDropDown] = useState(false)

    function handleEdit() {
        if (dropDown) {
          // setDropDown(false)
        }
        else if(!dropDown){
            setDropDown(true)
    }
    }

    function closeDrop(){
        setDropDown(false)
        console.log('closing');
    }

    return(
        <section className="box">
            
        </section>
    )
}

const SupplyList = () => {

    useEffect(()=>{
        let stock;
        let credentials;
        if (localStorage.getItem('credentials') !== null) {
            credentials = JSON.parse(localStorage.getItem('credentials'))
            stock = JSON.parse(localStorage.getItem('stock'))
        }
    },[])

    return (
    <section className="update card">
        <article className="cont">
            <section className="customer">
                <span className="img">
                    <img src={cust1} alt="abcd" />
                </span>
                <section className="right">
                    <h4> <b>David Iroegbu</b> received order <button className='unClear-btn'>1234</button> </h4>
                    <small>10:45am</small>
                </section>
            </section>
            <section className="customer">
                <span className="img">
                    <img src={cust1} alt="abcd" />
                </span>
                <section className="right">
                    <h4> <b>David Iroegbu</b> received order <button className='unClear-btn'>1234</button> </h4>
                    <small>10:45am</small>
                </section>
            </section>
            <section className="customer">
                <span className="img">
                    <img src={cust1} alt="abcd" />
                </span>
                <section className="right">
                    <h4> <b>David Iroegbu</b> received order <button className='unClear-btn'>1234</button> </h4>
                    <small>10:45am</small>
                </section>
            </section>
            <section className="customer">
                <span className="img">
                    <img src={cust1} alt="abcd" />
                </span>
                <section className="right">
                    <h4> <b>David Iroegbu</b> received order <button className='unClear-btn'>1234</button> </h4>
                    <small>10:45am</small>
                </section>
            </section>
            <section className="customer">
                <span className="img">
                    <img src={cust1} alt="abcd" />
                </span>
                <section className="right">
                    <h4> <b>David Iroegbu</b> received order <button className='unClear-btn'>1234</button> </h4>
                    <small>10:45am</small>
                </section>
            </section>
            <section className="customer">
                <span className="img">
                    <img src={cust1} alt="abcd" />
                </span>
                <section className="right">
                    <h4> <b>David Iroegbu</b> received order <button className='unClear-btn'>1234</button> </h4>
                    <small>10:45am</small>
                </section>
            </section>
            <section className="customer">
                <span className="img">
                    <img src={cust1} alt="abcd" />
                </span>
                <section className="right">
                    <h4> <b>David Iroegbu</b> received order <button className='unClear-btn'>1234</button> </h4>
                    <small>10:45am</small>
                </section>
            </section>
            <section className="customer">
                <span className="img">
                    <img src={cust1} alt="abcd" />
                </span>
                <section className="right">
                    <h4> <b>David Iroegbu</b> received order <button className='unClear-btn'>1234</button> </h4>
                    <small>10:45am</small>
                </section>
            </section>
            <section className="customer">
                <span className="img">
                    <img src={cust1} alt="abcd" />
                </span>
                <section className="right">
                    <h4> <b>David Iroegbu</b> received order <button className='unClear-btn'>1234</button> </h4>
                    <small>10:45am</small>
                </section>
            </section>
            <section className="customer">
                <span className="img">
                    <img src={cust1} alt="abcd" />
                </span>
                <section className="right">
                    <h4> <b>David Iroegbu</b> received order <button className='unClear-btn'>1234</button> </h4>
                    <small>10:45am</small>
                </section>
            </section>
        </article>
    </section>
    )
}

export default SupplyList
