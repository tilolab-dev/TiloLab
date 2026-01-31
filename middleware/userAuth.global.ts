// import { defineNuxtRouteMiddleware, navigateTo } from "#app";
// import { useUserStore } from "@/store/user-store";

// export default defineNuxtRouteMiddleware((to) => {
//   const userStore = useUserStore();

//   //   if (!userStore.isLoggedIn && to.path !== "/auth/login") {
//   //     return navigateTo("/auth/login");
//   //   }

//   //   if (userStore.isLoggedIn && to.path === "/auth/login") {
//   //     return navigateTo(`/user/${userStore.user.id}`);
//   //   }
//   // Проверяем Supabase сессию
//   const {
//     data: { session },
//     error
//   } = await supabase.auth.getSession();

//   if (session && !userStore.user) {
//     // Если сессия есть, но Pinia пустой, подгружаем пользователя
//     await fetchOrCreateUser();
//   }

//   if (!userStore.isLoggedIn && to.path !== "/auth/login") {
//     return navigateTo("/auth/login");
//   }
// });

// import { defineNuxtRouteMiddleware, navigateTo } from "#app";

// import { useUserStore } from "@/store/user-store";
// import { useAuth } from "@/composables/useAuth";

// export default defineNuxtRouteMiddleware(async (to) => {
//   const userStore = useUserStore();
//   const auth = useAuth();
//   const supabase = useSupabaseClient();

//   if (!to.path.startsWith("/user")) return;

//   if (!userStore.user) {
//     const {
//       data: { session }
//     } = await supabase.auth.getSession();
//     if (session) {
//       await auth.fetchOrCreateUser();
//     }
//   }

//   if (!userStore.isLoggedIn) {
//     return navigateTo("/auth/login");
//   }
// });

// import { defineNuxtRouteMiddleware, navigateTo } from "#app";
// import { useUserStore } from "@/store/user-store";
// import { useAuth } from "@/composables/useAuth";

// // import { useSupabase } from "@nuxtjs/supabase";

// export default defineNuxtRouteMiddleware(async (to: any) => {
//   const userStore = useUserStore();
//   const supabase = useSupabaseClient();
//   const auth = useAuth();

//   //   const { supabase } = useSupabase();

//   if (!to.path.startsWith("/user")) return;

//   if (!userStore.user) {
//     const {
//       data: { session }
//     } = await supabase.auth.getSession();
//     if (session) await auth.fetchOrCreateUser();
//   }

//   if (!userStore.isLoggedIn) {
//     return navigateTo("/auth/login");
//   }
// });

// import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useUserStore } from "@/store/user-store";
import { useAuth } from "@/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith("/user")) return;

  const userStore = useUserStore();
  const supabase = useSupabaseClient();
  const auth = useAuth();

  if (!userStore.user) {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    if (session) {
      await auth.fetchOrCreateUser();
    }
  }

  if (!userStore.isLoggedIn) {
    return navigateTo("/auth/login");
  }
});
