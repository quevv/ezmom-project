"use client"
import React from 'react'
import CustomSwiper from '@/components/CustomSwiper'
import { dumbDataMilk } from '@/data'

const FlashSale = () => {
  return (
    <CustomSwiper title="Flash Sale" swiperData={dumbDataMilk} drawerData={dumbDataMilk}/>
  )
}

export default FlashSale
