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
  gap: rem(40);
  align-items: center;
  width: 100%;
  margin-bottom: rem(32);

  @include medium-down {
    gap: rem(32);
  }

  img {
    width: 100%;
    max-height: rem(500);
    border-radius: rem(24);
    object-fit: cover;

    @include large-down {
      max-height: rem(420);
    }

    @include medium-down {
      max-height: rem(300);
      border-radius: rem(20);
    }

    @include small-only {
      max-height: rem(220);
      border-radius: rem(16);
    }
  }

  &__layout {
    display: grid;
    width: 100%;
    gap: rem(32);
    align-items: flex-start;

    @include large-up {
      grid-template-columns: rem(320) 1fr;
    }

    @include large-down {
      grid-template-columns: 1fr;
      gap: rem(24);
    }

    &__aside {
      background: var(--lighter);
      border: rem(1) solid var(--dark-24);
      border-radius: rem(20);
      padding: rem(24);
      display: flex;
      flex-direction: column;
      gap: rem(16);
      position: sticky;
      top: rem(24);

      @include large-down {
        position: static;
      }

      ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: rem(10);

        li {
          display: flex;
          align-items: flex-start;

          &::before {
            content: "•";
            color: var(--orange);
            margin-right: rem(8);
            line-height: 1.4;
          }
        }
      }
    }

    &__step {
      display: flex;
      flex-direction: column;
      gap: rem(24);

      li {
        display: grid;
        grid-template-columns: rem(40) 1fr;
        gap: rem(16);
        background: var(--lighter);
        border-radius: rem(20);
        border: rem(1) solid var(--dark-24);
        padding: rem(20);

        @include medium-down {
          grid-template-columns: 1fr;
          gap: rem(12);
        }
      }
    }
  }
}

</style>
