import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { jsonResponse } from "../../response";
import { connection, marketplaceManager } from "../..";

type RegisterBuyParams = {
    signer: string,
    marketplace: string, 
    product: string, 
    paymentMint: string, 
    seller: string,
    marketplaceAuth: string, 
    amount: number,
}

export async function registerBuy(params: RegisterBuyParams) {
    console.log('registerBuy starts');

    try {
        if (!params.signer || !params.marketplace || !params.product || !params.paymentMint || !params.seller || !params.amount) {
            return jsonResponse('Error: Missing required information', 500)
        }

        const paymentMint = new PublicKey(params.paymentMint);
        const signer = new PublicKey(params.signer);
        const seller = new PublicKey(params.seller);
        const marketplaceAuth = new PublicKey(params.marketplaceAuth);
        const accounts = {
            signer,
            marketplace: new PublicKey(params.marketplace),
            product: new PublicKey(params.product),
            paymentMint,
            buyerVault: getAssociatedTokenAddressSync(paymentMint, signer),
            sellerVault: getAssociatedTokenAddressSync(paymentMint, seller),
            marketplaceVault: getAssociatedTokenAddressSync(paymentMint, marketplaceAuth),
            //bountyVault: *When rewards are active it is needed to include this account (needs to be created)*,
        };

        const parsedParams = {
            amount: Number(params.amount),
        };

        const transaction = await marketplaceManager.transactionBuilder.RegisterBuy(connection, accounts, parsedParams);
        const serializedTransaction = Buffer.from(transaction.serialize()).toString('base64');
        console.log('Serialized transaction ', serializedTransaction)

        return jsonResponse({ transaction: serializedTransaction });
    } catch (error) {
        console.error(error);
        return jsonResponse(error, 500);
    }
}
