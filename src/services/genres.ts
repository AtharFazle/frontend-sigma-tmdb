import axiosInstance from "@/lib/axiosInstance";
import { ResponseType, SelectType } from "@/types";

export async function getSelectResourcesGenres() : Promise<ResponseType<SelectType[]>> {
    const response = await  axiosInstance.get('/genres/all');
    return response.data
}