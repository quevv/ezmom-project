import Image from 'next/image'
import React from 'react'
import EzMomLogo from '../../public/images/ezmom_logo.svg'
import CateLogo from '../../public/images/category_logo.svg'
import HeartLogo from '../../public/images/heart_logo.svg'
import ChatLogo from '../../public/images/chat_logo.svg'
import CartLogo from '../../public/images/shopping_cart_logo.svg'
import UserLogo from '../../public/images/user_logo.svg'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Link from 'next/link'

const Header = () => {
  return (
    <div className="flex justify-center fixed w-full bg-white pt-3">
      <div>
        <div className="block">
          <ul className=" grid grid-cols-5 gap-4">
            <li className="hover:text-pink-500">
              <Link className="flex items-center" href="/">
                <Image src={CateLogo} alt="category" /> <p>Danh Mục</p>
              </Link>
            </li>
            <li className="hover:text-pink-500">
              <Link className="flex items-center" href="/">
                <Image src={HeartLogo} alt="Grow path" /> <p>Lộ Trình</p>
              </Link>
            </li>
            <li className="hover:text-pink-500">
              <Link className="flex items-center" href="/">
                <Image src={ChatLogo} alt="Feedback" /> <p>Phản Hồi</p>
              </Link>
            </li>
            <li className="hover:text-pink-500">
              <Link className="flex items-center" href="/">
                <Image src={CartLogo} alt="cart" /> <p>Giỏ hàng</p>
              </Link>
            </li>
            <li className="hover:text-pink-500">
              <Link className="flex items-center" href="/">
                <Image src={UserLogo} alt="account" /> <p>Đăng nhập</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <Link href="/">
            <Image
              width={120}
              height={40}
              src={EzMomLogo}
              alt="EzMom Baby Logo"
            />
          </Link>
          <div className="flex rounded-full border-black border-2 hover:border-pink-500 w-full px-2">
            <input
            className=' w-full h-[3rem] p-4 rounded-full'
              type="text"
              placeholder="Ba mẹ muốn tìm những sản phẩm nào cho bé nhà?"
            />
            <FontAwesomeIcon className='w-[2rem]' icon={faMagnifyingGlass} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
