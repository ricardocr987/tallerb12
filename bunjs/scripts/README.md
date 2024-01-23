Pasos:
- Instala Bun
- Instala dependencias con bun install desde el terminal
- Convierte example.env en .env y añade el rpc de devnet y la private key de la keypair generada
- Ejecuta cada uno de los scripts con bun nombreDelScript.ts
- Lo que os sale por consola es un explorer con la signature, es el identificador de la transaccion

## 1. initMarketplace
Este script se encarga de crear un marketplace basado en token gate, lo que significa que para listar un producto es necesario poseer un token específico.

## 2. airdropAccess
En este script, la autoridad del mint es un programa de dirección pública (pda) controlado por el programa. La autoridad del marketplace puede realizar airdrops del token necesario para listar productos.

## 3. initProduct
Este script facilita la creación de la cuenta del producto con el precio especificado.

**Nota:**
Asegúrate de completar el archivo .env.local antes de ejecutar los scripts. Puedes utilizar el archivo .example.env. como referencia.
