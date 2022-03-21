<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    </v-app-bar>

    <v-main>
        <Viewport></Viewport>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Viewport from "@/components/Viewport.vue";
export default Vue.extend({
  name: 'App',
  components:{
    Viewport
  },
  data: () => ({
    //
  }),
});
</script>
