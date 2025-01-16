import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {User} from "./types/User.ts";

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
    }),
})

export const {
    useGetCollaboratorsQuery,
    useCreateCollaboratorMutation,
    useUploadCollaboratorMutation,
    useDeleteCollaboratorMutation
} = collaboratorApi