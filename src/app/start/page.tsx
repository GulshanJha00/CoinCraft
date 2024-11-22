
import Navbar from '@/components/Navbar'
import React from 'react'
import CryptoList from '../coins/markets/CryptoCardProps'

const page = () => {
  return (
    <div>
      <Navbar/>
      <CryptoList/>
    </div>
  )
}

export default page
