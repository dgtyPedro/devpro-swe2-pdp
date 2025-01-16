import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Team} from "./types/Team.ts";

export const teamApi = createApi({
    reducerPath: 'teamApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'http://127.0.0.1:8000/api/'
        }
    ),
    tagTypes: ['Team'],
    endpoints: (builder) => ({
        getTeam: builder.query<Team, string | undefined>({
            query: (id: string | undefined) => `teams/${id}`,
            providesTags: ['Team']
        }),
        uploadTeam: builder.mutation<Team, Partial<Team>>({
            query: (team) => ({
                url: 'teams/' + team.id,
                method: 'PUT',
                body: team,
            }),
            invalidatesTags: ['Team']
        }),
        deleteTeam: builder.mutation<void, string>({
            query: (id) => ({
                url: 'teams/' + id,
                method: 'DELETE',
            }),
            invalidatesTags: ['Team']
        }),
    }),
})

export const {
    useGetTeamQuery,
    useUploadTeamMutation,
    useDeleteTeamMutation
} = teamApi