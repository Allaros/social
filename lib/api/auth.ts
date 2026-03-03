import { api } from './axios';

export const authApi = {
   registration: async (userData: ISignUp) => {
      const { data } = await api.post('auth/sign-up', userData);

      return data;
   },
   authorization: async (loginData: ISignIn) => {
      const { data } = await api.post('auth/sign-in', loginData);
      return data;
   },
   googleOAuth: async () => {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}auth/google`;
   },

   verification: async (code: IVerify) => {
      const { data } = await api.put('auth/verify', code);
      return data;
   },
   resend: async () => {
      const { data } = await api.post('auth/resend');

      return data;
   },
   me: async () => {
      const { data } = await api.get('auth/me');
      return data;
   },
   logout: async () => {
      const { data } = await api.post('auth/logout');
      return data;
   },
};
