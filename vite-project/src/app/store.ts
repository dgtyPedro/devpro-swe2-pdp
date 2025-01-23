import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import { projectApi } from '../services/project';
import { collaboratorApi } from '../services/collaborator';
import { teamApi } from '../services/team';

export const store = configureStore({
    reducer: {
        [projectApi.reducerPath]: projectApi.reducer,
        [collaboratorApi.reducerPath]: collaboratorApi.reducer,
        [teamApi.reducerPath]: teamApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            projectApi.middleware,
            collaboratorApi.middleware,
            teamApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
