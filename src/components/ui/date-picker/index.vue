<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Button from "@/components/ui/button/Button.vue";

interface Props {
    placeholder?: string;
    disabled?: boolean;
    defaultDate?: Date;
    label?: string;
    format?: string;
    minDate?: Date;
    maxDate?: Date;
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: "Select Date",
    disabled: false,
    defaultDate: () => new Date(),
    format: "YYYY-MM-DD",
});

const date = defineModel<Date>("date");
const emit = defineEmits(["update:modelValue"]);

const previewFormat = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
</script>

<template>
    <div class="w-full space-y-1.5">
        <p v-if="props.label" class="text-sm font-semibold text-primary_black">
            {{ props.label }}
        </p>
        <VueDatePicker :id="props.label" v-model="date" :disabled="props.disabled" :clearable="false"
            :preview-format="previewFormat" :min-date="props.minDate" :max-date="props.maxDate" time-picker-inline
            class="w-full" format="dd/MM/yyyy HH:mm" placeholder="Select Date">
            <template #dp-input="{ isMenuOpen, value }">
                <Button :disabled="props.disabled" :variant="props.disabled ? 'outline' : 'white'" size="date"
                    icon="eva:arrow-ios-downward-outline" :icon-class="`${isMenuOpen ? 'rotate-180' : ''} text-[24px]`"
                    position-icon="right">{{ value ? value : props.placeholder }}</Button>
            </template>
        </VueDatePicker>
    </div>
</template>
