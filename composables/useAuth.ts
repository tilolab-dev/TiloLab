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

  const syncUser = async () => {
    let data;

    try {
      data = await $fetch<any>("/api/auth/user", {
        method: "POST"
      });
    } catch (err) {
      console.error("Помилка при отриманні користувача:", err);
      return;
    }

    if (data.error) {
      store.clearUser();
      return;
    }

    const guestId = getGuestIdFromCookie();

    if (guestId && guestId !== data.user.id) {
      try {
        await $fetch("/api/auth/merge-guest", {
          method: "POST",
          body: {
            guestId,
            userId: data.user.id
          }
        });

        clearGuestIdCookie();
      } catch (err) {
        console.warn("Помилка при об'єднанні guest:", err);
      }
    }

    store.setUser(data.user);
  };
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: "openid email profile"
      }
    });
  };

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

    await syncUser();

    if (store.user?.id && typeof store.user.id === "string") {
      router.push(`/user/user-profile`);
    }

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
    console.log("resSignUp", resSignUp);
    await syncUser();

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

  const resetPassword = async (email: string) => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      throw new Error("Введіть електронну пошту");
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
      redirectTo: `${window.location.origin}/auth/update-password`
    });

    console.log("reset password:", { data, error });

    if (error) {
      console.error("Помилка відновлення пароля:", error);
      throw new Error(error.message);
    }

    return true;
  };

  const updatePassword = async (newPassword: string) => {
    if (!newPassword) {
      throw new Error("Введіть новий пароль");
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      console.error("Помилка зміни пароля:", error);
      throw new Error(error.message);
    }

    return data;
  };

  return {
    supabaseUser,
    resetPassword,
    user,
    syncUser,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    updatePassword,
    signOut
  };
};
