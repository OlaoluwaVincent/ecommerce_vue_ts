<template>
  <p
    v-if="isLoading"
    class="animate-pulse font-bold">
    Loading...
  </p>
  <v-col
    v-else
    cols="12"
    md="8">
    <v-card color="#1F7087">
      <div class="d-flex flex-no-wrap justify-space-between items-center">
        <div>
          <v-card-title class="text-h5">
            {{ data?.product.name }}
            <p
              v-show="data?.deliveryStatus === 'accepted'"
              class="text-slate-300 text-sm">
              Expeted Delivery Date: <br />
              <span class="font-bold">{{ daysLeft }}</span>
            </p>
          </v-card-title>

          <v-card-subtitle class="d-flex gap-5">
            <p>&#x20A6; {{ data?.product.price }}</p>
            <p>||</p>
            <p>Quantity: {{ data?.product.quantity }}</p>
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              class="ms-2"
              size="small"
              :text="data?.deliveryStatus"
              disabled
              :color="color"
              variant="elevated" />

            <div v-if="auth.isAdmin && data?.deliveryStatus === 'pending'">
              <v-btn
                class="ms-2"
                size="small"
                text="Accept Order"
                :onclick="handleAccept"
                color="success"
                variant="outlined" />
              <v-btn
                class="ms-2"
                size="small"
                text="Reject Order"
                :onclick="handleReject"
                color="error"
                variant="outlined" />
            </div>
          </v-card-actions>
        </div>

        <v-avatar
          class="ma-3"
          rounded="0"
          size="100">
          <v-img :src="data?.product.images[0].url"></v-img>
        </v-avatar>
      </div>
    </v-card>
  </v-col>

  <div v-if="data">
    <Dialog
      v-model:dialog="acceptDialog"
      status="accepted"
      text="Accepting this order means you will deliver the product in not more than 7 days"
      :id="data?.id" />
    <Dialog
      status="rejected"
      v-model:dialog="rejectDialog"
      text="Cancelling this Order will initiate a Refund"
      :id="data.id" />
  </div>
</template>

<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query';
  import { getOrder } from '@/requests/orders';
  import Dialog from './Dialog.vue';
  import { computed, ref } from 'vue';
  import useAuth from '@/stores/auth';
  import { calculateFutureDate } from '@/utils/helper';

  const acceptDialog = ref(false);
  const rejectDialog = ref(false);

  const auth = useAuth();

  const props = defineProps({
    orderId: {
      type: String,
      required: true,
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['order', props.orderId],
    queryFn: () => getOrder(props.orderId),
  });

  const color = computed(() => {
    if (data.value?.deliveryStatus === 'pending') return 'warning';
    if (data.value?.deliveryStatus === 'accepted') return 'success';
    if (data.value?.deliveryStatus === 'rejected') return 'error';
  });

  const daysLeft = computed(() => {
    if (data.value) return calculateFutureDate(data.value.updatedAt, 7);
  });

  function handleReject() {
    rejectDialog.value = true;
  }

  function handleAccept() {
    acceptDialog.value = true;
  }
</script>

<style scoped></style>
