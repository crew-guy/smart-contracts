import { useEffect, createContext, useContext, useEffect } from 'react'
import { ethers } from 'ethers'

import { contractABI, contractAddress } from '../utils/constants'

const { ethereum } = window

con


const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({provider, signer, transactionContract})
}

export default function TransactionProvider = ({ children }) => {
    return (
        <TransactionContext.Provider value={getEthereumContract()}></TransactionContext.Provider>
    )
}