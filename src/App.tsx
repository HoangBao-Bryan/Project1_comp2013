import ThriftHappens from "./components/ThriftHappens";
import { products } from "./data/data";

export default function App() {
  return (
    <div className="App">
      <ThriftHappens data={products} />
    </div>
  );
}
