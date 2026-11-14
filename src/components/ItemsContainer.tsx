import type { ClothingProduct } from "../data/data";
import ItemCard from "./ItemCard";

interface ItemsContainerProps {
  products: ClothingProduct[];
  handleAdjustQuantity: (id: number, delta: number) => void;
  handleAddToCart: (id: number) => void;
}

export default function ItemsContainer({
  products,
  handleAdjustQuantity,
  handleAddToCart,
}: ItemsContainerProps) {
  return (
    <div className="ItemsContainer">
      <h2>Product Catalogue</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {products.map((product) => (
          <ItemCard
            key={product.id}
            {...product}
            handleQuantityAdjust={(delta) => handleAdjustQuantity(product.id, delta)}
            handleAddToCart={() => handleAddToCart(product.id)}
          />
        ))}
      </div>
    </div>
  );
}