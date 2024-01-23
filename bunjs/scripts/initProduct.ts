import { getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { MarketplaceManager } from "../sdk/index.js";
import { v4 as uuid, parse } from "uuid";
import dotenv from 'dotenv';
import BN from "bn.js";
dotenv.config();

async function initProduct() {
    const rpc = process.env.rpc;
    if (!rpc) {
      throw new Error("RPC not found in environment variables.");
    }
    
    const secret = JSON.parse(process.env.secret || 'null');
    if (secret === null) {
      throw new Error("Secret not found or invalid in environment variables.");
    }    

    const secretUint8Array = new Uint8Array(secret);
    const signer = Keypair.fromSecretKey(secretUint8Array);
    const connection: Connection = new Connection(rpc);

    const programId = new PublicKey("7KES27SK4AdZCCVj7nWgf5rUBFgyDMNSHEwgu7tvbnZW");
    const [marketplacePubkey] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("marketplace", "utf-8"),
            signer.publicKey.toBuffer()
        ],
        programId
    );
    const id = parse(uuid());
    // devnet usdc
    const paymentMint = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");
    const [productPubkey] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("product", "utf-8"),
            marketplacePubkey.toBuffer(),
            id,
        ],
        programId
    );
    const [accessMint] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("access_mint", "utf-8"),
            marketplacePubkey.toBuffer(),
        ],
        programId
    );
    const accounts = {
        signer: signer.publicKey,
        marketplace: marketplacePubkey,
        product: productPubkey,
        paymentMint,
        accessMint,
        accessVault: getAssociatedTokenAddressSync(accessMint, signer.publicKey, false, TOKEN_2022_PROGRAM_ID),
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    };
    const args = {
        id: [...id],
        productPrice: new BN(1000000), // USDC has 6 decimals, the final price is 1 USDC
    };
    const marketplace = new MarketplaceManager();
    const txn = await marketplace.transactionBuilder.InitProduct(connection, accounts, args);
    txn.sign([signer]);
    
    try {
        const sig = await connection.sendTransaction(txn);
        console.log(`https://explorer.solana.com/tx/${sig}?cluster=devnet`);
    } catch(e) {
        console.log(e);
    }
}
  
initProduct();