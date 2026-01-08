<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number,
  errors?: string | string[]
  label?: string
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
      :class="`text-sm font-semibold ${normalizeErrors(props.errors).length ? 'text-red-400' : 'text-foreground'}`">
      {{ props.label }}
    </p>
    <textarea v-model="modelValue" :class="cn('flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      normalizeErrors(props.errors).length && '!border-red-400',
      props.class)" />
    <p v-if="normalizeErrors(props.errors).length" class="text-xs text-red-400"
      v-for="error in normalizeErrors(props.errors)" :key="error">{{ error }}</p>
  </div>
</template>
