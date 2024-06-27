export interface Product {
  id: string;
  name: string;
  images: ProductImages[];
  price: number | undefined;
  discount: number | undefined;
  description: string;
  quantity: number;
  userId: string | null;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  token: string;
  refreshToken: string;
  username: string;
}

export interface ProductResponse {
  isLoading: boolean;
  error: string;
  data: DataAndPagination;
}
export interface PResponse {
  isLoading: boolean;
  error: string;
  data: Product;
}

export interface PaymentResponseData {
  isLoading: boolean;
  error: string;
  data: {
    access_code: string;
    authorization_url: string;
    reference: string;
  };
}

export interface DataAndPagination {
  products: Product[];
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  page: number;
  productPerPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

interface ProductImages {
  url: string;
  public_id: string;
}
