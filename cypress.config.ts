import { defineConfig } from "cypress";

export default defineConfig({
  screenshotOnRunFailure: false,
  video: false,
  defaultBrowser: 'chrome',
  e2e: {
    // setupNodeEvents(on, config) {
    // implement node event listeners here
    // },
  },
});
