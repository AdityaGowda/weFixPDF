"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Logging in...");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid email or password");
      }

      toast.success("Login successful!", { id: loadingToast });
      
      // Redirect to dashboard/home after a short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error: any) {
      toast.error(error.message, { id: loadingToast });
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      
      {/* LEFT SIDE - BRAND / PRODUCT INFO */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-slate-700 via-blue-700 to-indigo-700 text-white p-12 items-center">
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            UrbanPro Daily <br /> Anomaly Monitor
          </h1>

          <p className="text-lg opacity-90">
            Monitor platform anomalies, detect unusual activity
          </p>

         
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN CARD */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-slate-100 p-6">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6 border border-slate-200">

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-slate-800">
              Login
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none pr-10 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full py-2 rounded-lg text-white font-medium bg-gradient-to-r from-blue-700 to-indigo-700 hover:opacity-90 transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center text-slate-500">
            Don’t have an account? {" "}
            <a href="/signup" className="text-blue-700 cursor-pointer hover:underline">
              SignUp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}