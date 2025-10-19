<template>
  <UApp>
    <Header />
    <UContainer class="max-w-[1080px] mx-auto px-3 py-4">
      <slot />
    </UContainer>
  </UApp>
</template>

<script>
import Header from "@/src/shared/components/Header/Header.vue";

export default {
  components: {
    Header,
  },
};
</script>
