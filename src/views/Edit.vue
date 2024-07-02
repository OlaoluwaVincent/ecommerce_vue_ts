<template>
  <v-container class="!max-w-screen-sm pa-0">
    <div
      class="flex items-center gap-4 mx-auto w-full justify-center bg-blue-lighten-3 rounded-lg mb-3 pa-4">
      <v-icon
        color="warning"
        size="40"
        >mdi-information</v-icon
      >
      <h4 class="text-yellow-700 font-semibold text-base text-center">
        Note that selecting
        <span class="font-bold italic">New Images</span> will replace
        <span class="font-bold italic">Old Images</span>.
      </h4>
    </div>

    <v-form
      v-model="valid"
      :loading="data?.isLoading">
      <PreviewImage
        v-model="files"
        :images="productImages"
        @deleteImg="handleDeleteImg" />

      <v-text-field
        v-model="form.name"
        :rules="[rules.required]"
        label="Name"
        required></v-text-field>

      <v-textarea
        v-model="form.description"
        :rules="[rules.required]"
        label="Description"
        required></v-textarea>

      <v-text-field
        v-model="form.price"
        :rules="[rules.required, rules.isNumber]"
        label="Price"
        required
        type="number"></v-text-field>

      <v-text-field
        v-model="form.discount"
        label="Discount"
        type="number"></v-text-field>

      <v-text-field
        v-model="form.quantity"
        :rules="[rules.isNumber]"
        label="Quantity"
        required
        type="number"></v-text-field>

      <h4
        v-if="data?.error"
        class="text-red-700 font-semibold text-base text-center my-3">
        {{ data.error }}
      </h4>

      <v-btn
        @click="submit"
        block
        :disabled="isPending"
        color="warning">
        Update
      </v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
  import { reactive, ref, toRaw } from 'vue';
  import PreviewImage from '@/components/PreviewImage.vue';
  import { updateProduct } from '@/requests/product';
  import { useProductStore } from '@/stores/product';
  import type { ProductImages, Product } from '@/utils/typings';
  import { useRoute, useRouter } from 'vue-router';
  import { useMutation } from '@tanstack/vue-query';

  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: (formdata: FormData) =>
      updateProduct(formdata, productStore.product!.id),
    onSuccess: () => router.push({ name: 'dashboard' }),
  });

  const productStore = useProductStore();
  const route = useRoute();
  const router = useRouter();

  interface ResponseFromCreate {
    isLoading: boolean;
    error: string;
    data: Product | null;
  }

  const files = ref<File[]>([]);
  const deletedImages = ref<ProductImages[]>([]);
  const productImages = ref(productStore.product?.images);
  const data = ref<ResponseFromCreate>();

  const form = reactive({
    name: productStore.product?.name as string,
    description: productStore.product?.description as string,
    price: productStore.product?.price,
    discount: productStore.product?.discount,
    quantity: productStore.product?.quantity as number,
  });

  const valid = ref(false);
  const rules = {
    required: (value: string) => !!value || 'Required.',
    isNumber: (value: string) => !isNaN(Number(value)) || 'Must be a number.',
  };

  function handleDeleteImg(data: ProductImages) {
    // Update the deleted Images
    deletedImages.value.push(data);
    productImages.value = productImages.value?.filter(
      (img) =>
        !deletedImages.value.some((del) => del.public_id === img.public_id)
    );
  }

  const submit = async () => {
    if (valid.value) {
      const formData = new FormData();

      formData.append('name', form.name);
      formData.append('description', form.description);
      if (form.price !== undefined)
        formData.append('price', form.price.toString());
      if (form.discount && form.discount !== undefined)
        formData.append('discount', form.discount.toString());
      formData.append('quantity', form.quantity!.toString());
      formData.append('deletedImages', JSON.stringify(deletedImages.value));

      const rawFiles = toRaw(files.value);
      rawFiles.forEach((file) => {
        formData.append('images', file);
      });

      mutate(formData);
    }
  };
</script>

<style scoped>
  /* Add any custom styles here */
</style>
