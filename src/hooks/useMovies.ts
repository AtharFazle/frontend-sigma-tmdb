import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/vue-query";
import {
  AddMovie,
  deleteMovie,
  getAllMovies,
  getLastFetchedDate,
  syncMovies,
  UpdateMovie,
} from "@/services/movies";
import { filterType, LastFetchedDate, responseGetAllMovies, ResponseType } from "@/types";
import { Ref } from "vue";
import { useToastAndQueryClient } from "./toast-query-client";

export function useGetAllMovies(params: Ref<filterType>) {
  return useInfiniteQuery<ResponseType<responseGetAllMovies>, Error>({
    queryKey: ["movies", params.value],
    queryFn: ({ pageParam = 1 }: { pageParam?: unknown }) =>
      getAllMovies({ ...params.value, page: pageParam as number }),
    getNextPageParam: (data) => {
      return data.data?.meta?.page! < data.data?.meta?.last_page!
        ? data.data?.meta?.page! + 1
        : undefined;
    },
    initialPageParam: params.value.page as number | undefined,
    placeholderData: keepPreviousData,
  });
}

export function useGetLastFetchedDate() {
  return useQuery<ResponseType<LastFetchedDate>, Error>({
    queryKey: ["movies", "last-fetched-date"],
    queryFn: () => getLastFetchedDate(),
    placeholderData: keepPreviousData,
  });
}

export const useUpdateMovie = () => {
  const { queryClient, toast } = useToastAndQueryClient();

  return useMutation({
    mutationFn: UpdateMovie,
    onMutate: async (newAdmin) => {
      await queryClient.cancelQueries({ queryKey: ["movies"] });
      return { newMovie: newAdmin };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      toast({
        variant: "success",
        title: "Success",
        description: "Success Add New Movie",
      });
    },
    onError: (error, context) => {
      queryClient.setQueryData(["movies"], context);
      console.error("Error adding item", error);
    },
  });
};
export const useSyncMovies = () => {
  const { queryClient, toast } = useToastAndQueryClient();

  return useMutation({
    mutationFn: syncMovies,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["movies"] });
      return {};
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      toast({
        variant: "success",
        title: "Success",
        description: "Success Sync Movies",
      });
    },
    onError: (error, context) => {
      queryClient.setQueryData(["movies"], context);
      console.error("Error adding item", error);
    },
  });
};

export const useAddMovie = () => {
  const { queryClient, toast } = useToastAndQueryClient();

  return useMutation({
    mutationFn: AddMovie,
    onMutate: async (newAdmin) => {
      await queryClient.cancelQueries({ queryKey: ["movies"] });
      return { newMovie: newAdmin };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      toast({
        variant: "success",
        title: "Success",
        description: "Success Add New Movie",
      });
    },
    onError: (error, context) => {
      queryClient.setQueryData(["movies"], context);
      console.error("Error adding item", error);
    },
  });
};

export const useDeleteMovie = () => {
  const { queryClient, toast } = useToastAndQueryClient();

  return useMutation({
    mutationFn: deleteMovie,
    onMutate: async (movieId: number) => {
      await queryClient.cancelQueries({ queryKey: ["movies"] });

      // Snapshot the previous value to roll back in case of error
      const previousMovies = queryClient.getQueryData(["movies"]);

      // Optimistic Update Step 2: Update cache optimistically
      queryClient.setQueryData(["movies"], (old: any) => {
        if (old) {
          return {
            ...old,
            pages: old.pages.map((page: any) => ({
              ...page,
              data: page.data.filter((item: any) => item.id !== movieId),
            })),
          };
        }
        return old;
      });

      return { previousMovies }; // Return snapshot context
    },
    // On success: Invalidate queries and show success toast
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });

      toast({
        variant: "success",
        title: "Success",
        description: "Movie deleted successfully",
      });
    },
    // On error: Roll back to previous state and show error toast
    onError: (error, movieId, context) => {
      queryClient.setQueryData(["movies"], context?.previousMovies);
      console.error("Error deleting movie with id", movieId, error);

      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete movie. Please try again.",
      });
    },
    // On mutation settled: Always refetch data to ensure cache sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
};
