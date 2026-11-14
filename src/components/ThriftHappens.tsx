import { useState } from "react";
import type { ClothingProduct } from "../data/data";
import NavBar from "./NavBar";
import ItemsContainer from "./ItemsContainer";
import CheckoutContainer from "./CheckoutContainer";

interface ThriftHappensProps {
  data: ClothingProduct[];
}

export interface CheckoutItem {
  id: number;
  product: ClothingProduct;
  quantity: number;
}

export default function ThriftHappens({ data }: ThriftHappensProps) {
  const [products, setProducts] = useState<ClothingProduct[]>(() =>
    data.map((item) => ({
      ...item,
      itemQuantity: 0,
    }))
  );

  const [cart, setCart] = useState<CheckoutItem[]>([]);

  const handleAdjustQuantity = (id: number, delta: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        if (p.id === id) {
          const newQty = p.itemQuantity + delta;
          const clampedQty = Math.max(0, Math.min(newQty, p.quantity));
          return { ...p, itemQuantity: clampedQty };
        }
        return { ...p };
      })
    );
  };

  const handleAddToCart = (id: number) => {
    const targetProduct = products.find((p) => p.id === id);
    if (!targetProduct || targetProduct.itemQuantity <= 0) return;

    const qtyToAdd = targetProduct.itemQuantity;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === id);
      if (existingIndex > -1) {
        return prevCart.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : { ...item }
        );
      } else {
        return [...prevCart, { id, product: targetProduct, quantity: qtyToAdd }];
      }
    });

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === id
          ? { ...p, quantity: p.quantity - qtyToAdd, itemQuantity: 0 }
          : { ...p }
      )
    );
  };

  const handleRemoveFromCheckout = (id: number) => {
    const cartItem = cart.find((item) => item.product.id === id);
    if (!cartItem) return;

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + cartItem.quantity } : { ...p }
      )
    );

    setCart((prevCart) => prevCart.filter((item) => item.product.id !== id));
  };

  const handleEmptyCheckout = () => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const cartItem = cart.find((item) => item.product.id === p.id);
        return cartItem ? { ...p, quantity: p.quantity + cartItem.quantity } : { ...p };
      })
    );
    setCart([]);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="ThriftHappens">
      <NavBar cartItemCount={totalCartItems} />
      <div style={{ display: "flex", gap: "2rem", padding: "1rem" }}>
        <div style={{ flex: 2 }}>
          <ItemsContainer
            products={products}
            handleAdjustQuantity={handleAdjustQuantity}
            handleAddToCart={handleAddToCart}
          />
        </div>
        <div style={{ flex: 1 }}>
          <CheckoutContainer
            cartData={cart}
            handleRemove={handleRemoveFromCheckout}
            handleEmptyCheckout={handleEmptyCheckout}
          />
        </div>
      </div>
    </div>
  );
}