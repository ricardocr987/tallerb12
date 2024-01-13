import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { PaymentFeePayer } from "../sdk/utils/types/PaymentFeePayer.js";
import { MarketplaceManager } from "../sdk/index.js";
import dotenv from 'dotenv';
dotenv.config();

async function initMarketplace() {
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
    const [accessMint, accessMintBump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("access_mint", "utf-8"),
            marketplacePubkey.toBuffer(),
        ],
        programId
    );
    const accounts = {
        signer: signer.publicKey,
        marketplace: marketplacePubkey,
        accessMint,
    };
    const args = {
        accessMintBump,
        feesConfig: {
            fee: 0,
            feePayer: PaymentFeePayer.Seller,
            discountMint: null,
            feeReduction: null,
        },
        rewardsConfig: null
    };
    const marketplace = new MarketplaceManager();
    const txn = await marketplace.transactionBuilder.InitMarketplace(connection, accounts, args);
    txn.sign([signer]);
    
    try {
        const sig = await connection.sendTransaction(txn);
        console.log(sig);
    } catch(e) {
        console.log(e);
    }
}
  
initMarketplace();