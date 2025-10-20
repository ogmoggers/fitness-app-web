<template>
  <Modal
    v-model="isOpen"
    :title="isEditMode ? 'Edit exercise' : 'Create exercise'"
  >
    <div class="space-y-6">
      <div>
        <label class="block text-lg font-medium mb-2">Exercise name</label>
        <UInput
          v-model="title"
          placeholder="For example: Bench Press"
          size="lg"
          class="w-full"
        />
      </div>

      <div>
        <div class="flex items-center justify-between mb-3">
          <label class="block text-lg font-medium">Sets</label>
          <UButton
            icon="i-heroicons-plus"
            size="sm"
            variant="ghost"
            @click="addSet"
          >
            Add Set
          </UButton>
        </div>

        <div v-if="sets.length === 0" class="text-center py-4 text-gray-500">
          No sets added yet
        </div>

        <div v-else class="max-h-[300px] overflow-y-auto space-y-2 pr-1">
          <div
            v-for="(set, index) in sets"
            :key="set.id"
            class="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
          >
            <span class="text-gray-500 text-sm">{{ index + 1 }}</span>

            <UInput
              v-model.number="set.weight"
              type="number"
              placeholder="Weight"
              size="sm"
            >
              <template #trailing>
                <span class="text-gray-400 text-xs">kg</span>
              </template>
            </UInput>

            <UInput
              v-model.number="set.reps"
              type="number"
              placeholder="Reps"
              size="sm"
            >
              <template #trailing>
                <span class="text-gray-400 text-xs">reps</span>
              </template>
            </UInput>

            <UButton
              icon="i-heroicons-trash"
              size="sm"
              variant="ghost"
              @click="removeSet(index)"
            />
          </div>
        </div>
      </div>

      <UButton
        size="lg"
        class="w-full"
        :disabled="!title || sets.length === 0"
        @click="handleSubmit"
      >
        {{ isEditMode ? "Save changes" : "Create exercise" }}
      </UButton>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/ui/Modal.vue";
import type { Exercise } from "@/shared/types/Exercise";
import type { Set } from "@/shared/types/Set";

interface Props {
  modelValue: boolean;
  workoutId: string;
  mode?: "create" | "edit";
  exercise?: Exercise | null;
}

const props = withDefaults(defineProps<Props>(), {
  mode: "create",
  exercise: null,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  created: [exercise: Exercise];
  updated: [exercise: Exercise];
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const isEditMode = computed(() => props.mode === "edit");

const title = ref("");
const sets = ref<Set[]>([]);

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen && isEditMode.value && props.exercise) {
      title.value = props.exercise.title;
      sets.value = props.exercise.sets.map((set) => ({ ...set }));
    } else if (isOpen && !isEditMode.value) {
      resetForm();
    }
  }
);

const resetForm = () => {
  title.value = "";
  sets.value = [];
};

const addSet = () => {
  sets.value.push({
    id: crypto.randomUUID(),
    weight: 0,
    reps: 0,
    order_index: sets.value.length,
    workout_exercise_id: props.exercise?.id || "",
    created_at: new Date(),
    updated_at: new Date(),
  });
};

const removeSet = (index: number) => {
  sets.value.splice(index, 1);
  sets.value.forEach((set, idx) => {
    set.order_index = idx;
  });
};

const handleSubmit = () => {
  const exerciseId =
    isEditMode.value && props.exercise
      ? props.exercise.id
      : crypto.randomUUID();

  const exerciseSets = sets.value.map((set) => ({
    ...set,
    workout_exercise_id: exerciseId,
  }));

  const totalWeight = exerciseSets.reduce(
    (sum, set) => sum + set.weight * set.reps,
    0
  );
  const totalReps = exerciseSets.reduce((sum, set) => sum + set.reps, 0);

  const exerciseData: Exercise = {
    id: exerciseId,
    workout_id: props.workoutId,
    title: title.value,
    exercise_library_id: props.exercise?.exercise_library_id || "test",
    rest_seconds: props.exercise?.rest_seconds || 0,
    order_index: props.exercise?.order_index || 0,
    created_at: props.exercise?.created_at || new Date(),
    updated_at: new Date(),
    sets: exerciseSets,
    total_weight: totalWeight,
    total_reps: totalReps,
  };

  if (isEditMode.value) {
    console.log("Updating exercise:", exerciseData);
    emit("updated", exerciseData);
  } else {
    console.log("Creating exercise:", exerciseData);
    emit("created", exerciseData);
  }

  resetForm();
  emit("update:modelValue", false);
};
</script>
