import type { CheckoutItem } from "./ThriftHappens";
import CheckoutCard from "./CheckoutCard";

interface CheckoutContainerProps {
  cartData: CheckoutItem[];
  handleRemove: (id: number) => void;
  handleEmptyCheckout: () => void;
}

export default function CheckoutContainer({
  cartData,
  handleRemove,
  handleEmptyCheckout,
}: CheckoutContainerProps) {
  const grandTotal = cartData.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div
      className="CheckoutContainer"
      style={{
        border: "1px solid #dee2e6",
        padding: "1rem",
        borderRadius: "8px",
        background: "#fdfdfe",
      }}
    >
      <h2>Checkout Cart</h2>
      {cartData.length === 0 ? (
        <p>Cart Empty</p>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {cartData.map((item) => (
              <CheckoutCard
                key={item.product.id}
                {...item}
                onRemove={() => handleRemove(item.product.id)}
              />
            ))}
          </div>
          <hr style={{ margin: "1rem 0" }} />
          <h3>Grand Total: ${grandTotal.toFixed(2)} CAD</h3>
          <button
            onClick={handleEmptyCheckout}
            style={{
              width: "100%",
              padding: "0.5rem",
              background: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Empty Checkout
          </button>
        </>
      )}
    </div>
  );
}