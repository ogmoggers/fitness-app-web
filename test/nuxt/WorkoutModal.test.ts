import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import WorkoutModal from "@/components/modules/workout/WorkoutModal.vue";

describe("WorkoutModal", () => {
  it("renders the component and receives modelValue prop correctly", () => {
    const wrapper = mount(WorkoutModal, {
      props: { modelValue: true },
      global: {
        stubs: {
          Modal: true,
          Form: true,
          UInput: true,
          UTextarea: true,
          UPopover: true,
          UButton: true,
          UCalendar: true
        }
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props().modelValue).toBe(true);
  });

  it("emits submit event with correct data structure", () => {
    const wrapper = mount(WorkoutModal, {
      props: { modelValue: true },
      global: {
        stubs: {
          Modal: true,
          Form: true,
          UInput: true,
          UTextarea: true,
          UPopover: true,
          UButton: true,
          UCalendar: true
        }
      }
    });

    const testData = {
      title: "Test Workout",
      date: "2024-01-01T10:00:00.000Z",
      description: "Test description"
    };

    // @ts-ignore
    wrapper.vm.handleSubmit(testData);

    expect(wrapper.emitted("submit")).toBeTruthy();
    expect(wrapper.emitted("submit")?.[0]).toEqual([testData]);
  });
});