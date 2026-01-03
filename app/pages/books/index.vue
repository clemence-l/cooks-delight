<script setup lang="ts">
import { useLazySanityQuery } from "@nuxtjs/sanity/runtime/composables/useLazySanityQuery.js";
import type { SanityBook } from "~/types/cms/book";

const BOOKS_QUERY = groq`*[
  _type == "book"
  && defined(slug.current)
]|order(publishedAt desc){
  _id,
  title,
  slug,
  cover,
  author->{name},
  publishedAt
}`;

const { data: books } = await useLazySanityQuery<SanityBook[]>(BOOKS_QUERY);

const { urlFor } = useSanityImage();

//
// STATE
//
const search = ref("");
const page = ref(1);
const BOOKS_PER_PAGE = 6;

//
// FILTER
//
const filteredBooks = computed<SanityBook[]>(() => {
  if (!books.value) return [];

  let results = books.value;

  if (search.value.trim().length) {
    const q = search.value.toLowerCase();

    results = results.filter(
      (book) =>
        book.title.toLowerCase().includes(q) ||
        book.author?.name?.toLowerCase().includes(q)
    );
  }

  return results;
});

//
// PAGINATION
//
const displayedBooks = computed<SanityBook[]>(() => {
  const start = (page.value - 1) * BOOKS_PER_PAGE;
  const end = page.value * BOOKS_PER_PAGE;
  return filteredBooks.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredBooks.value.length / BOOKS_PER_PAGE)
);

function onPageClick(index: number) {
  page.value = index;
}

//
// RESET PAGE WHEN SEARCH CHANGES
//
watch(search, () => {
  page.value = 1;
});
</script>

<template>
  <div class="books">
    <MyInput v-model="search" type="search" placeholder="Rechercher un livre" />

    <ul class="books__grid">
      <li v-for="book in displayedBooks" :key="book._id">
        <MyCard variant="book">
          <template #img>
            <NuxtImg
              v-if="book.cover"
              :src="urlFor(book.cover)?.url()"
              :alt="book?.title"
            />
            <NuxtImg
              v-else
              src="/img/book-placeholder.jpg"
              :alt="book?.title"
            />
          </template>
          <template #h3>{{ book.title }}</template>
          <template #desc>Description</template>
          <template #ratings>
            Par {{ book.author?.name || "Inconnu" }}
          </template>
          <template #link>
            <NuxtLink :to="`/books/${book.slug.current}`">
              <MyButton variant="outline"> Voir le livre </MyButton>
            </NuxtLink>
          </template>
        </MyCard>
      </li>
    </ul>

    <GridPagination
      class="books__pagination"
      :current-page="page"
      :total-pages="totalPages"
      :displayed-pages="Array.from({ length: totalPages }, (_, i) => i + 1)"
      @page-change="onPageClick"
    />
  </div>
</template>

<style lang="scss">
.books {
  display: flex;
  flex-direction: column;
  gap: rem(24);
  align-items: center;
  width: 100%;

  > .input,
  > a,
  > MyButton {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: rem(600);
  }

  &__grid {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: rem(16);
    justify-items: center;
    li {
      width: 100%;
    }
  }

  &__pagination {
    position: sticky;
    bottom: 0;
    align-self: center;
    margin-top: rem(16);
    padding: rem(20) rem(0);
    z-index: 10;
  }
}
</style>
