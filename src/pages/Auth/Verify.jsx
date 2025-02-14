import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Verify() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code.trim()) {
      toast.error("Please enter the verification code");
      return;
    }

    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode: code,
      });
      console.log("🚀 ~ handleSubmit ~ response:", response)

      toast.success("Code verified successfully!");

      
      navigate("/reset-password");
    } catch (error) {
      console.error("Verification failed:", error);
      toast.error(error.response?.data?.message || "Invalid verification code");
    }
  };

  return (
    <section className="bg-gradient-to-br from-red-900 to-slate-400">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Verification"
            src="https://img.freepik.com/premium-photo/wooden-clothes-hanger-pink-background-craft-bag-with-handles-place-text_418862-153.jpg?semt=ais_hybrid"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Verify Your Code
            </h1>

            <p className="mt-4 leading-relaxed text-black/80">
              Enter the verification code sent to your email.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  Code
                </label>

                <input
                  type="text"
                  id="code"
                  name="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                  required
                />
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
