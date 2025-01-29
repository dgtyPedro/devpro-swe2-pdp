import {createApi} from '@reduxjs/toolkit/query/react'
import {Project} from "./types/Project.ts";
import {baseQueryWithAuth} from "./baseQuery.ts";

export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Project'],
    endpoints: (builder) => ({
        getProjects: builder.query<Project[], void>({
            query: () => `projects`,
            providesTags: ['Project']
        }),
        getProject: builder.query<Project, string>({
            query: (id: string | undefined) => `projects/${id}`,
            providesTags: ['Project']
        }),
        createProject: builder.mutation<void, Partial<Project>>({
            query: (project) => ({
                url: 'projects',
                method: 'POST',
                body: project,
            }),
            invalidatesTags: ['Project'],
        }),
        updateProject: builder.mutation<Project, Partial<Project>>({
            query: (project) => ({
                url: 'projects/' + project.id,
                method: 'PUT',
                body: project,
            }),
            invalidatesTags: ['Project']
        }),
        deleteProject: builder.mutation<void, string>({
            query: (id) => ({
                url: 'projects/' + id,
                method: 'DELETE',
            }),
            invalidatesTags: ['Project']
        }),
    }),
})

export const {
    useGetProjectsQuery,
    useGetProjectQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation
} = projectApi