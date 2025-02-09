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
          element: <Home />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/cart",
          element:<Cart />
        },
        {
          path: "/wishlist",
          element:<WishList />
        },
        {
          path: "/categories",
          element:<Categories />
        },
        {
          path: "/brands",
          element:<Brands />
        },
        {
          path: "*",
          element: <NotFound />,
        }
      ],
    },
  ]);

  return (
    <>
      <AuthProvider>
        <ProductProvider>
          <Toaster position="top-right" reverseOrder={true} />
          <RouterProvider router={router} />
        </ProductProvider>
      </AuthProvider>
    </>
  );
}

export default App;
