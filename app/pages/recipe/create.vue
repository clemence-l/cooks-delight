<script setup lang="ts">
const payload = ref({
  title: "",
  description: "",
  image_url: "",
  cuisine_id: 0,
  goal_id: 0,
  DietaryInformation_id: 0,
  AllergiesInformation_id: 0,
});

const config = useRuntimeConfig();

async function onSubmit() {
  if (
    !payload.value.title ||
    !payload.value.description ||
    payload.value.cuisine_id === 0 ||
    payload.value.goal_id === 0
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  const cookie = useCookie("recipe_token");

  try {
    const response = await $fetch<{ data: { recipe_id: number } }>(
      `${config.public.apiUrl}/api/recipes`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.value}`,
        },
        body: payload.value,
      }
    );

    if (response?.data?.recipe_id) {
      await navigateTo(`/recipe/${response.data.recipe_id}`);
    }
  } catch (err) {
    console.error("Erreur lors de la création :", err);
  }
}

</script>

<template>
  <div class="recipe">
    <MyForm title="Créer une recette">
      <MyInput
        v-model="payload.title"
        type="text"
        label="Titre"
        placeholder="Titre de la recette"
      />
      <MyInput
        v-model="payload.description"
        label="Description"
        placeholder="Description détaillée"
        type="textarea"
      />
      <MyInput
        v-model="payload.image_url"
        type="text"
        label="Image URL"
        placeholder="URL de l'image"
      />

      <div class="recipe__select">
        <label for="cuisine">Cuisine</label>
        <select id="cuisine" v-model.number="payload.cuisine_id">
          <option value="0" disabled>Choisir une cuisine</option>
          <option value="1">Asiatique</option>
          <option value="2">Italienne</option>
          <option value="3">Chinoise</option>
          <option value="4">Française</option>
          <option value="5">Mexicaine</option>
          <option value="6">Indienne</option>
          <option value="7">Méditerranéenne</option>
          <option value="8">Américaine</option>
          <option value="9">Thaïlandaise</option>
          <option value="10">Japonaise</option>
        </select>
      </div>

      <div class="recipe__select">
        <label for="goal">Objectifs</label>
        <select id="goal" v-model.number="payload.goal_id">
          <option value="0" disabled>Choisir un objectif</option>
          <option value="1">Perte de poids</option>
          <option value="2">Riche en protéines</option>
          <option value="2">Riche en nutriments</option>
          <option value="2">Faible en calories</option>
          <option value="2">Rapide et facile</option>
          <option value="2">Adapté aux familles</option>
          <option value="2">Économique</option>
          <option value="2">Occasions spéciales</option>
        </select>
      </div>

      <MyButton type="submit" variant="red" @click.prevent="onSubmit">
        Créer la recette
      </MyButton>
    </MyForm>
  </div>
</template>

<style lang="scss">
.recipe {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: rem(48) rem(16);

  @include medium-down {
    padding: rem(32) rem(16);
  }

  @include small-only {
    padding: rem(24) rem(12);
  }

  :deep(.form) {
    width: 100%;
    max-width: rem(560);
    display: flex;
    flex-direction: column;
    gap: rem(24);

    @include medium-down {
      gap: rem(20);
    }
  }

  &__select {
    display: flex;
    flex-direction: column;
    gap: rem(8);
    width: 100%;

    label {
      font-size: rem(14);
      color: var(--dark-64);
    }

    select {
      width: 100%;
      padding: rem(12) rem(16);
      border-radius: rem(14);
      border: rem(1) solid var(--dark-24);
      background: var(--lighter);
      font-size: rem(14);
      transition: border 0.2s ease, box-shadow 0.2s ease;

      &:focus {
        outline: none;
        border-color: var(--orange);
        box-shadow: 0 0 0 rem(2) rgba(255, 122, 0, 0.15);
      }
    }
  }

  :deep(button) {
    margin-top: rem(16);
    align-self: flex-end;

    @include medium-down {
      width: 100%;
      align-self: center;
    }
  }
}

</style>
