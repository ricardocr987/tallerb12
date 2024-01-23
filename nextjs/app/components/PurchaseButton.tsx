'use client'
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, VersionedTransaction } from "@solana/web3.js";
import { ProductInfo } from "../types";

export function PurchaseButton({ productInfo }: { productInfo: ProductInfo }) {
    const { sendTransaction, publicKey } = useWallet();
    const handlePayment = async () => {
        const requestData = {
            signer: publicKey?.toString()!,
            product: productInfo.address,
            paymentMint: productInfo.paymentMint,
            amount: '1',
        };    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        };
        const response = await fetch('http://127.0.0.1:3000/api/getBuyTransaction', requestOptions);
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }
    
        const serializedBase64 = await response.json();
        const serializedBuffer = Buffer.from(serializedBase64.transaction, 'base64');
        const transaction = VersionedTransaction.deserialize(serializedBuffer);
        const connection = new Connection(process.env.NEXT_PUBLIC_RPC!);
        const signature = await sendTransaction(transaction, connection);
        console.log(signature)
    }

    return (
        <button 
            className="text-md font-semibold border-gray-800 border bg-orange-500 hover:bg-orange-400 w-full rounded-md"
            onClick={handlePayment}
        >
            Buy
        </button>
    );
}