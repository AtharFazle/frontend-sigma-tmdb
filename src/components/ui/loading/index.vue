<script setup lang="ts">
import { Icon } from "@iconify/vue";
interface Props {
  iconClass?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  iconClass: "text-2xl",
  class: "flex min-h-10 w-full items-center justify-center",
});
</script>

<template>
  <div :class="props.class">
    <Icon icon="line-md:loading-loop" :class="props.iconClass" />
  </div>
</template>
