import { AuthResponse, LoginDto, SignupDto } from "@/types/auth";
import { CreateProductDto, Product } from "@/types/product";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Add request interceptor for JWT token
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove("token");
      Cookies.remove("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  // Login user
  login: async (credentials: LoginDto): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  // Register user
  signup: async (userData: SignupDto): Promise<AuthResponse> => {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  }
};

export const productApi = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    const response = await api.get("/products");
    return response.data.data;
  },

  // Create a new product
  createProduct: async (product: CreateProductDto): Promise<Product> => {
    const response = await api.post("/products", product);
    return response.data;
  },

  // Delete a product
  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  }
};

export default api;
