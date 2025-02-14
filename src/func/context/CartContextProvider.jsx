import axios from 'axios';
import { createContext, useState } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [cartProducts, setCartProducts] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    
    const token = localStorage.getItem('token');

    async function addCart(productId) {
        await axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId },
            {
                headers: {
                    'token': token
                }
            }
        ).then((res) => {
            console.log(res);
            toast.success(res.data.message);
            getUserCart();
        }).catch((err) => {
            console.log(err);
            toast.error(err.response?.data?.message || "Something went wrong");
        });
    }

    async function getUserCart() {
        await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: {
                'token': token
            }
        }).then((res) => {

            setNumOfCartItems(res.data.numOfCartItems || res.data.cart?.numOfCartItems || 0);
            setTotalCartPrice(res.data.data?.totalCartPrice || res.data.cart?.totalCartPrice || 0);
            setCartProducts(res.data.data?.products || res.data.cart?.products || []);
        }).catch((err) => {
            console.log(err);
        });
    }

    function deleteItem(Id) {
        axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${Id}`, {
            headers: {
                'token': token
            }
        }).then((res) => {
            console.log(res);
            toast.success("Item removed successfully");
            getUserCart();
        }).catch((err) => {
            console.log(err);
            toast.error("Failed to remove item");
        });
    }

    async function deleteAllItems() {
        await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: {
                'token': token
            }
        }).then((res) => {
            console.log(res);
            toast.success("Cart cleared successfully");
            getUserCart();
        }).catch((err) => {
            console.log(err);
            toast.error("Failed to clear cart");
        });
    }

    async function updateCartItem(productId, count) {
        setIsUpdating(true);
        await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { count },
            {
                headers: { 'token': token }
            }
        ).then((res) => {
            console.log("Cart Updated:", res.data);

            // Update state directly instead of waiting for getUserCart()
            setCartProducts(prevProducts =>
                prevProducts.map(product =>
                    product._id === productId ? { ...product, count } : product
                )
            );
        }).catch((err) => {
            console.log("Error updating cart:", err);
            toast.error("Error updating cart item");
        }).finally(() => {
            setIsUpdating(false);
        });
    }

    return (
        <CartContext.Provider value={{ addCart, getUserCart, cartProducts, totalCartPrice, numOfCartItems, deleteItem, updateCartItem, isUpdating, deleteAllItems }}>
            {children}
        </CartContext.Provider>
    );
}
