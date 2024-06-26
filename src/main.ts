import '@mdi/font/css/materialdesignicons.css';
import '@/assets/main.css';

import { createApp } from 'vue';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VueQueryPlugin } from '@tanstack/vue-query';

import App from './App.vue';
import pinia from './stores/pinia';
import router from './router';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(pinia);
app.use(VueQueryPlugin);

app.mount('#app');
