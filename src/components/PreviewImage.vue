<template>
    <v-container>
        <v-form>
            <v-file-input v-model="files" accept="image/*" hint="Max of 2 Images" label="Upload Images" multiple
                :rules="[fileRules]" @change="handleFiles" :show-size="true" :counter="!!files?.length"
                :counter-size="2" class="mb-4"></v-file-input>

            <p v-if="files && files.length > 2" class="text-red-500">Image should not be more than 2</p>

            <v-row v-if="isEdit">
                <v-col v-for="(image, index) in images" :key="index" cols="12" md="6" class="!relative">
                    <v-btn flat icon density="compact" color="error" class="absolute z-10 top-8 -right-10"
                        @click="handleDelete(image)">
                        <v-icon size="20">mdi-delete</v-icon>
                    </v-btn>
                    <v-img :src="image.url" class="mb-4" max-height="200px"></v-img>
                </v-col>
            </v-row>

            <v-row>
                <v-col v-for="(image, index) in imagePreviews" :key="index" cols="12" md="6" class="!relative">
                    <v-btn flat icon density="compact" color="error" class="absolute z-10 top-8 -right-10">
                        <v-icon size="20">mdi-delete</v-icon>
                    </v-btn>
                    <v-img :src="image" class="mb-4" max-height="200px"></v-img>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script setup lang="ts">
import type { ProductImages } from '@/utils/typings';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
const emits = defineEmits(["deleteImg"]);

const props = defineProps({
    images: {
        type: Array<ProductImages>,
        required: false
    },
    deletedImages: {
        type: Array<ProductImages | []>,
        required: false
    }
})


const isEdit = computed(() => route.name === 'edit')

const files = defineModel<File[] | []>();

const imagePreviews = ref<string[]>([]);

const fileRules = (value: File[]) => {
    if (value.length > 2) {
        files.value = files.value?.slice(0, 2)
        return 'You can upload up to 2 images';
    }
    return true;
};

const handleFiles = () => {
    updateImagePreviews();
};

const updateImagePreviews = () => {
    imagePreviews.value = [];
    if (files.value)
        for (let i = 0; i < files.value?.length; i++) {
            const file = files.value[i];
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target && typeof e.target.result === 'string') {
                    imagePreviews.value.push(e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
};

function handleDelete(img: ProductImages) {
    emits('deleteImg', img)
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
