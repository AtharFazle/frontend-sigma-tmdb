<script setup lang="ts">
import ChartByGenres from '@/components/organism/chart-by-genres.vue'
import ChartByReleaseDate from '@/components/organism/chart-by-release-date.vue';
import GetAllMovies from '@/components/organism/get-all-movies.vue';
import ChartByAdult from '@/components/organism/chart-by-adult.vue';
import ChartByRating from '@/components/organism/chart-by-rating.vue';
import { useGetLastFetchedDate, useSyncMovies } from '@/hooks/useMovies';
import moment from 'moment';
import Button from '@/components/ui/button/Button.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';

const {data:dataLastFetchedDate,isLoading} = useGetLastFetchedDate();

const {mutateAsync,isPending} = useSyncMovies();


const handleSync = async () => {
    await mutateAsync();
}
</script>

<template>
    <div class="grid grid-cols-3 gap-3 items-center h-fit overflow-visible">
        <div></div>
        <div></div>
        <div class="flex flex-row gap-3 items-center justify-end">
            <p class="text-sm font-bold">Last Sync : {{ isLoading ? 'loading..' : moment(dataLastFetchedDate?.data?.last_fetched_date).format('DD MMM YYYY') }}</p>
            <Button @click="handleSync" :loading="isPending" variant="primary">
                <span v-if="isPending">Syncing....</span>
                <Icon v-else icon="eva:sync-fill" class="text-primary-foreground" />
            </Button>
        </div>
        <ChartByReleaseDate />
        <ChartByGenres />
        <ChartByAdult />
        <ChartByRating />
        <GetAllMovies />
    </div>
</template>