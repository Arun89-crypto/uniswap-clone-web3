import React, { useState, useEffect } from 'react';
import { contractABI, contractAddress } from '../lib/constants'
export const TransactionContext = React.createContext();
import { ethers } from 'ethers'
import { client } from '../lib/sanityClient'
let eth;

if (typeof window !== 'undefined') {
    eth = window.ethereum
}
// function to get contract
const getEtheriumContract = () => {
    const provider = new ethers.providers.Web3Provider(eth)
    const signer = provider.getSigner()
    // We will get the contract values
    // const transactionContract = new ethers.Contract(
    //     contractAddress,
    //     contractABI,
    //     signer
    // )
    const transactionContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    )

    return transactionContract
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        addressTo: '',
        amount: ''
    })
    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])
    // creating user if it doesn't exists
    useEffect(() => {
        if (!currentAccount) return
            ; (async () => {
                const userDoc = {
                    _type: 'users',
                    _id: currentAccount,
                    userName: 'Unnamed',
                    address: currentAccount
                }
                await client.createIfNotExists(userDoc)
            })()
    }, [currentAccount])

    const connectWallet = async (metamask = eth) => {
        try {
            if (!metamask) return alert('Please install metamask atleast, wth are you even doing here :)')
            const accounts = await metamask.request({ method: 'eth_requestAccounts' })
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error('No Etherium Object');
        }
    }

    const checkIfWalletIsConnected = async (metamask = eth) => {
        try {
            if (!metamask) return alert("Please install Metamask")
            const accounts = await metamask.request({ method: 'eth_requestAccounts' })
            if (accounts.length) {
                setCurrentAccount(accounts[0])
                console.log('Wallet is already connected');
            }
        } catch (error) {
            console.log(error);
            throw new Error('No Etherium Object');
        }
    }

    const sendTransaction = async (
        metamask = eth,
        connectedAccount = currentAccount
    ) => {
        try {
            if (!metamask) return alert("Please install Metamask")
            const { addressTo, amount } = formData;
            const TransactionContract = getEtheriumContract();
            const parsedAmount = ethers.utils.parseEther(amount); //parsing the amount

            await metamask.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: connectedAccount,
                        to: addressTo,
                        gas: '0x7EF40', // 52000 GWEI
                        value: parsedAmount._hex,
                    }
                ]
            })

            const transactionHash = await TransactionContract.publishTransaction(
                addressTo,
                parsedAmount,
                `Transferring ETH ${parsedAmount} to ${addressTo}`, // message
                'TRANSFER' // keyword
            )

            setIsLoading(true);

            await transactionHash.wait()

            // For DB
            await saveTransaction(
                transactionHash.hash,
                amount,
                connectedAccount,
                addressTo
            )

            setIsLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e, name) => {
        setFormData((prev_state) => ({ ...prev_state, [name]: e.target.value }))
    }

    const saveTransaction = async (
        txHash, amount, fromAddress = currentAccount, toAddress
    ) => {
        const txDoc = {
            _type: 'transactions',
            _id: txHash,
            fromAddress: fromAddress,
            toAddress: toAddress,
            timestamp: new Date(Date.now()).toISOString(),
            txHash: txHash,
            amount: parseFloat(amount)
        }

        await client.createIfNotExists(txDoc);
        await client.patch(currentAccount).setIfMissing({ transactions: [] }).insert('after', 'transactions[-1]', [
            {
                _key: txHash,
                _ref: txHash,
                _type: 'reference'
            }
        ]).commit()

        return
    }

    return (
        <TransactionContext.Provider value={{
            currentAccount,
            connectWallet,
            sendTransaction,
            handleChange,
            formData, isLoading
        }}>
            {children}
        </TransactionContext.Provider>
    )
}
