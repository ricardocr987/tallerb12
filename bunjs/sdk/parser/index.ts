import { IX_DISCRIMINATORS, InstructionType, acceptAccessAccounts, airdropAccessAccounts, editMarketplaceAccounts, editProductAccounts, initBountyAccounts, initMarketplaceAccounts, initProductAccounts, registerBuyAccounts } from '../layout/instructions.js'
import { parseAcceptAccess, parseAirdropAccess, parseEditMarketplace, parseEditProduct, parseInitBounty, parseInitMarketplace, parseInitProduct, parseRegisterBuy } from './instructions.js'
import { accessRequestBeet, accessRequestDiscriminator, marketplaceBeet, marketplaceDiscriminator, productBeet, productDiscriminator } from '../utils/index.js'
import { AccountType, type AccessRequestInfo, type MarketplaceInfo, type ProductInfo } from '../types.js'

export class Parser {
  public instructionParsers = {
    [InstructionType.AcceptAccess]: parseAcceptAccess,
    [InstructionType.AirdropAccess]: parseAirdropAccess,
    [InstructionType.EditMarketplace]: parseEditMarketplace,
    [InstructionType.EditProduct]: parseEditProduct,
    [InstructionType.InitBounty]: parseInitBounty,
    [InstructionType.InitMarketplace]: parseInitMarketplace,
    [InstructionType.InitProduct]: parseInitProduct,
    [InstructionType.RegisterBuy]: parseRegisterBuy,
  }
  
  public instructionAccounts = {
    [InstructionType.AcceptAccess]: acceptAccessAccounts,
    [InstructionType.AirdropAccess]: airdropAccessAccounts,
    [InstructionType.EditMarketplace]: editMarketplaceAccounts,
    [InstructionType.EditProduct]: editProductAccounts,
    [InstructionType.InitBounty]: initBountyAccounts,
    [InstructionType.InitMarketplace]: initMarketplaceAccounts,
    [InstructionType.InitProduct]: initProductAccounts,
    [InstructionType.RegisterBuy]: registerBuyAccounts,
  }

  private accountParsers: Record<AccountType, any> = {
    [AccountType.AccessRequest]: accessRequestBeet,
    [AccountType.Marketplace]: marketplaceBeet,
    [AccountType.Product]: productBeet,
  }
  
  private accountDiscriminators: Record<string, AccountType> = {
    [Buffer.from(accessRequestDiscriminator).toString('ascii')]:
      AccountType.AccessRequest,
    [Buffer.from(marketplaceDiscriminator).toString('ascii')]:
      AccountType.Marketplace,
    [Buffer.from(productDiscriminator).toString('ascii')]: AccountType.Product,
  }

  public getInstructionType(data: Buffer): InstructionType | undefined {
    const discriminator = Buffer.from(data.buffer, data.byteOffset, 8)
    return IX_DISCRIMINATORS[discriminator.toString('ascii')]
  }
  
  public getAccountType(data: Buffer): AccountType | undefined {
    const discriminator: string = Buffer.from(
      data.buffer,
      data.byteOffset,
      8,
    ).toString('ascii')
    
    return this.accountDiscriminators[discriminator]
  }

  public parseAccessRequest(accountData: Buffer): AccessRequestInfo {
    return this.accountParsers[AccountType.AccessRequest].deserialize(
      accountData,
    )[0]
  }
  
  public parseMarketplace(accountData: Buffer): MarketplaceInfo {
    return this.accountParsers[AccountType.Marketplace].deserialize(
      accountData,
    )[0]
  }
  
  public parseProduct(accountData: Buffer): ProductInfo {
    return this.accountParsers[AccountType.Product].deserialize(accountData)[0]
  }
}