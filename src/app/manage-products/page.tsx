"use client";

import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import ProtectedRoute from "@/components/ProtectedRoute";
import SearchFilter from "@/components/SearchFilter";
import { useProducts } from "@/hooks/useProducts";
import { useMemo, useState } from "react";

export default function ManageProductsPage() {
  const { products, loading, addProduct, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ??
          false)
    );
  }, [products, searchTerm]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Manage Products
            </h1>
            <p className="text-gray-600">
              Add new products and manage your inventory
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Product Form */}
            <div className="lg:col-span-1">
              <ProductForm onSubmit={addProduct} />
            </div>

            {/* Products List */}
            <div className="lg:col-span-2">
              <SearchFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Products ({filteredProducts.length})
                </h2>
              </div>

              <ProductList
                products={filteredProducts}
                loading={loading}
                onDelete={deleteProduct}
                showActions={true}
              />
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
