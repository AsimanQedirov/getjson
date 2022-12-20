import {createApi} from "@reduxjs/toolkit/query/react";
import {axiosBaseQuery} from "../../query/config.api";
import {IProjectBody, IProjectResponse} from "../../models/project";
import {IResponse} from "../../models";

export const projectApi = createApi({
    reducerPath: 'api/projects',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Project'],
    endpoints: builder => ({
        getProjects: builder.query({
            query: (): { url: string, method: string } => ({
                url: '/projects',
                method: 'get'
            }),
            providesTags: ['Project']
        }),
        createProject: builder.mutation<IProjectBody, any>({
            query: (data: IProjectBody): { url: string, method: string, data: IProjectBody } => {
                return {
                    url: '/projects',
                    method: 'post',
                    data: data
                }
            },
            transformResponse: (response: IResponse<IProjectResponse>, meta, arg) =>
                response.data,
            invalidatesTags: ['Project']
        }),
        updateProject: builder.mutation<IProjectBody, any>({
            query: (data: IProjectBody): { url: string, method: string, data: IProjectBody } => {
                return {
                    url: `/projects/${data.id}`,
                    method: 'put',
                    data: {name: data.name}
                }
            },
            transformResponse: (response: IResponse<IProjectResponse>, meta, arg) =>
                response.data,
            invalidatesTags: ['Project']
        }),
        deleteProject: builder.mutation<string, any>({
            query: (id: string): { url: string, method: string } => {
                return {
                    url: `/projects/${id}`,
                    method: 'delete',
                }
            },
            invalidatesTags: ['Project']
        })
    })
});

export const {
    useGetProjectsQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation
} = projectApi