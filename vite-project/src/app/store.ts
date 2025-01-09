import {configureStore} from '@reduxjs/toolkit'
import {projectApi} from "../services/project.ts";
import {collaboratorApi} from "../services/collaborator.ts";
import {teamApi} from "../services/team.ts";

export const store = configureStore({
    reducer: {
        [projectApi.reducerPath]: projectApi.reducer,
        [collaboratorApi.reducerPath]: collaboratorApi.reducer,
        [teamApi.reducerPath]: teamApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(projectApi.middleware, collaboratorApi.middleware, teamApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

