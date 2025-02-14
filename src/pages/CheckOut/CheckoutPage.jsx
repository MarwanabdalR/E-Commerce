import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const [shippingAddress, setShippingAddress] = useState({
    details: "",
    phone: "",
    city: "",
  });

  const token = localStorage.getItem("token");

  const handleCreateOrder = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/orders/",
        { shippingAddress },
        { headers: { token} }
      );

      toast.success("Order created successfully!");
      setShippingAddress({ details: "", phone: "", city: "" }); 
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-md bg-white shadow-md rounded-lg p-6 w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Order</h2>

        <form onSubmit={handleCreateOrder} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Address Details</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
              value={shippingAddress.details}
              onChange={(e) => setShippingAddress({ ...shippingAddress, details: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
              value={shippingAddress.phone}
              onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
              value={shippingAddress.city}
              onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Create Order
          </button>
        </form>
      </div>
    </div>
  );
}
