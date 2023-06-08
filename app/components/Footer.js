import React from 'react'
import { Cookie } from 'next/font/google';

const Footer = () => {
  return (
    <footer className="w-full grid grid-cols-3 gap-3 bg-[#FA5A96] py-10 px-20 text-white">
      <div>
        <div className="text-4xl font-[UTM-Cookie] font-extrabold py-2"><a href='/'>EZMOM Baby</a></div>
        <div>Email: ezmombaby@gmail.com</div>
        <div>Điện thoại: 028 7699 8989</div>
      </div>
      <div>
        <div className="text-3xl font-[UTM-Cookie] font-extrabold py-2">Về EZMOM Baby</div>
        <ul className='text-sm'>
          <li><a href='/#'>Giới thiệu về Ezmom Baby</a></li>
          <li><a href='/#'>Thông tin tuyển dụng</a></li>
          <li><a href='/#'>Điều khoản sử dụng</a></li>
          <li><a href='/#'>Chính sách bảo mật</a></li>
        </ul>
      </div>
      <div>
        <div className="text-3xl font-[UTM-Cookie] font-extrabold py-2">Hỗ trợ khách hàng</div>
        <ul className='text-sm'>
          <li><a href='/#'>Tra cứu hoá đơn</a></li>
          <li><a href='/#'>Mua và nhận hàng online</a></li>
          <li><a href='/#'>Hình thức thanh toán</a></li>
          <li><a href='/#'>Đổi trả và hoàn tiển</a></li>
          <li><a href='/#'>Bảo hành & Bảo trì</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
