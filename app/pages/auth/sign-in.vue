<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <Card>
        <div class="mb-6">
          <h1 class="text-2xl font-bold mb-2">Вход</h1>
          <p>Войдите в свой аккаунт</p>
        </div>

        <Form
          :initialData="{ email: '', password: '' }"
          submitText="Войти"
          @submit="handleSignUp"
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

            <div v-if="error" class="text-red-500 text-sm">
              {{ error }}
            </div>
          </template>
        </Form>

        <div class="mt-6 pt-6 border-t text-center">
          <UButton
            variant="link"
            class="underline cursor-pointer"
            @click="$router.push('/auth/sign-up')"
          >
            Нет аккаунта? Зарегистрируйтесь
          </UButton>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Card from "@/src/shared/components/Card/Card.vue";
import Form from "@/src/shared/components/Form/Form.vue";
import { validateLogin, type LoginInput } from "@/src/shared/utils/auth";

const error = ref("");

const handleSignUp = (data: Record<string, any>) => {
  error.value = "";
  const result = validateLogin(data);

  if (!result.success) {
    const firstError = result.error.issues[0];
    error.value = firstError?.message || "Ошибка валидации";
    return;
  }

  const validData = result.data as LoginInput;

  // TODO: Реализовать вход пользователя когда в бэке будет
  console.log("Вход:", {
    email: validData.email,
    password: validData.password,
  });
};
</script>
