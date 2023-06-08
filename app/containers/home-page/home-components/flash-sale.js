import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Link from 'next/link'
import FlashSaleDrawer from './flash-sale-drawer'
import ProductCard from '@/app/components/ProductCard'
import ProductPic from '../../../../public/images/product/product.jpg'

const FlashSale = () => {
  const dumbData = [
    {
      id: 1,
      productName: 'Lốc 3 hộp sữa PediaSure dinh dưỡng y học cho trẻ dưới 5 tuổi',
      productImg: {ProductPic},
      price: 1044400,
      discount: 0.15,
    },
    {
      id: 2,
      productName: 'Combo 4 thực phẩm dinh dưỡng y học Kid Essentials Australia 800g hương vani (1-10 tuổi)',
      productImg: {ProductPic},
      price: 1536000,
      discount: 0.15,
    },
    {
      id: 3,
      productName: 'Combo 5 sữa GrowPLUS+ Xanh 1.5kg (từ 1 tuổi)',
      productImg: {ProductPic},
      price: 1975000,
      discount: 0.07,
    },
    {
      id: 4,
      productName: 'Combo 2 Wakodo Lebens Mom, 850g',
      productImg: {ProductPic},
      price: 999000,
      discount: 0.45,
    },
    {
      id: 5,
      productName: 'Lốc 3 hộp sữa PediaSure dinh dưỡng y học cho trẻ dưới 5 tuổi',
      productImg: {ProductPic},
      price: 1044400,
      discount: 0.15,
    },
    {
      id: 6,
      productName: 'Combo 5 sữa GrowPLUS+ Xanh 1.5kg (từ 1 tuổi)',
      productImg: {ProductPic},
      price: 1975000,
      discount: 0.07,
    },
    {
      id: 7,
      productName: 'Combo 2 Wakodo Lebens Mom, 850g',
      productImg: {ProductPic},
      price: 999000,
      discount: 0.45,
    },
  ]
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 mb-4">
        <p className="text-pink-400 font-[UTM-Cookie] font-extrabold place-self-start text-3xl">
          Flash Sale
        </p>
        <FlashSaleDrawer data={dumbData}/>
      </div>

      <Swiper spaceBetween={50} slidesPerView={3} autoplay={true}>
        {dumbData.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductCard data={item}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default FlashSale
