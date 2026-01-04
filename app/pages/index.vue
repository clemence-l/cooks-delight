<script setup lang="ts">
import type { SanityImageSource } from "@sanity/image-url";

const HOME_QUERY = groq`*[_type == "homePage"][0]{
  title,
  subtitle,
  heroImage,
  ctaText,
  ctaLink
}`;

const { data: home } = await useLazySanityQuery<{
  title: string;
  subtitle?: string;
  heroImage?: SanityImageSource;
  ctaText?: string;
  ctaLink?: string;
}>(HOME_QUERY);

const { urlFor } = useSanityImage();
</script>

<template>
  <section v-if="home" class="home">
    <div class="home__content">
      <MyText variant="h1">{{ home.title }}</MyText>

      <MyText v-if="home.subtitle" variant="par1">
        {{ home.subtitle }}
      </MyText>

      <NuxtLink v-if="home.ctaText && home.ctaLink" :to="home.ctaLink">
        <MyButton variant="default">
          {{ home.ctaText }}
        </MyButton>
      </NuxtLink>
    </div>

    <NuxtImg
      v-if="home.heroImage"
      :src="urlFor(home.heroImage)?.width(1200).url()"
      class="home__image"
      alt="Image principale"
    />
  </section>
</template>

<style lang="scss">
.home {
  display: grid;
  gap: rem(48);
  padding: rem(64) 0;
  align-items: center;

  // Desktop par défaut
  @include large-up {
    grid-template-columns: 1fr 1fr;
  }

  // Tablet & mobile
  @include large-down {
    grid-template-columns: 1fr;
    gap: rem(40);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: rem(24);
    max-width: rem(520);

    @include large-down {
      max-width: 100%;
    }

    @include medium-down {
      align-items: center;
      text-align: center;
      gap: rem(20);
    }
  }

  &__image {
    width: 100%;
    height: rem(420);
    object-fit: cover;
    border-radius: rem(24);

    @include large-down {
      height: rem(360);
    }

    @include medium-down {
      height: rem(280);
      border-radius: rem(20);
    }

    @include small-only {
      height: rem(220);
      border-radius: rem(16);
    }
  }
}
</style>
