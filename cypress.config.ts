import { defineConfig } from "cypress";

export default defineConfig({
  screenshotOnRunFailure: false,
  video: false,
  defaultBrowser: 'chrome',
  e2e: {
    setupNodeEvents(on, config) {
      const scrappedData: any[] = [] // TODO - create a type for this

      on('task', {
        setScrappedData(data) {
          console.log(`Scrapped data: ${data}`, 'log');

          if (!data) return null;

          const stringifiedData = JSON.stringify(data, null, 2);

          scrappedData.push(stringifiedData);

          return stringifiedData;
        },
        getScrappedData() {
          console.log(`Scrapped data: ${scrappedData}`, 'log');
          return scrappedData;
        },
      });
    },
  },
});
