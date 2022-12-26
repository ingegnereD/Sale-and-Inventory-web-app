import React from 'react'
import {MdCancelPresentation} from 'react-icons/md'
const Receipt = () => {
  return (
    <section className="over-box">
        <section className="top">
            <section className="left">
                <h3>Sell Details (Invoice ID : {id}) </h3>
            </section>
            <section className="right">
                <span id='small-icon'><MdCancelPresentation /> </span>
            </section>
        </section>
        <section className="info">
            <div className="column">
                <h4>Invoice ID: {}</h4>
                <h4>Payment Status: {}</h4>
                <h4>Paymet Method: {}</h4>
            </div>
            <div className="column">
                <h4>Customer Name: {fullName}</h4>
                <h4>Location: {}</h4>
            </div>
            <div className="column">
                <h4>Delivery Status: {}</h4>
            </div>
        </section>
        <section className="product">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Discount</th>
                        <th>Tax</th>
                        <th>Price Inc Tax</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{s/n}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                    </tr>
                </tbody>
            </table>
        </section>
        <section className="payment-info">
            <h3>Payment Info</h3>
            <table>
                <thead>
                    <tr>
                        <th></th>
                    </tr>
                </thead>
            </table>
        </section>
    </section>
  )
}

export default Receipt
