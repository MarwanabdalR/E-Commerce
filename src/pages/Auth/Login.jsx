import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../func/context/AuthContext.jsx";
import { useContext } from "react";

export default function Login() {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must be at least 8 characters, include uppercase and lowercase letters, a number, and a special character"
        )
        .max(20, "Password must be at most 20 characters"),
    }),
    onSubmit: async (values) => {
      try {
        const AuthRespone = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
        toast.success("Login successful!");
        console.log("AuthRespone:", AuthRespone);
        localStorage.setItem("token", AuthRespone.data.token);
        navigate("/home", { state: { isLoggedIn: true } });
        login(AuthRespone.data.token);
      } catch (error) {
        console.error("Login failed:", error);
        alert(error.AuthRespone?.data?.message || "Login failed.");
      }
    },
  });

  return (
    <>
      <section className="bg-gradient-to-br from-red-900 to-slate-400">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://img.freepik.com/premium-photo/wooden-clothes-hanger-pink-background-craft-bag-with-handles-place-text_418862-153.jpg?semt=ais_hybrid"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to E-commerce
              </h1>

              <p className="mt-4 leading-relaxed text-black/80">
                What you wear is how you present yourself to the world,
                especially today, when human communication is so fast. Fashion
                is an instant language. Fashion is the armor to survive the
                reality of everyday life.
              </p>

              <form onSubmit={formik.handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Email{" "}
                  </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                  ) : (
                    formik.touched.email && (
                      <div className="text-green-500">
                        {formik.errors.email}
                      </div>
                    )
                  )}
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Password{" "}
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500">{formik.errors.password}</div>
                  ) : (
                    formik.touched.password && (
                      <div className="text-green-500">
                        {formik.errors.password}
                      </div>
                    )
                  )}
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden">
                    Log In
                  </button>

                  <p className="mt-4 text-sm text-black sm:mt-0">
                    Forget your password?
                    <Link to="#" className="text-blue-700 underline">
                      press here
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
