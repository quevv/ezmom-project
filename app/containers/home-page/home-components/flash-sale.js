"use client"
import React from 'react'
import CustomSwiper from '@/components/CustomSwiper'
import { dumbDataMilk } from '@/data'

const FlashSale = ({data}) => {
  return (
    <CustomSwiper title="Sản Phẩm cho bé 0-1 tuổi" swiperData={data} drawerData={data}/>
  )
}

export default FlashSale
