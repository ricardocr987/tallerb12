import { initProduct } from "./initProduct";
import { registerBuy } from "./registerBuy";
import { Elysia, t } from "elysia";

const initProductSchema = t.Object({
    signer: t.String(),
    marketplace: t.String(),
    paymentMint: t.String(),
    productPrice: t.String(),
});

const registerBuySchema = t.Object({
    signer: t.String(),
    marketplace: t.String(),
    product: t.String(),
    paymentMint: t.String(),
    seller: t.String(),
    marketplaceAuth: t.String(),
    amount: t.String(),
});

export const transactionBuilder = (app: Elysia) => 
    app.group("/transactionBuilder", (app) =>
        app.post('/initProduct', async ({ body }) => {
            const {
                signer,
                marketplace,
                paymentMint,
                productPrice,
            } = body;
            
            const initProductParams = {
                signer,
                marketplace,
                paymentMint,
                productPrice: parseFloat(productPrice),
            };                

            return await initProduct(initProductParams);
        }, { body: initProductSchema })

        .post('/registerBuy', async ({ body }) => {
            const {
                signer,
                marketplace,
                product,
                paymentMint,
                seller,
                marketplaceAuth,
                amount,
            } = body;
        
            const registerBuyParams = {
                signer,
                marketplace,
                product,
                paymentMint,
                seller,
                marketplaceAuth,
                amount: parseInt(amount, 10),
            };
        
            return await registerBuy(registerBuyParams);
        }, { body: registerBuySchema })
    );