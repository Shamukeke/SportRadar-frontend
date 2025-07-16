import axiosInstance from './axiosInstance';
export const fetchPlans = () => axiosInstance.get('/plans/');
export const signupCompany = data => axiosInstance.post('/companies/signup/', data);
export const inviteEmployee = email => axiosInstance.post('/invitations/', { email });
export const acceptInvite = payload => axiosInstance.post('/accept-invite/', payload);
