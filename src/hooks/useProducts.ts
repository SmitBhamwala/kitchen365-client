import { CreateProductDto, Product } from "@/types/product";
import { productApi } from "@/utils/api";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productApi.getProducts();

      setProducts(data);
      setError(null);
    } catch (error: unknown) {
      let message = "Failed to fetch products";

      if (error instanceof AxiosError && error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: CreateProductDto) => {
    try {
      const newProduct = await productApi.createProduct(product);
      setProducts((prev) => [...prev, newProduct]);
      toast.success("Product added successfully!");
      return newProduct;
    } catch (error: unknown) {
      let message = "Failed to add product";

      if (error instanceof AxiosError && error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
      throw new Error(message);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await productApi.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted successfully!");
    } catch (error: unknown) {
      let message = "Failed to delete product";

      if (error instanceof AxiosError && error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
      throw new Error(message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    addProduct,
    deleteProduct,
    refetch: fetchProducts
  };
};
