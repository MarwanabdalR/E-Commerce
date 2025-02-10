import { Card } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useProduct } from "../../func/context/ProductContext.jsx";

export default function Products() {
  const { products } = useProduct();
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    filterProducts(searchTerm);
  };

  const filterProducts = (searchTerm) => {
    const filteredProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.category.name.toLowerCase().includes(searchTerm) ||
        product.brand.name.toLowerCase().includes(searchTerm)
    );
    return filteredProducts;
  };

  return (
    <>
      <div className="bg-gradient-to-br from-red-900 to-slate-400">
        {/* Search Input */}
        <div className="max-w-screen-xl mx-auto pt-10 mb-5 px-4 sm:px-6 lg:px-8">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            name="search"
            id="search"
            className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
            placeholder="Search products..."
          />
        </div>

        {/* Products */}
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {filterProducts(searchTerm).map((product) => (
            <Card
              key={product._id}
              className="max-w-xs hover:scale-105 hover:shadow-lg hover:shadow-red-800/50 transition-all duration-500 mb-10"
              imgAlt={product.title}
              imgSrc={product.imageCover}
            >
              <Link to={`/product/${product._id}`}>
                <h6 className="font-light text-red-800 dark:text-white">
                  {product.category.name}
                </h6>
              </Link>
              <Link to={`/product/${product._id}`}>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {product.title}
                </h5>
              </Link>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {`${product.price} EGP`}
                </span>
                <Link
                  to={`/product/${product._id}`}
                  className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                  Add to cart
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

