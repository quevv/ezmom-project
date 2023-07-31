import React from 'react'
import Banner1 from '@/public/images/banner/banner_02.jpg' 
import Image from 'next/image'

const Banner = () => {
  return (
    <div className='w-full flex justify-center'>
      <Image src={Banner1} alt="banner" />
    </div>
  )
}

export default Banner
