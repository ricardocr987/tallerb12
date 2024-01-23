'use client'
import { FC, ReactNode, useCallback, useMemo } from 'react';
import { WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

export const SolanaContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
        ],
        []
    );

    const onError = useCallback(
        (error: WalletError) => {
            // notify({ type: 'error', message: error.message ? `${error.name}: ${error.message}` : error.name });
            console.error(error);
        },
        []
    );

    return (
        <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_RPC!}>
            <WalletProvider wallets={wallets} onError={onError}>
                {children}
            </WalletProvider>
        </ConnectionProvider>
    );
};

