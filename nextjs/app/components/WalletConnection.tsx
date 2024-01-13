'use client'
import { useWallet } from '@solana/wallet-adapter-react';

const WalletConnection = () => {
    const { wallets, select, connect, publicKey, disconnect } = useWallet();

    const connectWallet = async () => {
        // Se deberia gestionar mejor (hay multiples wallets)
        // o puedes usar el wallet adapter ui pero lo queria simplificar mas
        select(wallets[0].adapter.name);
        connect();
    }

    const isConnected = publicKey !== null;

    const buttonStyle = 'cursor-pointer px-2 border-gray-800 border bg-gray-500 hover:bg-gray-400 rounded-md truncate';

    return (
        <div className='w-32'>
            {isConnected ? (
                <div className={buttonStyle} onClick={disconnect}>
                    {publicKey.toString()}
                </div>
            ) : (
                <button
                    className={buttonStyle}
                    onClick={connectWallet}
                >
                    Connect Wallet
                </button>
            )}
        </div>
    );
};

export default WalletConnection;
