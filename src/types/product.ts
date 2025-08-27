export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface CreateProductDto {
  name: string;
  price: number;
  description?: string;
}
