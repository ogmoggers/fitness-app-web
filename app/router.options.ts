import type { RouterConfig } from '@nuxt/schema'

export default {
  routes: _routes => [
    {
      name: 'home',
      path: '/',
      component: () => import('@/pages/PageHome.vue'),
    },

    // auth
    {
      name: 'signIn',
      path: '/auth/sign-in',
      component: () => import('@/pages/auth/PageSignIn.vue'),
    },
    {
      name: 'signUp',
      path: '/auth/sign-up',
      component: () => import('@/pages/auth/PageSignUp.vue'),
    },

    // workout
    {
      name: 'workout',
      path: '/workout',
      component: () => import('@/pages/workout/PageWorkout.vue'),
    },
    {
      name: 'workout-id',
      path: '/workout/:id',
      component: () => import('@/pages/workout/PageWorkoutId.vue'),
    },

    // not found
    // {
    //   name: 'not-found',
    //   path: '/:pathMatch(.*)*',
    //   component: () => import('@/pages/PageNotFound.vue'),
    // },
  ],
} satisfies RouterConfig
