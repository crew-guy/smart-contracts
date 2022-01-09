import React,{useState} from 'react'
import {HiMenuAlt4} from 'react-icons/hi'
import {AiOutlineClose } from 'react-icons/ai'
import logo from '../../images/logo.png'

const NavItem = ({ title, classProps }) => {
    return <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title }
        </li>
}


const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false) 

    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className='md:flex-[0.5] flex-initial justify-center items-center'>
                <img src={logo} alt="logo" className="w-32 cursor-pointer"  />
            </div>
            <ul className='text-white md:flex hidden list-none flex-row items-center justify-between flex-initial' >
                {["Market", "Exchange", "Wallet", "Tutorials"].map((title, index) => (
                    <NavItem title={title} key={index}/>
                ))}
                <li className='bg-[#2952e3] hover:bg-[#2546bd] py-2 px-4 rounded-full cursor-pointer' >
                    Login
                </li>
            </ul>
            <div className="flex relative">
                {toggleMenu
                    ? <AiOutlineClose  fontSize={28} className="text-white md:hidden cursor-pointer" onClick={()=>setToggleMenu(false)} />
                    : <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={()=>setToggleMenu(true)} />
                }
            </div>
        </nav>
    )
}

export default Navbar
