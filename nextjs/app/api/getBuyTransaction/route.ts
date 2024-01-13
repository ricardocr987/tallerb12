import { NextRequest } from "next/server";

// solo se pueden hacer llamadas externas desde el lado del servidor
// este endpoint es solo un wrapper que a su vez llama al servidor de bun
export async function POST(
    req: NextRequest,
) {
    const body = await req.json()
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...body,
            // this program is prepared to allow other people to list products, for this workshop lets just do this
            seller: process.env.MARKET_AUTH!,
            marketplaceAuth: process.env.MARKET_AUTH!,
            marketplace: process.env.MARKET!,
        }),
    };
    const transaction = await fetch('http://127.0.0.1:8000/transactionBuilder/registerBuy', requestOptions);
    return Response.json(await transaction.json())
}