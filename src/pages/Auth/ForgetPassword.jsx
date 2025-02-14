import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import * as Yup from "yup";

const ForgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function ForgetPassword() {
  const navigator = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgetPasswordSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values);
        console.log(res);
        toast.success("Password reset email sent");
        navigator("/verify");
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  });
  return (
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
              What you wear is how you present yourself to the world, especially
              today, when human communication is so fast. Fashion is an instant
              language. Fashion is the armor to survive the reality of everyday
              life.
            </p>

            <form
              onSubmit={formik.handleSubmit}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500">{formik.errors.email}</div>
                )}
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-green-600 focus:ring-3 focus:outline-hidden"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
