import {  createContext, useState, useContext, useEffect } from 'react'
import { ethers } from 'ethers'

import { contractABI, contractAddress } from '../utils/constants'

const { ethereum } = window

const TransactionContext = createContext()

export const useContract = () => {
    return useContext(TransactionContext);
}


const createEthereumContract = () => {
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
    const [transactions, setTransactions] = useState([])
    
    const handleChange = (e, name) => {
        setFormData(prevState => ({...prevState, [name]: e.target.value}))
    }
    
    const checkIfWalletIsConnected = async () => {
        if (!ethereum) return alert("Please install metamask - https://metamask.io/download.html ")
        try {
            const accounts = await ethereum.request({ method: "eth_accounts" })
            if (accounts.length) {
                setConnectedAccount(accounts[0])
                getAllTransactions();
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
            const transactionContract = createEthereumContract()
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
            window.reload()
            document.getElementById("transactions").scrollIntoView();
        } catch (error) {
            console.error(error)
            throw new Error("No ethereum object")
        }
    }

    const getAllTransactions = async () => { 
        if(!ethereum) return alert("Please install metamask - https://metamask.io/download.html ")

        const transactionContract = createEthereumContract()
        try {
            const availableTransactions = await transactionContract.getAllTransactions()
            console.log(availableTransactions)
            const structuredTransactions = availableTransactions.map(transaction =>( {
                addressTo : transaction.sender,
                addressFrom : transaction.receiver,
                timestamp : new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex)/(10**18)
            }))
            setTransactions(structuredTransactions)
        } catch (error) {
            console.error(error)
            throw new Error("No ethereum object")   
        }
    }

    const checkIfTransactionsExist = async() => {
        if(!ethereum) return alert("Please install metamask - https://metamask.io/download.html ")

        const transactionContract = createEthereumContract()
        const transactionCount = await transactionContract.getTransactionCount()
        
        window.localStorage.setItem('transactionCount', transactionCount.toNumber())
    }

    useEffect(() => {
        checkIfWalletIsConnected()
        checkIfTransactionsExist()
    },[transactionCount])

    return (
        <TransactionContext.Provider
            value={
                {
                    connectWallet,
                    connectedAccount,
                    formData,
                    handleChange,
                    sendTransaction,
                    loading,
                    transactions
                }}
            >
            {children}
        </TransactionContext.Provider>
    )
}