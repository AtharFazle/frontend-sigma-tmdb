<script setup lang="ts">
import { HomeIcon } from "@radix-icons/vue";
import themeSwitcher from "./theme-switcher.vue";

const link = [
  {
    name: "Home",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "Preview",
    path: "/preview",
  },
];
</script>

<template>
  <div class="w-full h-[80px] flex flex-row justify-between items-center px-3">
    <div></div>
    <div class="flex flex-row gap-3 items-center">
      <router-link
        v-for="item in link"
        :key="item.path"
        :to="item.path"
        class="relative"
        v-slot="{ isActive }"
      >
        <h1 class="relative">{{ item.name }}</h1>
        <transition
          name="underline"
          mode="out-in"
          appear
          enter-active-class="duration-200 ease-linear"
          leave-active-class="duration-200 ease-linear"
        >
          <p
            v-if="isActive"
            class="border-b border-sky-500 w-full h-[1px] absolute bottom-[-4px] left-0 duration-200 ease-linear"
          ></p>
        </transition>
      </router-link>
    </div>

    <themeSwitcher />
  </div>
</template>

<style scoped>
.underline-enter-active,
.underline-leave-active {
  transition: width 0.2s ease-in-out;
}

.underline-enter-from,
.underline-leave-to {
  width: 0;
}
</style>
