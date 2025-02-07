import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const ProductContext = createContext();
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [Catgory, setCatgory] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        setProducts(productResponse.data.data);
        console.log(productResponse.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchcategory = async () => {
      try {
        const catgoryResponse = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/categories"
        );
        setCatgory(catgoryResponse.data.data);
        console.log(catgoryResponse.data);
      } catch (error) {
        console.error("Error fetching catgory:", error);
      }
    };

    fetchcategory();
  }, []);

  return (
    <>
      <ProductContext.Provider value={{ products, Catgory }}>
        {children}
      </ProductContext.Provider>
    </>
  );
}

export function useApi() {
    return useContext(ProductContext);
  }
