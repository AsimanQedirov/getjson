import {createApi} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery} from "../../query/config.api";
import {ICreateApiBody} from "../../models/json";

export const jsonApi = createApi({
    reducerPath: 'api/json',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['JSON'],
    endpoints: build => ({
        getColumns: build.query({
            query: (): any => ({
                url: '/columns',
                method: 'get',
                providesTags: ['JSON']
            })
        }),
        getApi: build.query({
            query: (project_id: string): { url: string, method: string } => {
                return {
                    url: `/projects/${project_id}`,
                    method: 'get',
                }
            },
            providesTags: ['JSON']
        }),
        createApi: build.mutation({
            query: (data: ICreateApiBody): { url: string, method: string, data: ICreateApiBody } => {
                return {
                    url: '/userData',
                    method: 'post',
                    data: data
                }
            },
            invalidatesTags: ['JSON']
        })
    })
})

export const {useGetColumnsQuery, useCreateApiMutation, useGetApiQuery} = jsonApi