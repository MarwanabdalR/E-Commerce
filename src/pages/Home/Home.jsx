import { Card, Carousel } from "flowbite-react";
import { useApi } from "../../func/context/ProductContext.jsx";

export default function Home() {
  const { products, Catgory } = useApi();
  return (
    <>
      <div className="bg-gradient-to-br from-red-900 to-slate-400 py-24">
        <Carousel leftControl=" " rightControl=" " pauseOnHover className="py-10 h-56 sm:h-64 xl:h-80 2xl:h-96 max-w-screen-xl mx-auto">
          <div className="flex gap-4">
          {Catgory.map((category) => (

            <div 
            key={category._id} 
            className="flex gap-4 items-center justify-center w-48 p-2 bg-white rounded-lg shadow-md hover:shadow-lg">
              <img src={category.image} alt={category.name} className="h-36 object-cover relative" />
              <span className="absolute text-xl overflow-hidden">{category.name}</span>
            </div>
          ))}
          
          </div>
        </Carousel>

        {/*


       here is productssssssssss 
      
      
       
       */}
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {products.map((product) => (
            <Card
              key={product._id}
              className="max-w-xs hover:scale-105 hover:shadow-lg hover:shadow-red-800/50 hover:shadow-lg hover:shadow-red-800/50 transition-all duration-500"
              imgAlt={product.title}
              imgSrc={product.imageCover}
            >
              <a href="#">
                <h6 className="font-light text-red-800 dark:text-white">
                  {product.category.name}
                </h6>
              </a>
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {product.title}
                </h5>
              </a>
              <div className="mb-5 mt-2.5 flex justify-between items-center">
                <span className="rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                  {product.brand.name}
                </span>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                    {product.ratingsAverage}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {`${product.price} EGP`}
                </span>
                <a
                  href="#"
                  className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                  Add to cart
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
