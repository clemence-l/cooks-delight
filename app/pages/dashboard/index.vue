<script setup lang="ts">
definePageMeta({ middleware: "auth" });

const config = useRuntimeConfig();
const cookie = useCookie("recipe_token");

const { data: userResponse } = await useAsyncData("profile", async () => {
  return $fetch<{ success: boolean; data: User }>(
    `${config.public.apiUrl}/api/users/profile`,
    {
      headers: {
        Authorization: `Bearer ${cookie.value}`,
      },
    }
  );
});

const user = computed(() => userResponse.value?.data || null);

function onLogoutClick() {
  cookie.value = null;
  return navigateTo("/login");
}

const { data } = await useAsyncData<Recipe[]>("my-recipes", () => {
  const cookie = useCookie("recipe_token");
  return $fetch(`${config.public.apiUrl}/api/recipes/my-recipes`, {
    headers: {
      Authorization: `Bearer ${cookie.value}`,
    },
  });
});

console.log(data.value);
</script>

<template>
  <div class="dashboard">
    <aside v-if="user" class="dashboard__sidebar">
      <MyText variant="tag">{{ user.username }}</MyText>
      <MyText variant="small">{{ user.email }}</MyText>
      <MyButton variant="red" @click="onLogoutClick"> Se déconnecter </MyButton>
    </aside>

    <div class="dashboard__main">
      <p>TODO</p>
    </div>
      
  </div>
</template>

<style lang="scss">
.dashboard {
  display: flex;
  width: 100%;
  gap: rem(32);
  margin-bottom: rem(32);

  @include medium-down {
    flex-direction: column;
    gap: rem(24);
  }

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
    align-items: center;
    height: fit-content;

    @include medium-down {
      width: 100%;
      padding: rem(24);
    }

    @include small-only {
      padding: rem(20);
      gap: rem(16);
    }

    :deep(button) {
      margin-top: rem(8);
      width: 100%;
    }
  }

  &__main {
    flex: 1;
    background: var(--lighter);
    border-radius: rem(20);
    border: rem(1) solid var(--dark-24);
    padding: rem(32);
    min-height: rem(300);

    @include medium-down {
      padding: rem(24);
    }

    @include small-only {
      padding: rem(20);
    }
  }
}

</style>
