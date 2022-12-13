import { axiosInstance } from '..';
import { adminLoginPayload } from '../../types';

// admin login
export const apiAdminLogin = ({ email, pw }: adminLoginPayload) =>
  axiosInstance.post(`/admin/auth/login`, { email, pw });

// admin logout
export const apiAdminLogout = () => axiosInstance.post(`/admin/auth/logout`);

// admin refresh
export const apiAdminRefresh = () => axiosInstance.post(`/admin/auth/refresh`);
