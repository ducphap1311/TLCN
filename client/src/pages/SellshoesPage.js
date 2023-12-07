import React from 'react'
import { Navbar } from '../components/Navbar'
import { SellShoes } from '../components/SellShoes'
import { Footer } from '../components/Footer'

export const SellShoesPage = () => {
    return (
        <>
            <Navbar />
            <SellShoes />
            <Footer />
        </>
    )
}
