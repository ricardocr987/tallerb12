import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  type InitBountyInstructionAccounts,
  createInitBountyInstruction,
} from '../utils/instructions/initBounty'

export async function createInitBountyTransaction(
  connection: Connection,
  accounts: InitBountyInstructionAccounts,
): Promise<VersionedTransaction> {
  const ix = createInitBountyInstruction(accounts)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
