'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { SignMessage } from '../utils/signMessage';
import bs58 from 'bs58';
import { useCallback, useState } from 'react';

const WalletConnection = () => {
    const { 
        wallets, 
        select, 
        connect,
        disconnect,
        publicKey, 
        signMessage
    } = useWallet();
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);

    const handleDisconnect = useCallback(async () => {
        disconnect()
        setIsSignedIn(false)
    }, [disconnect]);

    const handleSign = useCallback(async () => {
        if (!publicKey || !signMessage) {
            console.error("Public key or signMessage function is not available");
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address: publicKey.toBase58() })
        };

        const nonceResponse = await fetch('http://127.0.0.1:3001/auth/nonce', requestOptions);
        if (!nonceResponse.ok) {
            console.error("Failed to fetch nonce:", nonceResponse.statusText);
            return;
        }

        const { nonce } = await nonceResponse.json();
        const message = new SignMessage({
            publicKey: publicKey.toBase58(),
            statement: `Sign in`,
            nonce,
        });

        const data = new TextEncoder().encode(message.prepare());
        const signature = await signMessage(data);
        const serializedSignature = bs58.encode(signature);

        const signInRequestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: JSON.stringify(message),
                signature: serializedSignature,
            }),
        };

        const signInResponse = await fetch('http://127.0.0.1:3001/auth/login', signInRequestOptions);
        if (!signInResponse.ok) {
            console.error("Failed to sign in:", signInResponse.statusText);
            return;
        }

        console.log("Signed in successfully");
        setIsSignedIn(true);
    }, [publicKey, signMessage]);

    const handleConnect = useCallback(async () => {
        try {
            select(wallets[1].adapter.name);
            await connect();
            setIsWalletConnected(true);
        } catch (error) {
            console.error("An error occurred during the wallet connection process:", error);
        }
    }, [wallets, select, connect]);

    const isConnected = publicKey !== null;

    const buttonStyle = 'cursor-pointer px-2 border-gray-800 border bg-gray-500 hover:bg-gray-400 rounded-md truncate';

    return (
        <div className='w-32'>
            {isSignedIn ? (
                <div className={buttonStyle} onClick={handleDisconnect}>
                    {publicKey?.toString()}
                </div>
            ) : isConnected ? (
                <button
                    className={buttonStyle}
                    onClick={handleSign}
                    disabled={!isWalletConnected}
                >
                    Sign In
                </button>
            ) : (
                <button
                    className={buttonStyle}
                    onClick={handleConnect}
                >
                    Connect Wallet
                </button>
            )}
        </div>
    );
};

export default WalletConnection;
