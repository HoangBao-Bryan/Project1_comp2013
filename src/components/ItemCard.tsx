import type { ClothingProduct } from "../data/data";

interface ItemCardProps extends ClothingProduct {
  handleQuantityAdjust: (delta: number) => void;
  handleAddToCart: () => void;
}

export default function ItemCard({
  image,
  name,
  fit,
  category,
  color,
  description,
  size,
  price,
  quantity,
  itemQuantity,
  handleQuantityAdjust,
  handleAddToCart,
}: ItemCardProps) {
  const isOutOfStock = quantity === 0;

  return (
    <div
      className="ItemCard"
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        background: "#fff",
      }}
    >
      <img src={image} alt={name} style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "4px" }} />
      <h3>{name}</h3>
      <p style={{ fontSize: "0.85rem", color: "#666" }}>{description}</p>
      <p><strong>Fit:</strong> {fit} | <strong>Category:</strong> {category}</p>
      <p><strong>Size:</strong> {size} | <strong>Color:</strong> {color}</p>
      <p><strong>Price:</strong> ${price.toFixed(2)} CAD</p>
      <p><strong>Remaining Stock:</strong> {quantity}</p>

      {isOutOfStock ? (
        <p style={{ color: "red", fontWeight: "bold" }}>Out of Stock</p>
      ) : (
        <div style={{ margin: "0.5rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button onClick={() => handleQuantityAdjust(-1)}>-</button>
          <span>{itemQuantity}</span>
          <button onClick={() => handleQuantityAdjust(1)}>+</button>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock || itemQuantity === 0}
        style={{
          width: "100%",
          marginTop: "0.5rem",
          padding: "0.4rem",
          background: isOutOfStock || itemQuantity === 0 ? "#d1caca" : "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: isOutOfStock || itemQuantity === 0 ? "not-allowed" : "pointer",
        }}
      >
        Add to Checkout
      </button>
    </div>
  );
}