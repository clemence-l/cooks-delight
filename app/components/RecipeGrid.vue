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
