import { createAcceptAccessTransaction } from './transaction-builder/acceptAccess.js'
import { createAirdropAccessTransaction } from './transaction-builder/airdropAccess.js'
import { createEditMarketplaceTransaction } from './transaction-builder/editMarketplace.js'
import { createEditProductTransaction } from './transaction-builder/editProduct.js'
import { createInitBountyTransaction } from './transaction-builder/initBounty.js'
import { createInitMarketplaceTransaction } from './transaction-builder/initMarketplace.js'
import { createInitProductTransaction } from './transaction-builder/initProduct.js'
import { createRegisterBuyTransaction } from './transaction-builder/registerBuy.js'
import { InstructionType } from './layout/instructions.js'
import { PROGRAM_ADDRESS } from './utils/index.js'
import { Parser } from './parser/index.js'
import { PublicKey } from '@solana/web3.js'

export class MarketplaceManager {
  public programId = new PublicKey(PROGRAM_ADDRESS)
  public parser = new Parser()
  public transactionBuilder = {
    [InstructionType.AcceptAccess]: createAcceptAccessTransaction,
    [InstructionType.AirdropAccess]: createAirdropAccessTransaction,
    [InstructionType.EditMarketplace]: createEditMarketplaceTransaction,
    [InstructionType.EditProduct]: createEditProductTransaction,
    [InstructionType.InitBounty]: createInitBountyTransaction,
    [InstructionType.InitMarketplace]: createInitMarketplaceTransaction,
    [InstructionType.InitProduct]: createInitProductTransaction,
    [InstructionType.RegisterBuy]: createRegisterBuyTransaction,
  }
}