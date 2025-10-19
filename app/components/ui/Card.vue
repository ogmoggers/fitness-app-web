<template>
  <div class="shadow-sm ring-1 rounded-lg p-6 ">
    <div v-if="$slots.header" class="border-b pb-4 mb-4">
      <slot name="header" />
    </div>
    
    <slot />
    
    <div v-if="$slots.footer" class="border-t pt-4 mt-4">
      <slot name="footer" />
    </div>
  </div>
</template>
