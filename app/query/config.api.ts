import {BaseQueryFn} from "@reduxjs/toolkit/query";
import axios, {AxiosError, AxiosRequestConfig} from "axios";

export const axiosBaseQuery = (
    {baseUrl}: { baseUrl: string } = {baseUrl: process.env.NEXT_PUBLIC_API_URL ?? ''}
): BaseQueryFn<{
    url: string
    method: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
}> => async ({url, method, data, params}) => {
    try {
        const result = await axios({url: baseUrl + url, method, data, params})
        return {data: result.data}
    } catch (axiosError) {
        let err = axiosError as AxiosError
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        }
    }
}