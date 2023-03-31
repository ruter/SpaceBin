import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  optimizeDeps: {
    exclude: [
      "codemirror",
      "@codemirror/lang-angular",
      "@codemirror/lang-cpp",
      "@codemirror/lang-css",
      "@codemirror/lang-html",
      "@codemirror/lang-java",
      "@codemirror/lang-javascript",
      "@codemirror/lang-json",
      "@codemirror/lang-lezer",
      "@codemirror/lang-markdown",
      "@codemirror/lang-php",
      "@codemirror/lang-python",
      "@codemirror/lang-rust",
      "@codemirror/lang-sql",
      "@codemirror/lang-vue",
      "@codemirror/lang-wast",
      "@codemirror/lang-xml",
    ],
  },
});
