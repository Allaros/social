import { api } from '@/shared/api/axios';

export enum VerificationType {
   EMAIL = 'email',
   MAGIC_LINK = 'magic_link',
   PASSWORD_RESET = 'password_reset',
}

export const authApi = {
   registration: async (userData: ISignUp) => {
      const { data } = await api.post('auth/sign-up', userData);

      return data;
   },
   authorization: async (loginData: ISignIn) => {
      const { data } = await api.post('auth/sign-in', loginData);
      return data;
   },
   sendMagicMail: async (userData: ISendEmail) => {
      const { data } = await api.post('auth/magic', userData);
      return data;
   },
   confirmMagic: async (userData: IConfirmMagic) => {
      const { data } = await api.post('auth/magic/confirm', userData);
      return data;
   },
   verification: async (code: IVerify) => {
      const { data } = await api.put('auth/verify', code);
      return data;
   },
   sendVerificationCode: async () => {
      const { data } = await api.post(`auth/send/${VerificationType.EMAIL}`);

      return data;
   },
   sendPasswordChangeMail: async (userData: ISendEmail) => {
      const { data } = await api.post(
         `auth/send/${VerificationType.PASSWORD_RESET}`,
         userData
      );
      return data;
   },
   changePass: async (userData: IChangePass) => {
      const { data } = await api.post(`auth/change-password`, userData);
      return data;
   },
   me: async () => {
      const { data } = await api.get('auth/me');
      return data;
   },
   logout: async () => {
      await api.post('auth/logout');
   },
   logoutAll: async () => {
      await api.post('auth/logout-all');
   },
};
