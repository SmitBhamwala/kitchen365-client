import { Product } from "@/types/product";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onDelete?: (id: string) => Promise<void>;
  showActions?: boolean;
}

export default function ProductCard({
  product,
  onDelete,
  showActions = false
}: ProductCardProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;

    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        setDeleting(true);
        await onDelete(product.id);
      } catch (error) {
        // Error handled in the hook
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <span className="text-xl font-bold text-green-600">
          Rs. {product.price}
        </span>
      </div>

      {product.description && (
        <p className="text-gray-600 mb-4">{product.description}</p>
      )}

      <div className="flex justify-between items-center">
        
        {showActions && onDelete && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            {deleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    </div>
  );
}
