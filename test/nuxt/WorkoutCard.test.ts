import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import WorkoutCard from "@/components/modules/workout/WorkoutCard.vue";

const push = vi.fn();

mockNuxtImport("useRouter", () => {
  return () => ({
    push,
  });
});

describe("WorkoutCard", () => {
  const mockWorkout = {
    id: "1",
    title: "Morning Workout",
    date: "2024-01-01",
    exercises: [{ sets: [{}, {}], total_weight: 1000 }],
  };

  it("navigates to workout details on click", async () => {
    const wrapper = mount(WorkoutCard, {
      props: { workout: mockWorkout as any },
      global: {
        stubs: { Card: true, UIcon: true },
      },
    });

    await (wrapper.vm as any).navigateToWorkout();

    expect(push).toHaveBeenCalledWith("/workout/1");
  });
});
