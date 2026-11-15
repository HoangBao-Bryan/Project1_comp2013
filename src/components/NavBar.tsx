interface NavBarProps {
  cartItemCount: number;
}

export default function NavBar({ cartItemCount }: NavBarProps) {
  return (
    <nav className="NavBar" style={
        { padding: "1rem",
         background: "#ffffff",
          borderBottom: "1px solid #dbe3e9" }}>
      <h2>Thrift Happens</h2>
      <p>Browse second-hand clothing and manage your cart. Items in cart: 
        <strong>{cartItemCount}</strong>
      </p>
    </nav>
  );
}