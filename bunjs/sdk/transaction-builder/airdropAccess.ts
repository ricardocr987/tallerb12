import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  type AirdropAccessInstructionAccounts,
  createAirdropAccessInstruction,
} from '../utils/instructions/airdropAccess'

export async function createAirdropAccessTransaction(
  connection: Connection,
  accounts: AirdropAccessInstructionAccounts,
): Promise<VersionedTransaction> {
  const ix = createAirdropAccessInstruction(accounts)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
