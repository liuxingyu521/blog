/** @type {import("prettier").Config} */
export default {
  printWidth: 100,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  useTabs: true,
  plugins: [
    import("prettier-plugin-astro"),
    import("prettier-plugin-tailwindcss") /* Must come last */,
  ],
  pluginSearchDirs: false,
  overrides: [
    {
      files: "**/*astro",
      options: {
        parser: "astro",
      },
    },
  ]
}
