<script setup lang="ts">
defineProps<{
  href?: string;
  variant:
    | "default"
    | "outline"
    | "orange"
    | "red"
    | "link"
    | "outline-link"
    | "grey"
    | "empty";
  size?: "small";
  state?: "active";
  content?: "icon";
  luminosity?: "light";
}>();
</script>

<template>
  <a
    v-if="href"
    href=""
    class="button"
    :class="{
      '-outline': variant === 'outline',
      '-orange': variant === 'orange',
      '-red': variant === 'red',
      '-outline-link': variant === 'outline-link',
      '-link': variant === 'link',
      '-grey': variant === 'grey',
      '-empty': variant === 'empty',
      '-small': size === 'small',
      '-active': state === 'active',
      '-icon': content === 'icon',
      '-light': luminosity === 'light',
    }"
  >
    <slot />
  </a>
  <button
    v-else
    class="button"
    :class="{
      '-outline': variant === 'outline',
      '-orange': variant === 'orange',
      '-red': variant === 'red',
      '-outline-link': variant === 'outline-link',
      '-link': variant === 'link',
      '-grey': variant === 'grey',
      '-empty': variant === 'empty',
      '-small': size === 'small',
      '-active': state === 'active',
      '-icon': content === 'icon',
      '-light': luminosity === 'light',
    }"
  >
    <slot />
  </button>
</template>

<style lang="scss">
.button {
  // DEFAULT
  --button-bg-color: var(--dark);
  --button-color: var(--light);
  --border-color: transparent;
  background: var(--button-bg-color);
  color: var(--button-color);
  border: rem(1) solid var(--border-color);
  border-radius: rem(24);
  text-decoration: none;
  padding: rem(12) rem(24);
  cursor: pointer;
  width: fit-content;
  @include button-text();
  &:hover {
    --button-bg-color: transparent;
    --button-color: var(--dark);
    --border-color: var(--dark);
  }

  &.-light {
    --button-bg-color: var(--light);
    --button-color: var(--dark);
    &:hover {
      --button-bg-color: transparent;
      --button-color: var(--light);
      --border-color: var(--light);
    }
  }

  // ORANGE
  &.-orange {
    --button-bg-color: var(--orange);
    --button-color: var(--dark);
    --border-color: transparent;
    &:hover {
      --button-bg-color: transparent;
      --button-color: var(--orange);
      --border-color: var(--orange);
    }
  }

  // RED
  &.-red {
    --button-bg-color: var(--red);
    --button-color: var(--light);
    --border-color: transparent;
    &:hover {
      --button-bg-color: transparent;
      --button-color: var(--red);
      --border-color: var(--red);
    }
  }

  // OUTLINE
  &.-outline {
    --button-bg-color: transparent;
    --button-color: var(--dark);
    --border-color: var(--dark);
    &:hover {
      --button-bg-color: var(--green);
    }

    &.-light {
      --button-color: var(--light);
      --border-color: var(--light);
      &:hover {
        --button-color: var(--dark);
      }
    }
  }

  // OUTLINE LINK
  &.-outline-link {
    --button-bg-color: transparent;
    --button-color: var(--dark);
    --border-color: var(--dark);
    opacity: 40%;
    &.-active {
      --button-bg-color: var(--green);
      opacity: 1;
    }
    &:hover {
      opacity: 1;
    }

    &.-light {
      --button-color: var(--light);
      --border-color: var(--light);
      &.-active {
        --button-color: var(--dark);
        opacity: 1;
      }
      &:hover {
        opacity: 1;
      }
    }
  }

  // LINK
  &.-link {
    --button-bg-color: transparent;
    --button-color: var(--dark);
    opacity: 40%;
    padding: rem(8);
    border-radius: rem(2);
    &.-active {
      opacity: 1;
      border-bottom: 4px solid var(--red);
    }
    &:hover {
      --button-color: var(--red);
      --border-color: transparent;
      opacity: 1;
    }

    &.-light {
      --button-color: var(--light);
      &.-active {
        --button-color: var(--light);
        opacity: 1;
      }
      &:hover {
        --button-color: var(--red);
        opacity: 1;
      }
    }
  }

  // GREY
  &.-grey {
    --button-bg-color: var(--dark-8);
    --button-color: var(--dark);
    &:hover {
      --border-color: var(--dark);
    }

    &.-light {
      --button-bg-color: var(--light-16);
      --button-color: var(--light);
      &:hover {
        --border-color: var(--light);
      }
    }
  }

  // SMALL
  &.-small {
    padding: rem(4) rem(8);
  }

  // ICON
  &.-icon {
    padding: rem(8);
    border-radius: rem(16);
    display: flex;
    justify-content: space-around;
    gap: rem(8);
  }

  // EMPTY
  &.-empty {
    --button-bg-color: transparent;
    padding: 0;
    display: flex;
    align-items: center;
    &:hover {
      --border-color: transparent;
    }
  }
}
</style>
