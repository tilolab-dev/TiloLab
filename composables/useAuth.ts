import { ref } from "vue";
// import { useSupabaseUser, useSupabaseClient } from "@nuxtjs/supabase";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "vue-router";

export const useAuth = () => {
  const supabase = useSupabaseClient();
  const supabaseUser = useSupabaseUser();
  const store = useUserStore();
  const user = ref<any>(null);
  const router = useRouter();

  // const fetchOrCreateUser = async () => {
  //   const {
  //     data: { session },
  //     error: sessionError
  //   } = await supabase.auth.getSession();

  //   if (sessionError) {
  //     console.warn("Помилка отримання сессії Supabase:", sessionError);
  //   }

  //   if (session?.user) {
  //     const supabaseUser = session.user;

  //     let data;
  //     try {
  //       data = await $fetch<any>("/api/auth/user", { method: "POST" });
  //     } catch (err) {
  //       console.error("Користувач відсутній:", err);
  //       return;
  //     }

  //     const guestId = getGuestIdFromCookie();
  //     if (guestId && guestId !== data.user.id) {
  //       try {
  //         await $fetch("/api/auth/merge-guest", {
  //           method: "POST",
  //           body: { guestId, userId: data.user.id }
  //         });
  //         clearGuestIdCookie();
  //       } catch (err) {
  //         console.warn("Помилка при оновленні гостя:", err);
  //       }
  //     }

  //     try {
  //       await $fetch("/api/auth/update-user", {
  //         method: "POST",
  //         body: {
  //           userId: data.user.id,
  //           full_name: supabaseUser.user_metadata?.full_name,
  //           last_name: supabaseUser.user_metadata?.last_name,
  //           phone_number: supabaseUser.user_metadata?.phone_number
  //         }
  //       });
  //     } catch (err) {
  //       console.warn("Помилка при оновленні користувача:", err);
  //     }

  //     store.setUser(data.user);
  //   } else {
  //     let guestId = getGuestIdFromCookie();

  //     if (!guestId) {
  //       try {
  //         const guestUser = await $fetch<any>("/api/auth/create-guest", { method: "POST" });
  //         guestId = guestUser.id;
  //         setGuestIdCookie(guestId as any);
  //       } catch (err) {
  //         console.error("Помилка при створенні гостя:", err);
  //         return;
  //       }
  //     }

  //     try {
  //       const guestData = await $fetch(`/api/auth/user/${guestId}`);
  //       store.setUser(guestData);
  //     } catch (err) {
  //       console.error("Помилка при отриманні данних гостя:", err);
  //     }
  //   }
  // };

  const fetchOrCreateUser = async () => {
    const {
      data: { session },
      error
    } = await supabase.auth.getSession();

    if (error) {
      console.warn("Supabase session error:", error);
      return;
    }

    if (!session?.user) {
      store.clearUser();
      return;
    }

    const supabaseUser = session.user;

    let data;
    try {
      data = await $fetch<any>("/api/auth/user", { method: "POST" });
    } catch (err) {
      console.error("Помилка при отриманні користувача:", err);
      return;
    }

    const guestId = getGuestIdFromCookie();
    if (guestId && guestId !== data.user.id) {
      try {
        await $fetch("/api/auth/merge-guest", {
          method: "POST",
          body: { guestId, userId: data.user.id }
        });
        clearGuestIdCookie();
      } catch (err) {
        console.warn("Помилка при оновленні користувача:", err);
      }
    }

    try {
      await $fetch("/api/auth/update-user", {
        method: "POST",
        body: {
          userId: data.user.id,
          full_name: supabaseUser.user_metadata?.full_name,
          last_name: supabaseUser.user_metadata?.last_name,
          phone_number: supabaseUser.user_metadata?.phone_number
        }
      });
    } catch (err) {
      console.warn("Помилка при оновленні данних користувача:", err);
    }

    store.setUser(data.user);
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` }
      //   options: {
      //     redirectTo: "https://tilolab.com.ua"
      //   }
    });
  };

  //   const signInWithEmail = async (email: string, password: string) => {
  //     await supabase.auth.signInWithPassword({ email, password });
  //     await fetchOrCreateUser();
  //   };

  const signInWithEmail = async (email: string, password: string, rememberMe: boolean = false) => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (res.error) {
      alert("Перевірте данні входу");
      throw new Error(res.error.message);
    }

    if (rememberMe) {
      await supabase.auth.setSession({
        access_token: res.data.session?.access_token!,
        refresh_token: res.data.session?.refresh_token!
      });
    }

    await fetchOrCreateUser();

    router.push(`/user/${store.user.id}`);

    return res;
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    name: string,
    lastName: string,
    phoneNumber: string
  ) => {
    const resSignUp = await supabase.auth.signUp({
      email,
      password,
      options: {
        // emailRedirectTo: "https://tilolab.com.ua/auth/login",
        emailRedirectTo: "http://www.tilolab.com.ua/auth/login",
        data: { last_name: lastName, full_name: name, phone_number: phoneNumber }
      }
    });
    await fetchOrCreateUser();

    return resSignUp;
  };

  const signOut = async () => {
    // await supabase.auth.signOut();
    // user.value = null;
    // store.clearUser();
    await navigateTo("/");

    await supabase.auth.signOut();

    store.clearUser();
    user.value = null;
  };

  return {
    supabaseUser,
    user,
    fetchOrCreateUser,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut
  };
};
