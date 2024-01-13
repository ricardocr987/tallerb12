import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  type InitMarketplaceInstructionAccounts,
  createInitMarketplaceInstruction,
  type InitMarketplaceInstructionArgs,
} from '../utils/instructions/initMarketplace'

export async function createInitMarketplaceTransaction(
  connection: Connection,
  accounts: InitMarketplaceInstructionAccounts,
  args: InitMarketplaceInstructionArgs,
): Promise<VersionedTransaction> {
  const ix = createInitMarketplaceInstruction(accounts, args)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
