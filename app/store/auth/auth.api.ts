import {createApi} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery} from "../../query/config.api";
import {IAuth} from "../../models/auth/auth";
import {IResponse} from "../../models";


export const authApi = createApi({
    reducerPath: 'api/auth',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        loginGuest: builder.mutation<IAuth, unknown>({
            query: (): { url: string, method: string } => ({
                url: '/auth/guest',
                method: 'post'
            }),
            transformResponse: (response: IResponse<IAuth>, meta, arg) => response.data,
        })
    })
});
export const {useLoginGuestMutation} = authApi
