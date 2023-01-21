import {createApi} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery} from "../../query/config.api";
import {IAuth, IRegister, IUser} from "../../models/auth/auth";
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
        }),
        me: builder.query({
            query: (): { url: string, method: string } => ({
                url: '/auth/me',
                method: 'get'
            })
        }),
        register: builder.mutation<{
            authorization: { token: string },
            user: IUser
        }, unknown>({
            query: (data: IRegister): { url: string, method: string, data: IRegister } => ({
                url: '/auth/register',
                method: 'post',
                data
            }),
        })
    })
});
export const {useLoginGuestMutation, useRegisterMutation, useMeQuery} = authApi
