import React from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import {Loader} from './'

const Welcome = () => {
    return (
        <div className='flex w-full justify-center items-center' > 
            <div className='flex md:flex-row flex-col justify-between items-start md:p-20 py-12 px-4 ' >
                <div className='flex flex-1 justify-start flex-col md:mr-10 ' >
                    <h1>Send Crypto <br /> across the world </h1>
                </div>
            </div>
        </div>
    )
}

export default Welcome
