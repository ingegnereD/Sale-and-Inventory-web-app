import React from 'react'
import { useState } from 'react'
import { parsePath } from 'react-router-dom'
import {asideLinks} from '../dataArray'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosListBox, IoMdAdd } from 'react-icons/io'
import { MdInventory2, MdOutlineInventory, MdOutlineLocalGroceryStore } from 'react-icons/md'
import {TbPlaylistAdd, TbTruckDelivery} from 'react-icons/tb'


const Aside = () => {
    const navigate  = useNavigate()
    const [display, setDisplay] =  useState(false)
    const [inventoryDisplay, setIventoryDisplay] = useState(false)
    
    return (
    <aside style={{position: 'relative'}}>
        <section className="nav">
            <h2><span id='irg'>IRG</span> <span id="ent">Enterprise</span></h2>
        </section>
        <ul >
            {asideLinks.map((data, index)=>{
                return(
                    <AsideLink data={data} index={index} key={index} />
                )
            })}
        </ul>


    </aside>
    )
}

export default Aside

const AsideLink=({data})=>{
    const [asideLinkDrop, setAsideLinkDrop] = useState({sales: false, product: false})
    const {id, name, icon} = data
    const [hoverName, setHoverName] = useState(false)
    const navigate = useNavigate()

    function handleDisplay() {  
        if (data.id === 'adminDash') {
            return navigate('/dashboard')
        }
        if (data.id === 'userManage') {
            // return navigate('/')
        }
        if (data.id === 'customers') {
            return navigate('/customers')
        }

        if (data.id=== 'sales') {
            if (asideLinkDrop.sales) {
                setAsideLinkDrop({...asideLinkDrop, sales: false})
            }
            if (!asideLinkDrop.sales) {
                setAsideLinkDrop({...asideLinkDrop, sales: true})
            }
        }
        if (data.id=== 'product') {
            if (asideLinkDrop.product) {
                setAsideLinkDrop({...asideLinkDrop, product: false})
            }
            if (!asideLinkDrop.product) {
                setAsideLinkDrop({...asideLinkDrop, product: true})
            }
        }
    }
    
    function handleMouseEnter() {
        console.log('entered here');
        document.querySelector(`.${id}`).style.width = '17vw'
        setHoverName(true)
    }
    function handleMouseLeave() {
        console.log('left here');
    }
    return(
        <li className = {id} onClick={handleDisplay} onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <article className="top-list">
                <span id="icon dash-icon">{icon}</span>
                <h4>{name}</h4>
            </article>
            
            <article className="drop">
                {asideLinkDrop.sales && <SaleDropList />}       
                {asideLinkDrop.product && <ProductDropList />}
            </article>

        </li>
    )
}

const SaleDropList=({})=>{
    const navigate = useNavigate()
    return(
        <ul  className='aside-drop'>
            <li className='aside-drop-list' onClick={()=> {return navigate('/listsale')}}><span id="icon"><IoIosListBox /> </span> <h4>List Sales</h4></li>
            <li className='aside-drop-list'><span id="icon"><TbPlaylistAdd /> </span> <h4>Add Sales</h4></li>
            <li className='aside-drop-list' onClick={()=>{return navigate('/pos')}}> <span id="icon"><MdOutlineLocalGroceryStore /></span> <h4>Pos</h4> </li>
            <li className="aside-drop-list"><span id="icon"><MdOutlineInventory /></span>  <h4>Inventory</h4> </li>
        </ul>
    )
}

const ProductDropList = ({})=>{
    const navigate = useNavigate()

    return(
        <ul className="aside-drop">
            <li className='aside-drop-list' onClick={()=>{return navigate('/restock')}}><span id="icon"><TbTruckDelivery /></span><h4> Restock Product</h4></li>
            <li className='aside-drop-list'> <span id="icon"><MdInventory2 /></span><h4> View Product</h4></li>
            <li className='aside-drop-list' onClick={()=>{return navigate('/newproduct')}}>  <span id="icon"><TbPlaylistAdd /></span><h4> New Product</h4></li>
        </ul>
    )
}