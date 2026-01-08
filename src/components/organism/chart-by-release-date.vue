<script setup lang="ts">
import { ref } from "vue";
import {
  Card,
  CardContent,
  // CardDescription,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import moment from "moment";
import {
  useGetAnalyticsMovieByReleaseDate,
} from "@/hooks/useAnalytics";
import DatePicker from "@/components/ui/date-picker/index.vue";
import { filterType } from "@/types";
import Bar from "../ui/chart/bar.vue";
// import Button from "../ui/button/Button.vue";

const filteredDate = ref<filterType>({
  start_date: moment().add(-24, "year").toDate(),
  end_date: moment().endOf("month").toDate(),
});

const { data, isLoading, isRefetching } =
  useGetAnalyticsMovieByReleaseDate(filteredDate);

</script>

<template>
  <Card class="col-span-3 h-fit">
    <CardHeader class="flex flex-col gap-3">
      <div class="flex flex-row gap-3 items-center">
        <CardTitle>Release Date Stats</CardTitle>
      </div>
      <div class="flex flex-row gap-3 items-center w-full">
        <DatePicker label="Start Date" v-model:date="filteredDate.start_date" />
        <DatePicker label="End Date" v-model:date="filteredDate.end_date" />
      </div>
    </CardHeader>
    <CardContent class="h-[350px]">
      <div v-if="isLoading">loading..</div>
      <!-- @ts-ignore -->
      <Bar :key="isRefetching.toString()" v-else :labels="data?.data?.labels!" :series="data?.data?.series!"
        :total="data?.data?.total" title="Release Date" />
    </CardContent>
  </Card>
</template>
