<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    // CardDescription,
    // CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import Chart from '@/components/ui/chart/index.vue';
import { useGetAnalyticsMovieByGenres } from '@/hooks/useAnalytics';

const {
    data,
    isLoading,
} = useGetAnalyticsMovieByGenres();
</script>

<template>
    <Card class="h-full">
        <CardHeader class="w-full flex flex-row justify-between items-center">
            <CardTitle>Genres Stats</CardTitle>
            <h2 class="text-base text-end">Total Data : {{ data?.data?.total }}</h2>
        </CardHeader>
        <CardContent class="h-[300px]">
            <div v-if="isLoading">loading..</div>
            <Chart v-else-if="data?.data" :labels="data?.data.labels" :series="data?.data.series"
                :total="data?.data.total" type="pie" />

        </CardContent>
        <CardDescription class="p-3">
            <h2 class="text-base">Top 3 Genres : </h2>
            <p v-for="(item, index) in data?.data?.top_member" :key="item" class="text-sm">{{ index + 1 }}. {{ item }}
            </p>
        </CardDescription>
    </Card>
</template>