<script setup lang="ts">
const config = useRuntimeConfig();

// REQUÊTE
const [{ data: recipes, error }] = await Promise.all([
  useAsyncData("recipes", async () => {
    const { data } = await $fetch<ApiResponse<Recipe[]>>(
      `${config.public.apiUrl}/api/recipes`
    );
    return data;
  }),
]);

if (error && error.value) throw new Error("Page not Found");
</script>

<template>
  <ul class="recipes">
    <li v-for="(recipe, index) in recipes" :key="index">
      <RecipeCard>
        <template #img>
          <NuxtImg :src="recipe.image_url" />
        </template>
        <template #h3>{{ recipe.title }}</template>
        <template #desc>{{ recipe.description }}</template>
        <template #ratings>
          Ratings
          <!-- {{ recipe.rating }} -->
          <!-- <img src="/img/star.svg" alt="" /> -->
        </template>
        <template #link>
          <NuxtLink :to="`/recipe/${recipe.recipe_id}`">
            <MyButton variant="outline">View Recipe</MyButton>
          </NuxtLink>
        </template>
      </RecipeCard>
    </li>
  </ul>
</template>

<style lang="scss">
.pages {
  display: flex;
  flex-direction: column;
}
.recipes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: rem(16);
  grid-auto-rows: minmax(100px, auto);
}
</style>
