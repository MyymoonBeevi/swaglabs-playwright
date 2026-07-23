import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly cartItems = this.page.locator('.cart_item');
  readonly checkoutButton = this.page.locator('[data-test="checkout"]');
  readonly continueShoppingButton = this.page.locator('[data-test="continue-shopping"]');

  constructor(page: Page) {
    super(page);
  }

  cartItem(name: string) {
    return this.page.locator('.cart_item').filter({ hasText: name });
  }

  removeButton(name: string) {
    return this.cartItem(name).getByRole('button', { name: /remove/i });
  }

  async removeItem(name: string) {
    await this.removeButton(name).click();
  }

  async getItemNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
