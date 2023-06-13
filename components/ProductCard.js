import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CartLogo from '../public/images/shopping_cart_logo.svg'

const ProductCard = (data) => {
  const productItem = data.data
  // console.log(productItem);
  return (
    <div className="bg-white p-3 rounded-lg shadow-md m-2">
      <Link href={'/'}>
        <div className="flex justify-center">
          <Image
            src={productItem.productImg.ProductPic? productItem.productImg.ProductPic.src : productItem.productImg.ProductPic2.src}
            width={180}
            height={100}
            alt={productItem.productName}
          />
        </div>
        <div className="line-clamp-2 hover:line-clamp-3 leading-5 my-2">
          {productItem.productName}
        </div>
      </Link>
      <div className="font-bold">
        {productItem.discount? (
          productItem.price -
          productItem.price * productItem.discount
        ).toLocaleString() : productItem.price.toLocaleString()} Vnd
      </div>
      <div className="flex justify-between items-center">
        {productItem.discount? <><del className="font-thin">
          {productItem.price.toLocaleString()} Vnd
        </del>
        <div className="border border-1 border-solid border-pink-400 text-pink-400 rounded-lg p-1">
          -{(productItem.discount * 100).toFixed(0)}%
        </div></> : <></>}
        
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
