import { DeleteResponse, filterType, LastFetchedDate, responseGetAllMovies, ResponseType } from "@/types";
import axiosInstance from "@/lib/axiosInstance";
import { AddMovieValues, UpdateMovieValues } from "@/constant/form";

export async function getAllMovies(
  params: filterType
): Promise<ResponseType<responseGetAllMovies>> {

  const response = await axiosInstance.get("/movies", { params: params });
  return response?.data;
}

export async function syncMovies(): Promise<ResponseType> {
  const response = await axiosInstance.get("/movies/sync");
  return response?.data;
}


export async function getLastFetchedDate(): Promise<ResponseType<LastFetchedDate>> {
  const response = await axiosInstance.get("/movies/last-fetched-date");
  return response?.data;
}

export async function UpdateMovie(data: UpdateMovieValues): Promise<ResponseType> {
  const response = await axiosInstance.put("/movies/" + data.id , data);
  return response?.data;
}

export async function AddMovie(data: AddMovieValues): Promise<ResponseType> {
  const response = await axiosInstance.post("/movies" , data);
  return response?.data;
}

export async function deleteMovie(id: number) : Promise<ResponseType<DeleteResponse>> {
  const response = await  axiosInstance.delete('/movies/' + id);
  return response.data
}
