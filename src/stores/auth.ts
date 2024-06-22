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
    const refreshToken = computed(() => {
      if (user.value) {
        return user.value.refreshToken;
      }
      return null;
    });

    function setUser(data: User) {
      user.value = data;
    }

    function logout() {
      user.value = undefined;
    }
    return {
      user,
      token,
      refreshToken,
      setUser,
      logout,
    };
  },
  { persist: true }
);

export default useAuth;
