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
    }),
})

export const {useGetCollaboratorsQuery} = collaboratorApi