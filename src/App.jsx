import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout/Layout.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Home from "./pages/Home/Home.jsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./func/context/AuthContext.jsx";
import { ProductProvider } from "./func/context/ProductContext.jsx";
import Products from "./pages/Products/Products.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import WishList from "./pages/WishList/WishList.jsx";
import Categories from "./pages/Categories/Categories.jsx";
import Brands from "./pages/Brands/Brands.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import { BrandsProvider } from "./func/context/BrandsContext.jsx";
import ProtectedPath from "./pages/Auth/ProtectedPath.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/home",
          element: <ProtectedPath> <Home /> </ProtectedPath>,
        },
        {
          path: "/products",
          element: <ProtectedPath><Products /></ProtectedPath> ,
        },
        {
          path: "/ProductDetails/:id/:category",
          element: <ProtectedPath><ProductDetails /></ProtectedPath> ,
        },
        {
          path: "/cart",
          element: <ProtectedPath><Cart /></ProtectedPath>,
        },
        {
          path: "/wishlist",
          element: <ProtectedPath><WishList /></ProtectedPath>,
        },
        {
          path: "/categories",
          element: <ProtectedPath><Categories /></ProtectedPath>,
        },
        {
          path: "/brands",
          element: <ProtectedPath><Brands /></ProtectedPath>,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <>
      <AuthProvider>
        <ProductProvider>
          <BrandsProvider>
            <Toaster position="top-right" reverseOrder={true} />
            <RouterProvider router={router} />
          </BrandsProvider>
        </ProductProvider>
      </AuthProvider>
    </>
  );
}

export default App;
