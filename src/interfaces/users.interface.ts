export interface User {
  id?: string;
  email?: string;
  password: string;
  type: 'corporate' | 'provider' | 'visitor'
}
