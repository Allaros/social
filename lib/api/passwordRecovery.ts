import { api } from './axios';

export const passwordRecoveryApi = {
   sendRecoveryMail: async (userData: ISendRecoveryMail) => {
      const { data } = await api.post('password-recovery', userData);

      return data;
   },
   changePassword: async (userData: IChangePass) => {
      const { data } = await api.put(
         'password-recovery/new-password',
         userData
      );
      return data;
   },
};
