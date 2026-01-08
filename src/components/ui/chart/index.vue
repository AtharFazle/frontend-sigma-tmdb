<template>
    <VueApexCharts type="pie" :options="chartOptions" :series="series" height="100%" width="100%" />
</template>

<script lang="ts" setup>
import { ApexOptions } from "apexcharts";
import { ref, computed } from "vue";
import VueApexCharts from "vue3-apexcharts";
interface Props {
    series: number[];
    labels: string[];
    total?: number;
    totalText?: string | 'Total Data'
    colors?: string[]

}
const props = withDefaults(defineProps<Props>(), {
    series: () => [40, 30, 20],
    labels: () => ["Data 1", "Data 2", "Data 3"],
    colors: () => [],
    total: 90,
    totalText: "Total Data",
})


const chartOptions = computed<ApexOptions>(() => ({
    chart: {
        width: "100%",
        height: "100%",
        type: 'pie',
        parentHeightOffset: 0,
    },
    colors: props.colors || [],
    grid: {
        padding: {
            top: -10,
            right: -10,
            bottom: -10,
            left: -10,
        },
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: false,
    },
    labels: props.labels,
    plotOptions: {
        pie: {
            startAngle: 0,
            endAngle: 360,
            expandOnClick: true,
            offsetX: 0,
            offsetY: 0,
            customScale: 1,
            dataLabels: {
                offset: 0,
                minAngleToShowLabel: 10,
            },
        },
    },
}));

const series = ref(props.series);
</script>
