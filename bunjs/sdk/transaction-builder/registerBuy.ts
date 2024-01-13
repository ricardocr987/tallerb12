import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  type RegisterBuyInstructionAccounts,
  createRegisterBuyInstruction,
  type RegisterBuyInstructionArgs,
} from '../utils/instructions/registerBuy'

export async function createRegisterBuyTransaction(
  connection: Connection,
  accounts: RegisterBuyInstructionAccounts,
  args: RegisterBuyInstructionArgs,
): Promise<VersionedTransaction> {
  const ix = createRegisterBuyInstruction(accounts, args)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
