import { apiSlice } from './apiSlice';
const ADMIN_URL = '/api/admin';



export const AdminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({
              url: `${ADMIN_URL}/auth`,
              
              method: 'POST',
              body: data,
            }),
          }),

          logout: builder.mutation({
            query: () => ({
              url: `${ADMIN_URL}/logout`,
              method: 'POST',
            }),
          }) ,

          deleteUser : builder.mutation({
            query: (data) =>({
              url: `${ADMIN_URL}/deleteUser`,
              
              method: 'POST',
              body: data,
            }),
          }),




          adminUpdateUser : builder.mutation({
            query: (data) =>({
              url: `${ADMIN_URL}/editUser`,
              
              method: 'PUT',
              body: data,
            }),
          }),


          adminadduser: builder.mutation({
            query: (data) => ({
              url: `${ADMIN_URL}/adduser`,
              method: "POST",
              body: data,
       }),
      }),

    })
});


export const {useLogoutMutation,useAdminLoginMutation , useDeleteUserMutation , useAdminUpdateUserMutation , useAdminadduserMutation} = AdminApiSlice