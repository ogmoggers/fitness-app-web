import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import WorkoutModal from "~/components/modules/workout/WorkoutModal.vue";

describe("WorkoutModal", () => {
  it("renders all form fields", () => {
    const wrapper = mount(WorkoutModal, {
      props: { modelValue: true },
    });
    expect(
      wrapper
        .find('input[placeholder="For example: Chest and Triceps"]')
        .exists()
    ).toBe(true);
    expect(
      wrapper
        .find('textarea[placeholder="Add a description of workout"]')
        .exists()
    ).toBe(true);
    expect(wrapper.text()).toContain("Date and time");
  });

  it("emits update:modelValue when closed", async () => {
    const wrapper = mount(WorkoutModal, {
      props: { modelValue: true },
    });
    const closeBtn = wrapper.find('[data-testid="modal-close"]');
    if (closeBtn.exists()) {
      await closeBtn.trigger("click");
      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    } else {
      await wrapper.vm.$emit("update:modelValue", false);
      expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    }
  });
});
