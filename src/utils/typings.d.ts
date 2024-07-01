export interface Product {
  id: string;
  name: string;
  images: ProductImages[];
  price: number;
  discount?: number;
  description: string;
  quantity: number;
  userId: string | null;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  token: string;
  refreshToken: string;
}

export interface UserDetails {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  updatedAt: Date;
}

export interface PaymentResponseData {
  access_code: string;
  authorization_url: string;
  reference: string;
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
export interface RequestResponseType<T> {
  isLoading: boolean;
  error: string;
  data: T;
}
export interface Contents {
  id: string;
}

export interface ProductsWithPagination {
  products: Contents[];
  pagination: Pagination;
}

export interface Order {
  id: string;
  productId: string;
  quantity: number;
  userId: string;
  deliveryStatus: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface OrdersWithPagination {
  orders: Contents[];
  pagination: Pagination;
}

export interface OrderWithProducts extends Order {
  product: Product;
}

export type ResponseData<T> = T;
