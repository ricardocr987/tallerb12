import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  type EditProductInstructionAccounts,
  createEditProductInstruction,
  type EditProductInstructionArgs,
} from '../utils/instructions/editProduct'

export async function createEditProductTransaction(
  connection: Connection,
  accounts: EditProductInstructionAccounts,
  args: EditProductInstructionArgs,
): Promise<VersionedTransaction> {
  const ix = createEditProductInstruction(accounts, args)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
