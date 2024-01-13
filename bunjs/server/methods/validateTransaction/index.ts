import { InstructionType } from "../../../sdk/layout/instructions";
import { validateSignatureBody } from "../../requestSchema";
import { jsonResponse } from "../../response";
import { marketplaceManager } from "../..";
import Elysia from "elysia";
import bs58 from "bs58";

export const validateTransactionRequest = (app: Elysia) =>
    app.post('/validateTransaction', async ({body/*, headers: { authorization }*/}) => {
        try {
            /*if (authorization !== `Authorization: Bearer ${config.WEBHOOK_AUTH}`) {
                console.log('Unauthorized request');
                return jsonResponse('Unauthorized request', 401);
            }*/
        
            const asyncTasks = body.map(async (rawTxn) => {
                    const { transaction, blockTime } = rawTxn;
                    // note: assuming only one instruction in the transaction
                    const instructionData = transaction.message.instructions[0].data;
                    const bufferData = Buffer.from(bs58.decode(instructionData));
                    const type = marketplaceManager.parser.getInstructionType(bufferData);
                    if (!type) return;
                    
                    const accountKeys = transaction.message.accountKeys;
                    const info = marketplaceManager.parser.instructionParsers[type](bufferData, accountKeys);
                    
                    const event = {
                        type,
                        blockTime,
                        signer: info.signer,
                        info
                    };
                    console.log(event);
                    if (event.type === InstructionType.RegisterBuy) {
                        // NFT dispenser with metaplex library with own private key in the server
                    }
                    return 
            });
        
            const results = await Promise.all(asyncTasks);
            const transactionIds = results.map((result) => result).join(", ");
            return jsonResponse(`IDs: ${transactionIds} added.`);
        } catch (error) {
            console.log(error);
            return jsonResponse('Error adding transactions', 500)
        }
    }, { body: validateSignatureBody });
