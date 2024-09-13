import React, { useEffect } from 'react';
import { useOrder } from '../context/orderContext';
import { useAuth } from '../context/authContext';

const Order = () => {
    const { orders, fetchOrders, setOrders, isLoading, error } = useOrder();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchOrders(user.id);
        } else {
            setOrders([]);
        }
    }, [user]);


    if (isLoading) {
        return <div>Loading orders...</div>;
    }

    if (error) {
        return <div>Error fetching orders: {error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Your Orders</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                {orders.length === 0 ? (
                    <p className="text-gray-600">No orders found.</p>
                ) : (
                    <ul className="space-y-4">
                        {orders.map((order) => (
                            <li key={order._id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <h2 className="text-xl font-semibold text-gray-800">Order ID: {order._id}</h2>
                                <p className="text-gray-600 text-sm">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                                <p className="text-gray-600 text-sm">Total Amount: ₹{order.totalAmount.toFixed(2)}</p>
                                <p className="text-gray-600 text-sm" >Status: {order.isDelivered ? "Delivered" : "Processing"}</p>
                                <h3 className="text-lg font-medium text-gray-700 mt-4">Items:</h3>
                                <ul className="space-y-2 mt-2">
                                    {order.items.map((item) => (
                                        <li key={item.item._id} className="border border-gray-300 rounded-md p-2 bg-gray-100 flex items-start">
                                            <img
                                                src={item.item.img}
                                                alt={item.item.name}
                                                className="w-16 h-16 object-cover rounded-md mr-4"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-800">{item.item.name}</p>
                                                <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                                                <p className="text-gray-600 text-sm">Price: ₹{item.item.price.toFixed(2)}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <hr className="my-4 border-gray-300" />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Order;
