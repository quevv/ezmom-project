"use client"
import React, { useState } from 'react'
import { Drawer } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'

const FlashSaleDrawer = (data) => {
  const productList = data.data
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className=" place-self-end">
      <div
        onClick={handleOpen}
        className="rounded-full p-2 hover:bg-pink-400 hover:text-white text-pink-400 text-sm cursor-pointer"
      >
        Xem tất cả
      </div>

      <Drawer
        title={
          <div className="flex justify-between items-center">
            <p className="font-bold text-2xl text-pink-500">
              Tất cả sản phẩm Flash Sale
            </p>
            <div className="flex px-3 rounded-full bg-white border-black border-2 hover:border-pink-500 items-center">
              <input
                className="rounded-full focus:outline-none"
                type="text"
                placeholder="Tìm Kiếm"
              />
              <div className="m-4 flex items-center">
                <SearchOutlined style={{ fontSize: '24px' }} />
              </div>
            </div>
          </div>
        }
        placement={'right'}
        closable={true}
        onClose={handleClose}
        open={open}
        size="large"
      >
        <div className="grid grid-cols-3">
          {productList.map((item) => (
            <ProductCard key={item.id} data={item} />
          ))}
        </div>
      </Drawer>
    </div>
  )
}

export default FlashSaleDrawer
