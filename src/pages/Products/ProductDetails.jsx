import axios from "axios";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../../func/context/ProductContext";

const ProductDetails = () => {
  const [productData, setProductData] = useState({});
  const [relatedProducts, setRelatedProducts] = useState(null);
  const { id, category } = useParams();
  const { Catgory } = useProduct();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        setProductData(response.data.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const product = productData;

  return (
    <div className="mx-12 my-10">
      {product ? (
        <div className="relative block overflow-hidden">
          <button className="absolute top-4 right-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
            <span className="sr-only">Wishlist</span>
            <i className="fa-solid fa-heart fa-2xl" />
          </button>
          <img
            src={product.imageCover}
            alt={product.title}
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
          />

          <div className="relative border border-gray-100 bg-white p-6">
            <span className="bg-yellow-400 px-3 py-1.5 text-xs font-medium whitespace-nowrap">
              New
            </span>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{product.title}</h3>
                <p className="mt-1.5 text-sm text-gray-700 max-w-2xl">{product.description}</p>
                <p className="mt-1.5 text-sm text-gray-700">{product.price} EGP</p>
              </div>
              <div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Quantity: {product.quantity}</h3>
              </div>
            </div>

            <form className="mt-4">
              <button className="block w-full rounded-sm bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105">
                Add to Cart
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Spinner color="pink" aria-label="Pink spinner example" />

      )}
    </div>
  );
};

export default ProductDetails;
