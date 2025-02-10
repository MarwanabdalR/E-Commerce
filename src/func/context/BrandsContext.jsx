import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const BrandsContext = createContext();

export function BrandsProvider({ children }) {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
                setBrands(response.data.data);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };

        fetchBrands();
    }, []);

    return (
        <BrandsContext.Provider value={{ brands }}>
            {children}
        </BrandsContext.Provider>
    );
}
export function useBrands() {
    return useContext(BrandsContext);
}
