import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CartLogo from '../public/images/shopping_cart_logo.svg'

const ProductCard = (props) => {
  const productItem = props.data
  // console.log(productItem.productId);
  return (
    <div className="bg-white p-5 rounded-lg shadow-md m-2">
      <Link href={`/product/${productItem.productId}`}>
        <div className="flex justify-center py-4">
          <Image
            src={productItem.img}
            width={180}
            height={200}
            alt={productItem.name}
          />
        </div>
        <div className="line-clamp-3 leading-5 my-2 h-16">
          {productItem.name}
        </div>
      </Link>
      <div className="font-bold">
        {productItem.price.toLocaleString()} đ
      </div>
      <div className="flex justify-between items-center">
        {productItem.discount? <><del className="font-thin">
          {productItem.price.toLocaleString()} đ
        </del>
        <div className="border border-1 border-solid border-pink-400 text-pink-400 rounded-lg p-1">
          -{(productItem.discount * 100).toFixed(0)}%
        </div></> : <div className='font-bold'> Số lượng: {productItem.quantity} </div>}
        
        <div className="rounded-full hover:bg-pink-300 p-1 active:bg-pink-400">
          <Image
            alt="Add to Cart"
            src={CartLogo}
            color="blue"
            width={30}
            height={30}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
