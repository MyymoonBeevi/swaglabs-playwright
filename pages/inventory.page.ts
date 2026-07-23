import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  readonly inventoryList = this.page.locator('.inventory_list');
  readonly inventoryItems = this.page.locator('.inventory_item');
  readonly sortDropdown = this.page.locator('[data-test="product-sort-container"]');
  readonly cartIcon = this.page.locator('.shopping_cart_link');
  readonly cartBadge = this.page.locator('.shopping_cart_badge');
  readonly menuButton = this.page.locator('#react-burger-menu-btn');
  readonly logoutLink = this.page.locator('#logout_sidebar_link');

  constructor(page: Page) {
    super(page);
  }

  productCard(name: string) {
    return this.page.locator('.inventory_item').filter({ hasText: name });
  }

  addToCartButton(name: string) {
    return this.productCard(name).getByRole('button', { name: /add to cart/i });
  }

  removeButton(name: string) {
    return this.productCard(name).getByRole('button', { name: /remove/i });
  }

  async addProductToCart(name: string) {
    await this.addToCartButton(name).click();
  }

  async removeProductFromCart(name: string) {
    await this.removeButton(name).click();
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const raw = await this.page.locator('.inventory_item_price').allTextContents();
    return raw.map((p) => parseFloat(p.replace('$', '')));
  }

  async getCartCount(): Promise<number> {
    if (!(await this.cartBadge.isVisible())) return 0;
    return parseInt(await this.getText(this.cartBadge), 10);
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
