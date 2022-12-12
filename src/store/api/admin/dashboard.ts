import { axiosInstance } from '..';

// get total user count
export const apiGetAdminUserCount = () => axiosInstance.get(`/admin/dashboard/user-count`);

// get total exchange key count
export const apiGetAdminExchangeCount = () => axiosInstance.get(`/admin/dashboard/exchange-count`);

// get user count by package
export const apiGetAdminPackageCount = () => axiosInstance.get(`/admin/dashboard/package-count`);
