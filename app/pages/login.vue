<script setup lang="ts">
const config = useRuntimeConfig();

const email = ref("");
const password = ref("");
const username = ref("");

const isRegister = ref(false);

async function onSubmit() {
  try {
    const endpoint = isRegister.value
      ? `${config.public.apiUrl}/api/users/register`
      : `${config.public.apiUrl}/api/users/login`;

    const payload: Record<string, string> = {
      email: email.value,
      password: password.value,
    };

    if (isRegister.value) {
      payload.username = username.value;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json();

    if (!json.data?.token) {
      alert(json.message || "Erreur");
      return;
    }

    const cookie = useCookie("recipe_token");
    cookie.value = json.data.token;

    await navigateTo("/dashboard");
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <MyForm :title="isRegister ? 'Inscription' : 'Connexion'">
    <MyInput
      v-if="isRegister"
      v-model="username"
      type="text"
      placeholder="Entrez votre nom d'utilisateur"
      label="Nom d'utilisateur"
    />

    <MyInput
      v-model="email"
      type="email"
      placeholder="Entrer votre email"
      label="Email"
    />

    <MyInput
      v-model="password"
      type="password"
      placeholder="Entrez votre mot de passe"
      label="Mot de passe"
    />

    <MyButton variant="outline" type="submit" @click.prevent="onSubmit">
      {{ isRegister ? "S'inscrire" : "Se connecter" }}
    </MyButton>

    <MyText
      variant="small"
      color="red"
      style="margin-top: rem(12); cursor: pointer"
      @click="isRegister = !isRegister"
    >
      {{
        isRegister
          ? "Déjà un compte ? Se connecter"
          : "Pas de compte ? S'inscrire"
      }}
    </MyText>
  </MyForm>
</template>

<style lang="scss">
p {
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(90%);
  }
}
</style>
