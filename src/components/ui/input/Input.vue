<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  label?: string,
  placeholder?: string
  errors?: string | string[]
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
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
    <input v-model="modelValue" :placeholder="props.placeholder" :class="cn('flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      normalizeErrors(props.errors).length && '!border-red-400', props.class)">
    <p v-if="normalizeErrors(props.errors).length" class="text-xs text-red-400"
      v-for="error in normalizeErrors(props.errors)" :key="error">{{ error }}</p>
  </div>
</template>
