import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {AuthUser, JWTUser, SignUpUser, User} from "./types/User.ts";
import {setCredentials} from "../features/authSlice.ts";
import {AppDispatch} from "../app/store.ts";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const collaboratorApi = createApi({
    reducerPath: 'collaboratorApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'http://127.0.0.1:8000/api/'
        }
    ),
    tagTypes: ['Collaborator'],
    endpoints: (builder) => ({
        getCollaborators: builder.query<User[], void>({
            query: () => `collaborators`,
            providesTags: ['Collaborator']
        }),
        createCollaborator: builder.mutation<void, Partial<User>>({
            query: (newCollaborator) => ({
                url: 'collaborators',
                method: 'POST',
                body: newCollaborator,
            }),
            invalidatesTags: ['Collaborator'],
        }),
        uploadCollaborator: builder.mutation<User, Partial<User>>({
            query: (collaborator) => ({
                url: 'collaborators/' + collaborator.id,
                method: 'PUT',
                body: collaborator,
            }),
            invalidatesTags: ['Collaborator'],
        }),
        deleteCollaborator: builder.mutation<void, string>({
            query: (id) => ({
                url: 'collaborators/' + id,
                method: 'DELETE',
            }),
            invalidatesTags: ['Collaborator'],
        }),
        signUp: builder.mutation<JWTUser, SignUpUser>({
            query: (user) => ({
                url: 'signup/',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Collaborator'],
        }),
        signIn: builder.mutation<JWTUser, AuthUser>({
            query: (user) => ({
                url: 'auth/',
                method: 'POST',
                body: user
            }),
        }),
    }),
})

export const {
    useGetCollaboratorsQuery,
    useCreateCollaboratorMutation,
    useUploadCollaboratorMutation,
    useDeleteCollaboratorMutation,
    useSignUpMutation,
    useSignInMutation
} = collaboratorApi

export const handleSignIn = async (
    dispatch: AppDispatch,
    signIn: any,
    user: AuthUser,
    showToast: any
): Promise<boolean> => {
    try {
        const response = await signIn(user).unwrap();
        dispatch(setCredentials({ user: response.user, token: response.token }));
        localStorage.setItem('token', response.token);
        return true
        /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    } catch (err) {
        showToast("An error occurred on login", 'error');
        return false
    }
};

export const handleSignUp = async (
    dispatch: AppDispatch,
    signUp: any,
    user: SignUpUser,
    showToast: any
): Promise<boolean> => {
    try {
        const response = await signUp(user).unwrap();
        dispatch(setCredentials({ user: response.user, token: response.token }));
        localStorage.setItem('token', response.token);
        return true
        /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    } catch (err) {
        showToast("An error occurred on sign up", 'error');
        return false
    }
};