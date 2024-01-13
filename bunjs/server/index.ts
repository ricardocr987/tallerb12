import { validateTransactionRequest } from "./methods/validateTransaction";
import { transactionBuilder } from "./methods/transactionBuilder";
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors';
import { Elysia } from 'elysia';
import { MarketplaceManager } from "../sdk";
import { Connection } from "@solana/web3.js";
import { config } from "./config";
import { getProducts } from "./methods/getProducts";

const app = new Elysia();
export const marketplaceManager = new MarketplaceManager();
export let connection = new Connection('https://api.devnet.solana.com');

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'Authorization'],
        credentials: true,
        preflight: true
    }))
    .use(swagger())
    .use(transactionBuilder)
    .use(validateTransactionRequest)
    app.get('/getProducts', async () => {
        return await getProducts();
    })
    .listen({ port: config.PORT }, ({ hostname, port }) => {
        if (config.RPC !== '') {
            // updates connection with environment variable
            connection = new Connection(config.RPC);
        }
        console.log(`Server running at http://${hostname}:${port}`)
    }
);
