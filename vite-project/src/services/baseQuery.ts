import {BaseQueryFn, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {deleteCredentials} from "../features/authSlice.ts";

/* eslint-disable @typescript-eslint/no-explicit-any */
const baseQuery = fetchBaseQuery(
    {
        baseUrl: 'http://127.0.0.1:8000/api/',
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as any).auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }
);

export const baseQueryWithAuth: BaseQueryFn = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        api.dispatch(deleteCredentials())

        // const refreshResult: any = await baseQuery(
        //     {url: "/refresh-token", method: "POST"},
        //     api,
        //     extraOptions
        // );
        //
        // if (refreshResult.data) {
        //     api.dispatch(setCredentials({token: refreshResult.data.token}));
        //
        //     result = await baseQuery(args, api, extraOptions);
        // } else {
        //     api.dispatch(deleteCredentials());
        // }
    }

    return result;
};