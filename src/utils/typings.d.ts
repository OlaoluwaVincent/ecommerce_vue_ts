export interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  quantity: number;
  description: string;
  images: ProductImages[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  token: string;
  username: string;
}

export interface ProductResponse {
  isLoading: boolean;
  error: string;
  data: Product[];
}

interface ProductImages {
  url: string;
  public_id: string;
}
