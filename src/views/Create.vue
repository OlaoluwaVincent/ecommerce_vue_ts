<template>
  <v-container>
    <h4 class="text-h4">Create a new Product</h4>
    <v-form
      v-model="valid"
      :loading="isPending">
      <PreviewImage v-model="files" />
      <v-text-field
        v-model="form.name"
        :rules="[rules.required]"
        label="Name"
        required></v-text-field>

      <v-text-field
        v-model="form.description"
        :rules="[rules.required]"
        label="Description"
        required></v-text-field>

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
        v-if="isError"
        class="text-red-700 font-semibold text-base text-center my-3">
        {{ error }}
      </h4>

      <v-btn
        @click="submit"
        block
        :disabled="isPending"
        color="success">
        Create
      </v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
  import { reactive, ref, toRaw } from 'vue';
  import PreviewImage from '@/components/PreviewImage.vue';
  import { createProduct } from '@/requests/product';
  import { useRouter } from 'vue-router';
  import { useMutation } from '@tanstack/vue-query';

  const router = useRouter();

  const files = ref<File[]>([]);

  interface ProductForm {
    name: string;
    description: string;
    price: number | undefined;
    discount: number | undefined;
    quantity: number;
  }

  const form = reactive<ProductForm>({
    name: '',
    description: '',
    price: undefined,
    discount: undefined,
    quantity: 1,
  });

  const valid = ref(false);
  const rules = {
    required: (value: string) => !!value || 'Required.',
    isNumber: (value: string) => !isNaN(Number(value)) || 'Must be a number.',
  };

  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: (formdata: FormData) => createProduct(formdata),
    onSuccess: () => router.push({ name: 'dashboard' }),
  });

  const submit = async () => {
    if (valid.value) {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);
      if (form.price !== undefined)
        formData.append('price', form.price.toString());
      if (form.discount && form.discount !== undefined)
        formData.append('discount', form.discount.toString());
      formData.append('quantity', form.quantity.toString());

      const rawFiles = toRaw(files.value);
      rawFiles.forEach((file) => {
        formData.append('images', file);
      });

      mutate(formData);
    }
  };
</script>
