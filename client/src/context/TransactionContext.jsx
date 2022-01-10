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

    return transactionContract
}

export default function TransactionProvider({ children }) {
    const [connectedAccount, setConnectedAccount] = useState(null)
    const [formData, setFormData] = useState({ message: "", keyword: "", amount: 0, addressTo: "" })
    const [loading, setIsLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))
    
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

    const sendTransaction = async () => {
        if (!ethereum) return alert("Please install metamask - https://metamask.io/download.html ")
        try {
            const { addressTo, amount, message, keyword } = formData
            const transactionContract = getEthereumContract()
            const parsedAmount = ethers.utils.parseEther(amount)
            
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: connectedAccount,
                    to: addressTo,
                    gas: '0x5208', // 21000 wei
                    value:parsedAmount._hex
                }]
            })

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword)
            setIsLoading(true)
            console.log(`Loading - ${transactionHash.hash}`)
            await transactionHash.wait()
            setIsLoading(false)
            console.log(`Success - ${transactionHash.hash}`)

            const transactionCount = await transactionContract.getTransactionCount()
            setTransactionCount(transactionCount.toNumber())
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