<template>
  <div class="h-full">
    <VueApexCharts type="bar" height="100%" :options="chartOptions" :series="series" />
  </div>
</template>

<script lang="ts" setup>
import { chartDataType } from "@/types";
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

interface Props extends chartDataType {
  title: string;
}

const props = defineProps<Props>();

const series = ref([
  {
    name: props.title,
    data: props.series.map((item) => item),
  },
]);

const chartOptions = ref({
  chart: {
    height: "100%",
    type: "bar",
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      dataLabels: {
        position: "center", // top, center, bottom
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val + " Movie";
    },
    offsetY: 0,
    style: {
      fontSize: "12px",
      colors: ["#fff"],
    },
  },
  xaxis: {
    categories: props.labels.map((item) => item),
    position: "bottom",
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      fill: {
        type: "gradient",
        gradient: {
          colorFrom: "#D8E3F0",
          colorTo: "#BED1E6",
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
    tooltip: {
      enabled: true,
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
      formatter: function (val: number) {
        return val + "%";
      },
    },
  },
  // title: {
  //   text: props.title,
  //   floating: true,
  //   offsetY: 0,
  //   align: "center",
  //   style: {
  //     color: "#444",
  //   },
  // },
});
</script>
