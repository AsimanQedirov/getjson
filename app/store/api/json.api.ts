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
                    url: `/projects/${project_id}?paginate`,
                    method: 'get',
                }
            },
            providesTags: ['JSON']
        }),
        deleteApi: build.mutation({
            query: ({id,}: { id: number })
                : { url: string, method: string } => {
                return {
                    url: `/userData/${id}`,
                    method: 'delete',
                }
            },
            invalidatesTags: ['JSON']
        }),
        showApi: build.query({
            query: ({
                        id
                    }: { id: string }): { url: string, method: string } => {
                return {
                    url: `/userData/${id}`,
                    method: 'get',
                }
            }
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
        }),
        updateApi: build.mutation({
            query: ({data, id}: { data: ICreateApiBody, id: string }):
                { url: string, method: string, data: ICreateApiBody } => {
                return {
                    url: `/userData/${id}`,
                    method: 'post',
                    data
                }
            },
            invalidatesTags: ['JSON']
        }),
        fillData: build.mutation({
            query: ({
                        userId,
                        slug,
                        count
                    }: { userId: string, slug: string, count?: number }): { url: string, method: string, data: { count: number } } => {
                return {
                    url: `/${userId}/data/${slug}/fill`,
                    method: 'post',
                    data: {
                        count: count ?? 20
                    }
                }
            },
            invalidatesTags: ['JSON']
        }),
    })
})

export const {
    useGetColumnsQuery,
    useCreateApiMutation,
    useGetApiQuery,
    useFillDataMutation,
    useDeleteApiMutation,
    useShowApiQuery,
    useUpdateApiMutation
} = jsonApi
