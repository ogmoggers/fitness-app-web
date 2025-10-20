<template>
  <UApp>
    <Header />
    <UContainer class="max-w-[1080px] mx-auto px-5 py-4">
      <slot />
    </UContainer>
  </UApp>
</template>

<script>
import Header from "@/components/layout/Header.vue";

export default {
  components: {
    Header,
  },
};
</script>
