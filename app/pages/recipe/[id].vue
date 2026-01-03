<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();

const { data: recipe, error } = await useAsyncData(
  `recipe-${route.params.id}`,
  async () => {
    const { data } = await $fetch<ApiResponse<FullRecipe>>(
      `${config.public.apiUrl}/api/recipes/${route.params.id}`
    );
    return data;
  }
);

if (!recipe.value || error.value) throw new Error("Recipe not Found");
</script>

<template>
  <div v-if="recipe" class="recipe">
    <MyText variant="h1">{{ recipe.title }}</MyText>

    <NuxtImg
      :src="recipe.image_url || '/img/recipe-placeholder.jpg'"
      alt="Image de la recette"
    />

    <div class="recipe__layout">
      <aside v-if="recipe.ingredients.length" class="recipe__layout__aside">
        <MyText variant="subtitle" color="red">Ingrédients</MyText>

        <ul>
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
            <MyText variant="par2">
              {{ ingredient.quantity }} {{ ingredient.unit }} —
              {{ ingredient.name }}
            </MyText>
          </li>
        </ul>
      </aside>

      <ul v-if="recipe.instructions.length" class="recipe__layout__step">
        <li v-for="(instruction, index) in recipe.instructions" :key="index">
          <div class="instructions-step-number">
            <MyText variant="subtitle">{{ instruction.step_number }}</MyText>
          </div>
          <div class="instructions-text">
            <MyText variant="par2">{{ instruction.description }}</MyText>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.recipe {
  display: flex;
  flex-direction: column;
  gap: rem(32);
  align-items: center;
  margin-bottom: rem(16);

  img {
    width: 100%;
    max-height: rem(500);
    border-radius: rem(24);
    object-fit: cover;
  }

  &__layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: rem(32);
    width: 100%;

    &__aside {
      background: var(--lighter);
      border: rem(1) solid var(--dark-24);
      border-radius: rem(16);
      padding: rem(24);
      display: flex;
      flex-direction: column;
      gap: rem(16);
      max-width: rem(320);

      ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: rem(10);

        li {
          &::before {
            content: "•";
            color: var(--orange);
            margin-right: rem(6);
          }
        }
      }
    }

    &__step {
      display: flex;
      flex-direction: column;
      gap: rem(24);

      li {
        display: flex;
        flex-direction: column;
        background: var(--lighter);
        border-radius: rem(16);
        border: rem(1) solid var(--dark-24);
        padding: rem(16);
      }
    }
  }
}
</style>
