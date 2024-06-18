import type { User } from '@/utils/typings';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const useAuth = defineStore(
  'user',
  () => {
    const user = ref<User>();
    const token = computed(() => {
      if (user.value) {
        return user.value.token;
      }
      return null;
    });
    return {
      user,
      token,
    };
  },
  { persist: true }
);

export default useAuth;
