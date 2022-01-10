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
    const [formData, setFormData] = useState({ message: "", keyword: "", amount: 0, addressTo: "" })
    
    const handleChange = (e, name) => {
        setFormData(prevState => ({...prevState, [name]: e.target.value}))
    }
    
    const checkIfWalletIsConnected = async () => {
        if (!ethereum) return alert("Please install metamask - https://metamask.io/download.html ")
        try {
            const accounts = await ethereum.request({ method: "eth_accounts" })
            if (accounts.length) {
                setConnectedAccount(accounts[0])
            }
            else {
                console.log('No accounts found !')
            }
        } catch (error) {
            console.error(error);  
            throw new Error("No ethereum object")
        }
    }

    const connectWallet = async () => {
        if(!ethereum) return alert("Please install metamask - https://metamask.io/download.html ")

        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" })
            setConnectedAccount(accounts[0])
            console.log({connectedAccount, accounts})
        } catch (error) {
            throw new Error("Now ethereum object.")
        }
    }

    const sendTransaction = async (addressTo, amount, keyword, message) => {
        if (!ethereum) return alert("Please install metamask - https://metamask.io/download.html ")
        try {
            
        } catch (error) {
            console.error(error)
            throw new Error("No ethereum object")
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    },[])

    return (
        <TransactionContext.Provider value={{connectWallet, connectedAccount, formData, handleChange, sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}