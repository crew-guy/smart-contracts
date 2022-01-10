import React from 'react'
import { BsShieldFillCheck } from 'react-icons/bs'
import { BiSearchAlt } from 'react-icons/bi'
import { RiHeart2Fill } from 'react-icons/ri'


const ServiceCard = ({icon, color, title, subtitle}) => {
    return (
        <div className="flex flex-row m-2 justify-start p-3 text-white items-center rounded-xl white-glassmorphism cursor-pointer hover:shadow-xl" >
            <div className={` w-10 h-10 mr-5 flex justify-center items-center ${color} rounded-full p-3 ml-7 `}>
                {icon}
            </div>
            <div className="flex-col justify-between w-96 items-start">
                <h3 className="mt-2 text-lg sm:text-xl font-semibold">
                    {title}
                </h3>
                <p className="my-2 text-sm md:w-9/12">{ subtitle}</p>
            </div>
        </div>
    )
}

const Services = () => {
    return (
        <div className='flex w-full md:px-10 mf:justify-center mf:items-center gradient-bg-services' >
            <div className="flex w-full h-full flex-col mf:flex-row items-center justify-between md:p-20 py-12 px-4">
                <div className="flex-1 flex flex-col justify-start items-start">
                    <h1 className='text-white text-3xl sm:text-5xl py-2 text-gradient' >
                        Services that we <br /> continue to improve
                    </h1>
                </div>
                <div className="flex-1 flex flex-col justify-start items-center">
                    <ServiceCard
                        icon={<BsShieldFillCheck fontSize={17} />}
                        color="bg-[#2952e3]"
                        title="Security Guaranteed"
                        subtitle="Security is guaranteed. We always the privacy and quality of our products."
                    />
                    <ServiceCard
                        icon={<BiSearchAlt fontSize={17} />}
                        color="bg-[#8945f8]"
                        title="Best exchange rates"
                        subtitle="Security is guaranteed. We always the privacy and quality of our products."
                    />
                    <ServiceCard
                        icon={<RiHeart2Fill fontSize={17} />}
                        color="bg-[#f84550]"
                        title="Fastest transactions"
                        subtitle="Security is guaranteed. We always the privacy and quality of our products."
                    />
                </div>
            </div>
        </div>
    )
}

export default Services