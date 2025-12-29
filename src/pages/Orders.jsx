import { useEffect, useState} from "react";
import { getAllOrders } from "../api/courseApi.js";  
import OrderCard from "../components/OrderCard.jsx";  

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [error, setError] = useState("");

  // Load all orders from API
  async function loadOrders() {
    setLoadingList(true);
    setError("");
    try {
      const data = await getAllOrders(); 
      setOrders(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load orders");
    } finally {
      setLoadingList(false);
    }
  }

  useEffect(() => {
    loadOrders();  // Load orders when the component is mounted
  }, []);

  function printOrderDetails(order) {
    console.log(order); // Print the entire order object in console
  }

  return (
    <div className="container">
      <header className="header">
        <h1 style={{ margin: 0 }}>Orders</h1>
        <p className="muted" style={{ margin: 0 }}>
          Home loads from <code>GET /orders</code> • Use the search box to filter by order ID or amount paid.
        </p>
      </header>

      <div className="grid">
        

        <section style={{ minWidth: 0 }}>
          <h2 style={{ marginTop: 0 }}>All Orders</h2>

          {loadingList ? (
            <div>Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="muted">No orders found.</div>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {/* Map through the filtered orders and display them using OrderCard */}
              {orders.map((order) => (
                <OrderCard
                  key={order.orderId}  // Use orderId for the key
                  order={order}         // Pass order as a prop to OrderCard
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
