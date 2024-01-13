import bs58 from "bs58";
import { connection, marketplaceManager } from "..";
import { jsonResponse } from "../response";
import { productDiscriminator } from "../../sdk/utils";
import { config } from "../config";
import { PublicKey } from "@solana/web3.js";

export async function getProducts() {
    console.log('getProducts starts');

    try {
        const accounts = await connection.getProgramAccounts(marketplaceManager.programId, {
            filters: [
                { memcmp: { offset: 0, bytes: bs58.encode(productDiscriminator) } },
                { memcmp: { offset: 8, bytes: bs58.encode(new PublicKey(config.MARKETAUTH).toBuffer()) } },
            ],
        })
        const products = accounts.map((account) => {
            const product = marketplaceManager.parser.parseProduct(account.account.data)
            const normalizedPrice = Number(product.sellerConfig.productPrice) / 1e6; // Divide by 1,000,000 because USDC mint has 6 decimals
            return {
                address: account.pubkey.toString(),
                paymentMint: product.sellerConfig.paymentMint.toString(),
                price: normalizedPrice
                //seller: product.authority.toString()
            }
        })
        return jsonResponse({ products });
    } catch (error) {
        console.error(error);
        return jsonResponse(error, 500);
    }
}