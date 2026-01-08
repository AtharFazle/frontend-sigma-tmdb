<script lang="ts" setup>
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from '@/components/ui/dialog'
import Multiple from '@/components/ui/select/multiple.vue';
import Images from '@/components/ui/images/index.vue';
import { Checkbox } from '@/components/ui/checkbox'

import { useForm } from "vee-validate";
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
import { Textarea } from '@/components/ui/textarea'

import { watch } from 'vue';
// import DatePicker from "@/components/ui/date-picker/index.vue";
import { useUpdateMovie } from '@/hooks/useMovies';
import { UpdateMovieSchema, UpdateMovieValues } from '@/constant/form';
import { useGetSelectResourcesGenres } from '@/hooks/useGenres';
interface Props {
    // action?: 'add' | 'update',
    id?: string | number,
    movie?: UpdateMovieValues
}

const props = defineProps<Props>();

const emits = defineEmits<{
    (e: 'updateOpen', open: boolean): void
}>();
const open = defineModel<boolean>('open');


const { mutateAsync, isPending, isSuccess } = useUpdateMovie();

const { data, isLoading } = useGetSelectResourcesGenres();
const { errors, defineField, handleSubmit, resetForm, meta } = useForm({
    validationSchema: UpdateMovieSchema,
    initialValues: {
        id: props.movie?.id,
        title: "",
        release_date: new Date(),
        genres: [],
        overview: "",
        rating: 0,
        adult: false,
        languages: props.movie?.languages || 'id'
        // img: null,
    },
});

const [title] = defineField("title");
// const [release_date] = defineField("release_date");
const [genres] = defineField("genres");
const [overview] = defineField("overview");
const [rating] = defineField("rating");
const [adult] = defineField("adult");

// const [img] = defineField("img");

const handleSubmitForm = handleSubmit(async (values) => {
    await mutateAsync({
        id: values.id!,
        genres: values.genres,
        overview: values.overview,
        rating: values.rating,
        release_date: values.release_date,
        languages: values.languages,
        title: values.title,
        adult: values.adult,
    });

    if (isSuccess) {
        resetForm();
        open.value = false;
    }
})

watch(
    () => props.movie,
    (value) => {
        if (value) {
            handleFetchFromProps(value);
        }
    },
    { deep: true }
);

const handleFetchFromProps = (value: UpdateMovieValues) => {
    resetForm({
        values: {
            id: value.id,
            genres: value.genres as any,
            overview: value.overview,
            rating: value.rating,
            release_date: value.release_date,
            title: value.title,
            adult: value.adult,
        }
    });
}

</script>

<template>
    <Dialog v-model:open="open" @update:open="(e) => emits('updateOpen', e)">
        <DialogContent class="!max-w-[700px]">
            <DialogHeader>
                <DialogTitle>Edit Movie</DialogTitle>
                <form @submit="handleSubmitForm" @keydown.enter.prevent class="my-3 space-y-4">
                    <Images :src="movie?.img" class="h-auto w-1/2 rounded-xl mx-auto" />
                    <Input v-model="title" :errors="errors.title" label="Title" type="text"
                        placeholder="example@domain.com" />
                    <div v-if="isLoading" class="">Loading...</div>
                    <Multiple v-else-if="data?.data?.length! > 0" label="Genres" :errors="errors.genres"
                        v-model="genres" :is-multi="true" :options="data?.data" />
                    <Textarea placeholder="Tell us a little bit about yourself" label="Overview" class="h-[100px]"
                        v-model="overview" :errors="errors.overview" />
                    <Input v-model="rating" :errors="errors.rating" label="Rating" type="number"
                        placeholder="example@domain.com" />

                    <div class="w-full flex justify-end items-center">
                        <div class="flex flex-row items-center gap-3">
                            <label for="adult"
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Adult Movie ?

                            </label>
                            <Checkbox v-model:checked="adult" label="Adult" id="adult" />

                        </div>
                    </div>
                    <Button :disabled="!meta.dirty || isPending" class="w-full" type="submit" :loading="isPending">
                        {{ isPending ? 'Updating...' : 'Update Changes' }}
                    </Button>
                </form>
            </DialogHeader>
        </DialogContent>
    </Dialog>
</template>