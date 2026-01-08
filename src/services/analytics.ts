import axiosInstance from "@/lib/axiosInstance";
import { chartDataType, filterType, responseGetAnalyticsByGenres, ResponseType } from "@/types";

export async function analyticsMovieByGenres() : Promise<ResponseType<responseGetAnalyticsByGenres>> {
    const response = await axiosInstance.get('/analytics/genres');
    return response.data
}
export async function analyticsMovieByAdult() : Promise<ResponseType<chartDataType>> {
    const response = await axiosInstance.get('/analytics/adult');
    return response.data
}
export async function analyticsMovieByRating() : Promise<ResponseType<chartDataType>> {
    const response = await axiosInstance.get('/analytics/rating');
    return response.data
}

export async function analyticsMovieByReleaseDate(params:filterType) : Promise<ResponseType<chartDataType>> {
    const response = await axiosInstance.get('/analytics/release-date', {params});
    return response.data
}