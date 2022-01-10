import {  createContext, useState, useContext, useEffect } from 'react'
import { ethers } from 'ethers'

import { contractABI, contractAddress } from '../utils/constants'

const { ethereum } = window

const TransactionContext = createContext()

export const useContract = () => {
    return useContext(TransactionContext);
}


const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({provider, signer, transactionContract})
}

export default function TransactionProvider({ children }) {
    const [connectedAccount, setConnectedAccount] = useState(null)
    
    const checkIfWalletIsConnected = async () => {
        if (!ethereum) {
            return alert("Please install metamask - https://metamask.io/download.html ")
        }
        try {
            const accounts = await ethereum.request({ method: "eth_accounts" })
        } catch (error) {
            console.error(error);            
        }
    }

    const connectWallet = async () => {
        if(!ethereum) return alert("Please install metamask - https://metamask.io/download.html ")

        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" })
            setConnectedAccount(accounts[0])
            console.log(connectedAccount)
        } catch (error) {
            throw new Error("Now ethereum object.")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    },[])

    return (
        <TransactionContext.Provider value={{connectWallet}}>
            {children}
        </TransactionContext.Provider>
    )
}