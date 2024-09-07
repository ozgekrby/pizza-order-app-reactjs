import React from 'react'
import FormContainer from './FormContainer'
import "/src/App.css"
import HeaderNav from './HeaderNav';
export default function OrderForm() {
  return (
      <div id="order-form">
        <HeaderNav />
        <FormContainer/>
      </div>
  )
}
