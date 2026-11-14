import type { ClothingProduct } from "../data/data";

interface CheckoutCardProps {
  product: ClothingProduct;
  quantity: number;
  onRemove: () => void;
}

export default function CheckoutCard({
  product,
  quantity,
  onRemove,
}: CheckoutCardProps) {
  const subtotal = product.price * quantity;

  return (
    <div
      className="CheckoutCard"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        borderBottom: "1px solid #eee",
        paddingBottom: "0.5rem",
      }}
    >
      <img src={product.image} 
      alt={product.name} 
      style={{ width: "50px", 
               height: "50px", 
               objectFit: "cover", 
               borderRadius: "4px" }} />

      <div style={{ flex: 1 }}>
        <h4 style={{ margin: 0 }}>
            {product.name}</h4>

        <p style={{ fontSize: "0.85rem", 
                    margin: "0.2rem 0" }}>
          {product.size} | ${product.price.toFixed(2)} * {quantity}
        </p>
        <p style={{ fontSize: "0.85rem", 
                    fontWeight: "bold", 
                    margin: 0 }}>
          Subtotal: ${subtotal.toFixed(2)}
        </p>
      </div>
      <button
        onClick={onRemove}
        style={{
          background: "#ff4d4d",
          color: "#fff",
          border: "none",
          padding: "0.3rem 0.6rem",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Remove
      </button>
    </div>
  );
}