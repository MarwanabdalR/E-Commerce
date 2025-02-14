import { Button, Card } from "flowbite-react";
import { useContext, useEffect } from "react";
import { WishlistContext } from "../../func/context/WishlistCartContext";
import { CartContext } from "../../func/context/CartContextProvider";

export default function WishList() {
  const { wishlist, getWishlist, removeProductFromWishlist } = useContext(WishlistContext);
  console.log("🚀 ~ WishList ~ wishlist:", wishlist)
  const {addCart} = useContext(CartContext);
  
  useEffect(() => {
    getWishlist(); 
  }, []);

  return (
    <div className="container text-center mx-auto px-4 py-10 md:px-10 lg:px-20">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white text-center mb-10">
        WishList
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10">
        {wishlist.length > 0 ? (
          wishlist.map(({ id, title, price, imageCover, ratingsAverage, priceAfterDiscount }) => (
            <Card key={id} className="max-w-sm flex flex-col items-center" imgAlt={title} imgSrc={imageCover}>
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {title}
              </h5>
              <div className="flex justify-between items-center">
                <div className="flex">
                <svg
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                  {ratingsAverage}
                </span>
                </div>
                <Button onClick={() => removeProductFromWishlist(wishlist.id)} color="red" className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500 text-white hover:bg-red-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
              </div>
              <div className="flex items-center justify-between ">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${priceAfterDiscount || price}
                </span>
                <button onClick={() => addCart(wishlist._id)} className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                  Add to cart
                </button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-300 w-full">
            Your wishlist is empty.
          </p>
        )}
      </div>
    </div>
  );
}

