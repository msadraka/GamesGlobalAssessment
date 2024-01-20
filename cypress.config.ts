/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  watchForFileChanges: false,

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    // baseUrl: "",
    excludeSpecPattern: process.env.CI ? "cypress/e2e/all.cy.js" : [],
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
