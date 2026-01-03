<script setup lang="ts">
defineProps<{
  title: string
}>();

</script>

<template>
  <div class="formContainer">
    <MyText variant="h1">{{ title }}</MyText>

    <form class="formContainer__form">
      <slot />
    </form>
  </div>
</template>

<style lang="scss">
.formContainer {
  width: 100%;
  margin-bottom: rem(16);
  padding: rem(60) rem(36);
  display: flex;
  flex-direction: column;
  gap: rem(12);
  border-radius: rem(28);
  border: rem(1) solid var(--dark-24);
  text-align: center;

  &__form {
    display: flex;
    flex-direction: column;
    gap: rem(8);
    width: 100%;
    max-width: rem(480);
    margin: 0 auto;
  }

  button {
    width: 100%;
    margin-top: rem(12);
    margin-bottom: rem(12);
  }
}
</style>
