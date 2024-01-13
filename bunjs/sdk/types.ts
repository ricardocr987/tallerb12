import type { PublicKey } from "@solana/web3.js"
import type { FeesConfig, RewardsConfig } from "./utils"
import type BN from "bn.js"

export enum AccountType {
    AccessRequest = 'AccessRequest',
    Marketplace = 'Marketplace',
    Product = 'Product',
}

export type AccessRequestInfo = {
    payer: PublicKey
}
  
export type MarketplaceInfo = {
    authority: PublicKey
    bumps: {
      paymentMint: PublicKey
      productPrice: BN
    }
    accessMint: PublicKey
    feesConfig: FeesConfig | null
    rewardsConfig: RewardsConfig | null
}
  
export type ProductInfo = {
    authority: PublicKey
    marketplace: PublicKey
    id: number[]
    sellerConfig: {
        paymentMint: PublicKey
        productPrice: BN
    }
}
  
  