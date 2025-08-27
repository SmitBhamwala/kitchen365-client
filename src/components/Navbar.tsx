"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg border-b sticky w-full z-10 top-0">
      <div className="container mx-auto px-4 lg:px-15">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm lg:text-xl font-bold text-gray-900 hover:text-blue-600">
              ASSIGNMENT
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex">
              {isAuthenticated && (
                <Link
                  href="/manage-products"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Manage
                </Link>
              )}
            </div>
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="bg-red-500 h-10 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
                Logout
              </button>
            ) : (
              <div className="flex justify-start items-center space-x-2 h-10">
                <Link
                  href="/login"
                  className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-gray-500 hidden lg:visible cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
