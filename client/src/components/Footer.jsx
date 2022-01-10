import React from 'react'
import logo from '../../images/logo.png'

const Footer = () => {
    return (
        <div className='flex px-20 flex-col gradient-bg-footer' >
            <div className="flex flex-col md:flex-row justify-between items-center">
                <img src={logo} alt="logo image" className='h-10' />
                <div className="flex flex-col w-full md:flex-row justify-end items-center">
                    <div className="text-white text-base ml-11 cursor-pointer">Market</div>
                    <div className="text-white text-base ml-11 cursor-pointer">Exchange</div>
                    <div className="text-white text-base ml-11 cursor-pointer">Wallet</div>
                    <div className="text-white text-base ml-11 cursor-pointer">Tutorials</div>
                </div>
            </div>
            <div className="flex flex-col justify-start items-center">
                <div className="text-white text-base">Come join us at</div>
                <div className="text-white text-base">info@kryptomastery.com</div>
            </div>
            <div className="w-full h-[0.25px] bg-gray-400 my-7"></div>
            <div className="flex flex-col mb-10 md:flex-row justify-between items-center">
                <div className="text-white text-sm">@kryptomastery2022</div>
                <div className="text-white text-sm">All rights reserved</div>
            </div>
        </div>
    )
}

export default Footer
