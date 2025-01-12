import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {User} from "./types/User.ts";

export const collaboratorApi = createApi({
    reducerPath: 'collaboratorApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'http://127.0.0.1:8000/'
        }
    ),
    endpoints: (builder) => ({
        getCollaborators: builder.query<User[], void>({
            query: () => `collaborators`,
        }),
        createCollaborator: builder.mutation<void, Partial<User>>({
            query: (newCollaborator) => ({
                url: 'collaborators',
                method: 'POST',
                body: newCollaborator,
            }),
        }),
    }),
})

export const {useGetCollaboratorsQuery, useCreateCollaboratorMutation} = collaboratorApi