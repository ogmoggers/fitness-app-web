<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
    <slot :formData="formData" :updateField="updateField" />

    <div class="mt-2">
      <slot name="actions">
        <UButton size="xl" type="submit" class="w-full" block>
          {{ submitText }}
        </UButton>
      </slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";

interface Props {
  initialData?: Record<string, any>;
  submitText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({}),
  submitText: "Отправить",
});

const emit = defineEmits<{
  submit: [data: Record<string, any>];
}>();

const formData = reactive({ ...props.initialData });

const updateField = (field: string, value: any) => {
  formData[field] = value;
};

const handleSubmit = () => {
  emit("submit", { ...formData });
};
</script>
