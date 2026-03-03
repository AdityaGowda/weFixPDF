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

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error: any) {
      toast.error(error.message, { id: loadingToast });
      console.error("Login error:", error);
    }
  };

  return (
    <div></div>
  );
}
