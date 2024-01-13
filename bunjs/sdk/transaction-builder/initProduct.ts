import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  type InitProductInstructionAccounts,
  createInitProductInstruction,
  type InitProductInstructionArgs,
} from '../utils/instructions/initProduct'

export async function createInitProductTransaction(
  connection: Connection,
  accounts: InitProductInstructionAccounts,
  args: InitProductInstructionArgs,
): Promise<VersionedTransaction> {
  const ix = createInitProductInstruction(accounts, args)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
