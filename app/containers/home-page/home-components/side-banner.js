import React, { useState } from 'react'
import CateLogo from '../../../../public/images/category_logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import MilkPic from '../../../../public/images/milk.svg'
import FuncFoodPic from '../../../../public/images/func_food.svg'

const SideBanner = () => {
  const [fixed, setFixed] = useState(false)

  const handleScroll = () => {
    if (window.scrollY >= 500) {
      setFixed(true)
    } else setFixed(false)
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll)
  }

  return (
    <div className="flex mt-8">
      <div className="absolute left-24 text-pink-500 font-bold">
        <div className={fixed ? 'fixed top-[20%]' : ''}>
          <div className="rounded-lg bg-white p-2 flex flex-col items-center mb-3">
            <Image src={CateLogo} alt='logo'/>
            <p>Danh Mục</p>
          </div>
          <div className="rounded-lg bg-[#f8f8f8] px-2 py-4 flex flex-col items-center">
            <Link
              href="/#powered_milk"
              className="flex flex-col items-center my-4"
            >
              <Image src={MilkPic} alt="Milk Category" />
              <p>Sữa bột</p> <p>cho baby</p>
            </Link>
            <Link
              href="/#functional_food"
              className="flex flex-col items-center my-4 "
            >
              <Image src={FuncFoodPic} alt="Functional Food Category" />
              Thực Phẩm <br /> Chức Năng
            </Link>
          </div>
        </div>
      </div>
      <div className={fixed ? 'absolute right-44' : 'absolute right-24'}>
        <div className={fixed ? 'fixed top-[20%]' : ''}>Right side</div>
      </div>
    </div>
  )
}

export default SideBanner
