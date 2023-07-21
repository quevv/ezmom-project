import React from 'react'
import BabyContainer from '../containers/baby-page/baby.container'

export const metadata = {
  title: "Lộ trình",
  description: "Generated by create next app",
};

const BabyTakeCare = () => {
  return (
    <div className="w-full min-h-[500px]">
      <BabyContainer/>
    </div>
  )
}

export default BabyTakeCare