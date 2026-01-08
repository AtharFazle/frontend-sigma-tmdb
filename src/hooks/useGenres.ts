import { getSelectResourcesGenres } from "@/services/genres";
import { ResponseType, SelectType } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/vue-query";

export const useGetSelectResourcesGenres = () => {
  return useQuery<ResponseType<SelectType[]>, Error>({
    queryKey: ["resources","genres"],
    queryFn: () => getSelectResourcesGenres(),
    placeholderData: keepPreviousData,
  });
};