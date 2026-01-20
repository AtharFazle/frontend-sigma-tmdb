<script setup lang="ts">

import { ref, useTemplateRef, nextTick } from 'vue';
import { useGetAllMovies } from '@/hooks/useMovies';
import { filterType, MovieType } from '@/types';
import { tableMovieHeader } from '@/constant/table';

import Input from '@/components/ui/input/Input.vue';
import Images from '@/components/ui/images/index.vue';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useInfiniteScroll } from '@vueuse/core'
import { Icon } from "@iconify/vue";
import Loading from '@/components/ui/loading/index.vue';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'


import ActionTableMovies from './action-table-movies.vue';
import Update from './movie/update.vue';
import { UpdateMovieValues } from '@/constant/form';
import moment from 'moment';
import { useDebounceFn } from '@vueuse/core';
import Delete from './movie/delete.vue';
import Add from './movie/add.vue';


const tableContainer = useTemplateRef('tableContainer')
const filter = ref<filterType>(
    {
        search: undefined,
        sort: undefined,
        genres: undefined,
        adult: false,
        start_date: undefined,
        end_date: undefined,
        page: 1,
        last_page: 1,
        per_page: 10,
        total_data: 0
    }
)

const { data, isLoading, isFetching, fetchNextPage, hasNextPage } =
    useGetAllMovies(filter);

const action = ref(
    {
        open: false,
        type: '',
        movie: {} as UpdateMovieValues
    }
)

const debouncedFn = useDebounceFn((value) => {
    filter.value.page = 1
    filter.value.search = value
}, 1000)

useInfiniteScroll(
    () => tableContainer.value?.$el as HTMLElement,
    async () => {
        if (hasNextPage.value && !isFetching.value) {
            const scrollElement = tableContainer.value?.$el as HTMLElement;
            const previousScrollHeight = scrollElement?.scrollHeight || 0;

            await fetchNextPage();

            await nextTick();
            if (scrollElement) {
                const newScrollHeight = scrollElement.scrollHeight;
                const scrollDiff = newScrollHeight - previousScrollHeight;
                scrollElement.scrollTop += scrollDiff;
            }
        }
    },
    {
        distance: 100,
        canLoadMore: () => hasNextPage.value && !isFetching.value,
    }
)


const handleAction = (type: string, movie: MovieType) => {

    action.value.type = type
    action.value.movie = {
        id: movie.id,
        title: movie.title,
        languages: movie.languages,
        genres: movie.genres.map((item) => item.id),
        overview: movie.overview,
        img: movie.img,
        rating: movie.vote_average,
        adult: movie.adult === 1 ? true : false,
        release_date: movie.release_date,
    }
    action.value.open = true
}


</script>

<template>
    <Card class="col-span-3">
        <Delete v-if="action.type === 'delete'" v-model:open="action.open" :id="action.movie.id" />
        <Update v-else v-model:open="action.open" :movie="action.movie" />
        <CardHeader class="w-full flex !flex-row justify-between items-center">
            <CardTitle>Movie Table</CardTitle>
            <div class="flex flex-row gap-3">
                <Add />
                <Input @update:model-value="debouncedFn" placeholder="Hellboy: The Crooked Man" />
            </div>
        </CardHeader>
        <CardContent ref="tableContainer" class="px-3 max-h-[calc(100vh-200px)] overflow-y-auto">
            <Table>
                <TableHeader class="sticky top-0 bg-background z-10">
                    <TableRow class="text-base">
                        <TableHead v-for="item in tableMovieHeader" :key="item.key" class="text-center py-3">{{
                            item.title
                            }}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-if="!isLoading && data" v-for="(page) in data.pages">
                        <TableRow v-for="movie in page.data?.data" :key="movie.id">
                            <TableCell class="relative">
                                <Images :src="movie.img" class="h-auto w-1/2 rounded-xl mx-auto" :alt="movie.title" />
                                <Icon v-if="movie.adult" icon="ic:baseline-no-adult-content"
                                    class="absolute right-6 top-2 text-7xl text-destructive" />
                            </TableCell>
                            <TableCell>
                                <p
                                    class="border rounded-full w-10 h-10 text-xs flex items-center font-bold justify-center bg-primary text-primary-foreground">
                                    {{
                                        movie.vote_average }}</p>
                            </TableCell>
                            <TableCell class="font-semibold text-lg">
                                {{ movie.title }}
                            </TableCell>
                            <TableCell class="">
                                <p class="max-w-[200px] line-clamp-4 text-xs">{{ movie.overview }}</p>
                            </TableCell>
                            <TableCell>
                                {{movie.genres.map((item) => item.name).join(', ')}}
                            </TableCell>

                            <TableCell>
                                {{ moment(movie.release_date).format('DD MMM YYYY') }}
                            </TableCell>
                            <TableCell class="">
                                <div class="w-full h-full flex justify-center items-center">
                                    <ActionTableMovies :movie="movie" @update="handleAction" />
                                </div>
                            </TableCell>
                        </TableRow>
                    </template>
                </TableBody>
                <TableCaption>
                    <Loading v-if="isLoading || isFetching" />
                    <div v-else-if="!hasNextPage">
                        {{ data?.pages[0].data?.meta.total_data == 0 ? 'No Data' : 'All movies loaded' }}
                    </div>
                </TableCaption>
            </Table>
        </CardContent>
    </Card>
</template>