"use client";

import ProductList from "@/components/ProductList";
import SearchFilter from "@/components/SearchFilter";
import { useProducts } from "@/hooks/useProducts";
import { useMemo, useState } from "react";

export default function Home() {
  const { products, loading } = useProducts();
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
    <main className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Product Catalog
          </h1>
          <p className="text-gray-600">Browse our collection of products</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Products ({filteredProducts.length})
            </h2>
          </div>

          <ProductList
            products={filteredProducts}
            loading={loading}
            showActions={false}
          />
        </div>
      </div>
    </main>
  );
}
