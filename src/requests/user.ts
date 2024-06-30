import { handleRequest, handleSubmit } from './axios';
import type { Contents, User, UserDetails } from '@/utils/typings';

interface RegisterUserType {
  fullname: string;
  email: string;
  username: string;
  password: string;
}

// Specific API calls using the wrappers
async function getAllUsers() {
  return await handleRequest<Contents[]>('get', 'users');
}

async function getUser(id: string) {
  return await handleRequest<UserDetails>('get', `users/${id}`);
}

async function createUser(data: RegisterUserType) {
  return await handleSubmit<string>('post', 'users/register', data);
}
async function loginUser(data: { username: string; password: string }) {
  return await handleSubmit<User>('post', 'users/login', data);
}

async function updateUser(
  data: { username: string; name: string },
  id: string
) {
  return await handleSubmit<string>('put', `users/${id}`, data);
}

async function updateUserPassword(
  data: { username: string; name: string },
  id: string
) {
  return await handleSubmit<string>('put', `users/change-password/${id}`, data);
}

async function deleteUser(id: string) {
  return await handleRequest<string>('delete', `products/${id}`);
}

export {
  getAllUsers,
  getUser,
  createUser,
  loginUser,
  updateUser,
  updateUserPassword,
  deleteUser,
};
