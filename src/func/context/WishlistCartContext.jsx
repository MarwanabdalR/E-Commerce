import axios from "axios";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export const WishlistContextProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistItemCount, setWishlistItemCount] = useState(0);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);

  const token = localStorage.getItem("token");

  const getWishlist = async () => {
    setIsUpdatingWishlist(true);
    try {
      const response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token },
      });


      setWishlist(response.data.data || []); 
      setWishlistItemCount(response.data.count || 0); 
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    } finally {
      setIsUpdatingWishlist(false);
    }
  };

  const addProductToWishlist = async (productId) => {
    setIsUpdatingWishlist(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers: { token } }
      );

      toast.success(response.data.message);
      getWishlist(); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsUpdatingWishlist(false);
    }
  };

  const removeProductFromWishlist = async (id) => {
    setIsUpdatingWishlist(true);
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: { token },
      });
      toast.success("Item removed successfully");
      getWishlist(); 
    } catch (error) {
      toast.error("Failed to remove item:");
    } finally {
      setIsUpdatingWishlist(false);
    }
  };


  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistItemCount,
        isUpdatingWishlist,
        getWishlist,
        addProductToWishlist,
        removeProductFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
