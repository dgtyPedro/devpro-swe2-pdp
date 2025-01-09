import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Team} from "./types/Team.ts";

export const teamApi = createApi({
    reducerPath: 'teamApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'http://127.0.0.1:8000/'
        }
    ),
    endpoints: (builder) => ({
        getTeam: builder.query<Team, string | undefined>({
            query: (id: string | undefined) => `teams/${id}`,
        }),
    }),
})

export const {useGetTeamQuery} = teamApi