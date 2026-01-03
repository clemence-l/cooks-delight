export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/styles/main.scss"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
      extensions: ["vue"],
    },
  ],

  runtimeConfig: {
    public: {
      apiUrl: "",
    },
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxtjs/sanity",
  ],
  vite: {
    optimizeDeps: {
      include: ["react-compiler-runtime", "react", "react-dom"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
              @use "@/styles/foundations/functions" as *;
              @use "@/styles/foundations/variables" as *;
              @use "@/styles/foundations/mixins" as *;
            `,
        },
      },
    },
  },
  sanity: {
    projectId: "to2wqpsw",
    dataset: "production",
  },
});
