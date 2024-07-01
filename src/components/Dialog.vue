<template>
  <v-dialog
    v-model="dialog"
    width="auto">
    <v-card
      max-width="400"
      prepend-icon="mdi-information"
      color="blue-darken-4"
      :text="text"
      title="Update in progress">
      <template v-slot:actions>
        <v-btn
          class="ms-auto"
          text="Ok"
          @click="handleSubmit"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { updateOrderStatus } from '@/requests/orders';
  import { useMutation, useQueryClient } from '@tanstack/vue-query';

  const dialog = defineModel('dialog');
  const queryClient = useQueryClient();
  const props = defineProps({
    text: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  });

  const mutation = useMutation({
    mutationKey: ['order/update', props.id],
    mutationFn: () => updateOrderStatus(props.id, props.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order', props.id] });
      console.log('Order status updated successfully');
    },
  });

  function handleSubmit() {
    dialog.value = false;
    mutation.mutate();
  }
</script>

<style scoped></style>
