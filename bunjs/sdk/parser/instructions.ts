import {
  IX_ACCOUNTS_LAYOUT,
  IX_DATA_LAYOUT,
  InstructionType,
} from '../layout/instructions.js'
import BN from 'bn.js'

export function parseAcceptAccess(
  instructionData: Buffer,
  accountsKeys: string[],
): AcceptAccessInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.AcceptAccess]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.AcceptAccess].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    requestor: accountsKeys[accounts.indexOf('requestor')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    accessRequest: accountsKeys[accounts.indexOf('accessRequest')],
    accessMint: accountsKeys[accounts.indexOf('accessMint')],
    accessVault: accountsKeys[accounts.indexOf('accessVault')],
    rent: accountsKeys[accounts.indexOf('rent')],
    ...result,
  }
}

export function parseAirdropAccess(
  instructionData: Buffer,
  accountsKeys: string[],
): AirdropAccessInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.AirdropAccess]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.AirdropAccess].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    receiver: accountsKeys[accounts.indexOf('receiver')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    accessMint: accountsKeys[accounts.indexOf('accessMint')],
    accessVault: accountsKeys[accounts.indexOf('accessVault')],
    rent: accountsKeys[accounts.indexOf('rent')],
    ...result,
  }
}

export function parseEditMarketplace(
  instructionData: Buffer,
  accountsKeys: string[],
): EditMarketplaceInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.EditMarketplace]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.EditMarketplace].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    accessMint: accountsKeys[accounts.indexOf('accessMint')],
    ...result,
  }
}

export function parseEditProduct(
  instructionData: Buffer,
  accountsKeys: string[],
): EditProductInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.EditProduct]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.EditProduct].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    product: accountsKeys[accounts.indexOf('product')],
    paymentMint: accountsKeys[accounts.indexOf('paymentMint')],
    ...result,
  }
}

export function parseInitBounty(
  instructionData: Buffer,
  accountsKeys: string[],
): InitBountyInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.InitBounty]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.InitBounty].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    rewardMint: accountsKeys[accounts.indexOf('rewardMint')],
    bountyVault: accountsKeys[accounts.indexOf('bountyVault')],
    rent: accountsKeys[accounts.indexOf('rent')],
    ...result,
  }
}

export function parseInitMarketplace(
  instructionData: Buffer,
  accountsKeys: string[],
): InitMarketplaceInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.InitMarketplace]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.InitMarketplace].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    accessMint: accountsKeys[accounts.indexOf('accessMint')],
    rent: accountsKeys[accounts.indexOf('rent')],
    ...result,
  }
}

export function parseInitProduct(
  instructionData: Buffer,
  accountsKeys: string[],
): InitProductInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.InitProduct]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.InitProduct].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    product: accountsKeys[accounts.indexOf('product')],
    paymentMint: accountsKeys[accounts.indexOf('paymentMint')],
    accessMint: accountsKeys[accounts.indexOf('accessMint')],
    accessVault: accountsKeys[accounts.indexOf('accessVault')],
    rent: accountsKeys[accounts.indexOf('rent')],
    ...result,
  }
}

export function parseRegisterBuy(
  instructionData: Buffer,
  accountsKeys: string[],
): RegisterBuyInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.RegisterBuy]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.RegisterBuy].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    product: accountsKeys[accounts.indexOf('product')],
    paymentMint: accountsKeys[accounts.indexOf('paymentMint')],
    buyerVault: accountsKeys[accounts.indexOf('buyerVault')],
    sellerVault: accountsKeys[accounts.indexOf('sellerVault')],
    marketplaceVault: accountsKeys[accounts.indexOf('marketplaceVault')],
    bountyVault: accountsKeys[accounts.indexOf('bountyVault')],
    rent: accountsKeys[accounts.indexOf('rent')],
    ...result,
  }
}

export type AcceptAccessInfo = {
  signer: string
  requestor: string
  marketplace: string
  accessRequest: string
  accessMint: string
  accessVault: string
  rent: string
}
export type AirdropAccessInfo = {
  signer: string
  receiver: string
  marketplace: string
  accessMint: string
  accessVault: string
  rent: string
}
export type EditMarketplaceInfo = {
  signer: string
  marketplace: string
  accessMint: string
  feesConfig: any
  rewardsConfig: any
}
export type EditProductInfo = {
  signer: string
  product: string
  paymentMint: string
  productPrice: BN
}
export type InitBountyInfo = {
  signer: string
  marketplace: string
  rewardMint: string
  bountyVault: string
  rent: string
}
export type InitMarketplaceInfo = {
  signer: string
  marketplace: string
  accessMint: string
  rent: string
  accessMintBump: any
  feesConfig: any
  rewardsConfig: any
}
export type InitProductInfo = {
  signer: string
  marketplace: string
  product: string
  paymentMint: string
  accessMint: string
  accessVault: string
  rent: string
  id: any
  productPrice: BN
}
export type RegisterBuyInfo = {
  signer: string
  marketplace: string
  product: string
  paymentMint: string
  buyerVault: string
  sellerVault: string
  marketplaceVault: string
  bountyVault: string
  rent: string
  amount: number
}
