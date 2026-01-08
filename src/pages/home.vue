<script setup lang="ts">
import ChartByGenres from '@/components/organism/chart-by-genres.vue'
import ChartByReleaseDate from '@/components/organism/chart-by-release-date.vue';
import GetAllMovies from '@/components/organism/get-all-movies.vue';
import ChartByAdult from '@/components/organism/chart-by-adult.vue';
import ChartByRating from '@/components/organism/chart-by-rating.vue';
</script>

<template>
    <div class="grid grid-cols-3 gap-3 items-center h-fit overflow-visible">
        <ChartByReleaseDate />
        <ChartByGenres />
        <ChartByAdult />
        <ChartByRating />
        <GetAllMovies />
    </div>
</template>