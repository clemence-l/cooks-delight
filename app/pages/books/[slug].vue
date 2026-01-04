<script setup lang="ts">
import { useLazySanityQuery } from "@nuxtjs/sanity/runtime/composables/useLazySanityQuery.js";
import type { SanityBook } from "~/types/cms/book";

const BOOK_QUERY = groq`*[_type == "book" && slug.current == $slug][0]{..., author->{name}, categories[]->{...}}`;
const { params } = useRoute();

const { data: book } = await useLazySanityQuery<SanityBook>(BOOK_QUERY, params);
const { urlFor } = useSanityImage();
</script>

<template>
  <div class="book">
    <NuxtImg
      v-if="book?.cover"
      :src="urlFor(book.cover)?.width(400).url()"
      alt=""
      class="book__cover"
    />
    <NuxtImg
      v-else
      src="/img/book-placeholder.jpg"
      :alt="book?.title"
      class="book__cover"
    />

    <div class="book__meta">
      <MyText variant="h2">{{ book?.title }}</MyText>

      <MyText v-if="book?.author?.name" variant="par2">
        {{ book?.author?.name }}
      </MyText>
    </div>
  </div>
</template>

<style lang="scss">
.book {
  display: grid;
  grid-template-columns: rem(240) 1fr;
  width: 100%;
  gap: rem(48);
  align-items: center;
  border: rem(1) solid var(--dark-24);
  padding: rem(24);
  border-radius: rem(48);
  margin-bottom: rem(16);

  @include medium-down {
    grid-template-columns: 1fr;
    gap: rem(24);
    text-align: center;
    border-radius: rem(24);
  }

  &__cover {
    width: 100%;
    border-radius: rem(16);

    @include medium-down {
      max-width: rem(280);
      margin: 0 auto;
    }
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: rem(12);

    @include medium-down {
      align-items: center;
    }
  }
}
</style>
