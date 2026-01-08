<script setup lang="ts">
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { MovieType } from '@/types';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { ref } from 'vue';
interface Props {
    movie: MovieType
}

withDefaults(defineProps<Props>(), {})

const emits = defineEmits<{
    (event: 'update', type: string, movie: MovieType): void;
}>();


const open = ref(false)

const handleAction = (type: string, movie: MovieType) => {
    open.value = false
    emits('update', type, movie)
}


</script>

<template>
    <Popover class="" v-model:open="open">
        <PopoverTrigger>
            <div class="w-10 h-10 rounded-full flex justify-center items-center bg-primary">
                <Icon icon="eva:more-horizontal-outline" class="text-primary-foreground" />
            </div>
        </PopoverTrigger>
        <PopoverContent class="!w-fit">
            <div class="flex flex-row gap-3 items-center">
                <div class="cursor-pointer w-10 h-10 flex justify-center items-center bg-secondary rounded-full"
                    @click="handleAction('edit', movie)">
                    <Icon icon="eva:edit-outline" class="" />
                </div>
                <div class="cursor-pointer w-10 h-10 flex justify-center items-center bg-destructive rounded-full"
                    @click="handleAction('delete', movie)">
                    <Icon icon="eva:trash-2-outline" class="text-destructive-foreground" />
                </div>
            </div>
        </PopoverContent>
    </Popover>
</template>