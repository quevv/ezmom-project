import ProductCard from '@/app/components/ProductCard'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const ProductList = (Props) => {
  const cateList = Props.cateList
  const productList = Props.data
    console.log(productList, cateList);
  return (
    <div className="w-full my-8">
      <div className="grid grid-cols-2 mb-4">
        <p className="text-pink-400 font-[UTM-Cookie] font-extrabold place-self-start text-3xl">
          {Props.title}
        </p>
      </div>
      <div className="border-y-2 border-solid border-gray-300 flex py-3">
        <Swiper spaceBetween={10} slidesPerView={7} autoplay={true}>
          {cateList.map((item) => {
            return (
              <SwiperSlide key={item}>
                {' '}
                <div className="cursor-pointer rounded-full hover:bg-pink-300 flex justify-center py-2">
                  {item}
                </div>{' '}
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      <div className="grid grid-cols-3">
        {productList.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
      <div className="w-full flex justify-center mt-6">
        <div className="rounded-full border-2 border-solid border-pink-400 p-3 hover:bg-pink-300 cursor-pointer active:bg-pink-500">
          Xem Thêm Sản Phẩm Khác
        </div>
      </div>
    </div>
  )
}

export default ProductList
