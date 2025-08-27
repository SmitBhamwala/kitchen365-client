import { Product } from "@/types/product";
import { CircleAlert } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";

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

    try {
      setDeleting(true);
      await onDelete(product.id);
    } catch (error) {
      // Error handled in the hook
      toast.error("Failed to delete product: " + error);
    } finally {
      setDeleting(false);
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
          <Dialog>
            <DialogTrigger>
              <div className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {deleting ? "Deleting..." : "Delete"}
              </div>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md">
              <DialogHeader>
                <DialogTitle>
                  <div className="flex items-center gap-3 mb-2">
                    <CircleAlert className="w-6 h-6 text-yellow-500" />
                    Delete Product
                  </div>
                </DialogTitle>
                <DialogDescription className="text-gray-600 mb-3 text-base">
                  Are you sure you want to delete this product?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild className="mr-1 cursor-pointer">
                  <button className="px-4 py-2 rounded-lg hover:bg-gray-100">
                    Cancel
                  </button>
                </DialogClose>

                <button
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                  onClick={handleDelete}>
                  Delete
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
