import {
  acceptAccessInstructionDiscriminator,
  acceptAccessStruct,
  airdropAccessInstructionDiscriminator,
  airdropAccessStruct,
  editMarketplaceInstructionDiscriminator,
  editMarketplaceStruct,
  editProductInstructionDiscriminator,
  editProductStruct,
  initBountyInstructionDiscriminator,
  initBountyStruct,
  initMarketplaceInstructionDiscriminator,
  initMarketplaceStruct,
  initProductInstructionDiscriminator,
  initProductStruct,
  registerBuyInstructionDiscriminator,
  registerBuyStruct,
} from '../utils/instructions/index.js'

export enum InstructionType {
  AcceptAccess = 'AcceptAccess',
  AirdropAccess = 'AirdropAccess',
  EditMarketplace = 'EditMarketplace',
  EditProduct = 'EditProduct',
  InitBounty = 'InitBounty',
  InitMarketplace = 'InitMarketplace',
  InitProduct = 'InitProduct',
  RegisterBuy = 'RegisterBuy',
}

export const acceptAccessAccounts = [
  'signer',
  'requestor',
  'marketplace',
  'accessRequest',
  'accessMint',
  'accessVault',
  'rent',
  'systemProgram',
  'tokenProgram',
  'associatedTokenProgram',
]
export const airdropAccessAccounts = [
  'signer',
  'receiver',
  'marketplace',
  'accessMint',
  'accessVault',
  'rent',
  'systemProgram',
  'tokenProgram',
  'associatedTokenProgram',
]
export const editMarketplaceAccounts = ['signer', 'marketplace', 'accessMint']
export const editProductAccounts = ['signer', 'product', 'paymentMint']
export const initBountyAccounts = [
  'signer',
  'marketplace',
  'rewardMint',
  'bountyVault',
  'rent',
  'systemProgram',
  'tokenProgram',
  'associatedTokenProgram',
]
export const initMarketplaceAccounts = [
  'signer',
  'marketplace',
  'accessMint',
  'rent',
  'systemProgram',
  'tokenProgram',
]
export const initProductAccounts = [
  'signer',
  'marketplace',
  'product',
  'paymentMint',
  'accessMint',
  'accessVault',
  'rent',
  'systemProgram',
]
export const registerBuyAccounts = [
  'signer',
  'marketplace',
  'product',
  'paymentMint',
  'buyerVault',
  'sellerVault',
  'marketplaceVault',
  'bountyVault',
  'rent',
  'systemProgram',
  'tokenProgram',
]

export const IX_DISCRIMINATORS = {
  [Buffer.from(acceptAccessInstructionDiscriminator).toString('ascii')]:
    InstructionType.AcceptAccess,
  [Buffer.from(airdropAccessInstructionDiscriminator).toString('ascii')]:
    InstructionType.AirdropAccess,
  [Buffer.from(editMarketplaceInstructionDiscriminator).toString('ascii')]:
    InstructionType.EditMarketplace,
  [Buffer.from(editProductInstructionDiscriminator).toString('ascii')]:
    InstructionType.EditProduct,
  [Buffer.from(initBountyInstructionDiscriminator).toString('ascii')]:
    InstructionType.InitBounty,
  [Buffer.from(initMarketplaceInstructionDiscriminator).toString('ascii')]:
    InstructionType.InitMarketplace,
  [Buffer.from(initProductInstructionDiscriminator).toString('ascii')]:
    InstructionType.InitProduct,
  [Buffer.from(registerBuyInstructionDiscriminator).toString('ascii')]:
    InstructionType.RegisterBuy,
}

export const IX_DATA_LAYOUT: Partial<Record<InstructionType, any>> = {
  [InstructionType.AcceptAccess]: acceptAccessStruct,
  [InstructionType.AirdropAccess]: airdropAccessStruct,
  [InstructionType.EditMarketplace]: editMarketplaceStruct,
  [InstructionType.EditProduct]: editProductStruct,
  [InstructionType.InitBounty]: initBountyStruct,
  [InstructionType.InitMarketplace]: initMarketplaceStruct,
  [InstructionType.InitProduct]: initProductStruct,
  [InstructionType.RegisterBuy]: registerBuyStruct,
}

export const IX_ACCOUNTS_LAYOUT: Partial<Record<InstructionType, any>> = {
  [InstructionType.AcceptAccess]: acceptAccessAccounts,
  [InstructionType.AirdropAccess]: airdropAccessAccounts,
  [InstructionType.EditMarketplace]: editMarketplaceAccounts,
  [InstructionType.EditProduct]: editProductAccounts,
  [InstructionType.InitBounty]: initBountyAccounts,
  [InstructionType.InitMarketplace]: initMarketplaceAccounts,
  [InstructionType.InitProduct]: initProductAccounts,
  [InstructionType.RegisterBuy]: registerBuyAccounts,
}
