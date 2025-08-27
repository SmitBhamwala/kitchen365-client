"use client";

import Link from "next/link";
import { useState } from "react";

interface AuthFormProps {
  type: "login" | "signup";
  onSubmit: (data: any) => Promise<void>;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSubmitting(true);
      await onSubmit(formData);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : String(error || "An unexpected error occurred. Please try again.");
      setErrors({
        form: message
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {type === "login"
              ? "Sign in to your account"
              : "Create your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {type === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up here
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in here
                </Link>
              </>
            )}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>
          {errors.form && (
            <p className="text-red-500 text-sm mt-1 text-center">
              {errors.form}
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white cursor-pointer bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting
                ? `${
                    type === "login" ? "Signing in..." : "Creating account..."
                  }`
                : `${type === "login" ? "Sign in" : "Sign up"}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
