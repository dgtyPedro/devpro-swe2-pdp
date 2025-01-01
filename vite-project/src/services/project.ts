import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Project} from "./types/Project.ts";

export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'http://127.0.0.1:8000/'
        }
    ),
    endpoints: (builder) => ({
        getProjects: builder.query<Project[], void>({
            query: () => `projects`,
        }),
    }),
})

export const {useGetProjectsQuery} = projectApi