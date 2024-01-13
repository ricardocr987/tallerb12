import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  type AcceptAccessInstructionAccounts,
  createAcceptAccessInstruction,
} from '../utils/instructions/acceptAccess'

export async function createAcceptAccessTransaction(
  connection: Connection,
  accounts: AcceptAccessInstructionAccounts,
): Promise<VersionedTransaction> {
  const ix = createAcceptAccessInstruction(accounts)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
