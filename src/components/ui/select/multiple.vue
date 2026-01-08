<script setup lang="ts">
import { SelectType } from "@/types";
import VueSelect from "vue3-select-component";

interface Props {
    isMulti?: boolean,
    options?: SelectType[]
    label?: string
    errors?: string[] | string
}
const selected = defineModel<string[]>();
// const selected = ref<string[]>([])
const props = withDefaults(defineProps<Props>(), {
    isMulti: false,
    options: () => []
})

const normalizeErrors = (errors: string | string[] | undefined) => {
    if (Array.isArray(errors)) {
        return errors;
    } else if (typeof errors === "string") {
        return [errors];
    }
    return [];
};
</script>

<template>
    <div class="space-y-2">
        <p v-if="props.label"
            :class="`text-sm font-semibold text-foreground ${normalizeErrors(props.errors).length && 'text-red-400'}`">
            {{ props.label }}
        </p>
        <VueSelect v-model="selected" :is-multi="props.isMulti" :options="props.options" />

        <p v-if="normalizeErrors(props.errors).length" class="text-xs text-red-400"
            v-for="error in normalizeErrors(props.errors)" :key="error">{{ error }}</p>
    </div>
</template>