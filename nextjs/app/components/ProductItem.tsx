import { ProductInfo } from "../types";
import { PurchaseButton } from "./PurchaseButton";

export function ProductItem({ productInfo }: { productInfo: ProductInfo }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <img
        alt={productInfo.address}
        className="w-full h-48 object-cover"
        height={200}
        src="/placeholder.svg"
        style={{
          aspectRatio: "200/200",
          objectFit: "cover",
        }}
        width={200}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 truncate">{productInfo.address}</h2>
        <p className="text-gray-500 mb-2">${productInfo.price}</p>
        <PurchaseButton productInfo={productInfo} />
      </div>
    </div>
  );
}