import { Ref } from "vue";
import { chartDataType, filterType, responseGetAnalyticsByGenres, ResponseType } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/vue-query";

import { analyticsMovieByAdult, analyticsMovieByGenres, analyticsMovieByRating, analyticsMovieByReleaseDate } from "@/services/analytics";

export const useGetAnalyticsMovieByGenres = () => {
  return useQuery<responseGetAnalyticsByGenres, Error>({
    queryKey: ["analytics","genres"],
    queryFn: () => analyticsMovieByGenres(),
    placeholderData: keepPreviousData,
  });
};

export const useGetAnalyticsByAdult = () => {
  return useQuery<ResponseType<chartDataType>, Error>({
    queryKey: ["analytics","adult"],
    queryFn: () => analyticsMovieByAdult(),
    placeholderData: keepPreviousData,
  })
}
export const useGetAnalyticsByRating = () => {
  return useQuery<ResponseType<chartDataType>, Error>({
    queryKey: ["analytics","rating"],
    queryFn: () => analyticsMovieByRating(),
    placeholderData: keepPreviousData,
  })
}

export const useGetAnalyticsMovieByReleaseDate = (params:Ref<filterType>) => {
  return useQuery<ResponseType<chartDataType>, Error>({
    queryKey: ["analytics","release-date",params.value],
    queryFn: () => analyticsMovieByReleaseDate(params.value),
    placeholderData: keepPreviousData,
  });
}