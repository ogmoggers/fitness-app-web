<template>
  <Card>
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center gap-2">
        <span class="text-lg font-semibold text-primary">#{{ index + 1 }}</span>
        <h3 class="text-lg font-semibold">
          Exercise {{ exercise.exercise_library_id }}
        </h3>
      </div>
      <UBadge variant="soft"> {{ exercise.sets.length }} sets </UBadge>
    </div>

    <div class="space-y-2">
      <SetRow
        v-for="(set, setIndex) in exercise.sets"
        :key="set.id"
        :set="set"
        :index="setIndex"
      />
    </div>

    <div class="flex gap-4 mt-3 text-sm text-gray-500">
      <span>Rest: {{ exercise.rest_seconds }}s</span>
      <span>Total: {{ exercise.total_weight }} kg</span>
      <span>{{ exercise.total_reps }} reps</span>
    </div>
  </Card>
</template>

<script setup lang="ts">
import type { Exercise } from "@/shared/types/exercise";
import Card from "@/components/ui/Card.vue";
import SetRow from "@/components/modules/set/SetRow.vue";

interface Props {
  exercise: Exercise;
  index: number;
}

defineProps<Props>();
</script>
