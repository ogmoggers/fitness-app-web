<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <Card>
        <div class="mb-6">
          <h1 class="text-2xl font-bold mb-2">Registration</h1>
          <p>Create a new account</p>
        </div>

        <Form
          :initialData="{ email: '', password: '', confirmPassword: '' }"
          submitText="Register"
          @submit="handleRegister"
        >
          <!-- <template #default="{ formData, updateField }"> -->
          <template v-slot="{ formData, updateField }">
            <div class="flex flex-col gap-2">
              <label for="email">Email</label>
              <UInput
                id="email"
                type="email"
                :value="formData.email"
                @input="
                  updateField(
                    'email',
                    ($event.target as HTMLInputElement).value
                  )
                "
                placeholder="your@email.com"
                required
              />
            </div>

            <div class="flex flex-col gap-2">
              <label for="password">Password</label>
              <UInput
                id="password"
                type="password"
                :value="formData.password"
                @input="
                  updateField(
                    'password',
                    ($event.target as HTMLInputElement).value
                  )
                "
                placeholder="••••••••"
                required
              />
            </div>

            <div class="flex flex-col gap-2">
              <label for="confirmPassword">Confirm the password</label>
              <UInput
                id="confirmPassword"
                type="password"
                :value="formData.confirmPassword"
                @input="
                  updateField(
                    'confirmPassword',
                    ($event.target as HTMLInputElement).value
                  )
                "
                placeholder="••••••••"
                required
              />
            </div>

            <div v-if="error" class="text-red-500 text-sm">
              {{ error }}
            </div>
          </template>
        </Form>

        <div variant="link" class="mt-6 pt-6 border-t text-center">
          <UButton
            variant="link"
            class="underline cursor-pointer"
            @click="$router.push('/auth/sign-in')"
          >
            Already have an account?
          </UButton>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Card from "@/components/ui/Card.vue";
import Form from "@/components/ui/Form.vue";
import { validateRegister, type RegisterInput } from "@/shared/utils/auth";

definePageMeta({ layout: "auth" });

const error = ref("");

const handleRegister = (data: Record<string, any>) => {
  error.value = "";
  const result = validateRegister(data);

  if (!result.success) {
    const firstError = result.error.issues[0];
    error.value = firstError?.message || "Validation error";
    return;
  }

  const validData = result.data as RegisterInput;

  // TODO: Реализовать регистрацию пользователя когда в бэке будет
  console.log("Registration:", {
    email: validData.email,
    password: validData.password,
  });
};
</script>
