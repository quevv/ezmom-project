"use client"
import React from 'react'
import Banner from './home-components/banner'
import FlashSale from './home-components/flash-sale'
import SideBanner from './home-components/side-banner'
import ProductList from './home-components/product-list'

import ProductPic from '../../../public/images/product/product.jpg'
import ProductPic2 from '../../../public/images/product/product2.png'

const HomePage = () => {
  return (
    <div className=" h-[1000] flex flex-col justify-start items-center py-[10rem] mx-16">
      <Banner />
      <SideBanner />
      <div className="w-[70%] flex justify-center" id="flash_sale">
        <FlashSale />
      </div>
      <div className="w-[70%]" id="powered_milk">
        <ProductList data={dumbDataMilk} cateList={milkCateList} title="Sữa Bột" />
      </div>
      <div className="w-[70%]" id="functional_food">
        <ProductList data={dumbDataFF} cateList={ffCateList} title="Thực Phẩm Chức Năng" />
      </div>
    </div>
  )
}

export default HomePage

const milkCateList = [
  'Nutifood',
  'Meiji',
  'PediaSure',
  'Bobs',
  'Aptamil',
  'Vinamilk',
  'TH TrueMilk',
  '...',
]

const ffCateList = [
  'Brauer',
  'Hipp',
  'LiveSpo',
  'Bobs',
  'Elevit',
  'Vinamilk',
  'TH TrueMilk',
  '...',
]

const dumbDataMilk = [
  {
    id: 1,
    productName: 'Lốc 3 hộp sữa PediaSure dinh dưỡng y học cho trẻ dưới 5 tuổi',
    productImg: { ProductPic },
    price: 1044400,
  },
  {
    id: 2,
    productName:
      'Combo 4 thực phẩm dinh dưỡng y học Kid Essentials Australia 800g hương vani (1-10 tuổi)',
    productImg: { ProductPic },
    price: 1536000,
  },
  {
    id: 3,
    productName: 'Combo 5 sữa GrowPLUS+ Xanh 1.5kg (từ 1 tuổi)',
    productImg: { ProductPic },
    price: 1975000,
  },
  {
    id: 4,
    productName: 'Combo 2 Wakodo Lebens Mom, 850g',
    productImg: { ProductPic },
    price: 999000,
  },
  {
    id: 5,
    productName: 'Lốc 3 hộp sữa PediaSure dinh dưỡng y học cho trẻ dưới 5 tuổi',
    productImg: { ProductPic },
    price: 1044400,
  },
  {
    id: 6,
    productName: 'Combo 5 sữa GrowPLUS+ Xanh 1.5kg (từ 1 tuổi)',
    productImg: { ProductPic },
    price: 1975000,
  },
  {
    id: 7,
    productName: 'Combo 2 Wakodo Lebens Mom, 850g',
    productImg: { ProductPic },
    price: 999000,
  },
]

const dumbDataFF = [
  {
    id: 1,
    productName: 'Lốc 3 hộp sữa PediaSure dinh dưỡng y học cho trẻ dưới 5 tuổi',
    productImg: { ProductPic2 },
    price: 1044400,
  },
  {
    id: 2,
    productName:
      'Combo 4 thực phẩm dinh dưỡng y học Kid Essentials Australia 800g hương vani (1-10 tuổi)',
    productImg: { ProductPic2 },
    price: 1536000,
  },
  {
    id: 3,
    productName: 'Combo 5 sữa GrowPLUS+ Xanh 1.5kg (từ 1 tuổi)',
    productImg: { ProductPic2 },
    price: 1975000,
  },
  {
    id: 4,
    productName: 'Combo 2 Wakodo Lebens Mom, 850g',
    productImg: { ProductPic2 },
    price: 999000,
  },
  {
    id: 5,
    productName: 'Lốc 3 hộp sữa PediaSure dinh dưỡng y học cho trẻ dưới 5 tuổi',
    productImg: { ProductPic2 },
    price: 1044400,
  },
  {
    id: 6,
    productName: 'Combo 5 sữa GrowPLUS+ Xanh 1.5kg (từ 1 tuổi)',
    productImg: { ProductPic2 },
    price: 1975000,
  },
  {
    id: 7,
    productName: 'Combo 2 Wakodo Lebens Mom, 850g',
    productImg: { ProductPic2 },
    price: 999000,
  },
]

