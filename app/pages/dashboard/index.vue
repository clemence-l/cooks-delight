<script setup lang="ts">
definePageMeta({ middleware: "auth" });

const config = useRuntimeConfig();
const cookie = useCookie("recipe_token");

const { data: userResponse, error } = await useAsyncData(
  "profile",
  async () => {
    return $fetch<{ success: boolean; data: User }>(
      `${config.public.apiUrl}/api/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${cookie.value}`,
        },
      }
    );
  }
);

const user = computed(() => userResponse.value?.data || null);

function onLogoutClick() {
  cookie.value = null;
  return navigateTo("/login");
}
</script>

<template>
  <div class="dashboard">
    <aside v-if="user" class="dashboard__sidebar">
      <MyText variant="tag">{{ user.username }}</MyText>
      <MyText variant="small">{{ user.email }}</MyText>
      <MyButton variant="default" @click="onLogoutClick">
        Se déconnecter
      </MyButton>
    </aside>

    <div>
      <div v-if="error">Erreur lors du chargement du profil.</div>
      <div v-else>
        <MyText variant="h2">TODO</MyText>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.dashboard {
  display: flex;
  width: 100%;
  margin-bottom: rem(16);
  gap: rem(32);

  &__sidebar {
    width: rem(280);
    background-color: var(--lighter);
    border-radius: rem(20);
    border: rem(1) solid var(--dark-24);
    padding: rem(32);
    display: flex;
    flex-direction: column;
    gap: rem(20);
    text-align: center;
    justify-content: center;
    align-items: center;
  }
}
</style>
