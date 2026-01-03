<script setup lang="ts">
import type { SanitySiteSettings } from "~/types/cms/site-settings";

defineProps<{
  copyright?: SanitySiteSettings["copyright"];
}>();
</script>

<template>
  <footer class="footer">
    <div class="footer__copyright">
      <MyText variant="small" color="light">{{ copyright }}</MyText>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  max-width: 95vw;
  margin: auto;
  margin-bottom: rem(16);
  padding: rem(040) rem(24) rem(40) rem(24);
  background-color: var(--dark);
  border-radius: rem(32);

  &__copyright {
    text-align: center;
    opacity: 60%;
  }
}
</style>
