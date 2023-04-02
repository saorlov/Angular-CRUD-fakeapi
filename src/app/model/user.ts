export interface User {
  id: number | string,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string,
  updatedAt?: string
}

export interface LoginUser {
  email?: string | null,
  password?: string | null
}

