// utils/api.ts
import { APIRequestContext } from '@playwright/test';

const BASE_URL = 'https://automation-portal-bootcamp.vercel.app/api/user';
const authToken = 'mi-token-super-secreto'; // si tu API lo requiere

// Buscar usuario por email
export async function getUserByEmail(request: APIRequestContext, email: string) {
  const response = await request.get(`${BASE_URL}?email=${email}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  if (!response.ok()) {
    console.warn(`❌ No se pudo obtener el usuario: ${email}`);
    return null;
  }

  return await response.json();
}

// Eliminar usuario por id
export async function deleteUserById(request: APIRequestContext, id: string) {
  const response = await request.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return response.ok();
}
