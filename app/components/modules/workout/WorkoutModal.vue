<template>
  <Modal v-model="isOpen" title="Создать тренировку">
    <Form
      :initial-data="initialFormData"
      submit-text="Создать"
      @submit="handleSubmit"
    >
      <template #default="{ formData, updateField }">
        <div class="space-y-6">
          <div>
            <label
              class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
            >
              Название тренировки
            </label>
            <UInput
              :model-value="formData.title"
              placeholder="Например: Грудь и Трицепс"
              size="lg"
              class="w-full"
              @update:model-value="updateField('title', $event)"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
            >
              Дата и время
            </label>
            <UInput
              :model-value="formData.date"
              type="datetime-local"
              size="lg"
              class="w-full"
              @update:model-value="updateField('date', $event)"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
            >
              Описание (опционально)
            </label>
            <UTextarea
              :model-value="formData.description"
              placeholder="Добавьте описание тренировки"
              :rows="4"
              class="w-full"
              @update:model-value="updateField('description', $event)"
            />
          </div>
        </div>
      </template>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import Form from "@/components/ui/Form.vue";
import Modal from "@/components/ui/Modal.vue";

interface Props {
  modelValue: boolean;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  submit: [data: { title: string; date: string; description?: string }];
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const initialFormData = {
  title: "",
  date: new Date().toISOString().slice(0, 16),
  description: "",
};

const handleSubmit = (data: Record<string, any>) => {
  emit("submit", data);
  emit("update:modelValue", false);
};
</script>
