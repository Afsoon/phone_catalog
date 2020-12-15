/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    injectAxe(): Chainable<AUTWindow>
    configureAxe(configurationOptions?: Record<String, unknow>): Chainable<AUTWindow>
    checkA11y: (context?: any, options?: Record<String, unknow>?, violationsCallback?: Function, skipFailures?: boolean) => {}
  }
}