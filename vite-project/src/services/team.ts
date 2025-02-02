import {createApi} from '@reduxjs/toolkit/query/react'
import {Team} from "./types/Team.ts";
import {projectApi} from "./project.ts";
import {baseQueryWithAuth} from "./baseQuery.ts";

export const teamApi = createApi({
    reducerPath: 'teamApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Team'],
    endpoints: (builder) => ({
        getTeam: builder.query<Team, string | undefined>({
            query: (id: string | undefined) => `teams/${id}`,
            providesTags: ['Team']
        }),
        createTeam: builder.mutation<Team, Partial<Team>>({
            query: (team) => ({
                url: 'teams/',
                method: 'POST',
                body: team,
            }),
            invalidatesTags: ['Team'],
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                await queryFulfilled;
                dispatch(projectApi.util.invalidateTags(["Project"]));
            },
        }),
        attachCollaborator: builder.mutation<void, Record<string, string>>({
            query: (payload) => ({
                url: `teams/${payload.id}/attachCollaborator`,
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: ['Team'],
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                await queryFulfilled;
                dispatch(projectApi.util.invalidateTags(["Project"]));
            },
        }),
        detachCollaborator: builder.mutation<void, Record<string, string>>({
            query: (payload) => ({
                url: `teams/${payload.id}/detachCollaborator`,
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: ['Team'],
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                await queryFulfilled;
                dispatch(projectApi.util.invalidateTags(["Project"]));
            },
        }),
        updateTeam: builder.mutation<Team, Partial<Team>>({
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
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                await queryFulfilled;
                dispatch(projectApi.util.invalidateTags(["Project"]));
            },
        }),
    }),
})

export const {
    useGetTeamQuery,
    useCreateTeamMutation,
    useUpdateTeamMutation,
    useDeleteTeamMutation,
    useAttachCollaboratorMutation,
    useDetachCollaboratorMutation
} = teamApi