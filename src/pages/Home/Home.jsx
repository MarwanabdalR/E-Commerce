import { Card, Carousel, Pagination, Spinner } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useProduct } from "../../func/context/ProductContext.jsx";
import { Link } from "react-router";
import { CartContext } from "../../func/context/CartContextProvider.jsx";
import { WishlistContext } from "../../func/context/WishlistCartContext.jsx";

export default function Home() {
  const {addCart} = useContext(CartContext);
  const { addProductToWishlist } = useContext(WishlistContext);
  
  const { products, Catgory } = useProduct();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterProducts(query);
  };

  const filterProducts = (query) => {
    const results = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.category.name.toLowerCase().includes(query) ||
        product.brand.name.toLowerCase().includes(query)
    );
    setFilteredProducts(results);
  };

  const handleBlur = () => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {products == null ? (
        <Spinner color="pink" aria-label="Pink spinner example" />
      ) : (
        <div className="bg-gradient-to-br from-red-900 to-slate-400">
          {/* First Section */}
          <section className="flex items-center">
            <div className="mx-auto px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
              <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
                  Let us find your
                  <strong className="block font-extrabold text-rose-500">
                    Fashion Style.
                  </strong>
                </h1>
                <p className="flex justify-center mt-4 max-w-lg text-white sm:text-xl/relaxed">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nesciunt illo tenetur fuga ducimus numquam ea!
                </p>
                <div className="mt-8 flex justify-center flex-wrap gap-4 text-center">
                  <Link
                    to="/products"
                    className="block w-full rounded-sm bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:ring-3 focus:outline-hidden sm:w-auto"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#"
                    className="block w-full rounded-sm bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow-sm hover:text-rose-700 focus:ring-3 focus:outline-hidden sm:w-auto"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/*  Carousel */}
          <Carousel
            leftControl=" "
            rightControl=" "
            pauseOnHover
            className="h-56 sm:h-64 xl:h-80 2xl:h-96 max-w-screen-xl mx-auto"
          >
            <div className="flex gap-4">
              {Catgory.map((category) => (
                <div
                  key={category._id}
                  className="flex gap-4 items-center justify-center w-48 p-2 bg-white rounded-lg shadow-md hover:shadow-lg"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-36 object-cover relative"
                  />
                  <span className="absolute text-xl overflow-hidden">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </Carousel>

          {/* Search Input */}
          <div className="max-w-screen-xl mx-auto mt-10 mb-5 px-4 sm:px-6 lg:px-8">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              onBlur={handleBlur}
              name="search"
              id="search"
              className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
              placeholder="Search products..."
            />
          </div>

          {/* Products */}
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <Card
                  key={product._id}
                  className="max-w-xs hover:scale-105 hover:shadow-lg hover:shadow-red-800/50 transition-all duration-500 mb-10"
                  imgAlt={product.title}
                  imgSrc={product.imageCover}
                >
                  <Link
                    to={`/ProductDetails/${product._id}/${product.category.name}`}
                  >
                    <div className="flex justify-between">

                    <h6 className="font-light text-red-600 dark:text-white hover:text-gray-900 transition-all duration-1000">
                      {product.category.name}
                    </h6>
                    </div>

                    <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                      {product.title}
                    </h5>
                  </Link>
                    <button onClick={() => addProductToWishlist(product._id)}>
                      <i className="fa-regular fa-heart fa-xl text-red-600  hover:scale-125 transation-all duration-1000"></i>
                    </button>
                  {product.priceAfterDiscount ? (
                    <i className="fa-solid fa-money-bill-wave fa-fade text-center text-red-500">
                      Sale
                    </i>
                    
                  ) : null}
                  <div className="flex items-center justify-between">
                    {product.priceAfterDiscount ? (
                      <>
                        <span className="text-sm font-bold  line-through text-red-500">
                          {`${product.price} EGP`}
                        </span>
                        <span className="text-sm font-bold text-green-500">
                          {`${product.priceAfterDiscount} EGP`}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900">
                        {`${product.price} EGP`}
                      </span>
                    )}

                      <Link href="#">
                        <button
                          onClick={() => addCart(product._id)}
                          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                        >
                          Add to cart
                        </button>
                      </Link>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-center col-span-full text-white">
                No products found.
              </p>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
            onPageChange={paginate}
            className="flex justify-center"
          />
        </div>
      )}
    </>
  );
}
