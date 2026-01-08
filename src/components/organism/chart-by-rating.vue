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
import { useGetAnalyticsByRating } from '@/hooks/useAnalytics';

const {
  data,
  isLoading,
} = useGetAnalyticsByRating();
</script>

<template>
  <Card class="h-full">
    <CardHeader class="w-full flex flex-row justify-between items-center">
      <CardTitle>Rating Stats</CardTitle>
      <h2 class="text-base text-end">Total Data : {{ data?.data?.total }} </h2>
    </CardHeader>
    <CardContent class="h-[300px]">
      <div v-if="isLoading">loading..</div>
      <Chart v-else-if="data?.data" :labels="data?.data.labels" :series="data?.data.series" :total="data?.data.total"
        type="pie" :colors="['#2596be', '#be2531']" />

    </CardContent>
    <CardDescription class="p-3 flex flex-col gap-3">
      <div class="flex flex-row gap-3">
        <p class="text-sm">{{ data?.data?.labels[0] }} ( >= 6) : {{ data?.data?.series[0] }}</p>
        <p class="text-sm">{{ data?.data?.labels[1] }} ( < 6) : {{ data?.data?.series[1] }}</p>
      </div>
    </CardDescription>
  </Card>
</template>