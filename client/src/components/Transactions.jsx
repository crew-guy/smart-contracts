import React, { Fragment } from 'react'
import { useContract } from '../context/TransactionContext'
import  useGifFetch  from '../hooks/useGifFetch'
import { shortenAddress } from '../utils/shortenAddress'

const TransactionCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
    const gifUrl = useGifFetch({ keyword });
  
    return (
      <div className="bg-[#181918] m-4 flex flex-1
        2xl:min-w-[350px]
        2xl:max-w-[400px]
        sm:min-w-[230px]
        sm:max-w-[300px]
        min-w-full
        flex-col p-3 rounded-md hover:shadow-2xl"
        id="transactions"
      >
        <div className="flex flex-col items-center w-full mt-3">
          <div className="display-flex justify-start w-full mb-6 p-2">
            <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
              <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
            </a>
            <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
              <p className="text-white text-base">To: {shortenAddress(addressTo)}</p>
            </a>
            <p className="text-white text-base">Amount: {amount} ETH</p>
            {message && (
              <>
                <br />
                <p className="text-white text-base">Message: {message}</p>
              </>
            )}
          </div>
          <img
            src={gifUrl || url}
            alt="nature"
            className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
          />
          <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                    <p className="text-[#37c7da] font-bold">{timestamp}</p>
          </div>
        </div>
      </div>
    );
  };

const Transactions = () => {
    const {connectedAccount, transactions} = useContract()

    return (
        <div className="flex w-full justify-center gradient-bg-transactions items-center 2xl:px-20" >
            <div className="flex flex-col py-12 px-4 justify-center items-center">
                {connectedAccount ? 
                    <h3 className="text-white text-3xl text-center my-2">Latest Transactions</h3>
                    :<h3 className="text-white text-3xl text-center my-2">Login to see your transactions</h3>
                }
                <div className="flex flex-wrap items-center justify-center">
                    {[...transactions.reverse()].map((transaction, i) => <TransactionCard key={i} {...transaction}/>  )}
                </div>
                
            </div>
        </div>
    )
}

export default Transactions
