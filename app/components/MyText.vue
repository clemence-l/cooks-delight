<script setup lang="ts">
defineProps<{
  variant: "h1" | "h2" | "h3" | "subtitle" | "par1" | "par2" | "tag" | "small";
  color?: "light" | "red";
}>();
</script>

<template>
  <h1
    v-if="variant === 'h1'"
    class="text"
    :class="{
      '-h1': variant === 'h1',
      '-light': color === 'light',
      '-red': color === 'red',
    }"
  >
    <slot />
  </h1>
  <h2
    v-else-if="variant === 'h2'"
    class="text"
    :class="{
      '-h2': variant === 'h2',
      '-light': color === 'light',
      '-red': color === 'red',
    }"
  >
    <slot />
  </h2>
  <h3
    v-else-if="variant === 'h3'"
    class="text"
    :class="{
      '-h3': variant === 'h3',
      '-light': color === 'light',
      '-red': color === 'red',
    }"
  >
    <slot />
  </h3>
  <h4
    v-else-if="variant === 'subtitle'"
    class="text"
    :class="{
      '-subtitle': variant === 'subtitle',
      '-light': color === 'light',
      '-red': color === 'red',
    }"
  >
    <slot />
  </h4>
  <p
    v-else
    class="text"
    :class="{
      '-par1': variant === 'par1',
      '-par2': variant === 'par2',
      '-tag': variant === 'tag',
      '-small': variant === 'small',
      '-light': color === 'light',
      '-red': color === 'red',
    }"
  >
    <slot />
  </p>
</template>

<style lang="scss">
.text {
  --color-text: var(--dark);
  color: var(--color-text);

  &.-light {
    --color-text: var(--light);
  }
  &.-red {
    --color-text: var(--red);
  }

  &.-h1 {
    @include headline-1();
  }
  &.-h2 {
    @include headline-2();
  }
  &.-h3 {
    @include headline-3();
  }
  &.-subtitle {
    @include subtitle();
  }

  &.-par1 {
    @include paragraph-1();
  }
  &.-par2 {
    @include paragraph-2();
  }
  &.-tag {
    @include tagline();
  }
  &.-small {
    @include small-text();
  }

  @include small-only {
    &.-h1 {
      @include m-headline-1();
    }
    &.-h2 {
      @include m-headline-2();
    }
    &.-h3 {
      @include m-headline-3();
    }
    &.-subtitle {
      @include m-subtitle();
    }

    &.-par1 {
      @include m-paragraph-1();
    }
    &.-par2 {
      @include m-paragraph-2();
    }
    &.-tag {
      @include m-tagline();
    }
  }
}
</style>
