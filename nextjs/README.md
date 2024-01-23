Pasos:
- Instala dependencias con npm install
- Cambia el .example.env por .env.local y rellénalo, MARKET_AUTH es tu clave pública y MARKET es la de tu marketplace que has creado con los scripts
- Ejecuta el front con npm run dev, tienes que tener el servidor activo a la vez
- Instala phantom o backpack o solflare, utiliza devnet en la extensión y recuerda tener tanto SOL como USDC con los facuet que os recomendé en readme principal del proyecto
- En el browser es necesario que uséis http://127.0.0.1:3000/ en vez de localhost por un problema con cors-nextjs