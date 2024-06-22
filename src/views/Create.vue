<template>
    <v-container class="!max-w-screen-sm">
        <div class="flex items-center gap-4 mx-auto w-full justify-center bg-blue-lighten-3 rounded-lg my-3 pa-4">
            <v-icon color="warning" size="40">mdi-information</v-icon>
            <h4 class="text-yellow-700 font-semibold text-base text-center">
                Note that selecting <span class="font-bold italic">New Images</span> will replace
                <span class="font-bold italic">Old Images</span>.
            </h4>
        </div>

        <v-form v-model="valid" :loading="data?.isLoading">
            <PreviewImage v-model="files" :images="productImages" @deleteImg="handleDeleteImg" />
            <v-text-field v-model="form.name" :rules="[rules.required]" label="Name" required></v-text-field>

            <v-text-field v-model="form.description" :rules="[rules.required]" label="Description"
                required></v-text-field>

            <v-text-field v-model="form.price" :rules="[rules.required, rules.isNumber]" label="Price" required
                type="number"></v-text-field>

            <v-text-field v-model="form.discount" label="Discount" type="number"></v-text-field>

            <v-text-field v-model="form.quantity" :rules="[rules.isNumber]" label="Quantity" required
                type="number"></v-text-field>

            <h4 v-if="data?.error" class="text-red-700 font-semibold text-base text-center my-3">
                {{ data.error }}
            </h4>

            <v-btn @click="submit" block :disabled="data?.isLoading" :color="isEdit ? 'warning' : 'success'">
                {{ isEdit ? 'Update' : "Create" }}
            </v-btn>
        </v-form>


    </v-container>
</template>

<script setup lang="ts">
import { computed, reactive, ref, toRaw } from 'vue';
import PreviewImage from '@/components/PreviewImage.vue'
import { createProduct, updateProduct } from '@/requests/product';
import { useProductStore } from '@/stores/product';
import type { ProductImages, Product } from '@/utils/typings';
import { useRoute, useRouter } from 'vue-router';


const productStore = useProductStore();
const route = useRoute()
const router = useRouter()

const isEdit = computed(() => route.name === 'edit')
interface ResponseFromCreate {
    isLoading: boolean;
    error: string;
    data: Product | null;
}

const files = ref<File[]>([]);
const deletedImages = ref<ProductImages[]>([])
const productImages = ref(isEdit ? productStore.product?.images : [])
const data = ref<ResponseFromCreate>()

interface ProductForm {
    name: string;
    description: string;
    price: number | undefined;
    discount: number | undefined;
    quantity: number;
}



const form = reactive<ProductForm>({
    name: isEdit.value ? productStore.product!.name : '',
    description: isEdit.value ? productStore.product!.description : '',
    price: isEdit.value ? productStore.product?.price : undefined,
    discount: isEdit.value ? productStore.product?.discount : undefined,
    quantity: isEdit.value ? productStore.product!.quantity : 1,
});

const valid = ref(false);
const rules = {
    required: (value: string) => !!value || 'Required.',
    isNumber: (value: string) => !isNaN(Number(value)) || 'Must be a number.',
};

function handleDeleteImg(data: ProductImages) {
    deletedImages.value.push(data);

    productImages.value = productImages.value?.filter((img) => !deletedImages.value.some((del) => del.public_id === img.public_id))
}

const submit = async () => {
    if (valid.value) {
        const formData = new FormData();

        formData.append('name', form.name);
        formData.append('description', form.description);
        if (form.price !== undefined) formData.append('price', form.price.toString());
        if (form.discount && form.discount !== undefined) formData.append('discount', form.discount.toString());
        formData.append('quantity', form.quantity.toString());
        if (isEdit.value) formData.append('deletedImages', JSON.stringify(deletedImages.value))

        const rawFiles = toRaw(files.value);
        rawFiles.forEach((file) => {
            formData.append('images', file);
        });

        data.value = isEdit.value ? await updateProduct(formData, productStore.product!.id) : await createProduct(formData)
        if (data.value.error) {
            return;
        }

        if (data.value.data !== null && data.value.data !== undefined) {
            router.push({ name: "dashboard" })
        }

    }
};

</script>

<style scoped>
/* Add any custom styles here */
</style>
