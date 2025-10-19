<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <Card>
        <div class="mb-6">
          <h1 class="text-2xl font-bold mb-2">Регистрация</h1>
          <p>Создайте новый аккаунт</p>
        </div>

        <Form
          :initialData="{ email: '', password: '', confirmPassword: '' }"
          submitText="Зарегистрироваться"
          @submit="handleRegister"
        >
          <template #default="{ formData, updateField }">
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
              <label for="password">Пароль</label>
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
              <label for="confirmPassword">Подтвердите пароль</label>
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
            Уже есть аккаунт?
          </UButton>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Card from "~/shared/components/Card/Card.vue";
import Form from "~/shared/components/Form/Form.vue";
import { validateRegister, type RegisterInput } from "~/shared/utils/auth";

definePageMeta({ layout: "auth" });

const error = ref("");

const handleRegister = (data: Record<string, any>) => {
  error.value = "";
  const result = validateRegister(data);

  if (!result.success) {
    const firstError = result.error.issues[0];
    error.value = firstError?.message || "Ошибка валидации";
    return;
  }

  const validData = result.data as RegisterInput;

  // TODO: Реализовать регистрацию пользователя когда в бэке будет
  console.log("Регистрация:", {
    email: validData.email,
    password: validData.password,
  });
};
</script>
