import {configureStore} from '@reduxjs/toolkit'
import {projectApi} from "../services/project.ts";
import {collaboratorApi} from "../services/collaborator.ts";

export const store = configureStore({
    reducer: {
        [projectApi.reducerPath]: projectApi.reducer,
        [collaboratorApi.reducerPath]: collaboratorApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(projectApi.middleware, collaboratorApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

