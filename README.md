# Proyecto de Comercio Descentralizado en Solana

Este proyecto consta de tres partes esenciales:

- Scripts: Creas marketplace, producto/s y das acceso al marketplace
- Servidor: Responde con transacciones y productos a listar al frontend
- Frontend: Muestra los productos y permite comprarlos

### Requisitos software:
- [Solana CLI](https://docs.solana.com/cli)
- [Node](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) (Se recomienda la versión LTS)
- [Bun](https://bun.sh/) (Bun es utilizado tanto con los scripts como con el servidor)

## Pasos para ejecutar el proyecto:

1. Configura el CLI en devnet y genera una wallet siguiendo [estas instrucciones](https://docs.solana.com/wallet-guide/file-system-wallet).

2. Recibe 10 SOL desde [solfaucet.com](https://solfaucet.com/).

3. Recibe USDC desde [faucet.circle.com](https://faucet.circle.com/).

4. Consigue tu propia url de [shyft.to](https://shyft.to/) en devnet como RPC y úsala como variable de entorno.

5. Utiliza los scripts y la documentación que se encuentran en la carpeta bunjs.

6. Ejecuta el servidor también con Bun.

7. Ejecuta el frontend en la carpeta de nextjs y podrás explorar y comprar tus productos.
