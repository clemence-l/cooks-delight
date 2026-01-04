<script setup lang="ts">
import type { SanityImageSource } from "@sanity/image-url";
import type { SanitySiteSettings } from "~/types/cms/site-settings";

defineProps<{
  logo: SanityImageSource;
  navigation: SanitySiteSettings["navigation"];
}>();

const { urlFor } = useSanityImage();
const token = useCookie("recipe_token");
</script>

<template>
  <header>
    <NuxtLink to="/">
      <MyButton variant="empty">
        <img :src="urlFor(logo)?.url()" alt="Logo Cooks Delight" >
      </MyButton>
    </NuxtLink>

    <nav>
      <ul>
        <li v-for="item in navigation" :key="item.label">
          <NuxtLink :to="item.url">
            <MyButton variant="link">{{ item.label }}</MyButton>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div>
      <NuxtLink v-if="token" to="/dashboard">
        <MyButton variant="default">Votre profil</MyButton>
      </NuxtLink>

      <NuxtLink v-else to="/login">
        <MyButton variant="default">Connexion</MyButton>
      </NuxtLink>
    </div>
  </header>
</template>

<style lang="scss">
header {
  margin: auto;
  max-width: 90vw;
  margin-top: rem(16);
  margin-bottom: rem(16);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: rem(8) rem(24);
  border: 1px solid var(--dark-24);
  border-radius: rem(32);
  gap: rem(16);

  @include medium-down {
    flex-direction: column;
    align-items: flex-start;
    padding: rem(12) rem(16);
    gap: rem(12);
  }

  div {
    display: flex;
    gap: rem(16);

    @include medium-down {
      width: 100%;
      justify-content: flex-start;
    }
  }
}

nav {
  ul {
    padding: 0;
    display: flex;
    gap: rem(24);

    @include medium-down {
      flex-direction: column;
      gap: rem(12);
      width: 100%;
    }

    li {
      padding: rem(16) rem(8);
      border-bottom: rem(1) solid var(--light-16);

      @include medium-down {
        padding: rem(8) rem(0);
        border-bottom: none;
      }
    }
  }
}

img {
  max-height: rem(48);
  object-fit: contain;

  @include small-only {
    max-height: rem(36);
  }
}

</style>
