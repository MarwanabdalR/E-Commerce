import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .max(20, "Name must be at most 20 characters")
        .required("Name is required"),
      phone: Yup.string()
        .required("phone is req")
        .matches(/^\d+$/, "Phone must contain only numbers")
        .min(10, "Name must be at least 10 characters")
        .max(12, "Name must be at most 12 characters"),
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
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords do not match")
        .required("Password confirmation is required"),
    }),
    onSubmit: (values) => {
      try {
        const response = axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          {
            name: values.name,
            email: values.email,
            password: values.password,
            rePassword: values.passwordConfirmation,
            phone: values.phone,
          }
        );
        console.log(response);
        toast.success('Successfully registered!');
        navigate("/home");
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    },
  });

  return (
    <div className="bg-gradient-to-br from-red-900 to-slate-400">
      <section className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <div className="relative flex h-32 items-center bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://www.freevector.com/uploads/vector/preview/28405/Classy-Fashion-Background.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to E-commerce
            </h2>

            <p className="mt-4 leading-relaxed text-white/70">
              What you wear is how you present yourself to the world, especially
              today, when human communication is so fast. Fashion is an instant
              language. Fashion is the armor to survive the reality of everyday
              life.
            </p>
          </div>
        </div>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <form
            onSubmit={formik.handleSubmit}
            className="max-w-xl grid grid-cols-6 gap-6"
          >
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black"
              >
                Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500">{formik.errors.name}</div>
              ) : (
                formik.touched.name && (
                  <div className="text-green-500">{formik.errors.name}</div>
                )
              )}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-black"
              >
                Phone
              </label>

              <input
                type="tel"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-500">{formik.errors.phone}</div>
              ) : (
                formik.touched.phone && (
                  <div className="text-green-500">{formik.errors.phone}</div>
                )
              )}
            </div>

            <div className="col-span-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
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
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : (
                formik.touched.email && (
                  <div className="text-green-500">{formik.errors.email}</div>
                )
              )}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>

              <input
                type="password"
                id="password"
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
                  <div className="text-green-500">{formik.errors.password}</div>
                )
              )}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="passwordConfirmation"
                className="block text-sm font-medium text-black"
              >
                Password Confirmation
              </label>

              <input
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                value={formik.values.passwordConfirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
              />
              {formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation ? (
                <div className="text-red-500">
                  {formik.errors.passwordConfirmation}
                </div>
              ) : (
                formik.touched.passwordConfirmation && (
                  <div className="text-green-500">
                    {formik.errors.passwordConfirmation}
                  </div>
                )
              )}
            </div>

            <div className="col-span-6">
              <p className="text-sm text-black">
                By creating an account, you agree to our
                <Link
                  to="/terms-and-conditions"
                  className="text-blue-600 underline"
                >
                  terms and conditions
                </Link>
                and
                <Link to="/privacy-policy" className="text-blue-600 underline">
                  privacy policy
                </Link>
                .
              </p>
            </div>

            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                type="submit"
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
              >
                Create an account
              </button>

              <p className="mt-4 text-sm text-black sm:mt-0">
                Already have an account?
                <Link to="/login" className="text-blue-600 underline">
                  Log in
                </Link>
                .
              </p>
            </div>
          </form>
        </main>
      </section>
    </div>
  );
}
