import { ProductItem } from './components/ProductItem';
import { Header } from './components/Header';
import { ProductInfo } from './types';

async function getProducts(): Promise<ProductInfo[]> {
  const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cache:" no-cache"
      },
  };
  const res = await fetch('http://127.0.0.1:8000/getProducts', requestOptions)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const { products } = await res.json()
  return products
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen flex flex-col">
      <Header/>
      <div className="flex-1 pt-20 px-4 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Featured Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductItem key={product.address} productInfo={product} />
          ))}
        </div>
      </div>
    </main>
  )
}