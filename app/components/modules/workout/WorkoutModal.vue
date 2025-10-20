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
            <label class="block text-lg font-medium mb-2">
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
            <label class="block text-lg font-medium mb-2">Дата и время</label>
            <UPopover :popper="{ placement: 'bottom-start' }">
              <UButton
                color="white"
                variant="solid"
                size="lg"
                block
                class="justify-start text-left"
                icon="i-heroicons-calendar-days-20-solid"
              >
                {{ formatDate(formData.date) }}
              </UButton>

              <template #panel="{ close }">
                <UCalendar
                  v-model="formData.date"
                  @update:model-value="
                    (date) => {
                      handleDateChange(date);
                      close();
                    }
                  "
                />
              </template>
            </UPopover>
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
  date: new Date().toISOString(),
  description: "",
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const handleDateChange = (
  date: Date,
  updateField: (field: string, value: any) => void
) => {
  updateField("date", date.toISOString());
};

const handleSubmit = (data: Record<string, any>) => {
  emit("submit", data);
  emit("update:modelValue", false);
};
</script>
