import React, { useState } from "react";

const initialProducts = [
  {
    id: 1,
    name: "Fortune Rice Bran Oil",
    image: "https://via.placeholder.com/150",
    mrp: 200,
    discountMrp: 160,
  },
  {
    id: 2,
    name: "Aashirvaad Atta 5kg",
    image: "https://via.placeholder.com/150",
    mrp: 300,
    discountMrp: 250,
  },
];

export default function Store() {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const placeOrder = () => {
    if (customer.name && customer.phone && customer.address && cart.length > 0) {
      console.log("New Order:", { customer, cart });
      setOrderPlaced(true);
      setCart([]);
      setCustomer({ name: "", phone: "", address: "" });
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h1>Shop24</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {initialProducts.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
            <img src={product.image} alt={product.name} style={{ width: "100%" }} />
            <h2>{product.name}</h2>
            <p style={{ textDecoration: "line-through" }}>MRP: ₹{product.mrp}</p>
            <p style={{ color: "green" }}>Offer: ₹{product.discountMrp}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>Your Cart</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>{item.name} - ₹{item.discountMrp}</li>
            ))}
          </ul>
          <div style={{ marginTop: "20px" }}>
            <input
              placeholder="Your Name"
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              style={{ display: "block", marginBottom: "10px", width: "100%" }}
            />
            <input
              placeholder="Mobile Number"
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              style={{ display: "block", marginBottom: "10px", width: "100%" }}
            />
            <textarea
              placeholder="Address"
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              style={{ display: "block", marginBottom: "10px", width: "100%" }}
            />
            <button onClick={placeOrder}>Place Order</button>
          </div>
        </div>
      )}

      {orderPlaced && <div style={{ marginTop: "20px", color: "green" }}>Order placed successfully!</div>}
    </div>
  );
}