<script setup lang="ts">

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import DialogDescription from '@/components/ui/dialog/DialogDescription.vue';
import DialogFooter from '@/components/ui/dialog/DialogFooter.vue';
import Button from '@/components/ui/button/Button.vue';
import { useDeleteMovie } from '@/hooks/useMovies';


interface Props {
    id: number
}

const props = defineProps<Props>();

const open = defineModel<boolean>('open');
// const emits = defineEmits(['updateOpen']);


const { mutateAsync, isPending, isSuccess } = useDeleteMovie();

const handleDelete = async () => {
    await mutateAsync(props.id)

    if (isSuccess) {
        open.value = false
    }
}
</script>

<template>
    <Dialog v-model:open="open">
        <DialogContent class=" !max-w-[500px]">
            <DialogHeader class="w-full flex justify-center items-center">
                <DialogTitle>Delete Movie</DialogTitle>
            </DialogHeader>

            <DialogDescription class="text-center">
                <h2 class="text-base "> Are you sure you want to delete this movie?</h2>
            </DialogDescription>

            <DialogFooter class="w-full flex !flex-row !justify-between items-center">
                <Button @click="open = false" class="w-full" variant="outline">{{ isPending ? 'Deleting...' : 'Cancel'
                    }}</Button>
                <Button @click="handleDelete" class="w-full" variant="destructive">{{ isPending ? 'Deleting...' :
                    'Delete' }}</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>