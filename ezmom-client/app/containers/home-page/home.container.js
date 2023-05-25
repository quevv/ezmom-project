import Image from 'next/image'
import React from 'react'
import Banner1 from '../../../public/images/banner_01.svg' 

const HomePage = () => {
  return (
    <div className='h-[1000px] flex justify-center'>
        <Image src={Banner1} alt='banner'/>


    </div>
  )
}

export default HomePage