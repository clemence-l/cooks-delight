<script setup lang="ts">
import { useLazySanityQuery } from "@nuxtjs/sanity/runtime/composables/useLazySanityQuery.js";
import { groq } from "@nuxtjs/sanity/runtime/groq.js";
import type { SanitySiteSettings } from "~/types/cms/site-settings";

const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]`;

const { data } = await useLazySanityQuery<SanitySiteSettings>(
  SITE_SETTINGS_QUERY
);
</script>

<template>
  <main class="ly-default">
    <MyHeader
      v-if="data"
      v-bind="{
        logo: data?.logo,
        navigation: data?.navigation,
        label: data?.label,
        url: data?.url,
      }"
    />
    <slot />
    <MyFooter />
  </main>
</template>
