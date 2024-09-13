import React from 'react'
import FormContainer from './FormContainer'
import "/src/App.css"
import HeaderNav from './HeaderNav';
import Footer from '../Footer';
export default function OrderForm({ setOrderData }) {
  return (
    <>
      <div id="order-form">
        <img src="Assets/Iteration-2-aseets/pictures/form-banner.png" alt="" />
        <HeaderNav />
        <FormContainer setOrderData={setOrderData }/>
        
      </div>
      <Footer/>
      </>
  )
}
