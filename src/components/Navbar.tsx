"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg border-b sticky w-full z-10 top-0">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 hover:text-blue-600">
              Product Catalog
            </Link>

            <div className="hidden md:flex space-x-6">
              {isAuthenticated && (
                <Link
                  href="/manage-products"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Manage Products
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user?.email}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-2">
                <Link
                  href="/login"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium">
              Products
            </Link>

            {isAuthenticated && (
              <Link
                href="/manage-products"
                className="text-gray-700 hover:text-blue-600 font-medium">
                Manage
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
