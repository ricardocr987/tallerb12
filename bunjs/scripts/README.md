This folder contains three scripts:
- initMarketplace: it creates a token gate marketplace (ie to list a product you need a token)
- airdropAccess: the authority of the mint is a pda (controlled by the program), but the authority of the marketplace can airdrop the token needed to list products
- initProduct: creates the product account with the specified price

Note: Fill .env.local, use .exmaple.env.local as reference