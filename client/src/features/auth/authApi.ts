import { baseApi } from '@/app/api';
import { clearAuth, setAuth } from './authSlice';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        data: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuth({token:data.accessToken,role:data.role})); 
        } catch {
          // Handle errors
        }
      },
    }),
    logout: build.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearAuth());
        } catch {
          // Handle errors
        }
      },
    }),
    register: build.mutation({
      query: (newUser) => ({
        url: '/auth/register-user',
        method: 'POST',
        data: newUser,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuth(data)); 
        } catch {
          // Handle errors
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = authApi;
