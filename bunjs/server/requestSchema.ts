import { t } from "elysia";

const UiTokenAmount = t.Object({
  amount: t.String(),
  decimals: t.Number(),
  uiAmount: t.Number(),
  uiAmountString: t.String(),
});

const PostTokenBalances = t.Object({
  accountIndex: t.Number(),
  mint: t.String(),
  owner: t.String(),
  programId: t.String(),
  uiTokenAmount: UiTokenAmount,
});

const InnerInstruction = t.Object({
  index: t.Number(),
  instructions: t.Array(
    t.Object({
      accounts: t.Array(t.Number()),
      data: t.String(),
      programIdIndex: t.Number(),
    })
  ),
});

const Meta = t.Object({
  err: t.Union([t.String(), t.String()]),
  fee: t.Number(),
  innerInstructions: t.Array(InnerInstruction),
  loadedAddresses: t.Object({
    readonly: t.Array(t.String()),
    writable: t.Array(t.String()),
  }),
  logMessages: t.Array(t.String()),
  postBalances: t.Array(t.Number()),
  postTokenBalances: t.Array(PostTokenBalances),
  preBalances: t.Array(t.Number()),
  preTokenBalances: t.Array(PostTokenBalances),
  rewards: t.Array(t.String()),
});

const Instruction = t.Object({
  accounts: t.Array(t.Number()),
  data: t.String(),
  programIdIndex: t.Number(),
});

const Message = t.Object({
  accountKeys: t.Array(t.String()),
  addressTableLookups: t.Array(t.String()),
  header: t.Object({
    numReadonlySignedAccounts: t.Number(),
    numReadonlyUnsignedAccounts: t.Number(),
    numRequiredSignatures: t.Number(),
  }),
  instructions: t.Array(Instruction),
  recentBlockhash: t.String(),
});

const Transaction = t.Object({
  message: Message,
  signatures: t.Array(t.String()),
});

const BodyRequest = t.Object({
  blockTime: t.Number(),
  indexWithinBlock: t.Number(),
  meta: Meta,
  slot: t.Number(),
  transaction: Transaction,
  version: t.Number(),
});

export const validateSignatureBody = t.Array(BodyRequest);
