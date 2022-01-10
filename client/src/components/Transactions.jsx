import React from 'react'
import { useContract } from '../context/TransactionContext'

const Transactions = () => {
    const {connectedAccount} = useContract()

    return (
        <div className="flex w-full justify-center gradient-bg-transactions items-center 2xl:px-20" >
            <div className="flex flex-col py-12 px-4 justify-center items-center">
                {connectedAccount ? 
                    <h3 className="text-white text-3xl text-center my-2">Latest Transactions</h3>
                    :<h3 className="text-white text-3xl text-center my-2">Login to see your transactions</h3>
                }
            </div>
        </div>
    )
}

export default Transactions
