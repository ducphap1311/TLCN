import React from 'react'
import { Navbar } from '../components/Navbar'
import { AllOrders } from '../components/AllOrders'
import { AllContact } from '../components/AllContact'

export const AllContactPage = () => {
  return (
    <div>
      <Navbar />
      <AllContact />
    </div>
  )
}
