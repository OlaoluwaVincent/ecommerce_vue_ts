export interface Product {
  id: string;
  name: string;
  images: ProductImages[];
  price: number | undefined;
  discount: number | undefined;
  description: string;
  quantity: number;
  userId: string | null;
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
