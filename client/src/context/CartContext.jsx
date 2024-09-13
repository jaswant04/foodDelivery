import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './authContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchCart(user.id);
        } else {
            setCart([]);
        }
    }, [user]);

    const fetchCart = async (userId) => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/cart/view`, { withCredentials: true });
            if (!res.data.message) {
                setCart(res.data);
            } else {
                setCart([])
            }
        } catch (error) {
            console.error('Failed to fetch cart:', error.message);
            setCart([]);
        } finally {
            setIsLoading(false);
        }
    };

    const addToCart = async (itemId) => {
        if (!user) {
            console.error('User not authenticated');
            return;
        }

        const userId = user.id;
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/cart/add`, { userId, itemId }, { withCredentials: true });
            fetchCart(userId); // Refresh the cart after adding an item
            alert("Added to the cart")
        } catch (error) {
            console.error('Failed to add item to cart:', error.message);
        }
    };

    const updateCartQuantity = async (itemId, quantity) => {
        if (!user) {
            console.error('User not authenticated');
            return;
        }

        const userId = user.id;
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/cart/update`,
                { userId, itemId, quantity },
                { withCredentials: true }
            );
            fetchCart(userId); // Refresh the cart after updating quantity
        } catch (error) {
            console.error('Failed to update item quantity:', error.message);
        }
    };

    const removeFromCart = async (itemId) => {
        if (!user) {
            console.error('User not authenticated');
            return;
        }

        const userId = user.id;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/cart/remove`, {
                data: { userId, itemId }, // Axios delete with data requires `data` property
                withCredentials: true
            });
            fetchCart(userId); // Refresh the cart after removing an item
            alert("Removed from the cart")
        } catch (error) {
            console.error('Failed to remove item from cart:', error.message);
        }
    };



    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, updateCartQuantity, removeFromCart, isLoading }}>
            {children}
        </CartContext.Provider>
    );
};
