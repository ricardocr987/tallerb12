import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  type EditMarketplaceInstructionAccounts,
  createEditMarketplaceInstruction,
  type EditMarketplaceInstructionArgs,
} from '../utils/instructions/editMarketplace'

export async function createEditMarketplaceTransaction(
  connection: Connection,
  accounts: EditMarketplaceInstructionAccounts,
  args: EditMarketplaceInstructionArgs,
): Promise<VersionedTransaction> {
  const ix = createEditMarketplaceInstruction(accounts, args)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
