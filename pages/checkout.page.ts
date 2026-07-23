import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  // Step one - information
  readonly firstNameInput = this.page.locator('[data-test="firstName"]');
  readonly lastNameInput = this.page.locator('[data-test="lastName"]');
  readonly postalCodeInput = this.page.locator('[data-test="postalCode"]');
  readonly continueButton = this.page.locator('[data-test="continue"]');
  readonly errorMessage = this.page.locator('[data-test="error"]');

  // Step two - overview
  readonly finishButton = this.page.locator('[data-test="finish"]');
  readonly cancelButton = this.page.locator('[data-test="cancel"]');
  readonly summaryTotal = this.page.locator('.summary_total_label');
  readonly summarySubtotal = this.page.locator('.summary_subtotal_label');

  // Complete
  readonly completeHeader = this.page.locator('.complete-header');
  readonly backHomeButton = this.page.locator('[data-test="back-to-products"]');

  constructor(page: Page) {
    super(page);
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async getErrorText(): Promise<string> {
    return this.getText(this.errorMessage);
  }

  async getTotal(): Promise<string> {
    return this.getText(this.summaryTotal);
  }
}
