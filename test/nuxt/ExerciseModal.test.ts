import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ExerciseModal from "@/components/modules/exercise/ExerciseModal.vue";

describe("ExerciseModal", () => {
  const globalOptions = {
    global: {
      stubs: {
        Modal: true,
        UInput: true,
        UButton: true,
        UIcon: true,
        draggable: true,
      },
    },
  };

  it("renders the component correctly", () => {
    const wrapper = mount(ExerciseModal, {
      props: { modelValue: true, workoutId: "test-workout-id" },
      ...globalOptions,
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props().modelValue).toBe(true);
  });

  it("emits 'created' event with correct data structure", async () => {
    const wrapper = mount(ExerciseModal, {
      props: { modelValue: true, workoutId: "test-workout-id" },
      ...globalOptions,
    });

    (wrapper.vm as any).title = "Bench Press";
    (wrapper.vm as any).sets = [{ weight: 100, reps: 10, order_index: 0 }];

    await (wrapper.vm as any).handleSubmit();

    const createdEvent = wrapper.emitted("created");
    expect(createdEvent).toBeTruthy();

    const emittedData = createdEvent?.[0][0] as any;
    expect(emittedData.title).toBe("Bench Press");
    expect(emittedData.workout_id).toBe("test-workout-id");
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([false]);
  });
});
