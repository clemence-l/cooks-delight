<script setup lang="ts">
const config = useRuntimeConfig();
const token = useCookie("recipe_token");

useHead({
  title: "Mes recettes | Accueil",
  meta: [
    { name: "description", content: "Page d'accueil de mon site de recettes" },
  ],
});

//
// REQUÊTES
//
const [{ data: recipes, error }] = await Promise.all([
  useAsyncData("recipes", async () => {
    const { data } = await $fetch<ApiResponse<Recipe[]>>(
      `${config.public.apiUrl}/api/recipes`
    );
    return data;
  }),
]);

const page = ref(1);
const RECIPES_PER_PAGE = 6;

const search = ref("");

const filteredRecipes = computed<Recipe[]>(() => {
  if (!recipes.value) return [];

  let results = recipes.value;

  if (search.value.length) {
    results = results.filter((recipe) => {
      return recipe.title.toLowerCase().includes(search.value.toLowerCase());
    });
  }

  return results;
});

const displayedRecipes = computed<Recipe[]>(() => {
  if (!filteredRecipes.value) return [];
  return filteredRecipes.value.slice(
    (page.value - 1) * RECIPES_PER_PAGE,
    page.value * RECIPES_PER_PAGE
  );
});

const totalPages = computed(() => {
  return Math.ceil(filteredRecipes.value.length / RECIPES_PER_PAGE);
});

function onPageClick(index: number) {
  page.value = index;
}
if (error && error.value) throw new Error("Page not Found");
</script>

<template>
  <div class="recipes">
    <MyInput
      v-model="search"
      type="search"
      placeholder="Rechercher une recette"
    />

    <ul class="recipes__grid">
      <li v-for="(recipe, index) in displayedRecipes" :key="index">
        <MyCard variant="recipe" :link="`/recipe/${recipe.recipe_id}`">
          <template #img>
            <NuxtImg
              :src="recipe.image_url || '/img/recipe-placeholder.jpg'"
              alt="Image de la recette"
            />
          </template>
          <template #h3>
            {{ recipe.title }}
          </template>
          <template #desc>
            {{ recipe.description }}
          </template>
          <template #spec>
            Ratings
            <!-- <img src="/img/star.svg" alt="" /> -->
            <!-- {{ recipe.rating }} -->
          </template>
          <template #link>
            <NuxtLink :to="`/recipe/${recipe.recipe_id}`">
              <MyButton variant="outline">Voir la recette</MyButton>
            </NuxtLink>
          </template>
        </MyCard>
      </li>
    </ul>

    <GridPagination
      class="recipes__pagination"
      :current-page="page"
      :total-pages="totalPages"
      :displayed-pages="Array.from({ length: totalPages }, (_, i) => i + 1)"
      @page-change="onPageClick"
    />

    <NuxtLink v-if="token" to="/recipe/create">
      <MyButton variant="default">Ajouter une recette</MyButton>
    </NuxtLink>
  </div>
</template>

<style lang="scss">
.recipes {
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
