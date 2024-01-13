import { getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { jsonResponse } from "../../response";
import { connection, marketplaceManager } from "../..";
import { v4 as uuid, parse } from "uuid";
import BN from "bn.js";

type InitProductParams = {
    signer: string,
    marketplace: string,
    paymentMint: string,
    productPrice: number,
}

export async function initProduct(params: InitProductParams) {
    console.log('initProduct starts');

    try {
        const marketplacePubkey = new PublicKey(params.marketplace);
        const signerPubkey = new PublicKey(params.signer);
        const [accessMint] = PublicKey.findProgramAddressSync(
            [
                Buffer.from("access_mint", "utf-8"),
                marketplacePubkey.toBuffer(),
            ],
            marketplaceManager.programId
        );
        const id = parse(uuid());
        // devnet usdc
        const [productPubkey] = PublicKey.findProgramAddressSync(
            [
                Buffer.from("product", "utf-8"),
                marketplacePubkey.toBuffer(),
                id,
            ],
            marketplaceManager.programId
        );
        const accounts = {
            signer: signerPubkey,
            marketplace: marketplacePubkey,
            product: productPubkey,
            paymentMint: new PublicKey(params.paymentMint),
            accessMint,
            accessVault: getAssociatedTokenAddressSync(accessMint, signerPubkey, false, TOKEN_2022_PROGRAM_ID),
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        };
        const args = {
            id: [...id],
            productPrice: new BN(params.productPrice),
        };
        const transaction = await marketplaceManager.transactionBuilder.InitProduct(connection, accounts, args);
        const serializedTransaction = Buffer.from(transaction.serialize()).toString('base64');
        console.log('Serialized transaction ', serializedTransaction);

        return jsonResponse({ message: serializedTransaction });
    } catch (error) {
        console.log(error);
        return jsonResponse({ message: 'Internal Server Error' }, 500);
    }
}
