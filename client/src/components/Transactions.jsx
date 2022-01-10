import React, { Fragment } from 'react'
import { useContract } from '../context/TransactionContext'
import {transactions} from '../utils/dummyData'
import { shortenAddress } from '../utils/shortenAddress'

const TransactionCard = ({id, url, message, timestamp, addressTo, addressFrom, amount}) => {
    return (
        <div className="flex bg-[#181918] 
            2xl:min-w-[450px]
            2xl:max-w-[500px]
            sm:max-w-[300px]
            sm:min-w-[270px]
            flex-col p-3 m-2 rounded-md hover:shadow-2xl
        ">
            <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-6 p-2">
                    <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer" >
                        <div className="text-white text-base">To : {shortenAddress(addressTo)} </div>
                    </a>
                    <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer" >
                        <div className="text-white text-base">From : {shortenAddress(addressFrom)} </div>
                    </a>
                    <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                        <p className="text-base text-[#37c7da] font-bold">{timestamp.toString()}</p>
                    </div>
                    <p className="text-white text-base">Amount : {amount} ETH</p>
                    {message && (
                        <>
                            <br />
                            <p className="text-white text-base">Message : {message}</p>
                        </>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

const Transactions = () => {
    const {connectedAccount} = useContract()

    return (
        <div className="flex w-full justify-center gradient-bg-transactions items-center 2xl:px-20" >
            <div className="flex flex-col py-12 px-4 justify-center items-center">
                {connectedAccount ? 
                    <h3 className="text-white text-3xl text-center my-2">Latest Transactions</h3>
                    :<h3 className="text-white text-3xl text-center my-2">Login to see your transactions</h3>
                }
                <div className="flex flex-wrap items-center justify-start">
                    {transactions.reverse().map((transaction, i) => <TransactionCard key={i} {...transaction}/>  )}
                </div>
                
            </div>
        </div>
    )
}

export default Transactions
