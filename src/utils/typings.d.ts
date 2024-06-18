export interface Product {
  id: string;
  title: string;
  amount: number;
  discount: number;
  description: string;
  image: string;
}

export interface User {
  id: string;
  email: string;
  fullname: string;
  role: string;
  token: string;
}
