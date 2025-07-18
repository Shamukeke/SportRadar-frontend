import axiosInstance from './axiosInstance';

export const signupCompany = (data: any) =>
    axiosInstance.post('/companies/signup/', data);

export const inviteEmployee = (email: string) =>
    axiosInstance.post('/invitations/', { email });

export const acceptInvite = (payload: any) =>
    axiosInstance.post('/accept-invite/', payload);

// ← Ajout fetchPlans
export const fetchPlans = () =>
    axiosInstance.get<{
        id: string;
        name: string;
        price: string;
        billing_period: string;
    }[]>('/plans/');
