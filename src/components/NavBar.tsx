interface NavBarProps {
  cartItemCount: number;
}

export default function NavBar({ cartItemCount }: NavBarProps) {
  return (
    <nav className="NavBar" style={
        { padding: "1rem",
         background: "#f8f9fa",
          borderBottom: "1px solid #e2e8ed" }}>
      <h2>Thrift Happens</h2>
      <p>Browse second-hand clothing and manage your cart. Items in cart: 
        <strong>{cartItemCount}</strong>
      </p>
    </nav>
  );
}