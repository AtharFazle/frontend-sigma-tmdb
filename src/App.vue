<script setup lang="ts">
import Navbar from '@/components/navbar.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <div class="w-full min-h-screen h-fit bg-background flex flex-col gap-3">
    <Navbar />
    <div class="p-6 w-full h-fit ">
      <RouterView />
    </div>
    <Toaster />
    <VueQueryDevtools />
  </div>
</template>