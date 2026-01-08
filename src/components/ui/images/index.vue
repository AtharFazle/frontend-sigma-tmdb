<template>
    <img :src="src" :alt="alt" :class="class" @error="handleError" />
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface Props {
    src?: string | any;
    alt?: string;
    class?: HTMLAttributes['class'];
}

withDefaults(defineProps<Props>(), {
    src: '',
    alt: '',
    class: '',
})

const handleError = (e: any) => {
    e.target.src = 'https://placehold.co/600x400';
}
</script>
