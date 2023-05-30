/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */
export default (on, config) => {
  return Object.assign({}, config, {
    fixturesFolder: 'cypress/fixtures',
    integrationFolder: 'cypress/integration',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    supportFile: 'cypress/support/index.ts',
  })
}
