<script setup lang="ts">
import ShipmentForm from './components/ShipmentForm.vue';
import { HttpClient } from './services/httpClient';
function onSubmit(update: string) {
  HttpClient.instance.postUpdate(update);
}
</script>

<template>
  <ShipmentForm @onSubmit="onSubmit"></ShipmentForm>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
